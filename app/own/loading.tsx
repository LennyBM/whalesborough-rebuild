import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "@/components/ui/card-skeleton";

/**
 * Own section loading — header skeleton + 3 collection card skeletons.
 */
export default function OwnLoading() {
  return (
    <div className="min-h-screen bg-background px-6 py-16 lg:px-12">
      {/* Header */}
      <div className="mb-12 space-y-4">
        <Skeleton className="h-10 w-2/5" />
        <Skeleton className="h-5 w-3/5" />
      </div>

      {/* 3 collection cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <CardSkeleton key={i} imageHeight="h-56" lines={4} />
        ))}
      </div>
    </div>
  );
}
