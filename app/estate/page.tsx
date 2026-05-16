import type { Metadata } from "next";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "The Estate | Whalesborough",
  description:
    "Five hundred acres of North Cornwall countryside — pasture, woodland, lakes and clifftop. A working farm where alpacas roam, bees hum and trails disappear into the hedgerows.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">The Estate · 500 Acres</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Five hundred acres of{" "}
            <span className="italic">North Cornwall</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Pasture rolls to clifftop. Lakes reflect the clouds. Alpacas graze
            beside ancient hedgerows while bees work the wildflower margins.
            This is a working estate — farmed, walked, lived in — and every
            guest is welcome to explore it.
          </p>
        </div>
      </section>

      {/* Activities overview */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-hero px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="eyebrow text-on-surface-muted">Things to do</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Activities across the estate
              </h2>
              <p className="mt-6 max-w-lg text-body-lg text-on-surface-variant">
                Little Farmers sessions twice a week. A stocked fishing lake.
                Four hundred and fifty acres of trails for walking or cycling.
                Morning fitness circuits. Surfing excursions to Widemouth Bay.
                A soft-play room for under sixes. There is always something
                to do — or nothing at all.
              </p>
              <div className="mt-8">
                <LinkArrow href="/estate/activities">
                  View all activities
                </LinkArrow>
              </div>
            </div>
            <div className="aspect-[4/3] bg-surface-container-high relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display text-display-sm italic text-secondary-fg/40">
                  Activities
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Farm animals */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">The working farm</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            A farm shaped by the seasons
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            Neetfield Market Garden supplies the restaurant with organic produce
            year-round. Alberto and Alfonzo the alpacas hold court beside the
            lake. Goats, pigs, chickens, donkeys and ducks make the estate feel
            alive — and give children reason to pull on their wellies every
            morning.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            <AnimalCard
              title="Alpacas"
              description="Alberto & Alfonzo — gentle, inquisitive, always camera-ready."
            />
            <AnimalCard
              title="Goats & Pigs"
              description="Friendly faces at the farm gate, always eager for visitors."
            />
            <AnimalCard
              title="Chickens & Ducks"
              description="Free-ranging across the farmyard, supplying eggs to the kitchen."
            />
          </div>
          <div className="mt-10">
            <LinkArrow href="/estate/farm">Explore the farm</LinkArrow>
          </div>
        </div>
      </section>

      {/* Trails */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-hero px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="aspect-[3/4] bg-surface-container-high relative overflow-hidden lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display text-display-sm italic text-secondary-fg/40">
                  Trails
                </p>
              </div>
            </div>
            <div className="lg:order-1">
              <p className="eyebrow text-on-surface-muted">Walking & cycling</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Four hundred and fifty acres of trails
              </h2>
              <p className="mt-6 max-w-lg text-body-lg text-on-surface-variant">
                Marked routes wind through pasture, skirt the fishing lake and
                climb to viewpoints where you can see the Atlantic. Bring bikes
                or borrow the estate map and choose your distance — from a
                twenty-minute stroll to a half-day ramble.
              </p>
              <div className="mt-8">
                <LinkArrow href="/estate/map">View the estate map</LinkArrow>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability tease */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Sustainability</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            Farming for the next generation
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-3">
            <StatCard value="60KW" label="Wind turbine capacity" />
            <StatCard value="15,000" label="Cornish Black Bees" />
            <StatCard value="50 acres" label="New native woodland" />
          </div>
          <p className="mt-10 max-w-2xl text-body text-on-surface-variant">
            Cleaner Seas microplastic filters in every drain. Biomass boiler and
            air-source heat pumps across the lodges. Nine thousand sunflowers
            for the pollinators. Cornwall Tourism Gold 2024/25.
          </p>
          <div className="mt-8">
            <LinkArrow href="/about/sustainability">
              Our sustainability story
            </LinkArrow>
          </div>
        </div>
      </section>

      {/* Dog-friendly + local area links */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-hero px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <FeatureLink
              href="/estate/dog-friendly"
              eyebrow="Dog-friendly"
              title="Bring the whole family"
              description="Every cottage welcomes dogs. Five hundred acres of enclosed grounds, a dog shower station, and pooch welcome packs on arrival."
            />
            <FeatureLink
              href="/estate/local-area"
              eyebrow="Local area"
              title="Bude & beyond"
              description="Ten minutes to Bude. Widemouth Bay for surfing. Tintagel, Boscastle and Padstow within easy reach."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function AnimalCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="aspect-square bg-surface-container-high relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-secondary/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-display text-h3 italic text-secondary-fg/40">
            {title}
          </p>
        </div>
      </div>
      <h3 className="mt-4 text-h3 font-display text-on-surface">{title}</h3>
      <p className="mt-2 text-body-sm text-on-surface-variant">{description}</p>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-surface-container-low p-8">
      <p className="text-display-md font-display text-on-surface">{value}</p>
      <p className="mt-2 text-body-sm text-on-surface-variant">{label}</p>
    </div>
  );
}

function FeatureLink({
  href,
  eyebrow,
  title,
  description,
}: {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Link href={href} className="group block">
      <div className="aspect-[3/2] bg-surface-container-high relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-display text-display-sm italic text-secondary-fg/40">
            {title}
          </p>
        </div>
      </div>
      <p className="eyebrow mt-6 text-on-surface-muted">{eyebrow}</p>
      <h3 className="heading-editorial mt-3 text-h2 text-on-surface group-hover:text-primary transition-colors duration-fast ease-out-luxury">
        {title}
      </h3>
      <p className="mt-3 max-w-md text-body text-on-surface-variant">
        {description}
      </p>
      <div className="mt-6">
        <LinkArrow href={href}>Discover more</LinkArrow>
      </div>
    </Link>
  );
}
