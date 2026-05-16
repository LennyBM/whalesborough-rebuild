import type { Metadata } from "next";
import Link from "next/link";

import { Button, LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Gwelva Luxury Villas | Own at Whalesborough",
  description:
    "Premium villas designed for families and entertaining. Generous footprints and open-plan living on a 500-acre Cornish estate.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">
            The Gwelva Collection
          </p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Space to gather,{" "}
            <span className="italic">room to breathe</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Gwelva — Cornish for &lsquo;view&rsquo;. Our premium villas are
            designed for families and long weekends with friends. Generous
            footprints, open-plan living, and direct access to the estate&rsquo;s
            lakes and woodland.
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

      {/* Key Facts */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-on-surface-muted">Investment</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Price on application
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant max-w-lg">
                The Gwelva collection represents our premium family-oriented
                tier. Larger footprints, additional bedrooms and entertaining
                spaces designed for house parties that linger past Sunday.
              </p>
              <div className="mt-8">
                <LinkArrow href="/own/costs">Running costs breakdown</LinkArrow>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Fact label="Licence" value="125 years" />
              <Fact label="Specification" value="BS3632" />
              <Fact label="Energy" value="Fully electric" />
              <Fact label="Personal use" value="6 weeks / year" />
              <Fact label="Rental return" value="8% guaranteed" />
              <Fact label="Payment" value="Quarterly" />
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Designed for living</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            Where weekends stretch into weeks
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <SpecItem title="Open-plan living" text="Generous kitchen-dining-living spaces that connect seamlessly to outdoor decking." />
            <SpecItem title="Multiple bedrooms" text="Configurations designed around families — room for grandparents, children and dogs." />
            <SpecItem title="Entertaining spaces" text="Indoor and outdoor zones for long suppers, games evenings and lazy mornings." />
            <SpecItem title="Estate access" text="Step outside and you are on the estate. Lakes, woodland, coastal paths." />
            <SpecItem title="Premium finishes" text="Engineered oak, natural stone, bespoke joinery and integrated smart systems." />
            <SpecItem title="Turnkey delivery" text="Fully furnished and equipped. Arrive with a suitcase and nothing else." />
          </div>
        </div>
      </section>

      {/* Rental */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow text-on-surface-muted">Rental Income</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Income when you are away
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant max-w-lg">
                Like all Whalesborough lodges, Gwelva villas enter our managed
                rental programme during unoccupied weeks. Eight percent
                guaranteed for three years, paid quarterly into your account.
              </p>
              <div className="mt-8">
                <LinkArrow href="/own/rental-income">
                  Full income details
                </LinkArrow>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <StatBlock label="Guaranteed return" value="8%" />
              <StatBlock label="Initial term" value="3 years" />
              <StatBlock label="Payment" value="Quarterly" />
              <StatBlock label="Personal use" value="6 weeks" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-24 text-center">
          <h2 className="heading-editorial text-h1 text-primary-fg">
            Experience the Gwelva collection
          </h2>
          <p className="mt-4 text-body-lg text-primary-fg/80 max-w-xl mx-auto">
            Arrange a private viewing to walk the plots, explore the estate and
            discuss your requirements with our ownership coordinator.
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

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background p-6">
      <p className="text-display-md font-display text-primary">{value}</p>
      <p className="mt-2 eyebrow text-on-surface-muted">{label}</p>
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
