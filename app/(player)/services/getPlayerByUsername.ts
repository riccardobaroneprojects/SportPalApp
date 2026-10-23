import createServerSupabaseClient from "@/supabase/createClients/serverClient";
import { Player } from "@/types"; 

export async function getPlayerByUsername(username: string): Promise<Player | null> {
  const supabase = await createServerSupabaseClient();

  const { data: player, error } = await supabase
    .from("players")
    .select("*")
    .eq("username", username)
    .maybeSingle();

  if (error) {
    console.error("Error fetching player by username:", error.message);
    return null;
  }

  return player;
}