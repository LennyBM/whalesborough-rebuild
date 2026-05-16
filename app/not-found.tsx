import Link from "next/link";

import { Button, LinkArrow } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-content px-6 py-32 lg:px-12 lg:py-48">
      <p className="eyebrow text-on-surface-muted">404</p>
      <h1 className="heading-editorial mt-4 text-display-xl text-on-surface">
        Lost on the estate.
      </h1>
      <p className="mt-6 max-w-xl text-body-lg text-on-surface-variant">
        The page you&apos;re looking for may have wandered off — or perhaps it
        never existed at all. Let us guide you back to somewhere beautiful.
      </p>

      {/* Key section links */}
      <nav aria-label="Explore the estate" className="mt-12">
        <p className="text-caption uppercase tracking-wider text-on-surface-muted mb-5">
          Explore
        </p>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          <Link href="/stay">
            <LinkArrow>Stay</LinkArrow>
          </Link>
          <Link href="/spa">
            <LinkArrow>Spa</LinkArrow>
          </Link>
          <Link href="/dine">
            <LinkArrow>Dine</LinkArrow>
          </Link>
          <Link href="/own">
            <LinkArrow>Own</LinkArrow>
          </Link>
        </div>
      </nav>

      {/* Divider */}
      <div className="mt-16 mb-8 w-16 h-px bg-outline-variant" />

      {/* Home CTA */}
      <div className="flex flex-wrap gap-4">
        <Button asChild variant="secondary">
          <Link href="/">Return to homepage</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/contact">Get in touch</Link>
        </Button>
      </div>
    </div>
  );
}
