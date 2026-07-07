"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

// Import your schemas and data from FormSetup
import { searchFilterSchema, FilterState, formEnumOptions } from "./FormSetup";
import { FilterCard } from "./FilterCard";

interface FilterPanelProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
  onReset?: () => void;
}

export default function FilterPanel({
  filters,
  setFilters,
  isOpen,
  onClose,
  onReset,
}: FilterPanelProps) {
  const { register, watch, setValue, handleSubmit, reset } = useForm({
    resolver: zodResolver(searchFilterSchema),
    defaultValues: filters,
  });

  // 2. Declare your reactive watchers right here in the UI layer
  const watchedSports = watch("sports") || [];
  const watchedAgeGroups = watch("ageGroups") || [];
  const watchedSkillLevels = watch("skill_levels") || [];
  const watchedGenders = watch("genders") || [];
  const watchedDistance = watch("distance") || 10;

  // 3. Keep the local RHF state synced if the parent filter values change externally
  useEffect(() => {
    if (isOpen) {
      reset(filters);
    }
  }, [isOpen, filters, reset]);

  const handleToggle = (key: keyof FilterState, value: any) => {
    const currentSelection = (watch(key as any) || []) as any[];
    const newSelection = currentSelection.includes(value)
      ? currentSelection.filter((item) => item !== value)
      : [...currentSelection, value];

    setValue(key, newSelection, { shouldValidate: true });
  };

  const handleReset = () => {
    const emptyValues: FilterState = {
      sports: [],
      distance: 10,
      ageGroups: [],
      skill_levels: [],
      genders: [],
    };
    reset(emptyValues);
    onReset?.();
  };

  // 5. Submit callback pushed up only on "Apply"
  const onApply = (data: FilterState) => {
    setFilters(data);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background backdrop-blur-sm z-80 pointer-events-auto"
            onClick={onClose}
          />

          {/* Panel Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 top-0 flex flex-col shadow-2xl z-90 pointer-events-auto bg-background"
            style={{ height: "calc(100dvh - 64px)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-4 pt-3 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Filters</h2>
              <Button variant="ghost" onClick={onClose} size="icon">
                <X className="size-5" />
              </Button>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-8 bg-background">
              {/* Sport Types */}
              <div className="space-y-3">
                <Label className="text-base font-bold tracking-wide">
                  Sport Types
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {formEnumOptions.sport.map((sport) => (
                    <FilterCard
                      key={sport}
                      label={sport.charAt(0).toUpperCase() + sport.slice(1)}
                      checked={watchedSports.includes(sport)}
                      onCheckedChange={() => handleToggle("sports", sport)}
                    />
                  ))}
                </div>
              </div>

              {/* Distance Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-bold tracking-wide">
                    Distance
                  </Label>
                  <span className="text-sm text-primary font-bold">
                    {watchedDistance} km
                  </span>
                </div>
                <Slider
                  value={[watchedDistance]}
                  onValueChange={(v) =>
                    setValue("distance", v[0], { shouldValidate: true })
                  }
                  max={100}
                  min={1}
                  step={1}
                  className="py-4"
                />
              </div>

              {/* Age Group */}
              <div className="space-y-3">
                <Label className="text-base font-bold tracking-wide">
                  Age Group
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {formEnumOptions.age.map((age) => (
                    <FilterCard
                      key={age}
                      label={age.replace("_", "-")}
                      checked={watchedAgeGroups.includes(age)}
                      onCheckedChange={() => handleToggle("ageGroups", age)}
                    />
                  ))}
                </div>
              </div>

              {/* Skill Level */}
              <div className="space-y-3">
                <Label className="text-base font-bold tracking-wide">
                  Skill Level
                </Label>
                <div className="flex flex-col gap-2">
                  {formEnumOptions.skill.map((skill) => (
                    <FilterCard
                      key={skill}
                      label={skill}
                      checked={watchedSkillLevels.includes(skill)}
                      onCheckedChange={() =>
                        handleToggle("skill_levels", skill)
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-3">
                <Label className="text-base font-bold tracking-wide">
                  Gender
                </Label>
                <div className="flex flex-wrap gap-2">
                  {formEnumOptions.gender.map((gender) => (
                    <FilterCard
                      key={gender}
                      label={gender}
                      checked={watchedGenders.includes(gender)}
                      onCheckedChange={() => handleToggle("genders", gender)}
                    />
                  ))}
                </div>
              </div>

              {/* Action Button Controls (Inline within layout list) */}
              <div className="pt-4 pb-16 flex gap-3 ">
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleReset}
                  className="flex-1 h-12 rounded-xl bg-white"
                >
                  <RotateCcw className="size-4 mr-2" /> Reset
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmit(onApply)}
                  className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground font-bold"
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
