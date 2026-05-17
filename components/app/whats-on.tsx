"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * What's On — today's schedule as scrollable cards.
 *
 * Modelled on Habitas' six-pillar daily programming.
 * Shows a time-ordered feed of what's happening on the estate today.
 *
 * Each card is tappable → navigates to booking/detail sheet (Wave 2).
 *
 * Progressive disclosure:
 *  - Tier 1: card shows time + title + availability state
 *  - Tier 2: tap → bottom sheet with full details + book CTA
 */

// TODO: Replace with real schedule data from Supabase / activity calendar
const MOCK_SCHEDULE = [
  {
    id: "ev_1",
    time: "08:30",
    title: "Breakfast at The Weir",
    category: "Dining",
    status: "open" as const,
    note: "No booking needed · walk in",
  },
  {
    id: "ev_2",
    time: "10:00",
    title: "Cliff Walk — Widemouth Bay",
    category: "Activities",
    status: "open" as const,
    note: "Meet at reception · 2 hours · dogs welcome",
  },
  {
    id: "ev_3",
    time: "12:00",
    title: "Lunch service opens",
    category: "Dining",
    status: "open" as const,
    note: "Until 16:00 · terrace open",
  },
  {
    id: "ev_4",
    time: "14:00",
    title: "Foraging Walk with Sam",
    category: "Activities",
    status: "limited" as const,
    note: "2 spots remaining · 90 min",
  },
  {
    id: "ev_5",
    time: "17:00",
    title: "Grill and Chill",
    category: "Events",
    status: "limited" as const,
    note: "From £18pp · live fire on the terrace",
  },
  {
    id: "ev_6",
    time: "19:00",
    title: "Music with Yazzy",
    category: "Events",
    status: "open" as const,
    note: "No cover · lakeside acoustic set",
  },
];

export function WhatsOn({ className }: { className?: string }) {
  return (
    <section className={cn("", className)}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-app-muted">
          Today on the estate
        </p>
        <Link
          href="/estate"
          className="text-[11px] font-medium text-app-accent"
        >
          See all
        </Link>
      </div>

      <div className="mt-3 space-y-2">
        {MOCK_SCHEDULE.map((event) => (
          <ScheduleCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}

function ScheduleCard({
  event,
}: {
  event: (typeof MOCK_SCHEDULE)[number];
}) {
  const statusColor = {
    open: "bg-emerald-400",
    limited: "bg-amber-400",
    full: "bg-red-400",
  };

  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-start gap-4 rounded-xl bg-app-card p-4",
        "text-left transition-transform duration-150 active:scale-[0.98]",
      )}
    >
      {/* Time column */}
      <div className="flex w-12 flex-shrink-0 flex-col items-center">
        <span className="text-[13px] font-semibold tabular-nums text-app-on-surface">
          {event.time}
        </span>
        <span
          className={cn(
            "mt-1.5 h-1.5 w-1.5 rounded-full",
            statusColor[event.status],
          )}
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-[14px] font-semibold leading-tight text-app-on-surface">
          {event.title}
        </p>
        <p className="mt-1 text-[11px] text-app-muted">{event.note}</p>
      </div>

      {/* Arrow */}
      <ArrowUpRight
        className="h-4 w-4 flex-shrink-0 text-app-muted/50"
        strokeWidth={1.5}
      />
    </button>
  );
}
