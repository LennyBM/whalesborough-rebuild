import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Spa Treatments | The W Club | Whalesborough",
  description:
    "Massage, facials, body rituals and couples packages at The W Club Spa. Treatments from £50, using Cornish botanicals on a 500-acre private estate.",
};

/* ─── Treatment data ─────────────────────────────────────────────── */

interface Treatment {
  name: string;
  options: { duration: string; price: number }[];
  description?: string;
}

interface Category {
  title: string;
  from: number;
  intro: string;
  treatments: Treatment[];
}

const categories: Category[] = [
  {
    title: "Massage & Body",
    from: 75,
    intro:
      "Hands-on bodywork tailored to you. Your therapist adjusts pressure, pace and focus throughout — just tell them what you need.",
    treatments: [
      {
        name: "Coastal Deep Tissue",
        options: [
          { duration: "60 min", price: 85 },
          { duration: "90 min", price: 115 },
        ],
      },
      {
        name: "Cornish Hot Stone Ritual",
        options: [{ duration: "75 min", price: 95 }],
      },
      {
        name: "Restorative Back & Shoulders",
        options: [
          { duration: "30 min", price: 50 },
          { duration: "60 min", price: 75 },
        ],
      },
      {
        name: "Pregnancy Nurture",
        options: [{ duration: "60 min", price: 85 }],
      },
      {
        name: "Sports Recovery",
        options: [{ duration: "60 min", price: 85 }],
      },
    ],
  },
  {
    title: "Facials",
    from: 65,
    intro:
      "Skin analysis, deep cleansing, targeted serums and mask work. Each facial is adapted to your skin on the day.",
    treatments: [
      {
        name: "The Whalesborough Glow",
        options: [{ duration: "60 min", price: 85 }],
      },
      {
        name: "Deep Cleanse & Renewal",
        options: [{ duration: "45 min", price: 65 }],
      },
      {
        name: "Age-Defying Intensive",
        options: [{ duration: "75 min", price: 110 }],
      },
      {
        name: "Men's Skin Reset",
        options: [{ duration: "45 min", price: 65 }],
      },
    ],
  },
  {
    title: "Rituals & Journeys",
    from: 120,
    intro:
      "Extended, multi-stage experiences that combine techniques into a single uninterrupted session. No clock-watching — just immersion.",
    treatments: [
      {
        name: "Estate Immersion",
        options: [{ duration: "120 min", price: 165 }],
        description: "Full body scrub, wrap, massage and facial",
      },
      {
        name: "Coastal Detox Journey",
        options: [{ duration: "90 min", price: 120 }],
        description: "Sea-salt scrub, mud wrap and scalp massage",
      },
      {
        name: "The Sunset Ritual",
        options: [{ duration: "150 min", price: 195 }],
        description: "Our signature — ends at golden hour",
      },
    ],
  },
  {
    title: "Couples",
    from: 180,
    intro:
      "Side-by-side treatments in our dual suite. Arrive together, leave together — everything in between is taken care of.",
    treatments: [
      {
        name: "Side by Side",
        options: [{ duration: "60 min", price: 180 }],
        description: "Dual massage in our couples suite",
      },
      {
        name: "Celebration Package",
        options: [{ duration: "120 min", price: 295 }],
        description: "Dual treatment, prosecco and private suite",
      },
    ],
  },
];

/* ─── Page ────────────────────────────────────────────────────────── */

export default function TreatmentsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">
            The W Club · Treatments
          </p>
          <h1 className="heading-editorial mt-6 max-w-4xl text-display-md text-on-surface md:text-display-lg lg:text-display-xl">
            A menu drawn from{" "}
            <span className="italic">Cornish botanicals</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Every treatment uses plant-based actives formulated in Cornwall. No
            synthetics, no fragrance overload — just clean ingredients that work
            with the skin.
          </p>
          <div className="mt-10">
            <Link href="/spa/booking">
              <LinkArrow>Book a treatment</LinkArrow>
            </Link>
          </div>
        </div>
      </section>

      {/* Image band */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 lg:px-12">
          <div className="relative aspect-[21/9] w-full overflow-hidden">
            <Image
              src="/images/spa/spa-treatment.webp"
              alt="Treatment room at The W Club Spa"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
          </div>
        </div>
      </section>

      {/* Treatment categories */}
      {categories.map((category, idx) => (
        <section
          key={category.title}
          className={idx % 2 === 0 ? "bg-surface-container-low" : "bg-background"}
        >
          <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="eyebrow text-on-surface-muted">
                  {String(idx + 1).padStart(2, "0")}
                </p>
                <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                  {category.title}
                </h2>
              </div>
              <p className="text-body text-on-surface-muted">
                From £{category.from}
              </p>
            </div>
            <p className="mt-4 max-w-2xl text-body-lg text-on-surface-variant">
              {category.intro}
            </p>

            <div className="mt-14 space-y-0">
              {category.treatments.map((treatment) => (
                <TreatmentRow key={treatment.name} treatment={treatment} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="bg-surface-container">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow text-on-surface-muted">Ready to book?</p>
            <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
              Your time on the estate starts here.
            </h2>
            <p className="mt-4 text-body-lg text-on-surface-variant">
              Treatments are available to estate guests and day visitors. We
              recommend booking at least 48 hours in advance, especially for
              weekend and school holiday dates.
            </p>
            <div className="mt-8">
              <Link href="/spa/booking">
                <LinkArrow>Book a treatment</LinkArrow>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Treatment row ───────────────────────────────────────────────── */

function TreatmentRow({ treatment }: { treatment: Treatment }) {
  return (
    <div className="border-b border-outline-variant py-6 last:border-b-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <h3 className="text-h3 text-on-surface">{treatment.name}</h3>
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          {treatment.options.map((opt) => (
            <span
              key={opt.duration}
              className="whitespace-nowrap text-body text-on-surface-muted"
            >
              {opt.duration} — £{opt.price}
            </span>
          ))}
        </div>
      </div>
      {treatment.description && (
        <p className="mt-2 text-body text-on-surface-variant">
          {treatment.description}
        </p>
      )}
    </div>
  );
}
