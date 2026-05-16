import type { Metadata } from "next";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Awards & Accreditations | Whalesborough Farm Resort & Spa",
  description:
    "Cornwall Tourism Awards Gold 2024/25, 5-Star Gold VisitEngland, NPS 83.3, Feefo 4.5/5, DEFRA recognition, Wildlife Trust accreditation. The evidence behind the experience.",
};

export default function AwardsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">About · Awards</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            The evidence behind the{" "}
            <span className="italic">experience</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Awards are not the reason we do what we do. But they are useful
            evidence that we do it well — independently judged, externally
            verified, and published for anyone who wants to check.
          </p>
        </div>
      </section>

      {/* Industry Awards */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Industry recognition</p>
          <h2 className="heading-editorial mt-4 text-h1 max-w-3xl text-on-surface">
            Awards from the industry
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-2">
            <AwardCard
              title="Cornwall Tourism Awards Gold 2024/25"
              category="Ethical, Responsible & Sustainable Tourism"
              description="Judged on measurable environmental impact, community benefit and responsible business practices. Gold recognises the highest standard in Cornish tourism sustainability."
            />
            <AwardCard
              title="5-Star Gold — VisitEngland"
              category="Self-catering accommodation"
              description="The highest quality grade awarded by England's national tourism board. Gold denotes exceptional quality that exceeds the standard five-star threshold across furnishings, hospitality and maintenance."
            />
          </div>
        </div>
      </section>

      {/* Guest Satisfaction */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Guest feedback</p>
          <h2 className="heading-editorial mt-4 text-h1 max-w-3xl text-on-surface">
            What guests actually say
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            We track satisfaction through Net Promoter Score and independent
            review platforms. These numbers are not curated — they represent
            every guest who chooses to respond.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            <MetricCard
              metric="83.3"
              label="Net Promoter Score"
              context="Ranked #1 in Cornwall. The industry average for UK holiday parks sits around 40. Anything above 70 is considered world-class."
            />
            <MetricCard
              metric="4.5 / 5"
              label="Feefo rating"
              context="Based on verified post-stay reviews collected by Feefo — an independent platform that only surveys confirmed guests, not open-submission reviews."
            />
            <MetricCard
              metric="#1"
              label="Cornwall NPS ranking"
              context="The highest Net Promoter Score of any resort or holiday park in Cornwall. Measured consistently across multiple seasons and guest cohorts."
            />
          </div>
        </div>
      </section>

      {/* Environmental Accreditations */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Environmental</p>
          <h2 className="heading-editorial mt-4 text-h1 max-w-3xl text-on-surface">
            Environmental accreditations
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <AwardCard
              title="DEFRA recognition"
              category="Land management & sustainable tourism"
              description="The Department for Environment, Food & Rural Affairs has recognised Whalesborough for our integrated approach to farming, biodiversity and hospitality — demonstrating that a working estate can deliver both economic and environmental returns."
            />
            <AwardCard
              title="Cornwall Wildlife Trust accreditation"
              category="Habitat management"
              description="Accredited for habitat creation and management across the 500-acre estate. This covers our fifty acres of new native woodland, hedgerow restoration programme, wetland conservation and pollinator corridors."
            />
          </div>
          <div className="mt-10">
            <Link href="/about/sustainability">
              <LinkArrow>Our sustainability commitments</LinkArrow>
            </Link>
          </div>
        </div>
      </section>

      {/* What These Mean */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Transparency</p>
          <h2 className="heading-editorial mt-4 text-h1 max-w-3xl text-on-surface">
            What these numbers mean
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            Every award and metric listed on this page is independently verified.
            We do not pay for placement, we do not select which reviews to
            display, and we do not enter categories where the judging criteria
            are opaque. If it is on this page, it was earned.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h3 className="text-h3 text-on-surface">Independent judging</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Cornwall Tourism Awards are judged by an independent panel against
                published criteria. VisitEngland assessments are unannounced
                inspections. Neither can be influenced by the applicant.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Verified reviews</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Feefo only collects reviews from guests who have a confirmed
                booking. There is no way to leave a review without having stayed.
                Our NPS is measured internally across all guests, not a selected
                sample.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Published annually</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                We update this page at the end of each awards season. If we lose
                a rating or drop a score, it will be reflected here. Transparency
                requires honesty in both directions.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Not marketing</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                We share these results because prospective guests deserve evidence,
                not promises. The numbers exist whether we publish them or not —
                we choose to publish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <TrustSignal label="Gold 2024/25" detail="Cornwall Tourism Awards" />
            <TrustSignal label="5-Star Gold" detail="VisitEngland" />
            <TrustSignal label="NPS 83.3" detail="#1 in Cornwall" />
            <TrustSignal label="4.5 / 5" detail="Feefo verified" />
          </div>
        </div>
      </section>
    </>
  );
}

function AwardCard({
  title,
  category,
  description,
}: {
  title: string;
  category: string;
  description: string;
}) {
  return (
    <div>
      <h3 className="text-h2 text-on-surface">{title}</h3>
      <p className="mt-2 text-body-sm font-medium uppercase tracking-wide text-on-surface-muted">
        {category}
      </p>
      <p className="mt-4 text-body text-on-surface-variant">{description}</p>
    </div>
  );
}

function MetricCard({
  metric,
  label,
  context,
}: {
  metric: string;
  label: string;
  context: string;
}) {
  return (
    <div>
      <p className="font-display text-display-md text-on-surface">{metric}</p>
      <p className="mt-2 text-h3 text-on-surface">{label}</p>
      <p className="mt-3 text-body text-on-surface-variant">{context}</p>
    </div>
  );
}

function TrustSignal({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="text-center">
      <p className="text-h3 text-on-surface">{label}</p>
      <p className="mt-1 text-body-sm text-on-surface-muted">{detail}</p>
    </div>
  );
}
