import type { Metadata } from "next";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Arvor Suites | Boutique Ecotel, Whalesborough Farm Resort",
  description:
    "Twenty-two contemporary suites overlooking the estate lakes — studio, suite, wetroom, duplex and penthouse configurations with spa access and eco-conscious design.",
};

const suiteTypes = [
  {
    name: "Studio",
    adr: "£97",
    description:
      "Open-plan living with floor-to-ceiling glazing, kitchenette and rainfall shower. Ideal for solo travellers and couples seeking a low-maintenance base between spa sessions and coastal walks.",
    features: ["Lake views", "Kitchenette", "Rainfall shower", "Spa access"],
  },
  {
    name: "Suite",
    adr: "£88",
    description:
      "Generous living space with separate sleeping area, sofa lounge and writing desk. A quiet retreat for guests who value room to breathe without sacrificing proximity to the estate.",
    features: ["Separate lounge", "Writing desk", "Lake views", "Spa access"],
  },
  {
    name: "Wetroom Suite",
    adr: "£77",
    description:
      "Accessibility-first design with a level-access wetroom, grab rails and wider doorways — without compromising on the contemporary aesthetic or lake-facing position.",
    features: ["Level-access wetroom", "Grab rails", "Wider doorways", "Ground floor"],
  },
  {
    name: "Duplex",
    adr: "£185",
    description:
      "Split-level living across two floors: a double-height lounge below and a mezzanine bedroom above, connected by an open timber stair. Designed for guests who want space and drama.",
    features: ["Double-height lounge", "Mezzanine bedroom", "Timber stair", "Premium lake view"],
  },
  {
    name: "Penthouse",
    adr: "£181",
    description:
      "The uppermost suites with panoramic views across the lakes to the coast beyond. Private balcony, premium fixtures and a sense of elevation — in every sense of the word.",
    features: ["Panoramic balcony", "Premium fixtures", "Coastal views", "Top floor"],
  },
];

export default function ArvorSuitesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">
            Arvor Suites · 22 Units
          </p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Contemporary living,{" "}
            <span className="italic">considered design</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Twenty-two open-plan suites built with cross-laminated timber,
            triple-glazed lake-facing windows and a near-zero carbon footprint.
            Modern comfort without the environmental cost — that is what Arvor
            means to us.
          </p>
          <div className="mt-10">
            <LinkArrow href="/stay/availability">
              Check availability
            </LinkArrow>
          </div>
        </div>
      </section>

      {/* Eco Credentials */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Eco-conscious design</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            Built for the future
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Cross-Laminated Timber", detail: "Structural CLT frame sequesters carbon throughout the building's lifetime, replacing traditional steel and concrete." },
              { title: "Triple Glazing", detail: "Floor-to-ceiling windows insulate against Cornish winds while maximising natural daylight and passive solar gain." },
              { title: "Air Source Heat Pumps", detail: "All heating and hot water supplied by ground- and air-source pumps — no fossil fuels on site." },
              { title: "Sedum Roofs", detail: "Living roofs absorb rainfall, insulate the building and provide habitat for pollinators across the estate." },
              { title: "EV Charging", detail: "Four super-fast charging points in the Arvor car park, available to all suite guests at no additional cost." },
              { title: "Spa Access Included", detail: "Every suite guest receives complimentary access to the hydrotherapy pool, thermal suite and fitness studio." },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="text-h3 text-on-surface">{item.title}</h3>
                <p className="mt-3 text-body text-on-surface-variant">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suite Types */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Five configurations</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            Choose your suite
          </h2>
          <div className="mt-16 space-y-16">
            {suiteTypes.map((suite) => (
              <div
                key={suite.name}
                className="grid grid-cols-1 gap-8 lg:grid-cols-3"
              >
                {/* Image placeholder */}
                <div className="aspect-[4/3] bg-surface-container lg:col-span-1" />
                {/* Content */}
                <div className="lg:col-span-2">
                  <div className="flex items-baseline gap-4">
                    <h3 className="text-h2 text-on-surface">{suite.name}</h3>
                    <span className="text-body-sm text-on-surface-muted">
                      from {suite.adr} per night
                    </span>
                  </div>
                  <p className="mt-4 max-w-xl text-body-lg text-on-surface-variant">
                    {suite.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-3">
                    {suite.features.map((f) => (
                      <li
                        key={f}
                        className="bg-surface-container-low px-4 py-2 text-body-sm text-on-surface"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32 text-center">
          <h2 className="heading-editorial text-h1 text-on-surface">
            Ready to book your suite?
          </h2>
          <p className="mt-6 mx-auto max-w-xl text-body-lg text-on-surface-variant">
            Arvor Suites are available year-round. Check live availability and
            secure your preferred dates with a low deposit.
          </p>
          <div className="mt-10 flex justify-center gap-6">
            <LinkArrow href="/stay/availability">
              Check availability
            </LinkArrow>
          </div>
        </div>
      </section>
    </>
  );
}
