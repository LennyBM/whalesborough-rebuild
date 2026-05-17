import { Skeleton } from "@/components/ui/skeleton";

/**
 * Explore page loading — search bar + category chips + property grid.
 */
export default function ExploreLoading() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-lg px-4 py-6 space-y-6">
        {/* Search bar */}
        <Skeleton className="h-12 w-full rounded-xl" />

        {/* Category chips */}
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 flex-shrink-0 rounded-full" />
          ))}
        </div>

        {/* Featured cards */}
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
        </div>

        {/* Property list */}
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-3 rounded-2xl bg-surface-container p-3">
              <Skeleton className="h-20 w-20 flex-shrink-0 rounded-xl" />
              <div className="flex-1 space-y-2 py-1">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
