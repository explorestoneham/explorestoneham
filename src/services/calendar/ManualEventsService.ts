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
    },
    {
      id: 'stoneham-300th-anniversary-parade-2025',
      title: 'Stoneham 300th Anniversary Parade',
      description: 'Join us for the historic Stoneham 300th Anniversary Parade! Rain or shine, this special celebration will feature community groups, decorated bikes, floats, bands, dancers, and street performers. The parade starts at Stoneham High School and travels through town to Stoneham Middle School. After the parade, gather on Town Common for a spectacular drone light show at 7 PM. Check-in begins at 11:30 AM.',
      startDate: new Date('2025-10-04T15:30:00-04:00'), // EDT timezone
      endDate: new Date('2025-10-04T17:00:00-04:00'),
      location: 'Franklin St to Central Square to Main St to Elm St to Central St',
      url: 'https://www.stoneham300.org/300th-parade.html',
      imageUrl: '/uploads/6/3/3/7/63378583/parade-300th-anniversary.png',
      source: {
        id: 'manual-events',
        name: 'Stoneham 300th Anniversary Committee',
        type: 'manual',
        url: '',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'family', 'historical', 'celebration', 'parade']
    },
    {
      id: 'stoneham-winter-farmers-market-2025-11-22',
      title: 'Stoneham Winter Farmers Market',
      description: 'Join us for the finale of the 2025 season at the Stoneham Winter Farmers Market! Vendors on site will be selling a variety of goods ranging from farm-fresh items to gifts, pizza and other food. The event will include children\'s activities and live music. Support local farmers and artisans while enjoying the community atmosphere at Town Hall.',
      startDate: new Date('2025-11-22T10:00:00-05:00'), // EST timezone
      endDate: new Date('2025-11-22T14:00:00-05:00'),
      location: 'Stoneham Town Hall, 35 Center Street',
      url: 'https://stonehamfarmersmarket.org/',
      imageUrl: '/api/image-proxy?url=https://stonehamfarmersmarket.org/wp-content/uploads/2024/04/cropped-Logo-White-Background_JPEG-scaled-1-1206x1536.jpeg',
      source: {
        id: 'manual-events',
        name: 'Stoneham Farmers Market',
        type: 'manual',
        url: 'https://stonehamfarmersmarket.org/',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'local-business', 'family', 'food']
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