"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button, LinkArrow } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BookingPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    treatment: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("submitting");
    // Simulate submission
    setTimeout(() => {
      setFormState("success");
    }, 1200);
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">The W Club</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Book a <span className="italic">treatment</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Whether you are planning a spa day, a couples ritual or a single
            treatment between walks on the coast, we make booking simple. Call,
            click or ask at reception.
          </p>
        </div>
      </section>

      {/* Spa interior image */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 lg:px-12">
          <div className="relative aspect-[21/9] w-full overflow-hidden">
            <Image
              src="/images/spa/spa-interior.webp"
              alt="The W Club spa interior with thermal pool and relaxation loungers"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
          </div>
        </div>
      </section>

      {/* How to book */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <h2 className="heading-editorial text-h1 text-on-surface">
            How to book
          </h2>
          <p className="mt-4 max-w-2xl text-body-lg text-on-surface-variant">
            Three ways to secure your treatment time.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-3">
            {/* Call */}
            <div>
              <p className="eyebrow text-on-surface-muted">01</p>
              <h3 className="mt-4 text-h3 text-on-surface">Call us</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Speak directly with our spa reception team who can check
                availability and book your preferred time.
              </p>
              <p className="mt-6 text-h3 text-on-surface">01288 361364</p>
              <p className="mt-2 text-body-sm text-on-surface-muted">
                Mon&ndash;Sun, 9am&ndash;7pm
              </p>
            </div>

            {/* Online */}
            <div>
              <p className="eyebrow text-on-surface-muted">02</p>
              <h3 className="mt-4 text-h3 text-on-surface">Book online</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Browse treatments, check live availability and book instantly
                through our online booking partner.
              </p>
              <div className="mt-6">
                <Button variant="primary" size="lg">
                  Book via Try.be
                </Button>
              </div>
              <p className="mt-3 text-body-sm text-on-surface-muted">
                Opens our secure booking system
              </p>
            </div>

            {/* In person */}
            <div>
              <p className="eyebrow text-on-surface-muted">03</p>
              <h3 className="mt-4 text-h3 text-on-surface">In person</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Staying with us? Visit the spa reception desk during your stay to
                book treatments for the same day or later in your visit.
              </p>
              <p className="mt-6 text-body-sm text-on-surface-muted">
                Reception desk open daily, 9am&ndash;7pm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry form + sidebar */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
            {/* Form — 2 columns wide */}
            <div className="lg:col-span-2">
              <h2 className="heading-editorial text-h1 text-on-surface">
                Request a callback
              </h2>
              <p className="mt-4 max-w-xl text-body-lg text-on-surface-variant">
                Not sure which treatment to choose? Leave your details and
                one of our therapists will call you back to discuss options and
                availability.
              </p>

              {formState === "success" ? (
                <div className="mt-12 bg-surface-container-low p-10">
                  <h3 className="text-h3 text-on-surface">
                    Thank you for your enquiry
                  </h3>
                  <p className="mt-4 text-body text-on-surface-variant">
                    We have received your request and a member of our spa team
                    will be in touch within 24 hours. If your enquiry is urgent,
                    please call us on 01288 361364.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-12 space-y-8">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="07000 000000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredDate">Preferred date</Label>
                      <Input
                        id="preferredDate"
                        name="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="treatment">Treatment interest</Label>
                    <select
                      id="treatment"
                      name="treatment"
                      value={formData.treatment}
                      onChange={handleChange}
                      required
                      className="flex h-12 w-full bg-surface-container px-4 py-3 text-body text-on-surface placeholder:text-on-surface-muted focus-visible:outline-none focus-visible:shadow-focus disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select a treatment type</option>
                      <option value="massage">Massage</option>
                      <option value="facial">Facial</option>
                      <option value="ritual">Ritual</option>
                      <option value="spa-day">Spa Day</option>
                      <option value="couples">Couples</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Message{" "}
                      <span className="text-on-surface-muted font-normal">
                        (optional)
                      </span>
                    </Label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about any preferences, health considerations or questions"
                      className="flex w-full bg-surface-container px-4 py-3 text-body text-on-surface placeholder:text-on-surface-muted focus-visible:outline-none focus-visible:shadow-focus disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={formState === "submitting"}
                  >
                    Request callback
                  </Button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-10 lg:pt-16">
              {/* Opening hours */}
              <div className="bg-surface-container-low p-8">
                <h3 className="text-h4 text-on-surface">Opening hours</h3>
                <dl className="mt-6 space-y-4">
                  <div>
                    <dt className="text-body-sm text-on-surface-muted uppercase tracking-wider">
                      Spa facilities
                    </dt>
                    <dd className="mt-1 text-body text-on-surface">
                      7am &ndash; 9pm daily
                    </dd>
                  </div>
                  <div>
                    <dt className="text-body-sm text-on-surface-muted uppercase tracking-wider">
                      Treatments
                    </dt>
                    <dd className="mt-1 text-body text-on-surface">
                      9am &ndash; 7pm daily
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Priority note */}
              <div className="bg-surface-container-low p-8">
                <h3 className="text-h4 text-on-surface">Guest priority</h3>
                <p className="mt-3 text-body text-on-surface-variant">
                  Residential guests have priority booking for all treatments.
                  We recommend booking ahead of your stay to secure your
                  preferred times.
                </p>
              </div>

              {/* Gift vouchers */}
              <div className="bg-surface-container-low p-8">
                <h3 className="text-h4 text-on-surface">Gift vouchers</h3>
                <p className="mt-3 text-body text-on-surface-variant">
                  Give the gift of relaxation. Vouchers are available for
                  specific treatments or monetary values and can be posted or
                  emailed.
                </p>
                <div className="mt-6">
                  <Link href="/spa/gift-vouchers">
                    <LinkArrow>View gift vouchers</LinkArrow>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
