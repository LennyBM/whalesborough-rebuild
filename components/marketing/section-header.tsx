import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * SectionHeader — reusable header for every major marketing section.
 * Renders optional eyebrow, editorial title, and description with configurable alignment.
 */
const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ eyebrow, title, description, align = "left", className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "max-w-3xl",
          align === "center" && "mx-auto text-center",
          className,
        )}
      >
        {eyebrow ? (
          <p className="eyebrow text-on-surface-muted">{eyebrow}</p>
        ) : null}
        <h2
          className={cn(
            "heading-editorial text-display-md md:text-display-lg text-on-surface",
            eyebrow && "mt-4",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            {description}
          </p>
        ) : null}
      </div>
    );
  },
);
SectionHeader.displayName = "SectionHeader";

export { SectionHeader };
