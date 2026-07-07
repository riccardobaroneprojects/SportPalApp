import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnnouncementInsert } from "@/types";

// 1. Enums matching Supabase
const ageGroupEnum = z.enum(["18_29", "30_39", "40_49", "50_plus", "any"]);
const genderEnum = z.enum(["male", "female", "any", "prefer_not_to_say"]);
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

// 2. Schema definition
export const announcementFormSchema = z
  .object({
    description: z.string().min(10, "Must be at least 10 characters.").max(500),
    location_name: z.string().min(2, "Location name is required."),
    latitude: z.number({
      message: "Latitude must be a valid number",
    }),
    longitude: z.number({
      message: "Latitude must be a valid number",
    }),
    max_players: z
      .number()
      .int()
      .min(1, "Max Players must be equal or higher than min player."),
    min_players: z.number().int().min(1, "Must have at least 2 player."),
    age: ageGroupEnum,
    gender: genderEnum,
    skill_level: skillLevelEnum,
    sport: sportEnum,
  })
  .refine((data) => data.min_players <= data.max_players, {
    message: "Minimum players cannot be greater than maximum players limit.",
    path: ["max_players"],
  }) satisfies z.ZodType<
  Omit<AnnouncementInsert, "announcement_id" | "created_at" | "owner">
>;

// 3. Type inference exported for use elsewhere if needed
export type AnnouncementFormValues = z.infer<typeof announcementFormSchema>;

// mapping of enum types for mapping the ui fields
export const formEnumOptions = {
  sport: announcementFormSchema.shape.sport.options,
  skill: announcementFormSchema.shape.skill_level.options,
  age: announcementFormSchema.shape.age.options,
  gender: announcementFormSchema.shape.gender.options,
};

// locationIQ result
interface LocationIQResult {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}

export function useAnnouncementForm() {
  const announcementform = useForm<AnnouncementFormValues>({
    resolver: zodResolver(announcementFormSchema),
    defaultValues: {
      description: "",
      location_name: "",
      // We cast undefined as number here just to satisfy the TS compiler for defaultValues
      latitude: undefined as unknown as number,
      longitude: undefined as unknown as number,
      max_players: 2,
      sport: "football",
      skill_level: "beginner",
      age: "any",
      gender: "any",
    },
  });

  const handleLocationSelect = (item: LocationIQResult) => {
    announcementform.setValue("location_name", item.display_name, {
      shouldValidate: true,
    });
    announcementform.setValue("latitude", parseFloat(item.lat), {
      shouldValidate: true,
    });
    announcementform.setValue("longitude", parseFloat(item.lon), {
      shouldValidate: true,
    });
  };

  const onSubmit = async (data: AnnouncementFormValues) => {
    // if execution arrives here zod has validated all the fields
    try {
      // add Supabase insert operation when ready
      console.log("Safe data heading straight to Supabase:", data);
      announcementform.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    announcementform,
    handleLocationSelect,
    onSubmit: announcementform.handleSubmit(onSubmit),
    errors: announcementform.formState.errors,
  };
}
