"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Button — the workhorse CTA.
 *
 * Brand rules:
 *  - 0px radius (sharp editorial corners)
 *  - Cognac primary is reserved for booking CTAs only
 *  - Minimum 44px touch target (WCAG 2.2 SC 2.5.8)
 *  - No scale transforms, no decorative shadows
 *  - Uppercase button token with 0.12em letter-spacing
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-body font-medium uppercase",
    "transition-colors duration-fast ease-out-luxury",
    "focus-visible:outline-none focus-visible:shadow-focus",
    "disabled:cursor-not-allowed disabled:pointer-events-none",
    "select-none whitespace-nowrap",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-fg",
          "hover:bg-primary-hover active:bg-primary-pressed",
          "disabled:bg-primary-disabled",
        ],
        secondary: [
          "bg-transparent text-secondary",
          "border-2 border-secondary",
          "hover:bg-secondary hover:text-secondary-fg",
          "active:bg-secondary-pressed",
          "disabled:opacity-50",
        ],
        tertiary: [
          "bg-transparent text-secondary",
          "border border-outline-variant",
          "hover:bg-surface-container-low",
          "disabled:opacity-50",
        ],
        ghost: [
          "bg-transparent text-on-surface",
          "hover:bg-surface-container-low",
          "disabled:opacity-50",
        ],
        link: [
          "bg-transparent text-secondary p-0 h-auto",
          "normal-case tracking-normal",
          "hover:text-primary",
          "disabled:opacity-50",
        ],
      },
      size: {
        sm: "h-11 px-4 text-button",
        md: "h-12 px-8 text-button",
        lg: "h-14 px-10 text-button",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

// Letter-spacing utility comes via the tailwind text-button token's tracking,
// but we add a literal class for clarity.

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      iconLeft,
      iconRight,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <>
            <span className="sr-only">Loading</span>
            <Spinner size={size === "lg" ? 18 : 14} />
            <span aria-hidden="true">{children}</span>
          </>
        ) : (
          <>
            {iconLeft ? <span className="shrink-0">{iconLeft}</span> : null}
            {children}
            {iconRight ? <span className="shrink-0">{iconRight}</span> : null}
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

/**
 * LinkArrow — inline text link with animated arrow.
 * Per F25 brand book: arrow nudges right 4px on hover; underline slides in.
 */
const LinkArrow = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode }
>(({ className, children, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "group inline-flex items-center gap-2",
      "font-body text-button uppercase text-secondary",
      "transition-colors duration-fast ease-out-luxury",
      "hover:text-primary focus-visible:text-primary",
      "focus-visible:outline-none focus-visible:shadow-focus",
      "relative",
      className,
    )}
    {...props}
  >
    <span
      className={cn(
        "relative",
        "after:absolute after:left-0 after:bottom-[-2px] after:h-[1px] after:bg-current",
        "after:w-0 group-hover:after:w-full group-focus-visible:after:w-full",
        "after:transition-[width] after:duration-base after:ease-out-luxury",
      )}
    >
      {children}
    </span>
    <ArrowRight
      className="h-4 w-4 transition-transform duration-fast ease-out-luxury group-hover:translate-x-1 group-focus-visible:translate-x-1"
      aria-hidden="true"
    />
  </a>
));
LinkArrow.displayName = "LinkArrow";

/** Internal spinner used by Button loading state. */
function Spinner({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin"
      aria-hidden="true"
    >
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export { Button, LinkArrow, buttonVariants };
