"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  sportOptions,
  ageOptions,
  skillOptions,
  genderOptions,
} from "@player/components/SearchFiltersPanel/SearchFiltersPanelData";
import { Announcement } from "@/types/announcement";
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
  const [formData, setFormData] = useState<Announcement>({
    title: "",
    location: "",
    sport: "",
    skillLevels: [],
    ageGroups: [],
    genders: [],
    description: "",
    maxPlayers: 5,
  });

  // Toggle function for multi-select arrays
  const toggleSelection = (key: keyof Announcement, value: string) => {
    setFormData((prev) => {
      const currentValues = prev[key] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [key]: newValues };
    });
  };

  const handlePost = () => {
    console.log("Saving Game State:", formData);
    // Logic for Supabase or API call goes here
  };

  const searchHook = LocationSearchHook();

  return (
    <div className=" flex-1 flex-col bg-background  text-foreground p-4 pb-20 pointer-events-auto">
      <header className="py-3 flex items-center justify-between">
        {/* Left side: Titles */}
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

      <div className="space-y-6">
        {/* --- Section 1: Core Details --- */}
        <section className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Game Title</Label>
            <Input
              id="title"
              placeholder="e.g. Competitive 5v5 Basketball"
              className="bg-card border-border rounded-full"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="space-y-2 relative">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="enter city..."
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
                        const loc = searchHook.selectLocation(item);
                        setFormData({ ...formData, location: loc.name });
                      }}
                      className="p-4 hover:bg-primary/10 cursor-pointer text-sm border-b border-border last:border-none transition-colors"
                    >
                      {item.display_name}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* --- Section 2: Sport (Single Selection Radio-style) --- */}
        <section className="space-y-3">
          <Label>Select Sport</Label>
          <div className="grid grid-cols-2 gap-2">
            {sportOptions.map((sport) => (
              <button
                key={sport}
                type="button"
                onClick={() => setFormData({ ...formData, sport })}
                className={`p-3 rounded-full border text-sm font-medium transition-all ${
                  formData.sport === sport
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-foreground active:bg-accent/10"
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        </section>

        {/* --- Section 3: Skill Level (Multi-select Cards) --- */}
        <section className="space-y-3">
          <Label>Allowed Skill Levels</Label>
          <div className="space-y-2">
            {skillOptions.map((skill) => (
              <div
                key={skill.label}
                onClick={() => toggleSelection("skillLevels", skill.label)}
                className={`flex items-center justify-between p-4 border rounded-full cursor-pointer transition-colors ${
                  formData.skillLevels.includes(skill.label)
                    ? "bg-secondary border-primary/40"
                    : "bg-card border-border"
                }`}
              >
                <div>
                  <p className="font-bold text-sm">{skill.label}</p>
                  <p className="text-xs text-muted-foreground">{skill.desc}</p>
                </div>
                <Checkbox
                  checked={formData.skillLevels.includes(skill.label)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* --- Section 4: Filters (Age & Gender) --- */}
        <section className="grid grid-cols-1 gap-6">
          <div className="space-y-3">
            <Label>Age Groups</Label>
            <div className="flex flex-wrap gap-2">
              {ageOptions.map((age) => (
                <div
                  key={age}
                  className="flex items-center space-x-2 bg-card border border-border px-3 py-2 rounded-full"
                >
                  <Checkbox
                    id={`age-${age}`}
                    checked={formData.ageGroups.includes(age)}
                    onCheckedChange={() => toggleSelection("ageGroups", age)}
                  />
                  <label htmlFor={`age-${age}`} className="text-sm font-medium">
                    {age}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Inclusivity (Gender)</Label>
            <div className="flex flex-wrap gap-2">
              {genderOptions.map((gender) => (
                <div
                  key={gender}
                  className="flex items-center space-x-2 bg-card border border-border px-3 py-2 rounded-full"
                >
                  <Checkbox
                    id={`gender-${gender}`}
                    checked={formData.genders.includes(gender)}
                    onCheckedChange={() => toggleSelection("genders", gender)}
                  />
                  <label
                    htmlFor={`gender-${gender}`}
                    className="text-sm font-medium"
                  >
                    {gender}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Section 5: Player Capacity --- */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Player Limit</Label>
            <span className="text-primary font-bold bg-primary/10 px-3 py-1 rounded-full text-xs">
              {formData.maxPlayers} players max
            </span>
          </div>
          <Slider
            min={2}
            max={50}
            step={1}
            value={[formData.maxPlayers]}
            onValueChange={(val) =>
              setFormData({ ...formData, maxPlayers: val[0] })
            }
            className="py-4"
          />
        </section>

        {/* --- Section 6: Additional Info --- */}
        <section className="space-y-2">
          <Label htmlFor="desc">Notes / Rules</Label>
          <Textarea
            id="desc"
            placeholder="Bring a dark/light jersey, water, etc."
            className="bg-card border-border rounded-(--radius)] min-h-30"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </section>
      </div>

      {/* --- Sticky Footer Action --- */}
      <div className=" mt-4 pb-30 left-0 right-0 p-4 pt-4 bg-background/90 backdrop-blur-lg">
        <Button
          onClick={handlePost}
          className="w-full h-14 text-lg font-bold rounded-(--radius)] shadow-lg shadow-primary/20"
        >
          Post Game
        </Button>
      </div>
    </div>
  );
}
