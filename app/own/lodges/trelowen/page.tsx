import type { Metadata } from "next";
import Link from "next/link";

import { Button, LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Trelowen Exclusive Lodges | Own at Whalesborough",
  description:
    "New-build lodges in 2, 3 and 4-bedroom configurations. From £425,000. BS3632 residential spec, fully electric, 125-year licence.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">
            The Trelowen Collection — New Build
          </p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            The newest chapter on the{" "}
            <span className="italic">estate</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Trelowen — Cornish for &lsquo;homestead&rsquo;. A brand-new
            collection of exclusive lodges in three sizes, designed from the
            ground up with BS3632 residential specification and fully electric
            systems. Available for 2026 delivery.
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

      {/* Three Sizes */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Three configurations</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            Choose the size that fits your life
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <PriceCard bedrooms={2} price="£425,000" features={["Open-plan living", "Master en-suite", "Private deck", "Parking for two"]} />
            <PriceCard bedrooms={3} price="£475,000" features={["Family bathroom + en-suite", "Utility room", "Extended deck", "Parking for two"]} highlight />
            <PriceCard bedrooms={4} price="£525,000" features={["Two en-suites", "Study / snug", "Wraparound deck", "Parking for three"]} />
          </div>
        </div>
      </section>

      {/* Specification */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Specification</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            Built to residential standards
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <SpecItem title="BS3632 residential" text="Full residential specification — not a holiday home standard. Designed for year-round occupation." />
            <SpecItem title="Fully electric" text="Air-source heat pumps, underfloor heating and EV charging point included as standard." />
            <SpecItem title="125-year licence" text="Security and peace of mind. A long-term asset that can be passed on or resold." />
            <SpecItem title="Smart systems" text="Integrated heating, lighting and security controls with remote access via app." />
            <SpecItem title="Premium insulation" text="Exceeds current Building Regulations for thermal performance. Low running costs." />
            <SpecItem title="Turnkey delivery" text="Fully furnished to our design specification. Move in without lifting a paintbrush." />
          </div>
        </div>
      </section>

      {/* Rental Income */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow text-on-surface-muted">Rental Income</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Eight percent guaranteed
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant max-w-lg">
                All Trelowen lodges enter our managed rental programme. Eight
                percent guaranteed for three years, paid quarterly. Your lodge is
                professionally maintained, fully insured and marketed across our
                booking channels.
              </p>
              <div className="mt-8 space-y-4">
                <p className="text-body text-on-surface-variant">
                  <span className="font-medium text-on-surface">2-bed:</span>{" "}
                  £34,000 per year / £102,000 over 3 years
                </p>
                <p className="text-body text-on-surface-variant">
                  <span className="font-medium text-on-surface">3-bed:</span>{" "}
                  £38,000 per year / £114,000 over 3 years
                </p>
                <p className="text-body text-on-surface-variant">
                  <span className="font-medium text-on-surface">4-bed:</span>{" "}
                  £42,000 per year / £126,000 over 3 years
                </p>
              </div>
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
            Reserve your Trelowen lodge
          </h2>
          <p className="mt-4 text-body-lg text-primary-fg/80 max-w-xl mx-auto">
            New-build plots are released in phases. Book a viewing to walk the
            site, choose your plot and secure your position.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/own/viewing/book">
              <Button variant="secondary" size="lg" className="border-primary-fg text-primary-fg hover:bg-primary-fg hover:text-primary">
                Book a Viewing
              </Button>
            </Link>
            <Link href="/own/waitlist">
              <Button variant="ghost" size="lg" className="text-primary-fg hover:bg-primary-fg/10">
                Join Waitlist
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function PriceCard({
  bedrooms,
  price,
  features,
  highlight = false,
}: {
  bedrooms: number;
  price: string;
  features: string[];
  highlight?: boolean;
}) {
  return (
    <div className={`p-8 ${highlight ? "bg-primary/5 ring-2 ring-primary/20" : "bg-surface-container-high"}`}>
      <p className="eyebrow text-on-surface-muted">{bedrooms}-bedroom</p>
      <p className="mt-3 text-display-md font-display text-on-surface">{price}</p>
      <ul className="mt-6 space-y-3">
        {features.map((f) => (
          <li key={f} className="text-body-sm text-on-surface-variant flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-primary" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <LinkArrow href="/own/viewing/book">Book viewing</LinkArrow>
      </div>
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
