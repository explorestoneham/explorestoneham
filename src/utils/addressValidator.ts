// Utility to validate if an address is in Stoneham, MA
export const isInStoneham = (address: string): boolean => {
  if (!address) return false;
  
  const normalizedAddress = address.toLowerCase().trim();
  
  // Direct matches for Stoneham
  const stonehamVariations = [
    'stoneham, ma',
    'stoneham, massachusetts',
    'stoneham ma',
    'stoneham massachusetts',
    ', stoneham,',
    ', stoneham ma',
    ', stoneham massachusetts'
  ];
  
  const hasStoneham = stonehamVariations.some(variation => 
    normalizedAddress.includes(variation)
  );
  
  if (!hasStoneham) {
    return false;
  }
  
  // Exclude neighboring towns that might appear in results
  const excludedTowns = [
    'melrose',
    'wakefield',
    'woburn',
    'reading',
    'winchester',
    'medford',
    'malden',
    'saugus'
  ];
  
  const hasExcludedTown = excludedTowns.some(town => 
    normalizedAddress.includes(town)
  );
  
  return !hasExcludedTown;
};

// Validate coordinates are within Stoneham bounds
export const isInStonehamBounds = (lat: number, lng: number): boolean => {
  // Approximate bounds for Stoneham, MA
  const stonehamBounds = {
    north: 42.500,
    south: 42.460,
    east: -71.085,
    west: -71.110
  };
  
  return lat >= stonehamBounds.south && 
         lat <= stonehamBounds.north && 
         lng >= stonehamBounds.west && 
         lng <= stonehamBounds.east;
};