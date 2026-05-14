import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-content px-6 py-32 lg:px-12 lg:py-48">
      <p className="eyebrow text-on-surface-muted">404</p>
      <h1 className="heading-editorial mt-4 text-display-lg text-on-surface">
        Lost on the estate.
      </h1>
      <p className="mt-6 max-w-xl text-body-lg text-on-surface-variant">
        The page you're looking for doesn't exist, or has been moved. Head back
        and we'll point you the right way.
      </p>
      <div className="mt-12 flex flex-wrap gap-4">
        <Button asChild variant="primary">
          <Link href="/">Return home</Link>
        </Button>
        <Button asChild variant="tertiary">
          <Link href="/contact">Contact us</Link>
        </Button>
      </div>
    </div>
  );
}
