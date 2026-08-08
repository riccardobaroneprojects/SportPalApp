import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PlayerInsert, Player_sportsInsert } from "@/types";
import createBrowserSupabaseClient from "@/supabase/createClients/browserClient";
import { LocationIQResult } from "@/app/(player)/components/SearchBar/SearchBarData";

// 1. Enums matching Supabase
export const genderEnum = z.enum([
  "male",
  "female",
  "any",
  "prefer_not_to_say",
]);
export const sportEnum = z.enum([
  "football",
  "basketball",
  "tennis",
  "volleyball",
  "badminton",
]);
export const skillLevelEnum = z.enum([
  "beginner",
  "intermediate",
  "advanced",
  "professional",
]);

// Sub-schema for individual player sport items
export const playerSportItemSchema = z.object({
  sport: sportEnum,
  skill_level: skillLevelEnum,
});

// username checker
const supabase = createBrowserSupabaseClient();
const checkUsernameUnique = async (username: string) => {
  if (!username || username.length < 3) return true;

  const { data } = await supabase
    .from("players")
    .select("username")
    .eq("username", username)
    .maybeSingle();

  return !data;
};

// date of birth checker (calculates if user is over 18)
export const getLastDayOfMonth = (yearMonthStr: string): string => {
  if (!yearMonthStr || !yearMonthStr.includes("-")) return "";
  const [year, month] = yearMonthStr.split("-").map(Number);
  const lastDay = new Date(year, month, 0).getDate();
  return `${yearMonthStr}-${String(lastDay).padStart(2, "0")}`;
};

// 2. Main Schema definition
export const playerOnboardingFormSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  surname: z.string().min(1, "Surname is required"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed")
    .refine(async (val) => await checkUsernameUnique(val), {
      message: "Username is already taken",
    }),
  birth_date: z
    .string()
    .min(1, "Birth date is required")
    .transform((val) => getLastDayOfMonth(val)),
  gender: genderEnum,
  home: z.string().min(1, "Home location is required"),
  latitude: z.number({
    message: "Latitude must be a valid number",
  }),
  longitude: z.number({
    message: "Longitude must be a valid number",
  }),
  bio: z.string(),
  avatar_url: z.string(),
  sports: z.array(playerSportItemSchema),
  terms_and_age_accepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),
});

// 3. Type inference
export type PlayerOnboardingFormValues = z.infer<
  typeof playerOnboardingFormSchema
>;

// 4. UI enum options mapping

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1; // 1-12
const maxAllowedYear = currentYear - 18;

export const playerFormEnumOptions = {
  gender: genderEnum.options.filter((g) => g !== "any"),
  sport: sportEnum.options,
  skill_level: skillLevelEnum.options,
  years: Array.from({ length: maxAllowedYear - 1940 + 1 }, (_, i) =>
    (maxAllowedYear - i).toString(),
  ),
  // Helper function to return months with disabled state
  getMonthsForYear: (selectedYear: string) => {
    const yearNum = Number(selectedYear);
    return Array.from({ length: 12 }, (_, i) => {
      const monthNum = i + 1;
      const monthStr = String(monthNum).padStart(2, "0");

      // If user selected the exact 18-year cutoff year (e.g. 2008),
      // disable months that are after the current month (e.g. Sept-Dec in August)
      const isDisabled = yearNum === maxAllowedYear && monthNum >= currentMonth;

      return {
        value: monthStr,
        label: new Date(0, i).toLocaleString("default", { month: "long" }),
        disabled: isDisabled,
      };
    });
  },
};

// 5. Custom hook setup
export function usePlayerOnboardingForm() {
  const playerForm = useForm<PlayerOnboardingFormValues>({
    mode: "onBlur",
    resolver: zodResolver(playerOnboardingFormSchema),
    defaultValues: {
      first_name: "",
      surname: "",
      username: "",
      bio: "",
      birth_date: "",
      gender: "prefer_not_to_say",
      home: "",
      latitude: undefined as unknown as number,
      longitude: undefined as unknown as number,
      avatar_url: "",
      terms_and_age_accepted: false,
      sports: [],
    },
  });

  const { errors, isSubmitting } = playerForm.formState;

  const handleLocationSelect = (item: LocationIQResult) => {
    playerForm.setValue("home", item.display_name, {
      shouldValidate: true,
    });
    playerForm.setValue("latitude", parseFloat(item.lat), {
      shouldValidate: true,
    });
    playerForm.setValue("longitude", parseFloat(item.lon), {
      shouldValidate: true,
    });
  };

  // Logs the final validated data
  const onSubmit = async (data: PlayerOnboardingFormValues) => {
    console.log("=== PLAYER ONBOARDING FORM SUBMITTED ===");
    console.log(data);
  };

  return {
    playerForm,
    onSubmit,
    handleLocationSelect,
    errors,
    isSubmitting,
  };
}
