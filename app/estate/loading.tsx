import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "@/components/ui/card-skeleton";

/**
 * Estate section loading — header skeleton + activities grid skeleton.
 */
export default function EstateLoading() {
  return (
    <div className="min-h-screen bg-background px-6 py-16 lg:px-12">
      {/* Header */}
      <div className="mb-12 space-y-4">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-5 w-2/3" />
      </div>

      {/* Activities grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} imageHeight="h-48" lines={3} />
        ))}
      </div>
    </div>
  );
}
