import React, { useState } from "react";
import { ArrowLeft, Check, User, Camera, MapPin, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  usePlayerOnboardingForm,
  playerFormEnumOptions,
} from "./playerOnboardingFormSetup";
import { LocationSearchHook } from "@/app/(player)/hooks/LocationSearchHook";
import { AnimatePresence, motion } from "framer-motion";
import { LocationIQResult } from "@/app/(player)/components/SearchBar/SearchBarData";

interface PlayerOnboardingFormProps {
  isVisible: boolean;
  onBackToRole: () => void;
  onSubmitSuccess: () => void;
}

export default function PlayerOnboardingForm({
  isVisible,
  onBackToRole,
  onSubmitSuccess,
}: PlayerOnboardingFormProps) {
  const { playerForm, onSubmit, handleLocationSelect, errors } =
    usePlayerOnboardingForm();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const searchHook = LocationSearchHook();

  // Watch form fields for dynamic UI states
  const birthDateValue = playerForm.watch("birth_date");
  const genderValue = playerForm.watch("gender");
  const hasBirthDateError = !!errors.birth_date;
  const sportsValue = playerForm.watch("sports") || [];

  // Disable terms checkbox until a valid birth date is supplied
  const isTermsDisabled = !birthDateValue || hasBirthDateError;

  // Handle local avatar preview selection
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
      playerForm.setValue("avatar_url", url, { shouldValidate: true });
    }
  };

  const [selectedYear = "", selectedMonth = ""] = birthDateValue.split("-");
  // 2. Handlers to combine Year & Month into "YYYY-MM" format
  const handleYearSelect = (year: string) => {
    const availableMonths = playerFormEnumOptions.getMonthsForYear(year);
    const isCurrentMonthDisabled = availableMonths.find(
      (m) => m.value === selectedMonth,
    )?.disabled;

    const validMonth = isCurrentMonthDisabled ? "01" : selectedMonth || "01";
    playerForm.setValue("birth_date", `${year}-${validMonth}`, {
      shouldValidate: true,
    });
  };

  const handleMonthSelect = (month: string) => {
    if (!selectedYear) return;
    playerForm.setValue("birth_date", `${selectedYear}-${month}`, {
      shouldValidate: true,
    });
  };

  const handleDropdownClose = (open: boolean) => {
    // If the dropdown is closing, trigger Zod validation for birth_date
    if (!open) {
      playerForm.trigger("birth_date");
    }
  };

  // Submit wrapper to execute the Zod handler and notify parent component
  const handleFormSubmit = playerForm.handleSubmit(async (data) => {
    await onSubmit(data);
    onSubmitSuccess();
  });

  return (
    <div
      className={cn(
        "fixed inset-0 z-150 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 ease-in-out",
        isVisible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none",
      )}
    >
      {/* 1. Backdrop */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />

      {/* 2. Expanded Modal Card Shell */}
      <div
        className={cn(
          "relative w-full max-w-xl h-auto max-h-[85vh] overflow-hidden flex flex-col rounded-[2.5rem] border bg-background border-border/40 p-6 sm:p-8 shadow-2xl transition-all duration-300 ease-out",
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-4 scale-95 opacity-0",
        )}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/40 shrink-0">
          <Button
            onClick={onBackToRole}
            type="button"
            className="flex items-center gap-1.5 text-xs font-semibold text-primary-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Change Role</span>
          </Button>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-secondary px-3 py-1 rounded-full">
            Player Profile
          </span>
        </div>

        {/* Scrollable Form Shell */}
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="overflow-y-auto pr-1 space-y-6 flex-1">
            {/* Title & Subtitle */}
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Player Setup
              </h2>
              <p className="mt-1 text-xs text-muted-foreground font-medium">
                Complete your player details below.
              </p>
            </div>

            {/* --- INPUT FIELDS START HERE --- */}
            <div className="space-y-5">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative group cursor-pointer">
                  <Avatar className="w-20 h-20 border-2 border-border shadow-sm">
                    <AvatarImage src={avatarPreview || ""} alt="Avatar" />
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      <User className="w-7 h-7 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Camera className="w-5 h-5 text-white" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
                <span className="text-[11px] text-muted-foreground font-medium">
                  Upload Profile Photo
                </span>
              </div>

              {/* First Name & Surname */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="first_name" className="text-xs">
                    First Name
                  </Label>
                  <Input
                    id="first_name"
                    placeholder="John"
                    {...playerForm.register("first_name")}
                  />
                  {errors.first_name && (
                    <p className="text-[11px] text-destructive">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="surname" className="text-xs">
                    Surname
                  </Label>
                  <Input
                    id="surname"
                    placeholder="Doe"
                    {...playerForm.register("surname")}
                  />
                  {errors.surname && (
                    <p className="text-[11px] text-destructive">
                      {errors.surname.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Username */}
              <div className="space-y-1.5">
                <Label htmlFor="username" className="text-xs">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="johndoe99"
                  {...playerForm.register("username")}
                />
                {errors.username && (
                  <p className="text-[11px] text-destructive">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Birth Date & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">Birth Month & Year</Label>

                  {/* Switch grid to flex with a tight gap */}
                  <div className="flex items-center gap-2">
                    {/* Year Dropdown */}
                    <Select
                      value={selectedYear}
                      onValueChange={handleYearSelect}
                      onOpenChange={handleDropdownClose}
                    >
                      {/* Added w-28 to pull it away from the edge */}
                      <SelectTrigger className="h-9 w-28 text-xs">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent className="max-h-56 z-[200]">
                        {playerFormEnumOptions.years.map((year) => (
                          <SelectItem
                            key={year}
                            value={year}
                            className="text-xs"
                          >
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Month Dropdown */}
                    <Select
                      value={selectedMonth}
                      onValueChange={handleMonthSelect}
                      onOpenChange={handleDropdownClose}
                      disabled={!selectedYear}
                    >
                      {/* Added w-32 so longer month names like "September" fit comfortably */}
                      <SelectTrigger className="h-9 w-32 text-xs">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent className="max-h-56 z-[200]">
                        {playerFormEnumOptions
                          .getMonthsForYear(selectedYear)
                          .map((m) => (
                            <SelectItem
                              key={m.value}
                              value={m.value}
                              disabled={m.disabled}
                              className="text-xs"
                            >
                              {m.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {errors.birth_date && (
                    <p className="text-[11px] text-destructive">
                      {errors.birth_date.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Gender</Label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {playerFormEnumOptions.gender.map((option) => (
                      <Button
                        key={option}
                        type="button"
                        variant={genderValue === option ? "default" : "outline"}
                        className={cn(
                          "text-[11px] h-9 capitalize px-2",
                          option === "prefer_not_to_say" && "col-span-2",
                          genderValue === option
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "text-muted-foreground",
                        )}
                        onClick={() =>
                          playerForm.setValue("gender", option, {
                            shouldValidate: true,
                          })
                        }
                      >
                        {option.replace(/_/g, " ")}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Home Location (LocationIQ Autocomplete) */}
              <div className="space-y-1.5">
                <Label htmlFor="home_address" className="text-xs">
                  Home Location
                </Label>

                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground z-10" />

                  <Input
                    id="home_address"
                    className="pl-9 text-xs"
                    placeholder="Search city or neighborhood..."
                    value={searchHook.query}
                    onChange={(e) => {
                      const val = e.target.value;
                      searchHook.setQuery(val);
                      playerForm.setValue("home", val);

                      // Reset lat/lon if user manually types to force valid selection
                      playerForm.setValue("latitude", 0);
                      playerForm.setValue("longitude", 0);
                    }}
                  />

                  {/* Location Suggestions Dropdown */}
                  <AnimatePresence>
                    {searchHook.suggestions.length > 0 && (
                      <motion.ul
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute left-0 right-0 top-[calc(100%+4px)] z-[200] max-h-48 overflow-y-auto bg-popover rounded-xl border border-border shadow-xl py-1 text-xs"
                      >
                        {searchHook.suggestions.map((item) => (
                          <li
                            key={item.place_id}
                            onMouseDown={(e) => {
                              // 1. Prevent input blur from cancelling the event
                              e.preventDefault();

                              // 2. Update React Hook Form (home, latitude, longitude)
                              handleLocationSelect(item);

                              // 3. Update hook state (sets input text & clears suggestions)
                              searchHook.selectLocation(item);
                            }}
                            className="px-3 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors text-xs border-b border-border/30 last:border-b-0"
                          >
                            {item.display_name}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>

                {(errors.home || errors.latitude || errors.longitude) && (
                  <p className="text-[11px] text-destructive">
                    Select a location from suggestions
                  </p>
                )}
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <Label htmlFor="bio" className="text-xs">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell other players about your playstyle..."
                  className="text-xs min-h-20"
                  {...playerForm.register("bio")}
                />
              </div>

              {/* Sports & Skill Level */}
              <div className="space-y-3">
                <Label className="text-xs">Sports & Skill Level</Label>

                {/* Active Sports Pills */}
                <div className="flex flex-wrap gap-2">
                  {(sportsValue || []).map(
                    (
                      item: { sport: string; skill_level: string },
                      index: number,
                    ) => (
                      <div
                        key={item.sport}
                        className="flex items-center gap-1.5 bg-secondary text-secondary-foreground text-xs font-semibold pl-3 pr-2 py-1 rounded-full border border-border/50"
                      >
                        <span className="capitalize">
                          {item.sport.replace(/_/g, " ")}
                        </span>

                        {/* Dynamic Skill Level Dropdown */}
                        <Select
                          value={item.skill_level}
                          onValueChange={(newLevel) => {
                            const updated = [...sportsValue];
                            updated[index] = {
                              ...updated[index],
                              skill_level:
                                newLevel as (typeof playerFormEnumOptions.skill_level)[number],
                            };
                            playerForm.setValue("sports", updated, {
                              shouldValidate: true,
                            });
                          }}
                        >
                          <SelectTrigger className="h-6 px-2 py-0 text-[10px] font-bold uppercase bg-background/70 hover:bg-background border-none rounded-md shadow-none focus:ring-0 text-foreground/80 cursor-pointer gap-1">
                            <SelectValue>{item.skill_level}</SelectValue>
                          </SelectTrigger>
                          <SelectContent className=" p-1.5 min-w-[130px] z-[200]">
                            {playerFormEnumOptions.skill_level.map((level) => (
                              <SelectItem
                                key={level}
                                value={level}
                                className="text-xs uppercase font-medium"
                              >
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => {
                            const updated = sportsValue.filter(
                              (_: any, i: number) => i !== index,
                            );
                            playerForm.setValue("sports", updated, {
                              shouldValidate: true,
                            });
                          }}
                          className="hover:text-destructive transition-colors ml-0.5 p-0.5"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ),
                  )}
                </div>

                {/* Sport Quick Selector */}
                <div className="p-3 bg-muted/20 rounded-xl border border-border/40 space-y-3">
                  <span className="text-[11px] font-medium text-muted-foreground block">
                    Select sports to add to your profile:
                  </span>

                  <div className="flex flex-wrap gap-1.5">
                    {playerFormEnumOptions.sport.map((sport) => {
                      const isAdded = sportsValue.some(
                        (s: any) => s.sport === sport,
                      );
                      return (
                        <Button
                          key={sport}
                          type="button"
                          variant={isAdded ? "secondary" : "outline"}
                          disabled={isAdded}
                          className="text-[11px] h-8 capitalize px-2.5"
                          onClick={() => {
                            const updated = [
                              ...sportsValue,
                              {
                                sport,
                                skill_level: playerFormEnumOptions
                                  .skill_level[0] as (typeof playerFormEnumOptions.skill_level)[number],
                              },
                            ];
                            playerForm.setValue("sports", updated, {
                              shouldValidate: true,
                            });
                          }}
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          {sport.replace(/_/g, " ")}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {errors.sports && (
                  <p className="text-[11px] text-destructive">
                    {errors.sports.message}
                  </p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="pt-1">
                <div className="flex items-start gap-2.5 p-3 bg-muted/30 rounded-xl border border-border/50">
                  <Checkbox
                    id="terms"
                    disabled={isTermsDisabled}
                    checked={playerForm.watch("terms_and_age_accepted")}
                    onCheckedChange={(checked) =>
                      playerForm.setValue(
                        "terms_and_age_accepted",
                        checked === true,
                        { shouldValidate: true },
                      )
                    }
                  />
                  <Label
                    htmlFor="terms"
                    className={cn(
                      "text-[11px] leading-tight font-medium cursor-pointer",
                      isTermsDisabled && "opacity-50 cursor-not-allowed",
                    )}
                  >
                    I confirm that I am at least 18 years old and agree to the
                    Terms of Service.
                  </Label>
                </div>
                {errors.terms_and_age_accepted && (
                  <p className="text-[11px] text-destructive mt-1">
                    {errors.terms_and_age_accepted.message}
                  </p>
                )}
              </div>
            </div>
            {/* --- INPUT FIELDS END HERE --- */}
          </div>

          {/* Bottom Action Bar */}
          <div className="pt-4 border-t border-border/40 shrink-0 mt-4">
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 px-4 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98] shadow-md shadow-primary/20"
            >
              <Check className="h-4 w-4" />
              <span>Complete Player Setup</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
