"use client";

import * as React from "react";
import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Up Next — your nearest upcoming booking.
 *
 * Modelled on Airbnb's "Your Trip" card.
 * Shows the next scheduled event with time-until countdown.
 *
 * When no upcoming booking: shows a "Nothing booked yet — explore" CTA.
 */

// TODO: Replace with real user booking data from Supabase
const MOCK_BOOKING = {
  id: "bk_001",
  type: "spa" as const,
  title: "Gaia Calming Journey",
  time: "14:30",
  date: "Today",
  duration: "60 min",
  location: "Treatment Room 3",
  minutesUntil: 47,
};

export function UpNext({ className }: { className?: string }) {
  const booking = MOCK_BOOKING;

  if (!booking) {
    return (
      <section className={cn("rounded-2xl bg-app-card p-5", className)}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-app-muted">
          Up next
        </p>
        <p className="mt-3 text-[15px] text-app-on-surface">
          Nothing booked yet.
        </p>
        <Link
          href="/book"
          className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-app-accent"
        >
          Explore what&apos;s available
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </section>
    );
  }

  return (
    <section className={cn("rounded-2xl bg-app-card p-5", className)}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-app-muted">
          Up next
        </p>
        <div className="flex items-center gap-1.5 text-app-accent">
          <Clock className="h-3.5 w-3.5" />
          <span className="text-[12px] font-semibold">
            In {booking.minutesUntil} min
          </span>
        </div>
      </div>

      <div className="mt-4">
        <p className="font-display text-lg font-semibold italic leading-tight text-app-on-surface">
          {booking.title}
        </p>
        <div className="mt-2 flex items-center gap-3 text-[12px] text-app-muted">
          <span>{booking.date} · {booking.time}</span>
          <span className="h-1 w-1 rounded-full bg-app-muted/40" />
          <span>{booking.duration}</span>
        </div>
        <p className="mt-1.5 text-[12px] text-app-muted/70">
          {booking.location}
        </p>
      </div>

      {/* Progress bar — how far into the day this booking is */}
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-app-surface">
        <div
          className="h-full rounded-full bg-app-accent transition-all duration-500"
          style={{ width: "35%" }}
        />
      </div>
    </section>
  );
}
