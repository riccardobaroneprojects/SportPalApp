"use client";

import { useState, useContext, useEffect } from "react";
import FilterPanel from "@player/components/SearchFiltersPanel/SearchFiltersPanel";
import SearchBar from "@player/components/SearchBar/SearchBar";
import { FilterState } from "@player/components/SearchFiltersPanel/FormSetup";
import { LocationSearchHook } from "@/app/(player)/hooks/LocationSearchHook";
import { useMapContext } from "@/app/(player)/context/MapContext";

export default function Home() {
  const defaultFilters: FilterState = {
    sports: [],
    distance: 10,
    ageGroups: [],
    skill_levels: [],
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
  };

  useEffect(() => {
    console.log("🟢 The Parent Filters State ACTUALLY changed to:", filters);
  }, [filters]);

  const handleTabChange = (tabId: string) => {
    // Navigation logic will be implemented later
  };

  const { setMapCenter } = useMapContext();
  const searchHook = LocationSearchHook();

  const handleSelection = (item: any) => {
    const location = searchHook.selectLocation(item); // Update the search data
    setMapCenter({ lat: location.lat, lon: location.lon }); // Move the map
  };

  return (
    <div className="pointer-events-none flex-1 flex flex-col justify-between p-4 ">
      {/* Search Bar with Filter */}
      <SearchBar
        query={searchHook.query}
        setQuery={searchHook.setQuery}
        suggestions={searchHook.suggestions}
        isLoading={searchHook.isLoading}
        onSelect={handleSelection}
        HandleFilterClick={handleFilterClick}
      />
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
    </div>
  );
}
