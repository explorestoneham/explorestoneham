import { CalendarEvent, CalendarSource, ICalendarEvent, RSSEvent } from '../types/calendar';

export class ICalendarService {
  async fetchEvents(source: CalendarSource): Promise<CalendarEvent[]> {
    if (source.type === 'icalendar') {
      return this.fetchICalendarEvents(source);
    } else if (source.type === 'rss') {
      return this.fetchRSSEvents(source);
    }
    
    throw new Error('Invalid source type for iCalendar service');
  }

  private async fetchICalendarEvents(source: CalendarSource): Promise<CalendarEvent[]> {
    try {
      console.log(`Fetching iCalendar events for ${source.name} from: ${source.url}`);
      
      // Use a CORS proxy for external iCalendar feeds
      const proxyUrl = this.getCorsProxyUrl(source.url);
      console.log(`Using proxy URL: ${proxyUrl}`);
      
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        console.error(`iCalendar fetch error: ${response.status} ${response.statusText}`);
        // If rate limited (429), don't throw - just return empty for now
        if (response.status === 429) {
          console.warn(`Rate limited for ${source.name}, skipping this fetch`);
          return [];
        }
        throw new Error(`iCalendar fetch error: ${response.status} ${response.statusText}`);
      }

      // Handle different proxy response formats
      const jsonResponse = await response.json();
      console.log(`Proxy response status: ${jsonResponse.status}`);
      
      const icalData = jsonResponse.contents || '';
      
      if (!icalData) {
        console.warn(`Empty iCalendar data received from proxy for ${source.name}`);
        console.log(`Full proxy response:`, jsonResponse);
        return [];
      }
      console.log(`iCalendar data length: ${icalData.length} characters`);
      
      const events = this.parseICalendar(icalData);
      console.log(`Parsed ${events.length} iCalendar events`);
      
      return this.transformICalendarEvents(events, source);
    } catch (error) {
      console.error(`Error fetching iCalendar events for ${source.name}:`, error);
      return [];
    }
  }

  private async fetchRSSEvents(source: CalendarSource): Promise<CalendarEvent[]> {
    try {
      console.log(`Fetching RSS events from: ${source.name} (${source.url})`);
      
      // Use a CORS proxy for external RSS feeds
      const proxyUrl = this.getCorsProxyUrl(source.url);
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        console.error(`RSS fetch error: ${response.status} ${response.statusText}`);
        // If rate limited (429), don't throw - just return empty for now
        if (response.status === 429) {
          console.warn(`Rate limited for ${source.name}, skipping this fetch`);
          return [];
        }
        throw new Error(`RSS fetch error: ${response.status} ${response.statusText}`);
      }

      // Handle different proxy response formats
      const jsonResponse = await response.json();
      console.log(`Proxy response status for ${source.name}: ${jsonResponse.status}`);
      
      const rssData = jsonResponse.contents || '';
      
      if (!rssData) {
        console.warn(`Empty RSS data received from proxy for ${source.name}`);
        console.log(`Full proxy response for ${source.name}:`, jsonResponse);
        return [];
      }
      
      console.log(`RSS data length for ${source.name}:`, rssData.length);
      console.log(`RSS data preview for ${source.name}:`, rssData.substring(0, 200));
      
      const events = this.parseRSS(rssData);
      console.log(`Parsed ${events.length} events from ${source.name}`);
      
      const transformed = this.transformRSSEvents(events, source);
      console.log(`Transformed events for ${source.name}:`, transformed);
      
      return transformed;
    } catch (error) {
      console.error(`Error fetching RSS events for ${source.name}:`, error);
      return [];
    }
  }

  private getCorsProxyUrl(url: string): string {
    // Always use our custom Vercel proxy for consistency
    return `https://explorestoneham-sfzk.vercel.app/api/proxy?url=${encodeURIComponent(url)}`;
  }

  private parseICalendar(icalData: string): ICalendarEvent[] {
    const events: ICalendarEvent[] = [];
    const lines = icalData.split('\n').map(line => line.replace(/\r$/, ''));
    
    let currentEvent: Partial<ICalendarEvent> = {};
    let inEvent = false;
    let currentProperty = '';
    
    for (let line of lines) {
      // Handle line folding (lines starting with space or tab)
      if (line.startsWith(' ') || line.startsWith('\t')) {
        currentProperty += line.substring(1);
        continue;
      }
      
      // Process the previous property if we have one
      if (currentProperty && inEvent) {
        this.parseICalendarProperty(currentProperty, currentEvent);
      }
      
      currentProperty = line;
      
      if (line === 'BEGIN:VEVENT') {
        inEvent = true;
        currentEvent = {};
      } else if (line === 'END:VEVENT' && inEvent) {
        if (currentEvent.uid && currentEvent.summary && currentEvent.dtstart) {
          events.push(currentEvent as ICalendarEvent);
        }
        inEvent = false;
        currentEvent = {};
      }
    }
    
    return events;
  }

  private parseICalendarProperty(property: string, event: Partial<ICalendarEvent>): void {
    const colonIndex = property.indexOf(':');
    if (colonIndex === -1) return;
    
    const key = property.substring(0, colonIndex).toUpperCase();
    const value = property.substring(colonIndex + 1);
    
    // Remove TZID and other parameters for simplicity
    const cleanKey = key.split(';')[0];
    
    switch (cleanKey) {
      case 'UID':
        event.uid = value;
        break;
      case 'SUMMARY':
        event.summary = this.unescapeICalText(value);
        break;
      case 'DESCRIPTION':
        event.description = this.unescapeICalText(value);
        break;
      case 'DTSTART':
        event.dtstart = value;
        break;
      case 'DTEND':
        event.dtend = value;
        break;
      case 'LOCATION':
        event.location = this.unescapeICalText(value);
        break;
      case 'URL':
        event.url = value;
        break;
      case 'ATTACH':
        event.attach = value;
        break;
    }
  }

  private unescapeICalText(text: string): string {
    return text
      .replace(/\\n/g, '\n')
      .replace(/\\,/g, ',')
      .replace(/\\;/g, ';')
      .replace(/\\\\/g, '\\');
  }

  private parseRSS(rssData: string): RSSEvent[] {
    try {
      console.log('Parsing RSS data, length:', rssData.length);
      console.log('RSS data preview:', rssData.substring(0, 500));
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(rssData, 'text/xml');
      
      // Check for XML parsing errors
      const parserError = doc.querySelector('parsererror');
      if (parserError) {
        console.error('XML Parser Error:', parserError.textContent);
        return [];
      }
      
      const items = doc.querySelectorAll('item');
      console.log(`Found ${items.length} items in RSS feed`);
      
      const events: RSSEvent[] = [];
      
      items.forEach((item, index) => {
        console.log(`Processing item ${index + 1}:`);
        
        const guid = item.querySelector('guid')?.textContent || 
                     item.querySelector('link')?.textContent || 
                     `rss-${Date.now()}-${Math.random()}`;
        const title = item.querySelector('title')?.textContent || '';
        const rawDescription = item.querySelector('description')?.textContent || '';
        const description = this.parseHtmlDescription(rawDescription);
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        const link = item.querySelector('link')?.textContent || '';
        
        console.log(`  Title: ${title}`);
        console.log(`  Raw Description: ${rawDescription}`);
        console.log(`  Cleaned Description: ${description}`);
        console.log(`  PubDate: ${pubDate}`);
        console.log(`  Link: ${link}`);
        
        // Handle Stoneham-specific calendar fields with namespace
        const eventDates = item.querySelector('calendarEvent\\:EventDates, EventDates')?.textContent || '';
        const eventTimes = item.querySelector('calendarEvent\\:EventTimes, EventTimes')?.textContent || '';
        const rawEventLocation = item.querySelector('calendarEvent\\:Location, Location')?.textContent || '';
        const rawEventAddress = item.querySelector('calendarEvent\\:Address, Address')?.textContent || '';
        
        // Prefer Location field over Address field
        const eventLocation = this.stripHtmlTags(rawEventLocation || rawEventAddress);
        
        console.log(`  EventDates: ${eventDates}`);
        console.log(`  EventTimes: ${eventTimes}`);
        console.log(`  Raw EventLocation: ${rawEventLocation}`);
        console.log(`  Raw EventAddress: ${rawEventAddress}`);
        console.log(`  Final EventLocation: ${eventLocation}`);
        
        const enclosureEl = item.querySelector('enclosure');
        const enclosure = enclosureEl ? {
          url: enclosureEl.getAttribute('url') || '',
          type: enclosureEl.getAttribute('type') || ''
        } : undefined;
        
        if (title) {
          events.push({
            guid,
            title,
            description,
            pubDate: eventDates || pubDate, // Use eventDates if available, fallback to pubDate
            link,
            enclosure,
            // Add custom fields for Stoneham RSS
            eventTimes,
            eventLocation
          });
        } else {
          console.log(`  Skipping item ${index + 1} - no title`);
        }
      });
      
      console.log(`Parsed ${events.length} events from RSS`);
      return events;
    } catch (error) {
      console.error('Error parsing RSS:', error);
      return [];
    }
  }

  private transformICalendarEvents(icalEvents: ICalendarEvent[], source: CalendarSource): CalendarEvent[] {
    const now = new Date();
    console.log(`Current date for filtering: ${now.toISOString()}`);
    
    const transformed = icalEvents.map((event, index) => {
      const startDate = this.parseICalDate(event.dtstart);
      const endDate = this.parseICalDate(event.dtend || event.dtstart);
      
      // Log first few events to debug date parsing
      if (index < 5) {
        console.log(`Event ${index + 1}:`, {
          title: event.summary,
          rawStart: event.dtstart,
          parsedStart: startDate.toISOString(),
          isFuture: startDate >= now
        });
      }
      
      // Extract image URL from attach property or description
      const imageUrl = this.extractImageFromICal(event) || source.defaultImageUrl;

      return {
        id: `${source.id}-${event.uid}`,
        title: event.summary,
        description: event.description,
        startDate,
        endDate,
        location: event.location,
        url: event.url,
        imageUrl,
        source,
        tags: [source.tag]
      };
    });
    
    const futureEvents = transformed.filter(event => event.startDate >= now);
    console.log(`Total iCal events: ${transformed.length}, Future events: ${futureEvents.length}`);
    
    return transformed;
  }

  private transformRSSEvents(rssEvents: RSSEvent[], source: CalendarSource): CalendarEvent[] {
    return rssEvents.map(event => {
      // Parse Stoneham-specific date and time format
      const { startDate, endDate } = this.parseStonehammRSSDateTime(event);
      
      // Extract image from enclosure or description
      const imageUrl = this.extractImageFromRSS(event) || source.defaultImageUrl;

      // Use eventLocation if available, otherwise try to extract from description
      // Also clean any HTML that might be in the location
      const cleanEventLocation = event.eventLocation ? this.stripHtmlTags(event.eventLocation) : '';
      const location = cleanEventLocation || this.extractLocationFromDescription(event.description);

      // Auto-categorize events from the "All" feed based on content
      const tags = this.categorizeEvent(event, source);

      return {
        id: `${source.id}-${event.guid}`,
        title: event.title,
        description: event.description,
        startDate,
        endDate,
        location,
        url: event.link,  
        imageUrl,
        source,
        tags
      };
    });
  }

  private parseStonehammRSSDateTime(event: RSSEvent): { startDate: Date; endDate: Date } {
    let startDate: Date;
    let endDate: Date;

    // Try to parse eventDates (stored in pubDate for Stoneham)
    if (event.pubDate) {
      try {
        // Handle different date formats: "July 28, 2025" or standard RSS date
        if (event.pubDate.includes(',')) {
          // Format like "July 28, 2025"
          startDate = new Date(event.pubDate);
        } else {
          // Standard RSS date format
          startDate = new Date(event.pubDate);
        }
        
        // If we have invalid date, use current date
        if (isNaN(startDate.getTime())) {
          startDate = new Date();
        }
      } catch {
        startDate = new Date();
      }
    } else {
      startDate = new Date();
    }

    // Parse event times if available
    if (event.eventTimes) {
      const timeMatch = event.eventTimes.match(/(\d{1,2}:\d{2}\s*(?:AM|PM)?)(?:\s*-\s*(\d{1,2}:\d{2}\s*(?:AM|PM)?))?/i);
      if (timeMatch) {
        const [, startTime, endTime] = timeMatch;
        
        // Set start time
        const startDateTime = this.parseTimeToDate(startDate, startTime);
        if (startDateTime) {
          startDate = startDateTime;
        }
        
        // Set end time or default duration
        if (endTime) {
          const endDateTime = this.parseTimeToDate(startDate, endTime);
          endDate = endDateTime || new Date(startDate.getTime() + (2 * 60 * 60 * 1000));
        } else {
          endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000)); // Default 2 hours
        }
      } else {
        endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000)); // Default 2 hours
      }
    } else {
      endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000)); // Default 2 hours
    }

    return { startDate, endDate };
  }

  private parseTimeToDate(baseDate: Date, timeString: string): Date | null {
    try {
      const time = timeString.trim().toUpperCase();
      const timeMatch = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/);
      
      if (!timeMatch) return null;
      
      let [, hours, minutes, period] = timeMatch;
      let hour24 = parseInt(hours);
      const min = parseInt(minutes);
      
      // Convert to 24-hour format
      if (period === 'PM' && hour24 !== 12) {
        hour24 += 12;
      } else if (period === 'AM' && hour24 === 12) {
        hour24 = 0;
      }
      
      const result = new Date(baseDate);
      result.setHours(hour24, min, 0, 0);
      
      return result;
    } catch {
      return null;
    }
  }

  private extractLocationFromDescription(description?: string): string | undefined {
    if (!description) return undefined;
    
    // Look for location patterns in description
    const locationMatch = description.match(/Location:\s*([^|]+)/i) ||
                         description.match(/at\s+([^|,\n]+)/i);
    
    return locationMatch ? locationMatch[1].trim() : undefined;
  }

  private stripHtmlTags(html: string): string {
    if (!html) return '';
    
    // Create a temporary DOM element to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Get text content and clean up extra whitespace
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    // Clean up multiple spaces and line breaks
    return textContent
      .replace(/\s+/g, ' ')  // Replace multiple whitespace with single space
      .replace(/\n\s*\n/g, '\n')  // Remove empty lines
      .trim();
  }

  private categorizeEvent(event: RSSEvent, source: CalendarSource): string[] {
    const title = event.title.toLowerCase();
    const description = (event.description || '').toLowerCase();
    const location = (event.eventLocation || '').toLowerCase();
    
    // If this is a specific department feed, use that tag
    if (source.tag !== 'town') {
      return [source.tag];
    }
    
    // Auto-categorize based on keywords for the "All" feed
    const tags: string[] = [];
    
    // Recreation/Sports events
    if (title.includes('skating') || title.includes('hockey') || title.includes('arena') || 
        title.includes('stick practice') || title.includes('freestyle') || 
        location.includes('arena') || title.includes('sports')) {
      tags.push('recreation');
    }
    
    // Government/Municipal events
    else if (title.includes('board') || title.includes('committee') || title.includes('commission') ||
             title.includes('meeting') || title.includes('select board') || title.includes('planning') ||
             title.includes('conservation') || title.includes('town hall') || title.includes('municipal')) {
      tags.push('government');
    }
    
    // School events
    else if (title.includes('school') || title.includes('education') || title.includes('student') ||
             title.includes('pta') || title.includes('parent')) {
      tags.push('schools');
    }
    
    // Community events
    else if (title.includes('community') || title.includes('volunteer') || title.includes('fundraiser') ||
             title.includes('charity') || title.includes('social') || title.includes('neighborhood')) {
      tags.push('community');
    }
    
    // Arts & Culture
    else if (title.includes('concert') || title.includes('art') || title.includes('music') ||
             title.includes('theater') || title.includes('cultural') || title.includes('performance')) {
      tags.push('arts');
    }
    
    // Default to town if no specific category found
    if (tags.length === 0) {
      tags.push('town');
    }
    
    return tags;
  }

  private parseHtmlDescription(description: string): string {
    if (!description) return '';
    
    // Strip HTML tags first
    const cleanText = this.stripHtmlTags(description);
    
    // Remove redundant labels since we display date/time separately
    let result = cleanText
      .replace(/Event date:\s*[^|]*\|?/gi, '')
      .replace(/Event time:\s*[^|]*\|?/gi, '')  
      .replace(/Time:\s*[^|]*\|?/gi, '')
      .replace(/Location:\s*[^|]*\|?/gi, '')  // Remove location too since it's displayed separately
      .replace(/^\s*\|\s*/, '')  // Remove leading pipe
      .replace(/\s*\|\s*$/, '')  // Remove trailing pipe
      .replace(/\|\s*\|/g, '|')  // Remove double pipes
      .replace(/\s+/g, ' ')  // Normalize whitespace
      .trim();

    // Remove common prefixes that add no value
    result = result
      .replace(/^(Event\s*|Meeting\s*|Details:\s*)/gi, '')
      .trim();

    // If the result is empty or just contains common meaningless phrases, return empty
    if (!result || 
        result.length < 5 || 
        result.toLowerCase().includes('no description') ||
        result.toLowerCase() === 'event' ||
        result.toLowerCase() === 'meeting') {
      return '';
    }

    return result;
  }

  private parseICalDate(dateString: string): Date {
    // Handle different iCal date formats
    if (dateString.includes('T')) {
      // DateTime format: 20240101T120000Z or 20240101T120000
      const cleanDate = dateString.replace(/[TZ]/g, '');
      const year = parseInt(cleanDate.substring(0, 4));
      const month = parseInt(cleanDate.substring(4, 6)) - 1; // Month is 0-indexed
      const day = parseInt(cleanDate.substring(6, 8));
      const hour = parseInt(cleanDate.substring(8, 10)) || 0;
      const minute = parseInt(cleanDate.substring(10, 12)) || 0;
      const second = parseInt(cleanDate.substring(12, 14)) || 0;
      
      return new Date(year, month, day, hour, minute, second);
    } else {
      // Date only format: 20240101
      const year = parseInt(dateString.substring(0, 4));
      const month = parseInt(dateString.substring(4, 6)) - 1;
      const day = parseInt(dateString.substring(6, 8));
      
      return new Date(year, month, day);
    }
  }

  private extractImageFromICal(event: ICalendarEvent): string | undefined {
    // Check attach property
    if (event.attach && this.isImageUrl(event.attach)) {
      return event.attach;
    }
    
    // Check description for image URLs
    if (event.description) {
      const urlMatch = event.description.match(/(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp))/i);
      if (urlMatch) {
        return urlMatch[1];
      }
    }
    
    return undefined;
  }

  private extractImageFromRSS(event: RSSEvent): string | undefined {
    // Check enclosure for images
    if (event.enclosure && event.enclosure.type.startsWith('image/')) {
      return event.enclosure.url;
    }
    
    // Check description for image URLs
    if (event.description) {
      const imgMatch = event.description.match(/<img[^>]+src="([^"]+)"/i);
      if (imgMatch) {
        return imgMatch[1];
      }
      
      const urlMatch = event.description.match(/(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp))/i);
      if (urlMatch) {
        return urlMatch[1];
      }
    }
    
    return undefined;
  }

  private isImageUrl(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  }
}