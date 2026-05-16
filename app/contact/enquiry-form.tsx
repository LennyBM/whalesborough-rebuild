"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
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

export function EnquiryForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [subject, setSubject] = useState("");

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
      subject,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        form.reset();
        setSubject("");
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
      setErrorMessage("Unable to send your enquiry. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-10 rounded-lg bg-surface-container-low p-8 text-center">
        <p className="text-h3 font-display text-on-surface">Thank you for your enquiry</p>
        <p className="mt-3 text-body text-on-surface-variant">
          We have received your message and will be in touch shortly.
        </p>
        <Button
          type="button"
          variant="primary"
          size="md"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
      {status === "error" && errorMessage && (
        <div className="rounded-md bg-red-50 p-4 text-body-sm text-red-800">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
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
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
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
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Select name="subject" value={subject} onValueChange={setSubject}>
            <SelectTrigger id="subject">
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ownership">Lodge ownership</SelectItem>
              <SelectItem value="viewing">Book a viewing</SelectItem>
              <SelectItem value="stay">Holiday stays</SelectItem>
              <SelectItem value="spa">Spa & treatments</SelectItem>
              <SelectItem value="restaurant">The Weir restaurant</SelectItem>
              <SelectItem value="events">Events & private dining</SelectItem>
              <SelectItem value="wedding">Weddings & celebrations</SelectItem>
              <SelectItem value="press">Press & media</SelectItem>
              <SelectItem value="other">Something else</SelectItem>
            </SelectContent>
          </Select>
          {fieldErrors.subject && (
            <p className="text-caption text-red-600">{fieldErrors.subject[0]}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Your message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us how we can help..."
          required
        />
        {fieldErrors.message && (
          <p className="text-caption text-red-600">{fieldErrors.message[0]}</p>
        )}
      </div>

      <Button type="submit" variant="primary" size="lg" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send enquiry"}
      </Button>
    </form>
  );
}
