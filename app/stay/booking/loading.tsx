import { Skeleton } from "@/components/ui/skeleton";

/**
 * Booking flow loading — step indicator skeleton + main content skeleton.
 */
export default function BookingLoading() {
  return (
    <div className="min-h-screen bg-background px-6 py-16 lg:px-12">
      {/* Step indicator */}
      <div className="mx-auto mb-12 flex max-w-2xl items-center justify-between">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="hidden h-4 w-16 sm:block" />
          </div>
        ))}
      </div>

      {/* Main content area */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Form area */}
        <div className="space-y-6 lg:col-span-2">
          <Skeleton className="h-8 w-1/3" />
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-12 w-40" />
        </div>

        {/* Summary sidebar */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="mt-4 flex items-center justify-between">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-5 w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
}
