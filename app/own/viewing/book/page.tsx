"use client";

import { useState } from "react";

import { Button, LinkArrow } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    const payload = {
      name: `${firstName} ${lastName}`.trim(),
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      collection: collection || "tevi",
      type: "viewing" as const,
      message: formData.get("message") as string || undefined,
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
          <p className="eyebrow text-primary">Viewing requested</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg text-on-surface">
            We will be in touch
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-body-lg text-on-surface-variant">
            Rebecca will contact you within twenty-four hours to confirm your
            viewing date and share directions to the estate.
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
            Book a{" "}
            <span className="italic">private viewing</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Half-day private tours every Tuesday and Thursday. Walk the
            available plots, tour the show lodge, explore the spa, restaurant
            and wider estate. No obligation, no pressure — just the space to
            imagine a life here.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-on-surface-muted">What to expect</p>
              <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
                Your viewing day
              </h2>
              <div className="mt-8 space-y-6">
                <ViewingDetail
                  title="Private and unhurried"
                  text="Your tour is just for you — no group viewings. Take as long as you need at each stop."
                />
                <ViewingDetail
                  title="Walk the plots"
                  text="See available positions on the estate. Understand the views, orientation and access from each."
                />
                <ViewingDetail
                  title="Tour the show lodge"
                  text="Step inside a fully finished lodge to experience the space, specification and finishes first-hand."
                />
                <ViewingDetail
                  title="Explore the estate"
                  text="Visit The W Club Spa, The Weir Restaurant, the lakes and woodland trails."
                />
                <ViewingDetail
                  title="Meet the team"
                  text="Graeme hosts all site tours. Rebecca is available for ownership questions and next steps."
                />
              </div>

              <div className="mt-12 bg-background p-8">
                <p className="text-h3 font-display text-on-surface">
                  Prefer to call?
                </p>
                <p className="mt-2 text-body-sm text-on-surface-variant">
                  Ring our VIP Viewings line directly to arrange your visit.
                </p>
                <div className="mt-4">
                  <LinkArrow href="tel:01288361941">01288 361941</LinkArrow>
                </div>
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

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
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
                {fieldErrors.name && (
                  <p className="text-caption text-red-600">{fieldErrors.name[0]}</p>
                )}

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
                  <Label htmlFor="preferredDate">Preferred date</Label>
                  <Input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collection">Collections of interest</Label>
                  <Select name="collection" value={collection} onValueChange={setCollection}>
                    <SelectTrigger id="collection">
                      <SelectValue placeholder="Which lodges interest you?" />
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

                <div className="space-y-2">
                  <Label htmlFor="message">Anything else we should know?</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Questions, accessibility requirements, or specific interests..."
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full" disabled={status === "loading"}>
                  {status === "loading" ? "Sending..." : "Request viewing"}
                </Button>

                <p className="text-body-sm text-on-surface-muted">
                  We will confirm your viewing within twenty-four hours. Tours
                  run Tuesday and Thursday — we will suggest the nearest
                  available date.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ViewingDetail({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h3 className="text-h3 font-display text-on-surface">{title}</h3>
      <p className="mt-1 text-body-sm text-on-surface-variant">{text}</p>
    </div>
  );
}
