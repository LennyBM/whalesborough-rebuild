"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Allow multiple items open simultaneously. Defaults to false. */
  allowMultiple?: boolean;
  className?: string;
}

/**
 * Accordion — animated FAQ component with chevron rotation and proper ARIA.
 * Client component using controlled state for open/close animation.
 */
function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const [openIds, setOpenIds] = React.useState<Set<string>>(new Set());

  const toggle = React.useCallback(
    (id: string) => {
      setOpenIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (!allowMultiple) next.clear();
          next.add(id);
        }
        return next;
      });
    },
    [allowMultiple],
  );

  return (
    <div className={cn("divide-y divide-outline-variant", className)}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div key={item.id} className="py-0">
            <button
              type="button"
              id={`accordion-trigger-${item.id}`}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              onClick={() => toggle(item.id)}
              className={cn(
                "flex w-full items-center justify-between gap-4 py-6 text-left",
                "text-h4 text-on-surface",
                "transition-colors duration-fast ease-out-luxury",
                "hover:text-secondary focus-visible:outline-none focus-visible:shadow-focus",
              )}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-on-surface-muted transition-transform duration-base ease-out-luxury",
                  isOpen && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>
            <div
              id={`accordion-panel-${item.id}`}
              role="region"
              aria-labelledby={`accordion-trigger-${item.id}`}
              className={cn(
                "grid transition-[grid-template-rows] duration-base ease-out-luxury",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="pb-6 text-body text-on-surface-variant">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { Accordion };
