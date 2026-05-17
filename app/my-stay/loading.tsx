import { Skeleton } from "@/components/ui/skeleton";

/**
 * My Stay loading — stay header card + info cards + action list.
 */
export default function MyStayLoading() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-lg px-4 py-6 space-y-4">
        {/* Page title */}
        <Skeleton className="h-7 w-24" />

        {/* Stay header card */}
        <div className="rounded-2xl bg-surface-container p-4">
          <div className="flex gap-4">
            <Skeleton className="h-20 w-20 flex-shrink-0 rounded-xl" />
            <div className="flex-1 space-y-2 py-1">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
        </div>

        {/* Quick info grid */}
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-surface-container p-4 space-y-2">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>

        {/* Action list */}
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl bg-surface-container p-4">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-2/3" />
              </div>
              <Skeleton className="h-4 w-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
