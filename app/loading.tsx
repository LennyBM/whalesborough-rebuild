import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "@/components/ui/card-skeleton";

/**
 * Root loading skeleton — full-page placeholder with header, hero, and 4 entry-point cards.
 */
export default function RootLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header placeholder */}
      <header className="flex items-center justify-between px-6 py-4 lg:px-12">
        <Skeleton className="h-8 w-40" />
        <div className="hidden items-center gap-6 md:flex">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-10 w-28" />
      </header>

      {/* Hero skeleton */}
      <div className="px-6 py-12 lg:px-12">
        <Skeleton className="h-[60vh] w-full" />
      </div>

      {/* 4 entry-point card skeletons */}
      <div className="grid grid-cols-1 gap-6 px-6 pb-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-12">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} imageHeight="h-56" lines={3} />
        ))}
      </div>
    </div>
  );
}
