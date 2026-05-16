import { Skeleton } from "@/components/ui/skeleton";

interface PageSkeletonProps {
  /** Show a large header skeleton area */
  header?: boolean;
  /** Number of content block skeletons to render */
  blocks?: number;
  /** Optional className for the wrapper */
  className?: string;
}

/**
 * Reusable page skeleton with configurable header + N content block skeletons.
 */
export function PageSkeleton({
  header = true,
  blocks = 3,
  className,
}: PageSkeletonProps) {
  return (
    <div className={className}>
      {header && (
        <div className="mb-12 space-y-4">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-5 w-1/2" />
        </div>
      )}
      <div className="space-y-8">
        {Array.from({ length: blocks }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}
