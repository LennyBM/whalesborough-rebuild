import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * FCAReviewPending — development-only review banner.
 *
 * Renders ONLY when NODE_ENV !== "production". Shows reviewers exactly
 * what still needs FCA sign-off on the page, with item-level markers.
 *
 * Per lodge-sales-module-spec §0 compliance banner: every page that
 * contains a `[FCA REVIEW REQUIRED]` marker must be visibly flagged for
 * reviewers in development, and the page-level `metadata.robots.index`
 * for the rental-income page must be `false` until sign-off is recorded.
 *
 * Production rendering: returns null. Crawlers, end-users and search
 * engines never see this component on the live site.
 */
export function FCAReviewPending({
  page,
  items,
  className,
}: {
  page: string;
  items: string[];
  className?: string;
}) {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      data-fca-review-pending="true"
      data-page={page}
      className={cn(
        "border-t-4 border-b-4 border-warning bg-warning-container px-6 py-4 md:px-10 md:py-5",
        className,
      )}
    >
      <div className="mx-auto max-w-content">
        <p className="font-body text-overline uppercase tracking-[0.15em] text-warning-container-fg">
          FCA review pending · Development only · Page: {page}
        </p>
        <p className="mt-2 font-body text-body-sm text-warning-container-fg">
          The following items on this page require specialist FCA hospitality
          solicitor sign-off before publication. This banner does not render in
          production.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 font-body text-body-sm text-warning-container-fg">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
