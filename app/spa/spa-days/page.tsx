import type { Metadata } from "next";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Spa Days | The W Club | Whalesborough",
  description:
    "Full-day spa packages including pool access, treatments, lunch and robes. Escape to The W Club Spa at Whalesborough Farm Resort.",
};

const packages = [
  {
    name: "The Estate Day",
    duration: "Full day",
    includes: [
      "Full use of pools, thermal suite and relaxation areas",
      "One 55-minute treatment of your choice",
      "Two-course lunch at The Weir Restaurant",
      "Robe, towel and slippers provided",
      "Access to outdoor terrace and gardens",
    ],
    note: "Our most popular spa day. Arrive from 9:30am, facilities available until 5pm.",
  },
  {
    name: "The Ritual Day",
    duration: "Full day",
    includes: [
      "Full use of pools, thermal suite and relaxation areas",
      "One 80-minute signature treatment",
      "One 30-minute express treatment",
      "Three-course lunch at The Weir Restaurant",
      "Glass of Cornish sparkling wine on arrival",
      "Robe, towel and slippers provided",
    ],
    note: "Our most indulgent option. Two treatments, a full lunch and time to do very little.",
  },
  {
    name: "Twilight Spa",
    duration: "Evening",
    includes: [
      "Pool and thermal suite access from 5pm to 9pm",
      "One 30-minute express treatment",
      "Light supper platter and a glass of wine",
      "Robe, towel and slippers provided",
    ],
    note: "An evening wind-down. Ideal mid-week or as a gift for someone who needs to slow down.",
  },
  {
    name: "Couples Retreat",
    duration: "Full day",
    includes: [
      "Dual treatment room for side-by-side massage (60 mins)",
      "Full use of pools and thermal suite",
      "Two-course lunch for two at The Weir Restaurant",
      "A bottle of Cornish sparkling wine",
      "Robes, towels and slippers for both guests",
    ],
    note: "Shared time, separate from the world. Celebrate an anniversary, a birthday, or nothing at all.",
  },
];

export default function SpaDaysPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">The W Club · Spa Days</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            A day designed around{" "}
            <span className="italic">doing less</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Arrive in the morning, leave in the evening. In between: warm
            water, good food, skilled hands and enough silence to hear yourself
            think again.
          </p>
          <div className="mt-10">
            <Link href="/spa/booking">
              <LinkArrow>Book a spa day</LinkArrow>
            </Link>
          </div>
        </div>
      </section>

      {/* Packages */}
      {packages.map((pkg, i) => (
        <section
          key={pkg.name}
          className={i % 2 === 0 ? "bg-surface-container-low" : "bg-background"}
        >
          <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <p className="eyebrow text-on-surface-muted">{pkg.duration}</p>
                <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                  {pkg.name}
                </h2>
                <p className="mt-4 text-body-lg text-on-surface-variant">
                  {pkg.note}
                </p>
                <div className="mt-8">
                  <Link href="/spa/booking">
                    <LinkArrow>Check availability</LinkArrow>
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="text-h3 text-on-surface">What&apos;s included</h3>
                <ul className="mt-4 space-y-3">
                  {pkg.includes.map((item) => (
                    <li
                      key={item}
                      className="text-body text-on-surface-variant pl-4 relative before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:bg-secondary before:content-['']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Gift CTA */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="max-w-2xl">
            <p className="eyebrow text-on-surface-muted">Gifting</p>
            <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
              Give a day away
            </h2>
            <p className="mt-4 text-body-lg text-on-surface-variant">
              Spa days make considered gifts. Purchase a voucher for a specific
              package or choose a monetary amount and let the recipient decide.
            </p>
            <div className="mt-8">
              <Link href="/spa/gift-vouchers">
                <LinkArrow>Gift vouchers</LinkArrow>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
