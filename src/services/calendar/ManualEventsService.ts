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
    },
    {
      id: 'womens-rest-circle-winter-2026-01-04',
      title: 'Women\'s Rest Circle - Winter 2026',
      description: 'Join us for a Women\'s Rest Circle - an invitation to gather in community for rest and reflection. This nurturing session includes guided yoga nidra practice, personal reflection time, and group sharing in a supportive circle. Experience deep relaxation, reconnect with your body and deeper self, and share in a safe space with other women. Perfect for those seeking structured community rest and emotional grounding during busy times.',
      startDate: new Date('2026-01-04T14:30:00-05:00'), // EST timezone
      endDate: new Date('2026-01-04T16:45:00-05:00'),
      location: 'Movement House Dance Collaborative, 214 Main Street, Stoneham, MA 02180',
      url: 'https://www.restwithali.com/about-rest-circles',
      imageUrl: '/api/image-proxy?url=https://images.squarespace-cdn.com/content/v1/671ec4ec4acff55ddcfd7a2f/39aa80e0-5c1e-4e28-b11d-0fa657d58d2b/rest+with+ali+for+website.png?format=1500w',
      source: {
        id: 'manual-events',
        name: 'Rest with Ali',
        type: 'manual',
        url: 'https://www.restwithali.com',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'wellness', 'women']
    },
    {
      id: 'rested-love-2026-02-12',
      title: 'Rested Love 2026 - Live Yoga Nidra Session',
      description: 'A care package of rest practices honoring self-love. This bonus live yoga nidra session is part of the Rested Love 2026 self-paced rest series. The full series is delivered via email on February 14th. Join Rest with Ali for this nurturing practice of deep relaxation and self-care.',
      startDate: new Date('2026-02-12T20:00:00-05:00'), // EST timezone
      endDate: new Date('2026-02-12T20:30:00-05:00'),
      location: 'Online',
      url: 'https://www.restwithali.com/yoganidraofferings',
      imageUrl: '/api/image-proxy?url=https://images.squarespace-cdn.com/content/v1/671ec4ec4acff55ddcfd7a2f/39aa80e0-5c1e-4e28-b11d-0fa657d58d2b/rest+with+ali+for+website.png?format=1500w',
      source: {
        id: 'manual-events',
        name: 'Rest with Ali',
        type: 'manual',
        url: 'https://www.restwithali.com',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'wellness']
    },
    {
      id: 'womens-rest-circle-spring-2026-03-22',
      title: 'Women\'s Rest Circle - Spring 2026',
      description: 'Join us for a Women\'s Rest Circle - an invitation to gather in community for rest and reflection. This nurturing session includes guided yoga nidra practice, personal reflection time, and group sharing in a supportive circle. Experience deep relaxation, reconnect with your body and deeper self, and share in a safe space with other women. Perfect for those seeking structured community rest and emotional grounding.',
      startDate: new Date('2026-03-22T14:30:00-04:00'), // EDT timezone
      endDate: new Date('2026-03-22T16:45:00-04:00'),
      location: 'Movement House Dance Collaborative, 214 Main Street, Stoneham, MA 02180',
      url: 'https://www.restwithali.com/yoganidraofferings',
      imageUrl: '/api/image-proxy?url=https://images.squarespace-cdn.com/content/v1/671ec4ec4acff55ddcfd7a2f/39aa80e0-5c1e-4e28-b11d-0fa657d58d2b/rest+with+ali+for+website.png?format=1500w',
      source: {
        id: 'manual-events',
        name: 'Rest with Ali',
        type: 'manual',
        url: 'https://www.restwithali.com',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'wellness', 'women']
    },
    // Stoneham Historical Society & Museum - Monthly Sunday Open House (3rd Sunday of each month, 2-4 PM)
    {
      id: 'shs-open-house-2026-02-15',
      title: 'Stoneham Historical Society Monthly Open House',
      description: 'Free admission to all ages at the Stoneham Historical Society & Museum! Enjoy exhibits including the 45\' 1968 History of Stoneham Mural, Shoe Town and military artifacts, sports memorabilia, vintage photos and much more pertaining to our "shared history." Located at 36 William Street (across from 100 year old brick school - built as a High School). All volunteer 501(c) nonprofit organization dedicated with "Pride in our Past; Faith in our Future" since 1922. Individual, Family or Life Memberships available.',
      startDate: new Date('2026-02-15T14:00:00-05:00'),
      endDate: new Date('2026-02-15T16:00:00-05:00'),
      location: '36 William Street, Stoneham, MA 02180',
      url: 'https://stonehamhistoricalsociety.org',
      imageUrl: '/api/image-proxy?url=https://stonehamhistoricalsociety.org/wp-content/uploads/2023/05/stoneham_historical_society-300x85-1-jpg.webp',
      source: {
        id: 'manual-events',
        name: 'Stoneham Historical Society & Museum',
        type: 'manual',
        url: 'https://stonehamhistoricalsociety.org',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'historical', 'family', 'free']
    },
    {
      id: 'shs-open-house-2026-03-15',
      title: 'Stoneham Historical Society Monthly Open House',
      description: 'Free admission to all ages at the Stoneham Historical Society & Museum! Enjoy exhibits including the 45\' 1968 History of Stoneham Mural, Shoe Town and military artifacts, sports memorabilia, vintage photos and much more pertaining to our "shared history." Located at 36 William Street (across from 100 year old brick school - built as a High School). All volunteer 501(c) nonprofit organization dedicated with "Pride in our Past; Faith in our Future" since 1922. Individual, Family or Life Memberships available.',
      startDate: new Date('2026-03-15T14:00:00-04:00'),
      endDate: new Date('2026-03-15T16:00:00-04:00'),
      location: '36 William Street, Stoneham, MA 02180',
      url: 'https://stonehamhistoricalsociety.org',
      imageUrl: '/api/image-proxy?url=https://stonehamhistoricalsociety.org/wp-content/uploads/2023/05/stoneham_historical_society-300x85-1-jpg.webp',
      source: {
        id: 'manual-events',
        name: 'Stoneham Historical Society & Museum',
        type: 'manual',
        url: 'https://stonehamhistoricalsociety.org',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'historical', 'family', 'free']
    },
    {
      id: 'shs-open-house-2026-04-19',
      title: 'Stoneham Historical Society Monthly Open House',
      description: 'Free admission to all ages at the Stoneham Historical Society & Museum! Enjoy exhibits including the 45\' 1968 History of Stoneham Mural, Shoe Town and military artifacts, sports memorabilia, vintage photos and much more pertaining to our "shared history." Located at 36 William Street (across from 100 year old brick school - built as a High School). All volunteer 501(c) nonprofit organization dedicated with "Pride in our Past; Faith in our Future" since 1922. Individual, Family or Life Memberships available.',
      startDate: new Date('2026-04-19T14:00:00-04:00'),
      endDate: new Date('2026-04-19T16:00:00-04:00'),
      location: '36 William Street, Stoneham, MA 02180',
      url: 'https://stonehamhistoricalsociety.org',
      imageUrl: '/api/image-proxy?url=https://stonehamhistoricalsociety.org/wp-content/uploads/2023/05/stoneham_historical_society-300x85-1-jpg.webp',
      source: {
        id: 'manual-events',
        name: 'Stoneham Historical Society & Museum',
        type: 'manual',
        url: 'https://stonehamhistoricalsociety.org',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'historical', 'family', 'free']
    },
    {
      id: 'shs-open-house-2026-05-17',
      title: 'Stoneham Historical Society Monthly Open House',
      description: 'Free admission to all ages at the Stoneham Historical Society & Museum! Enjoy exhibits including the 45\' 1968 History of Stoneham Mural, Shoe Town and military artifacts, sports memorabilia, vintage photos and much more pertaining to our "shared history." Located at 36 William Street (across from 100 year old brick school - built as a High School). All volunteer 501(c) nonprofit organization dedicated with "Pride in our Past; Faith in our Future" since 1922. Individual, Family or Life Memberships available.',
      startDate: new Date('2026-05-17T14:00:00-04:00'),
      endDate: new Date('2026-05-17T16:00:00-04:00'),
      location: '36 William Street, Stoneham, MA 02180',
      url: 'https://stonehamhistoricalsociety.org',
      imageUrl: '/api/image-proxy?url=https://stonehamhistoricalsociety.org/wp-content/uploads/2023/05/stoneham_historical_society-300x85-1-jpg.webp',
      source: {
        id: 'manual-events',
        name: 'Stoneham Historical Society & Museum',
        type: 'manual',
        url: 'https://stonehamhistoricalsociety.org',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'historical', 'family', 'free']
    },
    {
      id: 'shs-open-house-2026-06-21',
      title: 'Stoneham Historical Society Monthly Open House',
      description: 'Free admission to all ages at the Stoneham Historical Society & Museum! Enjoy exhibits including the 45\' 1968 History of Stoneham Mural, Shoe Town and military artifacts, sports memorabilia, vintage photos and much more pertaining to our "shared history." Located at 36 William Street (across from 100 year old brick school - built as a High School). All volunteer 501(c) nonprofit organization dedicated with "Pride in our Past; Faith in our Future" since 1922. Individual, Family or Life Memberships available.',
      startDate: new Date('2026-06-21T14:00:00-04:00'),
      endDate: new Date('2026-06-21T16:00:00-04:00'),
      location: '36 William Street, Stoneham, MA 02180',
      url: 'https://stonehamhistoricalsociety.org',
      imageUrl: '/api/image-proxy?url=https://stonehamhistoricalsociety.org/wp-content/uploads/2023/05/stoneham_historical_society-300x85-1-jpg.webp',
      source: {
        id: 'manual-events',
        name: 'Stoneham Historical Society & Museum',
        type: 'manual',
        url: 'https://stonehamhistoricalsociety.org',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'historical', 'family', 'free']
    },
    {
      id: 'shs-open-house-2026-07-19',
      title: 'Stoneham Historical Society Monthly Open House',
      description: 'Free admission to all ages at the Stoneham Historical Society & Museum! Enjoy exhibits including the 45\' 1968 History of Stoneham Mural, Shoe Town and military artifacts, sports memorabilia, vintage photos and much more pertaining to our "shared history." Located at 36 William Street (across from 100 year old brick school - built as a High School). All volunteer 501(c) nonprofit organization dedicated with "Pride in our Past; Faith in our Future" since 1922. Individual, Family or Life Memberships available.',
      startDate: new Date('2026-07-19T14:00:00-04:00'),
      endDate: new Date('2026-07-19T16:00:00-04:00'),
      location: '36 William Street, Stoneham, MA 02180',
      url: 'https://stonehamhistoricalsociety.org',
      imageUrl: '/api/image-proxy?url=https://stonehamhistoricalsociety.org/wp-content/uploads/2023/05/stoneham_historical_society-300x85-1-jpg.webp',
      source: {
        id: 'manual-events',
        name: 'Stoneham Historical Society & Museum',
        type: 'manual',
        url: 'https://stonehamhistoricalsociety.org',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'historical', 'family', 'free']
    },
    {
      id: 'shs-open-house-2026-08-16',
      title: 'Stoneham Historical Society Monthly Open House',
      description: 'Free admission to all ages at the Stoneham Historical Society & Museum! Enjoy exhibits including the 45\' 1968 History of Stoneham Mural, Shoe Town and military artifacts, sports memorabilia, vintage photos and much more pertaining to our "shared history." Located at 36 William Street (across from 100 year old brick school - built as a High School). All volunteer 501(c) nonprofit organization dedicated with "Pride in our Past; Faith in our Future" since 1922. Individual, Family or Life Memberships available.',
      startDate: new Date('2026-08-16T14:00:00-04:00'),
      endDate: new Date('2026-08-16T16:00:00-04:00'),
      location: '36 William Street, Stoneham, MA 02180',
      url: 'https://stonehamhistoricalsociety.org',
      imageUrl: '/api/image-proxy?url=https://stonehamhistoricalsociety.org/wp-content/uploads/2023/05/stoneham_historical_society-300x85-1-jpg.webp',
      source: {
        id: 'manual-events',
        name: 'Stoneham Historical Society & Museum',
        type: 'manual',
        url: 'https://stonehamhistoricalsociety.org',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'historical', 'family', 'free']
    },
    {
      id: 'shs-open-house-2026-09-20',
      title: 'Stoneham Historical Society Monthly Open House',
      description: 'Free admission to all ages at the Stoneham Historical Society & Museum! Enjoy exhibits including the 45\' 1968 History of Stoneham Mural, Shoe Town and military artifacts, sports memorabilia, vintage photos and much more pertaining to our "shared history." Located at 36 William Street (across from 100 year old brick school - built as a High School). All volunteer 501(c) nonprofit organization dedicated with "Pride in our Past; Faith in our Future" since 1922. Individual, Family or Life Memberships available.',
      startDate: new Date('2026-09-20T14:00:00-04:00'),
      endDate: new Date('2026-09-20T16:00:00-04:00'),
      location: '36 William Street, Stoneham, MA 02180',
      url: 'https://stonehamhistoricalsociety.org',
      imageUrl: '/api/image-proxy?url=https://stonehamhistoricalsociety.org/wp-content/uploads/2023/05/stoneham_historical_society-300x85-1-jpg.webp',
      source: {
        id: 'manual-events',
        name: 'Stoneham Historical Society & Museum',
        type: 'manual',
        url: 'https://stonehamhistoricalsociety.org',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'historical', 'family', 'free']
    },
    {
      id: 'shs-open-house-2026-10-18',
      title: 'Stoneham Historical Society Monthly Open House',
      description: 'Free admission to all ages at the Stoneham Historical Society & Museum! Enjoy exhibits including the 45\' 1968 History of Stoneham Mural, Shoe Town and military artifacts, sports memorabilia, vintage photos and much more pertaining to our "shared history." Located at 36 William Street (across from 100 year old brick school - built as a High School). All volunteer 501(c) nonprofit organization dedicated with "Pride in our Past; Faith in our Future" since 1922. Individual, Family or Life Memberships available.',
      startDate: new Date('2026-10-18T14:00:00-04:00'),
      endDate: new Date('2026-10-18T16:00:00-04:00'),
      location: '36 William Street, Stoneham, MA 02180',
      url: 'https://stonehamhistoricalsociety.org',
      imageUrl: '/api/image-proxy?url=https://stonehamhistoricalsociety.org/wp-content/uploads/2023/05/stoneham_historical_society-300x85-1-jpg.webp',
      source: {
        id: 'manual-events',
        name: 'Stoneham Historical Society & Museum',
        type: 'manual',
        url: 'https://stonehamhistoricalsociety.org',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'historical', 'family', 'free']
    },
    {
      id: 'shs-open-house-2026-11-15',
      title: 'Stoneham Historical Society Monthly Open House',
      description: 'Free admission to all ages at the Stoneham Historical Society & Museum! Enjoy exhibits including the 45\' 1968 History of Stoneham Mural, Shoe Town and military artifacts, sports memorabilia, vintage photos and much more pertaining to our "shared history." Located at 36 William Street (across from 100 year old brick school - built as a High School). All volunteer 501(c) nonprofit organization dedicated with "Pride in our Past; Faith in our Future" since 1922. Individual, Family or Life Memberships available.',
      startDate: new Date('2026-11-15T14:00:00-05:00'),
      endDate: new Date('2026-11-15T16:00:00-05:00'),
      location: '36 William Street, Stoneham, MA 02180',
      url: 'https://stonehamhistoricalsociety.org',
      imageUrl: '/api/image-proxy?url=https://stonehamhistoricalsociety.org/wp-content/uploads/2023/05/stoneham_historical_society-300x85-1-jpg.webp',
      source: {
        id: 'manual-events',
        name: 'Stoneham Historical Society & Museum',
        type: 'manual',
        url: 'https://stonehamhistoricalsociety.org',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'historical', 'family', 'free']
    },
    {
      id: 'shs-open-house-2026-12-20',
      title: 'Stoneham Historical Society Monthly Open House',
      description: 'Free admission to all ages at the Stoneham Historical Society & Museum! Enjoy exhibits including the 45\' 1968 History of Stoneham Mural, Shoe Town and military artifacts, sports memorabilia, vintage photos and much more pertaining to our "shared history." Located at 36 William Street (across from 100 year old brick school - built as a High School). All volunteer 501(c) nonprofit organization dedicated with "Pride in our Past; Faith in our Future" since 1922. Individual, Family or Life Memberships available.',
      startDate: new Date('2026-12-20T14:00:00-05:00'),
      endDate: new Date('2026-12-20T16:00:00-05:00'),
      location: '36 William Street, Stoneham, MA 02180',
      url: 'https://stonehamhistoricalsociety.org',
      imageUrl: '/api/image-proxy?url=https://stonehamhistoricalsociety.org/wp-content/uploads/2023/05/stoneham_historical_society-300x85-1-jpg.webp',
      source: {
        id: 'manual-events',
        name: 'Stoneham Historical Society & Museum',
        type: 'manual',
        url: 'https://stonehamhistoricalsociety.org',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'historical', 'family', 'free']
    },
    // Stoneham Historical Society & Museum - Speaker/Program Series (2nd Thursday, March-November, 6:45-9 PM)
    {
      id: 'shs-speaker-2026-03-12',
      title: 'Stoneham Historical Society Speaker Program',
      description: 'Free speaker/program at the Stoneham Historical Society & Museum. Join us for an engaging evening exploring local history and heritage. The museum features the 45\' 1968 History of Stoneham Mural, Shoe Town and military artifacts, sports memorabilia, vintage photos and more. Contact: historystoneham@gmail.com or 781-572-3126. Calendar of events available on website, flyers on front door and around town, Facebook or Instagram.',
      startDate: new Date('2026-03-12T18:45:00-04:00'),
      endDate: new Date('2026-03-12T21:00:00-04:00'),
      location: '36 William Street, Stoneham, MA 02180',
      url: 'https://stonehamhistoricalsociety.org',
      imageUrl: '/api/image-proxy?url=https://stonehamhistoricalsociety.org/wp-content/uploads/2023/05/stoneham_historical_society-300x85-1-jpg.webp',
      source: {
        id: 'manual-events',
        name: 'Stoneham Historical Society & Museum',
        type: 'manual',
        url: 'https://stonehamhistoricalsociety.org',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'historical', 'education', 'free']
    },
    {
      id: 'shs-speaker-2026-04-09',
      title: 'Stoneham Historical Society Speaker Program',
      description: 'Free speaker/program at the Stoneham Historical Society & Museum. Join us for an engaging evening exploring local history and heritage. The museum features the 45\' 1968 History of Stoneham Mural, Shoe Town and military artifacts, sports memorabilia, vintage photos and more. Contact: historystoneham@gmail.com or 781-572-3126. Calendar of events available on website, flyers on front door and around town, Facebook or Instagram.',
      startDate: new Date('2026-04-09T18:45:00-04:00'),
      endDate: new Date('2026-04-09T21:00:00-04:00'),
      location: '36 William Street, Stoneham, MA 02180',
      url: 'https://stonehamhistoricalsociety.org',
      imageUrl: '/api/image-proxy?url=https://stonehamhistoricalsociety.org/wp-content/uploads/2023/05/stoneham_historical_society-300x85-1-jpg.webp',
      source: {
        id: 'manual-events',
        name: 'Stoneham Historical Society & Museum',
        type: 'manual',
        url: 'https://stonehamhistoricalsociety.org',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'historical', 'education', 'free']
    },
    {
      id: 'shs-speaker-2026-05-14',
      title: 'Stoneham Historical Society Speaker Program',
      description: 'Free speaker/program at the Stoneham Historical Society & Museum. Join us for an engaging evening exploring local history and heritage. The museum features the 45\' 1968 History of Stoneham Mural, Shoe Town and military artifacts, sports memorabilia, vintage photos and more. Contact: historystoneham@gmail.com or 781-572-3126. Calendar of events available on website, flyers on front door and around town, Facebook or Instagram.',
      startDate: new Date('2026-05-14T18:45:00-04:00'),
      endDate: new Date('2026-05-14T21:00:00-04:00'),
      location: '36 William Street, Stoneham, MA 02180',
      url: 'https://stonehamhistoricalsociety.org',
      imageUrl: '/api/image-proxy?url=https://stonehamhistoricalsociety.org/wp-content/uploads/2023/05/stoneham_historical_society-300x85-1-jpg.webp',
      source: {
        id: 'manual-events',
        name: 'Stoneham Historical Society & Museum',
        type: 'manual',
        url: 'https://stonehamhistoricalsociety.org',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'historical', 'education', 'free']
    },
    {
      id: 'shs-speaker-2026-06-11',
      title: 'Stoneham Historical Society Speaker Program',
      description: 'Free speaker/program at the Stoneham Historical Society & Museum. Join us for an engaging evening exploring local history and heritage. The museum features the 45\' 1968 History of Stoneham Mural, Shoe Town and military artifacts, sports memorabilia, vintage photos and more. Contact: historystoneham@gmail.com or 781-572-3126. Calendar of events available on website, flyers on front door and around town, Facebook or Instagram.',
      startDate: new Date('2026-06-11T18:45:00-04:00'),
      endDate: new Date('2026-06-11T21:00:00-04:00'),
      location: '36 William Street, Stoneham, MA 02180',
      url: 'https://stonehamhistoricalsociety.org',
      imageUrl: '/api/image-proxy?url=https://stonehamhistoricalsociety.org/wp-content/uploads/2023/05/stoneham_historical_society-300x85-1-jpg.webp',
      source: {
        id: 'manual-events',
        name: 'Stoneham Historical Society & Museum',
        type: 'manual',
        url: 'https://stonehamhistoricalsociety.org',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'historical', 'education', 'free']
    },
    {
      id: 'shs-speaker-2026-07-09',
      title: 'Stoneham Historical Society Speaker Program',
      description: 'Free speaker/program at the Stoneham Historical Society & Museum. Join us for an engaging evening exploring local history and heritage. The museum features the 45\' 1968 History of Stoneham Mural, Shoe Town and military artifacts, sports memorabilia, vintage photos and more. Contact: historystoneham@gmail.com or 781-572-3126. Calendar of events available on website, flyers on front door and around town, Facebook or Instagram.',
      startDate: new Date('2026-07-09T18:45:00-04:00'),
      endDate: new Date('2026-07-09T21:00:00-04:00'),
      location: '36 William Street, Stoneham, MA 02180',
      url: 'https://stonehamhistoricalsociety.org',
      imageUrl: '/api/image-proxy?url=https://stonehamhistoricalsociety.org/wp-content/uploads/2023/05/stoneham_historical_society-300x85-1-jpg.webp',
      source: {
        id: 'manual-events',
        name: 'Stoneham Historical Society & Museum',
        type: 'manual',
        url: 'https://stonehamhistoricalsociety.org',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'historical', 'education', 'free']
    },
    {
      id: 'shs-speaker-2026-08-13',
      title: 'Stoneham Historical Society Speaker Program',
      description: 'Free speaker/program at the Stoneham Historical Society & Museum. Join us for an engaging evening exploring local history and heritage. The museum features the 45\' 1968 History of Stoneham Mural, Shoe Town and military artifacts, sports memorabilia, vintage photos and more. Contact: historystoneham@gmail.com or 781-572-3126. Calendar of events available on website, flyers on front door and around town, Facebook or Instagram.',
      startDate: new Date('2026-08-13T18:45:00-04:00'),
      endDate: new Date('2026-08-13T21:00:00-04:00'),
      location: '36 William Street, Stoneham, MA 02180',
      url: 'https://stonehamhistoricalsociety.org',
      imageUrl: '/api/image-proxy?url=https://stonehamhistoricalsociety.org/wp-content/uploads/2023/05/stoneham_historical_society-300x85-1-jpg.webp',
      source: {
        id: 'manual-events',
        name: 'Stoneham Historical Society & Museum',
        type: 'manual',
        url: 'https://stonehamhistoricalsociety.org',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'historical', 'education', 'free']
    },
    {
      id: 'shs-speaker-2026-09-10',
      title: 'Stoneham Historical Society Speaker Program',
      description: 'Free speaker/program at the Stoneham Historical Society & Museum. Join us for an engaging evening exploring local history and heritage. The museum features the 45\' 1968 History of Stoneham Mural, Shoe Town and military artifacts, sports memorabilia, vintage photos and more. Contact: historystoneham@gmail.com or 781-572-3126. Calendar of events available on website, flyers on front door and around town, Facebook or Instagram.',
      startDate: new Date('2026-09-10T18:45:00-04:00'),
      endDate: new Date('2026-09-10T21:00:00-04:00'),
      location: '36 William Street, Stoneham, MA 02180',
      url: 'https://stonehamhistoricalsociety.org',
      imageUrl: '/api/image-proxy?url=https://stonehamhistoricalsociety.org/wp-content/uploads/2023/05/stoneham_historical_society-300x85-1-jpg.webp',
      source: {
        id: 'manual-events',
        name: 'Stoneham Historical Society & Museum',
        type: 'manual',
        url: 'https://stonehamhistoricalsociety.org',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'historical', 'education', 'free']
    },
    {
      id: 'shs-speaker-2026-10-08',
      title: 'Stoneham Historical Society Speaker Program',
      description: 'Free speaker/program at the Stoneham Historical Society & Museum. Join us for an engaging evening exploring local history and heritage. The museum features the 45\' 1968 History of Stoneham Mural, Shoe Town and military artifacts, sports memorabilia, vintage photos and more. Contact: historystoneham@gmail.com or 781-572-3126. Calendar of events available on website, flyers on front door and around town, Facebook or Instagram.',
      startDate: new Date('2026-10-08T18:45:00-04:00'),
      endDate: new Date('2026-10-08T21:00:00-04:00'),
      location: '36 William Street, Stoneham, MA 02180',
      url: 'https://stonehamhistoricalsociety.org',
      imageUrl: '/api/image-proxy?url=https://stonehamhistoricalsociety.org/wp-content/uploads/2023/05/stoneham_historical_society-300x85-1-jpg.webp',
      source: {
        id: 'manual-events',
        name: 'Stoneham Historical Society & Museum',
        type: 'manual',
        url: 'https://stonehamhistoricalsociety.org',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'historical', 'education', 'free']
    },
    {
      id: 'shs-speaker-2026-11-12',
      title: 'Stoneham Historical Society Speaker Program',
      description: 'Free speaker/program at the Stoneham Historical Society & Museum. Join us for an engaging evening exploring local history and heritage. The museum features the 45\' 1968 History of Stoneham Mural, Shoe Town and military artifacts, sports memorabilia, vintage photos and more. Contact: historystoneham@gmail.com or 781-572-3126. Calendar of events available on website, flyers on front door and around town, Facebook or Instagram.',
      startDate: new Date('2026-11-12T18:45:00-05:00'),
      endDate: new Date('2026-11-12T21:00:00-05:00'),
      location: '36 William Street, Stoneham, MA 02180',
      url: 'https://stonehamhistoricalsociety.org',
      imageUrl: '/api/image-proxy?url=https://stonehamhistoricalsociety.org/wp-content/uploads/2023/05/stoneham_historical_society-300x85-1-jpg.webp',
      source: {
        id: 'manual-events',
        name: 'Stoneham Historical Society & Museum',
        type: 'manual',
        url: 'https://stonehamhistoricalsociety.org',
        tag: 'community',
        color: '#2A6F4D',
        enabled: true
      },
      tags: ['community', 'historical', 'education', 'free']
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