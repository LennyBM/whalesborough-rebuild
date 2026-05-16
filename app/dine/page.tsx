import type { Metadata } from "next";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "The Weir Restaurant",
  description:
    "Farm-to-table dining on the Whalesborough estate. Lakeside views, log fires, and a kitchen fed by our own market garden. No reservation needed.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">The Weir</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            A kitchen shaped by the{" "}
            <span className="italic">estate itself</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Cornish suppliers. A market garden that feeds the pass. Lakeside
            views through floor-length glass, a terrace for long summer
            lunches, and a log fire for the months when you need one. Simply
            arrive — no reservation needed.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <LinkArrow href="/dine/menus">View menus</LinkArrow>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="eyebrow text-on-surface-muted">Farm to fork</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Neetfield Market Garden to your table
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant">
                Our organic market garden sits a five-minute walk from the
                kitchen door. What it yields each morning — leaves, herbs,
                roots, soft fruit — shapes the menu that day. What the garden
                cannot provide, Cornish suppliers do: day-boat fish from
                Newlyn, beef from neighbours in North Cornwall, dairy from
                Trewithen.
              </p>
              <p className="mt-4 text-body text-on-surface-variant">
                We believe good food begins with provenance, not performance.
                Plates are unfussy, flavours are direct, and the estate is
                present in every course.
              </p>
            </div>
            <div className="aspect-[4/5] bg-surface-container-high relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display text-display-sm italic text-secondary-fg/40">
                  Market Garden
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Setting */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="aspect-[3/2] bg-surface-container-high relative overflow-hidden lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display text-display-sm italic text-secondary-fg/40">
                  Lakeside Terrace
                </p>
              </div>
            </div>
            <div className="lg:order-1">
              <p className="eyebrow text-on-surface-muted">The setting</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Lakeside, log fire, al fresco
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant">
                The Weir looks out across our largest lake — a view that
                shifts with every season. In summer the terrace fills with
                families, dogs at feet, children darting between the play area
                and their plates. In winter the log fire draws you inward,
                and the kitchen leans into something warmer.
              </p>
              <ul className="mt-8 space-y-3 text-body text-on-surface-variant">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Dog-friendly dining indoors
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Children&apos;s play area visible from terrace
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Al fresco terrace for summer service
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Log fire for cooler months
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Opening Times & Walk-in */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="eyebrow text-on-surface-muted">Opening hours</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Breakfast &amp; lunch, daily
              </h2>
              <div className="mt-8 space-y-4">
                <div className="flex items-baseline justify-between border-b border-outline-variant pb-4">
                  <p className="text-body font-medium text-on-surface">Breakfast</p>
                  <p className="text-body text-on-surface-variant">8:30am – 11:00am</p>
                </div>
                <div className="flex items-baseline justify-between border-b border-outline-variant pb-4">
                  <p className="text-body font-medium text-on-surface">Lunch</p>
                  <p className="text-body text-on-surface-variant">12:00pm – 3:00pm</p>
                </div>
                <div className="flex items-baseline justify-between pb-4">
                  <p className="text-body font-medium text-on-surface">Open</p>
                  <p className="text-body text-on-surface-variant">Seven days a week</p>
                </div>
              </div>
            </div>
            <div>
              <p className="eyebrow text-on-surface-muted">No reservation needed</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Simply arrive
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant">
                The Weir operates on a walk-in basis. No booking, no waiting
                for confirmation — simply arrive when it suits. It is part of
                how we keep things relaxed. If you are joining us as a group
                or for a private occasion, we are happy to accommodate.
              </p>
              <div className="mt-8">
                <LinkArrow href="/dine/private-dining">
                  Private dining enquiries
                </LinkArrow>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation grid */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Explore dining</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            More from The Weir
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <NavCard
              href="/dine/menus"
              title="Menus"
              description="Seasonal breakfast and lunch menus, shaped by the market garden and Cornish suppliers."
            />
            <NavCard
              href="/dine/lakeside-locals"
              title="Lakeside Locals"
              description="Our Monday membership for local residents — 20% off every week."
            />
            <NavCard
              href="/dine/private-dining"
              title="Private dining"
              description="Celebrations, corporate gatherings, and groups of any size."
            />
            <NavCard
              href="/dine/events"
              title="Events"
              description="Grill and Chill summer BBQs, seasonal suppers, and estate feasts."
            />
            <NavCard
              href="/dine/reserve"
              title="Walk-in policy"
              description="No reservation needed. How our relaxed approach works."
            />
            <NavCard
              href="/dine/faqs"
              title="FAQs"
              description="Dogs, allergens, children, opening hours — everything you need to know."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function NavCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group block bg-surface-container-low p-8 transition-colors duration-fast ease-out-luxury hover:bg-surface-container"
    >
      <h3 className="text-h3 font-display text-on-surface group-hover:text-primary transition-colors duration-fast ease-out-luxury">
        {title}
      </h3>
      <p className="mt-3 text-body-sm text-on-surface-variant">{description}</p>
      <div className="mt-6">
        <LinkArrow href={href}>Explore</LinkArrow>
      </div>
    </Link>
  );
}
