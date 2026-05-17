import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * LivingMark — Whalesborough Living wordmark.
 *
 * "Whalesborough Living" in Newsreader REGULAR (not italic). The roman
 * register is the entire point of this mark: it signals property-deal,
 * not holiday-escape. The italic-W lockup belongs to The W Club.
 *
 * Optional `subtitle` renders the "Lodge Ownership at Whalesborough"
 * supporting line in Plus Jakarta Sans label tracking.
 */
export function LivingMark({
  size = "md",
  showSubtitle = true,
  className,
}: {
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
  className?: string;
}) {
  const wordmarkSize = {
    sm: "text-xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-4xl",
  }[size];

  return (
    <div className={cn("inline-flex flex-col gap-1", className)}>
      <span
        className={cn(
          "font-display font-normal not-italic tracking-tight",
          "text-[color:var(--living-deep)]",
          wordmarkSize,
        )}
        style={{ letterSpacing: "-0.015em" }}
      >
        Whalesborough Living
      </span>
      {showSubtitle ? (
        <span className="font-body text-overline uppercase tracking-[0.15em] text-[color:var(--living-accent)]">
          Lodge Ownership at Whalesborough
        </span>
      ) : null}
    </div>
  );
}
