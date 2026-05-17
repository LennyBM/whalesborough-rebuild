import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center bg-background px-6 text-center">
      <Image
        src="/images/logo/whalesborough-logo.png"
        alt="Whalesborough Farm Resort & Spa"
        width={180}
        height={60}
        className="mb-10"
      />

      <h1 className="font-display text-4xl italic text-on-surface md:text-5xl">
        Page not found
      </h1>

      <p className="mt-4 max-w-md text-lg text-on-surface/70">
        This page doesn&apos;t exist or has moved.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-2xl bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        >
          Go Home
        </Link>

        <Link
          href="/stay"
          className="inline-flex items-center justify-center rounded-2xl border border-primary/30 px-8 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
        >
          Browse Properties
        </Link>
      </div>
    </main>
  );
}
