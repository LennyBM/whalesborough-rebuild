"use client";

import { useState } from "react";

import { Button, LinkArrow } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [collection, setCollection] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    setFieldErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      collection: collection || "tevi",
      type: "brochure" as const,
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
        setCollection("");
      } else if (res.status === 400) {
        setStatus("error");
        setFieldErrors(data.details || {});
        setErrorMessage(data.error || "Please check your details and try again.");
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
          <p className="eyebrow text-primary">Brochure requested</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg text-on-surface">
            Thank you
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-body-lg text-on-surface-variant">
            Your brochure is on its way. Rebecca will be in touch within
            twenty-four hours if you have requested a call back.
          </p>
          <div className="mt-10">
            <LinkArrow href="/own">Back to ownership</LinkArrow>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">Lodge Ownership</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Request the{" "}
            <span className="italic">ownership brochure</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Sixty pages of site plans, floor plans, specifications, finishes and
            pricing across all four collections. Delivered digitally within
            minutes or as a printed edition by post.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-on-surface-muted">Your details</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Where shall we send it?
              </h2>
              <p className="mt-6 text-body text-on-surface-variant max-w-md">
                Complete the form and we will send the digital brochure to your
                inbox immediately. If you would prefer a printed copy, let us
                know in the collection preference and we will post one within
                three working days.
              </p>
              <div className="mt-12 space-y-6">
                <BrochureFeature title="Site plans" text="Aerial layouts showing all available plots and their positions on the estate." />
                <BrochureFeature title="Floor plans" text="Detailed layouts for every collection including dimensions and room configurations." />
                <BrochureFeature title="Specification" text="Full material and finish schedules for each lodge tier." />
                <BrochureFeature title="Pricing & income" text="Current pricing, guaranteed rental projections and running cost estimates." />
              </div>
            </div>

            <div>
              <form
                className="space-y-8 bg-background p-8 lg:p-10"
                onSubmit={handleSubmit}
              >
                {status === "error" && errorMessage && (
                  <div className="rounded-md bg-red-50 p-4 text-body-sm text-red-800">
                    {errorMessage}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    required
                    autoComplete="name"
                  />
                  {fieldErrors.name && (
                    <p className="text-caption text-red-600">{fieldErrors.name[0]}</p>
                  )}
                </div>

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
                  {fieldErrors.email && (
                    <p className="text-caption text-red-600">{fieldErrors.email[0]}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="01234 567 890"
                    required
                    autoComplete="tel"
                  />
                  {fieldErrors.phone && (
                    <p className="text-caption text-red-600">{fieldErrors.phone[0]}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collection">Collection interest</Label>
                  <Select name="collection" value={collection} onValueChange={setCollection}>
                    <SelectTrigger id="collection">
                      <SelectValue placeholder="Which collection interests you?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tevi">Tevi Luxury Lodges</SelectItem>
                      <SelectItem value="gwelva">Gwelva Luxury Villas</SelectItem>
                      <SelectItem value="trelowen">Trelowen Exclusive Lodges</SelectItem>
                      <SelectItem value="bespoke">Bespoke Lodges</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldErrors.collection && (
                    <p className="text-caption text-red-600">{fieldErrors.collection[0]}</p>
                  )}
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full" disabled={status === "loading"}>
                  {status === "loading" ? "Sending..." : "Send me the brochure"}
                </Button>

                <p className="text-body-sm text-on-surface-muted">
                  We will not share your details with third parties. You can
                  unsubscribe from communications at any time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function BrochureFeature({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h3 className="text-h3 font-display text-on-surface">{title}</h3>
      <p className="mt-1 text-body-sm text-on-surface-variant">{text}</p>
    </div>
  );
}
