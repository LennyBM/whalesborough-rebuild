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
    // Wave 2: Sentry.captureException(error)
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
        Our apologies — something didn&apos;t behave as expected. We&apos;ve
        been notified and are looking into it. Please try again, or return home
        and start fresh.
      </p>
      {error.digest ? (
        <p className="mt-2 text-caption text-on-surface-muted">
          Reference: {error.digest}
        </p>
      ) : null}
      <div className="mt-12 flex flex-wrap gap-4">
        <Button onClick={reset} variant="secondary">
          Try again
        </Button>
        <Button asChild variant="ghost">
          <a href="/">Return home</a>
        </Button>
      </div>
    </div>
  );
}
