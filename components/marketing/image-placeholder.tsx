import * as React from "react";
import { cn } from "@/lib/utils";

export interface ImagePlaceholderProps {
  /** Tailwind aspect ratio class, e.g. "aspect-video", "aspect-[4/3]", "aspect-square". */
  aspectRatio?: string;
  /** Show a gradient overlay (for hero-style placements). */
  gradient?: boolean;
  /** Optional label text displayed in the center. */
  label?: string;
  className?: string;
}

/**
 * ImagePlaceholder — configurable placeholder for images not yet available.
 * Renders a tonal surface with optional gradient and label text.
 */
const ImagePlaceholder = React.forwardRef<HTMLDivElement, ImagePlaceholderProps>(
  ({ aspectRatio = "aspect-video", gradient = false, label, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden bg-surface-container-low",
          aspectRatio,
          className,
        )}
        role="img"
        aria-label={label || "Image placeholder"}
      >
        {gradient ? (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        ) : null}
        {label ? (
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              "text-caption uppercase tracking-wider",
              gradient ? "text-white/70" : "text-on-surface-muted",
            )}
            aria-hidden="true"
          >
            {label}
          </span>
        ) : null}
      </div>
    );
  },
);
ImagePlaceholder.displayName = "ImagePlaceholder";

export { ImagePlaceholder };
