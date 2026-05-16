import type { Metadata } from "next";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Estate Map | The Estate | Whalesborough",
  description:
    "An interactive map of the five hundred acre estate. Walking routes, key landmarks, facilities and distances at a glance.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-12 pt-24 lg:px-12 lg:pb-20 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">The Estate · Map</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg max-w-4xl text-on-surface">
            Find your way around{" "}
            <span className="italic">five hundred acres</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Walking trails, the fishing lake, the farm, the spa, the restaurant
            — everything on the estate is connected by marked paths. Use the map
            below to plan your route or simply set off and see where the day
            takes you.
          </p>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-hero px-6 py-20 lg:px-12 lg:py-32">
          <div className="aspect-[16/9] bg-surface-container-high relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-secondary/20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <p className="font-display text-display-sm italic text-secondary-fg/40">
                Interactive Estate Map
              </p>
              <p className="text-body text-on-surface-muted">
                Coming soon — 3D interactive map with walking routes and times
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key locations */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Key locations</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            What you will find
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <LocationCard
              name="The W Club Spa"
              walk="5 min from cottages"
              description="Indoor pool, treatment rooms, gym and relaxation areas."
              href="/spa"
            />
            <LocationCard
              name="The Weir Restaurant"
              walk="3 min from reception"
              description="Breakfast through to long lunches. Estate-grown produce."
              href="/dine"
            />
            <LocationCard
              name="Fishing Lake"
              walk="8 min from cottages"
              description="Stocked lake surrounded by mature trees. Rod hire at reception."
              href="/estate/activities"
            />
            <LocationCard
              name="Farm & Animals"
              walk="4 min from reception"
              description="Alpacas, goats, pigs, chickens, donkeys and ducks."
              href="/estate/farm"
            />
            <LocationCard
              name="Neetfield Market Garden"
              walk="6 min from restaurant"
              description="Organic produce grown for The Weir. Seasonal tours available."
              href="/estate/farm"
            />
            <LocationCard
              name="Woodland Trails"
              walk="10 min to trailhead"
              description="Fifty acres of new native woodland with marked walking routes."
              href="/estate/activities"
            />
          </div>
        </div>
      </section>

      {/* Walking distances */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Walking distances</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl">
            Typical journey times on foot
          </h2>
          <p className="mt-6 max-w-2xl text-body text-on-surface-variant">
            All distances are approximate and measured from the central
            reception building. Terrain is a mix of paved paths, grass tracks
            and woodland trails — suitable for pushchairs on main routes.
          </p>
          <div className="mt-10">
            <div className="divide-y divide-outline-variant">
              <DistanceRow from="Reception" to="The W Club Spa" time="5 min" />
              <DistanceRow from="Reception" to="The Weir Restaurant" time="3 min" />
              <DistanceRow from="Reception" to="Fishing Lake" time="8 min" />
              <DistanceRow from="Reception" to="Farm & Animals" time="4 min" />
              <DistanceRow from="Reception" to="Woodland Trailhead" time="10 min" />
              <DistanceRow from="Reception" to="Clifftop Viewpoint" time="20 min" />
              <DistanceRow from="Reception" to="EV Charging Points" time="2 min" />
              <DistanceRow from="Cottages (nearest)" to="The W Club Spa" time="3 min" />
              <DistanceRow from="Cottages (furthest)" to="Reception" time="8 min" />
            </div>
          </div>
        </div>
      </section>

      {/* Practical info */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <p className="eyebrow text-on-surface-muted">Access</p>
              <h3 className="mt-4 text-h2 font-display text-on-surface">
                ANPR gate
              </h3>
              <p className="mt-4 text-body text-on-surface-variant">
                The estate uses ANPR (Automatic Number Plate Recognition) for
                contactless entry and exit. Register your vehicle at check-in
                and the gates will open automatically — 24 hours a day, 7 days
                a week. No keys, no codes, no queues.
              </p>
            </div>
            <div>
              <p className="eyebrow text-on-surface-muted">Electric vehicles</p>
              <h3 className="mt-4 text-h2 font-display text-on-surface">
                EV charging
              </h3>
              <p className="mt-4 text-body text-on-surface-variant">
                Four super-fast EV charging points are located near reception.
                Available to all guests on a first-come basis. Charging is
                included in your stay — no apps, no additional cost.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <LinkArrow href="/contact/finding-us">
              Getting to Whalesborough
            </LinkArrow>
          </div>
        </div>
      </section>
    </>
  );
}

function LocationCard({
  name,
  walk,
  description,
  href,
}: {
  name: string;
  walk: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} className="group block bg-surface-container-low p-6">
      <h3 className="text-h3 font-display text-on-surface group-hover:text-primary transition-colors duration-fast ease-out-luxury">
        {name}
      </h3>
      <p className="mt-1 text-body-sm text-on-surface-muted">{walk}</p>
      <p className="mt-3 text-body-sm text-on-surface-variant">{description}</p>
    </Link>
  );
}

function DistanceRow({
  from,
  to,
  time,
}: {
  from: string;
  to: string;
  time: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-2 text-body text-on-surface">
        <span>{from}</span>
        <span className="text-on-surface-muted">&rarr;</span>
        <span>{to}</span>
      </div>
      <p className="text-body-sm text-on-surface-muted shrink-0">{time}</p>
    </div>
  );
}
