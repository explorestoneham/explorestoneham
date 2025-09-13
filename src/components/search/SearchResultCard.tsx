import React from 'react';
import { Calendar, MapPin, Phone, Globe, Star, Clock, Users, Building, Utensils, ExternalLink } from 'lucide-react';
import { UniversalSearchResult } from '../../services/search/UniversalSearchService';

interface SearchResultCardProps {
  result: UniversalSearchResult;
}

export const SearchResultCard: React.FC<SearchResultCardProps> = ({ result }) => {
  const { item, matchedFields, type } = result;

  const handleClick = () => {
    switch (type) {
      case 'event':
        // Navigate to events page with search
        (window as any).handleNavigation?.('/events');
        break;
      case 'attraction':
        // Navigate to attractions page
        if ('url' in item && item.url) {
          window.open(item.url, '_blank');
        } else {
          (window as any).handleNavigation?.('/attractions');
        }
        break;
      case 'business':
        // Open business website or Google Maps
        if ('website' in item && item.website) {
          window.open(item.website, '_blank');
        }
        break;
      case 'service':
        // Open service website if available
        if ('website' in item && item.website) {
          window.open(item.website, '_blank');
        }
        break;
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'event':
        return <Calendar className="w-5 h-5 text-[#F4A300]" />;
      case 'attraction':
        return <MapPin className="w-5 h-5 text-[#007B9E]" />;
      case 'business':
        return 'businessType' in item && item.businessType === 'restaurant' 
          ? <Utensils className="w-5 h-5 text-[#D95D39]" />
          : <Building className="w-5 h-5 text-[#93C47D]" />;
      case 'service':
        return <Users className="w-5 h-5 text-[#2A6F4D]" />;
      default:
        return <MapPin className="w-5 h-5 text-[#666666]" />;
    }
  };

  const getTypeBadgeColor = () => {
    switch (type) {
      case 'event':
        return 'bg-[#F4A300] text-white';
      case 'attraction':
        return 'bg-[#007B9E] text-white';
      case 'business':
        return 'businessType' in item && item.businessType === 'restaurant'
          ? 'bg-[#D95D39] text-white'
          : 'bg-[#93C47D] text-white';
      case 'service':
        return 'bg-[#2A6F4D] text-white';
      default:
        return 'bg-[#666666] text-white';
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'event':
        return 'Event';
      case 'attraction':
        return 'Attraction';
      case 'business':
        return 'businessType' in item && item.businessType === 'restaurant' ? 'Restaurant' : 'Business';
      case 'service':
        return 'Service';
      default:
        return 'Result';
    }
  };

  const hasUrl = ('url' in item && item.url) || ('website' in item && item.website);

  return (
    <div 
      className={`bg-white rounded-xl shadow-lg overflow-hidden border border-[#D2E5F1] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${hasUrl ? 'cursor-pointer' : ''}`}
      onClick={hasUrl ? handleClick : undefined}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            {getTypeIcon()}
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadgeColor()}`}>
              {getTypeLabel()}
            </span>
            {'category' in item && (
              <span className="px-2 py-1 bg-[#D2E5F1] text-[#007B9E] text-xs font-medium rounded-full">
                {item.category}
              </span>
            )}
          </div>
          
          {/* Rating for businesses */}
          {type === 'business' && 'rating' in item && (
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-[#F4A300] fill-current" />
              <span className="text-sm font-medium text-[#404040]">{item.rating}</span>
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-[#404040] mb-2">
          {'title' in item ? item.title : item.name}
        </h3>
        
        <p className="text-[#404040]/70 text-sm line-clamp-2 mb-4">
          {item.description || 'No description available'}
        </p>
      </div>

      {/* Content */}
      <div className="px-6 pb-4 space-y-3">
        {/* Address/Location */}
        {('address' in item && item.address) && (
          <div className="flex items-center text-sm text-[#404040]/70">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="line-clamp-1">{item.address}</span>
          </div>
        )}

        {/* Event specific info */}
        {type === 'event' && 'startDate' in item && (
          <div className="flex items-center text-sm text-[#404040]/70">
            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{new Date(item.startDate).toLocaleDateString()}</span>
          </div>
        )}

        {/* Business specific info */}
        {type === 'business' && (
          <>
            {('phone' in item && item.phone) && (
              <div className="flex items-center text-sm text-[#404040]/70">
                <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{item.phone}</span>
              </div>
            )}
            {'priceLevel' in item && (
              <div className="flex items-center text-sm text-[#404040]/70">
                <span className="mr-2">💰</span>
                <span>
                  {item.priceLevel > 0 ? (
                    <>
                      {'$'.repeat(item.priceLevel)}
                      <span className="text-[#404040]/30">{'$'.repeat(4 - item.priceLevel)}</span>
                    </>
                  ) : (
                    'Price N/A'
                  )}
                </span>
              </div>
            )}
          </>
        )}

        {/* Service specific info */}
        {type === 'service' && (
          <>
            {('contact' in item && item.contact) && (
              <div className="flex items-center text-sm text-[#404040]/70">
                <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{item.contact}</span>
              </div>
            )}
            {('email' in item && item.email) && (
              <div className="flex items-center text-sm text-[#404040]/70">
                <span className="mr-2">✉️</span>
                <span className="truncate">{item.email}</span>
              </div>
            )}
          </>
        )}

        {/* Features for businesses */}
        {type === 'business' && 'features' in item && item.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {item.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="px-2 py-1 bg-[#F0F9FF] text-[#007B9E] text-xs rounded-full">
                {feature}
              </span>
            ))}
            {item.features.length > 3 && (
              <span className="px-2 py-1 bg-[#F0F9FF] text-[#007B9E] text-xs rounded-full">
                +{item.features.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Matched fields indicator */}
        {matchedFields.length > 0 && (
          <div className="text-xs text-[#666666] mt-3 pt-3 border-t border-[#D2E5F1]">
            <span>Matches: {matchedFields.join(', ')}</span>
          </div>
        )}

        {/* Website link indicator */}
        {hasUrl && (
          <div className="flex items-center justify-between pt-3 border-t border-[#D2E5F1]">
            <span className="text-xs text-[#007B9E] flex items-center">
              <ExternalLink className="w-3 h-3 mr-1" />
              Click to visit
            </span>
          </div>
        )}
      </div>
    </div>
  );
};