"use client";

import { useState } from "react";
import FilterPanel from "@/components/FilterPanelMain";
import SearchBar from "@/components/SearchBarMain";
import { FilterState } from "@/types/SearchFilters";

export default function Home() {
  const defaultFilters: FilterState = {
    sportTypes: [],
    distance: 10,
    ageGroups: [],
    skillLevels: [],
    genders: [],
  };

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  /** * Global filter state for the search results.
   * We lift state here so that both the SearchBar and results list (future)
   * can stay in sync with the most up to date FilterPanel selections.
   *
   */
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const handleFilterClick = () => {
    setIsFilterOpen(true);
  };

  const handleFilterClose = () => {
    setIsFilterOpen(false);
    console.log(
      filters.sportTypes,
      filters.distance,
      filters.ageGroups,
      filters.skillLevels,
      filters.genders,
    );
  };

  const handleTabChange = (tabId: string) => {
    // Navigation logic will be implemented later
  };

  return (
    <main className="relative h-dvh w-full overflow-hidden pointer-events-none">
      {/* Search Bar with Filter */}
      <SearchBar HandleFilterClick={handleFilterClick} />

      {/* Filter Panel (slides up from bottom) */}
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        isOpen={isFilterOpen}
        onClose={handleFilterClose}
        onReset={() => {
          console.log("Filters reset");
        }}
      />
    </main>
  );
}
