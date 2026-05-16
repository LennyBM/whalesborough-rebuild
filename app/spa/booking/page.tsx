import type { Metadata } from "next";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Book a Spa Treatment | The W Club | Whalesborough",
  description:
    "Book treatments, spa days and gift vouchers online via our booking system. The W Club Spa at Whalesborough Farm Resort, Bude, Cornwall.",
};

export default function BookingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">The W Club · Booking</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Book your{" "}
            <span className="italic">time</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Treatments, spa days and gift vouchers can all be booked online.
            Choose your experience, pick a date and we will take care of
            the rest.
          </p>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-editorial text-h1 text-on-surface">
              Online booking
            </h2>
            <p className="mt-6 text-body-lg text-on-surface-variant">
              Our booking system is powered by Try.be. You will be taken to a
              secure external page where you can browse availability, select
              your treatment and complete your booking.
            </p>
            <div className="mt-10">
              <a
                href="https://thewclub.try.be"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-fg font-body font-medium uppercase h-14 px-10 text-button transition-colors duration-fast ease-out-luxury hover:bg-primary-hover active:bg-primary-pressed focus-visible:outline-none focus-visible:shadow-focus"
              >
                Book online via Try.be
              </a>
            </div>
            <p className="mt-6 text-body-sm text-on-surface-muted">
              You will be redirected to our secure booking partner.
            </p>
          </div>
        </div>
      </section>

      {/* Alternative contact */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div>
              <h3 className="text-h3 text-on-surface">Call the spa</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Prefer to speak to someone? Our reception team can check
                availability and book treatments over the phone.
              </p>
              <p className="mt-4 text-body text-on-surface">
                01288 361 354
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Spa reception hours</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Monday to Sunday: 8:00am – 8:00pm. Last treatment booking at
                6:30pm. Pool and thermal access until 9:00pm for spa day guests
                and members.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Cancellation policy</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                We ask for 24 hours&apos; notice for cancellations. Late
                cancellations or no-shows may be charged at 50% of the
                treatment value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <p className="eyebrow text-on-surface-muted">Before you arrive</p>
          <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
            What to expect
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h3 className="text-h3 text-on-surface">Arrival</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Please arrive 15 minutes before your treatment to complete a
                consultation form, change and use the thermal facilities. This
                time helps your body and mind transition into the spa pace.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">What we provide</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Robe, towel, slippers and a secure locker are provided for all
                treatment guests. Bring swimwear for pool and thermal access.
                Hair dryers and vanity amenities available in changing rooms.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Health considerations</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Please let us know about any health conditions, allergies or
                pregnancy when booking. Some treatments require adaptation and
                we want to give you the best possible experience.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">After your treatment</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Take your time in the relaxation suite. Drink water, avoid heavy
                meals immediately and let the products absorb. Your therapist
                will recommend a home-care routine if you wish.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <Link href="/spa/faqs">
              <LinkArrow>Read our full FAQs</LinkArrow>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
