export interface Announcement {
  title: string;
  location: string;
  sport: string; // Single selection
  ageGroups: string[]; // Multiple allowed
  skillLevels: string[]; // Multiple allowed
  genders: string[]; // Multiple allowed
  description: string;
  maxPlayers: number;
}