import type { Metadata } from "next";
import Link from "next/link";

import { Button, LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Own a Lodge | Whalesborough Farm Resort & Spa",
  description:
    "A small number of architect-designed lodges across four collections on a 500-acre Cornish estate. Lifestyle ownership with guaranteed rental income.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">Lodge Ownership</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            A place to call your own on the{" "}
            <span className="italic">Cornish coast</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Four architect-designed collections across five hundred acres of
            pasture, woodland and clifftop. Not a timeshare. Not an investment
            scheme. A lifestyle purchase with guaranteed rental income.
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

      {/* Four Collections Grid */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-hero px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Four Collections</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            Find the lodge that fits your life
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
            <CollectionCard
              href="/own/lodges/tevi"
              title="Tevi Luxury Lodges"
              price="£749,950"
              description="Ultra-premium waterside lodges with panoramic lake views, vaulted ceilings and private decks. The pinnacle of estate living."
            />
            <CollectionCard
              href="/own/lodges/gwelva"
              title="Gwelva Luxury Villas"
              price="Price on application"
              description="Premium villas designed for families and entertaining. Generous footprints, open-plan living and direct estate access."
            />
            <CollectionCard
              href="/own/lodges/trelowen"
              title="Trelowen Exclusive Lodges"
              price="From £425,000"
              description="New-build lodges in three configurations. BS3632 residential specification, fully electric, ready for 2026 delivery."
            />
            <CollectionCard
              href="/own/lodges/bespoke"
              title="Bespoke Lodges"
              price="From £399,000"
              description="Work with our design team to create something entirely yours. Choose your plot, specify your finishes, own the result."
            />
          </div>
        </div>
      </section>

      {/* Rental Income Teaser */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow text-on-surface-muted">
                Guaranteed Rental Income
              </p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Earn while you are away
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant max-w-lg">
                Every lodge enters our managed rental programme when you are not
                in residence. Eight percent guaranteed for three years, paid
                quarterly. Up to one hundred and twenty-six thousand pounds
                returned over the initial term.
              </p>
              <div className="mt-8">
                <LinkArrow href="/own/rental-income">
                  Rental income details
                </LinkArrow>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <StatBlock label="Guaranteed return" value="8%" />
              <StatBlock label="Initial term" value="3 years" />
              <StatBlock label="Payment frequency" value="Quarterly" />
              <StatBlock label="Personal use" value="6 weeks" />
            </div>
          </div>
        </div>
      </section>

      {/* Estate Lifestyle */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Estate Living</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            Five hundred acres at your door
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            Ownership at Whalesborough means full access to the estate and its
            amenities. The W Club Spa, The Weir Restaurant, lakeside walks,
            fishing, paddleboarding, and the rugged Cornish coastline minutes
            from your front door.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <LifestyleItem title="The W Club Spa" text="Preferential rates and priority booking for treatments, the pool and thermal suite." />
            <LifestyleItem title="The Weir Restaurant" text="Estate-reared and locally sourced dining with priority reservations for owners." />
            <LifestyleItem title="Lakeside & Trails" text="Six lakes, ancient woodland walks and direct access to the South West Coast Path." />
            <LifestyleItem title="Watersports" text="Paddleboarding, kayaking and wild swimming across the estate lakes." />
            <LifestyleItem title="Dog Friendly" text="Walk your dogs across five hundred acres of private estate without restriction." />
            <LifestyleItem title="Near Bude" text="Minutes from Widemouth Bay, Bude and the independent shops and cafes of North Cornwall." />
          </div>
          <div className="mt-12">
            <LinkArrow href="/own/why-own">Why own at Whalesborough</LinkArrow>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-24 text-center">
          <h2 className="heading-editorial text-h1 text-primary-fg">
            See it for yourself
          </h2>
          <p className="mt-4 text-body-lg text-primary-fg/80 max-w-xl mx-auto">
            Book a private viewing with our ownership team. Walk the plots, tour
            the show lodge, and discover the estate at your own pace.
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

function CollectionCard({
  href,
  title,
  price,
  description,
}: {
  href: string;
  title: string;
  price: string;
  description: string;
}) {
  return (
    <Link href={href} className="group block">
      <div className="aspect-[4/3] bg-surface-container-high relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-display text-h2 italic text-secondary-fg/40">
            {title}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="heading-editorial text-h2 text-on-surface group-hover:text-primary transition-colors duration-fast ease-out-luxury">
          {title}
        </h3>
        <p className="mt-1 eyebrow text-primary">{price}</p>
        <p className="mt-3 text-body text-on-surface-variant">{description}</p>
        <div className="mt-4">
          <LinkArrow href={href}>Explore collection</LinkArrow>
        </div>
      </div>
    </Link>
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

function LifestyleItem({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h3 className="text-h3 font-display text-on-surface">{title}</h3>
      <p className="mt-2 text-body-sm text-on-surface-variant">{text}</p>
    </div>
  );
}
