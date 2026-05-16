import type { Metadata } from "next";
import Link from "next/link";

import { Button, LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Bespoke Lodges | Own at Whalesborough",
  description:
    "Design your own lodge from £399,000. Choose your plot, specify your finishes, work with our architects to create something entirely yours.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">Bespoke Lodges</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Designed around{" "}
            <span className="italic">your life</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Start with a plot on the estate. Work with our design team to create
            a lodge that is entirely yours — from the floor plan to the door
            handles. The only collection where no two lodges are alike.
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

      {/* Pricing */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-on-surface-muted">Investment</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                From £399,000
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant max-w-lg">
                The starting price includes your plot, the base lodge structure
                and our standard specification. Upgrades, extensions and premium
                finishes are priced individually — so you control the budget at
                every stage.
              </p>
              <div className="mt-8">
                <LinkArrow href="/own/costs">Running costs breakdown</LinkArrow>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Fact label="Starting from" value="£399k" />
              <Fact label="Licence" value="125 years" />
              <Fact label="Specification" value="BS3632" />
              <Fact label="Energy" value="Fully electric" />
              <Fact label="Personal use" value="6 weeks / year" />
              <Fact label="Rental return" value="8% guaranteed" />
            </div>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Your journey</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            From conversation to keys
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <Step number="01" title="Choose your plot" text="Walk the estate with our team. Select a position that suits your outlook, access and privacy preferences." />
            <Step number="02" title="Design together" text="Work with our architects to refine floor plans, elevations and materials. Your lodge, your decisions." />
            <Step number="03" title="Specify finishes" text="Select kitchens, bathrooms, flooring, lighting and smart systems from our curated palette." />
            <Step number="04" title="Build & deliver" text="Our construction team builds on-site. Typical delivery nine to twelve months from reservation." />
          </div>
          <div className="mt-12">
            <LinkArrow href="/own/process">Full purchase process</LinkArrow>
          </div>
        </div>
      </section>

      {/* What You Can Customise */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Customisation</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            Everything is on the table
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <SpecItem title="Floor plan" text="Adjust room sizes, add a study, extend the living space or incorporate a boot room." />
            <SpecItem title="Bedrooms" text="Two, three or four bedrooms. En-suites where you want them." />
            <SpecItem title="Kitchen" text="Choose cabinetry, worktops, appliances and layout from our approved suppliers." />
            <SpecItem title="Bathrooms" text="Sanitaryware, tiles, underfloor heating and walk-in showers or freestanding baths." />
            <SpecItem title="External finishes" text="Cladding materials, roofline profiles and decking configurations." />
            <SpecItem title="Smart systems" text="Heating zones, lighting scenes, security cameras and EV charging integration." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-24 text-center">
          <h2 className="heading-editorial text-h1 text-primary-fg">
            Start the conversation
          </h2>
          <p className="mt-4 text-body-lg text-primary-fg/80 max-w-xl mx-auto">
            Every bespoke lodge begins with a viewing. Walk the available plots,
            discuss your vision and leave with a clear understanding of what is
            possible.
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

function Step({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div>
      <p className="text-display-md font-display text-primary">{number}</p>
      <h3 className="mt-3 text-h3 font-display text-on-surface">{title}</h3>
      <p className="mt-2 text-body-sm text-on-surface-variant">{text}</p>
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
