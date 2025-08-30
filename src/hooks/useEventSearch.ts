import { useState, useMemo, useCallback } from 'react';
import { CalendarEvent } from '../services/types/calendar';
import { EventSearchService, SearchOptions, SearchResult } from '../services/search/EventSearchService';

interface UseEventSearchResult {
  searchResults: SearchResult[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchOptions: SearchOptions;
  setSearchOptions: (options: Partial<SearchOptions>) => void;
  clearSearch: () => void;
  isSearchActive: boolean;
  suggestions: string[];
  popularTerms: string[];
}

export function useEventSearch(events: CalendarEvent[]): UseEventSearchResult {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOptions, setSearchOptionsState] = useState<SearchOptions>({
    query: '',
    maxResults: 50
  });

  const searchService = useMemo(() => new EventSearchService(), []);

  const setSearchOptions = useCallback((newOptions: Partial<SearchOptions>) => {
    setSearchOptionsState(prev => ({ ...prev, ...newOptions }));
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchOptionsState({
      query: '',
      maxResults: 50
    });
  }, []);

  // Update search options when query changes
  const effectiveOptions = useMemo(() => ({
    ...searchOptions,
    query: searchQuery
  }), [searchOptions, searchQuery]);

  const searchResults = useMemo(() => {
    return searchService.searchEvents(events, effectiveOptions);
  }, [searchService, events, effectiveOptions]);

  const isSearchActive = useMemo(() => {
    return !!(searchQuery.trim().length > 0);
  }, [searchQuery]);

  const suggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    return searchService.getSearchSuggestions(events, searchQuery);
  }, [searchService, events, searchQuery]);

  const popularTerms = useMemo(() => {
    return searchService.getPopularSearchTerms(events);
  }, [searchService, events]);

  return {
    searchResults,
    searchQuery,
    setSearchQuery,
    searchOptions: effectiveOptions,
    setSearchOptions,
    clearSearch,
    isSearchActive,
    suggestions,
    popularTerms
  };
}