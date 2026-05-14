"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Wave 2: Sentry.captureException(error) — wired via global error boundary
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="mx-auto max-w-content px-6 py-32 lg:px-12 lg:py-48">
      <p className="eyebrow text-on-surface-muted">Something went wrong</p>
      <h1 className="heading-editorial mt-4 text-display-lg text-on-surface">
        A moment of friction.
      </h1>
      <p className="mt-6 max-w-xl text-body-lg text-on-surface-variant">
        Our apologies — something didn't behave as expected. We've been
        notified. Try again, or get in touch and we'll sort it out for you.
      </p>
      {error.digest ? (
        <p className="mt-2 text-caption text-on-surface-muted">
          Reference: {error.digest}
        </p>
      ) : null}
      <div className="mt-12 flex flex-wrap gap-4">
        <Button onClick={reset} variant="primary">
          Try again
        </Button>
        <Button asChild variant="tertiary">
          <a href="/contact">Contact us</a>
        </Button>
      </div>
    </div>
  );
}
