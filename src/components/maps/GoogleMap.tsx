import React, { useEffect, useRef, useState } from 'react';
import { Star, MapPin, Phone, ExternalLink } from 'lucide-react';

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

interface GoogleMapProps {
  apiKey: string;
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  businesses: Business[];
  onBusinessSelect?: (business: Business) => void;
  className?: string;
}

// Window interface extended in services/google/types.ts

export const GoogleMap: React.FC<GoogleMapProps> = ({
  apiKey,
  center,
  zoom,
  businesses,
  onBusinessSelect,
  className = ''
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const infoWindowRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load Google Maps API
  useEffect(() => {
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    if (!apiKey) {
      setError('Google Maps API key is required');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`;
    script.async = true;
    script.defer = true;

    window.initGoogleMaps = () => {
      setIsLoaded(true);
    };

    script.onerror = (e) => {
      console.error('Failed to load Google Maps API:', e);
      setError('Failed to load Google Maps API');
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (window.initGoogleMaps) {
        delete window.initGoogleMaps;
      }
    };
  }, [apiKey]);

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    try {
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'transit',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true
      });

      infoWindowRef.current = new window.google.maps.InfoWindow();

    } catch (err) {
      setError('Failed to initialize Google Maps');
      console.error('Google Maps initialization error:', err);
    }
  }, [isLoaded, center, zoom]);

  // Update markers when businesses change
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Create new markers
    businesses.forEach(business => {
      const marker = new window.google.maps.Marker({
        position: business.coordinates,
        map: mapInstanceRef.current,
        title: business.name,
        icon: {
          url: business.type === 'restaurant' 
            ? 'data:image/svg+xml;base64,' + btoa(`
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" fill="#D95D39" stroke="white" stroke-width="4"/>
                <path d="M12 10v12M16 10v12M20 10v6" stroke="white" stroke-width="2" stroke-linecap="round"/>
              </svg>
            `)
            : 'data:image/svg+xml;base64,' + btoa(`
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" fill="#93C47D" stroke="white" stroke-width="4"/>
                <path d="M10 12h12v8H10zM14 12v-2h4v2" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            `),
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 16)
        }
      });

      // Create info window content
      const infoContent = `
        <div class="p-3 max-w-xs">
          <div class="flex items-start justify-between mb-2">
            <h3 class="font-bold text-gray-800 text-sm leading-tight pr-2">${business.name}</h3>
            <div class="flex items-center space-x-1 flex-shrink-0">
              <svg class="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span class="text-xs text-gray-600">${business.rating}</span>
            </div>
          </div>
          <div class="space-y-1 text-xs text-gray-600">
            <div class="flex items-center">
              <svg class="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span class="line-clamp-2">${business.address}</span>
            </div>
            ${business.phone ? `
            <div class="flex items-center">
              <svg class="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span>${business.phone}</span>
            </div>
            ` : ''}
            <div class="flex items-center justify-between pt-1">
              <span class="inline-block px-2 py-1 text-xs rounded-full ${
                business.type === 'restaurant' 
                  ? 'bg-red-100 text-red-700' 
                  : 'bg-green-100 text-green-700'
              }">${business.category}</span>
              <span class="text-xs ${business.openNow ? 'text-green-600' : 'text-red-600'}">
                ${business.openNow ? 'Open now' : 'Closed'}
              </span>
            </div>
          </div>
          <div class="flex space-x-2 mt-3">
            <button 
              onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.address)}', '_blank')"
              class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded transition-colors"
            >
              Directions
            </button>
            ${onBusinessSelect ? `
            <button 
              onclick="selectBusiness('${business.id}')"
              class="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-xs py-1 px-2 rounded transition-colors"
            >
              Details
            </button>
            ` : ''}
          </div>
        </div>
      `;

      marker.addListener('click', () => {
        infoWindowRef.current.setContent(infoContent);
        infoWindowRef.current.open(mapInstanceRef.current, marker);
      });

      markersRef.current.push(marker);
    });

    // Fit map to show all markers
    if (businesses.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      businesses.forEach(business => {
        bounds.extend(business.coordinates);
      });
      mapInstanceRef.current.fitBounds(bounds);
      
      // Ensure minimum zoom level
      const listener = window.google.maps.event.addListener(mapInstanceRef.current, 'idle', () => {
        if (mapInstanceRef.current.getZoom() > 16) {
          mapInstanceRef.current.setZoom(16);
        }
        window.google.maps.event.removeListener(listener);
      });
    }

  }, [businesses, isLoaded, onBusinessSelect]);

  // Global function for business selection from info window
  useEffect(() => {
    if (onBusinessSelect) {
      (window as any).selectBusiness = (businessId: string) => {
        const business = businesses.find(b => b.id === businessId);
        if (business) {
          onBusinessSelect(business);
        }
      };
    }

    return () => {
      delete (window as any).selectBusiness;
    };
  }, [businesses, onBusinessSelect]);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
        <div className="text-center space-y-2">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto" />
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div ref={mapRef} className="w-full h-full rounded-lg" />
    </div>
  );
};