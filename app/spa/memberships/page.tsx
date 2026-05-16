import type { Metadata } from "next";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Spa Membership | The W Club | Whalesborough",
  description:
    "Year-round access to pools, thermal suite, gym and member rates on treatments. The W Club Spa membership at Whalesborough Farm Resort.",
};

const tiers = [
  {
    name: "Lakeside",
    subtitle: "Individual membership",
    benefits: [
      "Unlimited access to pools and thermal suite",
      "Unlimited Technogym fitness suite access",
      "Relaxation suite and outdoor terrace",
      "10% discount on all treatments",
      "Priority booking for spa days",
      "Complimentary robe and locker",
      "One guest pass per month",
    ],
  },
  {
    name: "Lakeside Duo",
    subtitle: "Joint membership for two",
    benefits: [
      "Everything in Lakeside — for two named members",
      "15% discount on all treatments",
      "Two guest passes per month",
      "Priority booking for couples treatments",
      "10% discount on Weir Restaurant dining",
      "Complimentary robes and lockers",
    ],
  },
  {
    name: "Estate",
    subtitle: "Premium individual membership",
    benefits: [
      "Everything in Lakeside",
      "20% discount on all treatments",
      "Two complimentary 30-minute treatments per year",
      "Access to member-only wellness events",
      "15% discount on Gaia skincare products",
      "10% discount on Weir Restaurant dining",
      "Three guest passes per month",
      "Priority access to new facilities",
    ],
  },
];

export default function MembershipsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">The W Club · Membership</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            A place to return to,{" "}
            <span className="italic">not just visit</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Spa membership gives you year-round access to The W Club — pools,
            thermal suite, gym, and preferential rates on everything from
            treatments to dining. Built for locals who want a space that
            restores, week after week.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Membership tiers</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            Three levels, one standard
          </h2>
          <p className="mt-4 max-w-2xl text-body-lg text-on-surface-variant">
            Every tier includes full facility access. Higher tiers unlock deeper
            discounts and additional guest passes.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div key={tier.name} className="bg-background p-8 lg:p-10">
                <h3 className="text-h2 text-on-surface">{tier.name}</h3>
                <p className="mt-1 text-body-sm text-on-surface-muted">
                  {tier.subtitle}
                </p>
                <p className="mt-6 text-h3 text-primary">
                  Pricing on enquiry
                </p>
                <ul className="mt-8 space-y-3">
                  {tier.benefits.map((b) => (
                    <li
                      key={b}
                      className="text-body-sm text-on-surface-variant pl-4 relative before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:bg-secondary before:content-['']"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">How it works</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            Joining The W Club
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            <div>
              <p className="text-h2 text-secondary">01</p>
              <h3 className="mt-3 text-h3 text-on-surface">Enquire</h3>
              <p className="mt-2 text-body text-on-surface-variant">
                Get in touch via the form below or call the spa reception team.
                We will answer any questions and confirm current pricing.
              </p>
            </div>
            <div>
              <p className="text-h2 text-secondary">02</p>
              <h3 className="mt-3 text-h3 text-on-surface">Tour</h3>
              <p className="mt-2 text-body text-on-surface-variant">
                Visit the spa for a guided tour of the facilities. See the
                pools, thermal suite and gym in person before committing.
              </p>
            </div>
            <div>
              <p className="text-h2 text-secondary">03</p>
              <h3 className="mt-3 text-h3 text-on-surface">Join</h3>
              <p className="mt-2 text-body text-on-surface-variant">
                Complete your membership agreement and receive your welcome
                pack. Annual or monthly payment options available.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <Link href="/contact">
              <LinkArrow>Enquire about membership</LinkArrow>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="max-w-2xl">
            <h2 className="heading-editorial text-h2 text-on-surface">
              Questions about membership?
            </h2>
            <p className="mt-4 text-body-lg text-on-surface-variant">
              Minimum terms, guest policies, freezing your membership — we have
              covered the common questions.
            </p>
            <div className="mt-8">
              <Link href="/spa/faqs">
                <LinkArrow>Spa FAQs</LinkArrow>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
