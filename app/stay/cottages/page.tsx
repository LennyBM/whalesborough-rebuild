import type { Metadata } from "next";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Heritage Cottages | 5★ Gold Dog-Friendly Cottages, Bude Cornwall",
  description:
    "Twenty-seven individually designed cottages across 500 acres. Grade II listed farmhouse, private hot tubs, enclosed gardens, all dog-friendly. VisitEngland 5-Star Gold.",
};

export default function CottagesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">
            Accommodation · 27 cottages
          </p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Stone, slate and{" "}
            <span className="italic">six centuries of story</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Twenty-seven cottages scattered across five hundred acres of working
            farmland. From a Grade II listed 14th-century farmhouse to converted
            barns with clifftop views — each property has its own character,
            garden and key to the estate.
          </p>
          <div className="mt-10 flex flex-wrap gap-6">
            <LinkArrow href="/stay/availability">
              Check availability
            </LinkArrow>
            <LinkArrow href="/estate/dog-friendly">
              Dog-friendly info
            </LinkArrow>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-hero px-6 py-20 lg:px-12 lg:py-32">
          <div className="aspect-[16/7] bg-surface-container-high relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-display text-display-sm italic text-secondary-fg/40">
                Cottage Collection
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow text-on-surface-muted">The collection</p>
              <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
                No two the same
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-body-lg text-on-surface-variant">
                Every cottage has been individually designed — not decorated
                from a catalogue. Interiors draw on the building&apos;s history:
                exposed beams in the 14th-century farmhouse, vaulted ceilings in
                the converted barns, panoramic glazing where the coastline
                demands attention.
              </p>
              <p className="mt-4 text-body text-on-surface-variant">
                All twenty-seven properties carry VisitEngland 5-Star Gold
                accreditation. Each has an enclosed private garden, luxury
                bedding, a fully equipped kitchen, and the kind of quiet that
                only five hundred acres can provide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Properties */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Signature properties</p>
          <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
            Estate <span className="italic">favourites</span>
          </h2>
          <p className="mt-6 max-w-2xl text-body text-on-surface-variant">
            From a medieval farmhouse to clifftop retreats, these are the
            properties guests ask for by name.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            <CottageCard
              name="Whalesborough Farmhouse"
              detail="Grade II listed · 14th century · Sleeps 8"
              description="The original heart of the estate. Flagstone floors, inglenook fireplaces, and walled gardens — six centuries of Cornish history, impeccably restored."
            />
            <CottageCard
              name="Whalesborough Cottage"
              detail="Hot tub · Sleeps 6 · Enclosed garden"
              description="Directly adjacent to the farmhouse with its own private hot tub and south-facing garden. The most requested property on the estate."
            />
            <CottageCard
              name="Calf House"
              detail="Converted barn · Sleeps 4 · Vaulted ceiling"
              description="A former calf pen reimagined as a light-filled retreat. Double-height living space, original stonework, and views across the upper meadow."
            />
            <CottageCard
              name="Eagles Nest"
              detail="Clifftop position · Sleeps 6 · Sea views"
              description="The estate's most elevated property, perched above the coastal path. Uninterrupted views to Lundy Island. Wake to the sound of waves below."
            />
            <CottageCard
              name="Beachcombers"
              detail="Coastal · Sleeps 4 · Dog-friendly"
              description="Steps from the cliff path and minutes from Widemouth Bay. A compact coastal hideaway with an enclosed garden perfect for sandy paws."
            />
            <CottageCard
              name="Moleyns"
              detail="Hot tub · Sleeps 6 · Woodland setting"
              description="Tucked into the estate's ancient woodland with a private hot tub beneath the tree canopy. The most secluded property in the collection."
            />
          </div>
        </div>
      </section>

      {/* Dog-Friendly Feature */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="eyebrow text-on-surface-muted">
                Dog-friendly estate
              </p>
              <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
                Designed for{" "}
                <span className="italic">the whole pack</span>
              </h2>
              <p className="mt-6 text-body text-on-surface-variant">
                All twenty-seven cottages welcome dogs — no supplements, no
                compromise. Every property has an enclosed garden so your dog
                can roam freely. On arrival, find luxury dog bedding, a pooch
                welcome pack with Cornish treats, and towels for muddy-paw
                days.
              </p>
              <p className="mt-4 text-body text-on-surface-variant">
                The estate offers five hundred acres of walks — from lake
                circuits to clifftop paths — plus a dedicated dog shower station
                for post-beach returns. Widemouth Bay, dog-friendly year-round,
                is a ten-minute walk through the grounds.
              </p>
              <div className="mt-8">
                <LinkArrow href="/estate/dog-friendly">
                  Dog-friendly guide
                </LinkArrow>
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="aspect-[3/4] bg-surface-container-high relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="font-display text-display-sm italic text-secondary-fg/40">
                    Dogs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hot Tub Feature */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="order-2 lg:order-1 lg:col-span-5">
              <div className="aspect-[4/5] bg-surface-container-high relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="font-display text-display-sm italic text-secondary-fg/40">
                    Hot Tubs
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
              <p className="eyebrow text-on-surface-muted">Seven hot tubs</p>
              <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
                Starlight, steam and{" "}
                <span className="italic">absolute silence</span>
              </h2>
              <p className="mt-6 text-body text-on-surface-variant">
                Seven cottages include private hot tubs — from woodland settings
                beneath ancient oaks to open positions with sea views toward
                Lundy Island. No light pollution, no neighbours, nothing between
                you and the Cornish sky.
              </p>
              <ul className="mt-6 space-y-2 text-body-sm text-on-surface-variant">
                <li>Whalesborough Cottage · South-facing garden</li>
                <li>Moleyns · Woodland canopy</li>
                <li>Sheep&apos;s House · Meadow outlook</li>
                <li>Jack&apos;s House · Estate views</li>
                <li>Windy Hills Spa · Clifftop position</li>
                <li>Warrens Spa · Lakeside setting</li>
                <li>Long Down Spa · Valley floor</li>
              </ul>
              <div className="mt-8">
                <LinkArrow href="/stay/availability">
                  View hot tub properties
                </LinkArrow>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted text-center">
            At a glance
          </p>
          <h2 className="heading-editorial mt-4 text-h2 text-on-surface text-center">
            Cottage essentials
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="Properties" value="27" />
            <Fact label="Hot tubs" value="7" />
            <Fact label="VisitEngland" value="5★ Gold" />
            <Fact label="Dogs" value="All welcome" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32 text-center">
          <p className="eyebrow text-on-surface-muted">Book your cottage</p>
          <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
            Find your dates
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-body text-on-surface-variant">
            Friday and Monday arrivals, with seven-night stays the most popular
            rhythm. Browse the full collection and secure your preferred week.
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

function CottageCard({
  name,
  detail,
  description,
}: {
  name: string;
  detail: string;
  description: string;
}) {
  return (
    <div className="group">
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
      <p className="eyebrow mt-2 text-on-surface-muted">{detail}</p>
      <p className="mt-3 text-body-sm text-on-surface-variant">{description}</p>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="heading-editorial text-h2 text-on-surface">{value}</p>
      <p className="eyebrow mt-2 text-on-surface-muted">{label}</p>
    </div>
  );
}
