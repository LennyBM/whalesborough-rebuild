import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * RiskPanel — the mandatory FCA-aware risk notice for the Whalesborough
 * Living sub-brand. ~150 words; verbatim from
 * research/content/lodge-sales-copy.md "RISK PANEL TEMPLATE".
 *
 * Placement (per lodge-sales-copy.md):
 *   - /own (hub footer)
 *   - /own/lodges/trelowen, tevi, gwelva, bespoke
 *   - /own/rental-income (STICKY — `sticky` variant)
 *   - /own/process step 4
 *   - /own/costs worked example
 *   - Any FAQ accordion answer mentioning income
 *
 * Visual treatment:
 *   - Cream #f2ebe0 background with deep brown #3d2614 text
 *   - Newsreader italic eyebrow ("Risk notice")
 *   - Plus Jakarta Sans body
 *   - Persistent in DOM, server-rendered (NOT lazy-loaded — required
 *     for SEO + crawler ingestion + compliance audit per spec §10)
 *
 * Variants:
 *   - `inline` (default) — appears in-flow at end of income-mentioning sections
 *   - `sticky` — pinned to viewport bottom on /own/rental-income
 *   - `compact` — short version for FAQ accordions
 *
 * Version stamp:
 *   - The `version` prop is logged via `data-risk-version` and is required
 *     to be present on every render for the compliance audit trail
 *     (lodge-sales-module-spec §10).
 */
export function RiskPanel({
  variant = "inline",
  version = "2026-05-14",
  className,
}: {
  variant?: "inline" | "sticky" | "compact";
  version?: string;
  className?: string;
}) {
  const isSticky = variant === "sticky";
  const isCompact = variant === "compact";

  return (
    <aside
      role="region"
      aria-label="Risk notice — FCA-aware disclosure"
      data-risk-version={version}
      data-risk-variant={variant}
      className={cn(
        "bg-[color:var(--living-risk-bg,#f2ebe0)] text-[color:var(--living-risk-text,#3d2614)]",
        isSticky
          ? "sticky bottom-0 z-sticky border-t-2 border-[color:var(--living-accent,#3d4a40)]"
          : "",
        isCompact ? "px-4 py-4 md:px-6 md:py-5" : "px-6 py-8 md:px-10 md:py-10",
        className,
      )}
    >
      <div className="mx-auto max-w-content">
        <p
          className={cn(
            "font-display italic font-normal",
            isCompact
              ? "text-base"
              : "text-lg md:text-xl",
          )}
        >
          Risk notice
        </p>
        <p
          className={cn(
            "mt-3 font-body",
            isCompact ? "text-body-sm leading-relaxed" : "text-body leading-relaxed",
          )}
        >
          {isCompact ? (
            <>
              Lifestyle purchase, not a regulated investment. Rental income, if
              any, is not guaranteed; site fees and utilities are payable
              regardless. Whalesborough Farm Resort Sales Limited is not
              authorised by the FCA. No FSCS / FOS protection. Capital is at
              risk. Past performance is not a guide to future performance.
            </>
          ) : (
            <>
              A residence at Whalesborough is a lifestyle purchase, not a
              regulated investment. If you choose to participate in our
              optional managed letting programme, rental income will vary with
              occupancy, season and market conditions and is not guaranteed.
              Any historic figures shown are averages across participating
              residences and are not a forward projection. The residence is a
              depreciating asset; its resale value may be lower than the price
              paid. Annual site fees, metered utilities and insurance are
              payable regardless of letting. Whalesborough Farm Resort Sales
              Limited is not authorised by the Financial Conduct Authority;
              this product is not a regulated investment and you will not be
              entitled to compensation from the Financial Services Compensation
              Scheme or the Financial Ombudsman Service. Past performance is
              not a guide to future performance. Take independent legal, tax
              and financial advice before purchase.
            </>
          )}
        </p>
        {!isCompact ? (
          <p className="mt-4 text-caption uppercase tracking-[0.12em] opacity-70">
            Risk notice v{version} · Capital is at risk
          </p>
        ) : null}
      </div>
    </aside>
  );
}
