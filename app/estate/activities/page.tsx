import type { Metadata } from "next";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Activities | The Estate | Whalesborough",
  description:
    "Little Farmers sessions, fishing, 450 acres of trails, morning fitness, surfing excursions and an under-6s playroom. Something for every day of your stay.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">
            The Estate · Activities
          </p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg max-w-4xl text-on-surface">
            Every day brings something{" "}
            <span className="italic">different</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Whether it is meeting alpacas at nine, casting a line after lunch or
            watching the sun set from a clifftop trail — the estate offers
            activities for every age, every season and every level of ambition.
          </p>
        </div>
      </section>

      {/* Little Farmers */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-hero px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="eyebrow text-on-surface-muted">
                For young explorers
              </p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Little Farmers
              </h2>
              <p className="mt-6 max-w-lg text-body-lg text-on-surface-variant">
                Twice a week, children join our farm team to feed the animals,
                collect eggs and learn how the estate works. Alpacas, goats,
                pigs, chickens, donkeys and ducks — all within easy reach of
                small hands and big curiosity.
              </p>
              <ul className="mt-8 space-y-3 text-body text-on-surface-variant">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Twice-weekly sessions during school holidays
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Suitable for all ages — toddlers to teens
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Meet Alberto & Alfonzo the alpacas
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Included in your stay — no booking required
                </li>
              </ul>
            </div>
            <div className="aspect-[4/3] bg-surface-container-high relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display text-display-sm italic text-secondary-fg/40">
                  Little Farmers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fishing */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="aspect-[4/3] bg-surface-container-high relative overflow-hidden lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display text-display-sm italic text-secondary-fg/40">
                  Fishing Lake
                </p>
              </div>
            </div>
            <div className="lg:order-1">
              <p className="eyebrow text-on-surface-muted">Lakeside</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Fishing lake
              </h2>
              <p className="mt-6 max-w-lg text-body-lg text-on-surface-variant">
                A quiet morning on the estate lake. Bring your own tackle or ask
                at reception for rod hire. The lake is stocked and surrounded by
                mature trees — one of the most peaceful spots on the entire
                five hundred acres.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Walking & Cycling */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-hero px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Walking & Cycling</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            Four hundred and fifty acres of trails
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            Marked routes cross pasture, skirt the lakes, wind through new
            woodland and climb to clifftop viewpoints where you can see the
            Atlantic stretch to Lundy. Distances range from gentle twenty-minute
            loops to half-day rambles connecting with the South West Coast Path.
          </p>
          <div className="mt-8">
            <LinkArrow href="/estate/map">View the estate map</LinkArrow>
          </div>
        </div>
      </section>

      {/* Morning Fitness */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="eyebrow text-on-surface-muted">Fitness</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Morning circuits
              </h2>
              <p className="mt-6 max-w-lg text-body-lg text-on-surface-variant">
                Every Wednesday at 7am. A guided outdoor circuit using the
                estate landscape — hills, steps, grass. All abilities welcome.
                Finish before breakfast and feel twice as good about the pastries.
              </p>
              <p className="mt-4 text-body text-on-surface-variant">
                £5 per person · Wednesdays 7am · Meet at reception
              </p>
            </div>
            <div className="aspect-[4/3] bg-surface-container-high relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display text-display-sm italic text-secondary-fg/40">
                  Fitness
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Surfing & Paddleboarding */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-hero px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="aspect-[4/3] bg-surface-container-high relative overflow-hidden lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display text-display-sm italic text-secondary-fg/40">
                  Surfing
                </p>
              </div>
            </div>
            <div className="lg:order-1">
              <p className="eyebrow text-on-surface-muted">Nearby excursions</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Surfing & paddleboarding
              </h2>
              <p className="mt-6 max-w-lg text-body-lg text-on-surface-variant">
                Widemouth Bay is ten minutes from the estate gate. We partner
                with local surf schools who offer lessons for beginners and
                board hire for the experienced. Paddleboarding sessions run
                throughout the summer months.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Under 6s Playroom */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Under 6s</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            The playroom
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            Soft play, ride-on tractors, building blocks and a quiet corner for
            stories. The playroom is open daily for guests with young children —
            a rainy-day sanctuary or a mid-afternoon wind-down before bath time.
          </p>
        </div>
      </section>

      {/* Summer extras */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Summer season</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            Tractor rides & seasonal events
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            Through the summer months, tractor rides carry families across the
            estate — through the sunflower fields, past the bee meadows and
            around the new woodland. Keep an eye on the journal for seasonal
            events: pumpkin picking in autumn, lambing in spring.
          </p>
          <div className="mt-8">
            <LinkArrow href="/journal">View the journal</LinkArrow>
          </div>
        </div>
      </section>
    </>
  );
}
