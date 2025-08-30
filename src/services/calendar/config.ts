import { CalendarConfig, CalendarSource } from '../types/calendar';

// Default calendar sources for Stoneham - using All calendar feed as primary source
// Individual department feeds appear to be mostly empty, with events consolidated in the All feed
export const STONEHAM_CALENDAR_SOURCES: CalendarSource[] = [
  {
    id: 'manual-events',
    name: 'Featured Events',
    type: 'manual',
    url: '', // Not used for manual events
    tag: 'community',
    defaultImageUrl: '/images/community.jpg',
    color: '#2A6F4D', // Green
    enabled: true
  },
  // {
  //   id: 'stoneham-google-calendar',
  //   name: 'Stoneham Community Calendar',
  //   type: 'icalendar',
  //   url: 'https://calendar.google.com/calendar/ical/calendar.stoneham%40gmail.com/public/basic.ics',
  //   tag: 'community',
  //   defaultImageUrl: '/images/community.jpg',
  //   color: '#9333EA', // Purple
  //   enabled: true // Re-enabled - may work better in production without CORS proxy
  // },
  {
    id: 'stoneham-all-events',
    name: 'All Town Events',
    type: 'rss',
    url: 'https://stoneham-ma.gov/RSSFeed.aspx?ModID=58&CID=All-calendar.xml',
    tag: 'town',
    defaultImageUrl: '/images/town-hall.jpg',
    color: '#1E40AF', // Blue
    enabled: true
  },
  {
    id: 'stoneham-arena',
    name: 'Stoneham Arena',
    type: 'rss',
    url: 'https://stoneham-ma.gov/RSSFeed.aspx?ModID=58&CID=Arena-26',
    tag: 'recreation',
    defaultImageUrl: '/images/arena.jpg',
    color: '#EA580C', // Orange
    enabled: true
  },
  {
    id: 'stoneham-can-calendar',
    name: 'Stoneham CAN Events',
    type: 'stonehamcan',
    url: 'https://www.stonehamcan.org/whatsnext',
    tag: 'community',
    defaultImageUrl: '/images/community.jpg',
    color: '#10B981', // Green
    enabled: true // Always enabled - the service handles dev/prod logic internally
  }
];

export const DEFAULT_CALENDAR_CONFIG: CalendarConfig = {
  sources: STONEHAM_CALENDAR_SOURCES,
  refreshIntervalMs: 30 * 60 * 1000, // 30 minutes
  maxEventsPerSource: 50
};

// Event category mappings for enhanced tagging
export const EVENT_CATEGORIES = {
  'town': {
    label: 'Town Events',
    description: 'Official town meetings, ceremonies, and municipal events',
    icon: '🏛️',
    priority: 1
  },
  'library': {
    label: 'Library Events',
    description: 'Library programs, book clubs, and educational events',
    icon: '📚',
    priority: 2
  },
  'community': {
    label: 'Community Events',
    description: 'Community gatherings, volunteer events, and local initiatives',
    icon: '🤝',
    priority: 3
  },
  'farmers-market': {
    label: 'Farmers Market',
    description: 'Weekly farmers market and special market events',
    icon: '🥕',
    priority: 4
  },
  'business': {
    label: 'Business Events',
    description: 'Chamber of Commerce events, networking, and business development',
    icon: '💼',
    priority: 5
  },
  'recreation': {
    label: 'Recreation & Sports',
    description: 'Recreation programs, sports leagues, and fitness activities',
    icon: '⚽',
    priority: 6
  },
  'schools': {
    label: 'School Events',
    description: 'School board meetings, parent events, and educational programs',
    icon: '🎓',
    priority: 7
  },
  'arts': {
    label: 'Arts & Culture',
    description: 'Cultural events, performances, and art exhibitions',
    icon: '🎭',
    priority: 8
  },
  'holiday': {
    label: 'Holiday Events',
    description: 'Seasonal celebrations and holiday-themed events',
    icon: '🎄',
    priority: 9
  },
  'environment': {
    label: 'Environment',
    description: 'Conservation, environmental meetings and initiatives',
    icon: '🌲',
    priority: 10
  },
  'government': {
    label: 'Government',
    description: 'Town meetings, board meetings, and municipal events',
    icon: '🏛️',
    priority: 11
  }
};

// Additional configuration for event processing
export const EVENT_PROCESSING_CONFIG = {
  // Keywords to automatically categorize events
  categoryKeywords: {
    'arts': ['concert', 'performance', 'theater', 'art', 'music', 'dance', 'gallery'],
    'holiday': ['christmas', 'halloween', 'thanksgiving', 'easter', 'holiday', 'seasonal'],
    'recreation': ['sports', 'fitness', 'yoga', 'running', 'swimming', 'basketball', 'soccer'],
    'community': ['volunteer', 'cleanup', 'fundraiser', 'charity', 'community', 'neighborhood'],
    'business': ['networking', 'workshop', 'seminar', 'business', 'entrepreneur'],
    'family': ['family', 'kids', 'children', 'toddler', 'parent']
  },
  
  // Default images for different event types
  defaultImages: {
    'meeting': '/images/events/meeting.jpg',
    'festival': '/images/events/festival.jpg',
    'workshop': '/images/events/workshop.jpg',
    'performance': '/images/events/performance.jpg',
    'sports': '/images/events/sports.jpg',
    'community': '/images/events/community.jpg'
  },
  
  // Event duration defaults (in hours) when not specified
  defaultDurations: {
    'meeting': 1,
    'workshop': 2,
    'performance': 2,
    'festival': 4,
    'market': 6,
    'default': 1
  }
};