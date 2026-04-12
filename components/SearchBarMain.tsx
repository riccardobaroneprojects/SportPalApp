"use client";

import React, { useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

interface SearchBarProps {
  HandleFilterClick?: () => void;
}

export default function SearchBar({ HandleFilterClick }: SearchBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute top-4 left-4 right-4 z-10 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full md:max-w-xl"
    >
      <div className="flex items-center h-12 bg-card/95 backdrop-blur-md border border-border shadow-lg rounded-xl overflow-hidden pointer-events-auto">
        {/* Search Input Section */}
        <div className="flex items-center flex-1 h-full px-3">
          <Search className="size-5 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search sports, venues, events..."
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
    </motion.div>
  );
}
