import type { Metadata } from "next";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "The Working Farm | The Estate | Whalesborough",
  description:
    "Neetfield Market Garden, 15,000 Cornish Black Bees, 50 acres of new woodland, 9,000 sunflowers and a farmyard full of animals. A working estate shaped by the land.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">
            The Estate · Working Farm
          </p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg max-w-4xl text-on-surface">
            Shaped by the <span className="italic">land</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Whalesborough is not a manicured resort dressed as countryside. It
            is a working farm — with soil under its fingernails, seasons that
            dictate the menu and animals that greet you at the gate.
          </p>
        </div>
      </section>

      {/* Market Garden */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-hero px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="eyebrow text-on-surface-muted">Organic produce</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Neetfield Market Garden
              </h2>
              <p className="mt-6 max-w-lg text-body-lg text-on-surface-variant">
                Our on-site market garden supplies The Weir restaurant
                year-round. Organic salads, herbs, root vegetables and soft
                fruit travel metres — not miles — from plot to plate. In summer
                the polytunnels overflow with tomatoes; in winter it is kale,
                chard and leeks that anchor the menu.
              </p>
              <div className="mt-8">
                <LinkArrow href="/dine">Visit The Weir</LinkArrow>
              </div>
            </div>
            <div className="aspect-[4/3] bg-surface-container-high relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display text-display-sm italic text-secondary-fg/40">
                  Market Garden
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animals */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Farm animals</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            The characters you will meet
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            The estate is home to a full cast of animals — each with their own
            territory, their own temperament and their own loyal following
            among returning guests.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <AnimalDetail
              name="Alberto & Alfonzo"
              type="Alpacas"
              description="Our resident alpacas graze the paddock beside the lake. Gentle, curious and endlessly photogenic — they are the estate's unofficial ambassadors."
            />
            <AnimalDetail
              name="The goats"
              type="Pygmy & Boer goats"
              description="Always at the fence when visitors approach. Children adore them — and the feeling is mutual."
            />
            <AnimalDetail
              name="The pigs"
              type="Oxford Sandy & Blacks"
              description="Friendly, vocal and perpetually hungry. Watch from a respectful distance or join a feeding session during Little Farmers."
            />
            <AnimalDetail
              name="The chickens"
              type="Free-range layers"
              description="Roaming the farmyard by day, supplying eggs to the kitchen each morning. Children can help with the daily collection."
            />
            <AnimalDetail
              name="The donkeys"
              type="Standard donkeys"
              description="Patient and affectionate. Often found in the lower paddock, happy to be scratched behind the ears."
            />
            <AnimalDetail
              name="The ducks"
              type="Various breeds"
              description="Paddling the estate ponds and waddling between buildings with complete disregard for human schedules."
            />
          </div>
          <div className="mt-12">
            <LinkArrow href="/estate/activities">
              Little Farmers sessions
            </LinkArrow>
          </div>
        </div>
      </section>

      {/* Bees */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-hero px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="aspect-[4/3] bg-surface-container-high relative overflow-hidden lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display text-display-sm italic text-secondary-fg/40">
                  Bees
                </p>
              </div>
            </div>
            <div className="lg:order-1">
              <p className="eyebrow text-on-surface-muted">Pollination</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Fifteen thousand Cornish Black Bees
              </h2>
              <p className="mt-6 max-w-lg text-body-lg text-on-surface-variant">
                Our hives are home to the native Cornish Black Bee — a hardy,
                gentle subspecies perfectly adapted to the maritime climate.
                They pollinate the market garden, the wildflower margins and
                the nine thousand sunflowers we plant each summer. Honey
                from the estate is available at reception.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Woodland & Sunflowers */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <div>
              <p className="eyebrow text-on-surface-muted">Reforestation</p>
              <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
                Fifty acres of new woodland
              </h2>
              <p className="mt-6 text-body text-on-surface-variant">
                Native broadleaf species — oak, birch, hazel, rowan — planted
                to restore habitat, sequester carbon and create new walking
                routes for generations to come. The woodland is young now, but
                already alive with birdsong.
              </p>
            </div>
            <div>
              <p className="eyebrow text-on-surface-muted">Summer colour</p>
              <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
                Nine thousand sunflowers
              </h2>
              <p className="mt-6 text-body text-on-surface-variant">
                Planted for pollinators and for joy. In late summer the fields
                blaze gold — one of the most photographed moments on the estate.
                In autumn, twenty-two thousand pumpkins take their place for the
                annual pick-your-own event.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-hero px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Sustainability</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            Measured, not just claimed
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            Every decision on the estate is weighed against its environmental
            cost. Not perfectly — but honestly, transparently and with a clear
            direction of travel.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <SustainabilityStat
              value="60KW"
              label="Wind turbine on site"
            />
            <SustainabilityStat
              value="Biomass"
              label="Boiler heating the estate"
            />
            <SustainabilityStat
              value="Cleaner Seas"
              label="Microplastic filters in every drain"
            />
            <SustainabilityStat
              value="Gold"
              label="Cornwall Tourism 2024/25"
            />
          </div>
          <p className="mt-10 max-w-2xl text-body text-on-surface-variant">
            Air-source heat pumps power the spa lodges. EV charging points serve
            guests driving electric. The ANPR gate means contactless, paperless
            access around the clock.
          </p>
          <div className="mt-8">
            <LinkArrow href="/about/sustainability">
              Full sustainability report
            </LinkArrow>
          </div>
        </div>
      </section>
    </>
  );
}

function AnimalDetail({
  name,
  type,
  description,
}: {
  name: string;
  type: string;
  description: string;
}) {
  return (
    <div>
      <div className="aspect-[4/3] bg-surface-container-high relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-secondary/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-display text-h3 italic text-secondary-fg/40">
            {name}
          </p>
        </div>
      </div>
      <p className="eyebrow mt-4 text-on-surface-muted">{type}</p>
      <h3 className="mt-2 text-h3 font-display text-on-surface">{name}</h3>
      <p className="mt-2 text-body-sm text-on-surface-variant">{description}</p>
    </div>
  );
}

function SustainabilityStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="bg-background p-6">
      <p className="text-h2 font-display text-on-surface">{value}</p>
      <p className="mt-2 text-body-sm text-on-surface-variant">{label}</p>
    </div>
  );
}
