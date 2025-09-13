import { useState, useEffect, useCallback } from 'react';
import { loadGoogleMapsAPI } from '../utils/googleMapsLoader';
import { isInStoneham, isInStonehamBounds } from '../utils/addressValidator';

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

interface GooglePlacesConfig {
  apiKey?: string;
  location: {
    lat: number;
    lng: number;
  };
  radius: number;
}

interface UseGooglePlacesReturn {
  businesses: Business[];
  loading: boolean;
  error: string | null;
  searchPlaces: (query: string, type?: string) => void;
  refreshPlaces: () => void;
}

// Define business categories and their mapping to Google Places types
const categoryMappings = {
  restaurant: {
    types: ['restaurant', 'food', 'meal_takeaway', 'cafe', 'bakery'],
    keywords: ['restaurant', 'cafe', 'pizza', 'food', 'dining', 'bar', 'grill']
  },
  shop: {
    types: ['store', 'shopping_mall', 'pharmacy', 'bank', 'gas_station', 'car_repair'],
    keywords: ['shop', 'store', 'pharmacy', 'bank', 'automotive', 'retail', 'market']
  }
};

const mapPlaceToType = (place: any): 'restaurant' | 'shop' => {
  const types = place.types || [];
  const name = (place.name || '').toLowerCase();
  
  // Check if it's a restaurant based on types
  if (types.some((type: string) => categoryMappings.restaurant.types.includes(type))) {
    return 'restaurant';
  }
  
  // Check if it's a restaurant based on name keywords
  if (categoryMappings.restaurant.keywords.some(keyword => name.includes(keyword))) {
    return 'restaurant';
  }
  
  // Default to shop for everything else
  return 'shop';
};

const mapPlaceToCategory = (place: any): string => {
  const types = place.types || [];
  const name = (place.name || '').toLowerCase();
  
  // Restaurant categories
  if (types.includes('cafe') || name.includes('coffee') || name.includes('cafe')) return 'Coffee';
  if (types.includes('bakery')) return 'Bakery';
  if (name.includes('pizza')) return 'Pizza';
  if (name.includes('chinese') || name.includes('thai') || name.includes('japanese') || name.includes('asian')) return 'Asian';
  if (name.includes('mexican') || name.includes('taco')) return 'Mexican';
  if (types.includes('restaurant')) return 'American';
  if (types.includes('meal_takeaway')) return 'Fast Food';
  
  // Shop categories
  if (types.includes('pharmacy')) return 'Pharmacy';
  if (types.includes('bank') || types.includes('atm')) return 'Banking';
  if (types.includes('gas_station')) return 'Gas Station';
  if (types.includes('car_repair')) return 'Automotive';
  if (types.includes('grocery_or_supermarket')) return 'Grocery';
  if (types.includes('electronics_store')) return 'Electronics';
  if (types.includes('clothing_store')) return 'Retail';
  
  return 'General';
};

const extractFeatures = (place: any): string[] => {
  const features: string[] = [];
  const types = place.types || [];

  // Note: open_now is deprecated, so we'll use opening_hours presence instead
  if (place.opening_hours) features.push('Has Hours Listed');
  if (types.includes('meal_delivery')) features.push('Delivery');
  if (types.includes('meal_takeaway')) features.push('Takeout');
  if (place.rating >= 4.5) features.push('Highly Rated');
  if (place.price_level >= 3) features.push('Upscale');
  if (place.user_ratings_total > 100) features.push('Popular');
  if (types.includes('wheelchair_accessible_entrance')) features.push('Accessible');

  return features;
};

const generateDescription = (place: any, businessType: string): string => {
  const types = place.types || [];
  const features = extractFeatures(place);
  const rating = place.rating || 0;
  const reviewCount = place.user_ratings_total || 0;

  // Base description from business type
  let description = '';

  if (businessType === 'restaurant') {
    // More specific restaurant descriptions based on types
    if (types.includes('pizza_restaurant')) {
      description = 'Pizza restaurant';
    } else if (types.includes('italian_restaurant')) {
      description = 'Italian restaurant';
    } else if (types.includes('chinese_restaurant')) {
      description = 'Chinese restaurant';
    } else if (types.includes('mexican_restaurant')) {
      description = 'Mexican restaurant';
    } else if (types.includes('american_restaurant')) {
      description = 'American restaurant';
    } else if (types.includes('breakfast_restaurant')) {
      description = 'Breakfast & brunch spot';
    } else if (types.includes('cafe')) {
      description = 'Cafe';
    } else if (types.includes('bakery')) {
      description = 'Bakery & cafe';
    } else if (types.includes('bar')) {
      description = 'Bar & grill';
    } else if (types.includes('fast_food_restaurant')) {
      description = 'Fast food restaurant';
    } else {
      description = 'Restaurant';
    }
  } else {
    // Business types
    if (types.includes('hair_care')) {
      description = 'Hair salon';
    } else if (types.includes('beauty_salon')) {
      description = 'Beauty salon';
    } else if (types.includes('spa')) {
      description = 'Spa & wellness center';
    } else if (types.includes('gym')) {
      description = 'Fitness center';
    } else if (types.includes('clothing_store')) {
      description = 'Clothing store';
    } else if (types.includes('grocery_or_supermarket')) {
      description = 'Grocery store';
    } else if (types.includes('pharmacy')) {
      description = 'Pharmacy';
    } else if (types.includes('gas_station')) {
      description = 'Gas station';
    } else if (types.includes('car_repair')) {
      description = 'Auto service center';
    } else if (types.includes('bank')) {
      description = 'Bank';
    } else if (types.includes('real_estate_agency')) {
      description = 'Real estate office';
    } else if (types.includes('dentist')) {
      description = 'Dental practice';
    } else if (types.includes('doctor')) {
      description = 'Medical practice';
    } else if (types.includes('veterinary_care')) {
      description = 'Veterinary clinic';
    } else {
      description = 'Local business';
    }
  }

  // Add descriptive features
  const descriptors = [];
  if (rating >= 4.5 && reviewCount >= 20) {
    descriptors.push('highly rated');
  } else if (rating >= 4.0 && reviewCount >= 10) {
    descriptors.push('well-reviewed');
  }

  if (features.includes('Popular')) {
    descriptors.push('popular');
  }

  if (features.includes('Delivery') && features.includes('Takeout')) {
    descriptors.push('offering delivery & takeout');
  } else if (features.includes('Delivery')) {
    descriptors.push('with delivery');
  } else if (features.includes('Takeout')) {
    descriptors.push('with takeout');
  }

  // Combine description
  let fullDescription = description;
  if (descriptors.length > 0) {
    fullDescription += ` - ${descriptors.join(', ')}`;
  }

  return fullDescription;
};

const formatHours = (openingHours: any): { [key: string]: string } => {
  if (!openingHours?.weekday_text) return {};

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hours: { [key: string]: string } = {};

  openingHours.weekday_text.forEach((dayText: string, index: number) => {
    const dayName = days[(index + 1) % 7]; // Google starts with Monday, we want Sunday first
    const timeMatch = dayText.match(/: (.+)/);
    hours[dayName] = timeMatch ? timeMatch[1] : 'Closed';
  });

  return hours;
};

const getGooglePhotoUrl = (place: any, config: GooglePlacesConfig): string | undefined => {
  if (!place.photos || place.photos.length === 0) return undefined;

  try {
    // Get the first photo
    const photo = place.photos[0];

    // Generate the photo URL with appropriate size
    const photoUrl = photo.getUrl({
      maxWidth: 800,
      maxHeight: 600
    });

    // Return the photo URL to be used with our image proxy
    return photoUrl;
  } catch (error) {
    console.warn('Failed to get Google photo URL:', error);
    return undefined;
  }
};

export const useGooglePlaces = (config: GooglePlacesConfig): UseGooglePlacesReturn => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPlaces = useCallback(async (query: string, filterType?: string) => {
    setLoading(true);
    setError(null);

    if (!config.apiKey) {
      // Return mock data when no API key is provided
      const mockBusinesses: Business[] = [
        {
          id: '1',
          name: 'The Casual Gourmet',
          category: 'American',
          type: 'restaurant',
          rating: 4.6,
          reviewCount: 127,
          priceLevel: 2,
          address: '271 Main St, Stoneham, MA 02180',
          phone: '(781) 438-8500',
          website: 'https://casualgourmet.com',
          hours: {
            'Monday': '11:00 AM - 9:00 PM',
            'Tuesday': '11:00 AM - 9:00 PM',
            'Wednesday': '11:00 AM - 9:00 PM',
            'Thursday': '11:00 AM - 9:00 PM',
            'Friday': '11:00 AM - 10:00 PM',
            'Saturday': '11:00 AM - 10:00 PM',
            'Sunday': '11:00 AM - 9:00 PM'
          },
          description: 'Upscale casual dining with fresh, locally sourced ingredients',
          cuisine: 'American',
          features: ['Outdoor Seating', 'Takeout', 'Reservations', 'Wine Bar'],
          coordinates: {
            lat: 42.4801,
            lng: -71.0956
          },
          openNow: true
        },
        {
          id: '2',
          name: 'Stoneham House of Pizza',
          category: 'Pizza',
          type: 'restaurant',
          rating: 4.3,
          reviewCount: 89,
          priceLevel: 1,
          address: '435 Main St, Stoneham, MA 02180',
          phone: '(781) 438-7374',
          hours: {
            'Monday': '11:00 AM - 10:00 PM',
            'Tuesday': '11:00 AM - 10:00 PM',
            'Wednesday': '11:00 AM - 10:00 PM',
            'Thursday': '11:00 AM - 10:00 PM',
            'Friday': '11:00 AM - 11:00 PM',
            'Saturday': '11:00 AM - 11:00 PM',
            'Sunday': '12:00 PM - 10:00 PM'
          },
          description: 'Family-owned pizzeria serving authentic Italian favorites',
          cuisine: 'Italian',
          features: ['Delivery', 'Takeout', 'Family Friendly', 'Catering'],
          coordinates: {
            lat: 42.4785,
            lng: -71.0943
          },
          openNow: true
        },
        // Add mock shop data
        {
          id: '3',
          name: 'CVS Pharmacy',
          category: 'Pharmacy',
          type: 'shop',
          rating: 4.0,
          reviewCount: 67,
          priceLevel: 2,
          address: '434 Main St, Stoneham, MA 02180',
          phone: '(781) 438-0694',
          website: 'https://cvs.com',
          hours: {
            'Monday': '8:00 AM - 10:00 PM',
            'Tuesday': '8:00 AM - 10:00 PM',
            'Wednesday': '8:00 AM - 10:00 PM',
            'Thursday': '8:00 AM - 10:00 PM',
            'Friday': '8:00 AM - 10:00 PM',
            'Saturday': '8:00 AM - 10:00 PM',
            'Sunday': '8:00 AM - 9:00 PM'
          },
          description: 'Full-service pharmacy with health and wellness products',
          features: ['Pharmacy', 'Photo Services', 'Health Clinic', 'Convenience'],
          coordinates: {
            lat: 42.4789,
            lng: -71.0945
          },
          openNow: true
        }
      ];

      const filteredMockBusinesses = filterType && filterType !== 'all' 
        ? mockBusinesses.filter(b => b.type === filterType)
        : mockBusinesses;

      setBusinesses(filteredMockBusinesses);
      setLoading(false);
      return;
    }

    try {
      // Load Google Maps API if not already loaded
      if (!window.google?.maps?.places) {
        await loadGoogleMapsAPI(config.apiKey);
      }

      const service = new window.google.maps.places.PlacesService(
        document.createElement('div')
      );

      const request = {
        location: new window.google.maps.LatLng(config.location.lat, config.location.lng),
        radius: config.radius,
        query: `${query} in Stoneham, MA`,
        fields: [
          'place_id', 'name', 'rating', 'user_ratings_total', 'price_level',
          'formatted_address', 'formatted_phone_number', 'website', 'opening_hours',
          'photos', 'types', 'geometry'
        ]
      };

      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          const mappedBusinesses: Business[] = results.map((place, index) => {
            const businessType = mapPlaceToType(place);
            const googlePhotoUrl = getGooglePhotoUrl(place, config);

            return {
              id: place.place_id || `place-${index}`,
              name: place.name || 'Unknown Business',
              category: mapPlaceToCategory(place),
              type: businessType,
              rating: place.rating && place.rating > 0 ? Math.min(Math.max(place.rating, 0), 5) : 0, // Validate rating range 0-5
              reviewCount: place.user_ratings_total || 0,
              priceLevel: place.price_level ?? 0, // 0 indicates "price not available"
              address: place.formatted_address || '',
              phone: place.formatted_phone_number,
              website: place.website,
              hours: formatHours(place.opening_hours),
              image: googlePhotoUrl ? `/api/image-proxy?url=${encodeURIComponent(googlePhotoUrl)}` : undefined,
              description: generateDescription(place, businessType),
              features: extractFeatures(place),
              coordinates: {
                lat: place.geometry?.location?.lat() || config.location.lat,
                lng: place.geometry?.location?.lng() || config.location.lng
              },
              placeId: place.place_id,
              // Note: open_now is deprecated, using a fallback approach
              openNow: place.opening_hours ? true : undefined
            };
          }).filter(business => {
            // Only include businesses in Stoneham, MA using comprehensive validation
            const addressValid = isInStoneham(business.address);
            const coordsValid = isInStonehamBounds(business.coordinates.lat, business.coordinates.lng);
            
            // Must pass both address and coordinate validation
            if (!addressValid || !coordsValid) {
              return false;
            }
            
            // Filter by type if specified
            if (filterType && filterType !== 'all') {
              return business.type === filterType;
            }
            return true;
          });

          setBusinesses(mappedBusinesses);
        } else {
          throw new Error(`Google Places API error: ${status}`);
        }
        setLoading(false);
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch places');
      setLoading(false);
    }
  }, [config.apiKey, config.location.lat, config.location.lng, config.radius]);

  const refreshPlaces = useCallback(() => {
    searchPlaces('restaurant OR store OR shop');
  }, [searchPlaces]);

  return {
    businesses,
    loading,
    error,
    searchPlaces,
    refreshPlaces
  };
};