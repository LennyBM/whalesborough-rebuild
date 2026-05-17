import { Skeleton } from "@/components/ui/skeleton";

/**
 * Staff area loading — role selector + navigation cards.
 */
export default function StaffLoading() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-lg px-4 py-6 space-y-6">
        {/* Page title */}
        <Skeleton className="h-7 w-20" />

        {/* Role badge */}
        <Skeleton className="h-8 w-36 rounded-full" />

        {/* Navigation cards */}
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 rounded-2xl bg-surface-container p-5">
              <Skeleton className="h-12 w-12 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-3 w-2/3" />
              </div>
              <Skeleton className="h-5 w-5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
