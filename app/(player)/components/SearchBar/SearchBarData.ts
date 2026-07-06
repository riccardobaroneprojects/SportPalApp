
// 
export interface LocationIQResult {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}

// This is what you found (Rename it to MapMarker or Venue)
export interface MapEntity {
  id: string;
  longitude: number;
  latitude: number;
  type: string;
  name?: string;
  sport?: string;
}

// clean version we use for the SearchBar/Form
export interface CleanLocation {
  name: string;
  lat: number;
  lon: number;
  raw: LocationIQResult;
}