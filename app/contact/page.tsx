import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, AlertCircle, Car, Train, Plane } from "lucide-react";

import { BackButton } from "@/components/app-shell/back-button";
import { EnquiryForm } from "./enquiry-form";

export const metadata: Metadata = {
  title: "Get in touch — Whalesborough Estate",
  description:
    "Contact the Whalesborough Estate team. Phone, email, directions, and reception hours for the estate near Bude, Cornwall.",
  openGraph: {
    title: "Get in touch — Whalesborough Estate",
    description:
      "Contact the Whalesborough Estate team. Phone, email, directions, and reception hours for the estate near Bude, Cornwall.",
  },
};

export default function Page() {
  return (
    <div className="px-4 pt-4 pb-24">
      <BackButton label="Home" href="/" />

      {/* Page heading */}
      <div className="mb-5">
        <p className="text-xs font-body uppercase tracking-widest text-on-surface-muted">
          Contact
        </p>
        <h1 className="mt-2 font-display text-2xl italic text-on-surface">
          Get in touch
        </h1>
        <p className="mt-2 font-body text-sm text-on-surface-variant leading-relaxed">
          Whether it concerns a booking, a question about the estate, or simply
          directions to our door — we are always happy to hear from you.
        </p>
      </div>

      {/* Contact details cards */}
      <div className="space-y-3">
        {/* Phone */}
        <div className="flex items-center gap-4 rounded-2xl bg-surface-container-low p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container">
            <Phone className="h-4 w-4 text-secondary" />
          </div>
          <div>
            <p className="font-body text-xs text-on-surface-muted">Reception</p>
            <a
              href="tel:+441288361361"
              className="font-body text-sm font-medium text-on-surface"
            >
              01288 361361
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-4 rounded-2xl bg-surface-container-low p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container">
            <Mail className="h-4 w-4 text-secondary" />
          </div>
          <div>
            <p className="font-body text-xs text-on-surface-muted">Email</p>
            <a
              href="mailto:hello@whalesborough.co.uk"
              className="font-body text-sm font-medium text-on-surface break-all"
            >
              hello@whalesborough.co.uk
            </a>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-4 rounded-2xl bg-surface-container-low p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container">
            <MapPin className="h-4 w-4 text-secondary" />
          </div>
          <div>
            <p className="font-body text-xs text-on-surface-muted">Address</p>
            <address className="font-body text-sm text-on-surface not-italic leading-relaxed">
              Whalesborough Estate<br />
              Marhamchurch<br />
              Bude, Cornwall<br />
              EX23 0HR
            </address>
          </div>
        </div>

        {/* Hours */}
        <div className="flex items-center gap-4 rounded-2xl bg-surface-container-low p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container">
            <Clock className="h-4 w-4 text-secondary" />
          </div>
          <div>
            <p className="font-body text-xs text-on-surface-muted">Reception hours</p>
            <p className="font-body text-sm text-on-surface">
              8am&ndash;8pm, daily
            </p>
          </div>
        </div>

        {/* Emergency */}
        <div className="flex items-center gap-4 rounded-2xl bg-surface-container-low p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container">
            <AlertCircle className="h-4 w-4 text-secondary" />
          </div>
          <div>
            <p className="font-body text-xs text-on-surface-muted">
              Emergency (guests only)
            </p>
            <a
              href="tel:+441288361362"
              className="font-body text-sm font-medium text-on-surface"
            >
              01288 361362
            </a>
          </div>
        </div>
      </div>

      {/* Enquiry form card */}
      <div className="mt-6 rounded-2xl bg-surface-container-low p-5">
        <p className="text-xs font-body uppercase tracking-widest text-on-surface-muted">
          Send a message
        </p>
        <h2 className="mt-2 font-display text-lg italic text-on-surface">
          How can we help?
        </h2>
        <p className="mt-2 font-body text-sm text-on-surface-variant">
          Fill in the form below and a member of our team will respond within
          one working day.
        </p>
        <EnquiryForm />
      </div>

      {/* Directions card */}
      <div className="mt-4 rounded-2xl bg-surface-container-low p-5">
        <p className="text-xs font-body uppercase tracking-widest text-on-surface-muted">
          Directions
        </p>
        <h2 className="mt-2 font-display text-lg italic text-on-surface">
          Finding us
        </h2>
        <p className="mt-2 font-body text-sm text-on-surface-variant leading-relaxed">
          Tucked into the North Cornwall countryside between Bude and Widemouth
          Bay — just a few minutes from the coast.
        </p>

        <div className="mt-4 space-y-4">
          <DirectionItem
            icon={<Car className="h-4 w-4 text-secondary" />}
            title="By car"
            description="Exit M5 at J27, take the A361 to Barnstaple, then A39 to Bude. Follow B3314 signed Marhamchurch."
          />
          <DirectionItem
            icon={<Train className="h-4 w-4 text-secondary" />}
            title="Nearest train"
            description="Bodmin Parkway — approximately 45 minutes by car."
          />
          <DirectionItem
            icon={<Plane className="h-4 w-4 text-secondary" />}
            title="Nearest airport"
            description="Newquay Cornwall Airport — approximately 40 minutes by car."
          />
          <DirectionItem
            icon={<MapPin className="h-4 w-4 text-secondary" />}
            title="Sat nav"
            description="Use postcode EX23 0HR for accurate directions to the estate entrance."
          />
        </div>

        {/* Map link */}
        <div className="mt-5 flex items-center justify-center rounded-xl bg-surface-container py-6">
          <div className="text-center">
            <MapPin className="mx-auto h-6 w-6 text-on-surface-muted" />
            <p className="mt-2 font-body text-xs text-on-surface-muted">
              Whalesborough Estate
            </p>
            <a
              href="https://www.google.com/maps?q=50.8367,-4.5258"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block font-body text-xs font-medium text-primary"
            >
              View on Google Maps &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function DirectionItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="font-body text-sm font-medium text-on-surface">{title}</p>
        <p className="mt-0.5 font-body text-xs text-on-surface-variant leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
