import type { Metadata } from "next";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Lakeside Locals",
  description:
    "Our membership for local residents. 20% off every Monday at The Weir Restaurant. Community, not exclusivity.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">
            The Weir · Membership
          </p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg max-w-4xl text-on-surface">
            Lakeside{" "}
            <span className="italic">Locals</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            A membership for our neighbours. If you live locally, Lakeside
            Locals gives you 20% off your bill every Monday — our way of
            saying this estate belongs to the community as much as to its
            guests.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="eyebrow text-on-surface-muted">How it works</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Monday, 20% off
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant">
                Every Monday, Lakeside Locals members receive 20% off their
                entire food and drink bill at The Weir. No minimum spend, no
                catches. Simply show your membership when you arrive.
              </p>
              <ul className="mt-8 space-y-4 text-body text-on-surface-variant">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Valid every Monday, all day (breakfast and lunch)
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  20% off food and drink for you and your table
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  No reservation needed — simply arrive as normal
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Available to residents within the local area
                </li>
              </ul>
            </div>
            <div className="aspect-[4/5] bg-surface-container-high relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display text-display-sm italic text-secondary-fg/40">
                  Lakeside Locals
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="max-w-2xl">
            <p className="eyebrow text-on-surface-muted">Community</p>
            <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
              Part of the neighbourhood
            </h2>
            <p className="mt-6 text-body-lg text-on-surface-variant">
              Whalesborough has been part of North Cornwall for generations.
              Lakeside Locals is how we keep that connection alive — an open
              invitation to treat The Weir as your local, not just somewhere
              for special occasions. Come for coffee on a wet Monday morning.
              Meet a friend for a long lunch. Bring the dog.
            </p>
            <p className="mt-4 text-body text-on-surface-variant">
              We also host occasional members-only events through the year:
              seasonal tastings, supplier evenings, and early access to our
              Grill and Chill summer series.
            </p>
          </div>
        </div>
      </section>

      {/* Sign up */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="max-w-2xl">
            <p className="eyebrow text-on-surface-muted">Join</p>
            <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
              Become a Lakeside Local
            </h2>
            <p className="mt-6 text-body-lg text-on-surface-variant">
              Membership is free. Simply ask at the restaurant on your next
              visit, or get in touch and we will set you up. All we need is
              proof of local address.
            </p>
            <div className="mt-8 space-y-2 text-body text-on-surface-variant">
              <p>
                <span className="font-medium text-on-surface">Phone:</span>{" "}
                01288 362234
              </p>
              <p>
                <span className="font-medium text-on-surface">Email:</span>{" "}
                theweir@whalesborough.co.uk
              </p>
            </div>
            <div className="mt-10">
              <LinkArrow href="/dine/events">
                Upcoming member events
              </LinkArrow>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
