import { CalendarEvent, CalendarSource } from '../types/calendar';

export class ManualEventsService {
  private manualEvents: CalendarEvent[] = [
    {
      id: 'stoneham-porchfest-2025',
      title: 'Stoneham Porchfest',
      description: 'Step onto the porch and into a world of harmony! Join us for a delightful day filled with local musicians performing on front porches throughout the neighborhood. Gather with friends and family as porches transform into stages and music fills the air. Come embrace the community spirit and let the music be the soundtrack to your day!',
      startDate: new Date('2025-09-06T12:00:00-04:00'), // EDT timezone
      endDate: new Date('2025-09-06T19:00:00-04:00'),
      location: 'Various porches throughout Stoneham',
      url: 'https://www.stonehamporchfest.com/',
      imageUrl: '/images/stoneham-porchfest-logo.webp',
      source: {
        id: 'manual-events',
        name: 'Stoneham CAN',
        type: 'manual',
        url: '',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'arts', 'family']
    },
    {
      id: 'stoneham-town-day-2025',
      title: 'Stoneham Town Day',
      description: 'Join us for the 41st Annual Stoneham Town Day! This family-friendly celebration features over 100 exhibitors, an inflatable park for children, live music, demonstrations, and a food court. Rain or shine, this beloved community event showcases local businesses, recreational, artistic, cultural, and non-profit organizations. Come celebrate our wonderful Stoneham community!',
      startDate: new Date('2025-09-20T11:00:00-04:00'), // EDT timezone
      endDate: new Date('2025-09-20T16:00:00-04:00'),
      location: 'Stoneham Town Common',
      url: 'https://stonehamchamber.org/town-day/',
      imageUrl: '/uploads/6/3/3/7/63378583/town-day-2025.png',
      source: {
        id: 'manual-events',
        name: 'Stoneham Chamber of Commerce',
        type: 'manual',
        url: '',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'family', 'business', 'entertainment']
    }
  ];

  async fetchEvents(source: CalendarSource): Promise<CalendarEvent[]> {
    console.log(`ManualEventsService: fetchEvents called for ${source.name}`);
    console.log(`ManualEventsService: Total manual events: ${this.manualEvents.length}`);
    
    // Filter events to only return future events
    const now = new Date();
    console.log(`ManualEventsService: Current date: ${now.toISOString()}`);
    
    this.manualEvents.forEach(event => {
      console.log(`ManualEventsService: Event "${event.title}" start date: ${event.startDate.toISOString()}, is future: ${event.startDate >= now}`);
    });
    
    const futureEvents = this.manualEvents.filter(event => event.startDate >= now);
    
    console.log(`ManualEventsService: Returning ${futureEvents.length} future events`);
    return futureEvents;
  }

  // Method to add new manual events (for future use)
  addEvent(event: Omit<CalendarEvent, 'source'> & { source?: Partial<CalendarEvent['source']> }): void {
    const newEvent: CalendarEvent = {
      ...event,
      source: {
        id: 'manual-events',
        name: 'Stoneham CAN',
        type: 'manual',
        url: '',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true,
        ...event.source
      }
    };
    this.manualEvents.push(newEvent);
  }

  // Method to remove manual events (for future use)
  removeEvent(eventId: string): void {
    this.manualEvents = this.manualEvents.filter(event => event.id !== eventId);
  }

  // Get all manual events (for admin purposes)
  getAllEvents(): CalendarEvent[] {
    return [...this.manualEvents];
  }
}