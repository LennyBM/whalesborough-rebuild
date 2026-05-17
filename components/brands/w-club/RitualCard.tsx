import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

import { cn, formatCurrency } from "@/lib/utils";

/**
 * RitualCard — editorial card for a single ritual.
 *
 * Italic Newsreader title. Duration and price form a quiet metadata
 * row at the foot. The "Book this ritual" link is a glacial-accent
 * link-with-arrow (in-spa secondary action, not the cross-brand cognac
 * Book CTA).
 */
export interface RitualCardProps {
  slug: string;
  name: string;
  description: string;
  durationMinutes: number;
  weekdayPricePence: number;
  weekendPricePence: number;
  category?: string;
  /** "Suitable for" tags from the seed data. */
  suitableFor?: ReadonlyArray<string>;
  /** Optional pull-quote shown on featured layouts. */
  pullQuote?: string;
  className?: string;
  /** Style — "default" for grid, "feature" for a hero treatment block. */
  variant?: "default" | "feature";
}

export function RitualCard({
  slug,
  name,
  description,
  durationMinutes,
  weekdayPricePence,
  weekendPricePence,
  category,
  suitableFor,
  pullQuote,
  variant = "default",
  className,
}: RitualCardProps) {
  const weekday = formatCurrency(weekdayPricePence / 100);
  const weekend = formatCurrency(weekendPricePence / 100);
  const samePrice = weekdayPricePence === weekendPricePence;

  if (variant === "feature") {
    return (
      <article
        className={cn(
          "grid gap-10 bg-white p-8 lg:grid-cols-12 lg:gap-16 lg:p-12",
          className,
        )}
      >
        <div className="lg:col-span-5">
          <div className="aspect-[4/5] w-full bg-spa-accent-muted/60">
            <div className="flex h-full items-center justify-center font-display italic text-display-lg text-spa-accent/30">
              W
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 lg:py-4">
          {category ? (
            <p className="eyebrow text-spa-accent">{category}</p>
          ) : null}
          <h3
            className={cn(
              "heading-editorial-italic mt-4 text-display-sm md:text-display-md text-on-surface",
            )}
          >
            {name}
          </h3>
          <p className="mt-6 max-w-xl text-body-lg text-on-surface-variant">
            {description}
          </p>
          {pullQuote ? (
            <p className="mt-8 max-w-lg border-l-2 border-spa-accent pl-6 font-display italic text-h5 leading-snug text-on-surface">
              {pullQuote}
            </p>
          ) : null}
          <dl className="mt-10 flex flex-wrap items-baseline gap-x-10 gap-y-4 text-on-surface">
            <div>
              <dt className="eyebrow text-on-surface-muted">Duration</dt>
              <dd className="mt-1 font-display italic text-h4">
                {durationMinutes} minutes
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-on-surface-muted">Weekday</dt>
              <dd className="mt-1 font-display italic text-h4">{weekday}</dd>
            </div>
            <div>
              <dt className="eyebrow text-on-surface-muted">Weekend</dt>
              <dd className="mt-1 font-display italic text-h4">{weekend}</dd>
            </div>
          </dl>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href={`/spa/treatments/${slug}`}
              className={cn(
                "group inline-flex items-center gap-2",
                "font-body text-button uppercase tracking-[0.12em]",
                "text-spa-accent hover:text-spa-accent-pressed",
                "transition-colors duration-fast ease-out-luxury",
                "focus-visible:outline-none focus-visible:text-spa-accent-pressed",
              )}
            >
              <span className="relative">
                Read this ritual
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-0 bg-spa-accent transition-[width] duration-base ease-out-luxury group-hover:w-full"
                />
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-fast ease-out-luxury group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href={`https://thewclub.try.be/?service=${encodeURIComponent(slug)}`}
              className={cn(
                "inline-flex h-11 items-center bg-primary px-6",
                "font-body text-button uppercase tracking-[0.12em] text-primary-fg",
                "transition-colors duration-fast ease-out-luxury",
                "hover:bg-primary-hover",
                "focus-visible:outline-none focus-visible:shadow-focus",
              )}
            >
              Book this ritual
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group flex h-full flex-col bg-white p-6 lg:p-8",
        "transition-colors duration-fast ease-out-luxury",
        "hover:bg-spa-accent-muted/30",
        className,
      )}
    >
      {category ? (
        <p className="eyebrow text-spa-accent">{category}</p>
      ) : null}
      <h3
        className={cn(
          "heading-editorial-italic mt-3 text-h3 text-on-surface lg:text-h2",
        )}
      >
        <Link
          href={`/spa/treatments/${slug}`}
          className="focus-visible:outline-none focus-visible:text-spa-accent"
        >
          <span aria-hidden className="absolute inset-0" />
          {name}
        </Link>
      </h3>
      <p className="mt-4 line-clamp-4 text-body text-on-surface-variant">
        {description}
      </p>
      {suitableFor && suitableFor.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {suitableFor.slice(0, 3).map((tag) => (
            <li
              key={tag}
              className="bg-spa-accent-muted/60 px-3 py-1 text-caption uppercase tracking-[0.08em] text-spa-accent-deep"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-auto pt-8">
        <div className="flex items-end justify-between gap-4 border-t border-spa-accent-muted pt-5">
          <div>
            <p className="flex items-center gap-1.5 text-caption uppercase tracking-[0.08em] text-on-surface-muted">
              <Clock className="h-3 w-3" aria-hidden /> {durationMinutes} min
            </p>
            <p className="mt-1 font-display italic text-h4 text-on-surface">
              {samePrice ? weekday : `${weekday} – ${weekend}`}
            </p>
          </div>
          <span
            className={cn(
              "inline-flex items-center gap-1",
              "font-body text-button uppercase tracking-[0.12em] text-spa-accent",
            )}
          >
            <span className="hidden sm:inline">Book this ritual</span>
            <span className="sm:hidden">Book</span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-fast ease-out-luxury group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </article>
  );
}
