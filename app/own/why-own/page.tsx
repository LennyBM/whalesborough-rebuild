import type { Metadata } from "next";
import Link from "next/link";

import { Button, LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Why Own at Whalesborough | Lodge Ownership",
  description:
    "Lifestyle benefits, estate access, guaranteed rental income and a 500-acre Cornish estate. What ownership looks like across a year.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">Lodge Ownership</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Why people choose to own{" "}
            <span className="italic">here</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Not an investment pitch. Not a holiday let scheme. Ownership at
            Whalesborough is a lifestyle decision — a place on the Cornish coast
            that belongs to you, earns when you are away, and comes with five
            hundred acres of estate at your door.
          </p>
        </div>
      </section>

      {/* Lifestyle Benefits */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">The lifestyle</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            What a year of ownership looks like
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
            <Benefit
              title="Six weeks of personal use"
              text="Use your lodge whenever you like — up to six weeks per year. Peak weeks, off-season midweek breaks, or a month-long summer stay."
            />
            <Benefit
              title="Income the rest of the year"
              text="When you are not in residence, your lodge enters our managed rental programme. Eight percent guaranteed for three years, paid quarterly."
            />
            <Benefit
              title="Full estate access"
              text="The W Club Spa, The Weir Restaurant, six lakes, ancient woodland and the South West Coast Path. Preferential rates and priority booking."
            />
            <Benefit
              title="Hands-off management"
              text="We handle everything — bookings, changeovers, maintenance, insurance, marketing. You receive quarterly income without lifting a finger."
            />
            <Benefit
              title="A Cornish address"
              text="Minutes from Widemouth Bay and Bude. The independent shops, surf breaks and clifftop walks of North Cornwall on your doorstep."
            />
            <Benefit
              title="A long-term asset"
              text="125-year licence. BS3632 residential specification. An asset that can be passed on, resold or enjoyed for generations."
            />
          </div>
        </div>
      </section>

      {/* Estate Access */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Estate amenities</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            Everything the estate offers is yours
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Amenity title="The W Club Spa" text="Indoor pool, thermal suite, treatment rooms and gym. Preferential owner rates." />
            <Amenity title="The Weir Restaurant" text="Estate-reared produce, open fires and priority reservations for owners." />
            <Amenity title="Six lakes" text="Fishing, paddleboarding, kayaking and wild swimming across the estate." />
            <Amenity title="Woodland & trails" text="Ancient oak woodland with walking trails that connect to the coast path." />
            <Amenity title="Dog-friendly estate" text="Five hundred acres of private land. No leads required on most estate areas." />
            <Amenity title="Concierge service" text="Restaurant bookings, spa appointments, activity coordination — handled for you." />
          </div>
        </div>
      </section>

      {/* Cornwall Location */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow text-on-surface-muted">Location</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                North Cornwall, near Bude
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant max-w-lg">
                The estate sits above Widemouth Bay on the North Cornwall coast.
                Bude is five minutes by car. The A39 connects to the M5 and
                Exeter in under an hour. London Paddington via rail in four hours.
              </p>
              <ul className="mt-8 space-y-3">
                <li className="text-body text-on-surface-variant">Widemouth Bay — 3 minutes</li>
                <li className="text-body text-on-surface-variant">Bude — 5 minutes</li>
                <li className="text-body text-on-surface-variant">Exeter — 55 minutes</li>
                <li className="text-body text-on-surface-variant">Bristol — 2 hours</li>
                <li className="text-body text-on-surface-variant">London — 4 hours (road or rail)</li>
              </ul>
            </div>
            <div className="aspect-[4/3] bg-surface-container-high relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-secondary/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display text-h2 italic text-secondary-fg/30">
                  Map
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Income Summary */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow text-on-surface-muted">Rental income</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                A return that works while you rest
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant max-w-lg">
                Eight percent guaranteed for three years. Quarterly payments into
                your account. Up to one hundred and twenty-six thousand pounds
                returned over the initial term on our highest-value lodges.
              </p>
              <div className="mt-8">
                <LinkArrow href="/own/rental-income">
                  Income details and projections
                </LinkArrow>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <StatBlock label="Guaranteed return" value="8%" />
              <StatBlock label="Over 3 years" value="Up to £126k" />
              <StatBlock label="Payment" value="Quarterly" />
              <StatBlock label="Your use" value="6 weeks / year" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-24 text-center">
          <h2 className="heading-editorial text-h1 text-primary-fg">
            See it for yourself
          </h2>
          <p className="mt-4 text-body-lg text-primary-fg/80 max-w-xl mx-auto">
            The best way to understand what ownership means here is to visit.
            Walk the estate, tour a show lodge, meet the team.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/own/viewing/book">
              <Button variant="secondary" size="lg" className="border-primary-fg text-primary-fg hover:bg-primary-fg hover:text-primary">
                Book a Viewing
              </Button>
            </Link>
            <Link href="/own">
              <Button variant="ghost" size="lg" className="text-primary-fg hover:bg-primary-fg/10">
                View Collections
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Benefit({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h3 className="text-h3 font-display text-on-surface">{title}</h3>
      <p className="mt-3 text-body text-on-surface-variant">{text}</p>
    </div>
  );
}

function Amenity({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h3 className="text-h3 font-display text-on-surface">{title}</h3>
      <p className="mt-2 text-body-sm text-on-surface-variant">{text}</p>
    </div>
  );
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface-container-low p-6">
      <p className="text-display-md font-display text-primary">{value}</p>
      <p className="mt-2 eyebrow text-on-surface-muted">{label}</p>
    </div>
  );
}
