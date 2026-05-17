"use client";

import Image from "next/image";
import Link from "next/link";

import { BackButton } from "@/components/app-shell/back-button";
import { Button } from "@/components/ui/button";

/* ─── Data ─── */
const collections = [
  {
    title: "Gwelva Collection",
    tagline: "Ocean-facing grandeur",
    beds: "2-3 bed",
    price: "From £650,000",
    description:
      "Floor-to-ceiling glass oriented toward the Atlantic. Private hot tub, wrap-around deck, vaulted living spaces designed for light and life.",
    href: "/own/lodges/gwelva",
  },
  {
    title: "Trelowen Collection",
    tagline: "Woodland contemporary",
    beds: "2 bed",
    price: "From £425,000",
    description:
      "Set among ancient oaks with contemporary cedar and glass architecture. Quiet, considered, deeply comfortable.",
    href: "/own/lodges/trelowen",
  },
  {
    title: "Tevi Collection",
    tagline: "Compact luxury",
    beds: "1-2 bed",
    price: "From £285,000",
    description:
      "Estate-edge lodges with all the design integrity of our larger collections. Ideal for couples or a Cornish bolt-hole.",
    href: "/own/lodges/tevi",
  },
  {
    title: "Bespoke",
    tagline: "Your vision, our estate",
    beds: "Any configuration",
    price: "From £500,000",
    description:
      "Work with our architectural partners to design something entirely yours. Choose your plot, specify every finish, own the result.",
    href: "/own/lodges/bespoke",
  },
];

const processSteps = [
  { step: "01", title: "Enquire", description: "Register your interest and receive the ownership prospectus." },
  { step: "02", title: "View", description: "Visit the estate, walk available plots, tour the show lodge." },
  { step: "03", title: "Reserve", description: "Secure your preferred plot with a £5,000 reservation fee." },
  { step: "04", title: "Design", description: "A design consultation to select finishes, layout options and extras." },
  { step: "05", title: "Completion", description: "Exchange, complete, and collect the keys to your Cornish home." },
];

/* ─── Page component ─── */
export function OwnPageContent() {
  return (
    <div className="px-4 pt-4 pb-24">
      <BackButton label="Home" href="/" />

      {/* Header image */}
      <div className="relative h-56 w-full overflow-hidden rounded-2xl">
        <Image
          src="/images/general/estate-aerial.webp"
          alt="Aerial view of the Whalesborough estate stretching to the Cornish coast"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 600px"
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs font-body uppercase tracking-widest text-white/70">
            Lodge Ownership
          </p>
          <h1 className="mt-1 font-display text-2xl italic text-white">
            A place to return to.
          </h1>
        </div>
      </div>

      {/* Intro */}
      <p className="mt-4 font-body text-sm text-on-surface-variant leading-relaxed">
        Four architect-designed collections across five hundred acres of
        pasture, woodland and clifftop on the North Cornwall coast.
      </p>

      {/* CTA buttons */}
      <div className="mt-4 flex gap-3">
        <Link href="/own/viewing/book" className="flex-1">
          <Button variant="primary" size="sm" className="w-full">
            Book a Viewing
          </Button>
        </Link>
        <Link href="/own/waitlist" className="flex-1">
          <Button variant="secondary" size="sm" className="w-full">
            Join Waitlist
          </Button>
        </Link>
      </div>

      {/* The proposition card */}
      <div className="mt-6 rounded-2xl bg-surface-container-low p-5">
        <p className="text-xs font-body uppercase tracking-widest text-on-surface-muted">
          The proposition
        </p>
        <h2 className="mt-2 font-display text-lg italic text-on-surface">
          Not an investment. A lifestyle purchase with rental income.
        </h2>
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-body text-sm font-semibold text-on-surface">Your holiday home</h3>
            <p className="mt-1 font-body text-sm text-on-surface-variant leading-relaxed">
              Use your lodge whenever you like. This is a genuine second home on
              one of the most beautiful stretches of the English coastline, not a
              timeshare, not a fractional scheme.
            </p>
          </div>
          <div>
            <h3 className="font-body text-sm font-semibold text-on-surface">Managed rental</h3>
            <p className="mt-1 font-body text-sm text-on-surface-variant leading-relaxed">
              When you are away, your lodge enters our managed letting programme.
              We handle everything: marketing, guest management, housekeeping,
              maintenance. You receive the income.
            </p>
          </div>
          <div>
            <h3 className="font-body text-sm font-semibold text-on-surface">Estate access</h3>
            <p className="mt-1 font-body text-sm text-on-surface-variant leading-relaxed">
              Full access to the W Club Spa, The Weir Restaurant, lakeside trails,
              watersports and five hundred acres of private Cornish countryside.
              Priority booking, preferential rates.
            </p>
          </div>
        </div>
      </div>

      {/* Collections */}
      <div className="mt-4">
        <p className="text-xs font-body uppercase tracking-widest text-on-surface-muted">
          Four Collections
        </p>
        <h2 className="mt-2 font-display text-lg italic text-on-surface">
          Find the lodge that fits your life
        </h2>
        <div className="mt-4 space-y-3">
          {collections.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="block rounded-2xl bg-surface-container-low p-4"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-body text-sm font-semibold text-on-surface">
                  {c.title}
                </h3>
                <span className="font-body text-xs font-medium text-primary">
                  {c.price}
                </span>
              </div>
              <p className="mt-0.5 font-body text-xs text-on-surface-muted">
                {c.tagline} · {c.beds}
              </p>
              <p className="mt-2 font-body text-sm text-on-surface-variant leading-relaxed">
                {c.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Process card */}
      <div className="mt-6 rounded-2xl bg-surface-container-low p-5">
        <p className="text-xs font-body uppercase tracking-widest text-on-surface-muted">
          How it works
        </p>
        <h2 className="mt-2 font-display text-lg italic text-on-surface">
          From first enquiry to front-door keys
        </h2>
        <div className="mt-4 space-y-4">
          {processSteps.map((s) => (
            <div key={s.step} className="flex gap-3">
              <span className="font-display text-lg text-primary/50">{s.step}</span>
              <div>
                <p className="font-body text-sm font-semibold text-on-surface">{s.title}</p>
                <p className="mt-0.5 font-body text-xs text-on-surface-variant">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Income card */}
      <div className="mt-4 rounded-2xl bg-surface-container-low p-5">
        <p className="text-xs font-body uppercase tracking-widest text-on-surface-muted">
          Rental Income
        </p>
        <h2 className="mt-2 font-display text-lg italic text-on-surface">
          Earn while you are away
        </h2>
        <p className="mt-3 font-body text-sm text-on-surface-variant leading-relaxed">
          Projected rental yields of 5-7% net, managed entirely by our on-estate
          team. We handle guest bookings, changeovers, maintenance and marketing.
          You receive quarterly income reports and payments.
        </p>
        <p className="mt-2 font-body text-xs text-on-surface-muted">
          Your lodge is your home first. Use it whenever you wish. The rental
          programme works around your calendar, not the other way around.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-surface-container px-3 py-3 text-center">
            <p className="font-display text-lg text-primary">5-7%</p>
            <p className="mt-0.5 font-body text-[10px] uppercase tracking-wide text-on-surface-muted">
              Net yield
            </p>
          </div>
          <div className="rounded-xl bg-surface-container px-3 py-3 text-center">
            <p className="font-display text-lg text-primary">Quarterly</p>
            <p className="mt-0.5 font-body text-[10px] uppercase tracking-wide text-on-surface-muted">
              Payments
            </p>
          </div>
          <div className="rounded-xl bg-surface-container px-3 py-3 text-center">
            <p className="font-display text-lg text-primary">Fully</p>
            <p className="mt-0.5 font-body text-[10px] uppercase tracking-wide text-on-surface-muted">
              Managed
            </p>
          </div>
          <div className="rounded-xl bg-surface-container px-3 py-3 text-center">
            <p className="font-display text-lg text-primary">Flexible</p>
            <p className="mt-0.5 font-body text-[10px] uppercase tracking-wide text-on-surface-muted">
              Personal use
            </p>
          </div>
        </div>
        <Link
          href="/own/rental-income"
          className="mt-4 inline-block font-body text-sm font-medium text-primary"
        >
          Full income projections &rarr;
        </Link>
      </div>

      {/* Estate image */}
      <div className="relative mt-4 h-44 w-full overflow-hidden rounded-2xl">
        <Image
          src="/images/general/estate-view.webp"
          alt="View across the Whalesborough estate toward the Cornish coastline"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 600px"
        />
      </div>

      {/* Bottom CTA */}
      <div className="mt-6 rounded-2xl bg-surface-container p-5 text-center">
        <h2 className="font-display text-lg italic text-on-surface">
          See it for yourself
        </h2>
        <p className="mt-2 font-body text-sm text-on-surface-variant">
          Book a private viewing with our ownership team. Walk the plots, tour
          the show lodge, and discover the estate at your own pace.
        </p>
        <div className="mt-4 flex gap-3">
          <Link href="/own/viewing/book" className="flex-1">
            <Button variant="primary" size="sm" className="w-full">
              Book a Viewing
            </Button>
          </Link>
          <Link href="/own/waitlist" className="flex-1">
            <Button variant="tertiary" size="sm" className="w-full">
              Join Waitlist
            </Button>
          </Link>
        </div>
        <p className="mt-3 font-body text-xs text-on-surface-muted">
          Or call our ownership team directly on 01288 361941
        </p>
      </div>
    </div>
  );
}
