import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface CtaBandProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonHref?: string;
  /** Visual variant. "sage" uses secondary bg with white text. */
  variant?: "neutral" | "sage";
  className?: string;
}

/**
 * CtaBand — full-width call-to-action band.
 * Two variants: neutral (surface-container-low) and sage (secondary bg, white text).
 */
const CtaBand = React.forwardRef<HTMLDivElement, CtaBandProps>(
  (
    {
      title,
      description,
      buttonText,
      buttonHref,
      variant = "neutral",
      className,
    },
    ref,
  ) => {
    const isSage = variant === "sage";

    return (
      <section
        ref={ref}
        className={cn(
          "w-full py-20 lg:py-28",
          isSage ? "bg-secondary" : "bg-surface-container-low",
          className,
        )}
      >
        <div className="mx-auto flex max-w-content flex-col items-center gap-8 px-6 text-center lg:px-12">
          <h2
            className={cn(
              "heading-editorial text-display-md md:text-display-lg max-w-2xl",
              isSage ? "text-white" : "text-on-surface",
            )}
          >
            {title}
          </h2>
          {description ? (
            <p
              className={cn(
                "max-w-xl text-body-lg",
                isSage ? "text-white/80" : "text-on-surface-variant",
              )}
            >
              {description}
            </p>
          ) : null}
          <Button
            variant={isSage ? "secondary" : "primary"}
            size="lg"
            asChild={!!buttonHref}
            className={cn(isSage && "border-white text-white hover:bg-white hover:text-secondary")}
          >
            {buttonHref ? <a href={buttonHref}>{buttonText}</a> : buttonText}
          </Button>
        </div>
      </section>
    );
  },
);
CtaBand.displayName = "CtaBand";

export { CtaBand };
