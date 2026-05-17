import type { Metadata } from "next";
import Image from "next/image";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Arvor Suites | Contemporary Accommodation, Whalesborough Farm Resort",
  description:
    "Twenty-two contemporary suites with open-plan living, balconies and panoramic Cornish views. Standard suites from £150/night, family suites from £195/night. Spa access and breakfast included.",
};

const suiteTypes = [
  {
    name: "Standard Suite",
    sleeps: "2 guests",
    bedrooms: "1 bedroom",
    price: "£150",
    image: "/images/arvor/arvor-double-bedroom.webp",
    description:
      "A generous open-plan suite with king-size bedroom, living area and private balcony overlooking the estate lakes. Designed for couples seeking hotel-like comfort with the freedom to self-cater.",
    features: [
      "King-size bed",
      "Open-plan living",
      "Kitchenette",
      "Private balcony",
      "Panoramic views",
      "Spa pool access",
    ],
  },
  {
    name: "Family Suite",
    sleeps: "4 guests",
    bedrooms: "2 bedrooms",
    price: "£195",
    image: "/images/arvor/arvor-twin-bedroom.webp",
    description:
      "Two bedrooms — one double, one twin — connected by a spacious living area with dining table and full kitchenette. A private terrace gives families room to breathe after days exploring the coast.",
    features: [
      "Double & twin bedrooms",
      "Open-plan living & dining",
      "Full kitchenette",
      "Private terrace",
      "Panoramic views",
      "Spa pool access",
    ],
  },
];

const inclusions = [
  {
    title: "Breakfast at The Weir",
    detail:
      "Start each morning with a full Cornish breakfast at The Weir restaurant — locally sourced, cooked to order, included in every stay.",
  },
  {
    title: "Spa Pool Access",
    detail:
      "Complimentary access to the hydrotherapy pool, steam room and thermal suite throughout your stay. No booking required.",
  },
  {
    title: "500-Acre Estate",
    detail:
      "Walk the woodland trails, fish the lakes, or simply sit by the water. The entire estate is yours to explore from the moment you arrive.",
  },
  {
    title: "Parking & Wi-Fi",
    detail:
      "Dedicated parking outside Arvor with EV charging points, plus high-speed Wi-Fi throughout the building and across the estate.",
  },
];

export default function ArvorSuitesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-background">
        <div className="relative aspect-[16/7] w-full overflow-hidden">
          <Image
            src="/images/arvor/arvor-banner.webp"
            alt="Arvor Suites exterior — contemporary architecture set against the Cornish landscape"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-content px-6 pb-12 lg:px-12 lg:pb-20">
            <p className="eyebrow text-white/80">Stay · Arvor Suites</p>
            <h1 className="heading-editorial mt-4 text-display-md md:text-display-lg lg:text-display-xl text-white">
              Arvor Suites
            </h1>
          </div>
        </div>
      </section>

      {/* Editorial Intro */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="eyebrow text-on-surface-muted">
                22 Contemporary Suites
              </p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Modern design,{" "}
                <span className="italic">panoramic perspective</span>
              </h2>
              <p className="mt-8 text-body-lg text-on-surface-variant">
                Purpose-built with clean lines and generous glazing, Arvor brings
                a contemporary sensibility to the Cornish countryside. Each suite
                opens onto private outdoor space — balcony or terrace — framing
                views across the estate lakes to the coast beyond.
              </p>
              <p className="mt-6 text-body text-on-surface-variant">
                The design philosophy is simple: hotel-like convenience with
                self-catering flexibility. Open-plan living flows into a fitted
                kitchenette, so you can make morning coffee on your own terms or
                head downstairs for a full breakfast at The Weir. No compromise
                required.
              </p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/arvor/arvor-living-room-balcony.webp"
                alt="Arvor suite living room with floor-to-ceiling windows and balcony views"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative aspect-[4/3] overflow-hidden md:col-span-2 lg:col-span-2 lg:row-span-2 lg:aspect-auto lg:h-full">
              <Image
                src="/images/arvor/arvor-exterior.webp"
                alt="Arvor Suites building exterior with landscaped gardens"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/arvor/arvor-lounge-dining.webp"
                alt="Open-plan lounge and dining area inside an Arvor suite"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/arvor/arvor-dining-panoramic-view.webp"
                alt="Dining area with panoramic views of the Cornish countryside"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/arvor/arvor-champagne-welcome.webp"
                alt="Champagne welcome for arriving guests"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden md:col-span-2">
              <Image
                src="/images/arvor/arvor-suites-exterior.webp"
                alt="Arvor Suites viewed from the estate grounds"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Suite Types */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Two configurations</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            Choose your suite
          </h2>
          <div className="mt-16 space-y-20">
            {suiteTypes.map((suite) => (
              <div
                key={suite.name}
                className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={suite.image}
                    alt={`${suite.name} interior`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-h2 text-on-surface">{suite.name}</h3>
                  <div className="mt-3 flex flex-wrap gap-4 text-body-sm text-on-surface-muted">
                    <span>{suite.bedrooms}</span>
                    <span>·</span>
                    <span>Sleeps {suite.sleeps}</span>
                    <span>·</span>
                    <span>From {suite.price}/night</span>
                  </div>
                  <p className="mt-6 text-body-lg text-on-surface-variant">
                    {suite.description}
                  </p>
                  <ul className="mt-8 grid grid-cols-2 gap-3">
                    {suite.features.map((f) => (
                      <li
                        key={f}
                        className="text-body text-on-surface-variant"
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

      {/* What's Included */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Every stay includes</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            More than a room
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
            {inclusions.map((item) => (
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

      {/* CTA */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32 text-center">
          <h2 className="heading-editorial text-h1 text-on-surface">
            Ready to book your suite?
          </h2>
          <p className="mt-6 mx-auto max-w-xl text-body-lg text-on-surface-variant">
            Arvor Suites are available year-round. Standard suites from
            £150/night, family suites from £195/night. Check live availability
            and secure your preferred dates with a low deposit.
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
