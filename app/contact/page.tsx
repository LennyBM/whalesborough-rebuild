import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, AlertCircle, Car, Train, Plane } from "lucide-react";

import { LinkArrow } from "@/components/ui/button";
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
    <>
      {/* Editorial Header */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-16 pt-24 lg:px-12 lg:pb-24 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">Contact</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg max-w-3xl text-on-surface">
            Get in touch
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Whether it concerns a booking, a question about the estate, or
            simply directions to our door — we are always happy to hear from
            you.
          </p>
        </div>
      </section>

      {/* Form + Contact Details */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-5 lg:gap-20">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <p className="eyebrow text-on-surface-muted">Send a message</p>
              <h2 className="heading-editorial mt-4 text-h2 text-on-surface">
                How can we help?
              </h2>
              <p className="mt-4 text-body text-on-surface-variant">
                Fill in the form below and a member of our team will respond
                within one working day.
              </p>

              <EnquiryForm />
            </div>

            {/* Contact Details */}
            <div className="lg:col-span-2">
              <div className="space-y-10">
                {/* Phone */}
                <div>
                  <p className="eyebrow text-on-surface-muted">Phone</p>
                  <div className="mt-4 flex items-start gap-4">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                    <div>
                      <p className="text-body font-medium text-on-surface">Reception</p>
                      <a
                        href="tel:+441288361361"
                        className="text-body text-on-surface-variant hover:text-primary transition-colors"
                      >
                        01288 361361
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <p className="eyebrow text-on-surface-muted">Email</p>
                  <div className="mt-4 flex items-start gap-4">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                    <div>
                      <a
                        href="mailto:hello@whalesborough.co.uk"
                        className="text-body text-on-surface-variant hover:text-primary transition-colors break-all"
                      >
                        hello@whalesborough.co.uk
                      </a>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <p className="eyebrow text-on-surface-muted">Address</p>
                  <div className="mt-4 flex items-start gap-4">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                    <address className="text-body text-on-surface-variant not-italic leading-relaxed">
                      Whalesborough Estate<br />
                      Marhamchurch<br />
                      Bude, Cornwall<br />
                      EX23 0HR
                    </address>
                  </div>
                </div>

                {/* Reception Hours */}
                <div>
                  <p className="eyebrow text-on-surface-muted">Reception hours</p>
                  <div className="mt-4 flex items-start gap-4">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                    <p className="text-body text-on-surface-variant">
                      8am&ndash;8pm, daily
                    </p>
                  </div>
                </div>

                {/* Emergency */}
                <div>
                  <p className="eyebrow text-on-surface-muted">Emergency (guests only)</p>
                  <div className="mt-4 flex items-start gap-4">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                    <div>
                      <a
                        href="tel:+441288361362"
                        className="text-body text-on-surface-variant hover:text-primary transition-colors"
                      >
                        01288 361362
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Finding Us */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Directions</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            Finding us
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-on-surface-variant">
            Tucked into the North Cornwall countryside between Bude and
            Widemouth Bay — just a few minutes from the coast.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* By Car */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Car className="h-5 w-5 text-secondary" aria-hidden="true" />
                <p className="text-body font-medium text-on-surface">By car</p>
              </div>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                Exit M5 at J27, take the A361 to Barnstaple, then A39 to Bude.
                Follow B3314 signed Marhamchurch.
              </p>
            </div>

            {/* Train */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Train className="h-5 w-5 text-secondary" aria-hidden="true" />
                <p className="text-body font-medium text-on-surface">Nearest train</p>
              </div>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                Bodmin Parkway — approximately 45 minutes by car.
              </p>
            </div>

            {/* Airport */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Plane className="h-5 w-5 text-secondary" aria-hidden="true" />
                <p className="text-body font-medium text-on-surface">Nearest airport</p>
              </div>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                Newquay Cornwall Airport — approximately 40 minutes by car.
              </p>
            </div>

            {/* Sat Nav */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-secondary" aria-hidden="true" />
                <p className="text-body font-medium text-on-surface">Sat nav</p>
              </div>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                Use postcode <span className="font-medium text-on-surface">EX23 0HR</span> for
                accurate directions to the estate entrance.
              </p>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-16">
            <div className="relative flex aspect-[16/7] items-center justify-center bg-surface-container-low">
              <div className="text-center">
                <MapPin className="mx-auto h-8 w-8 text-on-surface-muted" aria-hidden="true" />
                <p className="mt-3 text-body text-on-surface-muted">
                  Whalesborough Estate
                </p>
                <a
                  href="https://www.google.com/maps?q=50.8367,-4.5258"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-body-sm font-medium text-primary hover:underline"
                >
                  View on Google Maps &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
