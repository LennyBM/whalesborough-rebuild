import type { Metadata } from "next";
import Link from "next/link";

import { Button, LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "The Purchase Process | Own at Whalesborough",
  description:
    "From enquiry to completion in five clear steps. Reservation, exchange, build and handover — typically nine to twelve months.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">Lodge Ownership</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            A clear path from enquiry to{" "}
            <span className="italic">keys in hand</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            No hidden steps, no jargon. The process from first enquiry to
            completion typically takes nine to twelve months. Here is exactly
            what happens at each stage.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="space-y-20">
            <ProcessStep
              number="01"
              title="Enquire"
              description="Get in touch via the website, phone or brochure request. Our ownership coordinator Rebecca will answer initial questions and arrange a viewing at a time that suits you."
              details={["No obligation", "Brochure sent within 24 hours", "Initial call with Rebecca Peake"]}
            />
            <ProcessStep
              number="02"
              title="Viewing"
              description="Visit the estate for a private half-day tour. Walk the available plots, tour the show lodge, explore the spa, restaurant and wider estate. Graeme hosts all site viewings."
              details={["Private tours Tuesday and Thursday", "Walk available plots", "Tour show lodge and estate amenities", "Meet the ownership team"]}
            />
            <ProcessStep
              number="03"
              title="Reserve"
              description="Choose your plot and collection. A reservation fee secures your position while solicitors prepare the licence agreement. For bespoke lodges, this is where the design process begins."
              details={["Reservation fee secures your plot", "Solicitors instructed", "Design consultations begin (bespoke)"]}
            />
            <ProcessStep
              number="04"
              title="Exchange"
              description="Once the licence agreement is finalised and signed, exchange takes place. For new-build and bespoke lodges, construction begins after exchange. For available stock, completion follows shortly."
              details={["Licence agreement signed", "Construction begins (new build)", "Completion timeline confirmed"]}
            />
            <ProcessStep
              number="05"
              title="Completion & handover"
              description="Your lodge is complete, snagged and ready. We hand over the keys, walk you through the smart systems and welcome you to the estate. Your lodge enters the rental programme immediately."
              details={["Final inspection and snagging", "Keys handed over", "Smart system walkthrough", "Rental programme activated"]}
            />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow text-on-surface-muted">Timeline</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                How long does it take?
              </h2>
              <p className="mt-6 text-body-lg text-on-surface-variant max-w-lg">
                Available stock lodges can complete within weeks of reservation.
                New-build and bespoke lodges typically take nine to twelve months
                from reservation to keys in hand, depending on specification
                complexity.
              </p>
            </div>
            <div className="space-y-6">
              <TimelineItem label="Available stock" duration="4–8 weeks" />
              <TimelineItem label="Trelowen (new build)" duration="6–9 months" />
              <TimelineItem label="Bespoke" duration="9–12 months" />
            </div>
          </div>
        </div>
      </section>

      {/* Key Contacts */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Your team</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            Who you will work with
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
            <ContactCard
              name="Rebecca Peake"
              role="Ownership Coordinator"
              text="Your first point of contact. Rebecca handles all enquiries, brochure requests and coordinates the viewing process."
              phone="01288 361940"
            />
            <ContactCard
              name="Graeme"
              role="Site Viewings"
              text="Hosts all on-site tours. Graeme knows every plot, every view and every detail of the build specifications."
              phone="01288 361941"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-24 text-center">
          <h2 className="heading-editorial text-h1 text-primary-fg">
            Ready to start?
          </h2>
          <p className="mt-4 text-body-lg text-primary-fg/80 max-w-xl mx-auto">
            The first step is always a conversation. Call us, request a brochure
            or book a viewing directly.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/own/viewing/book">
              <Button variant="secondary" size="lg" className="border-primary-fg text-primary-fg hover:bg-primary-fg hover:text-primary">
                Book a Viewing
              </Button>
            </Link>
            <Link href="tel:01288361940">
              <Button variant="ghost" size="lg" className="text-primary-fg hover:bg-primary-fg/10">
                Call 01288 361940
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ProcessStep({
  number,
  title,
  description,
  details,
}: {
  number: string;
  title: string;
  description: string;
  details: string[];
}) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div className="lg:col-span-2">
        <p className="text-display-lg font-display text-primary">{number}</p>
      </div>
      <div className="lg:col-span-10">
        <h3 className="heading-editorial text-h1 text-on-surface">{title}</h3>
        <p className="mt-4 text-body-lg text-on-surface-variant max-w-2xl">
          {description}
        </p>
        <ul className="mt-6 space-y-2">
          {details.map((d) => (
            <li key={d} className="text-body-sm text-on-surface-variant flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-primary" aria-hidden="true" />
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TimelineItem({ label, duration }: { label: string; duration: string }) {
  return (
    <div className="flex items-center justify-between bg-surface-container-low p-6">
      <p className="text-body font-medium text-on-surface">{label}</p>
      <p className="text-h3 font-display text-primary">{duration}</p>
    </div>
  );
}

function ContactCard({
  name,
  role,
  text,
  phone,
}: {
  name: string;
  role: string;
  text: string;
  phone: string;
}) {
  return (
    <div className="bg-background p-8">
      <p className="text-h3 font-display text-on-surface">{name}</p>
      <p className="mt-1 eyebrow text-primary">{role}</p>
      <p className="mt-4 text-body-sm text-on-surface-variant">{text}</p>
      <div className="mt-6">
        <LinkArrow href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</LinkArrow>
      </div>
    </div>
  );
}
