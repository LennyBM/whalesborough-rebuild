"use client";

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
  return (
    <form className="mt-10 space-y-8" onSubmit={(e) => e.preventDefault()}>
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
          <Select name="subject">
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
      </div>

      <Button type="submit" variant="primary" size="lg">
        Send enquiry
      </Button>
    </form>
  );
}
