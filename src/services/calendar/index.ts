// Main service exports
export { CalendarService } from './CalendarService';
export { GoogleCalendarService } from './GoogleCalendarService';
export { ICalendarService } from './ICalendarService';
export { StonehamnCanService } from './StonehamnCanService';

// Configuration exports
export {
  DEFAULT_CALENDAR_CONFIG,
  STONEHAM_CALENDAR_SOURCES,
  EVENT_CATEGORIES,
  EVENT_PROCESSING_CONFIG
} from './config';

// Type exports
export type {
  CalendarEvent,
  CalendarSource,
  CalendarConfig,
  CalendarServiceInterface,
  GoogleCalendarEvent,
  ICalendarEvent,
  RSSEvent
} from '../types/calendar';