import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, Utensils, Building, Users, Filter, X } from 'lucide-react';
import { Header } from '../generated/Header';
import { Footer } from '../generated/Footer';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { CalendarService } from '../../services/calendar/CalendarService';
import { DEFAULT_CALENDAR_CONFIG } from '../../services/calendar/config';
import { 
  useUniversalSearch, 
  convertEventToSearchable, 
  convertAttractionToSearchable, 
  convertBusinessToSearchable,
  convertServiceToSearchable
} from '../../hooks/useUniversalSearch';
import { 
  SearchableAttraction, 
  SearchableBusiness, 
  SearchableService, 
  SearchableEvent,
  UniversalSearchResult 
} from '../../services/search/UniversalSearchService';
import { SearchResultCard } from './SearchResultCard';
import { SearchFilters } from './SearchFilters';

// Sample data - in production these would come from data services
const sampleAttractions = [{
  id: '1',
  name: 'Stone Zoo',
  category: 'Family',
  description: 'Home to over 100 species of animals',
  address: '149 Pond St, Stoneham, MA',
  url: 'https://www.zoonewengland.org/stone-zoo/',
  imageUrl: '/images/stone-zoo.jpg'
}, {
  id: '2',
  name: 'Spot Pond',
  category: 'Nature',
  description: 'Beautiful reservoir perfect for walking and fishing',
  address: 'Woodland Rd, Stoneham, MA',
  imageUrl: '/images/spot-pond.png'
}, {
  id: '3',
  name: 'Town Common',
  category: 'Historic',
  description: 'Historic town center with beautiful landscaping',
  address: 'Main St, Stoneham, MA',
  imageUrl: '/images/town-hall.jpg'
}, {
  id: '4',
  name: 'Middlesex Fells Reservation',
  category: 'Nature',
  description: 'Hike, bike, fish, or let your dog run free. Rent a canoe or kayak to explore Spot Pond',
  address: 'Stoneham, MA',
  imageUrl: '/images/middlesex-fells.jpg'
}];

const sampleServices = [{
  id: '1',
  name: 'Stoneham Public Library',
  category: 'Education',
  description: 'Community library with extensive resources and programs',
  contact: '(781) 438-1324',
  email: 'info@stonehamlibrary.org',
  website: 'https://stonehamlibrary.org/'
}, {
  id: '2',
  name: 'Recreation Department',
  category: 'Recreation',
  description: 'Community recreation programs and facility management',
  contact: '(781) 438-1077'
}, {
  id: '3',
  name: 'Stoneham Senior Center',
  category: 'Community',
  description: 'Programs and services for Stoneham seniors',
  contact: '(781) 438-1085',
  website: 'https://www.stonehamseniorcenter.org/'
}];

// Sample businesses data - in production would come from Google Places or local database
const sampleBusinesses: SearchableBusiness[] = [{
  id: '1',
  name: 'Papa Gino\'s',
  category: 'Pizza',
  description: 'Popular pizza chain with fresh ingredients',
  address: '123 Main St, Stoneham, MA',
  phone: '(781) 123-4567',
  rating: 4.2,
  priceLevel: 2,
  businessType: 'restaurant',
  features: ['Takeout', 'Delivery', 'Family Friendly'],
  type: 'business'
}, {
  id: '2',
  name: 'Stoneham Hardware',
  category: 'Hardware Store',
  description: 'Local hardware store with tools and home improvement supplies',
  address: '456 Main St, Stoneham, MA',
  phone: '(781) 234-5678',
  rating: 4.5,
  priceLevel: 2,
  businessType: 'shop',
  features: ['Local Business', 'Hardware', 'Tools'],
  type: 'business'
}];

interface SearchResultsPageProps {
  googleApiKey?: string;
}

export function SearchResultsPage({ googleApiKey }: SearchResultsPageProps) {
  const [events, setEvents] = useState<SearchableEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'events' | 'attractions' | 'businesses' | 'services'>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Convert sample data to searchable format
  const attractions = sampleAttractions.map(convertAttractionToSearchable);
  const services = sampleServices.map(convertServiceToSearchable);
  const businesses = sampleBusinesses;

  const {
    searchResults,
    resultsByType,
    searchQuery,
    setSearchQuery,
    clearSearch,
    isSearchActive,
    suggestions,
    totalResults,
    resultCounts
  } = useUniversalSearch({
    attractions,
    businesses,
    services,
    events
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    if (!googleApiKey) {
      setEvents([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const calendarService = new CalendarService(DEFAULT_CALENDAR_CONFIG, googleApiKey);
      const consolidatedEvents = await calendarService.consolidateEvents();
      const searchableEvents = consolidatedEvents.map(convertEventToSearchable);
      setEvents(searchableEvents);
    } catch (err) {
      setError('Failed to load events. Search results may be limited.');
      console.error('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  };

  const getResultsToShow = () => {
    switch (activeTab) {
      case 'events':
        return resultsByType.events;
      case 'attractions':
        return resultsByType.attractions;
      case 'businesses':
        return resultsByType.businesses;
      case 'services':
        return resultsByType.services;
      default:
        return searchResults;
    }
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'events':
        return <Calendar className="w-4 h-4" />;
      case 'attractions':
        return <MapPin className="w-4 h-4" />;
      case 'businesses':
        return <Utensils className="w-4 h-4" />;
      case 'services':
        return <Users className="w-4 h-4" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#404040] mb-2">
            {isSearchActive ? 'Search Results' : 'Search'}
          </h1>
          <p className="text-[#666666] text-lg">
            {isSearchActive 
              ? `Found ${totalResults} results for "${searchQuery}"`
              : 'Search across events, attractions, dining, and community services'
            }
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#404040]/50" />
            <input
              type="text"
              placeholder="Search events, attractions, dining, and services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[#D2E5F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007B9E] focus:border-transparent text-[#404040]"
            />
          </div>
          
          {/* Search suggestions */}
          {suggestions.length > 0 && searchQuery.trim() && (
            <div className="mt-3">
              <div className="text-sm text-[#666666] mb-2">Suggestions:</div>
              <div className="flex flex-wrap gap-2">
                {suggestions.map(suggestion => (
                  <button
                    key={suggestion}
                    onClick={() => setSearchQuery(suggestion)}
                    className="px-3 py-1 bg-[#F0F9FF] text-[#007B9E] text-sm rounded-full hover:bg-[#E0F2FE] transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Clear search */}
          {isSearchActive && (
            <div className="mt-3 flex items-center justify-between">
              <button
                onClick={clearSearch}
                className="text-sm text-[#007B9E] hover:text-[#005f7a] underline"
              >
                Clear search
              </button>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-[#D2E5F1] text-[#007B9E] rounded-lg hover:bg-[#B6D8E5] transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Filters */}
        {showFilters && isSearchActive && (
          <SearchFilters />
        )}

        {/* Results Tabs */}
        {isSearchActive && (
          <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
            <div className="flex flex-wrap border-b border-[#D2E5F1]">
              {[
                { key: 'all', label: 'All Results', count: totalResults },
                { key: 'events', label: 'Events', count: resultCounts.events },
                { key: 'attractions', label: 'Attractions', count: resultCounts.attractions },
                { key: 'businesses', label: 'Dining & Shopping', count: resultCounts.businesses },
                { key: 'services', label: 'Services', count: resultCounts.services }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                    activeTab === tab.key
                      ? 'border-[#007B9E] text-[#007B9E] bg-[#F0F9FF]'
                      : 'border-transparent text-[#666666] hover:text-[#404040] hover:bg-[#F7F7F7]'
                  }`}
                >
                  {getTabIcon(tab.key)}
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      activeTab === tab.key
                        ? 'bg-[#007B9E] text-white'
                        : 'bg-[#D2E5F1] text-[#666666]'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 text-[#B91C1C]">
              <X className="w-5 h-5" />
              <span className="font-medium">Warning</span>
            </div>
            <p className="text-[#B91C1C] mt-1">{error}</p>
          </div>
        )}

        {/* Search Results */}
        {!loading && (
          <>
            {isSearchActive ? (
              getResultsToShow().length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getResultsToShow().map((result) => (
                    <SearchResultCard key={`${result.type}-${result.item.id}`} result={result} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-[#D2E5F1] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-[#007B9E]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#404040] mb-2">No results found</h3>
                  <p className="text-[#666666] mb-6">
                    Try different keywords or clear your search to browse all content.
                  </p>
                  <button
                    onClick={clearSearch}
                    className="bg-[#007B9E] hover:bg-[#2A6F4D] text-white font-semibold px-6 py-3 rounded-full transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              )
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-[#D2E5F1] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-[#007B9E]" />
                </div>
                <h3 className="text-xl font-semibold text-[#404040] mb-2">Start Your Search</h3>
                <p className="text-[#666666] mb-6">
                  Enter keywords to find events, attractions, restaurants, shops, and community services.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['events', 'dining', 'zoo', 'library', 'recreation', 'pond'].map(suggestion => (
                    <button
                      key={suggestion}
                      onClick={() => setSearchQuery(suggestion)}
                      className="px-4 py-2 bg-[#D2E5F1] text-[#007B9E] rounded-full hover:bg-[#B6D8E5] transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}