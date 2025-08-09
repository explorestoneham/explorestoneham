import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Building, Search, Filter, Clock, Star, Phone, Mail, ExternalLink, ChevronRight } from 'lucide-react';
import { CalendarEvent } from '../../services/types/calendar';
import { CalendarService } from '../../services/calendar/CalendarService';
import { DEFAULT_CALENDAR_CONFIG } from '../../services/calendar/config';
import { useEventSearch } from '../../hooks/useEventSearch';
import { EventCard } from '../events/EventCard';
interface Attraction {
  id: string;
  name: string;
  category: string;
  rating: number;
  image: string;
  description: string;
  address: string;
  url?: string;
}
interface Service {
  id: string;
  name: string;
  category: string;
  contact: string;
  email: string;
  description: string;
  href?: string;
  clickable?: boolean;
}
export const MainContentArea: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [realEvents, setRealEvents] = useState<CalendarEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [calendarService] = useState(() => new CalendarService(DEFAULT_CALENDAR_CONFIG, ''));
  
  // Search functionality
  const {
    searchResults,
    searchQuery,
    setSearchQuery,
    isSearchActive
  } = useEventSearch(realEvents);
  
  // Check for search query in URL parameters on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
      // Scroll to events section
      setTimeout(() => {
        document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [setSearchQuery]);
  
  // Load real events
  useEffect(() => {
    loadRealEvents();
  }, []);
  
  const loadRealEvents = async () => {
    try {
      setEventsLoading(true);
      const consolidatedEvents = await calendarService.consolidateEvents();
      setRealEvents(consolidatedEvents);
    } catch (err) {
      console.error('Error loading events:', err);
    } finally {
      setEventsLoading(false);
    }
  };

  // Get events to display - use search results if searching, otherwise show recent events
  const getEventsToDisplay = (): CalendarEvent[] => {
    if (eventsLoading) return [];
    
    if (isSearchActive && searchQuery.trim()) {
      // Show search results, limited to first 6 for main page
      return searchResults.slice(0, 6).map(result => result.event);
    }
    
    // Show upcoming events, limited to 6 for main page
    return realEvents
      .filter(event => event.startDate >= new Date())
      .slice(0, 6);
  };
  
  const eventsToDisplay = getEventsToDisplay();
  const attractions: Attraction[] = [{
    id: '1',
    name: 'Stone Zoo',
    category: 'Family',
    rating: 4.5,
    image: 'zoo',
    description: 'Home to over 100 species of animals',
    address: '149 Pond St, Stoneham, MA',
    url: 'https://www.zoonewengland.org/stone-zoo/'
  }, {
    id: '2',
    name: 'Spot Pond',
    category: 'Nature',
    rating: 4.8,
    image: 'pond',
    description: 'Beautiful reservoir perfect for walking and fishing',
    address: 'Woodland Rd, Stoneham, MA'
  }, {
    id: '3',
    name: 'Town Common',
    category: 'Historic',
    rating: 4.3,
    image: 'common',
    description: 'Historic town center with beautiful landscaping',
    address: 'Main St, Stoneham, MA'
  }, {
    id: '4',
    name: 'Middlesex Fells Reservation',
    category: 'Nature',
    rating: 4.7,
    image: 'fells',
    description: 'Hike, bike, fish, or let your dog run free. Rent a canoe or kayak to explore Spot Pond',
    address: 'Stoneham, MA'
  }, {
    id: '5',
    name: 'Stoneham Unicorn Golf Course',
    category: 'Recreation',
    rating: 4.2,
    image: 'golf',
    description: 'Public golf course offering a challenging and enjoyable experience',
    address: 'Stoneham, MA',
    url: 'https://www.unicorngc.com'
  }, {
    id: '6',
    name: 'Stoneham Oaks Golf Course',
    category: 'Recreation',
    rating: 4.4,
    image: 'golf',
    description: 'Premier golf course with excellent facilities and beautiful scenery',
    address: 'Stoneham, MA',
    url: 'https://www.stonehamoaks.com'
  }, {
    id: '7',
    name: 'Spot Pond Boathouse',
    category: 'Recreation',
    rating: 4.5,
    image: 'boating',
    description: 'Sailing, kayaking, and canoeing on scenic Spot Pond',
    address: 'Stoneham, MA',
    url: 'https://boatinginboston.com/boathouses/spot-pond/'
  }, {
    id: '8',
    name: 'Hall Memorial Pool',
    category: 'Recreation',
    rating: 4.3,
    image: 'pool',
    description: 'Cool off in the summer months at this community pool',
    address: 'Stoneham, MA',
    url: 'https://bgcstoneham.org/hall-memorial-pool/'
  }, {
    id: '9',
    name: 'Greater Boston Stage Company',
    category: 'Arts',
    rating: 4.6,
    image: 'theater',
    description: 'Professional theater company presenting quality productions',
    address: 'Stoneham, MA',
    url: 'https://www.greaterbostonstage.org/'
  }];
  const services: Service[] = [{
    id: '1',
    name: 'Stoneham Public Library',
    category: 'Education',
    contact: '(781) 438-1324',
    email: 'info@stonehamlibrary.org',
    description: 'Community library with extensive resources and programs'
  }, {
    id: '2',
    name: 'Recreation Department',
    category: 'Recreation',
    contact: '(781) 279-2600',
    email: 'recreation@stoneham-ma.gov',
    description: 'Youth and adult programs, sports leagues, and activities'
  }, {
    id: '3',
    name: 'Senior Center',
    category: 'Community',
    contact: '(781) 438-1324',
    email: 'seniors@stoneham-ma.gov',
    description: 'Programs and services for Stoneham seniors'
  }, {
    id: '4',
    name: 'Stevens Street Recycling Center',
    category: 'Municipal Services',
    contact: '(781) 438-0760',
    email: 'dpw@stoneham-ma.gov',
    description: 'Yard waste disposal and recycling services for Stoneham residents',
    href: '/recycling-center',
    clickable: true
  }];
  const AttractionCard: React.FC<{
    attraction: Attraction;
  }> = ({
    attraction
  }) => {
    const handleClick = () => {
      if (attraction.url) {
        window.open(attraction.url, '_blank');
      }
    };
    
    return (
      <motion.div 
        whileHover={{ y: -5 }} 
        className={`bg-white rounded-xl shadow-lg overflow-hidden border border-[#D2E5F1] hover:shadow-xl transition-all duration-300 ${attraction.url ? 'cursor-pointer' : ''}`}
        onClick={handleClick}
      >
        <div className="h-48 bg-gradient-to-br from-[#007B9E] to-[#2A6F4D] flex items-center justify-center">
          <MapPin className="w-12 h-12 text-white" />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="px-3 py-1 bg-[#2A6F4D] text-white text-xs font-semibold rounded-full">
              {attraction.category}
            </span>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-[#F4A300] fill-current" />
              <span className="ml-1 text-sm font-semibold text-[#404040]">{attraction.rating}</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-[#404040] mb-2">{attraction.name}</h3>
          <p className="text-[#404040]/70 mb-4 line-clamp-2">{attraction.description}</p>
          <div className="flex items-center text-sm text-[#404040]/70">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="line-clamp-1">{attraction.address}</span>
          </div>
        </div>
      </motion.div>
    );
  };
  const ServiceCard: React.FC<{
    service: Service;
  }> = ({
    service
  }) => {
    const handleClick = () => {
      if (service.clickable && service.href) {
        (window as any).handleNavigation?.(service.href);
      }
    };

    return (
      <motion.div 
        whileHover={{
          y: -2
        }} 
        className={`bg-white rounded-xl shadow-md p-6 border border-[#D2E5F1] hover:shadow-lg transition-all duration-300 ${
          service.clickable ? 'cursor-pointer hover:border-[#007B9E]/30' : ''
        }`}
        onClick={handleClick}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <span className="px-3 py-1 bg-[#D95D39] text-white text-xs font-semibold rounded-full mr-3">
                {service.category}
              </span>
              {service.clickable && (
                <ChevronRight className="w-4 h-4 text-[#007B9E]" />
              )}
            </div>
            <h3 className="text-lg font-bold text-[#404040] mb-2">{service.name}</h3>
            <p className="text-[#404040]/70 mb-4">{service.description}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-[#404040]/70">
            <Phone className="w-4 h-4 mr-2" />
            <a 
              href={`tel:${service.contact}`} 
              className="hover:text-[#007B9E] transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {service.contact}
            </a>
          </div>
          <div className="flex items-center text-sm text-[#404040]/70">
            <Mail className="w-4 h-4 mr-2" />
            <a 
              href={`mailto:${service.email}`} 
              className="hover:text-[#007B9E] transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {service.email}
            </a>
          </div>
          {service.clickable && (
            <div className="pt-2 border-t border-[#D2E5F1]">
              <div className="flex items-center text-sm text-[#007B9E] font-medium">
                <span>Learn more</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  };
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Events Section */}
      <section id="events" className="scroll-mt-20">
        <motion.div initial={{
        opacity: 0,
        y: 50
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2A6F4D] mb-4">Upcoming Events</h2>
            <p className="text-xl text-[#404040]/70 max-w-2xl mx-auto">
              Discover exciting happenings in our vibrant community
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#404040]/50" />
              <input 
                type="text" 
                placeholder="Search events..." 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                className="w-full pl-10 pr-4 py-3 border border-[#D2E5F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007B9E] focus:border-transparent" 
              />
            </div>
            <div className="flex gap-2">
              {['all', 'Music', 'Community', 'Arts'].map(filter => <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-4 py-3 rounded-lg font-medium transition-colors ${activeFilter === filter ? 'bg-[#007B9E] text-white' : 'bg-white text-[#404040] border border-[#D2E5F1] hover:bg-[#D2E5F1]'}`}>
                  {filter === 'all' ? 'All Events' : filter}
                </button>)}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {eventsLoading ? (
              <div className="col-span-full flex items-center justify-center py-12">
                <div className="text-[#404040]/70">Loading events...</div>
              </div>
            ) : eventsToDisplay.length > 0 ? (
              eventsToDisplay.map(event => <EventCard key={event.id} event={event} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-[#404040]/70">No upcoming events at this time.</div>
              </div>
            )}
          </div>
          
          {/* Search results info */}
          {isSearchActive && searchQuery.trim() && (
            <div className="text-center mb-4">
              <p className="text-[#404040]/70">
                {searchResults.length > 0 ? (
                  <>Showing {Math.min(searchResults.length, 6)} of {searchResults.length} results for "{searchQuery}"</>
                ) : (
                  <>No events found for "{searchQuery}"</>
                )}
              </p>
              {searchResults.length > 6 && (
                <p className="text-sm text-[#007B9E] mt-1">
                  View all results on the Events page
                </p>
              )}
            </div>
          )}

          <div className="text-center">
            <button 
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).handleNavigation) {
                  const url = isSearchActive && searchQuery.trim() 
                    ? `/events?search=${encodeURIComponent(searchQuery)}` 
                    : '/events';
                  (window as any).handleNavigation(url);
                }
              }}
              className="group bg-[#2A6F4D] hover:bg-[#007B9E] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
            >
              <span>{isSearchActive && searchQuery.trim() ? 'View All Search Results' : 'View All Events'}</span>
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Attractions Section */}
      <section id="attractions" className="scroll-mt-20">
        <motion.div initial={{
        opacity: 0,
        y: 50
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2A6F4D] mb-4">Local Attractions</h2>
            <p className="text-xl text-[#404040]/70 max-w-2xl mx-auto">
              Explore the beautiful sights and destinations Stoneham has to offer
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {attractions.map(attraction => <AttractionCard key={attraction.id} attraction={attraction} />)}
          </div>

          <div className="text-center">
            <button 
              onClick={() => (window as any).handleNavigation('/attractions')}
              className="group bg-[#007B9E] hover:bg-[#2A6F4D] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
            >
              <span>Explore All Attractions</span>
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Services & Groups Section */}
      <section id="services" className="scroll-mt-20">
        <motion.div initial={{
        opacity: 0,
        y: 50
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2A6F4D] mb-4">Services & Community Groups</h2>
            <p className="text-xl text-[#404040]/70 max-w-2xl mx-auto">
              Connect with local services and join community organizations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {services.map(service => <ServiceCard key={service.id} service={service} />)}
          </div>

          <div className="text-center">
            <button className="group bg-[#D95D39] hover:bg-[#F4A300] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center mx-auto">
              <span>View Directory</span>
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* About Stoneham Section */}
      <section id="about" className="scroll-mt-20">
        <motion.div initial={{
        opacity: 0,
        y: 50
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }} className="bg-gradient-to-r from-[#93C47D]/20 to-[#D2E5F1]/20 rounded-3xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#2A6F4D] mb-6">About Stoneham</h2>
              <div className="space-y-4 text-lg text-[#404040]/80 leading-relaxed">
                <p>
                  Nestled in the heart of Massachusetts, Stoneham is a charming New England town that perfectly balances 
                  small-town charm with modern amenities. Our community is built on the foundation of neighborly spirit, 
                  rich history, and a commitment to preserving our natural beauty.
                </p>
                <p>
                  From the historic Town Common to the pristine waters of Spot Pond, Stoneham offers residents and 
                  visitors alike a peaceful retreat from the hustle and bustle of city life, while remaining 
                  conveniently connected to the greater Boston area.
                </p>
                <p>
                  Join us in celebrating what makes Stoneham special – our people, our places, and our shared commitment 
                  to building a stronger community together.
                </p>
              </div>
              
              <div className="mt-8">
                <button onClick={() => {
                  (window as any).handleNavigation?.('/historic-walking-tour');
                }} className="group bg-[#2A6F4D] hover:bg-[#007B9E] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center">
                  <span>Take the Historic Walking Tour</span>
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-[#2A6F4D] to-[#007B9E] rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="text-center text-white z-10">
                  <MapPin className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Historic Walking Tour</h3>
                  <p className="text-white/80">Explore Stoneham's Rich History</p>
                  <button onClick={() => {
                    (window as any).handleNavigation?.('/historic-walking-tour');
                  }} className="mt-4 bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full transition-colors duration-300 text-sm font-semibold">
                    Start Tour
                  </button>
                </div>
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>;
};