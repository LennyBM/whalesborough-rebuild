import type { Metadata } from "next";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Whalesborough | Farm Resort & Spa, Cornwall",
  description:
    "A 500-acre working estate in North Cornwall. Discover the story behind Whalesborough Farm Resort & Spa — from 14th-century farmhouse to award-winning destination managed by Landal GreenParks.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">About</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Seven centuries of{" "}
            <span className="italic">working land</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Whalesborough is a 500-acre working estate above the North Cornwall
            coast. What began as a 14th-century farmhouse has grown — carefully,
            over generations — into a destination that balances hospitality with
            the rhythms of the land beneath it.
          </p>
          <div className="mt-10 flex flex-wrap gap-6">
            <Link href="/about/sustainability">
              <LinkArrow>Sustainability</LinkArrow>
            </Link>
            <Link href="/about/awards">
              <LinkArrow>Awards</LinkArrow>
            </Link>
          </div>
        </div>
      </section>

      {/* Heritage */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Heritage</p>
          <h2 className="heading-editorial mt-4 text-h1 max-w-3xl text-on-surface">
            From farmstead to estate
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h3 className="text-h3 text-on-surface">14th-century origins</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                The Grade II listed farmhouse at the heart of the estate dates to
                the 1300s. It has been a working farm for every century since —
                through wool trade, dairy, and now a diversified rural enterprise
                that feeds guests from its own soil.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">The estate today</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Five hundred acres of pasture, ancient woodland, spring-fed lakes
                and clifftop above Widemouth Bay. Twenty-seven holiday cottages,
                twenty-two Arvor Suites, the W Club Spa, The Weir Restaurant, and
                a small number of lodges for private ownership.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">A working farm</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                This is not a country house turned hotel. The farm continues to
                operate — cattle graze the fields, Neetfield Market Garden grows
                produce for The Weir, and 15,000 Cornish Black Bees pollinate
                fifty acres of new woodland planted by the estate.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Marhamchurch, Bude</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Set between the market town of Bude and the village of
                Marhamchurch in the EX23 postcode. Close enough to the coast to
                taste the salt air, far enough inland to feel the quiet of the
                countryside.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Landal Partnership */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Management</p>
          <h2 className="heading-editorial mt-4 text-h1 max-w-3xl text-on-surface">
            Managed by Landal GreenParks
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            Since joining the Landal GreenParks family, Whalesborough has
            benefited from the operational rigour of an international holiday
            operator — Dutch-founded, with parks across Europe — while retaining
            the character and independence of a single Cornish estate.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            <div>
              <h3 className="text-h3 text-on-surface">International standards</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Landal brings decades of experience in hospitality operations,
                guest satisfaction measurement, and sustainable park management
                across multiple countries.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Local character</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                The estate remains distinctly Cornish. Local suppliers, local
                staff, local produce. The partnership provides infrastructure
                without erasing identity.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Investment in place</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Ongoing capital investment in sustainability infrastructure, spa
                facilities and accommodation — ensuring the estate improves with
                each passing year rather than simply trading on its history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Values</p>
          <h2 className="heading-editorial mt-4 text-h1 max-w-3xl text-on-surface">
            What guides us
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            <ValueCard
              title="Stewardship"
              description="We inherited this land. Our job is to leave it in better condition than we found it — for guests, for wildlife, for the next seven centuries."
            />
            <ValueCard
              title="Honesty"
              description="No greenwashing, no inflated claims. We measure, we publish, we improve. Where we fall short, we say so."
            />
            <ValueCard
              title="Pace"
              description="Slow hospitality. We do not rush guests through experiences. The estate sets the tempo — seasonal, tidal, unhurried."
            />
            <ValueCard
              title="Community"
              description="We employ locally, source locally, and invest in the community surrounding the estate. The resort succeeds when its neighbours do."
            />
          </div>
        </div>
      </section>

      {/* Team / People */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">People</p>
          <h2 className="heading-editorial mt-4 text-h1 max-w-3xl text-on-surface">
            The team behind the estate
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            Over one hundred people work across the estate — from spa therapists
            and chefs to groundskeepers and market gardeners. Most live within
            fifteen miles. Many have been here for years. This is a place people
            stay.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            <div>
              <h3 className="text-h3 text-on-surface">Estate management</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Day-to-day operations, guest experience, grounds maintenance and
                the working farm. The team that keeps five hundred acres turning.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Spa &amp; wellness</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Qualified therapists, pool technicians and fitness instructors.
                The W Club team delivers over three thousand treatments per year.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Food &amp; beverage</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Chefs, front-of-house, sommeliers and the Neetfield growing team.
                From field to plate, every link in the chain is on-site.
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Link href="/contact">
              <LinkArrow>Get in touch</LinkArrow>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <TrustSignal label="500 acres" detail="Working estate" />
            <TrustSignal label="14th century" detail="Grade II listed" />
            <TrustSignal label="NPS 83.3" detail="#1 in Cornwall" />
            <TrustSignal label="Gold 2024/25" detail="Cornwall Tourism Awards" />
          </div>
        </div>
      </section>
    </>
  );
}

function ValueCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h3 className="text-h3 text-on-surface">{title}</h3>
      <p className="mt-3 text-body text-on-surface-variant">{description}</p>
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
