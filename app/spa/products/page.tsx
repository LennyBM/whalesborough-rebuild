import type { Metadata } from "next";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Gaia Natural Skincare | The W Club | Whalesborough",
  description:
    "Cornish-made botanical skincare. The full Gaia Natural Skincare range used in our treatment rooms — available to purchase at The W Club Spa.",
};

const categories = [
  {
    name: "Face",
    description:
      "Cleansers, serums, moisturisers and masks formulated for all skin types. Plant-based actives sourced from Cornish hedgerows and coastal botanicals.",
    products: [
      "Botanical Cleansing Oil",
      "Vitamin C Brightening Serum",
      "Hydrating Day Cream SPF30",
      "Restorative Night Cream",
      "Marine Mineral Face Mask",
      "Eye Repair Balm",
    ],
  },
  {
    name: "Body",
    description:
      "Rich body oils, nourishing creams and exfoliating scrubs. The same products your therapist uses during body treatments.",
    products: [
      "Atlantic Sea Salt Scrub",
      "Botanical Body Oil",
      "Intensive Body Cream",
      "Hand & Nail Balm",
      "Foot Revival Cream",
      "Stretch Mark Oil",
    ],
  },
  {
    name: "Bath",
    description:
      "Transform an evening bath into a treatment. Mineral soaks, bath oils and shower products that nourish while they cleanse.",
    products: [
      "Mineral Bath Soak",
      "Relaxation Bath Oil",
      "Energising Shower Gel",
      "Conditioning Shampoo",
      "Nourishing Conditioner",
      "Scalp Treatment Oil",
    ],
  },
  {
    name: "Wellbeing",
    description:
      "Candles, pillow sprays and pulse-point oils. Small rituals for home that echo what you felt at the spa.",
    products: [
      "Aromatherapy Candle — Calm",
      "Aromatherapy Candle — Restore",
      "Pillow Mist",
      "Pulse Point Oil — Focus",
      "Pulse Point Oil — Sleep",
      "Room Spray — Estate",
    ],
  },
];

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">The W Club · Products</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Gaia Natural{" "}
            <span className="italic">Skincare</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Every product in our treatment rooms is made in Cornwall from
            plant-based ingredients. No synthetics, no animal testing, minimal
            packaging. Refills available on core products.
          </p>
        </div>
      </section>

      {/* Categories */}
      {categories.map((cat, i) => (
        <section
          key={cat.name}
          className={i % 2 === 0 ? "bg-surface-container-low" : "bg-background"}
        >
          <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
            <p className="eyebrow text-on-surface-muted">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
              {cat.name}
            </h2>
            <p className="mt-4 max-w-2xl text-body-lg text-on-surface-variant">
              {cat.description}
            </p>
            <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cat.products.map((product) => (
                <li
                  key={product}
                  className="bg-background p-6 text-body text-on-surface"
                >
                  {product}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {/* Brand Values */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Values</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            Why Gaia
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            <div>
              <h3 className="text-h3 text-on-surface">Cornish-made</h3>
              <p className="mt-2 text-body text-on-surface-variant">
                Formulated and produced in Cornwall. Short supply chains, local
                employment, minimal transport miles.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Plant-based</h3>
              <p className="mt-2 text-body text-on-surface-variant">
                No parabens, no SLS, no synthetic fragrance. Active ingredients
                derived from plants, marine minerals and essential oils.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Refillable</h3>
              <p className="mt-2 text-body text-on-surface-variant">
                Core products available in refill pouches. Return empties to the
                spa shop for recycling. Less packaging, less waste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Purchase CTA */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="max-w-2xl">
            <h2 className="heading-editorial text-h2 text-on-surface">
              Available at the spa
            </h2>
            <p className="mt-4 text-body-lg text-on-surface-variant">
              Browse the full range in our spa shop or ask your therapist for
              recommendations after your treatment. We can also arrange postal
              delivery for members.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              <Link href="/spa/booking">
                <LinkArrow>Visit the spa</LinkArrow>
              </Link>
              <Link href="/spa/gift-vouchers">
                <LinkArrow>Gift a product set</LinkArrow>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
