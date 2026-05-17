"use client";

import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [interest, setInterest] = useState("");
  const [brochure, setBrochure] = useState(false);
  const [notifyPlots, setNotifyPlots] = useState(true);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      collection: interest || "any",
      brochure,
      notifyPlots,
      type: "waitlist" as const,
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

  if (status === "success") {
    return (
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40 text-center">
          <p className="font-display text-sm uppercase tracking-widest text-primary">
            Waitlist confirmed
          </p>
          <h1 className="font-display italic mt-6 text-4xl md:text-5xl lg:text-6xl text-on-surface">
            You&rsquo;re on the list
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-lg text-on-surface-variant leading-relaxed">
            We&rsquo;ll be in touch before plots are released publicly. You&rsquo;ll have
            first refusal on positions that match your preferences.
          </p>
          <p className="mt-4 text-sm text-on-surface-muted">
            A confirmation has been sent to your email address.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-16 pt-24 lg:px-12 lg:pb-24 lg:pt-40">
          <p className="font-display text-sm uppercase tracking-widest text-on-surface-muted">
            Limited availability
          </p>
          <h1 className="font-display italic mt-6 text-4xl md:text-5xl lg:text-6xl max-w-3xl text-on-surface">
            Join the waitlist
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-on-surface-variant leading-relaxed">
            Only 12 lodges remain across all collections. New phases are announced
            exclusively to waitlist members before public release — giving you first
            refusal on the most desirable positions on the estate.
          </p>
        </div>
      </section>

      {/* Image */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 lg:px-12">
          <div className="relative aspect-[21/9] w-full overflow-hidden">
            <Image
              src="/images/general/estate-aerial.webp"
              alt="Aerial view of the Whalesborough estate and surrounding countryside"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-xl">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {status === "error" && errorMessage && (
                <div className="bg-red-50 p-4 text-sm text-red-800">
                  {errorMessage}
                </div>
              )}

              {/* Name row */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    required
                    autoComplete="given-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    required
                    autoComplete="family-name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="01234 567 890"
                  autoComplete="tel"
                />
              </div>

              {/* Interest */}
              <div className="space-y-2">
                <Label htmlFor="interest">Collection of interest</Label>
                <select
                  id="interest"
                  name="interest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full bg-surface-container px-4 py-3 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Any collection</option>
                  <option value="gwelva">Gwelva</option>
                  <option value="trelowen">Trelowen</option>
                  <option value="tevi">Tevi</option>
                  <option value="bespoke">Bespoke</option>
                </select>
              </div>

              {/* Checkboxes */}
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={brochure}
                    onChange={(e) => setBrochure(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-primary"
                  />
                  <span className="text-sm text-on-surface-variant">
                    I&rsquo;d like to receive the digital brochure
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyPlots}
                    onChange={(e) => setNotifyPlots(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-primary"
                  />
                  <span className="text-sm text-on-surface-variant">
                    Contact me when new plots become available
                  </span>
                </label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Joining..." : "Join Waitlist"}
              </Button>

              <p className="text-xs text-on-surface-muted text-center">
                No commitment required. We&rsquo;ll only contact you about availability
                matching your preferences.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
