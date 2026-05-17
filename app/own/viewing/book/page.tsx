"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    const payload = {
      name: `${firstName} ${lastName}`.trim(),
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      preferredDate: formData.get("preferredDate") as string,
      preferredTime: formData.get("preferredTime") as string,
      collection: formData.get("interest") as string,
      budget: formData.get("budget") as string,
      source: formData.get("source") as string,
      type: "viewing" as const,
      message: formData.get("notes") as string || undefined,
    };

    try {
      const res = await fetch("/api/lodge-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Unable to send your request. Please check your connection and try again.");
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.section
          key="success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-background"
        >
          <div className="mx-auto max-w-content px-6 py-32 lg:px-12 lg:py-48 text-center">
            <p className="font-body text-sm uppercase tracking-widest text-primary">
              Viewing confirmed
            </p>
            <h1 className="font-display italic text-4xl md:text-5xl lg:text-6xl text-on-surface mt-6">
              Thank you
            </h1>
            <p className="mt-8 max-w-lg mx-auto text-lg text-on-surface-variant leading-relaxed">
              We have received your viewing request. A member of our sales team
              will be in touch within twenty-four hours to confirm your date and
              share directions to the estate.
            </p>
            <div className="mt-6 text-on-surface-muted text-sm">
              01288 361365 &middot; lodges@whalesborough.co.uk
            </div>
          </div>
        </motion.section>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Hero */}
          <section className="bg-background">
            <div className="mx-auto max-w-content px-6 pt-24 pb-16 lg:px-12 lg:pt-40 lg:pb-24">
              <p className="font-body text-sm uppercase tracking-widest text-on-surface-muted">
                Lodge Ownership
              </p>
              <h1 className="font-display italic text-4xl md:text-5xl lg:text-6xl text-on-surface mt-6 max-w-3xl">
                Book a private viewing
              </h1>
              <p className="mt-8 max-w-2xl text-lg text-on-surface-variant leading-relaxed">
                Visit the estate in person. Walk the available plots, tour a
                finished lodge, and explore the grounds at your own pace. Our
                team will be on hand to answer any questions about ownership.
              </p>
            </div>
          </section>

          {/* Estate image */}
          <section className="bg-background">
            <div className="mx-auto max-w-content px-6 lg:px-12">
              <div className="relative aspect-[21/9] w-full overflow-hidden">
                <Image
                  src="/images/general/estate-view.webp"
                  alt="Aerial view of the Whalesborough estate and surrounding countryside"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
            </div>
          </section>

          {/* Form + Side content */}
          <section className="bg-surface-container-low">
            <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
              <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
                {/* Form */}
                <div className="lg:col-span-7">
                  <form
                    className="space-y-8 bg-background p-8 lg:p-12"
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <h2 className="font-display italic text-2xl text-on-surface">
                        Your details
                      </h2>
                      <p className="mt-2 text-sm text-on-surface-muted">
                        All fields marked with * are required.
                      </p>
                    </div>

                    {status === "error" && errorMessage && (
                      <div className="bg-red-50 p-4 text-sm text-red-800">
                        {errorMessage}
                      </div>
                    )}

                    {/* Name */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          required
                          autoComplete="given-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          required
                          autoComplete="family-name"
                        />
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          autoComplete="tel"
                        />
                      </div>
                    </div>

                    {/* Date and time */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="preferredDate">Preferred viewing date *</Label>
                        <Input
                          id="preferredDate"
                          name="preferredDate"
                          type="date"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="preferredTime">Preferred time *</Label>
                        <select
                          id="preferredTime"
                          name="preferredTime"
                          required
                          className="flex h-11 w-full bg-surface-container px-4 py-2 text-sm text-on-surface placeholder:text-on-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Select a time</option>
                          <option value="morning">Morning (10am)</option>
                          <option value="afternoon">Afternoon (2pm)</option>
                        </select>
                      </div>
                    </div>

                    {/* Interest */}
                    <div className="space-y-2">
                      <Label htmlFor="interest">Collection of interest</Label>
                      <select
                        id="interest"
                        name="interest"
                        className="flex h-11 w-full bg-surface-container px-4 py-2 text-sm text-on-surface placeholder:text-on-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select a collection</option>
                        <option value="gwelva">Gwelva Collection (from £650k)</option>
                        <option value="trelowen">Trelowen Collection (from £425k)</option>
                        <option value="tevi">Tevi Collection (from £285k)</option>
                        <option value="bespoke">Bespoke</option>
                        <option value="unsure">Not sure yet</option>
                      </select>
                    </div>

                    {/* Budget */}
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget range</Label>
                      <select
                        id="budget"
                        name="budget"
                        className="flex h-11 w-full bg-surface-container px-4 py-2 text-sm text-on-surface placeholder:text-on-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select a range</option>
                        <option value="under-300k">Under £300k</option>
                        <option value="300-450k">£300k – £450k</option>
                        <option value="450-650k">£450k – £650k</option>
                        <option value="650k-plus">£650k+</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>

                    {/* Source */}
                    <div className="space-y-2">
                      <Label htmlFor="source">How did you hear about us?</Label>
                      <select
                        id="source"
                        name="source"
                        className="flex h-11 w-full bg-surface-container px-4 py-2 text-sm text-on-surface placeholder:text-on-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select an option</option>
                        <option value="google">Google</option>
                        <option value="social-media">Social media</option>
                        <option value="word-of-mouth">Word of mouth</option>
                        <option value="press">Press</option>
                        <option value="estate-visit">Estate visit</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional notes</Label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={4}
                        placeholder="Questions, accessibility requirements, or anything else we should know..."
                        className="flex w-full bg-surface-container px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? "Sending..." : "Request Viewing"}
                    </Button>

                    <p className="text-xs text-on-surface-muted leading-relaxed">
                      By submitting this form you agree to be contacted by our
                      sales team regarding your viewing request. We will never
                      share your information with third parties.
                    </p>
                  </form>
                </div>

                {/* Side content */}
                <div className="lg:col-span-5">
                  <div className="sticky top-32 space-y-10">
                    {/* What to expect */}
                    <div>
                      <p className="font-body text-sm uppercase tracking-widest text-on-surface-muted">
                        What to expect
                      </p>
                      <h2 className="font-display italic text-2xl text-on-surface mt-4">
                        A personal tour of the estate
                      </h2>
                      <ul className="mt-6 space-y-4">
                        <ExpectItem text="A private, one-hour tour with our sales team" />
                        <ExpectItem text="Walk available plots and see the views first-hand" />
                        <ExpectItem text="Tour a fully finished show lodge" />
                        <ExpectItem text="Explore the spa, restaurant and estate grounds" />
                        <ExpectItem text="Discuss design options and personalisation" />
                        <ExpectItem text="No obligation — viewings are at your pace" />
                      </ul>
                    </div>

                    {/* Contact card */}
                    <div className="bg-background p-8 space-y-4">
                      <p className="font-display italic text-xl text-on-surface">
                        Prefer to speak with us?
                      </p>
                      <div className="space-y-2">
                        <a
                          href="tel:01288361365"
                          className="block text-on-surface hover:text-primary transition-colors text-sm"
                        >
                          01288 361365
                        </a>
                        <a
                          href="mailto:lodges@whalesborough.co.uk"
                          className="block text-on-surface hover:text-primary transition-colors text-sm"
                        >
                          lodges@whalesborough.co.uk
                        </a>
                      </div>
                    </div>

                    {/* Reassurance */}
                    <p className="text-sm text-on-surface-muted italic leading-relaxed">
                      No obligation. Viewings are private and at your pace.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ExpectItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-primary" />
      <span className="text-sm text-on-surface-variant leading-relaxed">
        {text}
      </span>
    </li>
  );
}
