"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { FilterPanelProps } from "@/types/SearchFilters";
import { sportOptions, availabilityOptions } from "@/constants/SearchFilters";

export default function FilterPanel({
  filters,
  setFilters,
  isOpen,
  onClose,
  onReset,
}: FilterPanelProps) {
  // HandleToggle function take care of updating the filter state in real time
  const handleSportToggle = (sport: string) => {
    setFilters((prev) => ({
      ...prev,
      sportTypes: prev.sportTypes.includes(sport)
        ? prev.sportTypes.filter((s) => s !== sport)
        : [...prev.sportTypes, sport],
    }));
  };

  const handleAvailabilityToggle = (option: string) => {
    setFilters((prev) => ({
      ...prev,
      availability: prev.availability.includes(option)
        ? prev.availability.filter((a) => a !== option)
        : [...prev.availability, option],
    }));
  };

  // sets filters back to default
  const handleReset = () => {
    setFilters({
      sportTypes: [],
      distance: 10,
      availability: [],
    });
    onReset?.();
  };

  const handleApply = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-80 pointer-events-auto"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 top-0 flex flex-col bg-card shadow-2xl z-90 pointer-events-auto"
            style={{ height: "calc(100dvh - 64px)" }}
          >
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>

            <div className="flex items-center justify-between px-5 pb-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Filters</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
                <span className="sr-only">Close filters</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 pb-32">
              <div className="mb-6">
                <Label className="text-sm font-medium text-foreground mb-3 block">
                  Sport Types
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {sportOptions.map((sport) => (
                    <label
                      key={sport}
                      className="flex items-center gap-3 p-3 rounded-xl border border-border bg-background/50 hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <Checkbox
                        checked={filters.sportTypes.includes(sport)}
                        onCheckedChange={() => handleSportToggle(sport)}
                      />
                      <span className="text-sm text-foreground">{sport}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-medium text-foreground">
                    Distance
                  </Label>
                  <span className="text-sm text-primary font-medium">
                    {filters.distance} km
                  </span>
                </div>
                <Slider
                  value={[filters.distance]}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, distance: value[0] }))
                  }
                  max={50}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>1 km</span>
                  <span>50 km</span>
                </div>
              </div>

              <div className="mb-6">
                <Label className="text-sm font-medium text-foreground mb-3 block">
                  Availability
                </Label>
                <div className="flex flex-col gap-2">
                  {availabilityOptions.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-3 p-3 rounded-xl border border-border bg-background/50 hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <Checkbox
                        checked={filters.availability.includes(option)}
                        onCheckedChange={() => handleAvailabilityToggle(option)}
                      />
                      <span className="text-sm text-foreground">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-card/80 backdrop-blur-md border-t border-border">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="flex-1 h-12 rounded-xl"
                >
                  <RotateCcw className="size-4 mr-2" />
                  Reset
                </Button>
                <Button
                  onClick={handleApply}
                  className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Check className="size-4 mr-2" />
                  Apply
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
