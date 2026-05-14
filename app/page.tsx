import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

/**
 * Home — editorial homepage with asymmetric entry-point grid.
 * Wave 2 will replace placeholder imagery + add hero video.
 */
export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">A working estate · Bude, Cornwall</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            A working estate on the{" "}
            <span className="italic">Cornish coast</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Four hundred and fifty acres of pasture, woodland and clifftop above
            Widemouth Bay. Holiday cottages, the W Club Spa, The Weir Restaurant
            and a small number of lodges to call your own.
          </p>
        </div>
      </section>

      {/* Four entry points — asymmetric 2x2 */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-hero px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-12">
            {/* Stay — large, top-left */}
            <EntryPoint
              href="/stay"
              eyebrow="01 — Accommodation"
              title="Stay"
              description="Twenty-seven cottages, twenty-two Arvor Suites and a pair of spa lodges. Slow returns, sea air, dogs welcome on most properties."
              className="lg:col-span-7 lg:row-span-2"
              imageRatio="aspect-[4/5]"
            />

            {/* Spa — top-right, offset */}
            <EntryPoint
              href="/spa"
              eyebrow="02 — Wellness"
              title="The W Club"
              description="A spa shaped by the estate. Rituals drawn from Cornish botanicals, an indoor pool, and a gym overlooking the lakes."
              className="lg:col-span-5 lg:col-start-8 lg:mt-24"
              imageRatio="aspect-[3/2]"
            />

            {/* Dine — bottom-right */}
            <EntryPoint
              href="/dine"
              eyebrow="03 — Restaurant"
              title="The Weir"
              description="Cornish suppliers, open fires, an estate that grows much of what arrives on the plate. Breakfast through to long lunches."
              className="lg:col-span-5 lg:col-start-8"
              imageRatio="aspect-[3/2]"
            />

            {/* Own — full-width bottom */}
            <EntryPoint
              href="/own"
              eyebrow="04 — Ownership"
              title="Own a lodge"
              description="A small number of architect-designed lodges across three collections. Lifestyle purchases with rental income potential — not investments."
              className="lg:col-span-12 lg:mt-12"
              imageRatio="aspect-[16/7]"
              variant="wide"
            />
          </div>
        </div>
      </section>

      {/* Award strip */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-16 lg:px-12">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-on-surface-muted">
            <p className="eyebrow">5★ Gold VisitEngland</p>
            <p className="eyebrow">NPS 83.3 — Cornwall #1</p>
            <p className="eyebrow">Feefo 4.5 / 5</p>
            <p className="eyebrow">450 acres · 30+ units</p>
          </div>
        </div>
      </section>
    </>
  );
}

function EntryPoint({
  href,
  eyebrow,
  title,
  description,
  className,
  imageRatio,
  variant = "default",
}: {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  imageRatio: string;
  variant?: "default" | "wide";
}) {
  return (
    <Link
      href={href}
      className={`group block ${className ?? ""}`}
      aria-label={`Explore ${title}`}
    >
      {/* Image placeholder — Wave 2 swaps for next/image with real assets */}
      <div
        className={`${imageRatio} bg-surface-container-high relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-display text-display-sm italic text-secondary-fg/40">
            {title}
          </p>
        </div>
      </div>
      <div className={variant === "wide" ? "mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12" : "mt-8"}>
        <div className={variant === "wide" ? "lg:col-span-6" : ""}>
          <p className="eyebrow text-on-surface-muted">{eyebrow}</p>
          <h2 className="heading-editorial mt-3 text-h1 text-on-surface group-hover:text-primary transition-colors duration-fast ease-out-luxury">
            {title}
          </h2>
        </div>
        <div className={variant === "wide" ? "lg:col-span-6 lg:pt-8" : ""}>
          <p className="mt-4 max-w-md text-body text-on-surface-variant">
            {description}
          </p>
          <div className="mt-6">
            <LinkArrow href={href}>Explore {title}</LinkArrow>
          </div>
        </div>
      </div>
    </Link>
  );
}
