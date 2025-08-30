export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  url?: string;
  imageUrl?: string;
  source: CalendarSource;
  tags: string[];
}

export interface CalendarSource {
  id: string;
  name: string;
  type: 'icalendar' | 'rss' | 'manual' | 'stonehamcan';
  url: string;
  tag: string;
  defaultImageUrl?: string;
  color?: string;
  enabled: boolean;
}

export interface CalendarConfig {
  sources: CalendarSource[];
  refreshIntervalMs: number;
  maxEventsPerSource: number;
}

// export interface GoogleCalendarEvent {
//   id: string;
//   summary: string;
//   description?: string;
//   start: {
//     dateTime?: string;
//     date?: string;
//     timeZone?: string;
//   };
//   end: {
//     dateTime?: string;
//     date?: string;
//     timeZone?: string;
//   };
//   location?: string;
//   htmlLink?: string;
//   attachments?: Array<{
//     fileUrl: string;
//     title: string;
//     mimeType: string;
//   }>;
// }

export interface ICalendarEvent {
  uid: string;
  summary: string;
  description?: string;
  dtstart: string;
  dtend: string;
  location?: string;
  url?: string;
  attach?: string;
  rrule?: string;
}

export interface RSSEvent {
  guid: string;
  title: string;
  description?: string;
  pubDate: string;
  link?: string;
  enclosure?: {
    url: string;
    type: string;
  };
  // Stoneham-specific fields
  eventTimes?: string;
  eventLocation?: string;
}

export interface CalendarServiceInterface {
  fetchEvents(source: CalendarSource): Promise<CalendarEvent[]>;
  consolidateEvents(sources: CalendarSource[]): Promise<CalendarEvent[]>;
  refreshEvents(): Promise<CalendarEvent[]>;
}