import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * The Weir wordmark — italic Newsreader "The Weir" with an
 * underscore-rule line beneath. The rule evokes the lake surface
 * and a menu-card hairline.
 *
 * Variants:
 *  - "mono" — wordmark only. Quietest treatment.
 *  - "lockup" — wordmark with optional "Restaurant at Whalesborough"
 *    subtitle, inline.
 *  - "stacked" — wordmark above the rule, subtitle below. The big mark.
 *
 * Per sub-brand identity in lib/brands/the-weir.ts.
 */
export interface WeirMarkProps {
  variant?: "mono" | "lockup" | "stacked";
  withSubtitle?: boolean;
  /** Force monochrome (light/dark) on contrasting backgrounds. */
  tone?: "default" | "light" | "dark";
  /** Add the underscore-rule beneath the wordmark. Default true for all variants. */
  withRule?: boolean;
  className?: string;
}

export function WeirMark({
  variant = "mono",
  withSubtitle = false,
  tone = "default",
  withRule = true,
  className,
}: WeirMarkProps) {
  const toneColor =
    tone === "light"
      ? "text-white"
      : tone === "dark"
        ? "text-on-surface"
        : "text-on-surface";

  const ruleTone =
    tone === "light" ? "bg-white/45" : "bg-weir-accent/60";

  const subtitleTone =
    tone === "light" ? "text-white/70" : "text-on-surface-muted";

  if (variant === "stacked") {
    return (
      <span
        aria-label="The Weir, Restaurant at Whalesborough"
        className={cn("inline-flex flex-col items-start gap-1.5", className)}
      >
        <span
          className={cn(
            "font-display italic font-normal",
            "text-[2rem] leading-[1] tracking-[-0.015em]",
            toneColor,
          )}
        >
          The Weir
        </span>
        {withRule ? (
          <span
            aria-hidden="true"
            className={cn("block h-px w-12", ruleTone)}
          />
        ) : null}
        {withSubtitle ? (
          <span className={cn("eyebrow", subtitleTone)}>
            Restaurant at Whalesborough
          </span>
        ) : null}
      </span>
    );
  }

  if (variant === "lockup") {
    return (
      <span
        aria-label="The Weir, Restaurant at Whalesborough"
        className={cn("inline-flex items-baseline gap-3", className)}
      >
        <span
          className={cn(
            "font-display italic font-normal",
            "text-h4 leading-none tracking-[-0.005em]",
            toneColor,
          )}
        >
          The Weir
        </span>
        {withSubtitle ? (
          <>
            <span
              aria-hidden="true"
              className={cn(
                "h-3 w-px",
                tone === "light" ? "bg-white/30" : "bg-weir-accent/50",
              )}
            />
            <span className={cn("eyebrow", subtitleTone)}>
              Restaurant at Whalesborough
            </span>
          </>
        ) : null}
      </span>
    );
  }

  // mono
  return (
    <span
      aria-label="The Weir"
      className={cn("inline-flex flex-col items-start", className)}
    >
      <span
        className={cn(
          "font-display italic font-normal leading-none",
          toneColor,
        )}
      >
        The Weir
      </span>
      {withRule ? (
        <span aria-hidden="true" className={cn("mt-1 block h-px w-10", ruleTone)} />
      ) : null}
    </span>
  );
}
