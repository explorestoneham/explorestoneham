import { CalendarEvent, CalendarSource, ICalendarEvent, RSSEvent } from '../types/calendar';
import ICAL from 'ical.js';

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
      
      // Use a CORS proxy for external iCalendar feeds
      const proxyUrl = this.getCorsProxyUrl(source.url);
      
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        // If rate limited (429), don't throw - just return empty for now
        if (response.status === 429) {
          return [];
        }
        throw new Error(`iCalendar fetch error: ${response.status} ${response.statusText}`);
      }

      // Handle different proxy response formats
      const jsonResponse = await response.json();
      
      const icalData = jsonResponse.contents || '';
      
      if (!icalData) {
        return [];
      }
      
      return this.parseICalendarWithICALJS(icalData, source);
    } catch (error) {
      console.error(`Error fetching iCalendar events for ${source.name}:`, error);
      return [];
    }
  }

  private async fetchRSSEvents(source: CalendarSource): Promise<CalendarEvent[]> {
    try {
      
      // Use a CORS proxy for external RSS feeds
      const proxyUrl = this.getCorsProxyUrl(source.url);
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        console.error(`RSS fetch error: ${response.status} ${response.statusText}`);
        // If rate limited (429), don't throw - just return empty for now
        if (response.status === 429) {
          return [];
        }
        throw new Error(`RSS fetch error: ${response.status} ${response.statusText}`);
      }

      // Handle different proxy response formats
      const jsonResponse = await response.json();
      
      const rssData = jsonResponse.contents || '';
      
      if (!rssData) {
        console.warn(`Empty RSS data received from proxy for ${source.name}`);
        return [];
      }
      
      
      const events = this.parseRSS(rssData);
      
      const transformed = this.transformRSSEvents(events, source);
      
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

  private parseICalendarWithICALJS(icalData: string, source: CalendarSource): CalendarEvent[] {
    try {
      // Parse the iCalendar data using ical.js
      const jcalData = ICAL.parse(icalData);
      const comp = new ICAL.Component(jcalData);
      
      const vevents = comp.getAllSubcomponents('vevent');
      
      const allEvents: CalendarEvent[] = [];
      const now = new Date();
      const endOfPeriod = new Date();
      endOfPeriod.setMonth(endOfPeriod.getMonth() + 6); // 6 months ahead
      
      vevents.forEach((vevent: any, index: number) => {
        try {
          const event = new ICAL.Event(vevent);
          
          // Log first few events for debugging
          if (index < 3) {
          }
          
          if (event.isRecurring()) {
            // Handle recurring events
            const expand = new ICAL.RecurExpansion({
              component: vevent,
              dtstart: event.startDate
            });
            
            let occurrenceCount = 0;
            const maxOccurrences = 50;
            
            // Generate occurrences up to our end period
            for (let next = expand.next(); next && occurrenceCount < maxOccurrences; next = expand.next()) {
              const occurrenceDate = next.toJSDate();
              
              // Stop if we've gone past our end period
              if (occurrenceDate > endOfPeriod) {
                break;
              }
              
              // Only include future events
              if (occurrenceDate >= now) {
                const duration = event.duration.toSeconds() * 1000; // Convert to milliseconds
                const endDate = new Date(occurrenceDate.getTime() + duration);
                
                allEvents.push({
                  id: `${source.id}-${event.uid}-${occurrenceDate.getTime()}`,
                  title: event.summary || 'Untitled Event',
                  description: event.description ? this.stripHtmlTags(event.description) : undefined,
                  startDate: occurrenceDate,
                  endDate: endDate,
                  location: event.location ? String(event.location) : undefined,
                  url: event.component.getFirstPropertyValue('url') ? String(event.component.getFirstPropertyValue('url')) : undefined,
                  imageUrl: source.defaultImageUrl,
                  source,
                  tags: [source.tag]
                });
                
                occurrenceCount++;
              }
            }
            
            if (occurrenceCount > 0) {
            }
          } else {
            // Handle single (non-recurring) events
            const startDate = event.startDate.toJSDate();
            const endDate = event.endDate.toJSDate();
            
            // Only include future events
            if (startDate >= now) {
              allEvents.push({
                id: `${source.id}-${event.uid}`,
                title: event.summary || 'Untitled Event',
                description: event.description ? this.stripHtmlTags(event.description) : undefined,
                startDate: startDate,
                endDate: endDate,
                location: event.location ? String(event.location) : undefined,
                url: event.component.getFirstPropertyValue('url') ? String(event.component.getFirstPropertyValue('url')) : undefined,
                imageUrl: source.defaultImageUrl,
                source,
                tags: [source.tag]
              });
            }
          }
        } catch (eventError) {
          console.warn(`Error processing individual event:`, eventError);
        }
      });
      
      return allEvents;
      
    } catch (error) {
      console.error('Error parsing iCalendar with ical.js:', error);
      return [];
    }
  }


  private parseRSS(rssData: string): RSSEvent[] {
    try {
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(rssData, 'text/xml');
      
      // Check for XML parsing errors
      const parserError = doc.querySelector('parsererror');
      if (parserError) {
        console.error('XML Parser Error:', parserError.textContent);
        return [];
      }
      
      const items = doc.querySelectorAll('item');
      
      const events: RSSEvent[] = [];
      
      items.forEach((item, index) => {
        
        const guid = item.querySelector('guid')?.textContent || 
                     item.querySelector('link')?.textContent || 
                     `rss-${Date.now()}-${Math.random()}`;
        const title = item.querySelector('title')?.textContent || '';
        const rawDescription = item.querySelector('description')?.textContent || '';
        const description = this.parseHtmlDescription(rawDescription);
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        const link = item.querySelector('link')?.textContent || '';
        
        
        // Handle Stoneham-specific calendar fields with namespace
        const eventDates = item.querySelector('calendarEvent\\:EventDates, EventDates')?.textContent || '';
        const eventTimes = item.querySelector('calendarEvent\\:EventTimes, EventTimes')?.textContent || '';
        const rawEventLocation = item.querySelector('calendarEvent\\:Location, Location')?.textContent || '';
        const rawEventAddress = item.querySelector('calendarEvent\\:Address, Address')?.textContent || '';
        
        // Prefer Location field over Address field
        const eventLocation = this.stripHtmlTags(rawEventLocation || rawEventAddress);
        
        
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
        }
      });
      
      return events;
    } catch (error) {
      console.error('Error parsing RSS:', error);
      return [];
    }
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