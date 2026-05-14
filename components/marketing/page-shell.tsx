import * as React from "react";

/**
 * PageShell — editorial page header used by every Wave-1 placeholder route.
 * Wave 2 will replace these with content-rich page templates.
 */
export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <article className="bg-background">
      <header className="mx-auto max-w-content px-6 pb-12 pt-24 lg:px-12 lg:pb-20 lg:pt-32">
        {eyebrow ? (
          <p className="eyebrow text-on-surface-muted">{eyebrow}</p>
        ) : null}
        <h1 className="heading-editorial mt-4 text-display-md md:text-display-lg max-w-3xl text-on-surface">
          {title}
        </h1>
        {description ? (
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            {description}
          </p>
        ) : null}
      </header>
      {children ? (
        <section className="mx-auto max-w-content px-6 pb-32 lg:px-12">
          {children}
        </section>
      ) : (
        <div className="pb-32" />
      )}
    </article>
  );
}
