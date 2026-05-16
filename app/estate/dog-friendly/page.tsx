import type { Metadata } from "next";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Dog-Friendly | The Estate | Whalesborough",
  description:
    "Every cottage welcomes dogs. Five hundred acres to explore, enclosed gardens, a dog shower station and pooch welcome packs on arrival.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">
            The Estate · Dog-Friendly
          </p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg max-w-4xl text-on-surface">
            Bring the <span className="italic">whole</span> family.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Whalesborough was built with dogs in mind. Not as an afterthought —
            not a grudging surcharge and a laminated list of rules — but as a
            genuine welcome. Every cottage, every trail, every acre is yours
            to share with your dog.
          </p>
        </div>
      </section>

      {/* All cottages welcome */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-hero px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="eyebrow text-on-surface-muted">Accommodation</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Every cottage welcomes dogs
              </h2>
              <p className="mt-6 max-w-lg text-body-lg text-on-surface-variant">
                No restricted properties, no premium charge, no awkward
                conversations at check-in. All twenty-seven cottages are
                dog-friendly as standard. We believe the best holidays are
                shared — and that includes four-legged family members.
              </p>
              <div className="mt-8">
                <LinkArrow href="/stay/cottages">Browse cottages</LinkArrow>
              </div>
            </div>
            <div className="aspect-[4/3] bg-surface-container-high relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display text-display-sm italic text-secondary-fg/40">
                  Dogs Welcome
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The estate for dogs */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Five hundred acres</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            A dog paradise in North Cornwall
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            Five hundred acres of pasture, woodland and lake shore to explore.
            Off-lead walks through the estate. Enclosed gardens at every cottage
            for safe, unsupervised play. And beaches within ten minutes where
            dogs run free year-round.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <DogFeature
              title="500 acres"
              description="Of estate grounds to explore on-lead or off-lead in designated areas"
            />
            <DogFeature
              title="Enclosed gardens"
              description="Every cottage has its own secure outdoor space for safe off-lead time"
            />
            <DogFeature
              title="Dog shower station"
              description="Warm water wash-down for muddy paws before heading back inside"
            />
            <DogFeature
              title="Welcome packs"
              description="Treats, waste bags, a bowl and a local dog-walk guide on arrival"
            />
          </div>
        </div>
      </section>

      {/* What we provide */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-hero px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="aspect-[4/3] bg-surface-container-high relative overflow-hidden lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display text-display-sm italic text-secondary-fg/40">
                  Welcome Pack
                </p>
              </div>
            </div>
            <div className="lg:order-1">
              <p className="eyebrow text-on-surface-muted">On arrival</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                The pooch welcome pack
              </h2>
              <p className="mt-6 max-w-lg text-body-lg text-on-surface-variant">
                Every dog receives their own welcome on arrival. Inside the
                pack you will find locally-made treats, a water bowl, waste bags
                for the duration of your stay and a printed guide to the best
                dog-friendly walks on and around the estate.
              </p>
              <ul className="mt-8 space-y-3 text-body text-on-surface-variant">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Cornish-made dog treats
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Stainless steel water bowl
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Biodegradable waste bags
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Printed dog-walk trail map
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Dog towel for after the shower station
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Practical info */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Good to know</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            The practical details
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h3 className="text-h3 font-display text-on-surface">
                On the estate
              </h3>
              <ul className="mt-4 space-y-3 text-body text-on-surface-variant">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Dogs on leads around the farmyard and animals
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Off-lead permitted on designated trail sections
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Dog shower station open 24 hours
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Waste bins positioned along all main paths
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-h3 font-display text-on-surface">
                Nearby beaches
              </h3>
              <ul className="mt-4 space-y-3 text-body text-on-surface-variant">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Widemouth Bay — dogs welcome year-round on north section
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Crackington Haven — dog-friendly all year
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Sandymouth — National Trust beach, dogs welcome
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  All within 15 minutes of the estate
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12">
            <LinkArrow href="/stay/dog-rules">
              Full dog policy & rules
            </LinkArrow>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32 text-center">
          <p className="eyebrow text-on-surface-muted">Ready to book?</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            Your dog deserves a holiday too
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-body-lg text-on-surface-variant">
            Browse our cottages — every single one welcomes dogs at no extra
            charge. Enclosed gardens, washing facilities and five hundred
            acres of adventure await.
          </p>
          <div className="mt-8 flex justify-center">
            <LinkArrow href="/stay/availability">
              Check availability
            </LinkArrow>
          </div>
        </div>
      </section>
    </>
  );
}

function DogFeature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-surface-container-low p-6">
      <p className="text-h3 font-display text-on-surface">{title}</p>
      <p className="mt-2 text-body-sm text-on-surface-variant">{description}</p>
    </div>
  );
}
