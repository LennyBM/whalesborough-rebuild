import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * PlotMap — V2 placeholder.
 *
 * Per lodge-sales-copy.md PAGE 2 (Trelowen) "See the live plot map":
 *  interactive map of the meadow showing available / reserved / sold
 *  plots with view orientation and walking-distance markers.
 *
 * For V1 we ship a friendly placeholder with availability counts so the
 * sales conversation can still happen by phone — the live SVG plot map
 * is a Wave-2 build behind /api/plots availability data.
 *
 * Compliance note: ASA precedent (Luxury Lodge Estates A24-1256125)
 * requires that any "From £X" headline link to a live plot at that
 * price. The V2 map will gate the headline pricing against actual
 * availability.
 */
export function PlotMap({
  tier,
  available,
  reserved,
  sold,
  className,
}: {
  tier: "trelowen" | "tevi" | "gwelva" | "bespoke";
  available: number;
  reserved: number;
  sold: number;
  className?: string;
}) {
  const tierName = {
    trelowen: "Trelowen",
    tevi: "Tevi",
    gwelva: "Gwelva",
    bespoke: "Bespoke",
  }[tier];

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "bg-[color:var(--living-accent-muted,#d6dcd8)]",
        "px-6 py-12 md:px-12 md:py-20",
        className,
      )}
    >
      {/* Map placeholder visual */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(61,74,64,0.4) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(31,38,34,0.3) 0%, transparent 40%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-content">
        <p className="eyebrow text-[color:var(--living-deep,#1f2622)]">
          {tierName} plot map · Wave 2
        </p>
        <h3 className="mt-4 font-display text-h2 not-italic text-[color:var(--living-deep,#1f2622)]">
          Live plot map coming soon
        </h3>

        <dl className="mt-8 grid grid-cols-3 gap-4 md:gap-8">
          <div>
            <dt className="text-overline uppercase tracking-[0.15em] text-[color:var(--living-deep,#1f2622)]/70">
              Available
            </dt>
            <dd className="mt-2 font-display text-display-sm not-italic text-[color:var(--living-accent,#3d4a40)]">
              {available}
            </dd>
          </div>
          <div>
            <dt className="text-overline uppercase tracking-[0.15em] text-[color:var(--living-deep,#1f2622)]/70">
              Reserved
            </dt>
            <dd className="mt-2 font-display text-display-sm not-italic text-[color:var(--living-deep,#1f2622)]/70">
              {reserved}
            </dd>
          </div>
          <div>
            <dt className="text-overline uppercase tracking-[0.15em] text-[color:var(--living-deep,#1f2622)]/70">
              Sold
            </dt>
            <dd className="mt-2 font-display text-display-sm not-italic text-[color:var(--living-deep,#1f2622)]/40">
              {sold}
            </dd>
          </div>
        </dl>

        <p className="mt-8 max-w-xl font-body text-body text-[color:var(--living-deep,#1f2622)]/90">
          The interactive plot map ships in Wave 2 — orientation, view
          direction, walking-distance markers and live reservation status. For
          a private walk-through of available plots, book a viewing.
        </p>
      </div>
    </div>
  );
}
