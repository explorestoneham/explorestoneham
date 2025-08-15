import { CalendarEvent, CalendarSource } from '../types/calendar';

export class StonehamnCanService {
  
  async fetchEvents(source: CalendarSource): Promise<CalendarEvent[]> {
    console.log(`StonehamnCanService: fetchEvents called for ${source.name}`);
    
    // Check if we're in development mode by looking for localhost or the DEV flag
    const isDevelopment = 
      import.meta.env?.DEV || 
      (typeof window !== 'undefined' && (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.port === '5173'
      ));
    
    if (isDevelopment) {
      console.log(`StonehamnCanService: Development mode detected - Stoneham CAN calendar sync disabled`);
      console.log(`StonehamnCanService: This feature works in production where API routes are available`);
      console.log(`StonehamnCanService: Deploy to test the full functionality`);
      return [];
    }
    
    console.log(`StonehamnCanService: Production mode - attempting to fetch events via proxy`);
    
    try {
      // Production - use the proxy
      const htmlContent = await this.fetchViaProxy(source.url);
      
      console.log(`StonehamnCanService: Received ${htmlContent.length} characters of HTML`);
      
      // Parse the HTML content
      const events = this.parseEventsFromHtml(htmlContent, source);
      
      console.log(`StonehamnCanService: Parsed ${events.length} events`);
      return events;
      
    } catch (error) {
      console.error('StonehamnCanService: Error fetching events:', error);
      console.error('StonehamnCanService: Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        url: source.url
      });
      
      // Return empty array instead of throwing to prevent breaking other calendar sources
      return [];
    }
  }
  
  private async fetchViaProxy(url: string): Promise<string> {
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
    console.log(`StonehamnCanService: Fetching from proxy: ${proxyUrl}`);
    console.log(`StonehamnCanService: Target URL: ${url}`);
    
    const response = await fetch(proxyUrl);
    console.log(`StonehamnCanService: Proxy response status: ${response.status}`);
    console.log(`StonehamnCanService: Proxy response headers:`, Object.fromEntries(response.headers));
    
    if (!response.ok) {
      throw new Error(`Proxy HTTP ${response.status}: ${response.statusText}`);
    }
    
    const responseText = await response.text();
    console.log(`StonehamnCanService: Raw response length: ${responseText.length}`);
    console.log(`StonehamnCanService: Response preview: ${responseText.substring(0, 200)}...`);
    
    let data;
    try {
      data = JSON.parse(responseText);
      console.log(`StonehamnCanService: Successfully parsed JSON response`);
    } catch (parseError) {
      console.error(`StonehamnCanService: JSON parse error:`, parseError);
      console.log(`StonehamnCanService: First 500 chars of response:`, responseText.substring(0, 500));
      
      // In development mode, the proxy might not be working and returning the actual source code
      if (responseText.includes('import') && responseText.includes('export default')) {
        throw new Error('Proxy endpoint not available - API routes only work in production');
      }
      throw new Error(`Failed to parse proxy response as JSON: ${parseError instanceof Error ? parseError.message : 'Unknown parse error'}`);
    }
    
    if (!data || !data.contents) {
      console.error(`StonehamnCanService: Invalid data structure:`, data);
      throw new Error('Invalid proxy response: missing contents');
    }
    
    console.log(`StonehamnCanService: Successfully extracted ${data.contents.length} characters from proxy response`);
    return data.contents;
  }
  
  private parseEventsFromHtml(html: string, source: CalendarSource): CalendarEvent[] {
    const events: CalendarEvent[] = [];
    
    try {
      // Create a temporary DOM parser using the browser's DOMParser
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Find all event items using the CSS selector we identified
      const eventElements = doc.querySelectorAll('.eventlist-item');
      
      console.log(`StonehamnCanService: Found ${eventElements.length} event elements`);
      
      // Debug: log a sample of the HTML structure to understand the layout
      if (eventElements.length === 0) {
        console.log(`StonehamnCanService: No events found. HTML preview (first 2000 chars):`, html.substring(0, 2000));
        
        // Try alternative selectors that might be used
        const alternativeSelectors = [
          '.eventlist-item',
          '.event-item',
          '.event',
          '[data-event]',
          '.sqs-block-events',
          '.eventlist',
          '.event-summary'
        ];
        
        for (const selector of alternativeSelectors) {
          const elements = doc.querySelectorAll(selector);
          console.log(`StonehamnCanService: Found ${elements.length} elements with selector "${selector}"`);
        }
      }
      
      eventElements.forEach((eventElement, index) => {
        try {
          const event = this.parseEventElement(eventElement, source, index);
          if (event) {
            events.push(event);
          }
        } catch (error) {
          console.error(`StonehamnCanService: Error parsing event ${index}:`, error);
          // Continue processing other events even if one fails
        }
      });
      
    } catch (error) {
      console.error('StonehamnCanService: Error parsing HTML:', error);
    }
    
    return events;
  }
  
  private parseEventElement(element: Element, source: CalendarSource, index: number): CalendarEvent | null {
    try {
      // Extract event URL from the link
      const linkElement = element.querySelector('a');
      const eventUrl = linkElement ? this.normalizeUrl(linkElement.getAttribute('href')) : undefined;
      
      // Extract image URL
      const imgElement = element.querySelector('.eventlist-thumbnail img');
      const imageUrl = imgElement ? this.normalizeImageUrl(imgElement.getAttribute('src')) : undefined;
      
      // Extract date components
      const monthElement = element.querySelector('.eventlist-month');
      const dayElement = element.querySelector('.eventlist-day');
      const month = monthElement?.textContent?.trim() || '';
      const day = dayElement?.textContent?.trim() || '';
      
      // Extract title
      const titleElement = element.querySelector('.eventlist-title');
      const title = titleElement?.textContent?.trim() || 'Untitled Event';
      
      // Extract category
      const categoryElement = element.querySelector('.eventlist-cats a');
      const categoryText = categoryElement?.textContent?.trim() || '';
      const category = this.parseCategoryTag(categoryText);
      
      // Extract details (time, location, etc.)
      const detailsElement = element.querySelector('.eventlist-excerpt');
      const detailsText = detailsElement?.textContent || '';
      const eventDetails = this.parseEventDetails(detailsText);
      
      // Build the date
      const eventDate = this.parseEventDate(month, day, eventDetails.dateString);
      if (!eventDate) {
        console.warn(`StonehamnCanService: Could not parse date for event: ${title}`);
        return null;
      }
      
      // Create unique ID
      const id = this.generateEventId(title, eventDate);
      
      // Calculate end date (default to 2 hours if no end time specified)
      const endDate = eventDetails.endTime ? 
        new Date(eventDate.getTime() + (eventDetails.duration * 60 * 60 * 1000)) :
        new Date(eventDate.getTime() + (2 * 60 * 60 * 1000));
      
      const event: CalendarEvent = {
        id,
        title,
        description: eventDetails.description,
        startDate: eventDate,
        endDate,
        location: eventDetails.location,
        url: eventUrl,
        imageUrl: imageUrl || source.defaultImageUrl,
        source,
        tags: [source.tag, category].filter(Boolean)
      };
      
      console.log(`StonehamnCanService: Parsed event "${title}" on ${eventDate.toISOString()}`);
      return event;
      
    } catch (error) {
      console.error(`StonehamnCanService: Error parsing event element ${index}:`, error);
      return null;
    }
  }
  
  private normalizeUrl(href: string | null): string | undefined {
    if (!href) return undefined;
    
    // Handle relative URLs
    if (href.startsWith('/')) {
      return `https://www.stonehamcan.org${href}`;
    }
    
    return href;
  }
  
  private normalizeImageUrl(src: string | null): string | undefined {
    if (!src) return undefined;
    
    // Squarespace CDN URLs are usually absolute
    return src;
  }
  
  private parseCategoryTag(categoryText: string): string {
    const cleanCategory = categoryText.replace(/[[\]]/g, '').toLowerCase();
    
    // Map Stoneham CAN categories to our tag system
    const categoryMap: Record<string, string> = {
      'ksb': 'community',
      'community': 'community',
      'reads': 'library'
    };
    
    return categoryMap[cleanCategory] || 'community';
  }
  
  private parseEventDetails(detailsText: string): {
    dateString?: string;
    location?: string;
    description?: string;
    endTime?: string;
    duration: number;
  } {
    const lines = detailsText.split('\n').map(line => line.trim()).filter(Boolean);
    
    let dateString: string | undefined;
    let location: string | undefined;
    let timeRange: string | undefined;
    let description: string | undefined;
    
    // Parse each line to extract information
    for (const line of lines) {
      // Check for date pattern (e.g., "Wednesday, September 3, 2025")
      if (/\w+,\s+\w+\s+\d+,\s+\d{4}/.test(line)) {
        dateString = line;
      }
      // Check for time pattern (e.g., "6:00 PM - 7:00 PM")
      else if (/\d+:\d+\s+(AM|PM)/.test(line)) {
        timeRange = line;
      }
      // Everything else is likely location or description
      else if (!location) {
        location = line;
      } else if (!description) {
        description = line;
      }
    }
    
    // Calculate duration from time range
    const duration = this.calculateDuration(timeRange);
    
    return {
      dateString,
      location,
      description,
      endTime: timeRange,
      duration
    };
  }
  
  private calculateDuration(timeRange: string | undefined): number {
    if (!timeRange || !timeRange.includes(' - ')) {
      return 2; // Default 2 hours
    }
    
    try {
      const [startTime, endTime] = timeRange.split(' - ').map(t => t.trim());
      const startHour = this.parseTime(startTime);
      const endHour = this.parseTime(endTime);
      
      if (startHour !== null && endHour !== null) {
        let duration = endHour - startHour;
        if (duration <= 0) duration += 24; // Handle overnight events
        return duration;
      }
    } catch (error) {
      console.warn('StonehamnCanService: Could not parse time range:', timeRange);
    }
    
    return 2; // Default 2 hours
  }
  
  private parseTime(timeStr: string): number | null {
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return null;
    
    let hour = parseInt(match[1]);
    const minute = parseInt(match[2]);
    const ampm = match[3].toUpperCase();
    
    if (ampm === 'PM' && hour !== 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;
    
    return hour + (minute / 60);
  }
  
  private parseEventDate(month: string, day: string, dateString?: string): Date | null {
    try {
      // If we have a full date string, try to parse that first
      if (dateString) {
        const parsedDate = new Date(dateString);
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate;
        }
      }
      
      // Fall back to month/day parsing
      if (!month || !day) return null;
      
      const currentYear = new Date().getFullYear();
      const monthMap: Record<string, number> = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
      };
      
      const monthIndex = monthMap[month];
      if (monthIndex === undefined) return null;
      
      const dayNum = parseInt(day);
      if (isNaN(dayNum)) return null;
      
      const eventDate = new Date(currentYear, monthIndex, dayNum);
      
      // If the date is in the past, assume it's next year
      const now = new Date();
      if (eventDate < now) {
        eventDate.setFullYear(currentYear + 1);
      }
      
      return eventDate;
      
    } catch (error) {
      console.error('StonehamnCanService: Error parsing date:', error);
      return null;
    }
  }
  
  private generateEventId(title: string, date: Date): string {
    const normalizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const dateStr = date.toISOString().split('T')[0];
    return `stonehamcan-${dateStr}-${normalizedTitle}`;
  }
}