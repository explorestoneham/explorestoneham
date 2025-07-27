import { useState, useEffect, useCallback } from 'react';
import { CalendarEvent, CalendarSource } from '../services/types/calendar';
import { CalendarService } from '../services/calendar/CalendarService';
import { DEFAULT_CALENDAR_CONFIG } from '../services/calendar/config';

interface UseCalendarEventsOptions {
  googleApiKey: string;
  refreshInterval?: number;
  autoRefresh?: boolean;
}

interface UseCalendarEventsResult {
  events: CalendarEvent[];
  loading: boolean;
  error: string | null;
  refreshEvents: () => Promise<void>;
  getEventsByTag: (tag: string) => CalendarEvent[];
  getUpcomingEvents: (days?: number) => CalendarEvent[];
  calendarService: CalendarService;
}

export function useCalendarEvents({
  googleApiKey,
  refreshInterval = 30 * 60 * 1000, // 30 minutes
  autoRefresh = true
}: UseCalendarEventsOptions): UseCalendarEventsResult {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [calendarService] = useState(() => {
    const config = {
      ...DEFAULT_CALENDAR_CONFIG,
      refreshIntervalMs: refreshInterval
    };
    return new CalendarService(config, googleApiKey);
  });

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const consolidatedEvents = await calendarService.consolidateEvents();
      setEvents(consolidatedEvents);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load events');
      console.error('Error loading calendar events:', err);
    } finally {
      setLoading(false);
    }
  }, [calendarService]);

  const refreshEvents = useCallback(async () => {
    const refreshedEvents = await calendarService.refreshEvents();
    setEvents(refreshedEvents);
  }, [calendarService]);

  const getEventsByTag = useCallback((tag: string) => {
    return calendarService.getEventsByTag(events, tag);
  }, [calendarService, events]);

  const getUpcomingEvents = useCallback((days: number = 7) => {
    return calendarService.getUpcomingEvents(events, days);
  }, [calendarService, events]);

  // Initial load
  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refreshEvents();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, refreshEvents]);

  return {
    events,
    loading,
    error,
    refreshEvents,
    getEventsByTag,
    getUpcomingEvents,
    calendarService
  };
}