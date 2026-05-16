import type { Metadata } from "next";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Spa Treatments | The W Club | Whalesborough",
  description:
    "Facials, massage, body rituals and Gaia Natural Skincare treatments. A menu drawn from Cornish botanicals at The W Club Spa.",
};

const facials = [
  {
    name: "The Estate Facial",
    duration: "80 mins",
    description:
      "Our signature. A deep-cleansing, results-driven facial using Gaia botanical serums. Includes scalp massage, facial pressure-point work and a hydrating mask tailored to your skin.",
  },
  {
    name: "Coastal Glow",
    duration: "55 mins",
    description:
      "Gentle exfoliation with mineral-rich sea salts, followed by a vitamin C infusion and LED light therapy. Designed to restore radiance after time outdoors.",
  },
  {
    name: "Express Renewal",
    duration: "30 mins",
    description:
      "A focused cleanse, exfoliation and hydration boost. Ideal before an evening event or as an introduction to the Gaia range.",
  },
];

const massages = [
  {
    name: "Deep Tissue Restoration",
    duration: "90 mins",
    description:
      "Targeted work on chronic tension areas. Firm pressure combined with heated stones on the back and shoulders. Followed by stretching and a cooling balm application.",
  },
  {
    name: "Coastal Calm",
    duration: "60 mins",
    description:
      "A flowing Swedish-style massage using warm Gaia body oil. Long, rhythmic strokes designed to calm the nervous system and ease you into stillness.",
  },
  {
    name: "Back, Neck & Shoulders",
    duration: "30 mins",
    description:
      "Focused relief for the upper body. Ideal after long drives to Cornwall or days spent at a desk. Deep pressure where you carry tension most.",
  },
  {
    name: "Hot Stone Journey",
    duration: "75 mins",
    description:
      "Heated basalt stones placed along the spine and used to massage deep into tissue. The warmth penetrates further than hands alone, releasing held tension layer by layer.",
  },
];

const bodyTreatments = [
  {
    name: "Salt & Oil Body Ritual",
    duration: "60 mins",
    description:
      "Full-body exfoliation with Atlantic sea salts blended with botanical oils. Followed by a warm wrap and moisturising application. Skin feels renewed, soft to the touch.",
  },
  {
    name: "Mud & Mineral Wrap",
    duration: "75 mins",
    description:
      "Mineral-rich marine mud applied to the full body, wrapped in warmth to draw impurities and nourish the skin. Finished with a light massage using Gaia body cream.",
  },
  {
    name: "Pregnancy Massage",
    duration: "60 mins",
    description:
      "Gentle, nurturing bodywork adapted for expectant mothers. Side-lying positioning, light to medium pressure, and products safe for pregnancy. Available from the second trimester.",
  },
];

export default function TreatmentsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">The W Club · Treatments</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Rituals drawn from{" "}
            <span className="italic">Cornish botanicals</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Every treatment on our menu uses Gaia Natural Skincare — formulated
            in Cornwall from plant-based actives. No synthetics, no fragrance
            overload. Just clean ingredients that work with the skin.
          </p>
          <div className="mt-10">
            <Link href="/spa/booking">
              <LinkArrow>Book a treatment</LinkArrow>
            </Link>
          </div>
        </div>
      </section>

      {/* Facials */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">01</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">Facials</h2>
          <p className="mt-4 max-w-2xl text-body-lg text-on-surface-variant">
            Skin analysis, deep cleansing, targeted serums and mask work.
            Each facial is adapted to your skin type on the day.
          </p>
          <div className="mt-12 space-y-10">
            {facials.map((t) => (
              <TreatmentCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* Massage */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">02</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">Massage</h2>
          <p className="mt-4 max-w-2xl text-body-lg text-on-surface-variant">
            From targeted deep tissue to slow, calming strokes. Your therapist
            adjusts pressure throughout — tell them what you need.
          </p>
          <div className="mt-12 space-y-10">
            {massages.map((t) => (
              <TreatmentCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* Body Treatments */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">03</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">Body treatments</h2>
          <p className="mt-4 max-w-2xl text-body-lg text-on-surface-variant">
            Full-body rituals that exfoliate, nourish and restore. Ideal
            mid-stay or as part of a spa day package.
          </p>
          <div className="mt-12 space-y-10">
            {bodyTreatments.map((t) => (
              <TreatmentCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* Gaia Products CTA */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="max-w-2xl">
            <p className="eyebrow text-on-surface-muted">Gaia Natural Skincare</p>
            <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
              Take the ritual home
            </h2>
            <p className="mt-4 text-body-lg text-on-surface-variant">
              Every product used in our treatment rooms is available to purchase.
              Cornish-made, plant-based, refillable where possible.
            </p>
            <div className="mt-8">
              <Link href="/spa/products">
                <LinkArrow>Shop the range</LinkArrow>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function TreatmentCard({
  name,
  duration,
  description,
}: {
  name: string;
  duration: string;
  description: string;
}) {
  return (
    <div className="border-b border-outline-variant pb-8 last:border-0">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="text-h3 text-on-surface">{name}</h3>
        <span className="text-body-sm text-on-surface-muted">{duration}</span>
      </div>
      <p className="mt-3 max-w-2xl text-body text-on-surface-variant">
        {description}
      </p>
    </div>
  );
}
