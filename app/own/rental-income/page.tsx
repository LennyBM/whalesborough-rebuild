import type { Metadata } from "next";
import Link from "next/link";

import { Button, LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Rental Income | Own at Whalesborough",
  description:
    "8% guaranteed rental income for 3 years, paid quarterly. Up to £126,000 returned over the initial term. Fully managed programme.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">Lodge Ownership</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            A guaranteed return,{" "}
            <span className="italic">paid quarterly</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Every lodge at Whalesborough enters our managed rental programme when
            you are not in residence. Eight percent guaranteed for three years.
            Quarterly payments. Up to one hundred and twenty-six thousand pounds
            returned over the initial term.
          </p>
        </div>
      </section>

      {/* Key Numbers */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <StatBlock label="Guaranteed return" value="8%" />
            <StatBlock label="Guaranteed term" value="3 years" />
            <StatBlock label="Payment frequency" value="Quarterly" />
            <StatBlock label="Personal use" value="6 weeks / year" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">How it works</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            Income without involvement
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
            <Detail
              title="Managed programme"
              text="Your lodge is marketed across our booking channels, listed on major platforms and managed by our on-site team. Changeovers, cleaning, maintenance and guest communications are all handled for you."
            />
            <Detail
              title="Guaranteed for three years"
              text="Regardless of occupancy rates, you receive eight percent of your purchase price per annum for the first three years. This guarantee is contractual and paid quarterly into your nominated account."
            />
            <Detail
              title="Quarterly payments"
              text="Income is calculated and paid every three months. Clear statements show occupancy, gross income and any applicable charges deducted before payment."
            />
            <Detail
              title="Six weeks personal use"
              text="You retain six weeks of personal use per year. Choose your weeks in advance — peak season, half terms, off-season midweek breaks. The rest enters the programme."
            />
          </div>
        </div>
      </section>

      {/* Projections by Collection */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Income projections</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            What each collection returns
          </h2>
          <p className="mt-4 text-body text-on-surface-variant max-w-2xl">
            Based on 8% of purchase price per annum, gross of any applicable service charges.
          </p>
          <div className="mt-12 space-y-4">
            <ProjectionRow collection="Tevi Luxury Lodge" price="£749,950" annual="£59,996" threeYear="£179,988" />
            <ProjectionRow collection="Trelowen 4-bed" price="£525,000" annual="£42,000" threeYear="£126,000" />
            <ProjectionRow collection="Trelowen 3-bed" price="£475,000" annual="£38,000" threeYear="£114,000" />
            <ProjectionRow collection="Trelowen 2-bed" price="£425,000" annual="£34,000" threeYear="£102,000" />
            <ProjectionRow collection="Bespoke (from)" price="£399,000" annual="£31,920" threeYear="£95,760" />
          </div>
        </div>
      </section>

      {/* After Year 3 */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow text-on-surface-muted">After the guarantee</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                What happens after year three?
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant max-w-lg">
                After the initial three-year guaranteed period, your lodge
                continues in the managed rental programme on a revenue-share
                basis. Whalesborough&rsquo;s strong occupancy rates, five-star
                reputation and North Cornwall&rsquo;s growing popularity mean
                demand remains robust year-round.
              </p>
              <p className="mt-4 text-body text-on-surface-variant max-w-lg">
                You retain the option to increase personal use, adjust your
                availability windows or exit the programme entirely at any point
                after the guarantee period.
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-surface-container-low p-6">
                <p className="text-h3 font-display text-on-surface">Continued rental</p>
                <p className="mt-2 text-body-sm text-on-surface-variant">Revenue-share model with quarterly payments continuing.</p>
              </div>
              <div className="bg-surface-container-low p-6">
                <p className="text-h3 font-display text-on-surface">Flexible use</p>
                <p className="mt-2 text-body-sm text-on-surface-variant">Increase personal weeks or adjust availability at will.</p>
              </div>
              <div className="bg-surface-container-low p-6">
                <p className="text-h3 font-display text-on-surface">Exit option</p>
                <p className="mt-2 text-body-sm text-on-surface-variant">Leave the programme at any point with standard notice.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-24 text-center">
          <h2 className="heading-editorial text-h1 text-primary-fg">
            Discuss your income potential
          </h2>
          <p className="mt-4 text-body-lg text-primary-fg/80 max-w-xl mx-auto">
            Every lodge is different. Speak to Rebecca for a personalised
            projection based on your chosen collection and specification.
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

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background p-6 text-center">
      <p className="text-display-md font-display text-primary">{value}</p>
      <p className="mt-2 eyebrow text-on-surface-muted">{label}</p>
    </div>
  );
}

function Detail({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h3 className="text-h3 font-display text-on-surface">{title}</h3>
      <p className="mt-3 text-body text-on-surface-variant">{text}</p>
    </div>
  );
}

function ProjectionRow({
  collection,
  price,
  annual,
  threeYear,
}: {
  collection: string;
  price: string;
  annual: string;
  threeYear: string;
}) {
  return (
    <div className="grid grid-cols-4 gap-4 bg-background p-6 items-center">
      <p className="text-body font-medium text-on-surface col-span-1">{collection}</p>
      <p className="text-body-sm text-on-surface-variant text-center">{price}</p>
      <p className="text-body-sm text-on-surface-variant text-center">{annual} / year</p>
      <p className="text-h3 font-display text-primary text-right">{threeYear}</p>
    </div>
  );
}
