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
            const event = this.parseJsonLdEvent(jsonData, source, doc);
            if (event) {
              events.push(event);
            }
          } else if (Array.isArray(jsonData)) {
            for (const item of jsonData) {
              if (item['@type'] === 'Event') {
                const event = this.parseJsonLdEvent(item, source, doc);
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
  
  private parseJsonLdEvent(jsonData: unknown, source: CalendarSource, htmlDoc?: Document): CalendarEvent | null {
    try {
      // Type guard for object with string properties
      if (!jsonData || typeof jsonData !== 'object') {
        return null;
      }
      
      const data = jsonData as Record<string, unknown>;
      const title = (data.name as string) || (data.summary as string) || 'Untitled Event';
      const description = data.description as string;
      
      // Parse start date (JSON-LD typically only has date, not time)
      const startDateString = data.startDate as string;
      if (!startDateString) {
        console.warn(`StonehamnLibraryService: Missing start date for event: ${title}`);
        return null;
      }
      
      // First check if JSON-LD has doorTime (time in 24-hour format)
      let startDate: Date;
      const doorTime = data.doorTime as string;
      
      if (doorTime && doorTime.match(/^\d{2}:\d{2}:\d{2}$/)) {
        // Parse doorTime format "19:00:00"
        const [hours, minutes, seconds] = doorTime.split(':').map(Number);
        // Create date in local timezone to avoid UTC conversion issues
        const dateParts = startDateString.split('-').map(Number); // [2025, 9, 3]
        startDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], hours, minutes, seconds || 0);
        console.log(`StonehamnLibraryService: Using doorTime ${doorTime} for event: ${title}`);
      } else {
        // Fallback: parse just the date and try to extract time from HTML
        const dateParts = startDateString.split('-').map(Number); // [2025, 9, 3]  
        startDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], 0, 0, 0); // Start at midnight local time
        
        // Try to extract time information from the HTML if available
        if (htmlDoc) {
          const timeInfo = this.extractTimeFromHtml(htmlDoc);
          if (timeInfo.startTime) {
            // Combine the date with time from HTML
            const [hours, minutes] = timeInfo.startTime;
            startDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], hours, minutes);
            console.log(`StonehamnLibraryService: Using HTML time ${hours}:${minutes} for event: ${title}`);
          }
        }
      }
      
      if (isNaN(startDate.getTime())) {
        console.warn(`StonehamnLibraryService: Invalid start date for event: ${title}`);
        return null;
      }
      
      // Parse end date
      let endDate: Date;
      const endDateString = data.endDate as string;
      const duration = data.duration as string; // Format: "PT3600S" (3600 seconds = 1 hour)
      
      if (duration && duration.match(/^PT(\d+)S$/)) {
        // Use duration from JSON-LD
        const durationMatch = duration.match(/^PT(\d+)S$/);
        const durationSeconds = durationMatch ? parseInt(durationMatch[1]) : 3600;
        endDate = new Date(startDate.getTime() + (durationSeconds * 1000));
        console.log(`StonehamnLibraryService: Using duration ${duration} (${durationSeconds}s) for event: ${title}`);
      } else if (endDateString) {
        // Try to parse end date with same logic as start date
        const dateParts = endDateString.split('-').map(Number);
        endDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], 0, 0, 0);
        
        // Try to get end time from HTML
        if (htmlDoc) {
          const timeInfo = this.extractTimeFromHtml(htmlDoc);
          if (timeInfo.endTime) {
            const [hours, minutes] = timeInfo.endTime;
            endDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], hours, minutes);
            console.log(`StonehamnLibraryService: Using HTML end time ${hours}:${minutes} for event: ${title}`);
          } else if (timeInfo.startTime) {
            // If we have start time but no end time, assume 1 hour duration
            endDate = new Date(startDate.getTime() + (60 * 60 * 1000));
          }
        }
        
        if (isNaN(endDate.getTime())) {
          endDate = new Date(startDate.getTime() + (60 * 60 * 1000)); // 1 hour default
        }
      } else {
        // Default to 1 hour if no end date or duration
        endDate = new Date(startDate.getTime() + (60 * 60 * 1000));
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
        imageUrl: this.normalizeImageUrl((data.image as string)) || source.defaultImageUrl,
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
  
  private normalizeImageUrl(imageUrl: string): string | undefined {
    if (!imageUrl) return undefined;
    
    // Check if it's an S3 image that needs proxying
    if (imageUrl.includes('s3.amazonaws.com') || imageUrl.includes('ai-assets')) {
      const isDevelopment = 
        import.meta.env?.DEV || 
        (typeof window !== 'undefined' && (
          window.location.hostname === 'localhost' ||
          window.location.hostname === '127.0.0.1' ||
          window.location.port === '5173'
        ));
      
      if (!isDevelopment) {
        // Use image proxy in production to handle CORS
        console.log(`StonehamnLibraryService: Using image proxy for S3 image: ${imageUrl}`);
        return `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`;
      }
    }
    
    return imageUrl;
  }
  
  private generateEventId(title: string, date: Date): string {
    const normalizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const dateStr = date.toISOString().split('T')[0];
    return `stoneham-library-${dateStr}-${normalizedTitle}`;
  }
  
  private extractTimeFromHtml(doc: Document): { startTime?: [number, number], endTime?: [number, number] } {
    // Look for time patterns in the HTML content
    const timePatterns = [
      // Pattern like "7:00—8:00 PM" or "7:00-8:00 PM"
      /(\d{1,2}):(\d{2})\s*[—-]\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i,
      // Pattern like "7:00 PM - 8:00 PM"
      /(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i,
      // Pattern like "7:00 PM to 8:00 PM"
      /(\d{1,2}):(\d{2})\s*(AM|PM)\s+to\s+(\d{1,2}):(\d{2})\s*(AM|PM)/i,
    ];
    
    // Get all text content from the document
    const textContent = doc.body?.textContent || '';
    
    for (const pattern of timePatterns) {
      const match = textContent.match(pattern);
      if (match) {
        try {
          let startHour: number, startMinute: number, endHour: number, endMinute: number;
          
          if (pattern.source.includes('AM|PM.*AM|PM')) {
            // Format: "7:00 PM - 8:00 PM"
            startHour = parseInt(match[1]);
            startMinute = parseInt(match[2]);
            const startAmPm = match[3];
            endHour = parseInt(match[4]);
            endMinute = parseInt(match[5]);
            const endAmPm = match[6];
            
            // Convert to 24-hour format
            if (startAmPm.toUpperCase() === 'PM' && startHour !== 12) {
              startHour += 12;
            } else if (startAmPm.toUpperCase() === 'AM' && startHour === 12) {
              startHour = 0;
            }
            
            if (endAmPm.toUpperCase() === 'PM' && endHour !== 12) {
              endHour += 12;
            } else if (endAmPm.toUpperCase() === 'AM' && endHour === 12) {
              endHour = 0;
            }
          } else {
            // Format: "7:00—8:00 PM" (shared AM/PM)
            startHour = parseInt(match[1]);
            startMinute = parseInt(match[2]);
            endHour = parseInt(match[3]);
            endMinute = parseInt(match[4]);
            const amPm = match[5];
            
            // Convert to 24-hour format
            if (amPm.toUpperCase() === 'PM') {
              if (startHour !== 12) startHour += 12;
              if (endHour !== 12) endHour += 12;
            } else if (amPm.toUpperCase() === 'AM') {
              if (startHour === 12) startHour = 0;
              if (endHour === 12) endHour = 0;
            }
          }
          
          console.log(`StonehamnLibraryService: Extracted time ${startHour}:${startMinute.toString().padStart(2, '0')} - ${endHour}:${endMinute.toString().padStart(2, '0')} from HTML`);
          
          return {
            startTime: [startHour, startMinute],
            endTime: [endHour, endMinute]
          };
        } catch (error) {
          console.warn('StonehamnLibraryService: Error parsing time from HTML:', error);
          continue;
        }
      }
    }
    
    // If no time range found, look for single time
    const singleTimePattern = /(\d{1,2}):(\d{2})\s*(AM|PM)/i;
    const singleMatch = textContent.match(singleTimePattern);
    if (singleMatch) {
      try {
        let hour = parseInt(singleMatch[1]);
        const minute = parseInt(singleMatch[2]);
        const amPm = singleMatch[3];
        
        // Convert to 24-hour format
        if (amPm.toUpperCase() === 'PM' && hour !== 12) {
          hour += 12;
        } else if (amPm.toUpperCase() === 'AM' && hour === 12) {
          hour = 0;
        }
        
        console.log(`StonehamnLibraryService: Extracted single time ${hour}:${minute.toString().padStart(2, '0')} from HTML`);
        
        return {
          startTime: [hour, minute]
        };
      } catch (error) {
        console.warn('StonehamnLibraryService: Error parsing single time from HTML:', error);
      }
    }
    
    return {};
  }
}