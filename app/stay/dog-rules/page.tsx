import type { Metadata } from "next";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Dog-Friendly Holidays | Whalesborough Farm Resort, Cornwall",
  description:
    "All 27 cottages welcome dogs. Enclosed gardens, welcome packs, luxury bedding, dog shower station and 450 acres of walking trails across the estate.",
};

const inclusions = [
  {
    title: "Pooch Welcome Pack",
    detail:
      "Locally baked treats, a cosy blanket and a stainless-steel water bowl — waiting in your cottage on arrival.",
  },
  {
    title: "Luxury Dog Bedding",
    detail:
      "Memory-foam pet beds in every cottage, positioned in the living area so your dog can settle beside you.",
  },
  {
    title: "Dog Shower Station",
    detail:
      "Warm-water wash-down station near the cottage cluster — rinse off muddy paws before heading inside.",
  },
  {
    title: "Enclosed Gardens",
    detail:
      "Every cottage has a fully enclosed private garden so dogs can roam off-lead in complete safety.",
  },
  {
    title: "450 Acres of Trails",
    detail:
      "Woodland loops, lakeside paths and clifftop routes — all accessible directly from the estate without needing to drive.",
  },
  {
    title: "Dog-Friendly Dining",
    detail:
      "Well-behaved dogs are welcome in the restaurant terrace and bar area. Water bowls provided at every entrance.",
  },
];

const rules = [
  "Dogs must be kept on a lead in all communal areas, car parks and around the lakes.",
  "Please do not allow dogs on beds, sofas or other soft furnishings.",
  "Clean up after your dog immediately — bags are provided at stations around the estate.",
  "Dogs should not be left unattended in accommodation at any time.",
  "A maximum of two dogs per cottage unless agreed in advance with our team.",
  "If your dog causes damage to furnishings or fixtures, a charge may apply.",
  "Dogs are not permitted in the spa, swimming pool or hydrotherapy areas.",
  "Aggressive or excessively noisy dogs may be asked to leave the estate.",
];

export default function DogRulesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">
            Dog-Friendly · All Cottages
          </p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            They are family.{" "}
            <span className="italic">They come too</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Every one of our twenty-seven cottages welcomes dogs. Enclosed
            gardens, welcome packs, luxury bedding and four hundred and fifty
            acres of estate trails — because a proper holiday includes everyone.
          </p>
          <div className="mt-10">
            <LinkArrow href="/stay/availability">
              Book a dog-friendly cottage
            </LinkArrow>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">What&apos;s included</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            The welcome your dog deserves
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
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

      {/* Rules */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-on-surface-muted">Estate rules</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                A few things to know
              </h2>
              <p className="mt-6 max-w-lg text-body-lg text-on-surface-variant">
                We want every guest — two-legged and four — to have a wonderful
                time. These guidelines help us keep the estate safe, clean and
                enjoyable for everyone.
              </p>
            </div>
            <ol className="space-y-4">
              {rules.map((rule, i) => (
                <li key={i} className="flex gap-4 text-body text-on-surface-variant">
                  <span className="shrink-0 text-h3 text-on-surface">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {rule}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Walking Routes */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Walking routes</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            Four hundred and fifty acres to explore
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { name: "Woodland Loop", distance: "1.8 miles", terrain: "Shaded paths through ancient oak woodland. Mostly flat, soft underfoot." },
              { name: "Lakeside Circuit", distance: "2.4 miles", terrain: "Gentle circuit around the three estate lakes. Wildfowl, kingfishers and otters." },
              { name: "Clifftop Trail", distance: "3.6 miles", terrain: "Dramatic coastal path to Widemouth Bay. Some steep sections — leads recommended." },
            ].map((route) => (
              <div key={route.name} className="bg-background p-8">
                <h3 className="text-h3 text-on-surface">{route.name}</h3>
                <p className="mt-1 text-body-sm text-on-surface-muted">
                  {route.distance}
                </p>
                <p className="mt-4 text-body text-on-surface-variant">
                  {route.terrain}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <LinkArrow href="/estate/dog-friendly">
              More dog-friendly activities
            </LinkArrow>
          </div>
        </div>
      </section>
    </>
  );
}
