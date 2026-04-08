// location interface for search feature result
export interface Location {
  id: string;
  longitude: number;
  latitude: number;
  type: "venue" | "basketball" | "volleyball";
  name?: string;
  sport?: string;
}