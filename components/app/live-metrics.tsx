"use client";

import * as React from "react";
import { Waves, UtensilsCrossed, Dumbbell } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Live Metrics — Whoop's three dials, Whalesborough edition.
 *
 * Three glanceable cards showing live resort status:
 *  1. Pool temperature (from IoT sensor — mocked for now)
 *  2. Restaurant current service + availability
 *  3. Spa next available slot
 *
 * Colour = state:
 *  - Green: available / optimal
 *  - Amber: limited / warming up
 *  - Red: full / closed
 *
 * Each card is tappable — expands to a bottom sheet with detail (Wave 2).
 */
export function LiveMetrics({ className }: { className?: string }) {
  return (
    <section className={cn("grid grid-cols-3 gap-3", className)}>
      <MetricCard
        icon={Waves}
        label="Pool"
        value="29°"
        sublabel="Heated"
        status="optimal"
      />
      <MetricCard
        icon={UtensilsCrossed}
        label="Kitchen"
        value="Lunch"
        sublabel="Until 16:00"
        status="available"
      />
      <MetricCard
        icon={Dumbbell}
        label="Spa"
        value="14:30"
        sublabel="Next slot"
        status="limited"
      />
    </section>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  sublabel,
  status,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  sublabel: string;
  status: "optimal" | "available" | "limited" | "closed";
}) {
  const statusColor = {
    optimal: "text-emerald-400",
    available: "text-emerald-400",
    limited: "text-amber-400",
    closed: "text-red-400",
  };

  return (
    <button
      type="button"
      className={cn(
        "flex flex-col items-center justify-center gap-1 rounded-2xl bg-app-card p-4",
        "transition-transform duration-150 active:scale-95",
      )}
    >
      <Icon
        className={cn("h-5 w-5", statusColor[status])}
        strokeWidth={1.8}
      />
      <p className="mt-1 font-display text-xl font-semibold italic leading-tight text-app-on-surface">
        {value}
      </p>
      <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-app-muted">
        {label}
      </p>
      <p className="text-[10px] text-app-muted/70">{sublabel}</p>
    </button>
  );
}
