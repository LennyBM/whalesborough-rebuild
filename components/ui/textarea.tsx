"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

/**
 * Textarea — inherits Input styling, vertical resize only.
 * Min-height 120px, max-height 320px per spec.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        aria-invalid={error || undefined}
        className={cn(
          "block w-full bg-transparent",
          "px-0 py-3",
          "font-body text-base text-on-surface placeholder:text-on-surface-muted",
          "border-0 border-b-2 rounded-none resize-y",
          "min-h-[120px] max-h-[320px]",
          error ? "border-error" : "border-on-surface-variant/30",
          "focus:outline-none focus:ring-0",
          error ? "focus:border-error" : "focus:border-primary",
          "transition-colors duration-fast ease-out-luxury",
          "disabled:text-on-surface-disabled disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
