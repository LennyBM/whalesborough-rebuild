import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Skeleton — slow shimmer placeholder.
 * Aspect ratios must match the underlying component (no CLS).
 */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      className={cn(
        "relative overflow-hidden bg-surface-container",
        "rounded-none",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-r before:from-transparent before:via-surface-container-high/50 before:to-transparent",
        "before:animate-shimmer",
        "before:[background-size:200%_100%]",
        className,
      )}
      {...props}
    >
      <span className="sr-only">Loading</span>
    </div>
  );
}

export { Skeleton };
