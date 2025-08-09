// Global Google Maps API loader utility
let loadPromise: Promise<void> | null = null;
let isLoaded = false;

export const loadGoogleMapsAPI = (apiKey: string): Promise<void> => {
  // Return existing promise if already loading
  if (loadPromise) {
    return loadPromise;
  }

  // Return resolved promise if already loaded
  if (isLoaded && window.google?.maps?.places) {
    return Promise.resolve();
  }


  loadPromise = new Promise<void>((resolve, reject) => {
    // Check if already loaded
    if (window.google?.maps?.places) {
      isLoaded = true;
      resolve();
      return;
    }

    // Create unique callback name
    const callbackName = `initGoogleMaps_${Date.now()}`;

    // Create global callback
    (window as any)[callbackName] = () => {
      isLoaded = true;
      delete (window as any)[callbackName];
      
      // Verify Places API is available
      if (!window.google?.maps?.places) {
        reject(new Error('Google Places API not available after loading'));
        return;
      }
      
      resolve();
    };

    // Create script element
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=${callbackName}`;
    script.async = true;
    script.defer = true;

    script.onerror = (event) => {
      console.error('Google Maps API failed to load:', event);
      loadPromise = null;
      delete (window as any)[callbackName];
      reject(new Error('Failed to load Google Maps API'));
    };

    document.head.appendChild(script);
  });

  return loadPromise;
};

export const isGoogleMapsLoaded = (): boolean => {
  return isLoaded && !!window.google?.maps?.places;
};