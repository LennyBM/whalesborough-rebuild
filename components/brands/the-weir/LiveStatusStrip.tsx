import * as React from "react";

import { theWeirBrand } from "@/lib/brands/the-weir";
import { cn } from "@/lib/utils";

/**
 * Live status strip — The Weir variant.
 *
 * Time-aware service window, dog policy, walk-in vs reserved hint.
 * Marked with `data-live` so a future WebSocket binding can update the
 * "tables left" count in place without re-rendering the whole page.
 *
 * Distinct from the W Club strip (which is pool temps / sauna state) —
 * this one is about which service is open, whether you can walk in,
 * and whether the terrace is on.
 */
type Reading = {
  label: string;
  value: string;
  dataLive: string;
  emphasis?: boolean;
};

export interface LiveStatusStripProps {
  className?: string;
  /** When provided, shows a "tables free" hint. Use null to hide. */
  tablesFreeHint?: { time: string; count: number } | null;
}

function currentService(now: Date): {
  name: string;
  window: string;
  open: boolean;
} {
  const day = now.getDay(); // 0 Sun, 6 Sat
  const hour = now.getHours();
  const minute = now.getMinutes();
  const time = hour + minute / 60;

  if (time >= 8.5 && time < 11) {
    return {
      name: "Breakfast",
      window: `${theWeirBrand.service.breakfast.from} – ${theWeirBrand.service.breakfast.to}`,
      open: true,
    };
  }
  if (day === 0 && time >= 12 && time < 17) {
    return {
      name: "Sunday Roast",
      window: `${theWeirBrand.service.sundayRoast.from} – ${theWeirBrand.service.sundayRoast.to}`,
      open: true,
    };
  }
  if (time >= 12 && time < 16) {
    return {
      name: "Lunch",
      window: `${theWeirBrand.service.lunch.from} – ${theWeirBrand.service.lunch.to}`,
      open: true,
    };
  }
  // Summer Fri/Sat dinner (May = month index 4 through Sept = 8)
  const month = now.getMonth();
  const isSummer = month >= 4 && month <= 8;
  const isFriOrSat = day === 5 || day === 6;
  if (isSummer && isFriOrSat && time >= 17 && time < 21) {
    return {
      name: "Dinner",
      window: `${theWeirBrand.service.dinner.from} – ${theWeirBrand.service.dinner.to}`,
      open: true,
    };
  }
  return { name: "Kitchen closed", window: "Next service tomorrow", open: false };
}

export function LiveStatusStrip({
  className,
  tablesFreeHint = { time: "19:00", count: 2 },
}: LiveStatusStripProps) {
  const now = new Date();
  const service = currentService(now);

  const readings: Reading[] = [
    {
      label: "Service now",
      value: service.open ? `${service.name} · ${service.window}` : service.name,
      dataLive: "weir.service.current",
      emphasis: true,
    },
    {
      label: "Dogs",
      value: "Welcome indoors and out",
      dataLive: "weir.policy.dogs",
    },
    {
      label: "Terrace",
      value: "Open · weather dependent",
      dataLive: "weir.terrace.state",
    },
    tablesFreeHint
      ? {
          label: "Tables free tonight",
          value: `${tablesFreeHint.count} at ${tablesFreeHint.time}`,
          dataLive: "weir.tables.free",
        }
      : {
          label: "Walk in",
          value: "Up to six, any time",
          dataLive: "weir.walkin.state",
        },
  ];

  return (
    <aside
      aria-label="The Weir service status"
      className={cn("w-full", "bg-weir-accent-deep text-white", className)}
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
                className={cn(
                  "leading-tight md:mt-0.5",
                  r.emphasis
                    ? "font-display italic text-h5 text-white"
                    : "text-body-sm text-white/90",
                )}
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
