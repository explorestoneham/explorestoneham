import { GoogleMapsConfig } from './types';

class GoogleMapsLoader {
  private static instance: GoogleMapsLoader;
  private loadPromise: Promise<void> | null = null;
  private isLoaded = false;

  private constructor() {}

  static getInstance(): GoogleMapsLoader {
    if (!GoogleMapsLoader.instance) {
      GoogleMapsLoader.instance = new GoogleMapsLoader();
    }
    return GoogleMapsLoader.instance;
  }

  async loadGoogleMaps(config: GoogleMapsConfig): Promise<void> {
    // Return existing promise if already loading
    if (this.loadPromise) {
      return this.loadPromise;
    }

    // Return immediately if already loaded
    if (this.isLoaded && window.google?.maps) {
      return Promise.resolve();
    }

    this.loadPromise = new Promise((resolve, reject) => {
      // Check if Google Maps is already loaded
      if (window.google?.maps) {
        this.isLoaded = true;
        resolve();
        return;
      }

      // Create callback function name
      const callbackName = 'initGoogleMaps';

      // Create callback function
      (window as any)[callbackName] = () => {
        this.isLoaded = true;
        delete (window as any)[callbackName];
        resolve();
      };

      // Build URL with parameters
      const params = new URLSearchParams({
        key: config.apiKey,
        callback: callbackName,
        v: 'weekly' // Use weekly version for stability
      });

      if (config.libraries && config.libraries.length > 0) {
        params.append('libraries', config.libraries.join(','));
      }

      if (config.region) {
        params.append('region', config.region);
      }

      if (config.language) {
        params.append('language', config.language);
      }

      // Create and append script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
      script.async = true;
      script.defer = true;

      script.onerror = () => {
        this.loadPromise = null;
        delete (window as any)[callbackName];
        reject(new Error('Failed to load Google Maps API'));
      };

      document.head.appendChild(script);
    });

    return this.loadPromise;
  }

  isGoogleMapsLoaded(): boolean {
    return this.isLoaded && !!window.google?.maps;
  }

  reset(): void {
    this.loadPromise = null;
    this.isLoaded = false;
  }
}

export default GoogleMapsLoader;