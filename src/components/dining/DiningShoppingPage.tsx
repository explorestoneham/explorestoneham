import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, MapPin, Star, Clock, Phone, Globe, Navigation, 
  Grid, List, X, ChevronDown, Utensils, ShoppingBag, Coffee, 
  Camera, Heart, ExternalLink 
} from 'lucide-react';
import { GoogleMap } from '../maps/GoogleMap';
import { useGooglePlaces } from '../../hooks/useGooglePlaces';
import { Header } from '../generated/Header';
import { Footer } from '../generated/Footer';

interface Business {
  id: string;
  name: string;
  category: string;
  type: 'restaurant' | 'shop';
  rating: number;
  reviewCount: number;
  priceLevel: number;
  address: string;
  phone?: string;
  website?: string;
  hours: {
    [key: string]: string;
  };
  image?: string;
  description: string;
  cuisine?: string;
  features: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  placeId?: string;
  openNow?: boolean;
}

interface FilterState {
  type: 'all' | 'restaurant' | 'shop';
  category: string;
  rating: number;
  openNow: boolean;
}

interface DiningShoppingPageProps {
  googleApiKey?: string;
}

export default function DiningShoppingPage({ googleApiKey }: DiningShoppingPageProps) {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    category: 'all',
    rating: 0,
    openNow: false
  });


  const { businesses, loading, error, searchPlaces } = useGooglePlaces({
    apiKey: googleApiKey,
    location: { lat: 42.4801, lng: -71.0956 }, // Stoneham center
    radius: 2000 // 2km radius to focus on Stoneham only
  });

  useEffect(() => {
    // Simple search - let Google Places API find all businesses and we'll filter by type
    searchPlaces('', filters.type);
  }, [filters.type]); // Only depend on filter type, not API key to avoid re-triggering unnecessarily

  const categories = {
    restaurant: ['All', 'American', 'Italian', 'Pizza', 'Coffee', 'Asian', 'Mexican', 'Fast Food', 'Bakery', 'Ice Cream'],
    shop: ['All', 'Pharmacy', 'Automotive', 'Banking', 'Retail', 'Services', 'Grocery', 'Electronics', 'Hair & Beauty', 'Beauty & Spa', 'Insurance', 'Real Estate', 'Legal', 'Financial Services', 'Florist', 'Pet Services', 'Hardware', 'Health & Fitness', 'Healthcare']
  };

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filters.type === 'all' || business.type === filters.type;
    const matchesCategory = filters.category === 'all' || business.category === filters.category;
    const matchesRating = business.rating >= filters.rating;
    const matchesOpenNow = !filters.openNow || business.openNow;

    return matchesSearch && matchesType && matchesCategory && matchesRating && matchesOpenNow;
  });

  const BusinessCard: React.FC<{ business: Business }> = ({ business }) => (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-sky-tint hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => setSelectedBusiness(business)}
    >
      <div className="h-48 bg-gradient-to-br from-stoneham-green to-lakeside-blue flex items-center justify-center relative overflow-hidden">
        {business.image ? (
          <>
            <img
              src={business.image}
              alt={business.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to gradient background if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="h-48 bg-gradient-to-br from-stoneham-green to-lakeside-blue flex items-center justify-center hidden absolute inset-0">
              {business.type === 'restaurant' ? (
                <Utensils className="w-12 h-12 text-white" />
              ) : (
                <ShoppingBag className="w-12 h-12 text-white" />
              )}
            </div>
          </>
        ) : (
          <>
            {business.type === 'restaurant' ? (
              <Utensils className="w-12 h-12 text-white" />
            ) : (
              <ShoppingBag className="w-12 h-12 text-white" />
            )}
          </>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="w-3 h-3 text-beacon-gold fill-current" />
          <span className="text-xs font-semibold text-granite-gray">
            {business.rating > 0 ? business.rating.toFixed(1) : 'N/A'}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-granite-gray mb-1">{business.name}</h3>
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                business.type === 'restaurant' 
                  ? 'bg-autumn-brick text-white' 
                  : 'bg-community-sage text-white'
              }`}>
                {business.category}
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-granite-gray/70 text-sm mb-4 line-clamp-2">{business.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-granite-gray/70">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="line-clamp-1">{business.address}</span>
          </div>
          {business.phone && (
            <div className="flex items-center text-sm text-granite-gray/70">
              <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{business.phone}</span>
            </div>
          )}
          <div className="flex items-center text-sm text-granite-gray/70">
            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{business.openNow ? 'Open now' : 'Closed'}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-4">
          {business.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="px-2 py-1 bg-sky-tint text-lakeside-blue text-xs rounded-full">
              {feature}
            </span>
          ))}
          {business.features.length > 3 && (
            <span className="px-2 py-1 bg-sky-tint text-lakeside-blue text-xs rounded-full">
              +{business.features.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );

  const BusinessModal: React.FC<{ business: Business; onClose: () => void }> = ({ business, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 bg-gradient-to-br from-stoneham-green to-lakeside-blue flex items-center justify-center overflow-hidden">
          {business.image ? (
            <>
              <img
                src={business.image}
                alt={business.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to gradient background if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="h-64 bg-gradient-to-br from-stoneham-green to-lakeside-blue flex items-center justify-center hidden absolute inset-0">
                {business.type === 'restaurant' ? (
                  <Utensils className="w-16 h-16 text-white" />
                ) : (
                  <ShoppingBag className="w-16 h-16 text-white" />
                )}
              </div>
            </>
          ) : (
            <>
              {business.type === 'restaurant' ? (
                <Utensils className="w-16 h-16 text-white" />
              ) : (
                <ShoppingBag className="w-16 h-16 text-white" />
              )}
            </>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6 right-6">
            <h2 className="text-2xl font-bold text-white mb-2">{business.name}</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-beacon-gold fill-current" />
                <span className="text-white font-semibold">
                  {business.rating > 0 ? business.rating.toFixed(1) : 'No rating'}
                </span>
                {business.reviewCount > 0 && (
                  <span className="text-white/80 text-sm">({business.reviewCount} reviews)</span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-granite-gray mb-2">About</h3>
            <p className="text-granite-gray/70">{business.description}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-granite-gray mb-3">Contact & Location</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-lakeside-blue" />
                <span className="text-granite-gray">{business.address}</span>
              </div>
              {business.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-lakeside-blue" />
                  <a href={`tel:${business.phone}`} className="text-lakeside-blue hover:underline">
                    {business.phone}
                  </a>
                </div>
              )}
              {business.website && (
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-lakeside-blue" />
                  <a 
                    href={business.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lakeside-blue hover:underline flex items-center"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              )}
            </div>
          </div>
          
          {Object.keys(business.hours).length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-granite-gray mb-3">Hours</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(business.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center py-1">
                    <span className="text-granite-gray font-medium">{day}</span>
                    <span className="text-granite-gray/70">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {business.features.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-granite-gray mb-3">Features</h3>
              <div className="flex flex-wrap gap-2">
                {business.features.map((feature, index) => (
                  <span key={index} className="px-3 py-1 bg-sky-tint text-lakeside-blue text-sm rounded-full">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex space-x-3 pt-4">
            <button
              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.address)}`, '_blank')}
              className="flex-1 btn-secondary flex items-center justify-center space-x-2"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </button>
            {business.phone && (
              <button
                onClick={() => window.open(`tel:${business.phone}`, '_self')}
                className="flex-1 btn-primary flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-birch-white">
        <Header />
        <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-lakeside-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-granite-gray">Loading businesses...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-birch-white">
        <Header />
        <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
          <div className="text-center">
            <div className="w-16 h-16 bg-autumn-brick/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-autumn-brick" />
            </div>
            <h3 className="text-xl font-semibold text-granite-gray mb-2">Unable to load businesses</h3>
            <p className="text-granite-gray/70">{error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-birch-white">
      <Header />
      <main>
        {/* Page Header */}
        <div className="bg-white shadow-sm border-b border-sky-tint">
          <div className="container py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="heading-1 mb-2">Dining & Shopping</h1>
                <p className="text-lg text-granite-gray/70">
                  Discover the best restaurants and shops in Stoneham
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
              <div className="flex bg-sky-tint rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-lakeside-blue shadow-sm'
                      : 'text-granite-gray/70 hover:text-lakeside-blue'
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span className="hidden sm:inline">List</span>
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    viewMode === 'map'
                      ? 'bg-white text-lakeside-blue shadow-sm'
                      : 'text-granite-gray/70 hover:text-lakeside-blue'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span className="hidden sm:inline">Map</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b border-sky-tint">
        <div className="container py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-granite-gray/50" />
              <input
                type="text"
                placeholder="Search restaurants and shops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-sky-tint rounded-lg focus:outline-none focus:ring-2 focus:ring-lakeside-blue focus:border-transparent"
              />
            </div>
            
            {/* Quick Filters */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setFilters(prev => ({ ...prev, type: 'all' }))}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  filters.type === 'all'
                    ? 'bg-lakeside-blue text-white'
                    : 'bg-white text-granite-gray border border-sky-tint hover:bg-sky-tint'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilters(prev => ({ ...prev, type: 'restaurant' }))}
                className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  filters.type === 'restaurant'
                    ? 'bg-autumn-brick text-white'
                    : 'bg-white text-granite-gray border border-sky-tint hover:bg-sky-tint'
                }`}
              >
                <Utensils className="w-4 h-4" />
                <span>Dining</span>
              </button>
              <button
                onClick={() => setFilters(prev => ({ ...prev, type: 'shop' }))}
                className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  filters.type === 'shop'
                    ? 'bg-community-sage text-white'
                    : 'bg-white text-granite-gray border border-sky-tint hover:bg-sky-tint'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shopping</span>
              </button>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 rounded-lg font-medium transition-colors bg-white text-granite-gray border border-sky-tint hover:bg-sky-tint flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
          
          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 p-4 bg-birch-white rounded-lg border border-sky-tint"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-granite-gray mb-2">Category</label>
                    <select
                      value={filters.category}
                      onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-sky-tint rounded-lg focus:outline-none focus:ring-2 focus:ring-lakeside-blue"
                    >
                      <option value="all">All Categories</option>
                      {(filters.type === 'all' 
                        ? [...categories.restaurant, ...categories.shop]
                        : categories[filters.type as keyof typeof categories] || []
                      ).filter((cat, index, arr) => arr.indexOf(cat) === index).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-granite-gray mb-2">Minimum Rating</label>
                    <select
                      value={filters.rating}
                      onChange={(e) => setFilters(prev => ({ ...prev, rating: Number(e.target.value) }))}
                      className="w-full px-3 py-2 border border-sky-tint rounded-lg focus:outline-none focus:ring-2 focus:ring-lakeside-blue"
                    >
                      <option value={0}>Any Rating</option>
                      <option value={3}>3+ Stars</option>
                      <option value={4}>4+ Stars</option>
                      <option value={4.5}>4.5+ Stars</option>
                    </select>
                  </div>
                  
                  <div className="flex items-end">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.openNow}
                        onChange={(e) => setFilters(prev => ({ ...prev, openNow: e.target.checked }))}
                        className="w-4 h-4 text-lakeside-blue border-sky-tint rounded focus:ring-lakeside-blue"
                      />
                      <span className="text-sm font-medium text-granite-gray">Open Now</span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Results */}
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-granite-gray">
              {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'Result' : 'Results'}
            </h2>
            <p className="text-granite-gray/70">
              {filters.type === 'all' 
                ? 'All businesses' 
                : filters.type === 'restaurant' 
                  ? 'Restaurants & dining' 
                  : 'Shops & services'} in Stoneham
            </p>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map(business => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          googleApiKey ? (
            <GoogleMap
              apiKey={googleApiKey}
              center={{ lat: 42.4801, lng: -71.0956 }}
              zoom={14}
              businesses={filteredBusinesses}
              onBusinessSelect={(business: Business) => setSelectedBusiness(business)}
              className="h-[600px] rounded-xl shadow-lg border border-sky-tint"
            />
          ) : (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-sky-tint h-[600px] flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin className="w-16 h-16 text-lakeside-blue mx-auto" />
                <div>
                  <h3 className="text-xl font-semibold text-granite-gray mb-2">Google Maps Integration</h3>
                  <p className="text-granite-gray/70 max-w-md">
                    Google Maps API key required to display interactive map with business locations.
                  </p>
                </div>
              </div>
            </div>
          )
        )}

        {filteredBusinesses.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-sky-tint rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-lakeside-blue" />
            </div>
            <h3 className="text-xl font-semibold text-granite-gray mb-2">No results found</h3>
            <p className="text-granite-gray/70 mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilters({
                  type: 'all',
                  category: 'all',
                  rating: 0,
                  openNow: false
                });
              }}
              className="btn-secondary"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
      </main>

      {/* Business Detail Modal */}
      <AnimatePresence>
        {selectedBusiness && (
          <BusinessModal business={selectedBusiness} onClose={() => setSelectedBusiness(null)} />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}