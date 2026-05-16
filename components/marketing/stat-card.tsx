import * as React from "react";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  /** The large metric value, e.g. "83.3" or "500". */
  value: string;
  /** Short label, e.g. "NPS Score" or "Acres". */
  label: string;
  /** Optional longer description below the label. */
  description?: string;
  className?: string;
}

/**
 * StatCard — displays a prominent statistic with label and optional description.
 * No borders — uses tonal background shift per design system.
 */
const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ value, label, description, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-2 bg-surface-container-low p-8",
          className,
        )}
      >
        <span className="heading-editorial text-display-lg text-secondary">
          {value}
        </span>
        <span className="text-h4 text-on-surface">{label}</span>
        {description ? (
          <p className="mt-1 text-body-sm text-on-surface-variant">
            {description}
          </p>
        ) : null}
      </div>
    );
  },
);
StatCard.displayName = "StatCard";

export { StatCard };
