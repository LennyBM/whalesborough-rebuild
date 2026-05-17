import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Spa Day Packages | The W Club | Whalesborough",
  description:
    "Four spa day packages from £95. Full-day access to pools, thermal suite, hot tubs and treatments at The W Club Spa, Whalesborough Farm Resort, Cornwall.",
  openGraph: {
    title: "Spa Day Packages | The W Club | Whalesborough",
    description:
      "Four spa day packages from £95. Full-day access to pools, thermal suite, hot tubs and treatments.",
  },
};

const packages = [
  {
    name: "The Escape",
    price: "£95",
    pricePer: "per person",
    popular: false,
    includes: [
      "Full day access (9am–5pm)",
      "15m indoor pool & thermal suite",
      "Outdoor hot tubs",
      "Gym access",
      "Robe & towels provided",
    ],
    extra: "Add a two-course lunch for £25",
    description:
      "The foundation. A full day of water, warmth and space — designed for those who want to move at their own pace without a fixed itinerary.",
  },
  {
    name: "The Renew",
    price: "£145",
    pricePer: "per person",
    popular: true,
    includes: [
      "Everything in The Escape",
      "60-minute treatment (massage or facial)",
      "Cornish cream tea",
    ],
    extra: null,
    description:
      "Our most popular choice. A treatment, a proper cream tea, and hours of pool time either side. Enough structure to feel indulgent, enough freedom to feel unhurried.",
  },
  {
    name: "The Immerse",
    price: "£195",
    pricePer: "per person",
    popular: false,
    includes: [
      "Everything in The Escape",
      "90-minute Coastal Detox Journey treatment",
      "Two-course lunch at The Weir",
      "Glass of Cornish sparkling wine",
    ],
    extra: null,
    description:
      "Our most complete day. A signature treatment built around the Cornish coast, a long lunch, and a glass of something local to mark the occasion.",
  },
  {
    name: "Couples Retreat",
    price: "£350",
    pricePer: "per pair",
    popular: false,
    includes: [
      "Private suite for two",
      "60-minute side-by-side massage",
      "Full spa access all day",
      "Prosecco & chocolate truffles",
      "Two-course lunch for two",
    ],
    extra: null,
    description:
      "Shared time, separate from the world. A private treatment suite, a long lunch, and an entire day to be together without distraction.",
  },
];

export default function SpaDaysPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-background overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/spa/pool.webp"
            alt="The indoor pool at The W Club Spa"
            fill
            className="object-cover opacity-15"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">
            The W Club · Spa Days
          </p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            A day designed around{" "}
            <span className="italic">doing less</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Arrive in the morning, leave in the evening. In between: warm water,
            good food, skilled hands and enough silence to hear yourself think
            again. Four packages from £95 per person.
          </p>
          <div className="mt-10">
            <Link href="/spa/booking">
              <LinkArrow>Book a spa day</LinkArrow>
            </Link>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="mb-16 max-w-2xl">
            <p className="eyebrow text-on-surface-muted">Packages</p>
            <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
              Choose your day
            </h2>
            <p className="mt-4 text-body-lg text-on-surface-variant">
              Every package includes full access to the 15-metre pool, thermal
              suite, outdoor hot tubs, gym and relaxation spaces. Robes and
              towels are always provided.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {packages.map((pkg) => (
              <article
                key={pkg.name}
                className={`relative flex flex-col p-8 lg:p-10 transition-colors ${
                  pkg.popular
                    ? "bg-surface-container shadow-sm ring-1 ring-primary/10"
                    : "bg-background"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute top-6 right-6 text-xs font-medium uppercase tracking-widest text-primary">
                    Most popular
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="heading-editorial text-h2 text-on-surface">
                    {pkg.name}
                  </h3>
                  <p className="mt-2 text-body text-on-surface-variant">
                    {pkg.description}
                  </p>
                </div>

                <div className="mb-6 flex items-baseline gap-2">
                  <span className="text-h2 text-on-surface font-semibold">
                    {pkg.price}
                  </span>
                  <span className="text-body text-on-surface-muted">
                    {pkg.pricePer}
                  </span>
                </div>

                <div className="mb-8 flex-1">
                  <p className="text-xs font-medium uppercase tracking-widest text-on-surface-muted mb-4">
                    What&apos;s included
                  </p>
                  <ul className="space-y-3">
                    {pkg.includes.map((item) => (
                      <li
                        key={item}
                        className="text-body text-on-surface-variant pl-5 relative before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:bg-primary/40 before:content-['']"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  {pkg.extra && (
                    <p className="mt-4 text-body text-on-surface-muted italic pl-5">
                      {pkg.extra}
                    </p>
                  )}
                </div>

                <div className="mt-auto">
                  <Link href="/spa/booking">
                    <LinkArrow>Book this package</LinkArrow>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Image */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/spa/spa-treatment.webp"
                alt="A treatment room at The W Club Spa"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="eyebrow text-on-surface-muted">The experience</p>
              <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
                Treatments built around the coast
              </h2>
              <p className="mt-4 text-body-lg text-on-surface-variant">
                Every treatment draws on Cornish ingredients — sea salt, coastal
                botanicals, mineral-rich clays — applied with techniques designed
                to release tension carried in the shoulders, lower back and jaw.
              </p>
              <p className="mt-4 text-body text-on-surface-variant">
                Our signature Coastal Detox Journey combines dry body brushing, a
                full-body wrap, and a deep-tissue massage into a single
                90-minute treatment that leaves you feeling genuinely different.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Info */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
            <div>
              <p className="eyebrow text-on-surface-muted">Opening hours</p>
              <h3 className="heading-editorial mt-4 text-h3 text-on-surface">
                Day guest access
              </h3>
              <p className="mt-4 text-body text-on-surface-variant">
                Spa day guests can access facilities from 9am to 5pm. We
                recommend arriving 15 minutes before your first treatment to
                settle in.
              </p>
            </div>
            <div>
              <p className="eyebrow text-on-surface-muted">Booking</p>
              <h3 className="heading-editorial mt-4 text-h3 text-on-surface">
                How to book
              </h3>
              <p className="mt-4 text-body text-on-surface-variant">
                Book online for the best availability or call our spa reception
                on 01288 361206. We recommend booking at least 7 days in
                advance, particularly for weekends and the Couples Retreat.
              </p>
            </div>
            <div>
              <p className="eyebrow text-on-surface-muted">Good to know</p>
              <h3 className="heading-editorial mt-4 text-h3 text-on-surface">
                What to bring
              </h3>
              <p className="mt-4 text-body text-on-surface-variant">
                Just yourself and a swimming costume. Robes, towels, slippers
                and all products are provided. Lockers are available for your
                belongings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gift CTA */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow text-on-surface-muted">Gifting</p>
              <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
                Give a day away
              </h2>
              <p className="mt-4 text-body-lg text-on-surface-variant">
                Spa days make considered gifts. Purchase a voucher for a specific
                package or choose a monetary amount and let the recipient decide
                how to spend their time.
              </p>
              <div className="mt-8">
                <Link href="/spa/gift-vouchers">
                  <LinkArrow>Gift vouchers</LinkArrow>
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/spa/spa-wellness.webp"
                alt="Relaxation area overlooking the gardens"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
