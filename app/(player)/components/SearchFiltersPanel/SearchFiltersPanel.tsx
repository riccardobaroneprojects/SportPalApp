import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  FilterPanelProps,
  FilterState,
  sportOptions,
  ageOptions,
  skillOptions,
  genderOptions,
} from "./SearchFiltersPanelData";
import { FilterCard } from "./FilterCard";

export default function FilterPanel({
  filters,
  setFilters,
  isOpen,
  onClose,
  onReset,
}: FilterPanelProps) {
  /**
   * Consolidates all array-based toggles into one function.
   * key: the property name in the filters state
   * value: the string to add or remove
   */
  const handleToggle = (key: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const currentSelection = prev[key] as string[];
      const newSelection = currentSelection.includes(value)
        ? currentSelection.filter((item) => item !== value)
        : [...currentSelection, value];

      return {
        ...prev,
        [key]: newSelection,
      };
    });
  };

  const handleReset = () => {
    setFilters({
      sportTypes: [],
      distance: 10,
      ageGroups: [],
      skillLevels: [],
      genders: [],
    });
    onReset?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
            <div className="flex items-center justify-between px-5 pb-4 pt-3 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Filters</h2>
              <Button variant={"ghost"} onClick={onClose}>
                <X className="size-5" />
              </Button>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto px-5 py-4 ">
              {/* Sport Types */}
              <div className="mb-8">
                <Label className="block mb-3">Sport Types</Label>
                <div className="grid grid-cols-2 gap-2">
                  {sportOptions.map((sport) => (
                    <FilterCard
                      key={sport}
                      label={sport}
                      checked={filters.sportTypes.includes(sport)}
                      onCheckedChange={() => handleToggle("sportTypes", sport)}
                    />
                  ))}
                </div>
              </div>

              {/* Distance Slider */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <Label className="block mb-3">Distance</Label>
                  <span className="text-sm text-primary font-bold">
                    {filters.distance} km
                  </span>
                </div>
                <Slider
                  value={[filters.distance]}
                  onValueChange={(v) =>
                    setFilters((p) => ({ ...p, distance: v[0] }))
                  }
                  max={50}
                  min={1}
                  step={1}
                />
              </div>

              {/* Age Group */}
              <div className="mb-8">
                <Label className="block mb-3">Age Group</Label>
                <div className="grid grid-cols-2 gap-2">
                  {ageOptions.map((age) => (
                    <FilterCard
                      key={age}
                      label={age}
                      checked={filters.ageGroups.includes(age)}
                      onCheckedChange={() => handleToggle("ageGroups", age)}
                    />
                  ))}
                </div>
              </div>

              {/* Skill Level */}
              <div className="mb-8">
                <Label className="block mb-3">Skill Level</Label>
                <div className="flex flex-col gap-2">
                  {skillOptions.map((skill) => (
                    <label
                      key={skill.label}
                      className="flex items-center justify-between p-3 rounded-xl border border-border bg-background/50 hover:bg-muted/50 cursor-pointer"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {skill.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {skill.desc}
                        </span>
                      </div>
                      <Checkbox
                        checked={filters.skillLevels.includes(skill.label)}
                        onCheckedChange={() =>
                          handleToggle("skillLevels", skill.label)
                        }
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div className="mb-8">
                <Label className="block mb-3">Gender</Label>
                <div className="flex flex-wrap gap-2">
                  {genderOptions.map((gender) => (
                    <label
                      key={gender}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background/50 hover:bg-muted/50 cursor-pointer"
                    >
                      <Checkbox
                        checked={filters.genders.includes(gender)}
                        onCheckedChange={() => handleToggle("genders", gender)}
                      />
                      <span className="text-sm">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="flex-1 h-12 rounded-xl"
                >
                  <RotateCcw className="size-4 mr-2" /> Reset
                </Button>
                <Button
                  onClick={onClose}
                  className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground"
                >
                  <Check className="size-4 mr-2" /> Apply
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
