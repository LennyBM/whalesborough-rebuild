import * as React from "react";
import Link from "next/link";

import { cn, formatCurrency } from "@/lib/utils";
import { LinkArrow } from "@/components/ui/button";

/**
 * LodgeCard — surface for a single range tile (Trelowen / Tevi / Gwelva
 * / Bespoke) on the /own hub.
 *
 * Voice rules enforced:
 *  - Never the word "investment" or "yield" on the card surface
 *  - "From £X" is permitted ONLY when a real plot at that price is
 *    available — caller is responsible for that gate (per lodge-sales-
 *    copy.md §IMPLEMENTATION NOTES, ASA precedent Luxury Lodge Estates).
 *  - When `fromPrice` is null, copy reads "Pricing on enquiry".
 */
export function LodgeCard({
  href,
  eyebrow,
  title,
  description,
  fromPrice,
  bedroomRange,
  badge,
  variant = "default",
  className,
}: {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  /** Pence-base — pass null for POA (Gwelva). */
  fromPrice: number | null;
  bedroomRange: string;
  /** e.g. "Most popular", "Limited release", "Coming soon". */
  badge?: string;
  variant?: "default" | "premium";
  className?: string;
}) {
  const priceLabel = fromPrice === null
    ? "Pricing on enquiry"
    : `From ${formatCurrency(fromPrice)}`;

  return (
    <article
      className={cn(
        "group relative flex flex-col",
        "bg-[color:var(--living-card,#ffffff)]",
        variant === "premium"
          ? "outline outline-2 outline-[color:var(--living-accent,#3d4a40)] outline-offset-0"
          : "",
        className,
      )}
    >
      {/* Image placeholder — Wave 2 swaps for next/image with real assets */}
      <div className="aspect-[4/3] relative overflow-hidden bg-[color:var(--living-accent-muted,#d6dcd8)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--living-accent,#3d4a40)]/30 to-[color:var(--living-deep,#1f2622)]/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-display text-display-sm not-italic text-[color:var(--living-card,#ffffff)]/60">
            {title}
          </p>
        </div>
        {badge ? (
          <span className="absolute left-4 top-4 bg-[color:var(--living-accent,#3d4a40)] px-3 py-1.5 font-body text-overline uppercase tracking-[0.15em] text-[color:var(--living-card,#ffffff)]">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-4 px-6 py-8 md:px-8 md:py-10">
        <p className="eyebrow text-on-surface-muted">{eyebrow}</p>
        <h3 className="font-display text-h2 md:text-display-sm text-on-surface tracking-[-0.015em]">
          {title}
        </h3>

        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-display text-h4 text-[color:var(--living-deep,#1f2622)]">
            {priceLabel}
          </span>
          <span className="font-body text-body-sm text-on-surface-muted">
            {bedroomRange} {bedroomRange === "Design to spec" ? "" : "bedroom"}
          </span>
        </div>

        <p className="text-body text-on-surface-variant">{description}</p>

        <div className="mt-auto pt-4">
          <LinkArrow href={href}>Explore {title.split(" ")[0]}</LinkArrow>
        </div>
      </div>

      <Link
        href={href}
        className="absolute inset-0"
        aria-label={`Explore ${title}`}
      >
        <span className="sr-only">Explore {title}</span>
      </Link>
    </article>
  );
}
