import * as React from "react";

import { wClubBrand } from "@/lib/brands/w-club";
import { cn } from "@/lib/utils";

/**
 * Live status strip — operational facility readings.
 *
 * Pool temps, sauna status, adult quiet-hour window. Marked with
 * `data-live` so a future WebSocket binding can update values in place
 * without re-rendering the whole page. Today the values come from
 * wClubBrand.facilities (a single source of truth).
 *
 * Adult quiet hours are intentionally up front — restraint is the W Club's
 * competitive position vs family spas, and we say so on every page.
 */
type Reading = {
  label: string;
  value: string;
  dataLive: string;
};

export interface LiveStatusStripProps {
  className?: string;
}

export function LiveStatusStrip({ className }: LiveStatusStripProps) {
  const today = new Date();
  const isWeekend = today.getDay() === 0 || today.getDay() === 6;
  const quiet = isWeekend
    ? wClubBrand.facilities.adultQuietHours.weekend
    : wClubBrand.facilities.adultQuietHours.weekday;

  const readings: Reading[] = [
    {
      label: "Indoor infinity pool",
      value: wClubBrand.facilities.indoorPoolTemp,
      dataLive: "pool.indoor.temp_c",
    },
    {
      label: "Hydrotherapy pool",
      value: wClubBrand.facilities.outdoorPoolTemp,
      dataLive: "pool.hydro.temp_c",
    },
    {
      label: "Swedish sauna",
      value: wClubBrand.facilities.saunaStatus,
      dataLive: "sauna.state",
    },
    {
      label: `Adult quiet hours · ${isWeekend ? "weekend" : "weekday"}`,
      value: `${quiet.am} · ${quiet.pm}`,
      dataLive: "facility.adults_only_windows",
    },
  ];

  return (
    <aside
      aria-label="Spa facility status"
      className={cn(
        "w-full",
        "bg-spa-accent-deep text-white",
        className,
      )}
    >
      <div className="mx-auto max-w-hero px-6 py-4 lg:px-12 lg:py-5">
        <dl
          className={cn(
            "grid grid-cols-1 gap-y-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-12",
          )}
        >
          {readings.map((r) => (
            <div
              key={r.label}
              className="flex items-baseline justify-between gap-3 md:block"
            >
              <dt className="text-caption uppercase tracking-[0.08em] text-white/55">
                {r.label}
              </dt>
              <dd
                data-live={r.dataLive}
                className="font-display italic text-h5 leading-tight text-white md:mt-0.5"
              >
                {r.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </aside>
  );
}
