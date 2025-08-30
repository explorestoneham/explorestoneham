import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Filter } from 'lucide-react';
import { Header } from '../generated/Header';
import { Footer } from '../generated/Footer';
import { AttractionFilters } from './AttractionFilters';

interface Attraction {
  id: string;
  name: string;
  category: string;
  rating: number;
  image: string;
  imageUrl?: string; // New field for actual image URLs
  description: string;
  address: string;
  url?: string;
}

// Import the attractions data (we'll need to export it from MainContentArea)
const attractions: Attraction[] = [{
  id: '1',
  name: 'Stone Zoo',
  category: 'Family',
  rating: 4.5,
  image: 'zoo',
  imageUrl: '/images/stone-zoo.gif',
  description: 'Home to over 100 species of animals',
  address: '149 Pond St, Stoneham, MA',
  url: 'https://www.zoonewengland.org/stone-zoo/'
}, {
  id: '2',
  name: 'Spot Pond',
  category: 'Nature',
  rating: 4.8,
  image: 'pond',
  imageUrl: '/images/middlesex-fells.jpg',
  description: 'Beautiful reservoir perfect for walking and fishing',
  address: 'Woodland Rd, Stoneham, MA'
}, {
  id: '3',
  name: 'Town Common',
  category: 'Historic',
  rating: 4.3,
  image: 'common',
  imageUrl: '/images/town-hall.jpg',
  description: 'Historic town center with beautiful landscaping',
  address: 'Main St, Stoneham, MA'
}, {
  id: '4',
  name: 'Middlesex Fells Reservation',
  category: 'Nature',
  rating: 4.7,
  image: 'fells',
  imageUrl: '/images/middlesex-fells.jpg',
  description: 'Hike, bike, fish, or let your dog run free. Rent a canoe or kayak to explore Spot Pond',
  address: 'Stoneham, MA'
}, {
  id: '5',
  name: 'Stoneham Unicorn Golf Course',
  category: 'Recreation',
  rating: 4.2,
  image: 'golf',
  imageUrl: '/images/unicorn-golf-course.jpg',
  description: 'Public golf course offering a challenging and enjoyable experience',
  address: 'Stoneham, MA',
  url: 'https://www.unicorngc.com'
}, {
  id: '6',
  name: 'Stoneham Oaks Golf Course',
  category: 'Recreation',
  rating: 4.4,
  image: 'golf',
  imageUrl: '/images/stoneham-oaks.webp',
  description: 'Premier golf course with excellent facilities and beautiful scenery',
  address: 'Stoneham, MA',
  url: 'https://www.stonehamoaks.com'
}, {
  id: '7',
  name: 'Spot Pond Boathouse',
  category: 'Recreation',
  rating: 4.5,
  image: 'boating',
  imageUrl: '/images/spot-pond-boathouse.jpg',
  description: 'Sailing, kayaking, and canoeing on scenic Spot Pond',
  address: 'Stoneham, MA',
  url: 'https://boatinginboston.com/boathouses/spot-pond/'
}, {
  id: '8',
  name: 'Hall Memorial Pool',
  category: 'Recreation',
  rating: 4.3,
  image: 'pool',
  imageUrl: '/images/hall-memorial-pool.jpeg',
  description: 'Cool off in the summer months at this community pool',
  address: 'Stoneham, MA',
  url: 'https://bgcstoneham.org/hall-memorial-pool/'
}, {
  id: '9',
  name: 'Greater Boston Stage Company',
  category: 'Arts',
  rating: 4.6,
  image: 'theater',
  imageUrl: '/images/greater-boston-stage.jpg',
  description: 'Professional theater company presenting quality productions',
  address: 'Stoneham, MA',
  url: 'https://www.greaterbostonstage.org/'
}];

const AttractionCard: React.FC<{ attraction: Attraction }> = ({ attraction }) => {
  const handleClick = () => {
    if (attraction.url) {
      window.open(attraction.url, '_blank');
    }
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-lg overflow-hidden border border-[#D2E5F1] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${attraction.url ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      <div className="h-48 overflow-hidden">
        {attraction.imageUrl ? (
          <>
            <img 
              src={attraction.imageUrl} 
              alt={attraction.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to gradient background if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="h-48 bg-gradient-to-br from-[#007B9E] to-[#2A6F4D] flex items-center justify-center hidden">
              <MapPin className="w-12 h-12 text-white" />
            </div>
          </>
        ) : (
          <div className="h-48 bg-gradient-to-br from-[#007B9E] to-[#2A6F4D] flex items-center justify-center">
            <MapPin className="w-12 h-12 text-white" />
          </div>
        )}
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
        {attraction.url && (
          <div className="mt-3 text-xs text-[#007B9E]">
            Click to visit website →
          </div>
        )}
      </div>
    </div>
  );
};

export function AttractionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'category'>('rating');

  // Initialize search query from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, []);

  // Filter and search attractions
  const filteredAttractions = attractions.filter(attraction => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attraction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attraction.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attraction.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(attraction.category);

    return matchesSearch && matchesCategory;
  });

  // Sort attractions
  const sortedAttractions = [...filteredAttractions].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return b.rating - a.rating;
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  const availableCategories = [...new Set(attractions.map(attraction => attraction.category))];

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery('');
    setSortBy('rating');
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#404040] mb-2">
              Local Attractions
            </h1>
            <p className="text-[#666666] text-lg">
              Explore the best of what Stoneham has to offer
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#404040]/50" />
            <input
              type="text"
              placeholder="Search attractions by name, description, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[#D2E5F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007B9E] focus:border-transparent text-[#404040]"
            />
          </div>

          {/* Clear search */}
          {searchQuery && (
            <div className="mt-3">
              <button
                onClick={() => setSearchQuery('')}
                className="text-sm text-[#007B9E] hover:text-[#005f7a] underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        <AttractionFilters
          availableCategories={availableCategories}
          selectedCategories={selectedCategories}
          sortBy={sortBy}
          onCategoryToggle={handleCategoryToggle}
          onSortChange={setSortBy}
          onClearFilters={clearFilters}
        />

        <div className="mb-6">
          <div className="text-sm text-[#666666]">
            Showing {sortedAttractions.length} of {attractions.length} attractions
            {searchQuery && ` for "${searchQuery}"`}
          </div>
        </div>

        {sortedAttractions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-[#666666] text-lg">
              No attractions found matching your criteria.
            </div>
            <button
              onClick={clearFilters}
              className="mt-4 text-blue-600 hover:text-blue-700 underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAttractions.map(attraction => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}