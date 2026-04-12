// filter states in search feature

export interface FilterPanelProps {
  filters: FilterState,
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>,
  isOpen: boolean;
  onClose: () => void;
  onReset?: () => void;
}

export interface FilterState {
  sportTypes: string[];
  distance: number;
  ageGroups: string[];
  skillLevels: string[];
  genders: string[];
}
