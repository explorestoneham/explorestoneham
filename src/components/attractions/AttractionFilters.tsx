import React from 'react';

interface AttractionFiltersProps {
  availableCategories: string[];
  selectedCategories: string[];
  sortBy: 'name' | 'rating' | 'category';
  onCategoryToggle: (category: string) => void;
  onSortChange: (sort: 'name' | 'rating' | 'category') => void;
  onClearFilters: () => void;
}

const CATEGORY_INFO = {
  'Family': { icon: '👨‍👩‍👧‍👦', color: 'bg-green-100 text-green-800' },
  'Nature': { icon: '🌲', color: 'bg-blue-100 text-blue-800' },
  'Historic': { icon: '🏛️', color: 'bg-purple-100 text-purple-800' },
  'Recreation': { icon: '⛳', color: 'bg-orange-100 text-orange-800' },
  'Arts': { icon: '🎭', color: 'bg-pink-100 text-pink-800' }
};

export function AttractionFilters({
  availableCategories,
  selectedCategories,
  sortBy,
  onCategoryToggle,
  onSortChange,
  onClearFilters
}: AttractionFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sort Options */}
        <div className="flex-shrink-0">
          <h3 className="text-sm font-semibold text-[#404040] mb-3">Sort By</h3>
          <div className="flex gap-2">
            {[
              { value: 'rating', label: 'Rating' },
              { value: 'name', label: 'Name' },
              { value: 'category', label: 'Category' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => onSortChange(option.value as 'name' | 'rating' | 'category')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === option.value
                    ? 'bg-[#007B9E] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-[#404040] mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {availableCategories.map(category => {
              const categoryInfo = CATEGORY_INFO[category as keyof typeof CATEGORY_INFO];
              const isSelected = selectedCategories.includes(category);
              
              return (
                <button
                  key={category}
                  onClick={() => onCategoryToggle(category)}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    isSelected
                      ? 'bg-[#007B9E] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {categoryInfo?.icon && <span>{categoryInfo.icon}</span>}
                  {category}
                  {isSelected && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
          
          {selectedCategories.length > 0 && (
            <div className="mt-3">
              <button
                onClick={onClearFilters}
                className="text-sm text-[#007B9E] hover:text-[#005f7a] underline"
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