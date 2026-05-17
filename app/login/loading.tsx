import { Skeleton } from "@/components/ui/skeleton";

/**
 * Login page loading — centered card with form fields.
 */
export default function LoginLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>

        {/* Heading */}
        <div className="space-y-2 text-center">
          <Skeleton className="mx-auto h-6 w-32" />
          <Skeleton className="mx-auto h-4 w-48" />
        </div>

        {/* Form card */}
        <div className="rounded-2xl bg-surface-container p-6 space-y-4">
          {/* Demo account cards */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl bg-surface-container-low p-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
