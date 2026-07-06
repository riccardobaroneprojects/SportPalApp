"use client";

import { Search, SlidersHorizontal, Loader2, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LocationIQResult } from "./SearchBarData";

interface SearchBarProps {
  query: string;
  setQuery: (val: string) => void;
  suggestions: LocationIQResult[];
  isLoading: boolean;
  onSelect: (item: any) => void;
  HandleFilterClick?: () => void;
}

export default function SearchBar({
  query,
  setQuery,
  suggestions,
  isLoading,
  onSelect,
  HandleFilterClick,
}: SearchBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute top-9 left-2 right-2 z-10 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full md:max-w-xl"
    >
      <div className="flex items-center h-12 bg-card/95 backdrop-blur-md border border-border shadow-lg rounded-xl overflow-hidden pointer-events-auto">
        {/* Search Input Section */}
        <div className="flex items-center flex-1 h-full px-3">
          {isLoading ? (
            <Loader2 className="size-5 text-muted-foreground animate-spin shrink-0" />
          ) : (
            <Search className="size-5 text-muted-foreground shrink-0" />
          )}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Start by tryping a location..."
            className="flex-1 h-full bg-transparent border-none outline-none px-3 text-foreground placeholder:text-muted-foreground text-sm md:text-base"
          />
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-border" />

        {/* Filter Button */}
        <motion.button
          // HandleFilterClick passed down buy main page
          onClick={HandleFilterClick}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center h-full px-4 text-primary hover:bg-primary/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        >
          <SlidersHorizontal className="size-5" />
          <span className="sr-only">Filter</span>
        </motion.button>
      </div>

      {/* Suggestions List - Added below the main bar */}
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full bg-card/95 backdrop-blur-md border border-border shadow-xl rounded-xl overflow-hidden pointer-events-auto"
          >
            {suggestions.map((item) => (
              <li
                key={item.place_id}
                onClick={() => onSelect(item)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-primary/5 cursor-pointer transition-colors text-sm border-b border-border last:border-none"
              >
                <MapPin className="size-4 text-muted-foreground shrink-0" />
                <span className="truncate text-foreground font-medium">
                  {item.display_name}
                </span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
