import * as React from "react";
import { cn } from "@/lib/utils";

export interface TrustSignal {
  label: string;
  value: string;
}

export interface TrustStripProps {
  signals: TrustSignal[];
  className?: string;
}

/**
 * TrustStrip — horizontal strip of trust signals (ratings, accolades).
 * Renders as a scrollable row on mobile, evenly spaced on desktop.
 */
const TrustStrip = React.forwardRef<HTMLDivElement, TrustStripProps>(
  ({ signals, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full overflow-x-auto bg-surface-container-low py-6",
          className,
        )}
      >
        <div className="mx-auto flex max-w-content items-center justify-between gap-8 px-6 lg:px-12">
          {signals.map((signal, i) => (
            <div
              key={i}
              className="flex shrink-0 flex-col items-center gap-1 text-center"
            >
              <span className="text-h3 text-on-surface">{signal.value}</span>
              <span className="text-caption text-on-surface-muted">
                {signal.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
TrustStrip.displayName = "TrustStrip";

export { TrustStrip };
