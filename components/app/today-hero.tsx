"use client";

import * as React from "react";
import { CloudSun, Thermometer, Wind } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Today Hero — location context + weather at a glance.
 *
 * On-site: "You're at Whalesborough" + live weather
 * Remote: "3 days until your stay" + Bude weather forecast
 *
 * Modelled on Whoop's recovery score — big, confident, glanceable.
 */
export function TodayHero({ className }: { className?: string }) {
  // TODO: Replace with real weather API (Met Office DataPoint or Open-Meteo)
  const weather = {
    temp: 14,
    condition: "Partly cloudy",
    wind: 12,
    high: 16,
    low: 11,
  };

  return (
    <section className={cn("rounded-2xl bg-app-card p-5", className)}>
      {/* Location context */}
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-400">
          You&apos;re at Whalesborough
        </p>
      </div>

      {/* Weather — big temp, conditions */}
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="font-display text-[3.5rem] font-light leading-none tracking-tight text-app-on-surface">
            {weather.temp}°
          </p>
          <p className="mt-1 text-[13px] text-app-muted">
            {weather.condition} · H:{weather.high}° L:{weather.low}°
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5 pb-1">
          <CloudSun className="h-8 w-8 text-amber-400" strokeWidth={1.5} />
          <div className="flex items-center gap-1 text-app-muted">
            <Wind className="h-3.5 w-3.5" strokeWidth={1.5} />
            <span className="text-[11px]">{weather.wind} mph</span>
          </div>
        </div>
      </div>

      {/* Estate status chips */}
      <div className="mt-5 flex gap-2">
        <StatusChip label="Terrace" status="open" />
        <StatusChip label="Coast path" status="open" />
        <StatusChip label="Lake" status="calm" />
      </div>
    </section>
  );
}

function StatusChip({
  label,
  status,
}: {
  label: string;
  status: "open" | "closed" | "calm" | "limited";
}) {
  const colorMap = {
    open: "bg-emerald-400/15 text-emerald-400",
    calm: "bg-sky-400/15 text-sky-400",
    limited: "bg-amber-400/15 text-amber-400",
    closed: "bg-red-400/15 text-red-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1",
        "text-[11px] font-medium",
        colorMap[status],
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
