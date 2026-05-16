import * as React from "react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumb — navigation breadcrumbs with schema.org BreadcrumbList JSON-LD.
 * The last item is rendered as the current page (no link).
 */
const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, className }, ref) => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.label,
        ...(item.href ? { item: item.href } : {}),
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <nav
          ref={ref}
          aria-label="Breadcrumb"
          className={cn("py-4", className)}
        >
          <ol className="flex flex-wrap items-center gap-1 text-body-sm text-on-surface-muted">
            {items.map((item, i) => {
              const isLast = i === items.length - 1;
              return (
                <li key={i} className="flex items-center gap-1">
                  {i > 0 ? (
                    <span aria-hidden="true" className="mx-1 select-none">
                      /
                    </span>
                  ) : null}
                  {isLast || !item.href ? (
                    <span aria-current={isLast ? "page" : undefined}>
                      {item.label}
                    </span>
                  ) : (
                    <a
                      href={item.href}
                      className="transition-colors duration-fast ease-out-luxury hover:text-secondary"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </>
    );
  },
);
Breadcrumb.displayName = "Breadcrumb";

export { Breadcrumb };
