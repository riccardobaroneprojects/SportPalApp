import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 1. Enums matching Supabase
const ageGroupEnum = z.enum(["18_29", "30_39", "40_49", "50_plus", "any"]);
const genderEnum = z.enum(["male", "female", "any"]);
const skillLevelEnum = z.enum([
  "beginner",
  "intermediate",
  "advanced",
  "professional",
  "any",
]);
const sportEnum = z.enum([
  "football",
  "basketball",
  "tennis",
  "volleyball",
  "badminton",
]);

export const searchFilterSchema = z.object({
  sports: z.array(sportEnum).default([]),
  ageGroups: z.array(ageGroupEnum).default([]),
  skill_levels: z.array(skillLevelEnum).default([]),
  genders: z.array(genderEnum).default([]),
  distance: z.number().min(1).max(100).default(10),
});

export type FilterState = z.infer<typeof searchFilterSchema>;
// mapping of enum types for mapping the ui fields
export const formEnumOptions = {
  sport: sportEnum.options,
  skill: skillLevelEnum.options,
  age: ageGroupEnum.options,
  gender: genderEnum.options,
};

const defaultFilterValues: FilterState = {
  sports: [],
  skill_levels: [],
  ageGroups: [],
  genders: [],
  distance: 10,
};
