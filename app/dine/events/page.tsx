import type { Metadata } from "next";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Grill and Chill summer BBQs, seasonal suppers, and estate feasts at The Weir Restaurant, Whalesborough.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">The Weir · Events</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg max-w-4xl text-on-surface">
            Grill and Chill &{" "}
            <span className="italic">seasonal events</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Through the year we host events that bring the estate to life —
            summer BBQs on the terrace, seasonal suppers built around a
            single ingredient, and gatherings that celebrate what this corner
            of Cornwall produces.
          </p>
        </div>
      </section>

      {/* Grill and Chill */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="eyebrow text-on-surface-muted">Summer series</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Grill and Chill
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant">
                Our signature summer event. The terrace becomes an open-air
                grill, the lake catches the evening light, and the kitchen
                serves sharing platters of Cornish meat, fish, and
                estate-grown sides. Live music on selected dates, dogs and
                children welcome.
              </p>
              <ul className="mt-8 space-y-3 text-body text-on-surface-variant">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Al fresco BBQ on the lakeside terrace
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Sharing platters, estate salads, Cornish seafood
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Live music on selected evenings
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Family-friendly, dogs welcome
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Running throughout summer — dates announced seasonally
                </li>
              </ul>
            </div>
            <div className="aspect-[4/5] bg-surface-container-high relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display text-display-sm italic text-secondary-fg/40">
                  Grill & Chill
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Events */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Through the year</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            Seasonal suppers & estate feasts
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            Beyond summer, we host a calendar of events that celebrate the
            seasons. Each event is shaped by what is happening on the estate
            and in Cornwall at that moment.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <EventCard
              season="Spring"
              title="Garden opening supper"
              description="A celebration of the first pickings from Neetfield Market Garden. A set menu built around what the soil has yielded."
            />
            <EventCard
              season="Summer"
              title="Grill and Chill series"
              description="Multiple dates through June, July and August. Open-air grill, sharing platters, live music on selected evenings."
            />
            <EventCard
              season="Autumn"
              title="Harvest supper"
              description="Estate game, root vegetables, orchard fruit. A long-table dinner celebrating the end of the growing season."
            />
            <EventCard
              season="Winter"
              title="Fireside feast"
              description="Log fire lit, candles set, slow-cooked dishes and warming puddings. An evening that leans into the darker months."
            />
            <EventCard
              season="Members"
              title="Lakeside Locals evenings"
              description="Exclusive tastings and supplier evenings for our Lakeside Locals membership. Wine, cheese, and conversation."
            />
            <EventCard
              season="Bespoke"
              title="Private events"
              description="We can create a bespoke event for your group. Tell us the occasion and we will shape the evening around it."
            />
          </div>
        </div>
      </section>

      {/* Stay informed */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="max-w-2xl">
            <p className="eyebrow text-on-surface-muted">Stay informed</p>
            <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
              Be the first to know
            </h2>
            <p className="mt-6 text-body-lg text-on-surface-variant">
              Events are announced seasonally and often sell out. Follow us on
              social media or join the Lakeside Locals membership to hear
              about events before they go public.
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
            <div className="mt-10 flex flex-wrap gap-8">
              <LinkArrow href="/dine/lakeside-locals">
                Join Lakeside Locals
              </LinkArrow>
              <LinkArrow href="/dine/private-dining">
                Private event enquiry
              </LinkArrow>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function EventCard({
  season,
  title,
  description,
}: {
  season: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-surface-container-low p-8">
      <p className="eyebrow text-on-surface-muted">{season}</p>
      <h3 className="heading-editorial mt-3 text-h3 text-on-surface">
        {title}
      </h3>
      <p className="mt-3 text-body-sm text-on-surface-variant">
        {description}
      </p>
    </div>
  );
}
