"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { formEnumOptions, useAnnouncementForm } from "./FormSetup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { LocationSearchHook } from "@/app/(player)/hooks/LocationSearchHook";
import { AnimatePresence, motion } from "framer-motion";

export default function NewGamePage() {
  const router = useRouter();

  // Initialize Hooks and form essentials
  const { announcementform, handleLocationSelect, onSubmit, errors } =
    useAnnouncementForm();
  const { register, setValue, watch } = announcementform;
  const searchHook = LocationSearchHook();

  // initialize whatcers for UI updating
  const currentSport = watch("sport");
  const currentSkill = watch("skill_level");
  const currentAge = watch("age");
  const currentGender = watch("gender");
  const currentMinPlayers = watch("min_players");
  const currentMaxPlayers = watch("max_players");

  return (
    <div className="flex-1 flex-col bg-background text-foreground p-4 pb-20 pointer-events-auto">
      <header className="py-3 flex items-center justify-between mb-2">
        {/* Left side: Title */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">New Game</h1>
          <p className="text-muted-foreground mt-1">
            Ready to find some players?
          </p>
        </div>

        {/* Right side: Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => router.back()}
        >
          <X className="h-10 w-10 scale-[1.5]" />
          <span className="sr-only">Close</span>
        </Button>
      </header>

      {/* Form Sections Wrapper 🟢 Expanded to space-y-8 for more structural breathing room */}
      <div className="space-y-8">
        {/* --- Section 1: Core Details (Location & Description) --- */}
        <section className="space-y-5">
          {/* A. LOCATION COMPONENT */}
          <div className="space-y-3 relative">
            <Label
              htmlFor="location"
              className="text-base font-bold tracking-wide"
            >
              Location
            </Label>
            <Input
              id="location"
              placeholder="Enter city..."
              className="bg-card border-border rounded-full"
              value={searchHook.query}
              onChange={(e) => searchHook.setQuery(e.target.value)}
            />
            <AnimatePresence>
              {searchHook.suggestions.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute left-0 right-0 top-[calc(100%-4px)] z-100 bg-card border border-border shadow-2xl rounded-2xl overflow-hidden pointer-events-auto max-h-60 overflow-y-auto"
                >
                  {searchHook.suggestions.map((item) => (
                    <li
                      key={item.place_id}
                      onClick={() => {
                        handleLocationSelect(item);
                        searchHook.selectLocation(item);
                      }}
                      className="p-4 hover:bg-primary/10 cursor-pointer text-sm border-b border-border last:border-none transition-colors"
                    >
                      {item.display_name}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            {errors.location_name && (
              <p className="text-sm text-destructive mt-1">
                {errors.location_name.message}
              </p>
            )}
          </div>

          {/* B. DESCRIPTION COMPONENT */}
          <div className="space-y-3">
            <Label
              htmlFor="description"
              className="text-base font-bold tracking-wide"
            >
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Tell players about the game, court surface, costs, etc..."
              className="bg-card border-border rounded-2xl min-h-32 resize-none"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-destructive mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
        </section>

        {/* --- Section 2: Sport (Single Selection Radio-style) --- */}
        <section className="space-y-3">
          <Label className="text-base font-bold tracking-wide">
            Select Sport
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {formEnumOptions.sport.map((sport) => (
              <button
                key={sport}
                type="button"
                onClick={() =>
                  setValue("sport", sport, { shouldValidate: true })
                }
                className={`p-3 rounded-full border text-sm font-medium transition-all ${
                  currentSport === sport
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-foreground active:bg-accent/10"
                }`}
              >
                {sport.charAt(0).toUpperCase() + sport.slice(1)}
              </button>
            ))}
          </div>

          {errors.sport && (
            <p className="text-sm text-destructive mt-1">
              {errors.sport.message}
            </p>
          )}
        </section>

        {/* --- Section 3: Skill Level --- */}
        <section className="space-y-3">
          <Label className="text-base font-bold tracking-wide">
            Allowed Skill Level
          </Label>

          <div className="flex flex-col space-y-2">
            {formEnumOptions.skill.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() =>
                  setValue("skill_level", skill, { shouldValidate: true })
                }
                className={`w-full p-3 rounded-full border text-sm font-medium transition-all ${
                  currentSkill === skill
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-foreground active:bg-accent/10"
                }`}
              >
                {skill.charAt(0).toUpperCase() + skill.slice(1)}
              </button>
            ))}
          </div>

          {errors.skill_level && (
            <p className="text-sm text-destructive mt-1">
              {errors.skill_level.message}
            </p>
          )}
        </section>

        {/* --- Section 4: Filters (Age & Gender) --- */}
        <section className="flex flex-col gap-6">
          {/* 1. AGE GROUPS SUB-SECTION */}
          <div className="space-y-3">
            <Label className="text-base font-bold tracking-wide">
              Age Group
            </Label>
            {/* Clean 2-column grid to match sports layout */}
            <div className="grid grid-cols-2 gap-2">
              {formEnumOptions.age.map((age) => (
                <button
                  key={age}
                  type="button"
                  onClick={() => setValue("age", age, { shouldValidate: true })}
                  className={`p-3 rounded-full border text-sm font-medium transition-all text-center ${
                    currentAge === age
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border text-foreground active:bg-accent/10"
                  } last:col-span-2`}
                >
                  {age
                    .replace("_", " - ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </button>
              ))}
            </div>
            {errors.age && (
              <p className="text-sm text-destructive mt-1">
                {errors.age.message}
              </p>
            )}
          </div>

          {/* 2. INCLUSIVITY (GENDER) SUB-SECTION */}
          <div className="space-y-3">
            <Label className="text-base font-bold tracking-wide">
              Inclusivity (Gender)
            </Label>
            {/* Kept flex wrap so short items can line up side-by-side cleanly */}
            <div className="flex flex-wrap gap-2">
              {formEnumOptions.gender.slice(0, -1).map((gender) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() =>
                    setValue("gender", gender, { shouldValidate: true })
                  }
                  className={`px-5 py-3 rounded-full border text-sm font-medium transition-all text-center ${
                    currentGender === gender
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border text-foreground active:bg-accent/10"
                  }`}
                >
                  {gender
                    .replace("_", " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </button>
              ))}
            </div>
            {errors.gender && (
              <p className="text-sm text-destructive mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>
        </section>

        {/* --- Section 5: Player Capacity (Min & Max Sliders) --- */}
        <section className="flex flex-col gap-6">
          {/* A. MINIMUM PLAYERS SLIDER */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-base font-bold tracking-wide">
                Minimum Players
              </Label>
              <span className="text-primary font-bold bg-primary/10 px-3 py-1 rounded-full text-xs">
                {currentMinPlayers || 2} players min
              </span>
            </div>
            <Slider
              min={2}
              max={50}
              step={1}
              value={[currentMinPlayers || 2]}
              onValueChange={(val) => {
                const newMin = val[0];
                setValue("min_players", newMin, { shouldValidate: true });

                // auto adujst max player if min goes above it
                if (newMin > (currentMaxPlayers || 2)) {
                  setValue("max_players", newMin, { shouldValidate: true });
                }
              }}
              className="py-4"
            />

            {errors.min_players && (
              <p className="text-sm text-destructive mt-1">
                {errors.min_players.message}
              </p>
            )}
          </div>

          {/* B. MAXIMUM PLAYERS LIMIT */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-base font-bold tracking-wide">
                Maximum Players
              </Label>
              <span className="text-primary font-bold bg-primary/10 px-3 py-1 rounded-full text-xs">
                {currentMaxPlayers || 2} players max
              </span>
            </div>
            <Slider
              min={2}
              max={50}
              step={1}
              value={[currentMaxPlayers || 2]}
              onValueChange={(val) => {
                const newMax = val[0];
                setValue("max_players", newMax, { shouldValidate: true });

                // auto adujst min player if max goes below it
                if (newMax < (currentMinPlayers || 2)) {
                  setValue("min_players", newMax, { shouldValidate: true });
                }
              }}
              className="py-4"
            />

            {errors.max_players && (
              <p className="text-sm text-destructive mt-1">
                {errors.max_players.message}
              </p>
            )}
          </div>
        </section>

        {/* --- Sticky Footer Action --- */}
        <div className="mt-4 pb-16 left-0 right-0 p-4 pt-4 bg-background/90 backdrop-blur-lg">
          <Button
            onClick={onSubmit}
            className="w-full h-14 text-lg font-bold rounded-(--radius)] shadow-lg shadow-primary/20"
          >
            Post Game
          </Button>
        </div>
      </div>
    </div>
  );
}
