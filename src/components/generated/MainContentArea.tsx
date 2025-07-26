import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Building, Search, Filter, Clock, Star, Phone, Mail, ExternalLink, ChevronRight } from 'lucide-react';
interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  description: string;
  mpid?: string;
}
interface Attraction {
  id: string;
  name: string;
  category: string;
  rating: number;
  image: string;
  description: string;
  address: string;
  mpid?: string;
}
interface Service {
  id: string;
  name: string;
  category: string;
  contact: string;
  email: string;
  description: string;
  mpid?: string;
}
export const MainContentArea: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const events: Event[] = [{
    id: '1',
    title: 'Summer Concert Series',
    date: '2024-07-15',
    time: '7:00 PM',
    location: 'Town Common',
    category: 'Music',
    image: 'concert',
    description: 'Join us for an evening of live music under the stars',
    mpid: "0680d48a-a7e2-42bc-987b-43c862588dde"
  }, {
    id: '2',
    title: 'Farmers Market',
    date: '2024-07-20',
    time: '9:00 AM',
    location: 'Main Street',
    category: 'Community',
    image: 'market',
    description: 'Fresh local produce and artisan goods',
    mpid: "e60e9395-d987-4fa0-9ccb-2901115f49ef"
  }, {
    id: '3',
    title: 'Art in the Park',
    date: '2024-07-25',
    time: '10:00 AM',
    location: 'Memorial Park',
    category: 'Arts',
    image: 'art',
    description: 'Local artists showcase their work',
    mpid: "d5d29e21-795b-41ea-a8a2-8f43fe4dda7d"
  }];
  const attractions: Attraction[] = [{
    id: '1',
    name: 'Stoneham Zoo',
    category: 'Family',
    rating: 4.5,
    image: 'zoo',
    description: 'Home to over 100 species of animals',
    address: '149 Pond St, Stoneham, MA',
    mpid: "d028ca53-c907-454a-b0f6-451212c3be90"
  }, {
    id: '2',
    name: 'Spot Pond',
    category: 'Nature',
    rating: 4.8,
    image: 'pond',
    description: 'Beautiful reservoir perfect for walking and fishing',
    address: 'Woodland Rd, Stoneham, MA',
    mpid: "2b18a55b-beba-4000-b407-9c8db58e4be2"
  }, {
    id: '3',
    name: 'Town Common',
    category: 'Historic',
    rating: 4.3,
    image: 'common',
    description: 'Historic town center with beautiful landscaping',
    address: 'Main St, Stoneham, MA',
    mpid: "0970d311-518d-4203-9b77-adb42ae596bc"
  }];
  const services: Service[] = [{
    id: '1',
    name: 'Stoneham Public Library',
    category: 'Education',
    contact: '(781) 438-1324',
    email: 'info@stonehamlibrary.org',
    description: 'Community library with extensive resources and programs',
    mpid: "ad2aba16-7ee2-41c9-9898-d1ccb6524685"
  }, {
    id: '2',
    name: 'Recreation Department',
    category: 'Recreation',
    contact: '(781) 279-2600',
    email: 'recreation@stoneham-ma.gov',
    description: 'Youth and adult programs, sports leagues, and activities',
    mpid: "c933d52e-c4b8-45a6-84ff-6ff536578af1"
  }, {
    id: '3',
    name: 'Senior Center',
    category: 'Community',
    contact: '(781) 438-1324',
    email: 'seniors@stoneham-ma.gov',
    description: 'Programs and services for Stoneham seniors',
    mpid: "2d23d761-b017-4145-b5f8-8a8c78644bd5"
  }];
  const EventCard: React.FC<{
    event: Event;
  }> = ({
    event
  }) => <motion.div whileHover={{
    y: -5
  }} className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#D2E5F1] hover:shadow-xl transition-all duration-300" data-magicpath-id="0" data-magicpath-path="MainContentArea.tsx">
      <div className="h-48 bg-gradient-to-br from-[#93C47D] to-[#D2E5F1] flex items-center justify-center" data-magicpath-id="1" data-magicpath-path="MainContentArea.tsx">
        <Calendar className="w-12 h-12 text-white" data-magicpath-id="2" data-magicpath-path="MainContentArea.tsx" />
      </div>
      <div className="p-6" data-magicpath-id="3" data-magicpath-path="MainContentArea.tsx">
        <div className="flex items-center justify-between mb-2" data-magicpath-id="4" data-magicpath-path="MainContentArea.tsx">
          <span className="px-3 py-1 bg-[#F4A300] text-white text-xs font-semibold rounded-full" data-magicpath-id="5" data-magicpath-path="MainContentArea.tsx">
            {event.category}
          </span>
          <div className="text-sm text-[#404040]/70 flex items-center" data-magicpath-id="6" data-magicpath-path="MainContentArea.tsx">
            <Clock className="w-4 h-4 mr-1" data-magicpath-id="7" data-magicpath-path="MainContentArea.tsx" />
            {event.time}
          </div>
        </div>
        <h3 className="text-xl font-bold text-[#404040] mb-2" data-magicpath-id="8" data-magicpath-path="MainContentArea.tsx">{event.title}</h3>
        <p className="text-[#404040]/70 mb-4 line-clamp-2" data-magicpath-id="9" data-magicpath-path="MainContentArea.tsx">{event.description}</p>
        <div className="flex items-center justify-between" data-magicpath-id="10" data-magicpath-path="MainContentArea.tsx">
          <div className="flex items-center text-sm text-[#404040]/70" data-magicpath-id="11" data-magicpath-path="MainContentArea.tsx">
            <MapPin className="w-4 h-4 mr-1" data-magicpath-id="12" data-magicpath-path="MainContentArea.tsx" />
            {event.location}
          </div>
          <div className="text-sm font-semibold text-[#007B9E]" data-magicpath-id="13" data-magicpath-path="MainContentArea.tsx">
            {new Date(event.date).toLocaleDateString()}
          </div>
        </div>
      </div>
    </motion.div>;
  const AttractionCard: React.FC<{
    attraction: Attraction;
  }> = ({
    attraction
  }) => <motion.div whileHover={{
    y: -5
  }} className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#D2E5F1] hover:shadow-xl transition-all duration-300" data-magicpath-id="14" data-magicpath-path="MainContentArea.tsx">
      <div className="h-48 bg-gradient-to-br from-[#007B9E] to-[#2A6F4D] flex items-center justify-center" data-magicpath-id="15" data-magicpath-path="MainContentArea.tsx">
        <MapPin className="w-12 h-12 text-white" data-magicpath-id="16" data-magicpath-path="MainContentArea.tsx" />
      </div>
      <div className="p-6" data-magicpath-id="17" data-magicpath-path="MainContentArea.tsx">
        <div className="flex items-center justify-between mb-2" data-magicpath-id="18" data-magicpath-path="MainContentArea.tsx">
          <span className="px-3 py-1 bg-[#2A6F4D] text-white text-xs font-semibold rounded-full" data-magicpath-id="19" data-magicpath-path="MainContentArea.tsx">
            {attraction.category}
          </span>
          <div className="flex items-center" data-magicpath-id="20" data-magicpath-path="MainContentArea.tsx">
            <Star className="w-4 h-4 text-[#F4A300] fill-current" data-magicpath-id="21" data-magicpath-path="MainContentArea.tsx" />
            <span className="ml-1 text-sm font-semibold text-[#404040]" data-magicpath-id="22" data-magicpath-path="MainContentArea.tsx">{attraction.rating}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-[#404040] mb-2" data-magicpath-id="23" data-magicpath-path="MainContentArea.tsx">{attraction.name}</h3>
        <p className="text-[#404040]/70 mb-4 line-clamp-2" data-magicpath-id="24" data-magicpath-path="MainContentArea.tsx">{attraction.description}</p>
        <div className="flex items-center text-sm text-[#404040]/70" data-magicpath-id="25" data-magicpath-path="MainContentArea.tsx">
          <MapPin className="w-4 h-4 mr-1" data-magicpath-id="26" data-magicpath-path="MainContentArea.tsx" />
          <span className="line-clamp-1" data-magicpath-id="27" data-magicpath-path="MainContentArea.tsx">{attraction.address}</span>
        </div>
      </div>
    </motion.div>;
  const ServiceCard: React.FC<{
    service: Service;
  }> = ({
    service
  }) => <motion.div whileHover={{
    y: -2
  }} className="bg-white rounded-xl shadow-md p-6 border border-[#D2E5F1] hover:shadow-lg transition-all duration-300" data-magicpath-id="28" data-magicpath-path="MainContentArea.tsx">
      <div className="flex items-start justify-between mb-4" data-magicpath-id="29" data-magicpath-path="MainContentArea.tsx">
        <div className="flex-1" data-magicpath-id="30" data-magicpath-path="MainContentArea.tsx">
          <div className="flex items-center mb-2" data-magicpath-id="31" data-magicpath-path="MainContentArea.tsx">
            <span className="px-3 py-1 bg-[#D95D39] text-white text-xs font-semibold rounded-full mr-3" data-magicpath-id="32" data-magicpath-path="MainContentArea.tsx">
              {service.category}
            </span>
          </div>
          <h3 className="text-lg font-bold text-[#404040] mb-2" data-magicpath-id="33" data-magicpath-path="MainContentArea.tsx">{service.name}</h3>
          <p className="text-[#404040]/70 mb-4" data-magicpath-id="34" data-magicpath-path="MainContentArea.tsx">{service.description}</p>
        </div>
      </div>
      <div className="space-y-2" data-magicpath-id="35" data-magicpath-path="MainContentArea.tsx">
        <div className="flex items-center text-sm text-[#404040]/70" data-magicpath-id="36" data-magicpath-path="MainContentArea.tsx">
          <Phone className="w-4 h-4 mr-2" data-magicpath-id="37" data-magicpath-path="MainContentArea.tsx" />
          <a href={`tel:${service.contact}`} className="hover:text-[#007B9E] transition-colors">
            {service.contact}
          </a>
        </div>
        <div className="flex items-center text-sm text-[#404040]/70" data-magicpath-id="38" data-magicpath-path="MainContentArea.tsx">
          <Mail className="w-4 h-4 mr-2" data-magicpath-id="39" data-magicpath-path="MainContentArea.tsx" />
          <a href={`mailto:${service.email}`} className="hover:text-[#007B9E] transition-colors">
            {service.email}
          </a>
        </div>
      </div>
    </motion.div>;
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20" data-magicpath-id="40" data-magicpath-path="MainContentArea.tsx">
      {/* Events Section */}
      <section id="events" className="scroll-mt-20" data-magicpath-id="41" data-magicpath-path="MainContentArea.tsx">
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
      }} data-magicpath-id="42" data-magicpath-path="MainContentArea.tsx">
          <div className="text-center mb-12" data-magicpath-id="43" data-magicpath-path="MainContentArea.tsx">
            <h2 className="text-4xl font-bold text-[#2A6F4D] mb-4" data-magicpath-id="44" data-magicpath-path="MainContentArea.tsx">Upcoming Events</h2>
            <p className="text-xl text-[#404040]/70 max-w-2xl mx-auto" data-magicpath-id="45" data-magicpath-path="MainContentArea.tsx">
              Discover exciting happenings in our vibrant community
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8" data-magicpath-id="46" data-magicpath-path="MainContentArea.tsx">
            <div className="relative flex-1" data-magicpath-id="47" data-magicpath-path="MainContentArea.tsx">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#404040]/50" data-magicpath-id="48" data-magicpath-path="MainContentArea.tsx" />
              <input type="text" placeholder="Search events..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-[#D2E5F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007B9E] focus:border-transparent" data-magicpath-id="49" data-magicpath-path="MainContentArea.tsx" />
            </div>
            <div className="flex gap-2" data-magicpath-id="50" data-magicpath-path="MainContentArea.tsx">
              {['all', 'Music', 'Community', 'Arts'].map(filter => <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-4 py-3 rounded-lg font-medium transition-colors ${activeFilter === filter ? 'bg-[#007B9E] text-white' : 'bg-white text-[#404040] border border-[#D2E5F1] hover:bg-[#D2E5F1]'}`} data-magicpath-id="51" data-magicpath-path="MainContentArea.tsx">
                  {filter === 'all' ? 'All Events' : filter}
                </button>)}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8" data-magicpath-id="52" data-magicpath-path="MainContentArea.tsx">
            {events.map(event => <EventCard key={event.id} event={event} data-magicpath-uuid={(event as any)["mpid"] ?? "unsafe"} data-magicpath-id="53" data-magicpath-path="MainContentArea.tsx" />)}
          </div>

          <div className="text-center" data-magicpath-id="54" data-magicpath-path="MainContentArea.tsx">
            <button className="group bg-[#2A6F4D] hover:bg-[#007B9E] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center mx-auto" data-magicpath-id="55" data-magicpath-path="MainContentArea.tsx">
              <span data-magicpath-id="56" data-magicpath-path="MainContentArea.tsx">View All Events</span>
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" data-magicpath-id="57" data-magicpath-path="MainContentArea.tsx" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Attractions Section */}
      <section id="attractions" className="scroll-mt-20" data-magicpath-id="58" data-magicpath-path="MainContentArea.tsx">
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
      }} data-magicpath-id="59" data-magicpath-path="MainContentArea.tsx">
          <div className="text-center mb-12" data-magicpath-id="60" data-magicpath-path="MainContentArea.tsx">
            <h2 className="text-4xl font-bold text-[#2A6F4D] mb-4" data-magicpath-id="61" data-magicpath-path="MainContentArea.tsx">Local Attractions</h2>
            <p className="text-xl text-[#404040]/70 max-w-2xl mx-auto" data-magicpath-id="62" data-magicpath-path="MainContentArea.tsx">
              Explore the beautiful sights and destinations Stoneham has to offer
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8" data-magicpath-id="63" data-magicpath-path="MainContentArea.tsx">
            {attractions.map(attraction => <AttractionCard key={attraction.id} attraction={attraction} data-magicpath-uuid={(attraction as any)["mpid"] ?? "unsafe"} data-magicpath-id="64" data-magicpath-path="MainContentArea.tsx" />)}
          </div>

          <div className="text-center" data-magicpath-id="65" data-magicpath-path="MainContentArea.tsx">
            <button className="group bg-[#007B9E] hover:bg-[#2A6F4D] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center mx-auto" data-magicpath-id="66" data-magicpath-path="MainContentArea.tsx">
              <span data-magicpath-id="67" data-magicpath-path="MainContentArea.tsx">Explore All Attractions</span>
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" data-magicpath-id="68" data-magicpath-path="MainContentArea.tsx" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Services & Groups Section */}
      <section id="services" className="scroll-mt-20" data-magicpath-id="69" data-magicpath-path="MainContentArea.tsx">
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
      }} data-magicpath-id="70" data-magicpath-path="MainContentArea.tsx">
          <div className="text-center mb-12" data-magicpath-id="71" data-magicpath-path="MainContentArea.tsx">
            <h2 className="text-4xl font-bold text-[#2A6F4D] mb-4" data-magicpath-id="72" data-magicpath-path="MainContentArea.tsx">Services & Community Groups</h2>
            <p className="text-xl text-[#404040]/70 max-w-2xl mx-auto" data-magicpath-id="73" data-magicpath-path="MainContentArea.tsx">
              Connect with local services and join community organizations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8" data-magicpath-id="74" data-magicpath-path="MainContentArea.tsx">
            {services.map(service => <ServiceCard key={service.id} service={service} data-magicpath-uuid={(service as any)["mpid"] ?? "unsafe"} data-magicpath-id="75" data-magicpath-path="MainContentArea.tsx" />)}
          </div>

          <div className="text-center" data-magicpath-id="76" data-magicpath-path="MainContentArea.tsx">
            <button className="group bg-[#D95D39] hover:bg-[#F4A300] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center mx-auto" data-magicpath-id="77" data-magicpath-path="MainContentArea.tsx">
              <span data-magicpath-id="78" data-magicpath-path="MainContentArea.tsx">View Directory</span>
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" data-magicpath-id="79" data-magicpath-path="MainContentArea.tsx" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* About Stoneham Section */}
      <section id="about" className="scroll-mt-20" data-magicpath-id="80" data-magicpath-path="MainContentArea.tsx">
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
      }} className="bg-gradient-to-r from-[#93C47D]/20 to-[#D2E5F1]/20 rounded-3xl p-8 lg:p-12" data-magicpath-id="81" data-magicpath-path="MainContentArea.tsx">
          <div className="grid lg:grid-cols-2 gap-12 items-center" data-magicpath-id="82" data-magicpath-path="MainContentArea.tsx">
            <div data-magicpath-id="83" data-magicpath-path="MainContentArea.tsx">
              <h2 className="text-4xl font-bold text-[#2A6F4D] mb-6" data-magicpath-id="84" data-magicpath-path="MainContentArea.tsx">About Stoneham</h2>
              <div className="space-y-4 text-lg text-[#404040]/80 leading-relaxed" data-magicpath-id="85" data-magicpath-path="MainContentArea.tsx">
                <p data-magicpath-id="86" data-magicpath-path="MainContentArea.tsx">
                  Nestled in the heart of Massachusetts, Stoneham is a charming New England town that perfectly balances 
                  small-town charm with modern amenities. Our community is built on the foundation of neighborly spirit, 
                  rich history, and a commitment to preserving our natural beauty.
                </p>
                <p data-magicpath-id="87" data-magicpath-path="MainContentArea.tsx">
                  From the historic Town Common to the pristine waters of Spot Pond, Stoneham offers residents and 
                  visitors alike a peaceful retreat from the hustle and bustle of city life, while remaining 
                  conveniently connected to the greater Boston area.
                </p>
                <p data-magicpath-id="88" data-magicpath-path="MainContentArea.tsx">
                  Join us in celebrating what makes Stoneham special – our people, our places, and our shared commitment 
                  to building a stronger community together.
                </p>
              </div>
            </div>
            <div className="relative" data-magicpath-id="89" data-magicpath-path="MainContentArea.tsx">
              <div className="aspect-[4/3] bg-gradient-to-br from-[#2A6F4D] to-[#007B9E] rounded-2xl flex items-center justify-center" data-magicpath-id="90" data-magicpath-path="MainContentArea.tsx">
                <div className="text-center text-white" data-magicpath-id="91" data-magicpath-path="MainContentArea.tsx">
                  <Building className="w-16 h-16 mx-auto mb-4" data-magicpath-id="92" data-magicpath-path="MainContentArea.tsx" />
                  <h3 className="text-2xl font-bold mb-2" data-magicpath-id="93" data-magicpath-path="MainContentArea.tsx">Historic Stoneham</h3>
                  <p className="text-white/80" data-magicpath-id="94" data-magicpath-path="MainContentArea.tsx">Established 1725</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>;
};