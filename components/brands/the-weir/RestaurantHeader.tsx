import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { WeirMark } from "./WeirMark";
import { cn } from "@/lib/utils";

/**
 * Restaurant sub-brand bar — sits above the standard SiteHeader inside
 * /dine/*. Quiet, low-contrast. Italic "The Weir" wordmark on the left,
 * a small "Back to the estate" link on the right.
 *
 * The visual cue that the visitor has crossed into a different register
 * without redoing the global nav.
 */
export function RestaurantHeader({ className }: { className?: string }) {
  return (
    <div
      data-weir-bar
      className={cn(
        "w-full",
        "bg-weir-accent-tint-deep",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-12 max-w-hero items-center justify-between px-6 lg:px-12",
        )}
      >
        <Link
          href="/dine"
          className={cn(
            "group inline-flex items-center gap-3",
            "focus-visible:outline-none focus-visible:shadow-focus",
          )}
          aria-label="The Weir — Restaurant at Whalesborough — home"
        >
          <WeirMark variant="lockup" withSubtitle />
        </Link>

        <Link
          href="/"
          className={cn(
            "group inline-flex items-center gap-2",
            "text-caption uppercase tracking-[0.08em]",
            "text-on-surface-muted hover:text-weir-accent",
            "transition-colors duration-fast ease-out-luxury",
            "focus-visible:outline-none focus-visible:text-weir-accent",
          )}
        >
          <ArrowLeft
            className="h-3.5 w-3.5 transition-transform duration-fast ease-out-luxury group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          <span>Back to the estate</span>
        </Link>
      </div>
    </div>
  );
}
