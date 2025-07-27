import React from 'react';
import { EVENT_CATEGORIES } from '../../services/calendar/config';

interface EventFiltersProps {
  availableTags: string[];
  selectedTags: string[];
  dateRange: 'week' | 'month' | 'all';
  onTagToggle: (tag: string) => void;
  onDateRangeChange: (range: 'week' | 'month' | 'all') => void;
}

export function EventFilters({
  availableTags,
  selectedTags,
  dateRange,
  onTagToggle,
  onDateRangeChange
}: EventFiltersProps) {
  const getTagInfo = (tag: string) => {
    return EVENT_CATEGORIES[tag as keyof typeof EVENT_CATEGORIES];
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Date Range Filter */}
        <div className="flex-shrink-0">
          <h3 className="text-sm font-semibold text-[#404040] mb-3">Time Period</h3>
          <div className="flex gap-2">
            {[
              { value: 'week', label: 'This Week' },
              { value: 'month', label: 'This Month' },
              { value: 'all', label: 'All Upcoming' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => onDateRangeChange(option.value as 'week' | 'month' | 'all')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  dateRange === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tag Filters */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-[#404040] mb-3">Event Categories</h3>
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => {
              const tagInfo = getTagInfo(tag);
              const isSelected = selectedTags.includes(tag);
              
              return (
                <button
                  key={tag}
                  onClick={() => onTagToggle(tag)}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tagInfo?.icon && <span>{tagInfo.icon}</span>}
                  {tagInfo?.label || tag}
                  {isSelected && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
          
          {selectedTags.length > 0 && (
            <div className="mt-3">
              <button
                onClick={() => selectedTags.forEach(tag => onTagToggle(tag))}
                className="text-sm text-blue-600 hover:text-blue-700 underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}