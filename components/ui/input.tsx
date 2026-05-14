"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Input — bottom-border-only text field.
 *
 * Brand rules:
 *  - Bottom border only (no top/side borders, no radius)
 *  - 16px minimum font on mobile to prevent iOS zoom-on-focus
 *  - Focus transitions border to cognac over 200ms
 *  - Error uses dark terracotta, never bright red
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        aria-invalid={error || undefined}
        className={cn(
          "block w-full bg-transparent",
          "px-0 py-3",
          "font-body text-base text-on-surface placeholder:text-on-surface-muted",
          "border-0 border-b-2 rounded-none",
          error ? "border-error" : "border-on-surface-variant/30",
          "focus:outline-none focus:ring-0",
          error ? "focus:border-error" : "focus:border-primary",
          "transition-colors duration-fast ease-out-luxury",
          "disabled:text-on-surface-disabled disabled:cursor-not-allowed",
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
