import { CalendarEvent, CalendarSource, CalendarConfig, CalendarServiceInterface } from '../types/calendar';
import { GoogleCalendarService } from './GoogleCalendarService';
import { ICalendarService } from './ICalendarService';
import { ManualEventsService } from './ManualEventsService';

export class CalendarService implements CalendarServiceInterface {
  private googleService: GoogleCalendarService;
  private icalService: ICalendarService;
  private manualService: ManualEventsService;
  private config: CalendarConfig;
  private cache: Map<string, { events: CalendarEvent[], timestamp: number }> = new Map();

  constructor(config: CalendarConfig, googleApiKey: string) {
    this.config = config;
    this.googleService = new GoogleCalendarService(googleApiKey);
    this.icalService = new ICalendarService();
    this.manualService = new ManualEventsService();
  }

  async fetchEvents(source: CalendarSource): Promise<CalendarEvent[]> {
    if (!source.enabled) {
      return [];
    }

    // Check cache first
    const cached = this.cache.get(source.id);
    if (cached && (Date.now() - cached.timestamp < this.config.refreshIntervalMs)) {
      return cached.events;
    }

    try {
      let events: CalendarEvent[];

      switch (source.type) {
        case 'google':
          events = await this.googleService.fetchEvents(source);
          break;
        case 'icalendar':
        case 'rss':
          events = await this.icalService.fetchEvents(source);
          break;
        case 'manual':
          events = await this.manualService.fetchEvents(source);
          break;
        default:
          throw new Error(`Unsupported calendar type: ${source.type}`);
      }

      // Apply max events limit
      if (this.config.maxEventsPerSource > 0) {
        events = events.slice(0, this.config.maxEventsPerSource);
      }

      // Cache the results
      this.cache.set(source.id, {
        events,
        timestamp: Date.now()
      });

      return events;
    } catch (error) {
      console.error(`Error fetching events from ${source.name}:`, error);
      
      // Return cached events if available, even if stale
      const cached = this.cache.get(source.id);
      if (cached) {
        return cached.events;
      }
      
      return [];
    }
  }

  async consolidateEvents(sources?: CalendarSource[]): Promise<CalendarEvent[]> {
    const sourcesToUse = sources || this.config.sources;
    const enabledSources = sourcesToUse.filter(source => source.enabled);

    // Fetch events from all sources in parallel
    const eventPromises = enabledSources.map(source => this.fetchEvents(source));
    const eventArrays = await Promise.all(eventPromises);

    // Flatten and consolidate all events
    const allEvents = eventArrays.flat();

    // Sort by start date
    allEvents.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    // Remove duplicates based on title, date, and location
    const uniqueEvents = this.removeDuplicateEvents(allEvents);

    // Filter future events only
    const now = new Date();
    const futureEvents = uniqueEvents.filter(event => event.startDate >= now);

    return futureEvents;
  }

  async refreshEvents(): Promise<CalendarEvent[]> {
    // Clear cache to force refresh
    this.cache.clear();
    return this.consolidateEvents();
  }

  private removeDuplicateEvents(events: CalendarEvent[]): CalendarEvent[] {
    const seen = new Set<string>();
    const unique: CalendarEvent[] = [];

    for (const event of events) {
      // Create a key based on title, start date, and location for duplicate detection
      const key = this.createEventKey(event);
      
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(event);
      } else {
        // If we find a duplicate, merge tags and keep the one with more information
        const existingIndex = unique.findIndex(e => this.createEventKey(e) === key);
        if (existingIndex !== -1) {
          const existing = unique[existingIndex];
          
          // Merge tags
          const mergedTags = [...new Set([...existing.tags, ...event.tags])];
          
          // Keep the event with more complete information
          const merged: CalendarEvent = {
            ...existing,
            tags: mergedTags,
            description: existing.description || event.description,
            location: existing.location || event.location,
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

  // Configuration management methods
  updateConfig(newConfig: Partial<CalendarConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  addSource(source: CalendarSource): void {
    const existingIndex = this.config.sources.findIndex(s => s.id === source.id);
    if (existingIndex !== -1) {
      this.config.sources[existingIndex] = source;
    } else {
      this.config.sources.push(source);
    }
  }

  removeSource(sourceId: string): void {
    this.config.sources = this.config.sources.filter(s => s.id !== sourceId);
    this.cache.delete(sourceId);
  }

  enableSource(sourceId: string): void {
    const source = this.config.sources.find(s => s.id === sourceId);
    if (source) {
      source.enabled = true;
    }
  }

  disableSource(sourceId: string): void {
    const source = this.config.sources.find(s => s.id === sourceId);
    if (source) {
      source.enabled = false;
    }
  }

  getSources(): CalendarSource[] {
    return [...this.config.sources];
  }

  getConfig(): CalendarConfig {
    return { ...this.config };
  }

  clearCache(): void {
    this.cache.clear();
  }

  // Utility methods for filtering events
  getEventsByTag(events: CalendarEvent[], tag: string): CalendarEvent[] {
    return events.filter(event => event.tags.includes(tag));
  }

  getEventsByDateRange(events: CalendarEvent[], startDate: Date, endDate: Date): CalendarEvent[] {
    return events.filter(event => 
      event.startDate >= startDate && event.startDate <= endDate
    );
  }

  getUpcomingEvents(events: CalendarEvent[], days: number = 7): CalendarEvent[] {
    const now = new Date();
    const future = new Date();
    future.setDate(future.getDate() + days);
    
    return this.getEventsByDateRange(events, now, future);
  }
}