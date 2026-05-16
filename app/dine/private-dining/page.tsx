import type { Metadata } from "next";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Private Dining",
  description:
    "Private dining at The Weir for celebrations, corporate events, and groups. Bespoke menus, lakeside setting, dedicated service.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">The Weir · Private</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg max-w-4xl text-on-surface">
            Private dining for{" "}
            <span className="italic">any occasion</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Whether it is a birthday, an anniversary, a team away-day, or
            simply a gathering that deserves its own space — The Weir offers
            private dining with bespoke menus, dedicated service, and the
            same lakeside setting.
          </p>
        </div>
      </section>

      {/* Options */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3 lg:gap-12">
            <div>
              <p className="eyebrow text-on-surface-muted">Celebrations</p>
              <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
                Birthdays & milestones
              </h2>
              <p className="mt-4 text-body text-on-surface-variant">
                Milestone birthdays, anniversaries, christenings. We will
                work with you on a menu that suits the table, set the room to
                your preferences, and handle the details so you can be a
                guest at your own event.
              </p>
            </div>
            <div>
              <p className="eyebrow text-on-surface-muted">Corporate</p>
              <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
                Team days & meetings
              </h2>
              <p className="mt-4 text-body text-on-surface-variant">
                A working lunch with views that improve the conversation. We
                can accommodate team lunches, client entertaining, and
                board-level meetings. AV equipment available on request.
              </p>
            </div>
            <div>
              <p className="eyebrow text-on-surface-muted">Groups</p>
              <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
                Larger parties
              </h2>
              <p className="mt-4 text-body text-on-surface-variant">
                For groups of any size, from an intimate lunch for six to a
                larger gathering. We will tailor the space, the service style,
                and the menu to suit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="aspect-[3/2] bg-surface-container-high relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display text-display-sm italic text-secondary-fg/40">
                  Private Dining
                </p>
              </div>
            </div>
            <div>
              <p className="eyebrow text-on-surface-muted">What to expect</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Your event, your menu
              </h2>
              <ul className="mt-8 space-y-4 text-body text-on-surface-variant">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Bespoke menu designed around your preferences and the season
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Dedicated space overlooking the lake
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Attentive, dedicated service team
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Dietary requirements and allergens fully catered for
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Wine pairings and drinks packages available
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Flexible room configuration for groups of any size
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Enquire */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="max-w-2xl">
            <p className="eyebrow text-on-surface-muted">Get in touch</p>
            <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
              Enquire about private dining
            </h2>
            <p className="mt-6 text-body-lg text-on-surface-variant">
              Let us know the occasion, the number of guests, and any initial
              preferences. Our team will come back to you with menu
              suggestions and availability.
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
              <LinkArrow href="/dine/menus">View our menus</LinkArrow>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
