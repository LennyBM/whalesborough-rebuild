import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * The W Club wordmark — italic Newsreader.
 *
 * Variants:
 *  - "mono" (default) — just the italic "W". The standalone mark.
 *  - "lockup" — "The W Club" with optional subtitle "Spa & Wellness".
 *  - "stacked" — wordmark above subtitle, for hero placements.
 *
 * Per sub-brand identity in lib/brands/w-club.ts.
 */
export interface WClubMarkProps {
  variant?: "mono" | "lockup" | "stacked";
  /** Show "Spa & Wellness" subtitle on lockup/stacked variants. */
  withSubtitle?: boolean;
  /** Force monochrome (sage-fg) when used on dark backgrounds. */
  tone?: "default" | "light" | "dark";
  className?: string;
}

export function WClubMark({
  variant = "mono",
  withSubtitle = false,
  tone = "default",
  className,
}: WClubMarkProps) {
  const toneColor =
    tone === "light"
      ? "text-white"
      : tone === "dark"
        ? "text-on-surface"
        : "text-on-surface";

  if (variant === "mono") {
    return (
      <span
        aria-label="The W Club"
        className={cn(
          "font-display italic font-normal leading-none",
          toneColor,
          className,
        )}
      >
        W
      </span>
    );
  }

  if (variant === "stacked") {
    return (
      <span
        aria-label="The W Club, Spa and Wellness"
        className={cn("inline-flex flex-col items-start gap-1", className)}
      >
        <span
          className={cn(
            "font-display italic text-[2rem] leading-[1] tracking-[-0.01em]",
            toneColor,
          )}
        >
          The W Club
        </span>
        {withSubtitle ? (
          <span
            className={cn(
              "eyebrow",
              tone === "light"
                ? "text-white/70"
                : "text-on-surface-muted",
            )}
          >
            Spa &amp; Wellness
          </span>
        ) : null}
      </span>
    );
  }

  // lockup — inline horizontal
  return (
    <span
      aria-label="The W Club, Spa and Wellness"
      className={cn("inline-flex items-baseline gap-3", className)}
    >
      <span
        className={cn(
          "font-display italic text-h4 leading-none tracking-[-0.005em]",
          toneColor,
        )}
      >
        The W Club
      </span>
      {withSubtitle ? (
        <>
          <span
            aria-hidden="true"
            className={cn(
              "h-3 w-px",
              tone === "light"
                ? "bg-white/30"
                : "bg-spa-accent/40",
            )}
          />
          <span
            className={cn(
              "eyebrow",
              tone === "light"
                ? "text-white/70"
                : "text-on-surface-muted",
            )}
          >
            Spa &amp; Wellness
          </span>
        </>
      ) : null}
    </span>
  );
}
