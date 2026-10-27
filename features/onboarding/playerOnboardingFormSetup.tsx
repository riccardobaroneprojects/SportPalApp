import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import createBrowserSupabaseClient from "@/supabase/createClients/browserClient";
import { LocationIQResult } from "@/app/(player)/components/SearchBar/SearchBarData";
import { useRouter, usePathname } from "next/navigation";

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
  const router = useRouter();
  const pathname = usePathname();
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
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("Authentication error: No user found", userError);
      return;
    }

    const { error: playerError } = await supabase.from("players").insert({
      id: user.id, // Ties the row to auth.users
      first_name: data.first_name,
      surname: data.surname,
      username: data.username,
      birth_date: data.birth_date,
      gender: data.gender,
      bio: data.bio,
      home: data.home,
      latitude: data.latitude,
      longitude: data.longitude,
      avatar_url: data.avatar_url,
      // terms_and_age must allways be accepted so we can safely insert the timestamp here as we know if execution got here they where accepted
      terms_and_age_accepted_at: new Date().toISOString(),
    });

    if (playerError) {
      console.error("Failed to insert player profile:", playerError.message);
      return;
    }

    // 3. Bulk insert sports preferences (if the user selected any)
    if (data.sports && data.sports.length > 0) {
      const sportsToInsert = data.sports.map((sportItem) => ({
        player_id: user.id,
        sport: sportItem.sport,
        skill_level: sportItem.skill_level,
      }));

      const { error: sportsError } = await supabase
        .from("player_sports")
        .insert(sportsToInsert);

      if (sportsError) {
        console.error(
          "Failed to insert sports preferences:",
          sportsError.message,
        );
        return;
      }
    }

    // 4. Update the user metadata so your onboarding proxy/guard clears them
    const { error: metaError } = await supabase.auth.updateUser({
      data: {
        account_type: "player",
        latitude: data.latitude,
        longitude: data.longitude,
        username: data.username,
      },
    });

    if (metaError) {
      console.error("Failed to update user metadata:", metaError.message);
      return;
    }

    // usePathname() stripped reqOnboarding parameters so the onboarding view doesn't show up on refresh
    router.replace(pathname);
    router.refresh();
  };

  return {
    playerForm,
    onSubmit,
    handleLocationSelect,
    errors,
    isSubmitting,
  };
}
