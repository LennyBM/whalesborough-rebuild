import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface CardSkeletonProps {
  /** Height of the image placeholder area */
  imageHeight?: string;
  /** Number of text lines below image */
  lines?: number;
  /** Optional className */
  className?: string;
}

/**
 * Card-shaped skeleton with image area + text lines.
 */
export function CardSkeleton({
  imageHeight = "h-48",
  lines = 3,
  className,
}: CardSkeletonProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <Skeleton className={cn("w-full", imageHeight)} />
      <div className="space-y-2 px-1">
        <Skeleton className="h-5 w-3/4" />
        {Array.from({ length: lines - 1 }).map((_, i) => (
          <Skeleton
            key={i}
            className={cn("h-4", i === lines - 2 ? "w-1/2" : "w-full")}
          />
        ))}
      </div>
    </div>
  );
}
