import { getPlayerByUsername } from "@/app/(player)/services/getPlayerByUsername";
import createServerSupabaseClient from "@/supabase/createClients/serverClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ username: string }>;
}

export default async function UserProfilePage({ params }: PageProps) {
  // 1. Extract username from the URL parameters
  const { username } = await params;

  // 2. Fetch the player record from your service
  const player = await getPlayerByUsername(username);

  // 3. Trigger 404 page if no player exists with that username
  if (!player) {
    notFound();
  }

  // 1. Get currently authenticated user
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 2. Simple ownership check
  const isOwner = user?.id === player.id;

  // Ready to build the view — temporary JSON dump to verify data flow:
  return (
    <main className="p-8">
      <pre>{JSON.stringify(player, null, 2)}</pre>
    </main>
  );
}
