import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Badge — accolades and card overlays.
 * Distinct from Tag/Chip (which is inline metadata).
 */
const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 px-3 py-1",
    "font-body text-caption uppercase",
    "rounded-none",
  ],
  {
    variants: {
      variant: {
        // Inline tag — flat sage on cream
        default: "bg-surface-container-low text-on-surface-variant",
        // 5-star Gold accolade — Newsreader italic, accent gold
        gold: [
          "bg-surface-container-lowest text-accent-gold",
          "font-display italic normal-case tracking-normal",
          "border-y border-accent-gold/40 px-4 py-1.5",
        ],
        // Dog-friendly / pictogram chips
        success: "bg-success-container text-success-container-fg",
        warning: "bg-warning-container text-warning-container-fg",
        error: "bg-error-container text-error-container-fg",
        info: "bg-info-container text-info-container-fg",
        // Glass overlay for card top-left badges
        glass: "glass text-white",
        // Rounded status pill (the only legitimate full-radius use here)
        pill: "rounded-full bg-secondary text-secondary-fg px-3 py-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
