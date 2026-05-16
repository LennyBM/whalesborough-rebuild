import type { Metadata } from "next";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Holiday Treats & Welcome Hampers | Whalesborough Farm Resort",
  description:
    "Welcome hampers from Neetfield Market Garden, seasonal add-on experiences and thoughtful extras to elevate your Cornish holiday.",
};

const hamperContents = [
  "Organic sourdough loaf from the estate bakery",
  "Free-range eggs from Whalesborough hens",
  "Cornish butter and seasonal preserves",
  "Fresh milk from our Jersey herd",
  "Seasonal fruit and salad leaves from Neetfield Market Garden",
  "Locally roasted coffee and Cornish tea blend",
];

const addOns = [
  {
    title: "Celebration Hamper",
    price: "£65",
    description:
      "Cornish sparkling wine, artisan chocolates, charcuterie board and seasonal flowers — arranged in your cottage before arrival.",
  },
  {
    title: "Cream Tea Basket",
    price: "£28",
    description:
      "Fresh-baked scones, clotted cream, strawberry jam and loose-leaf tea for two. Delivered to your door on your chosen afternoon.",
  },
  {
    title: "BBQ Pack",
    price: "£45",
    description:
      "Estate-reared burgers, sausages, marinated chicken, artisan rolls and seasonal slaw — everything you need for a garden barbecue.",
  },
  {
    title: "Spa & Stay Package",
    price: "From £120pp",
    description:
      "Combine your accommodation with a signature treatment, thermal suite access and a two-course spa lunch.",
  },
  {
    title: "Private Dining Experience",
    price: "From £95pp",
    description:
      "A chef-prepared three-course meal served in your cottage — seasonal menus featuring estate-grown produce and Cornish seafood.",
  },
  {
    title: "Foraging Walk",
    price: "£35pp",
    description:
      "Guided two-hour walk across the estate with our head gardener, identifying seasonal edibles and wild herbs.",
  },
];

const seasonalTreats = [
  {
    season: "Spring",
    treats: "Wild garlic pesto, estate honey, elderflower cordial and asparagus from the walled garden.",
  },
  {
    season: "Summer",
    treats: "Strawberry baskets, homemade lemonade, sun-ripened tomatoes and herb bundles for the barbecue.",
  },
  {
    season: "Autumn",
    treats: "Hedgerow jams, apple juice from the orchard, squash soup kit and damson gin.",
  },
  {
    season: "Winter",
    treats: "Mulled wine spice bags, mince pies, Christmas pudding and a Yule log from the estate bakery.",
  },
];

export default function HolidayTreatsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">
            Holiday Treats · Add-Ons
          </p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            The little things{" "}
            <span className="italic">that make it memorable</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Every stay begins with a welcome hamper from Neetfield Market
            Garden — organic, seasonal and grown within sight of your cottage.
            Add celebration extras, experiences and seasonal treats to make your
            holiday feel truly yours.
          </p>
        </div>
      </section>

      {/* Welcome Hamper */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-on-surface-muted">
                Complimentary with every stay
              </p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Your welcome hamper
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant">
                Sourced from Neetfield Market Garden and the estate farm, your
                hamper is packed the morning of your arrival — so everything is
                as fresh as the Cornish air.
              </p>
              <ul className="mt-8 space-y-3">
                {hamperContents.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-body text-on-surface-variant"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Image placeholder */}
            <div className="aspect-[4/3] bg-surface-container" />
          </div>
        </div>
      </section>

      {/* Add-On Experiences */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Add-on experiences</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            Make it yours
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {addOns.map((item) => (
              <div key={item.title} className="bg-surface-container-low p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-h3 text-on-surface">{item.title}</h3>
                  <span className="shrink-0 text-body-sm text-on-surface-muted">
                    {item.price}
                  </span>
                </div>
                <p className="mt-4 text-body text-on-surface-variant">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <LinkArrow href="/contact">
              Enquire about add-ons
            </LinkArrow>
          </div>
        </div>
      </section>

      {/* Seasonal Treats */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Seasonal rotation</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            What the seasons bring
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            Your hamper changes with the calendar. Here is what to expect
            throughout the year — all grown or made on the estate.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {seasonalTreats.map((item) => (
              <div key={item.season} className="bg-background p-8">
                <h3 className="text-h2 text-on-surface">{item.season}</h3>
                <p className="mt-4 text-body text-on-surface-variant">
                  {item.treats}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
