import { ElementType } from "react";

export interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (filters: FilterState) => void;
  onReset?: () => void;
}

export interface FilterState {
  sportTypes: string[];
  distance: number;
  availability: string[];
}
