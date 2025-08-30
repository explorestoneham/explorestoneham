import React from 'react';
import { Calendar, MapPin, Utensils, Users } from 'lucide-react';

export const SearchFilters: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold text-[#404040] mb-4">Search Filters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Content Type Filter */}
        <div>
          <label className="block text-sm font-medium text-[#404040] mb-2">Content Type</label>
          <div className="space-y-2">
            {[
              { id: 'events', label: 'Events', icon: Calendar, color: 'text-[#F4A300]' },
              { id: 'attractions', label: 'Attractions', icon: MapPin, color: 'text-[#007B9E]' },
              { id: 'businesses', label: 'Dining & Shopping', icon: Utensils, color: 'text-[#D95D39]' },
              { id: 'services', label: 'Services', icon: Users, color: 'text-[#2A6F4D]' }
            ].map(type => (
              <label key={type.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-[#007B9E] border-[#D2E5F1] rounded focus:ring-[#007B9E]"
                />
                <type.icon className={`w-4 h-4 ${type.color}`} />
                <span className="text-sm text-[#404040]">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-[#404040] mb-2">Location</label>
          <select className="w-full px-3 py-2 border border-[#D2E5F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007B9E] text-sm">
            <option value="">All Locations</option>
            <option value="downtown">Downtown Stoneham</option>
            <option value="main-st">Main Street</option>
            <option value="pond-st">Pond Street</option>
            <option value="woodland">Woodland Road</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-[#404040] mb-2">Category</label>
          <select className="w-full px-3 py-2 border border-[#D2E5F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007B9E] text-sm">
            <option value="">All Categories</option>
            <option value="family">Family</option>
            <option value="nature">Nature</option>
            <option value="recreation">Recreation</option>
            <option value="education">Education</option>
            <option value="community">Community</option>
            <option value="dining">Dining</option>
            <option value="shopping">Shopping</option>
          </select>
        </div>

        {/* Sort Options */}
        <div>
          <label className="block text-sm font-medium text-[#404040] mb-2">Sort By</label>
          <select className="w-full px-3 py-2 border border-[#D2E5F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007B9E] text-sm">
            <option value="relevance">Most Relevant</option>
            <option value="name">Name (A-Z)</option>
            <option value="rating">Highest Rated</option>
            <option value="recent">Most Recent</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#D2E5F1]">
        <button className="text-sm text-[#007B9E] hover:text-[#2A6F4D] underline">
          Clear All Filters
        </button>
        <button className="px-4 py-2 bg-[#007B9E] text-white rounded-lg hover:bg-[#2A6F4D] transition-colors text-sm font-medium">
          Apply Filters
        </button>
      </div>
    </div>
  );
};