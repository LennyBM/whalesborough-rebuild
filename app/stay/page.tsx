import type { Metadata } from "next";
import Image from "next/image";

import { LinkArrow } from "@/components/ui/button";
import AccommodationGrid from "./accommodation-grid";

export const metadata: Metadata = {
  title: "Stay at Whalesborough | Holiday Cottages & Spa Lodges, Bude Cornwall",
  description:
    "Twenty-seven 5★ Gold cottages, twenty-two Arvor Suites and spa lodges with private hot tubs. Dog-friendly accommodation on 500 acres above Widemouth Bay.",
  openGraph: {
    title: "Stay at Whalesborough | Luxury Cornish Accommodation",
    description:
      "Heritage cottages, contemporary suites and spa lodges on 500 acres above Widemouth Bay.",
    images: [{ url: "/images/hero/cottages-hero.webp", width: 1920, height: 1080 }],
  },
};

export default function StayPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative bg-background overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/cottages-hero.webp"
            alt="Whalesborough heritage cottages nestled in the Cornish landscape"
            width={1920}
            height={1080}
            priority
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        </div>
        <div className="relative mx-auto max-w-content px-6 pb-24 pt-48 lg:px-12 lg:pb-36 lg:pt-64">
          <p className="eyebrow text-on-surface-muted">
            Accommodation · Bude, Cornwall
          </p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Where you sleep{" "}
            <span className="italic">shapes how you wake</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Twenty-seven heritage cottages, twenty-two contemporary suites and a
            handful of spa lodges — each set within five hundred acres of
            Cornish pasture, woodland and clifftop. Dogs welcome, hot tubs
            optional, sea air guaranteed.
          </p>
          <div className="mt-10">
            <LinkArrow href="/stay/booking">Check availability</LinkArrow>
          </div>
        </div>
      </section>

      {/* ─── Accommodation Categories (client component for animations) ─── */}
      <AccommodationGrid />

      {/* ─── Value Propositions ─── */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-on-surface-muted">Why guests return</p>
              <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
                The details that define a{" "}
                <span className="italic">Whalesborough</span> stay
              </h2>
              <p className="mt-6 max-w-lg text-body text-on-surface-variant">
                Every property carries VisitEngland 5-Star Gold accreditation —
                the highest quality mark in UK self-catering. Beyond the rating,
                it is the considered touches that guests remember: the welcome
                hamper of estate produce, the scent of Cornish botanicals, the
                absence of noise.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <ValueProp
                label="Dog-Friendly"
                detail="All 27 cottages welcome dogs. Enclosed gardens, luxury bedding, pooch welcome packs and a dog shower station on the estate."
              />
              <ValueProp
                label="5★ Gold"
                detail="VisitEngland's highest accreditation. Awarded for exceptional quality, attention to detail and guest experience year after year."
              />
              <ValueProp
                label="Private Hot Tubs"
                detail="Seven cottages and all spa lodges include private hot tubs — stargazing above Widemouth Bay, glass in hand."
              />
              <ValueProp
                label="500 Acres"
                detail="Lakes, woodland trails, clifftop paths and working farmland. Space to breathe without leaving the estate."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Editorial Feature ─── */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/cottages/whalesborough-cottage.webp"
                  alt="Whalesborough Cottage surrounded by estate gardens"
                  width={640}
                  height={854}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="eyebrow text-on-surface-muted">The estate</p>
              <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
                Five hundred acres of{" "}
                <span className="italic">quiet purpose</span>
              </h2>
              <p className="mt-6 text-body text-on-surface-variant">
                Whalesborough is a working estate above Widemouth Bay — not a
                resort in the conventional sense. Cattle graze the upper fields,
                the farm supplies The Weir Restaurant, and the coastal path runs
                through the grounds to the beach below. Guests are part of this
                rhythm, not separate from it.
              </p>
              <p className="mt-4 text-body text-on-surface-variant">
                Arrivals are unhurried. Most guests choose Friday or Monday,
                staying for a full week. The seven-night rhythm suits the pace
                here — enough time to discover the hidden lake, walk the cliff
                circuit, book a spa day, and still have mornings with nothing
                planned.
              </p>
              <div className="mt-8">
                <LinkArrow href="/estate">Explore the estate</LinkArrow>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust Signals ─── */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-16 lg:px-12">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-on-surface-muted">
            <p className="eyebrow">5★ Gold VisitEngland</p>
            <p className="eyebrow">NPS 83.3 — Cornwall #1</p>
            <p className="eyebrow">Feefo 4.5 / 5</p>
            <p className="eyebrow">All cottages dog-friendly</p>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32 text-center">
          <p className="eyebrow text-on-surface-muted">Ready to book</p>
          <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
            Find your dates
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-body text-on-surface-variant">
            Browse available cottages, suites and lodges. Friday and Monday
            arrivals, with seven-night stays our most popular rhythm.
          </p>
          <div className="mt-10 flex justify-center">
            <LinkArrow href="/stay/booking">Check availability</LinkArrow>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Server Sub-components ─── */

function ValueProp({ label, detail }: { label: string; detail: string }) {
  return (
    <div>
      <h3 className="heading-editorial text-h3 text-on-surface">{label}</h3>
      <p className="mt-2 text-body-sm text-on-surface-variant">{detail}</p>
    </div>
  );
}
