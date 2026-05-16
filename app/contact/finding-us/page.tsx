import type { Metadata } from "next";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Finding us — Whalesborough Farm",
  description:
    "Directions by car, train, and air to Whalesborough Farm Resort & Spa near Bude, Cornwall. ANPR gate access, EV charging, and sat nav details.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">Contact</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Finding your way to the{" "}
            <span className="italic">estate</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Whalesborough Farm sits just off the A39 near Marhamchurch, ten
            minutes from Bude town centre. Once you arrive, our ANPR gate
            grants contactless 24/7 access — no barrier codes, no waiting.
          </p>
        </div>
      </section>

      {/* Sat Nav / Postcode */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="eyebrow text-on-surface-muted">Sat nav</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Set your destination
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant">
                For the most accurate routing, use the postcode or what3words
                address below. Some older sat navs may take you past the
                entrance on the A39 — look for our signage on the left if
                travelling from Bude direction.
              </p>
              <div className="mt-10 space-y-6">
                <div className="flex items-baseline justify-between border-b border-outline-variant pb-4">
                  <p className="text-body font-medium text-on-surface">Postcode</p>
                  <p className="text-body text-on-surface-variant font-medium">EX23 0JD</p>
                </div>
                <div className="flex items-baseline justify-between border-b border-outline-variant pb-4">
                  <p className="text-body font-medium text-on-surface">what3words</p>
                  <p className="text-body text-on-surface-variant">///gate.entrance.address</p>
                </div>
                <div className="flex items-baseline justify-between pb-4">
                  <p className="text-body font-medium text-on-surface">Address</p>
                  <p className="text-body text-on-surface-variant text-right">
                    Whalesborough Farm,<br />
                    Marhamchurch, Bude,<br />
                    Cornwall EX23 0JD
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p className="eyebrow text-on-surface-muted">On arrival</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                ANPR gate access
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant">
                Our entrance uses Automatic Number Plate Recognition. Once
                your vehicle registration is linked to your booking, the
                barrier lifts automatically — day or night, no fob or code
                required.
              </p>
              <ul className="mt-8 space-y-3 text-body text-on-surface-variant">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Contactless 24/7 access for all guests and owners
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Register your vehicle at time of booking
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Visitor access arranged via reception
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Intercom available at the gate 24 hours
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* By Car */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">By car</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            Driving directions
          </h2>
          <p className="mt-6 max-w-3xl text-body-lg text-on-surface-variant">
            Whalesborough is easily reached from the M5 and A30/A39 corridor.
            The estate entrance is on the A39 between Bude and Wainhouse Corner.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h3 className="text-h3 font-display text-on-surface">From the M5 / Exeter</h3>
              <ol className="mt-6 space-y-4 text-body text-on-surface-variant list-none">
                <li className="flex items-start gap-4">
                  <span className="shrink-0 font-display text-h3 text-secondary/60">1</span>
                  <span>Leave the M5 at Junction 27 (Tiverton) and follow the A361 towards Barnstaple, then pick up the A39 south towards Bude.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="shrink-0 font-display text-h3 text-secondary/60">2</span>
                  <span>Continue on the A39 through Kilkhampton and past Wainhouse Corner.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="shrink-0 font-display text-h3 text-secondary/60">3</span>
                  <span>Whalesborough Farm is signposted on the right approximately 2 miles before Bude, near Marhamchurch.</span>
                </li>
              </ol>
            </div>
            <div>
              <h3 className="text-h3 font-display text-on-surface">From the A30 / Bodmin</h3>
              <ol className="mt-6 space-y-4 text-body text-on-surface-variant list-none">
                <li className="flex items-start gap-4">
                  <span className="shrink-0 font-display text-h3 text-secondary/60">1</span>
                  <span>From the A30, take the A395 exit towards Camelford and continue north on the A39.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="shrink-0 font-display text-h3 text-secondary/60">2</span>
                  <span>Follow the A39 through Camelford and Wainhouse Corner towards Bude.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="shrink-0 font-display text-h3 text-secondary/60">3</span>
                  <span>The estate entrance is on the right, approximately 2 miles before Bude at Marhamchurch.</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Public Transport & Air */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3 lg:gap-12">
            {/* Train */}
            <div>
              <p className="eyebrow text-on-surface-muted">By train</p>
              <h3 className="heading-editorial mt-4 text-h2 text-on-surface">
                Rail connections
              </h3>
              <p className="mt-6 text-body text-on-surface-variant">
                North Cornwall has no direct railway station, but two mainline
                stations connect well with car hire or taxi transfer.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-baseline justify-between border-b border-outline-variant pb-3">
                  <p className="text-body font-medium text-on-surface">Exeter St Davids</p>
                  <p className="text-body-sm text-on-surface-variant">1hr 45min drive</p>
                </div>
                <div className="flex items-baseline justify-between pb-3">
                  <p className="text-body font-medium text-on-surface">Bodmin Parkway</p>
                  <p className="text-body-sm text-on-surface-variant">1hr drive</p>
                </div>
              </div>
              <p className="mt-6 text-body-sm text-on-surface-variant">
                Both stations have car hire desks. Taxi transfer can be arranged
                in advance — contact our reception team for recommended operators.
              </p>
            </div>

            {/* Air */}
            <div>
              <p className="eyebrow text-on-surface-muted">By air</p>
              <h3 className="heading-editorial mt-4 text-h2 text-on-surface">
                Nearest airport
              </h3>
              <p className="mt-6 text-body text-on-surface-variant">
                Newquay Cornwall Airport is the closest airport with scheduled
                domestic and seasonal international flights.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-baseline justify-between border-b border-outline-variant pb-3">
                  <p className="text-body font-medium text-on-surface">Newquay (NQY)</p>
                  <p className="text-body-sm text-on-surface-variant">45min drive</p>
                </div>
                <div className="flex items-baseline justify-between pb-3">
                  <p className="text-body font-medium text-on-surface">Exeter (EXT)</p>
                  <p className="text-body-sm text-on-surface-variant">1hr 45min drive</p>
                </div>
              </div>
              <p className="mt-6 text-body-sm text-on-surface-variant">
                Newquay has direct flights from London Gatwick, Manchester,
                Leeds Bradford, Edinburgh, and Dublin. Car hire is available
                at the terminal.
              </p>
            </div>

            {/* EV Charging */}
            <div>
              <p className="eyebrow text-on-surface-muted">Electric vehicles</p>
              <h3 className="heading-editorial mt-4 text-h2 text-on-surface">
                EV charging
              </h3>
              <p className="mt-6 text-body text-on-surface-variant">
                Electric vehicle charging points are available on the estate.
                Charge your car while you enjoy the spa, walk the grounds, or
                dine at The Weir.
              </p>
              <ul className="mt-8 space-y-3 text-body text-on-surface-variant">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  On-site EV charging available for guests and owners
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Type 2 connectors, 7kW and 22kW options
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Charging included for lodge owners
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-secondary" />
                  Pay-as-you-go for holiday guests via app
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Times Summary */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Journey times</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            How far are we?
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            Approximate driving times from major cities and Cornish towns.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
            <JourneyTime from="Bude town centre" time="10 min" />
            <JourneyTime from="Padstow" time="40 min" />
            <JourneyTime from="Newquay" time="45 min" />
            <JourneyTime from="Bodmin" time="50 min" />
            <JourneyTime from="Exeter" time="1hr 45 min" />
            <JourneyTime from="Bristol" time="2hr 30 min" />
            <JourneyTime from="Plymouth" time="1hr 15 min" />
            <JourneyTime from="London" time="4hr 30 min" />
            <JourneyTime from="Birmingham" time="3hr 45 min" />
          </div>
          <div className="mt-12">
            <LinkArrow href="/contact">Back to contact</LinkArrow>
          </div>
        </div>
      </section>
    </>
  );
}

function JourneyTime({ from, time }: { from: string; time: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-outline-variant px-0 py-4 sm:px-4">
      <p className="text-body text-on-surface">{from}</p>
      <p className="text-body-sm font-medium text-on-surface-variant">{time}</p>
    </div>
  );
}
