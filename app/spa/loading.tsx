import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "@/components/ui/card-skeleton";

/**
 * Spa section loading — header skeleton + facilities grid skeleton.
 */
export default function SpaLoading() {
  return (
    <div className="min-h-screen bg-background px-6 py-16 lg:px-12">
      {/* Header */}
      <div className="mb-12 space-y-4">
        <Skeleton className="h-10 w-2/5" />
        <Skeleton className="h-5 w-1/2" />
      </div>

      {/* Facilities grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} imageHeight="h-44" lines={2} />
        ))}
      </div>
    </div>
  );
}
