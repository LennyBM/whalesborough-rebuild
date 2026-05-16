"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * NewsletterForm — separate email + SMS opt-in checkboxes per PECR.
 * Critical: neither checkbox is pre-checked (DUAA 2025 compliance).
 */
export function NewsletterForm() {
  const [emailOptIn, setEmailOptIn] = React.useState(false);
  const [smsOptIn, setSmsOptIn] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      email: formData.get("email") as string,
      emailOptIn,
      smsOptIn,
    };

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        form.reset();
        setEmailOptIn(false);
        setSmsOptIn(false);
      } else if (res.status === 400) {
        setStatus("error");
        const details = data.details;
        const firstError = details
          ? Object.values(details).flat()[0]
          : data.error;
        setErrorMessage((firstError as string) || "Please check your details and try again.");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Unable to subscribe. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-body font-medium text-on-surface">You are subscribed</p>
        <p className="text-body-sm text-on-surface-variant">
          Thank you for signing up. We will be in touch with news, offers and events.
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      {status === "error" && errorMessage && (
        <p className="text-caption text-red-600">{errorMessage}</p>
      )}

      <div>
        <Label htmlFor="newsletter-email" className="text-on-surface-variant">
          Stay in touch
        </Label>
        <Input
          id="newsletter-email"
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          className="mt-2"
        />
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <div className="flex items-start gap-3">
          <Checkbox
            id="newsletter-email-opt-in"
            checked={emailOptIn}
            onCheckedChange={(checked) => setEmailOptIn(checked === true)}
          />
          <Label
            htmlFor="newsletter-email-opt-in"
            className="font-normal normal-case tracking-normal text-body-sm text-on-surface-variant"
          >
            Send me email updates about stays, events and offers.
          </Label>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox
            id="newsletter-sms-opt-in"
            checked={smsOptIn}
            onCheckedChange={(checked) => setSmsOptIn(checked === true)}
          />
          <Label
            htmlFor="newsletter-sms-opt-in"
            className="font-normal normal-case tracking-normal text-body-sm text-on-surface-variant"
          >
            Send me SMS updates (separate consent from email).
          </Label>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        className="self-start"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </Button>

      <p className="text-caption text-on-surface-muted">
        See our <a href="/legal/privacy" className="underline hover:text-primary">privacy policy</a>{" "}
        for how we handle your data.
      </p>
    </form>
  );
}
