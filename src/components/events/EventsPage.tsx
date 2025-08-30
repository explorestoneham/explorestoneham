import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import { CalendarEvent } from '../../services/types/calendar';
import { CalendarService } from '../../services/calendar/CalendarService';
import { DEFAULT_CALENDAR_CONFIG, EVENT_CATEGORIES } from '../../services/calendar/config';
import { EventCard } from './EventCard';
import { EventFilters } from './EventFilters';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Header } from '../generated/Header';
import { Footer } from '../generated/Footer';
import { useEventSearch } from '../../hooks/useEventSearch';

interface EventsPageProps {
  googleApiKey: string;
}

export function EventsPage({ googleApiKey }: EventsPageProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'all'>('month');
  const [calendarService] = useState(() => new CalendarService(DEFAULT_CALENDAR_CONFIG, googleApiKey));
  
  // Search functionality
  const {
    searchResults,
    searchQuery,
    setSearchQuery,
    setSearchOptions,
    isSearchActive,
    suggestions
  } = useEventSearch(events);

  useEffect(() => {
    loadEvents();
  }, []);

  // Initialize search query from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [setSearchQuery]);

  const updateSearchOptions = useCallback(() => {
    // Create date range filter
    let dateRangeFilter;
    if (dateRange !== 'all') {
      const now = new Date();
      const endDate = new Date();
      
      switch (dateRange) {
        case 'week':
          endDate.setDate(endDate.getDate() + 7);
          break;
        case 'month':
          endDate.setMonth(endDate.getMonth() + 1);
          break;
      }
      
      dateRangeFilter = { start: now, end: endDate };
    }

    setSearchOptions({
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      dateRange: dateRangeFilter
    });
  }, [selectedTags, dateRange, setSearchOptions]);

  useEffect(() => {
    updateSearchOptions();
  }, [updateSearchOptions]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const consolidatedEvents = await calendarService.consolidateEvents();
      setEvents(consolidatedEvents);
    } catch (err) {
      setError('Failed to load events. Please try again later.');
      console.error('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get the final filtered events (either search results or all events filtered)
  const finalEvents = isSearchActive 
    ? searchResults.map(result => result.event)
    : events.filter(event => {
        // Apply basic date filtering when not searching
        const now = new Date();
        let matchesDateRange = true;
        
        // Apply date range filter
        if (dateRange !== 'all') {
          const endDate = new Date();
          switch (dateRange) {
            case 'week':
              endDate.setDate(endDate.getDate() + 7);
              break;
            case 'month':
              endDate.setMonth(endDate.getMonth() + 1);
              break;
          }
          matchesDateRange = event.startDate >= now && event.startDate <= endDate;
        } else {
          matchesDateRange = event.startDate >= now;
        }
        
        // Apply tag filter
        let matchesTags = true;
        if (selectedTags.length > 0) {
          matchesTags = event.tags.some(eventTag => 
            selectedTags.some(selectedTag => eventTag.toLowerCase().includes(selectedTag.toLowerCase()))
          );
        }
        
        return matchesDateRange && matchesTags;
      });

  const handleRefresh = async () => {
    await loadEvents();
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleDateRangeChange = (range: 'week' | 'month' | 'all') => {
    setDateRange(range);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F7F7]">
        <Header />
        <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F7F7]">
        <Header />
        <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
          <div className="text-center">
            <div className="text-red-600 text-lg mb-4">{error}</div>
            <button
              onClick={handleRefresh}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const availableTags = [...new Set(events.flatMap(event => event.tags))];

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#404040] mb-2">
              Community Events
            </h1>
            <p className="text-[#666666] text-lg">
              Discover what's happening in Stoneham
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="mt-4 lg:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Events
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#404040]/50" />
            <input
              type="text"
              placeholder="Search events by title, description, location..."
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

        <EventFilters
          availableTags={availableTags}
          selectedTags={selectedTags}
          dateRange={dateRange}
          onTagToggle={handleTagToggle}
          onDateRangeChange={handleDateRangeChange}
        />

        <div className="mb-6">
          <div className="text-sm text-[#666666]">
            {isSearchActive ? (
              <>
                Found {finalEvents.length} event{finalEvents.length !== 1 ? 's' : ''} 
                {searchQuery.trim() && ` for "${searchQuery}"`}
              </>
            ) : (
              <>Showing {finalEvents.length} of {events.length} events</>
            )}
          </div>
        </div>

        {finalEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-[#666666] text-lg">
              No events found matching your criteria.
            </div>
            <button
              onClick={() => {
                setSelectedTags([]);
                setDateRange('month');
              }}
              className="mt-4 text-blue-600 hover:text-blue-700 underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {finalEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}