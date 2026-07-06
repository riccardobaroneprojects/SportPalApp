// types and constants for SearchFiltersPanel component

export interface FilterPanelProps {
  filters: FilterState,
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>,
  isOpen: boolean;
  onClose: () => void;
  onReset?: () => void;
}

// used by map page to generate a reference object 
export interface FilterState {
  sportTypes: string[];
  distance: number;
  ageGroups: string[];
  skillLevels: string[];
  genders: string[];
}

export const sportOptions = [
  "Basketball",
  "Soccer",
  "Tennis",
  "Volleyball",
  "Swimming",
  "Running",
  "Cycling",
  "Yoga",
];

export const ageOptions = ["18-25", "26-35", "36-45", "46+"];

export const skillOptions = [
  { label: "Beginner", desc: "Under 1 year" },
  { label: "Intermediate", desc: "1-3 years" },
  { label: "Advanced", desc: "3-5 years" },
  { label: "Pro", desc: "5+ years / Competitive" },
];

export const genderOptions = ["Male", "Female", "Non-binary", "Genderfluid", "Queer", "Any"];