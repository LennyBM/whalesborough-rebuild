import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

import { LinkArrow } from "@/components/ui/button";
import { EnquiryForm } from "./enquiry-form";

export const metadata: Metadata = {
  title: "Contact us — Whalesborough Farm",
  description:
    "Get in touch with the Whalesborough team. Phone, email, address, and opening hours for the estate, spa, and restaurant near Bude, Cornwall.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">Contact</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            We are here to{" "}
            <span className="italic">help</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Whether you have a question about ownership, a spa booking, the
            restaurant, or anything else about life on the estate — our team
            is happy to assist. Send us a message or pick up the phone.
          </p>
        </div>
      </section>

      {/* Form + Contact Details */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-5 lg:gap-20">
            {/* Enquiry Form */}
            <div className="lg:col-span-3">
              <p className="eyebrow text-on-surface-muted">Send a message</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                General enquiry
              </h2>
              <p className="mt-4 text-body text-on-surface-variant">
                Fill in the form below and a member of our team will respond
                within one working day.
              </p>

              <EnquiryForm />
            </div>

            {/* Contact Details Sidebar */}
            <div className="lg:col-span-2">
              <div className="space-y-12">
                {/* Phone Numbers */}
                <div>
                  <p className="eyebrow text-on-surface-muted">Phone</p>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start gap-4">
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                      <div>
                        <p className="text-body font-medium text-on-surface">Sales & general</p>
                        <a
                          href="tel:+441288361940"
                          className="text-body text-on-surface-variant hover:text-primary transition-colors duration-fast"
                        >
                          01288 361940
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                      <div>
                        <p className="text-body font-medium text-on-surface">VIP viewings</p>
                        <a
                          href="tel:+441288361941"
                          className="text-body text-on-surface-variant hover:text-primary transition-colors duration-fast"
                        >
                          01288 361941
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                      <div>
                        <p className="text-body font-medium text-on-surface">The Weir restaurant</p>
                        <a
                          href="tel:+441288362234"
                          className="text-body text-on-surface-variant hover:text-primary transition-colors duration-fast"
                        >
                          01288 362234
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <p className="eyebrow text-on-surface-muted">Email</p>
                  <div className="mt-4 flex items-start gap-4">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                    <div>
                      <p className="text-body font-medium text-on-surface">Restaurant</p>
                      <a
                        href="mailto:theweir@whalesborough.co.uk"
                        className="text-body text-on-surface-variant hover:text-primary transition-colors duration-fast break-all"
                      >
                        theweir@whalesborough.co.uk
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
                      Whalesborough Farm<br />
                      Marhamchurch<br />
                      Bude<br />
                      Cornwall<br />
                      EX23 0JD
                    </address>
                  </div>
                </div>

                {/* Opening Hours */}
                <div>
                  <p className="eyebrow text-on-surface-muted">Opening hours</p>
                  <div className="mt-4 flex items-start gap-4">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                    <div className="space-y-2">
                      <div>
                        <p className="text-body font-medium text-on-surface">Estate & reception</p>
                        <p className="text-body-sm text-on-surface-variant">Mon–Sun, 9:00am – 5:00pm</p>
                      </div>
                      <div>
                        <p className="text-body font-medium text-on-surface">Spa</p>
                        <p className="text-body-sm text-on-surface-variant">Mon–Sun, 9:00am – 7:00pm</p>
                      </div>
                      <div>
                        <p className="text-body font-medium text-on-surface">The Weir restaurant</p>
                        <p className="text-body-sm text-on-surface-variant">Daily, 8:30am – 3:00pm</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Finding Us Link */}
                <div className="pt-4">
                  <LinkArrow href="/contact/finding-us">
                    Directions & parking
                  </LinkArrow>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Specific enquiries</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            Speak to the right team
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <ContactCard
              title="Lodge ownership"
              description="Speak with our ownership team about purchasing, viewing availability, and the buying process."
              phone="01288 361940"
              href="/own"
            />
            <ContactCard
              title="Spa bookings"
              description="Book a treatment, enquire about spa days, or ask about memberships and gift vouchers."
              phone="01288 361940"
              href="/spa"
            />
            <ContactCard
              title="The Weir restaurant"
              description="Private dining, events, dietary requirements, or questions about our menus."
              phone="01288 362234"
              href="/dine"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  title,
  description,
  phone,
  href,
}: {
  title: string;
  description: string;
  phone: string;
  href: string;
}) {
  return (
    <div className="bg-surface-container-low p-8">
      <h3 className="text-h3 font-display text-on-surface">{title}</h3>
      <p className="mt-3 text-body-sm text-on-surface-variant">{description}</p>
      <p className="mt-6 text-body font-medium text-on-surface">{phone}</p>
      <div className="mt-4">
        <LinkArrow href={href}>Learn more</LinkArrow>
      </div>
    </div>
  );
}
