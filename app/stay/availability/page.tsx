import type { Metadata } from "next";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Check Availability | Whalesborough Farm Resort, Cornwall",
  description:
    "Search available dates across heritage cottages, Arvor Suites and spa lodges. Choose your property type, select dates and book directly.",
};

const propertyTypes = [
  { label: "Heritage Cottages", count: "27 properties" },
  { label: "Arvor Suites", count: "22 suites" },
  { label: "Spa Lodges", count: "3 lodges" },
];

export default function AvailabilityPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">
            Availability · Book Direct
          </p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Find your{" "}
            <span className="italic">perfect dates</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Search live availability across the estate. Select your preferred
            property type, choose your dates and secure your stay with a low
            deposit — best rates guaranteed when you book direct.
          </p>
        </div>
      </section>

      {/* Availability Checker */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-3xl bg-background p-8 lg:p-12">
            {/* Property Type Filter */}
            <fieldset>
              <legend className="text-h3 text-on-surface">
                Property type
              </legend>
              <div className="mt-4 flex flex-wrap gap-3">
                {propertyTypes.map((type) => (
                  <label
                    key={type.label}
                    className="cursor-pointer bg-surface-container-low px-5 py-3 text-body text-on-surface transition-colors hover:bg-surface-container"
                  >
                    <input
                      type="radio"
                      name="property-type"
                      value={type.label}
                      className="sr-only"
                    />
                    <span className="font-medium">{type.label}</span>
                    <span className="ml-2 text-body-sm text-on-surface-muted">
                      {type.count}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Date Picker Mockup */}
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="check-in"
                  className="block text-body-sm font-medium text-on-surface"
                >
                  Check-in
                </label>
                <div className="mt-2 flex h-12 items-center bg-surface-container-low px-4 text-body text-on-surface-muted">
                  Select arrival date
                </div>
              </div>
              <div>
                <label
                  htmlFor="check-out"
                  className="block text-body-sm font-medium text-on-surface"
                >
                  Check-out
                </label>
                <div className="mt-2 flex h-12 items-center bg-surface-container-low px-4 text-body text-on-surface-muted">
                  Select departure date
                </div>
              </div>
            </div>

            {/* Guests */}
            <div className="mt-8">
              <label className="block text-body-sm font-medium text-on-surface">
                Guests
              </label>
              <div className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="flex h-12 items-center bg-surface-container-low px-4 text-body text-on-surface-muted">
                  Adults
                </div>
                <div className="flex h-12 items-center bg-surface-container-low px-4 text-body text-on-surface-muted">
                  Children
                </div>
                <div className="flex h-12 items-center bg-surface-container-low px-4 text-body text-on-surface-muted">
                  Infants
                </div>
                <div className="flex h-12 items-center bg-surface-container-low px-4 text-body text-on-surface-muted">
                  Dogs
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-10">
              <LinkArrow href="/stay/booking">
                Search availability
              </LinkArrow>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Info */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div>
              <h3 className="text-h3 text-on-surface">Best Rate Guarantee</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Book direct and you will always get the lowest available rate —
                no hidden fees, no third-party markup.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Low Deposit</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Secure your dates with a 25% deposit. The balance is due 28 days
                before arrival.
              </p>
            </div>
            <div>
              <h3 className="text-h3 text-on-surface">Flexible Cancellation</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Full refund if you cancel more than 28 days before arrival. Life
                happens — we understand.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <LinkArrow href="/stay/faqs">
              Read our full FAQ
            </LinkArrow>
          </div>
        </div>
      </section>
    </>
  );
}
