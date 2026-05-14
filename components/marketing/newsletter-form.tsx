"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * NewsletterForm — separate email + SMS opt-in checkboxes per PECR.
 * Wave 2 will wire this up to a tRPC mutation.
 * Critical: neither checkbox is pre-checked (DUAA 2025 compliance).
 */
export function NewsletterForm() {
  const [emailOptIn, setEmailOptIn] = React.useState(false);
  const [smsOptIn, setSmsOptIn] = React.useState(false);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        // Wave 2: wire to /api/newsletter route
      }}
    >
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

      <Button type="submit" variant="primary" size="md" className="self-start">
        Subscribe
      </Button>

      <p className="text-caption text-on-surface-muted">
        See our <a href="/legal/privacy" className="underline hover:text-primary">privacy policy</a>{" "}
        for how we handle your data.
      </p>
    </form>
  );
}
