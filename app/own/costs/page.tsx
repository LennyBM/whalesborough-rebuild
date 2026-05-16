import type { Metadata } from "next";
import Link from "next/link";

import { Button, LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Running Costs & Charges | Own at Whalesborough",
  description:
    "Transparent running costs for lodge ownership. Ground rent, service charge, management fees and what is included — fully itemised.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">Lodge Ownership</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Complete transparency on{" "}
            <span className="italic">running costs</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            No hidden fees. No surprise invoices. Every cost associated with
            owning a lodge at Whalesborough is itemised here so you can plan
            with confidence from day one.
          </p>
        </div>
      </section>

      {/* What You Pay */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Annual charges</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            What you pay each year
          </h2>
          <p className="mt-6 max-w-2xl text-body text-on-surface-variant">
            All charges are paid annually or by monthly direct debit. Figures
            shown are indicative and confirmed at the point of reservation.
          </p>
          <div className="mt-12 space-y-4">
            <CostRow
              item="Ground rent"
              description="Annual licence fee for your plot on the estate."
              note="Fixed for the first 5 years"
            />
            <CostRow
              item="Estate service charge"
              description="Covers grounds maintenance, estate roads, communal lighting, landscaping and security."
              note="Reviewed annually"
            />
            <CostRow
              item="Management fee"
              description="Covers rental programme marketing, guest management, changeovers, cleaning and inventory replenishment."
              note="Deducted from rental income"
            />
            <CostRow
              item="Building insurance"
              description="Comprehensive cover for the structure, contents and public liability. Arranged through our block policy."
              note="Included in service charge"
            />
            <CostRow
              item="Utilities"
              description="Electricity (fully electric lodges — no gas). Metered and billed directly to you or offset against rental income."
              note="Variable by usage"
            />
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Included in your charges</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            What your service charge covers
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <IncludedItem title="Grounds & landscaping" text="Professional grounds team maintain all communal areas, paths, planting and estate lakes year-round." />
            <IncludedItem title="Estate roads" text="Private road maintenance, pothole repair, gritting and seasonal clearing." />
            <IncludedItem title="Security" text="CCTV monitoring, gated access and on-site estate management during operating hours." />
            <IncludedItem title="Waste management" text="Bin collection, recycling facilities and seasonal garden waste removal." />
            <IncludedItem title="Building insurance" text="Block insurance policy covering structure, fixtures and public liability." />
            <IncludedItem title="Wi-Fi & connectivity" text="Estate-wide high-speed broadband infrastructure maintained centrally." />
          </div>
        </div>
      </section>

      {/* What's Not Included */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Owner responsibilities</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            What you manage separately
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <IncludedItem title="Contents insurance" text="Personal belongings and high-value items during your personal-use weeks." />
            <IncludedItem title="Council tax" text="Applicable only if you register the lodge as a primary or secondary residence rather than a holiday let." />
            <IncludedItem title="Personal modifications" text="Any alterations beyond the delivered specification require estate approval and are at your cost." />
            <IncludedItem title="Hot tub servicing" text="Regular chemical and mechanical maintenance of private hot tubs (if fitted) during personal-use weeks." />
          </div>
        </div>
      </section>

      {/* Comparison to Traditional */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow text-on-surface-muted">In context</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Lower than a second home
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant max-w-lg">
                Traditional second-home ownership comes with council tax,
                maintenance bills, void periods and the stress of self-managing
                lettings. At Whalesborough, the management fee covers everything
                — and the guaranteed rental income more than offsets annual
                running costs during the initial three-year term.
              </p>
              <div className="mt-8">
                <LinkArrow href="/own/rental-income">
                  Rental income details
                </LinkArrow>
              </div>
            </div>
            <div className="space-y-6">
              <ComparisonItem label="No void periods" text="Guaranteed 8% regardless of occupancy." />
              <ComparisonItem label="No lettings management" text="We handle bookings, changeovers and guest communications." />
              <ComparisonItem label="No maintenance surprises" text="New-build warranty and managed upkeep." />
              <ComparisonItem label="No marketing costs" text="Your lodge is promoted across all our channels." />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-24 text-center">
          <h2 className="heading-editorial text-h1 text-primary-fg">
            Get a personalised cost breakdown
          </h2>
          <p className="mt-4 text-body-lg text-primary-fg/80 max-w-xl mx-auto">
            Costs vary by collection and specification. Speak to Rebecca for a
            detailed breakdown tailored to your chosen lodge.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/own/viewing/book">
              <Button variant="secondary" size="lg" className="border-primary-fg text-primary-fg hover:bg-primary-fg hover:text-primary">
                Book a Viewing
              </Button>
            </Link>
            <Link href="tel:01288361940">
              <Button variant="ghost" size="lg" className="text-primary-fg hover:bg-primary-fg/10">
                Call 01288 361940
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function CostRow({
  item,
  description,
  note,
}: {
  item: string;
  description: string;
  note: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 bg-background p-6 md:grid-cols-12 md:items-center">
      <div className="md:col-span-3">
        <p className="text-h3 font-display text-on-surface">{item}</p>
      </div>
      <div className="md:col-span-6">
        <p className="text-body text-on-surface-variant">{description}</p>
      </div>
      <div className="md:col-span-3 md:text-right">
        <p className="eyebrow text-primary">{note}</p>
      </div>
    </div>
  );
}

function IncludedItem({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h3 className="text-h3 font-display text-on-surface">{title}</h3>
      <p className="mt-2 text-body-sm text-on-surface-variant">{text}</p>
    </div>
  );
}

function ComparisonItem({ label, text }: { label: string; text: string }) {
  return (
    <div className="bg-surface-container-low p-6">
      <p className="text-h3 font-display text-on-surface">{label}</p>
      <p className="mt-2 text-body-sm text-on-surface-variant">{text}</p>
    </div>
  );
}
