import * as React from "react";

import { cn, formatCurrency } from "@/lib/utils";

/**
 * TierComparator — the four-tier teaser comparison block.
 *
 * Per lodge-sales-copy.md PAGE 1 "The Four Ranges (Comparison Teaser)":
 *  Range | Bedrooms | From | What it is
 *  ----
 *  No income figures. Lifestyle-first surface. Income detail is reserved
 *  for /own/rental-income behind the RiskPanel.
 */

export interface TierRow {
  slug: "trelowen" | "tevi" | "gwelva" | "bespoke";
  name: string;
  bedrooms: string;
  /** Pence base — pass null for POA. */
  fromPrice: number | null;
  /** Free-text label for the "What it is" column. */
  what: string;
}

const TIERS: TierRow[] = [
  {
    slug: "trelowen",
    name: "Trelowen Exclusive Lodges",
    bedrooms: "2 / 3 / 4",
    fromPrice: 425000,
    what: "The signature timber-frame range. BS 3632, 125-year licence, fully electric, private hot tub on every plot.",
  },
  {
    slug: "tevi",
    name: "Tevi Luxury Lodges",
    bedrooms: "3 / 4",
    fromPrice: 749950,
    what: "The ultra-premium tier. Eight residences only. Architect-designed, floor-to-ceiling glazing, landscaped private garden.",
  },
  {
    slug: "gwelva",
    name: "Gwelva Luxury Villas",
    bedrooms: "4",
    fromPrice: null,
    what: "Permanent-build villas (not BS 3632 caravans). Four bedrooms, larger plots, garden-facing decking.",
  },
  {
    slug: "bespoke",
    name: "Bespoke Lodges",
    bedrooms: "Design to spec",
    fromPrice: 399000,
    what: "Designed with you. Specification, kitchen finish, furniture pack and decking chosen to your brief.",
  },
];

export function TierComparator({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      {/* Desktop: editorial table */}
      <table className="hidden w-full table-fixed border-collapse md:table">
        <thead>
          <tr className="bg-[color:var(--living-accent,#3d4a40)] text-[color:var(--living-accent-fg,#ffffff)]">
            <th className="px-6 py-5 text-left font-body text-overline uppercase tracking-[0.15em]">
              Range
            </th>
            <th className="px-6 py-5 text-left font-body text-overline uppercase tracking-[0.15em]">
              Bedrooms
            </th>
            <th className="px-6 py-5 text-left font-body text-overline uppercase tracking-[0.15em]">
              From
            </th>
            <th className="px-6 py-5 text-left font-body text-overline uppercase tracking-[0.15em]">
              What it is
            </th>
          </tr>
        </thead>
        <tbody>
          {TIERS.map((tier, i) => (
            <tr
              key={tier.slug}
              className={cn(
                i % 2 === 0
                  ? "bg-[color:var(--living-card,#ffffff)]"
                  : "bg-[color:var(--living-tint,#f9f5ee)]",
              )}
            >
              <td className="px-6 py-7 align-top">
                <a
                  href={`/own/lodges/${tier.slug}`}
                  className="font-display text-h4 text-[color:var(--living-deep,#1f2622)] hover:text-[color:var(--living-accent,#3d4a40)] transition-colors duration-fast"
                >
                  {tier.name}
                </a>
              </td>
              <td className="px-6 py-7 align-top font-body text-body text-on-surface">
                {tier.bedrooms}
              </td>
              <td className="px-6 py-7 align-top font-body text-body text-on-surface">
                {tier.fromPrice === null
                  ? "On enquiry"
                  : formatCurrency(tier.fromPrice)}
              </td>
              <td className="px-6 py-7 align-top font-body text-body text-on-surface-variant">
                {tier.what}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile: stacked cards */}
      <ul className="flex flex-col gap-px md:hidden">
        {TIERS.map((tier) => (
          <li
            key={tier.slug}
            className="bg-[color:var(--living-card,#ffffff)] px-6 py-7"
          >
            <a
              href={`/own/lodges/${tier.slug}`}
              className="font-display text-h3 text-[color:var(--living-deep,#1f2622)] hover:text-[color:var(--living-accent,#3d4a40)] transition-colors"
            >
              {tier.name}
            </a>
            <dl className="mt-4 grid grid-cols-2 gap-y-2 font-body text-body-sm">
              <dt className="text-on-surface-muted">Bedrooms</dt>
              <dd className="text-on-surface">{tier.bedrooms}</dd>
              <dt className="text-on-surface-muted">From</dt>
              <dd className="text-on-surface">
                {tier.fromPrice === null
                  ? "On enquiry"
                  : formatCurrency(tier.fromPrice)}
              </dd>
            </dl>
            <p className="mt-4 text-body-sm text-on-surface-variant">
              {tier.what}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-caption italic text-on-surface-muted">
        Prices are guide figures subject to plot, specification and the current
        price list at the time of reservation. Site fees, utilities and
        insurance are payable annually whether the residence is let or not.
      </p>
    </div>
  );
}
