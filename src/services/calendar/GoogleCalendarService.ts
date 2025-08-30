// import { CalendarEvent, CalendarSource, GoogleCalendarEvent } from '../types/calendar';

// export class GoogleCalendarService {
//   private apiKey: string;

//   constructor(apiKey: string) {
//     this.apiKey = apiKey;
//   }

//   async fetchEvents(source: CalendarSource): Promise<CalendarEvent[]> {
//     if (source.type !== 'google') {
//       throw new Error('Invalid source type for Google Calendar service');
//     }

//     try {
//       // Extract calendar ID from Google Calendar URL
//       const calendarId = this.extractCalendarId(source.url);
      
//       const now = new Date();
//       const futureDate = new Date();
//       futureDate.setMonth(futureDate.getMonth() + 6); // Get events for next 6 months

//       const params = new URLSearchParams({
//         key: this.apiKey,
//         timeMin: now.toISOString(),
//         timeMax: futureDate.toISOString(),
//         singleEvents: 'true',
//         orderBy: 'startTime',
//         maxResults: '50'
//       });

//       const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`;
      
//       const response = await fetch(url);
      
//       if (!response.ok) {
//         throw new Error(`Google Calendar API error: ${response.status} ${response.statusText}`);
//       }

//       const data = await response.json();
      
//       return this.transformGoogleEvents(data.items || [], source);
//     } catch (error) {
//       console.error(`Error fetching Google Calendar events for ${source.name}:`, error);
//       return [];
//     }
//   }

//   private extractCalendarId(url: string): string {
//     // Handle various Google Calendar URL formats
//     if (url.includes('calendar.google.com')) {
//       // Extract from web URL format
//       const match = url.match(/calendar\/embed\?src=([^&]+)/);
//       if (match) {
//         return decodeURIComponent(match[1]);
//       }
      
//       // Try another format
//       const match2 = url.match(/calendars\/([^\/]+)/);
//       if (match2) {
//         return decodeURIComponent(match2[1]);
//       }
//     }
    
//     // Assume it's already a calendar ID
//     return url;
//   }

//   private transformGoogleEvents(googleEvents: GoogleCalendarEvent[], source: CalendarSource): CalendarEvent[] {
//     return googleEvents.map(event => {
//       const startDate = this.parseGoogleDate(event.start);
//       const endDate = this.parseGoogleDate(event.end);
      
//       // Extract image from attachments or description
//       const imageUrl = this.extractImageUrl(event) || source.defaultImageUrl;

//       return {
//         id: `${source.id}-${event.id}`,
//         title: event.summary || 'Untitled Event',
//         description: event.description,
//         startDate,
//         endDate,
//         location: event.location,
//         url: event.htmlLink,
//         imageUrl,
//         source,
//         tags: [source.tag]
//       };
//     });
//   }

//   private parseGoogleDate(dateInfo: GoogleCalendarEvent['start'] | GoogleCalendarEvent['end']): Date {
//     if (dateInfo.dateTime) {
//       return new Date(dateInfo.dateTime);
//     } else if (dateInfo.date) {
//       return new Date(dateInfo.date);
//     }
//     return new Date();
//   }

//   private extractImageUrl(event: GoogleCalendarEvent): string | undefined {
//     // Check attachments first
//     if (event.attachments && event.attachments.length > 0) {
//       const imageAttachment = event.attachments.find(att => 
//         att.mimeType.startsWith('image/')
//       );
//       if (imageAttachment) {
//         return imageAttachment.fileUrl;
//       }
//     }

//     // Check description for image URLs
//     if (event.description) {
//       const imgMatch = event.description.match(/<img[^>]+src="([^"]+)"/i);
//       if (imgMatch) {
//         return imgMatch[1];
//       }
      
//       // Look for standalone image URLs
//       const urlMatch = event.description.match(/(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp))/i);
//       if (urlMatch) {
//         return urlMatch[1];
//       }
//     }

//     return undefined;
//   }
// }