import { Skeleton } from "@/components/ui/skeleton";

/**
 * Booking dates loading — step indicator + calendar grid + summary.
 */
export default function BookingDatesLoading() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-lg px-4 py-6 space-y-6">
        {/* Step indicator */}
        <div className="flex items-center justify-between">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-7 w-7 rounded-full" />
              <Skeleton className="hidden h-3 w-12 sm:block" />
            </div>
          ))}
        </div>

        {/* Heading */}
        <Skeleton className="h-6 w-40" />

        {/* Month navigation */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>

        {/* Calendar grid (7 cols x 5 rows) */}
        <div className="space-y-2">
          {/* Day labels */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="mx-auto h-3 w-6" />
            ))}
          </div>
          {/* Date cells */}
          {Array.from({ length: 5 }).map((_, row) => (
            <div key={row} className="grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }).map((_, col) => (
                <Skeleton key={col} className="mx-auto h-10 w-10 rounded-lg" />
              ))}
            </div>
          ))}
        </div>

        {/* Summary bar */}
        <div className="flex items-center justify-between rounded-2xl bg-surface-container p-4">
          <div className="space-y-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-10 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
