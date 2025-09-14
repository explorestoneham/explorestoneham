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
    types: ['restaurant', 'food', 'meal_takeaway', 'cafe', 'bakery', 'bar', 'night_club'],
    keywords: ['restaurant', 'cafe', 'pizza', 'food', 'dining', 'bar', 'grill', 'eatery', 'bistro']
  },
  shop: {
    types: [
      'store', 'shopping_mall', 'pharmacy', 'bank', 'gas_station', 'car_repair',
      'grocery_or_supermarket', 'convenience_store', 'drugstore', 'clothing_store',
      'electronics_store', 'hardware_store', 'home_goods_store', 'department_store',
      'florist', 'pet_store', 'beauty_salon', 'hair_care', 'spa', 'gym',
      'insurance_agency', 'real_estate_agency', 'lawyer', 'dentist', 'doctor',
      'veterinary_care', 'accounting'
    ],
    keywords: ['shop', 'store', 'pharmacy', 'bank', 'automotive', 'retail', 'market', 'walgreens', 'cvs']
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
  if (name.includes('ice cream') || name.includes('gelato') || name.includes('frozen yogurt')) return 'Ice Cream';
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

  // Personal care & beauty
  if (types.includes('hair_care') || name.includes('barber') || name.includes('salon')) return 'Hair & Beauty';
  if (types.includes('beauty_salon') || name.includes('nail') || name.includes('spa')) return 'Beauty & Spa';

  // Professional services
  if (types.includes('insurance_agency') || name.includes('insurance')) return 'Insurance';
  if (types.includes('real_estate_agency') || name.includes('realtor') || name.includes('real estate')) return 'Real Estate';
  if (types.includes('lawyer') || name.includes('attorney') || name.includes('law')) return 'Legal';
  if (types.includes('accounting') || name.includes('tax') || name.includes('cpa')) return 'Financial Services';

  // Specialty shops
  if (types.includes('florist') || name.includes('flower') || name.includes('florist')) return 'Florist';
  if (types.includes('pet_store') || name.includes('pet') || name.includes('veterinary')) return 'Pet Services';
  if (types.includes('hardware_store') || name.includes('hardware')) return 'Hardware';

  // Health & fitness
  if (types.includes('gym') || types.includes('spa') || name.includes('fitness') || name.includes('yoga')) return 'Health & Fitness';
  if (types.includes('dentist') || types.includes('doctor') || types.includes('hospital')) return 'Healthcare';

  return 'Services';
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
  const name = (place.name || '').toLowerCase();
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
    if (types.includes('convenience_store') || name.includes('convenience')) {
      description = 'Convenience store';
    } else if (types.includes('grocery_or_supermarket') || name.includes('stop') || name.includes('shop')) {
      description = 'Grocery store';
    } else if (types.includes('pharmacy') || types.includes('drugstore') || name.includes('walgreens') || name.includes('cvs')) {
      description = 'Pharmacy';
    } else if (types.includes('hair_care') || name.includes('barber') || name.includes('salon')) {
      description = 'Hair salon';
    } else if (types.includes('beauty_salon') || name.includes('nail') || name.includes('spa')) {
      description = 'Beauty salon';
    } else if (types.includes('spa')) {
      description = 'Spa & wellness center';
    } else if (types.includes('gym') || name.includes('fitness')) {
      description = 'Fitness center';
    } else if (types.includes('clothing_store')) {
      description = 'Clothing store';
    } else if (types.includes('gas_station')) {
      description = 'Gas station';
    } else if (types.includes('car_repair')) {
      description = 'Auto service center';
    } else if (types.includes('bank') || types.includes('atm')) {
      description = 'Bank';
    } else if (types.includes('real_estate_agency') || name.includes('realtor')) {
      description = 'Real estate office';
    } else if (types.includes('dentist')) {
      description = 'Dental practice';
    } else if (types.includes('doctor') || types.includes('hospital')) {
      description = 'Medical practice';
    } else if (types.includes('veterinary_care') || name.includes('vet')) {
      description = 'Veterinary clinic';
    } else if (types.includes('insurance_agency') || name.includes('insurance')) {
      description = 'Insurance agency';
    } else if (types.includes('florist') || name.includes('flower')) {
      description = 'Florist';
    } else if (types.includes('hardware_store') || name.includes('hardware')) {
      description = 'Hardware store';
    } else if (types.includes('electronics_store')) {
      description = 'Electronics store';
    } else if (types.includes('department_store')) {
      description = 'Department store';
    } else if (types.includes('pet_store') || name.includes('pet')) {
      description = 'Pet store';
    } else if (types.includes('lawyer') || name.includes('attorney')) {
      description = 'Law office';
    } else if (types.includes('accounting') || name.includes('tax')) {
      description = 'Accounting service';
    } else {
      description = 'Local business';
    }
  }

  // Add descriptive features
  const descriptors: string[] = [];
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

      // Define targeted search queries for different business types
      const searchQueries = [
        'restaurants in Stoneham MA',
        'fast food in Stoneham MA',
        'pizza in Stoneham MA',
        'cafe in Stoneham MA',
        'bakery in Stoneham MA',
        'ice cream in Stoneham MA',
        'stores in Stoneham MA',
        'shops in Stoneham MA',
        'pharmacy in Stoneham MA',
        'bank in Stoneham MA',
        'gas station in Stoneham MA',
        'hair salon in Stoneham MA',
        'nail salon in Stoneham MA',
        'barber in Stoneham MA',
        'spa in Stoneham MA',
        'florist in Stoneham MA',
        'insurance in Stoneham MA',
        'real estate in Stoneham MA',
        'attorney in Stoneham MA',
        'dentist in Stoneham MA',
        'doctor in Stoneham MA',
        'veterinarian in Stoneham MA',
        'gym in Stoneham MA',
        'auto repair in Stoneham MA',
        'hardware store in Stoneham MA'
      ];

      // Filter queries based on business type if specified
      const filteredQueries = filterType && filterType !== 'all'
        ? searchQueries.filter(query => {
            if (filterType === 'restaurant') {
              return query.includes('restaurant') || query.includes('fast food') ||
                     query.includes('pizza') || query.includes('cafe') ||
                     query.includes('bakery') || query.includes('ice cream');
            } else {
              return !query.includes('restaurant') && !query.includes('fast food') &&
                     !query.includes('pizza') && !query.includes('cafe') &&
                     !query.includes('bakery') && !query.includes('ice cream');
            }
          })
        : searchQueries;

      // Make multiple text searches
      const searchPromises = filteredQueries.map(query => {
        return new Promise<any[]>((resolve) => {
          service.textSearch({
            query: query,
            location: new window.google.maps.LatLng(config.location.lat, config.location.lng),
            radius: 5000 // 5km radius as fallback, but query text should be primary filter
          }, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
              resolve(results);
            } else {
              resolve([]);
            }
          });
        });
      });

      Promise.all(searchPromises).then((allResults) => {
        // Flatten and deduplicate results by place_id
        const allPlaces = allResults.flat();
        const uniquePlaces = allPlaces.reduce((acc, place) => {
          if (place.place_id && !acc.some(existing => existing.place_id === place.place_id)) {
            acc.push(place);
          }
          return acc;
        }, [] as any[]);

        console.log(`Found ${uniquePlaces.length} unique businesses from ${filteredQueries.length} search queries`);

        if (uniquePlaces.length > 0) {
          // Get detailed information for each place
          const detailsPromises = uniquePlaces.map((place) => {
            return new Promise<Business | null>((resolve) => {
              if (!place.place_id) {
                resolve(null);
                return;
              }

              service.getDetails({
                placeId: place.place_id,
                fields: [
                  'place_id', 'name', 'rating', 'user_ratings_total', 'price_level',
                  'formatted_address', 'formatted_phone_number', 'website', 'opening_hours',
                  'photos', 'types', 'geometry'
                ]
              }, (detailsResult, detailsStatus) => {
                if (detailsStatus === window.google.maps.places.PlacesServiceStatus.OK && detailsResult) {
                  const businessType = mapPlaceToType(detailsResult);
                  const googlePhotoUrl = getGooglePhotoUrl(detailsResult, config);

                  resolve({
                    id: detailsResult.place_id || `place-${Math.random()}`,
                    name: detailsResult.name || 'Unknown Business',
                    category: mapPlaceToCategory(detailsResult),
                    type: businessType,
                    rating: detailsResult.rating && detailsResult.rating > 0 ? Math.min(Math.max(detailsResult.rating, 0), 5) : 0,
                    reviewCount: detailsResult.user_ratings_total || 0,
                    priceLevel: detailsResult.price_level ?? 0,
                    address: detailsResult.formatted_address || '',
                    phone: detailsResult.formatted_phone_number,
                    website: detailsResult.website,
                    hours: formatHours(detailsResult.opening_hours),
                    image: googlePhotoUrl ? `/api/image-proxy?url=${encodeURIComponent(googlePhotoUrl)}` : undefined,
                    description: generateDescription(detailsResult, businessType),
                    features: extractFeatures(detailsResult),
                    coordinates: {
                      lat: detailsResult.geometry?.location?.lat() || config.location.lat,
                      lng: detailsResult.geometry?.location?.lng() || config.location.lng
                    },
                    placeId: detailsResult.place_id,
                    openNow: detailsResult.opening_hours ? true : undefined
                  });
                } else {
                  resolve(null);
                }
              });
            });
          });

          Promise.all(detailsPromises).then((businessDetails) => {
            const mappedBusinesses = businessDetails.filter((business): business is Business => business !== null);

            const filteredBusinesses = mappedBusinesses.filter(business => {
              // Only include businesses in Stoneham, MA using comprehensive validation
              const addressValid = isInStoneham(business.address);
              const coordsValid = isInStonehamBounds(business.coordinates.lat, business.coordinates.lng);

              // Debug logging for excluded businesses
              if (!addressValid && !coordsValid) {
                console.log(`Excluding business: ${business.name} - Address: ${business.address} - Coords: ${business.coordinates.lat}, ${business.coordinates.lng}`);
                return false;
              }

              // Log included businesses
              console.log(`Including business: ${business.name} - Address: ${business.address} - Type: ${business.type}`);

              // Filter by type if specified
              if (filterType && filterType !== 'all') {
                return business.type === filterType;
              }
              return true;
            });

            setBusinesses(filteredBusinesses);
            setLoading(false);
          }).catch((error) => {
            console.error('Error fetching place details:', error);
            setError('Failed to load business details');
            setLoading(false);
          });
        } else {
          setBusinesses([]);
          setLoading(false);
        }
      }).catch((error) => {
        console.error('Error with search queries:', error);
        setError('Failed to search for businesses');
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