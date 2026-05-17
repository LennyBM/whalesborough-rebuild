"use client";

import * as React from "react";
import Link from "next/link";

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
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-md rounded-2xl bg-surface-container-low p-8 shadow-lg">
        {/* Whalesborough logo */}
        <div className="mb-8 flex justify-center">
          <img
            src="/images/logo/whalesborough-mark.svg"
            alt="Whalesborough"
            className="h-10 w-10"
          />
        </div>

        <h1 className="font-display text-2xl text-on-surface text-center">
          Something went wrong
        </h1>

        <p className="mt-3 text-center text-body-md text-on-surface-variant">
          Our apologies — something didn&apos;t behave as expected. We&apos;ve
          been notified and are looking into it.
        </p>

        {/* Error details in subtle code block */}
        {error.message && (
          <div className="mt-6 rounded-lg bg-surface-container p-3">
            <p className="font-mono text-xs text-on-surface-muted break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="mt-1 font-mono text-xs text-on-surface-muted/60">
                ref: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3">
          <Button onClick={reset} variant="secondary" className="w-full">
            Try again
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
