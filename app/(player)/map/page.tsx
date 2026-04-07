"use client";

import { useState } from "react";
import FilterPanel from "@/components/FilterPanelMain";
import SearchBar from "@/components/SearchBarMain";

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterClick = () => {
    setIsFilterOpen(true);
  };

  const handleFilterClose = () => {
    setIsFilterOpen(false);
  };

  const handleTabChange = (tabId: string) => {
    // Navigation logic will be implemented later
  };

  return (
    <main className="relative h-dvh w-full overflow-hidden pointer-events-none">
      {/* Search Bar with Filter */}
      <SearchBar onFilterClick={handleFilterClick} />

      {/* Filter Panel (slides up from bottom) */}
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={handleFilterClose}
        onApply={(filters) => {
          console.log("Applied filters:", filters);
        }}
        onReset={() => {
          console.log("Filters reset");
        }}
      />
    </main>
  );
}
