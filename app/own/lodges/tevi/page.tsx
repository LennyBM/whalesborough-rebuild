import type { Metadata } from "next";
import Link from "next/link";

import { Button, LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Tevi Luxury Lodges | Own at Whalesborough",
  description:
    "Ultra-premium waterside lodges at £749,950. Three bedrooms, panoramic lake views, vaulted ceilings and private decks on a 500-acre Cornish estate.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">
            The Tevi Collection
          </p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            The pinnacle of{" "}
            <span className="italic">estate living</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Tevi — Cornish for &lsquo;grow&rsquo;. Our ultra-premium waterside
            lodges command panoramic views across the estate lakes. Vaulted
            ceilings, floor-to-ceiling glazing and private decking that stretches
            to the water&rsquo;s edge.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/own/viewing/book">
              <Button variant="primary" size="lg">
                Book a Viewing
              </Button>
            </Link>
            <LinkArrow href="/own/brochure">Request Brochure</LinkArrow>
          </div>
        </div>
      </section>

      {/* Price & Key Facts */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-on-surface-muted">Investment</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                £749,950
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant max-w-lg">
                A 125-year licence on a fully furnished, BS3632 residential-
                specification lodge. Turnkey delivery with every detail
                considered — from Cornish slate surrounds to integrated smart-home
                systems.
              </p>
              <div className="mt-8">
                <LinkArrow href="/own/costs">Running costs breakdown</LinkArrow>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Fact label="Bedrooms" value="3" />
              <Fact label="Licence" value="125 years" />
              <Fact label="Specification" value="BS3632" />
              <Fact label="Energy" value="Fully electric" />
              <Fact label="Personal use" value="6 weeks / year" />
              <Fact label="Rental return" value="8% guaranteed" />
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle Imagery Placeholder */}
      <section className="bg-background">
        <div className="mx-auto max-w-hero px-6 py-20 lg:px-12 lg:py-32">
          <div className="aspect-[21/9] bg-surface-container-high relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-secondary/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-display text-display-sm italic text-secondary-fg/30">
                Tevi lakeside
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specification */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Specification</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            Considered in every detail
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <SpecItem title="Vaulted ceilings" text="Double-height living space with exposed timber trusses and clerestory windows." />
            <SpecItem title="Floor-to-ceiling glazing" text="Panoramic lake views from every principal room. Sliding doors onto the private deck." />
            <SpecItem title="Cornish slate kitchen" text="Bespoke cabinetry, integrated appliances and local stone work surfaces." />
            <SpecItem title="Underfloor heating" text="Fully electric underfloor heating throughout with zoned smart controls." />
            <SpecItem title="Private deck" text="Wraparound composite decking with direct access to the lakeside." />
            <SpecItem title="Smart home" text="Integrated lighting, heating and security controls via a single app." />
          </div>
        </div>
      </section>

      {/* Rental Income */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow text-on-surface-muted">Rental Income</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Up to £126,000 over three years
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant max-w-lg">
                Eight percent guaranteed return for the first three years, paid
                quarterly. Your lodge enters our managed rental programme whenever
                you are not in residence — professionally maintained, fully
                insured, income deposited directly to you.
              </p>
              <div className="mt-8">
                <LinkArrow href="/own/rental-income">
                  Full income details
                </LinkArrow>
              </div>
            </div>
            <div className="bg-surface-container-low p-10">
              <p className="eyebrow text-on-surface-muted">Three-year projection</p>
              <p className="mt-4 text-display-lg font-display text-primary">
                £126,000
              </p>
              <p className="mt-2 text-body text-on-surface-variant">
                Based on 8% of £749,950 per annum over 36 months, gross of any applicable charges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-24 text-center">
          <h2 className="heading-editorial text-h1 text-primary-fg">
            Arrange a private viewing
          </h2>
          <p className="mt-4 text-body-lg text-primary-fg/80 max-w-xl mx-auto">
            Walk the Tevi show lodge with our ownership team. No obligation, no
            pressure — just the space to imagine a life here.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/own/viewing/book">
              <Button variant="secondary" size="lg" className="border-primary-fg text-primary-fg hover:bg-primary-fg hover:text-primary">
                Book a Viewing
              </Button>
            </Link>
            <Link href="tel:01288361941">
              <Button variant="ghost" size="lg" className="text-primary-fg hover:bg-primary-fg/10">
                Call 01288 361941
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background p-6">
      <p className="text-h2 font-display text-on-surface">{value}</p>
      <p className="mt-1 eyebrow text-on-surface-muted">{label}</p>
    </div>
  );
}

function SpecItem({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h3 className="text-h3 font-display text-on-surface">{title}</h3>
      <p className="mt-2 text-body-sm text-on-surface-variant">{text}</p>
    </div>
  );
}
