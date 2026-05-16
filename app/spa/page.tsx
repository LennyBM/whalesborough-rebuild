import type { Metadata } from "next";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "The W Club Spa | Whalesborough",
  description:
    "An indoor infinity pool, thermal suite, outdoor heated pool and a treatment menu drawn from Cornish botanicals. The W Club Spa at Whalesborough Farm Resort.",
};

export default function SpaPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">The W Club Spa</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            A spa shaped by the{" "}
            <span className="italic">estate</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Five hundred acres of working farmland, three spring-fed lakes and
            the salt air of the Atlantic — the landscape here is the treatment.
            We simply brought it indoors.
          </p>
          <div className="mt-10 flex flex-wrap gap-6">
            <Link href="/spa/booking">
              <LinkArrow>Book a treatment</LinkArrow>
            </Link>
            <Link href="/spa/spa-days">
              <LinkArrow>Spa day packages</LinkArrow>
            </Link>
          </div>
        </div>
      </section>

      {/* Facilities Overview — Pools */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Water</p>
          <h2 className="heading-editorial mt-4 text-h1 max-w-3xl text-on-surface">
            Pools built around stillness
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h3 className="text-h3 text-on-surface">Indoor infinity pool</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Heated to 29–30°C and UV-treated for purity. Floor-to-ceiling
                glass frames the lakeside landscape while you swim — a clean
                horizon line that dissolves the boundary between water and estate.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Outdoor heated pool</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Seventeen metres by eight, heated to 26°C year-round. Open sky
                above, estate woodland beyond the edge. Swim outdoors in January.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Hydrotherapy pool</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Warm jets and air seats designed for targeted relief. Used before
                or after treatments to prepare the body and extend the benefit.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Children&apos;s pool</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                A dedicated shallow pool for younger swimmers, kept at a
                comfortable temperature. Adjacent to the main pool so parents
                can relax within sight.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Thermal Suite */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Heat</p>
          <h2 className="heading-editorial mt-4 text-h1 max-w-3xl text-on-surface">
            The thermal journey
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            Move between extremes. The contrast of heat and cooling promotes
            circulation, eases tension and clears the mind — the oldest form of
            wellness there is.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            <div>
              <h3 className="text-h3 text-on-surface">Swedish sauna</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Dry heat, softwood interior, estate views. Temperatures reach
                85°C — deep warmth that opens pores and releases tension from
                muscles worked by coastal walks.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Aroma steam room</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Eucalyptus-infused steam at a gentler 45°C. The moisture
                soothes airways and softens skin ahead of body treatments.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Experience showers</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Tropical rain, arctic mist, and bucket drench options.
                The cooling counterpoint between heat cycles that triggers
                endorphin release and invigorates the nervous system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Relaxation + Fitness */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-on-surface-muted">Rest</p>
              <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
                Relaxation suite
              </h2>
              <p className="mt-4 text-body text-on-surface-variant">
                Heated loungers, soft lighting and a library of wellness
                journals. Post-treatment, retreat here with herbal tea and let
                the products work. In warmer months, the outdoor terrace
                extends the calm into estate air.
              </p>
            </div>
            <div>
              <p className="eyebrow text-on-surface-muted">Move</p>
              <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
                Technogym fitness suite
              </h2>
              <p className="mt-4 text-body text-on-surface-variant">
                Cardio, resistance and functional training equipment by
                Technogym, set within a light-filled space overlooking the
                lakes. Available to spa members, lodge owners and resort guests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Tease */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Rituals</p>
          <h2 className="heading-editorial mt-4 text-h1 max-w-3xl text-on-surface">
            Treatments drawn from the land
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            Our treatment menu uses Gaia Natural Skincare — a range formulated
            from Cornish botanicals. Facials, massage, body rituals: each
            designed to reconnect you with the pace of this place.
          </p>
          <div className="mt-10">
            <Link href="/spa/treatments">
              <LinkArrow>View the treatment menu</LinkArrow>
            </Link>
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="max-w-2xl">
            <p className="eyebrow text-on-surface-muted">Membership</p>
            <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
              Lakeside Locals
            </h2>
            <p className="mt-6 text-body-lg text-on-surface-variant">
              Live nearby? Spa membership gives you year-round access to pools,
              thermal suite, gym and member-only rates on treatments. A space
              to return to, not just visit.
            </p>
            <div className="mt-10 flex flex-wrap gap-6">
              <Link href="/spa/memberships">
                <LinkArrow>Membership details</LinkArrow>
              </Link>
              <Link href="/spa/gift-vouchers">
                <LinkArrow>Gift vouchers</LinkArrow>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <TrustSignal label="Indoor pool" detail="29–30°C, UV treated" />
            <TrustSignal label="Outdoor pool" detail="17m heated year-round" />
            <TrustSignal label="Gaia Skincare" detail="Cornish botanicals" />
            <TrustSignal label="Technogym" detail="Lake-view fitness suite" />
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
