# Calendar Service Documentation

This calendar service consolidates events from multiple calendar sources including Google Calendars, iCalendar feeds, and RSS feeds. It provides automatic tagging, image handling, and deduplication.

## Quick Start

### Basic Setup

```typescript
import { CalendarService, DEFAULT_CALENDAR_CONFIG } from './services/calendar';

const calendarService = new CalendarService(
  DEFAULT_CALENDAR_CONFIG,
  'your-google-api-key'
);

// Get all consolidated events
const events = await calendarService.consolidateEvents();
```

### Using the React Hook

```typescript
import { useCalendarEvents } from '../hooks/useCalendarEvents';

function MyEventsComponent() {
  const {
    events,
    loading,
    error,
    refreshEvents,
    getEventsByTag,
    getUpcomingEvents
  } = useCalendarEvents({
    googleApiKey: 'your-google-api-key'
  });

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Upcoming Events ({events.length})</h2>
      {events.map(event => (
        <div key={event.id}>{event.title}</div>
      ))}
    </div>
  );
}
```

### Using the Complete Events Page

```typescript
import { EventsPage } from './components/events/EventsPage';

function App() {
  return (
    <EventsPage googleApiKey="your-google-api-key" />
  );
}
```

## Configuration

### Adding Calendar Sources

```typescript
import { CalendarSource } from './services/calendar';

// Google Calendar
const googleCalendar: CalendarSource = {
  id: 'my-google-calendar',
  name: 'My Google Calendar',
  type: 'google',
  url: 'https://calendar.google.com/calendar/embed?src=example%40gmail.com',
  tag: 'personal',
  defaultImageUrl: '/images/personal-events.jpg',
  color: '#4285F4',
  enabled: true
};

// iCalendar feed
const icalCalendar: CalendarSource = {
  id: 'town-calendar',
  name: 'Town Calendar',
  type: 'icalendar',
  url: 'https://example.com/calendar.ics',
  tag: 'municipal',
  defaultImageUrl: '/images/town-hall.jpg',
  color: '#1E40AF',
  enabled: true
};

// RSS feed (for event announcements)
const rssCalendar: CalendarSource = {
  id: 'news-events',
  name: 'News Events',
  type: 'rss',
  url: 'https://example.com/events.rss',
  tag: 'news',
  defaultImageUrl: '/images/news.jpg',
  color: '#DC2626',
  enabled: true
};

// Add to service
calendarService.addSource(googleCalendar);
calendarService.addSource(icalCalendar);
calendarService.addSource(rssCalendar);
```

### Calendar URL Formats

#### Google Calendar URLs

1. **Embed URL**: `https://calendar.google.com/calendar/embed?src=example%40gmail.com`
2. **Public Calendar ID**: `example@gmail.com`
3. **Public Calendar with domain**: `abc123@group.calendar.google.com`

#### iCalendar URLs

1. **Direct .ics file**: `https://example.com/calendar.ics`
2. **Webcal protocol**: `webcal://example.com/calendar.ics` (will be converted to https)

#### RSS Feed URLs

1. **Standard RSS**: `https://example.com/events.xml`
2. **Atom feeds**: `https://example.com/events.atom`

## Google Calendar API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the "Google Calendar API"
4. Create credentials (API Key)
5. Restrict the API key to Google Calendar API
6. Add your domain to HTTP referrers if needed

### API Key Restrictions (Recommended)

```
Application restrictions:
- HTTP referrers (web sites)
  - https://yourdomain.com/*
  - https://localhost:*/* (for development)

API restrictions:
- Restrict key to specific APIs
  - Google Calendar API
```

## Event Processing

### Automatic Image Detection

The service automatically extracts images from:

1. **Google Calendar**: Attachments and description HTML
2. **iCalendar**: ATTACH property and description URLs
3. **RSS**: Enclosures and description HTML
4. **Fallback**: Source-specific default images

### Event Tagging

Events are automatically tagged based on:

1. **Source tag**: Each calendar source has a primary tag
2. **Keyword detection**: Event titles/descriptions are scanned for category keywords
3. **Custom rules**: Additional tagging logic can be added

### Deduplication

Events are deduplicated based on:
- Event title (normalized)
- Start date and time
- Location
- Similar events have tags merged and details consolidated

## API Reference

### CalendarService

#### Methods

- `fetchEvents(source: CalendarSource): Promise<CalendarEvent[]>`
- `consolidateEvents(sources?: CalendarSource[]): Promise<CalendarEvent[]>`
- `refreshEvents(): Promise<CalendarEvent[]>`
- `addSource(source: CalendarSource): void`
- `removeSource(sourceId: string): void`
- `enableSource(sourceId: string): void`
- `disableSource(sourceId: string): void`
- `getEventsByTag(events: CalendarEvent[], tag: string): CalendarEvent[]`
- `getEventsByDateRange(events: CalendarEvent[], start: Date, end: Date): CalendarEvent[]`
- `getUpcomingEvents(events: CalendarEvent[], days: number): CalendarEvent[]`

### CalendarEvent Interface

```typescript
interface CalendarEvent {
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
```

### CalendarSource Interface

```typescript
interface CalendarSource {
  id: string;
  name: string;
  type: 'google' | 'icalendar' | 'rss';
  url: string;
  tag: string;
  defaultImageUrl?: string;
  color?: string;
  enabled: boolean;
}
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: iCalendar and RSS feeds may require a CORS proxy for client-side fetching
2. **Google API Quota**: Monitor your API usage in Google Cloud Console
3. **Date Parsing**: Different calendar formats may have varying date formats
4. **Image Loading**: External images may fail to load due to CORS or HTTPS mixed content

### Error Handling

The service includes comprehensive error handling:
- Failed calendar sources don't break the entire consolidation
- Network errors are logged and cached data is returned when possible
- Invalid date formats are handled gracefully

### Performance Tips

1. **Caching**: Events are cached based on `refreshIntervalMs`
2. **Parallel Loading**: Multiple calendars are fetched in parallel
3. **Rate Limiting**: Built-in respect for API rate limits
4. **Efficient Filtering**: Use service methods for filtering rather than processing all events

## Examples

See the `/examples` directory for complete working examples including:
- Basic event listing
- Filtered event views
- Calendar management interface
- Custom event processing