// Google Maps and Places API type definitions

declare global {
  interface Window {
    google: {
      maps: {
        Map: any;
        LatLng: any;
        LatLngBounds: any;
        Marker: any;
        InfoWindow: any;
        Size: any;
        Point: any;
        event: {
          addListener: (instance: any, eventName: string, handler: () => void) => any;
          removeListener: (listener: any) => void;
        };
        places: {
          PlacesService: any;
          PlacesServiceStatus: {
            OK: string;
            ZERO_RESULTS: string;
            OVER_QUERY_LIMIT: string;
            REQUEST_DENIED: string;
            INVALID_REQUEST: string;
            NOT_FOUND: string;
          };
        };
      };
    };
    initGoogleMaps?: () => void;
  }
}

export interface GooglePlaceResult {
  place_id?: string;
  name?: string;
  rating?: number;
  user_ratings_total?: number;
  price_level?: number;
  formatted_address?: string;
  formatted_phone_number?: string;
  website?: string;
  opening_hours?: {
    open_now?: boolean;
    weekday_text?: string[];
  };
  photos?: Array<{
    getUrl: (options: { maxWidth: number; maxHeight: number }) => string;
  }>;
  types?: string[];
  geometry?: {
    location?: {
      lat: () => number;
      lng: () => number;
    };
  };
}

export interface GoogleMapsConfig {
  apiKey: string;
  libraries?: string[];
  region?: string;
  language?: string;
}

export interface MapOptions {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  mapTypeControl?: boolean;
  streetViewControl?: boolean;
  fullscreenControl?: boolean;
  zoomControl?: boolean;
  styles?: Array<{
    featureType?: string;
    elementType?: string;
    stylers: Array<{ [key: string]: any }>;
  }>;
}

export interface MarkerOptions {
  position: {
    lat: number;
    lng: number;
  };
  map: any;
  title?: string;
  icon?: {
    url: string;
    scaledSize: any;
    anchor: any;
  };
}

export interface PlacesSearchRequest {
  location: any; // google.maps.LatLng
  radius: number;
  query?: string;
  type?: string;
  fields?: string[];
}

export {};