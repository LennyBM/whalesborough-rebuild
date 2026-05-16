import type { Metadata } from "next";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Menus",
  description:
    "Seasonal breakfast and lunch menus at The Weir. Estate-grown produce, Cornish suppliers, and a kitchen that follows the seasons.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">The Weir · Menus</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg max-w-4xl text-on-surface">
            Menus that follow the{" "}
            <span className="italic">seasons</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Our kitchen works to what the estate and its suppliers provide
            each day. Menus shift with the market garden, the weather, and
            whatever the boats have brought in from the Cornish coast. Below
            you will find our current breakfast and lunch offerings.
          </p>
        </div>
      </section>

      {/* Menu Cards */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Breakfast */}
            <Link
              href="/dine/menus/breakfast"
              className="group block"
              aria-label="View breakfast menu"
            >
              <div className="aspect-[4/3] bg-surface-container-high relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="font-display text-display-sm italic text-secondary-fg/40">
                    Breakfast
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <p className="eyebrow text-on-surface-muted">
                  8:30am – 11:00am
                </p>
                <h2 className="heading-editorial mt-3 text-h1 text-on-surface group-hover:text-primary transition-colors duration-fast ease-out-luxury">
                  Breakfast
                </h2>
                <p className="mt-4 max-w-md text-body text-on-surface-variant">
                  Estate eggs, sourdough from the Bude bakery, seasonal fruit
                  from the garden. A slow start, done properly.
                </p>
                <div className="mt-6">
                  <LinkArrow href="/dine/menus/breakfast">
                    View breakfast menu
                  </LinkArrow>
                </div>
              </div>
            </Link>

            {/* Lunch */}
            <Link
              href="/dine/menus/lunch"
              className="group block lg:mt-16"
              aria-label="View lunch menu"
            >
              <div className="aspect-[4/3] bg-surface-container-high relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="font-display text-display-sm italic text-secondary-fg/40">
                    Lunch
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <p className="eyebrow text-on-surface-muted">
                  12:00pm – 3:00pm
                </p>
                <h2 className="heading-editorial mt-3 text-h1 text-on-surface group-hover:text-primary transition-colors duration-fast ease-out-luxury">
                  Lunch
                </h2>
                <p className="mt-4 max-w-md text-body text-on-surface-variant">
                  Cornish suppliers, estate-grown salads, daily specials from
                  whatever arrived that morning. Long lunches by the lake.
                </p>
                <div className="mt-6">
                  <LinkArrow href="/dine/menus/lunch">
                    View lunch menu
                  </LinkArrow>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="max-w-2xl">
            <p className="eyebrow text-on-surface-muted">A note on menus</p>
            <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
              Always in season
            </h2>
            <p className="mt-6 text-body-lg text-on-surface-variant">
              Our menus change frequently — sometimes daily — based on what
              the estate and our suppliers provide. The menus shown here are
              representative, not fixed. If you have dietary requirements or
              allergens, our team will always find something for you.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              <LinkArrow href="/dine/faqs">Allergen information</LinkArrow>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
