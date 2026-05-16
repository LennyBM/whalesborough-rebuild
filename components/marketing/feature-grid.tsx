import * as React from "react";
import { cn } from "@/lib/utils";

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface FeatureGridProps {
  features: Feature[];
  /** Number of columns at large breakpoint. Defaults to 3. */
  columns?: 2 | 3;
  className?: string;
}

/**
 * FeatureGrid — responsive grid of features with icon, title, and description.
 * No borders — uses tonal spacing and typography hierarchy.
 */
const FeatureGrid = React.forwardRef<HTMLDivElement, FeatureGridProps>(
  ({ features, columns = 3, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid gap-12 sm:grid-cols-2",
          columns === 3 && "lg:grid-cols-3",
          columns === 2 && "lg:grid-cols-2",
          className,
        )}
      >
        {features.map((feature, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="flex h-12 w-12 items-center justify-center bg-surface-container-low text-secondary">
              {feature.icon}
            </div>
            <h3 className="text-h4 text-on-surface">{feature.title}</h3>
            <p className="text-body text-on-surface-variant">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    );
  },
);
FeatureGrid.displayName = "FeatureGrid";

export { FeatureGrid };
