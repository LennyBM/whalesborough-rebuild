import { Skeleton } from "@/components/ui/skeleton";

/**
 * Account page loading — avatar + name + quick actions + menu list.
 */
export default function AccountLoading() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-lg px-4 py-6 space-y-6">
        {/* Avatar and name */}
        <div className="flex flex-col items-center gap-3 py-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-40" />
        </div>

        {/* Quick actions row */}
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 rounded-2xl bg-surface-container p-4">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-3 w-14" />
            </div>
          ))}
        </div>

        {/* Menu items */}
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl bg-surface-container p-4">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-4 w-1/3" />
              <div className="flex-1" />
              <Skeleton className="h-4 w-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
