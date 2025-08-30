import { useState, useMemo, useCallback, useEffect } from 'react';
import { CalendarEvent } from '../services/types/calendar';
import { 
  UniversalSearchService,
  SearchableAttraction,
  SearchableBusiness, 
  SearchableService,
  SearchableEvent,
  UniversalSearchResult,
  UniversalSearchOptions
} from '../services/search/UniversalSearchService';

interface UseUniversalSearchProps {
  attractions: SearchableAttraction[];
  businesses: SearchableBusiness[];
  services: SearchableService[];
  events: SearchableEvent[];
}

interface UseUniversalSearchResult {
  searchResults: UniversalSearchResult[];
  resultsByType: {
    attractions: UniversalSearchResult[];
    businesses: UniversalSearchResult[];
    services: UniversalSearchResult[];
    events: UniversalSearchResult[];
  };
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchOptions: UniversalSearchOptions;
  setSearchOptions: (options: Partial<UniversalSearchOptions>) => void;
  clearSearch: () => void;
  isSearchActive: boolean;
  suggestions: string[];
  totalResults: number;
  resultCounts: {
    attractions: number;
    businesses: number;
    services: number;
    events: number;
  };
}

export function useUniversalSearch({
  attractions,
  businesses,
  services,
  events
}: UseUniversalSearchProps): UseUniversalSearchResult {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOptions, setSearchOptionsState] = useState<UniversalSearchOptions>({
    query: '',
    maxResults: 50,
    minScore: 0.1
  });

  const searchService = useMemo(() => new UniversalSearchService(), []);

  // Initialize search query from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('q') || urlParams.get('search');
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, []);

  const setSearchOptions = useCallback((newOptions: Partial<UniversalSearchOptions>) => {
    setSearchOptionsState(prev => ({ ...prev, ...newOptions }));
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchOptionsState({
      query: '',
      maxResults: 50,
      minScore: 0.1
    });
  }, []);

  // Update search options when query changes
  const effectiveOptions = useMemo(() => ({
    ...searchOptions,
    query: searchQuery
  }), [searchOptions, searchQuery]);

  const { results: searchResults, resultsByType } = useMemo(() => {
    if (!searchQuery.trim()) {
      return {
        results: [],
        resultsByType: {
          attractions: [],
          businesses: [],
          services: [],
          events: []
        }
      };
    }

    return searchService.search(attractions, businesses, services, events, effectiveOptions);
  }, [searchService, attractions, businesses, services, events, effectiveOptions]);

  const isSearchActive = useMemo(() => {
    return !!(searchQuery.trim().length > 0 || searchOptions.types?.length);
  }, [searchQuery, searchOptions]);

  const suggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    return searchService.getSearchSuggestions(attractions, businesses, services, events, searchQuery);
  }, [searchService, attractions, businesses, services, events, searchQuery]);

  const totalResults = useMemo(() => {
    return searchResults.length;
  }, [searchResults]);

  const resultCounts = useMemo(() => {
    return {
      attractions: resultsByType.attractions.length,
      businesses: resultsByType.businesses.length,
      services: resultsByType.services.length,
      events: resultsByType.events.length
    };
  }, [resultsByType]);

  return {
    searchResults,
    resultsByType,
    searchQuery,
    setSearchQuery,
    searchOptions: effectiveOptions,
    setSearchOptions,
    clearSearch,
    isSearchActive,
    suggestions,
    totalResults,
    resultCounts
  };
}

// Helper function to convert CalendarEvent to SearchableEvent
export function convertEventToSearchable(event: CalendarEvent): SearchableEvent {
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    location: event.location,
    startDate: event.startDate,
    tags: event.tags,
    source: event.source,
    type: 'event'
  };
}

// Helper function to convert attraction data to SearchableAttraction
export function convertAttractionToSearchable(attraction: {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  url?: string;
  imageUrl?: string;
}): SearchableAttraction {
  return {
    id: attraction.id,
    name: attraction.name,
    category: attraction.category,
    description: attraction.description,
    address: attraction.address,
    url: attraction.url,
    imageUrl: attraction.imageUrl,
    type: 'attraction'
  };
}

// Helper function to convert business data to SearchableBusiness
export function convertBusinessToSearchable(business: {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  phone?: string;
  website?: string;
  rating: number;
  priceLevel: number;
  type: 'restaurant' | 'shop';
  features: string[];
}): SearchableBusiness {
  return {
    id: business.id,
    name: business.name,
    category: business.category,
    description: business.description,
    address: business.address,
    phone: business.phone,
    website: business.website,
    rating: business.rating,
    priceLevel: business.priceLevel,
    businessType: business.type,
    features: business.features,
    type: 'business'
  };
}

// Helper function to convert service data to SearchableService
export function convertServiceToSearchable(service: {
  id: string;
  name: string;
  category: string;
  description: string;
  contact?: string;
  email?: string;
  website?: string;
}): SearchableService {
  return {
    id: service.id,
    name: service.name,
    category: service.category,
    description: service.description,
    contact: service.contact,
    email: service.email,
    website: service.website,
    type: 'service'
  };
}