import { CalendarEvent, CalendarSource } from '../types/calendar';

export class StonehamnLibraryService {
  
  async fetchEvents(source: CalendarSource): Promise<CalendarEvent[]> {
    // Check if we're in development mode
    const isDevelopment = 
      import.meta.env?.DEV || 
      (typeof window !== 'undefined' && (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.port === '5173'
      ));
    
    if (isDevelopment) {
      // Development mode - API routes not available
      console.log('StonehamnLibraryService: Development mode - skipping calendar fetch');
      return [];
    }
    
    try {
      // Fetch events for multiple months to get a good range
      const currentDate = new Date();
      const months = this.getCalendarMonths(currentDate, 3); // Get next 3 months
      
      const allEvents: CalendarEvent[] = [];
      
      for (const monthUrl of months) {
        try {
          const htmlContent = await this.fetchViaProxy(monthUrl);
          const events = this.parseEventsFromHtml(htmlContent, source);
          allEvents.push(...events);
        } catch (error) {
          console.warn(`StonehamnLibraryService: Failed to fetch events for ${monthUrl}:`, error);
          // Continue with other months even if one fails
        }
      }
      
      // Sort events by date and remove duplicates
      const sortedEvents = allEvents.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
      const uniqueEvents = this.removeDuplicateEvents(sortedEvents);
      
      console.log(`StonehamnLibraryService: Successfully fetched ${uniqueEvents.length} events from library calendar`);
      return uniqueEvents;
      
    } catch (error) {
      console.error('StonehamnLibraryService: Error fetching events:', error);
      return [];
    }
  }
  
  private getCalendarMonths(startDate: Date, count: number): string[] {
    const baseUrl = 'https://stonehamlibrary.assabetinteractive.com/calendar';
    const months: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const date = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
      const year = date.getFullYear();
      const month = date.toLocaleString('en-US', { month: 'long' }).toLowerCase();
      months.push(`${baseUrl}/${year}-${month}/`);
    }
    
    return months;
  }
  
  private async fetchViaProxy(url: string): Promise<string> {
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
    
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`Proxy HTTP ${response.status}: ${response.statusText}`);
    }
    
    const responseText = await response.text();
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error(`StonehamnLibraryService: JSON parse error:`, parseError);
      
      if (responseText.includes('import') && responseText.includes('export default')) {
        throw new Error('Proxy endpoint not available - API routes only work in production');
      }
      throw new Error(`Failed to parse proxy response as JSON: ${parseError instanceof Error ? parseError.message : 'Unknown parse error'}`);
    }
    
    if (!data || !data.contents) {
      throw new Error('Invalid proxy response: missing contents');
    }
    
    return data.contents;
  }
  
  private parseEventsFromHtml(html: string, source: CalendarSource): CalendarEvent[] {
    const events: CalendarEvent[] = [];
    
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Look for JSON-LD structured data first (most reliable)
      const jsonLdScripts = doc.querySelectorAll('script[type="application/ld+json"]');
      
      for (const script of jsonLdScripts) {
        try {
          const jsonData = JSON.parse(script.textContent || '');
          
          if (jsonData['@type'] === 'Event') {
            const event = this.parseJsonLdEvent(jsonData, source);
            if (event) {
              events.push(event);
            }
          } else if (Array.isArray(jsonData)) {
            for (const item of jsonData) {
              if (item['@type'] === 'Event') {
                const event = this.parseJsonLdEvent(item, source);
                if (event) {
                  events.push(event);
                }
              }
            }
          }
        } catch (error) {
          console.warn('StonehamnLibraryService: Failed to parse JSON-LD script:', error);
          continue;
        }
      }
      
      // If no JSON-LD events found, try fallback HTML parsing
      if (events.length === 0) {
        console.log('StonehamnLibraryService: No JSON-LD events found, trying HTML parsing fallback');
        const fallbackEvents = this.parseEventsFromHtmlFallback(doc, source);
        events.push(...fallbackEvents);
      }
      
    } catch (error) {
      console.error('StonehamnLibraryService: Error parsing HTML:', error);
    }
    
    return events;
  }
  
  private parseJsonLdEvent(jsonData: unknown, source: CalendarSource): CalendarEvent | null {
    try {
      // Type guard for object with string properties
      if (!jsonData || typeof jsonData !== 'object') {
        return null;
      }
      
      const data = jsonData as Record<string, unknown>;
      const title = (data.name as string) || (data.summary as string) || 'Untitled Event';
      const description = data.description as string;
      
      // Parse start date
      const startDate = new Date(data.startDate as string);
      if (isNaN(startDate.getTime())) {
        console.warn(`StonehamnLibraryService: Invalid start date for event: ${title}`);
        return null;
      }
      
      // Parse end date
      let endDate = data.endDate ? new Date(data.endDate as string) : null;
      if (!endDate || isNaN(endDate.getTime())) {
        // Default to 2 hours if no end date
        endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000));
      }
      
      // Extract location
      const location = data.location ? 
        (typeof data.location === 'string' ? data.location : 
         ((data.location as Record<string, unknown>).name as string) || 
         ((data.location as Record<string, unknown>).address as string)) :
        'Stoneham Public Library';
      
      // Generate unique ID
      const id = this.generateEventId(title, startDate);
      
      const event: CalendarEvent = {
        id,
        title,
        description,
        startDate,
        endDate,
        location,
        url: data.url as string,
        imageUrl: (data.image as string) || source.defaultImageUrl,
        source,
        tags: [source.tag, 'library', 'events']
      };
      
      console.log(`StonehamnLibraryService: Parsed JSON-LD event: "${title}" on ${startDate.toDateString()}`);
      return event;
      
    } catch (error) {
      console.error('StonehamnLibraryService: Error parsing JSON-LD event:', error);
      return null;
    }
  }
  
  private parseEventsFromHtmlFallback(doc: Document, source: CalendarSource): CalendarEvent[] {
    const events: CalendarEvent[] = [];
    
    // Try various selectors that might contain event information
    const eventSelectors = [
      '.calendar-event',
      '.event-item',
      '.ai-event',
      '[data-event]',
      '.event-title',
      '.event-summary'
    ];
    
    for (const selector of eventSelectors) {
      const eventElements = doc.querySelectorAll(selector);
      console.log(`StonehamnLibraryService: Found ${eventElements.length} elements with selector "${selector}"`);
      
      eventElements.forEach((element, index) => {
        try {
          const event = this.parseHtmlEventElement(element, source);
          if (event) {
            events.push(event);
          }
        } catch (error) {
          console.warn(`StonehamnLibraryService: Failed to parse event element ${index}:`, error);
        }
      });
      
      if (events.length > 0) {
        break; // Found events, no need to try other selectors
      }
    }
    
    return events;
  }
  
  private parseHtmlEventElement(element: Element, source: CalendarSource): CalendarEvent | null {
    try {
      // Extract basic information from the element
      const title = element.textContent?.trim() || 'Library Event';
      const url = element.getAttribute('href') || element.querySelector('a')?.getAttribute('href');
      
      // Try to extract date from various attributes or nearby elements
      const dateAttr = element.getAttribute('data-date') || 
                      element.getAttribute('datetime') ||
                      element.querySelector('[datetime]')?.getAttribute('datetime');
      
      let startDate: Date;
      if (dateAttr) {
        startDate = new Date(dateAttr);
      } else {
        // Fallback to current date (not ideal but prevents null events)
        console.warn(`StonehamnLibraryService: No date found for event "${title}", using current date`);
        startDate = new Date();
      }
      
      if (isNaN(startDate.getTime())) {
        return null;
      }
      
      const endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000)); // 2 hours default
      const id = this.generateEventId(title, startDate);
      
      const event: CalendarEvent = {
        id,
        title,
        description: '',
        startDate,
        endDate,
        location: 'Stoneham Public Library',
        url: url || undefined,
        imageUrl: source.defaultImageUrl,
        source,
        tags: [source.tag, 'library', 'events']
      };
      
      return event;
      
    } catch (error) {
      console.error('StonehamnLibraryService: Error parsing HTML event element:', error);
      return null;
    }
  }
  
  private removeDuplicateEvents(events: CalendarEvent[]): CalendarEvent[] {
    const seen = new Set<string>();
    const unique: CalendarEvent[] = [];
    
    for (const event of events) {
      const key = this.createEventKey(event);
      
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(event);
      } else {
        // If duplicate, merge information
        const existingIndex = unique.findIndex(e => this.createEventKey(e) === key);
        if (existingIndex !== -1) {
          const existing = unique[existingIndex];
          
          // Merge tags and keep the most complete event
          const mergedTags = [...new Set([...existing.tags, ...event.tags])];
          
          const merged: CalendarEvent = {
            ...existing,
            tags: mergedTags,
            description: existing.description || event.description,
            url: existing.url || event.url,
            imageUrl: existing.imageUrl || event.imageUrl
          };
          
          unique[existingIndex] = merged;
        }
      }
    }
    
    return unique;
  }
  
  private createEventKey(event: CalendarEvent): string {
    const dateKey = event.startDate.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeKey = event.startDate.toTimeString().substring(0, 5); // HH:MM
    const titleKey = event.title.toLowerCase().trim();
    const locationKey = (event.location || '').toLowerCase().trim();
    
    return `${titleKey}|${dateKey}|${timeKey}|${locationKey}`;
  }
  
  private generateEventId(title: string, date: Date): string {
    const normalizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const dateStr = date.toISOString().split('T')[0];
    return `stoneham-library-${dateStr}-${normalizedTitle}`;
  }
}