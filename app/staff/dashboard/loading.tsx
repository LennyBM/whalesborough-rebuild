import { Skeleton } from "@/components/ui/skeleton";

/**
 * Staff dashboard loading — occupancy rings + stats cards + task list.
 */
export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-lg px-4 py-6 space-y-6">
        {/* Page title + date */}
        <div className="space-y-1">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>

        {/* Occupancy rings row */}
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="h-24 w-24 rounded-full" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-surface-container p-4 space-y-2">
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          ))}
        </div>

        {/* Tasks list */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-24" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl bg-surface-container p-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
