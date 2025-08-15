import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { CalendarEvent } from '../../services/types/calendar';
import { EVENT_CATEGORIES } from '../../services/calendar/config';

interface EventCardProps {
  event: CalendarEvent;
}

export function EventCard({ event }: EventCardProps) {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const getTagInfo = (tag: string) => {
    return EVENT_CATEGORIES[tag as keyof typeof EVENT_CATEGORIES];
  };

  const primaryTag = event.tags[0];
  const tagInfo = getTagInfo(primaryTag);
  const categoryLabel = tagInfo?.label || primaryTag;

  // Format time range
  const timeRange = `${formatTime(event.startDate)} - ${formatTime(event.endDate)}`;

  return (
    <motion.div 
      whileHover={{ y: -5 }} 
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#D2E5F1] hover:shadow-xl transition-all duration-300"
    >
      {/* Header with image or gradient fallback */}
      <div className="h-48 relative overflow-hidden">
        {event.imageUrl ? (
          <>
            <img 
              src={event.imageUrl} 
              alt={event.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to gradient if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.classList.add('bg-gradient-to-br', 'from-[#93C47D]', 'to-[#D2E5F1]', 'flex', 'items-center', 'justify-center');
                  const icon = document.createElement('div');
                  icon.innerHTML = '<svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>';
                  parent.appendChild(icon);
                }
              }}
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </>
        ) : (
          <div className="h-full bg-gradient-to-br from-[#93C47D] to-[#D2E5F1] flex items-center justify-center">
            <Calendar className="w-12 h-12 text-white" />
          </div>
        )}
        
        {/* Source indicator */}
        <div className="absolute top-2 right-2 z-10">
          <div
            className="px-2 py-1 rounded-full text-xs font-medium text-white shadow-lg"
            style={{ backgroundColor: event.source.color }}
          >
            {event.source.name}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Category and Time */}
        <div className="flex items-center justify-between mb-2">
          <span className="px-3 py-1 bg-[#F4A300] text-white text-xs font-semibold rounded-full">
            {categoryLabel}
          </span>
          <div className="text-sm text-[#404040]/70 flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {timeRange}
          </div>
        </div>

        {/* Event Title */}
        <h3 className="text-xl font-bold text-[#404040] mb-2 line-clamp-2">
          {event.title}
        </h3>

        {/* Event Description */}
        {event.description && event.description.trim() && (
          <p className="text-[#404040]/70 mb-4 line-clamp-2">
            {event.description}
          </p>
        )}

        {/* Location and Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-[#404040]/70">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="line-clamp-1">
              {event.location || 'Location TBD'}
            </span>
          </div>
          <div className="text-sm font-semibold text-[#007B9E]">
            {event.startDate.toLocaleDateString()}
          </div>
        </div>

        {/* Action buttons */}
        {event.url && (
          <div className="mt-4 flex justify-between items-center">
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#007B9E] hover:text-[#005f7a] text-sm font-medium transition-colors"
            >
              Learn More →
            </a>
            
            {/* Add to Calendar Button */}
            <button
              onClick={() => {
                const startDate = event.startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
                const endDate = event.endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
                const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(event.description || '')}&location=${encodeURIComponent(event.location || '')}`;
                window.open(googleCalendarUrl, '_blank');
              }}
              className="text-[#404040]/70 hover:text-[#404040] text-sm transition-colors"
              title="Add to Google Calendar"
            >
              + Add to Calendar
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}