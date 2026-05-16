import { Skeleton } from "@/components/ui/skeleton";

/**
 * Dine section loading — header skeleton + menu preview skeletons.
 */
export default function DineLoading() {
  return (
    <div className="min-h-screen bg-background px-6 py-16 lg:px-12">
      {/* Header */}
      <div className="mb-12 space-y-4">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-5 w-1/2" />
      </div>

      {/* Menu preview skeletons */}
      <div className="space-y-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-7 w-1/4" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="flex items-start gap-4">
                  <Skeleton className="h-20 w-20 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
