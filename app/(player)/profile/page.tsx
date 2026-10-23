import { redirect } from "next/navigation";
import createServerSupabaseClient from "@/supabase/createClients/serverClient";

export default async function ProfileRedirectPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Pull username directly from session metadata
  const username = user?.user_metadata?.username;

  redirect(`/profile/${username}`);
}
