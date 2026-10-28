import { getPlayerByUsername } from "@/app/(player)/services/getPlayerByUsername";
import createServerSupabaseClient from "@/supabase/createClients/serverClient";
import { notFound } from "next/navigation";
import { MapPin, Trophy, UserCheck, Activity, Calendar } from "lucide-react"; // Added Calendar icon

interface PageProps {
  params: Promise<{ username: string }>;
}

export default async function UserProfilePage({ params }: PageProps) {
  const { username } = await params;
  const supabase = await createServerSupabaseClient();

  // 1. Fetch player details
  const player = await getPlayerByUsername(username);
  if (!player) {
    notFound();
  }

  // 2. Fetch sports & skill levels for this player
  const { data: sports } = await supabase
    .from("player_sports")
    .select("sport, skill_level")
    .eq("player_id", player.id);

  // 3. Ownership check
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isOwner = user?.id === player.id;

  const fullName = [player.first_name, player.surname]
    .filter(Boolean)
    .join(" ");
  const initial = (
    player.first_name?.[0] ||
    player.username?.[0] ||
    "?"
  ).toUpperCase();

  // Extract just the city from home (e.g., "Winchester, Hampshire..." -> "Winchester")
  const city = player.home ? player.home.split(",")[0].trim() : null;

  // Format "Joined Month Year" (e.g., "Joined October 2026")
  // Falls back to player.created_at or uses a safe fallback if null
  const joinedDateStr = player.terms_and_age_accepted_at
    ? new Date(player.terms_and_age_accepted_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="relative z-10 flex min-h-screen w-full flex-col bg-background text-foreground pb-24 pointer-events-auto">
      {/* 1. Full-Width Edge-to-Edge Gradient Banner */}
      <div className="w-full h-44 bg-gradient-to-r from-primary via-primary/85 to-secondary relative px-4 pt-4 shadow-inner">
        {/* Owner Badge */}
        {isOwner && (
          <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-md text-primary text-xs font-semibold px-2.5 py-1 rounded-full border border-border shadow-sm flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5" />
            You
          </div>
        )}
      </div>

      {/* 2. Main Content Container (pulled up to overlap the banner) */}
      <div className="w-full max-w-md mx-auto px-4 -mt-16 space-y-6">
        {/* Profile Card Info */}
        <div className="bg-card border border-border rounded-[var(--radius)] p-6 shadow-sm flex flex-col items-center text-center relative">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full border-4 border-card bg-secondary text-secondary-foreground shadow-md flex items-center justify-center font-bold text-3xl overflow-hidden -mt-16 mb-3">
            {player.avatar_url ? (
              <img
                src={player.avatar_url}
                alt={player.username || "Avatar"}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{initial}</span>
            )}
          </div>

          {/* Name & Handle */}
          <h1 className="text-xl font-bold tracking-tight text-card-foreground">
            {fullName || player.username}
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            @{player.username}
          </p>

          {/* Metadata Row: City & Joined Date */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2.5">
            {city && (
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted border border-border/60 px-3 py-1 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{city}</span>
              </div>
            )}

            {joinedDateStr && (
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted border border-border/60 px-3 py-1 rounded-full">
                <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Joined {joinedDateStr}</span>
              </div>
            )}
          </div>

          {/* Bio */}
          {player.bio && (
            <p className="mt-3 text-sm text-foreground/80 leading-relaxed max-w-xs">
              {player.bio}
            </p>
          )}
        </div>

        {/* Sports & Activity Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <Trophy className="w-4 h-4 text-primary" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Sports & Activity
            </h2>
          </div>

          {sports && sports.length > 0 ? (
            <div className="grid grid-cols-1 gap-2.5">
              {sports.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-card border border-border shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Activity className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-sm capitalize text-card-foreground">
                      {item.sport}
                    </span>
                  </div>

                  {item.skill_level && (
                    <span className="text-xs font-semibold bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md capitalize">
                      {item.skill_level}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-card border border-border text-center">
              <p className="text-sm text-muted-foreground italic">
                No sports added yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
