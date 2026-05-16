import type { Metadata } from "next";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Local Area | The Estate | Whalesborough",
  description:
    "Bude is ten minutes away. Widemouth Bay for surfing, Crackington Haven for walks, Tintagel for legend and Padstow for seafood. North Cornwall at its finest.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">
            The Estate · Local Area
          </p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg max-w-4xl text-on-surface">
            Bude & <span className="italic">beyond</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            The estate sits ten minutes from Bude on the North Cornwall coast.
            Surfing beaches, clifftop walks, historic castles and fishing
            harbours are all within easy reach — yet the five hundred acres
            feel a world away from everything.
          </p>
        </div>
      </section>

      {/* Bude */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-hero px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="eyebrow text-on-surface-muted">10 minutes</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Bude
              </h2>
              <p className="mt-6 max-w-lg text-body-lg text-on-surface-variant">
                A proper Cornish coastal town with independent shops, cafes and
                a sea pool carved into the rocks. The canal offers gentle
                paddleboarding and the breakwater is the sunset spot of choice
                for the whole town. Everything you need — and nothing you do not.
              </p>
              <ul className="mt-8 space-y-3 text-body text-on-surface-variant">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Bude Sea Pool — saltwater tidal pool, free entry
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Bude Canal — kayaking, paddleboarding, walking
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Independent shops, galleries and restaurants
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Summerleaze & Crooklets beaches
                </li>
              </ul>
            </div>
            <div className="aspect-[4/3] bg-surface-container-high relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display text-display-sm italic text-secondary-fg/40">
                  Bude
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beaches */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Coastline</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            Beaches & surf
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            North Cornwall has some of the finest surfing beaches in England.
            From gentle family bays to powerful reef breaks, there is a wave
            for every ability — and a stretch of sand for every mood.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <BeachCard
              name="Widemouth Bay"
              distance="10 min"
              description="Two miles of sand, consistent surf and lifeguards throughout summer. Beginner lessons available daily."
            />
            <BeachCard
              name="Crackington Haven"
              distance="12 min"
              description="A dramatic cove beneath towering cliffs. Quieter than Widemouth, perfect for rock-pooling and coastal walks."
            />
            <BeachCard
              name="Sandymouth"
              distance="15 min"
              description="National Trust beach with striking rock formations. Dog-friendly year-round. Wild and beautiful."
            />
            <BeachCard
              name="Summerleaze"
              distance="10 min"
              description="Bude's main beach with the famous sea pool, breakwater and riverside cafe."
            />
            <BeachCard
              name="Duckpool"
              distance="18 min"
              description="A pebble beach at the mouth of a wooded valley. Sheltered, quiet and excellent for wildlife."
            />
            <BeachCard
              name="Northcott Mouth"
              distance="12 min"
              description="Secluded beach beneath the golf course. Low tide reveals acres of sand and fascinating geology."
            />
          </div>
        </div>
      </section>

      {/* Historic sites */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-hero px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">History & legend</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            Castles, harbours & legends
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-16 md:grid-cols-2">
            <DestinationCard
              name="Tintagel Castle"
              distance="25 min"
              description="The legendary birthplace of King Arthur, perched on dramatic cliffs above the Atlantic. English Heritage site with a stunning modern footbridge connecting the headland."
            />
            <DestinationCard
              name="Boscastle"
              distance="20 min"
              description="A medieval harbour village squeezed into a narrow valley. The Museum of Witchcraft, clifftop walks and a blow-hole that performs in heavy seas."
            />
            <DestinationCard
              name="Padstow"
              distance="45 min"
              description="Rick Stein's harbour town. Outstanding seafood restaurants, the Camel Trail cycle path and a working fishing port with genuine charm."
            />
            <DestinationCard
              name="Port Isaac"
              distance="35 min"
              description="Narrow lanes tumble to a tiny harbour. Filming location, fresh crab from the boats and some of the best coastal path walking in Cornwall."
            />
          </div>
        </div>
      </section>

      {/* Activities nearby */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Things to do</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            Activities in the area
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <ActivityCard
              title="Surfing lessons"
              location="Widemouth Bay"
              description="Schools operate daily throughout summer. All equipment provided. Suitable from age 6."
            />
            <ActivityCard
              title="Coasteering"
              location="Various locations"
              description="Cliff jumping, swimming and scrambling along the coast. Guided sessions for all abilities."
            />
            <ActivityCard
              title="South West Coast Path"
              location="Passes the estate"
              description="The 630-mile path runs past Whalesborough. Walk sections in either direction from the gate."
            />
            <ActivityCard
              title="Camel Trail"
              location="Padstow to Bodmin"
              description="A flat, traffic-free cycle path following the old railway. Bike hire available at both ends."
            />
            <ActivityCard
              title="The Eden Project"
              location="50 min"
              description="The world-famous biomes and gardens. A full day out with exhibitions, zip wires and ice skating in winter."
            />
            <ActivityCard
              title="Bodmin Moor"
              location="30 min"
              description="Wild moorland with tors, ancient stone circles and swimming holes. Pack a flask and good boots."
            />
          </div>
        </div>
      </section>

      {/* Getting here */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Getting here</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            Finding Whalesborough
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            The estate is just off the A39 between Bude and Widemouth Bay.
            ANPR gates provide contactless 24/7 access — no keys, no codes,
            just drive in. Four super-fast EV charging points are available
            on site for electric vehicles.
          </p>
          <div className="mt-8">
            <LinkArrow href="/contact/finding-us">
              Directions & travel info
            </LinkArrow>
          </div>
        </div>
      </section>
    </>
  );
}

function BeachCard({
  name,
  distance,
  description,
}: {
  name: string;
  distance: string;
  description: string;
}) {
  return (
    <div>
      <div className="aspect-[3/2] bg-surface-container-high relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-secondary/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-display text-h3 italic text-secondary-fg/40">
            {name}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-h3 font-display text-on-surface">{name}</h3>
        <p className="text-body-sm text-on-surface-muted shrink-0">{distance}</p>
      </div>
      <p className="mt-2 text-body-sm text-on-surface-variant">{description}</p>
    </div>
  );
}

function DestinationCard({
  name,
  distance,
  description,
}: {
  name: string;
  distance: string;
  description: string;
}) {
  return (
    <div>
      <p className="eyebrow text-on-surface-muted">{distance}</p>
      <h3 className="mt-2 text-h2 font-display text-on-surface">{name}</h3>
      <p className="mt-4 text-body text-on-surface-variant">{description}</p>
    </div>
  );
}

function ActivityCard({
  title,
  location,
  description,
}: {
  title: string;
  location: string;
  description: string;
}) {
  return (
    <div className="bg-surface-container-low p-6">
      <h3 className="text-h3 font-display text-on-surface">{title}</h3>
      <p className="mt-1 text-body-sm text-on-surface-muted">{location}</p>
      <p className="mt-3 text-body-sm text-on-surface-variant">{description}</p>
    </div>
  );
}
