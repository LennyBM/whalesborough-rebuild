import * as React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency } from "@/lib/utils";

/**
 * MembershipTierCard — single W Club tier in the comparison block.
 *
 * Currently every tier is held by waitlist (per loyalty-copy.md §3).
 * The card calls that out explicitly — no "Join now" theatre. Honest framing
 * is part of the W Club register.
 */
export interface MembershipTierCardProps {
  name: string;
  positioning: string;
  /** Pence — null for lifetime tiers. */
  monthlyPricePence?: number | null;
  /** Pence — lifetime / one-off price for Founder. */
  oneOffPricePence?: number | null;
  /** Joining fee in pence, where applicable. */
  joiningFeePence?: number;
  /** Five-year price for Founder (alt). */
  fiveYearPricePence?: number | null;
  includes: ReadonlyArray<string>;
  cohortCap?: number | null;
  /** "active" badge highlights the flagship tier. */
  featured?: boolean;
  /** All tiers currently held by waitlist — set to false only if a tier opens. */
  waitlist?: boolean;
  className?: string;
}

export function MembershipTierCard({
  name,
  positioning,
  monthlyPricePence,
  oneOffPricePence,
  joiningFeePence,
  fiveYearPricePence,
  includes,
  cohortCap,
  featured = false,
  waitlist = true,
  className,
}: MembershipTierCardProps) {
  const monthly =
    typeof monthlyPricePence === "number"
      ? formatCurrency(monthlyPricePence / 100)
      : null;
  const oneOff =
    typeof oneOffPricePence === "number"
      ? formatCurrency(oneOffPricePence / 100)
      : null;
  const fiveYear =
    typeof fiveYearPricePence === "number"
      ? formatCurrency(fiveYearPricePence / 100)
      : null;

  return (
    <article
      className={cn(
        "flex h-full flex-col bg-white p-8 lg:p-10",
        featured && "ring-1 ring-spa-accent",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow text-spa-accent">{name}</p>
        {featured ? (
          <Badge variant="pill" className="bg-spa-accent text-spa-accent-fg">
            Flagship
          </Badge>
        ) : null}
      </div>
      <h3 className="heading-editorial-italic mt-3 text-h2 text-on-surface">
        {name}
      </h3>
      <p className="mt-3 max-w-sm text-body text-on-surface-variant">
        {positioning}
      </p>

      {/* Price block */}
      <div className="mt-8 border-t border-spa-accent-muted pt-6">
        {monthly ? (
          <p className="font-display italic text-display-sm text-on-surface">
            {monthly}
            <span className="ml-2 text-body text-on-surface-muted">
              / month
            </span>
          </p>
        ) : oneOff ? (
          <p className="font-display italic text-display-sm text-on-surface">
            {oneOff}
            <span className="ml-2 text-body text-on-surface-muted">
              lifetime
            </span>
          </p>
        ) : null}
        {fiveYear ? (
          <p className="mt-1 text-body-sm text-on-surface-muted">
            or {fiveYear} for five years
          </p>
        ) : null}
        {typeof joiningFeePence === "number" && joiningFeePence > 0 ? (
          <p className="mt-1 text-body-sm text-on-surface-muted">
            £{(joiningFeePence / 100).toFixed(0)} joining fee
          </p>
        ) : null}
        {cohortCap ? (
          <p className="mt-1 text-body-sm text-on-surface-muted">
            Capped at {cohortCap} members
          </p>
        ) : null}
      </div>

      {/* Includes */}
      <ul className="mt-8 space-y-3 text-body">
        {includes.map((line) => (
          <li
            key={line}
            className="flex items-start gap-3 text-on-surface-variant"
          >
            <Check
              className="mt-1 h-4 w-4 shrink-0 text-spa-accent"
              aria-hidden
            />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      {/* Status / action */}
      <div className="mt-auto pt-10">
        {waitlist ? (
          <div className="bg-spa-accent-muted/60 p-5">
            <p className="eyebrow text-spa-accent-deep">
              Currently waitlisted
            </p>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              Allocation released in small batches as the new app opens. No
              fee to join the waitlist; no commitment until you confirm.
            </p>
            <Link
              href="/spa/memberships#waitlist"
              className={cn(
                "mt-4 inline-flex h-11 items-center bg-spa-accent px-5",
                "font-body text-button uppercase tracking-[0.12em] text-spa-accent-fg",
                "transition-colors duration-fast ease-out-luxury",
                "hover:bg-spa-accent-hover",
                "focus-visible:outline-none focus-visible:shadow-focus",
              )}
            >
              Join the waitlist
            </Link>
          </div>
        ) : (
          <Link
            href={`/spa/memberships#${name.toLowerCase().replace(/\s+/g, "-")}`}
            className={cn(
              "inline-flex h-11 items-center bg-primary px-6",
              "font-body text-button uppercase tracking-[0.12em] text-primary-fg",
              "transition-colors duration-fast ease-out-luxury",
              "hover:bg-primary-hover",
            )}
          >
            Apply for membership
          </Link>
        )}
      </div>
    </article>
  );
}
