export default function ProfileLoading() {
  return (
    <div className="relative z-10 flex min-h-screen w-full flex-col bg-background text-foreground pb-24 pointer-events-auto animate-pulse">
      {/* 1. Full-Width Edge-to-Edge Gradient Banner Skeleton */}
      <div className="w-full h-44 bg-muted relative px-4 pt-4 shadow-inner" />

      {/* 2. Main Content Container (pulled up to overlap the banner) */}
      <div className="w-full max-w-md mx-auto px-4 -mt-16 space-y-6">
        {/* Profile Card Info Skeleton */}
        <div className="bg-card border border-border rounded-[var(--radius)] p-6 shadow-sm flex flex-col items-center text-center relative">
          {/* Avatar Skeleton */}
          <div className="w-24 h-24 rounded-full border-4 border-card bg-muted shadow-md -mt-16 mb-3" />

          {/* Name & Handle Skeleton */}
          <div className="h-6 w-36 bg-muted rounded-md mb-2" />
          <div className="h-4 w-24 bg-muted/60 rounded-md mb-3" />

          {/* City Location Chip Skeleton */}
          <div className="h-6 w-28 bg-muted/80 rounded-full mb-3" />

          {/* Bio Skeleton */}
          <div className="space-y-2 w-full max-w-xs mt-3">
            <div className="h-3 w-full bg-muted/60 rounded" />
            <div className="h-3 w-4/5 mx-auto bg-muted/60 rounded" />
          </div>
        </div>

        {/* Sports & Activity Section Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <div className="w-4 h-4 bg-muted rounded" />
            <div className="h-3 w-32 bg-muted rounded" />
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3.5 rounded-xl bg-card border border-border shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted" />
                  <div className="h-4 w-28 bg-muted rounded" />
                </div>
                <div className="h-6 w-16 bg-muted rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
