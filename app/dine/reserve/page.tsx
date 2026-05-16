import type { Metadata } from "next";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Simply Arrive",
  description:
    "No reservation needed at The Weir. Walk in any time during opening hours. Our relaxed approach to dining on the Whalesborough estate.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">
            The Weir · Walk-in policy
          </p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg max-w-4xl text-on-surface">
            Simply{" "}
            <span className="italic">arrive</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            The Weir does not take reservations. There is no booking system,
            no confirmation email, no window of time you need to hit. Simply
            arrive whenever suits, and we will seat you.
          </p>
        </div>
      </section>

      {/* Why */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="eyebrow text-on-surface-muted">Our approach</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Why we keep it relaxed
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant">
                A holiday should feel unhurried. We want you to decide over
                breakfast whether you fancy lunch, not three days in advance.
                Our walk-in policy means no juggling reservation times around
                a beach walk, no anxiety about being five minutes late. The
                restaurant is here when you are ready for it.
              </p>
              <p className="mt-4 text-body text-on-surface-variant">
                It also means locals can pop in on a whim — a coffee after a
                dog walk, a last-minute lunch with a friend. That spontaneity
                is part of what makes The Weir feel like a proper
                neighbourhood restaurant, not a destination you have to plan
                for.
              </p>
            </div>
            <div className="aspect-[4/5] bg-surface-container-high relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display text-display-sm italic text-secondary-fg/40">
                  Walk In
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practical info */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="max-w-2xl">
            <p className="eyebrow text-on-surface-muted">Good to know</p>
            <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
              A few practicalities
            </h2>
            <div className="mt-10 space-y-8">
              <div className="border-b border-outline-variant pb-8">
                <h3 className="text-body font-medium text-on-surface">
                  Busy periods
                </h3>
                <p className="mt-2 text-body text-on-surface-variant">
                  School holidays and weekends are our busiest times. If you
                  arrive during peak lunch (12:30–1:30pm) there may be a
                  short wait. The terrace and the lake are a fine place to
                  spend it.
                </p>
              </div>
              <div className="border-b border-outline-variant pb-8">
                <h3 className="text-body font-medium text-on-surface">
                  Large groups
                </h3>
                <p className="mt-2 text-body text-on-surface-variant">
                  If you are six or more, we recommend giving us a call so we
                  can ensure a table is ready. This is not a booking — just a
                  heads-up so we can prepare.
                </p>
              </div>
              <div className="border-b border-outline-variant pb-8">
                <h3 className="text-body font-medium text-on-surface">
                  Private dining
                </h3>
                <p className="mt-2 text-body text-on-surface-variant">
                  For private events and celebrations, we do take
                  arrangements in advance. See our private dining page for
                  details.
                </p>
              </div>
              <div className="pb-8">
                <h3 className="text-body font-medium text-on-surface">
                  Dogs
                </h3>
                <p className="mt-2 text-body text-on-surface-variant">
                  Dogs are welcome indoors at all times. No need to pre-arrange.
                  Water bowls provided.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opening times */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="max-w-2xl">
            <p className="eyebrow text-on-surface-muted">Opening hours</p>
            <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
              When to find us
            </h2>
            <div className="mt-8 space-y-4">
              <div className="flex items-baseline justify-between border-b border-outline-variant pb-4">
                <p className="text-body font-medium text-on-surface">
                  Breakfast
                </p>
                <p className="text-body text-on-surface-variant">
                  8:30am – 11:00am
                </p>
              </div>
              <div className="flex items-baseline justify-between border-b border-outline-variant pb-4">
                <p className="text-body font-medium text-on-surface">Lunch</p>
                <p className="text-body text-on-surface-variant">
                  12:00pm – 3:00pm
                </p>
              </div>
              <div className="flex items-baseline justify-between pb-4">
                <p className="text-body font-medium text-on-surface">Open</p>
                <p className="text-body text-on-surface-variant">
                  Seven days a week
                </p>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-8">
              <LinkArrow href="/dine/menus">View menus</LinkArrow>
              <LinkArrow href="/dine/private-dining">
                Private dining
              </LinkArrow>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
