import type { Metadata } from "next";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Spa Lodges | Hot Tub Lodges with Spa Access, Bude Cornwall",
  description:
    "Trelowen, Gwari and managed spa lodges with private hot tubs, underfloor heating and direct W Club Spa access. Architect-designed retreats on 500 acres.",
};

export default function SpaLodgesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">
            Accommodation · Spa Lodges
          </p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Architect-designed.{" "}
            <span className="italic">Spa-connected</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Three collections of lodges purpose-built for wellness stays. Private
            hot tubs, underfloor heating throughout, and direct access to The W
            Club Spa — without crossing a car park or pulling on shoes.
          </p>
          <div className="mt-10">
            <LinkArrow href="/stay/availability">
              Check availability
            </LinkArrow>
          </div>
        </div>
      </section>

      {/* Collection Overview */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Three collections</p>
          <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
            Choose your lodge
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-3">
            <CollectionCard
              title="Trelowen Spa Lodges"
              subtitle="2.0 & 3.0 generations"
              description="The estate's original spa lodge concept, refined across two generations. Clean Scandinavian-inspired interiors, full-height glazing and private terraces with hot tubs overlooking the estate lakes."
              specs={[
                "2–3 bedrooms",
                "Private hot tub",
                "From £169 per night",
                "Direct spa access",
              ]}
            />
            <CollectionCard
              title="Gwari Spa Barns"
              subtitle="Barn conversions · 2 & 3"
              description="Three-bedroom barn conversions that blend agricultural heritage with contemporary spa living. Double-height living spaces, exposed timber frames and the largest private terraces on the estate."
              specs={[
                "3 bedrooms",
                "Private hot tub",
                "From £165 per night",
                "Families & groups",
              ]}
            />
            <CollectionCard
              title="Managed Spa Lodges"
              subtitle="Windy Hills · Warrens · Long Down"
              description="Individually owned lodges within the estate's managed rental programme. Each carries the same 5-Star Gold standard, hot tub and spa access as the Trelowen and Gwari collections."
              specs={[
                "2–3 bedrooms",
                "Private hot tub",
                "From £170 per night",
                "Clifftop & lakeside",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Trelowen Deep Dive */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="eyebrow text-on-surface-muted">
                Trelowen collection
              </p>
              <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
                Refined across{" "}
                <span className="italic">two generations</span>
              </h2>
              <p className="mt-6 text-body text-on-surface-variant">
                The Trelowen lodges represent the estate&apos;s evolving vision for
                spa-connected living. The 2.0 generation introduced open-plan
                layouts with full-height glazing; the 3.0 builds pushed further
                — cantilevered terraces, integrated hot tub decking, and
                materials that weather alongside the landscape.
              </p>
              <p className="mt-4 text-body text-on-surface-variant">
                Both generations sleep four to six guests across two or three
                bedrooms. Underfloor heating throughout, rain showers in every
                bathroom, and kitchens equipped for those who prefer to cook
                with estate produce from the farm shop.
              </p>
              <div className="mt-8">
                <LinkArrow href="/stay/availability">
                  View Trelowen availability
                </LinkArrow>
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="aspect-[3/4] bg-surface-container-high relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="font-display text-display-sm italic text-secondary-fg/40">
                    Trelowen
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gwari Deep Dive */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="order-2 lg:order-1 lg:col-span-5">
              <div className="aspect-[4/5] bg-surface-container-high relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="font-display text-display-sm italic text-secondary-fg/40">
                    Gwari
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
              <p className="eyebrow text-on-surface-muted">Gwari collection</p>
              <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
                Agricultural bones,{" "}
                <span className="italic">spa soul</span>
              </h2>
              <p className="mt-6 text-body text-on-surface-variant">
                The Gwari Spa Barns are three-bedroom conversions of former
                agricultural buildings — their double-height living spaces
                retain exposed timber frames and original stonework, now
                paired with contemporary kitchens, rain showers and private
                hot tub terraces.
              </p>
              <p className="mt-4 text-body text-on-surface-variant">
                Ideal for families or groups of friends, the Gwari barns offer
                the most space of any accommodation on the estate. Each sleeps
                six comfortably, with an additional sofa bed in the living area
                for flexibility. The largest private terraces on the estate make
                summer evenings effortless.
              </p>
              <div className="mt-8">
                <LinkArrow href="/stay/availability">
                  View Gwari availability
                </LinkArrow>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Managed Lodges */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Managed programme</p>
          <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
            Windy Hills, Warrens &amp;{" "}
            <span className="italic">Long Down</span>
          </h2>
          <p className="mt-6 max-w-2xl text-body text-on-surface-variant">
            Three individually owned spa lodges within the estate&apos;s managed
            rental programme. Each carries the same 5-Star Gold standard, and
            each includes a private hot tub positioned to make the most of its
            unique setting.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            <ManagedLodge
              name="Windy Hills Spa"
              position="Clifftop · Sea views"
              description="The estate's most elevated lodge, perched above the coastal path with uninterrupted views toward Lundy Island. Hot tub beneath open sky."
            />
            <ManagedLodge
              name="Warrens Spa"
              position="Lakeside · Sheltered"
              description="Nestled beside the lower lake in a sheltered valley position. The hot tub overlooks still water — perfect for early-morning mist."
            />
            <ManagedLodge
              name="Long Down Spa"
              position="Valley floor · Woodland edge"
              description="Set at the meeting point of meadow and ancient woodland. The most private of the three, surrounded by birdsong and little else."
            />
          </div>
        </div>
      </section>

      {/* Spa Connection */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="eyebrow text-on-surface-muted">The W Club Spa</p>
              <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
                Your lodge is your{" "}
                <span className="italic">spa anteroom</span>
              </h2>
              <p className="mt-6 text-body text-on-surface-variant">
                Every spa lodge offers direct access to The W Club — the
                estate&apos;s wellness facility with indoor pool, thermal suite,
                gym and treatment rooms. Walk from hot tub to hydrotherapy in
                slippers. No car, no coat, no friction.
              </p>
              <p className="mt-4 text-body text-on-surface-variant">
                Lodge guests receive complimentary spa facility access throughout
                their stay. Treatments and spa days can be booked in advance or
                arranged on arrival — subject to availability.
              </p>
              <div className="mt-8 flex flex-wrap gap-6">
                <LinkArrow href="/spa">Explore The W Club</LinkArrow>
                <LinkArrow href="/spa/treatments">View treatments</LinkArrow>
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="aspect-[3/4] bg-surface-container-high relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="font-display text-display-sm italic text-secondary-fg/40">
                    W Club
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32 text-center">
          <p className="eyebrow text-on-surface-muted">Book a spa lodge</p>
          <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
            Hot tub, spa, <span className="italic">sorted</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-body text-on-surface-variant">
            Browse available Trelowen, Gwari and managed spa lodges. Friday and
            Monday arrivals, with seven-night stays our most popular rhythm.
          </p>
          <div className="mt-10 flex justify-center">
            <LinkArrow href="/stay/availability">
              Check availability
            </LinkArrow>
          </div>
        </div>
      </section>
    </>
  );
}

function CollectionCard({
  title,
  subtitle,
  description,
  specs,
}: {
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
}) {
  return (
    <div>
      <div className="aspect-[4/3] bg-surface-container-high relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-display text-body italic text-secondary-fg/40">
            {title}
          </p>
        </div>
      </div>
      <h3 className="heading-editorial mt-6 text-h3 text-on-surface">
        {title}
      </h3>
      <p className="eyebrow mt-2 text-on-surface-muted">{subtitle}</p>
      <p className="mt-4 text-body-sm text-on-surface-variant">{description}</p>
      <ul className="mt-4 space-y-1">
        {specs.map((spec) => (
          <li key={spec} className="text-body-sm text-on-surface-variant">
            — {spec}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ManagedLodge({
  name,
  position,
  description,
}: {
  name: string;
  position: string;
  description: string;
}) {
  return (
    <div>
      <div className="aspect-[4/3] bg-surface-container-high relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-display text-body italic text-secondary-fg/40">
            {name}
          </p>
        </div>
      </div>
      <h3 className="heading-editorial mt-6 text-h3 text-on-surface">
        {name}
      </h3>
      <p className="eyebrow mt-2 text-on-surface-muted">{position}</p>
      <p className="mt-3 text-body-sm text-on-surface-variant">{description}</p>
    </div>
  );
}
