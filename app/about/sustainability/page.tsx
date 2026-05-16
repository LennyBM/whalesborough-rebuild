import type { Metadata } from "next";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sustainability | Whalesborough Farm Resort & Spa",
  description:
    "Cleaner Seas microplastic filters, 60KW wind turbine, biomass district heating, 50 acres of new woodland, 15,000 Cornish Black Bees. Our measurable commitment to the land.",
};

export default function SustainabilityPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">About · Sustainability</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Measured, not{" "}
            <span className="italic">marketed</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            We do not call ourselves sustainable because it sounds good. We call
            ourselves sustainable because we measure it — kilowatt hours
            generated, microplastics captured, trees planted, species counted.
            Where we fall short, we publish that too.
          </p>
          <div className="mt-10 flex flex-wrap gap-6">
            <Link href="/about/awards">
              <LinkArrow>Awards &amp; accreditations</LinkArrow>
            </Link>
          </div>
        </div>
      </section>

      {/* Cleaner Seas */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Water</p>
          <h2 className="heading-editorial mt-4 text-h1 max-w-3xl text-on-surface">
            Cleaner Seas — first in the UK
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            Whalesborough is the first UK resort to fit Cleaner Seas microplastic
            filters to every washing machine on-site. Each load of laundry
            releases synthetic fibres invisible to the eye — our filters capture
            them before they reach the watercourse and, eventually, the Atlantic.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h3 className="text-h3 text-on-surface">How it works</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                External filters fitted to each machine capture microplastic
                fibres down to 60 microns during every wash cycle. The captured
                material is collected and disposed of responsibly — never
                entering the water system.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Why it matters</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                A single domestic wash releases up to 700,000 microplastic
                fibres. Across a resort running dozens of machines daily, the
                cumulative impact on marine ecosystems is significant. We chose
                to address it at source.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Energy */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Energy</p>
          <h2 className="heading-editorial mt-4 text-h1 max-w-3xl text-on-surface">
            Generating our own power
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            Our target is full energy self-sufficiency. We are not there yet —
            but every year the gap narrows. Three systems work in concert to
            reduce our dependence on the grid.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            <div>
              <h3 className="text-h3 text-on-surface">60KW wind turbine</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Sited on the estate&apos;s high ground where Atlantic winds are
                strongest. Generates electricity fed directly into the resort&apos;s
                supply, offsetting grid consumption throughout the year.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Biomass boiler</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                A district heating system fuelled by sustainably sourced woodchip.
                Provides hot water and central heating to multiple buildings across
                the estate — displacing fossil fuel boilers entirely in those
                properties.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Air source heat pumps</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                The spa pools — indoor and outdoor — are heated by air source
                systems. Efficient even in Cornish winters, they extract ambient
                warmth from the air rather than burning gas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Biodiversity */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Biodiversity</p>
          <h2 className="heading-editorial mt-4 text-h1 max-w-3xl text-on-surface">
            Rewilding in numbers
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h3 className="text-h3 text-on-surface">50 acres of new woodland</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Native broadleaf species planted by the estate over the past
                decade. These young woodlands are already providing habitat
                corridors for birds, insects and small mammals moving between
                established hedgerows.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">15,000 Cornish Black Bees</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                A native subspecies that thrives in the Cornish climate. Our
                hives pollinate the estate&apos;s wildflower meadows, orchard and
                market garden — producing honey sold on-site and served at
                The Weir.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">9,000 sunflowers</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Planted annually as both a pollinator resource and a visible
                signal of the estate&apos;s commitment to biodiversity. The fields
                bloom through late summer, attracting bees, butterflies and
                goldfinches.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">22,000 pumpkin seeds</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Sown each spring for the estate&apos;s autumn harvest. A crop that
                feeds guests, engages visiting families, and returns organic
                matter to the soil at season&apos;s end.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Market Garden */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Food</p>
          <h2 className="heading-editorial mt-4 text-h1 max-w-3xl text-on-surface">
            Neetfield Market Garden
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            Our on-site growing operation supplies The Weir Restaurant with
            seasonal produce — salad leaves, herbs, soft fruit, courgettes,
            beans and more. The distance from soil to plate is measured in
            footsteps, not food miles.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            <div>
              <h3 className="text-h3 text-on-surface">Zero food miles</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Harvested in the morning, served at lunch. No refrigerated
                transport, no packaging, no supply chain emissions for the crops
                we grow ourselves.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">No-dig method</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                The garden uses no-dig principles — building soil health through
                compost layers rather than ploughing. This preserves soil
                structure, sequesters carbon and supports microbial life.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Seasonal menus</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                The restaurant menu follows the garden&apos;s rhythm. When something
                is ready, it appears on the plate. When it&apos;s finished, it
                disappears. This is honest cooking.
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Link href="/estate/farm">
              <LinkArrow>The working farm</LinkArrow>
            </Link>
          </div>
        </div>
      </section>

      {/* Awards & Targets */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Recognition</p>
          <h2 className="heading-editorial mt-4 text-h1 max-w-3xl text-on-surface">
            Awards and where we&apos;re headed
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h3 className="text-h3 text-on-surface">Cornwall Tourism Gold</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Gold winner in Ethical, Responsible &amp; Sustainable Tourism at the
                Cornwall Tourism Awards 2024/25. Judged on measurable impact, not
                marketing claims.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">DEFRA recognition</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Recognised by the Department for Environment, Food &amp; Rural
                Affairs for our approach to land management, biodiversity net
                gain and sustainable tourism.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Wildlife Trust accreditation</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Accredited by the Cornwall Wildlife Trust for habitat management
                across the estate — acknowledging our woodland planting,
                hedgerow restoration and wetland conservation.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Our target</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Full energy self-sufficiency. We are working toward generating
                every kilowatt the resort consumes from on-site renewable
                sources. We publish annual progress toward this goal.
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Link href="/about/awards">
              <LinkArrow>All awards &amp; accreditations</LinkArrow>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <TrustSignal label="60KW" detail="Wind turbine on-site" />
            <TrustSignal label="50 acres" detail="New native woodland" />
            <TrustSignal label="15,000" detail="Cornish Black Bees" />
            <TrustSignal label="First UK" detail="Cleaner Seas filters" />
          </div>
        </div>
      </section>
    </>
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
