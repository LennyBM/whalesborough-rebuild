"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-surface-container-low flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="eyebrow text-secondary mb-3">Join Us</p>
          <h1 className="font-display text-h2 text-on-surface">
            Create Your Account
          </h1>
        </div>

        {/* Form card */}
        <div className="bg-surface p-8 md:p-10">
          <form className="space-y-6">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  id="first-name"
                  type="text"
                  placeholder="First name"
                  autoComplete="given-name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  type="text"
                  placeholder="Last name"
                  autoComplete="family-name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                autoComplete="new-password"
                required
              />
            </div>

            {/* Confirm password */}
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                autoComplete="new-password"
                required
              />
            </div>

            {/* Marketing consent */}
            <div className="flex items-start gap-3 pt-2">
              <input
                id="marketing"
                type="checkbox"
                className="mt-1 h-4 w-4 border-2 border-on-surface-variant/30 bg-transparent checked:bg-secondary checked:border-secondary focus:ring-0 focus:ring-offset-0"
              />
              <label
                htmlFor="marketing"
                className="font-body text-body-sm text-on-surface-variant leading-relaxed"
              >
                I&apos;d like to receive news, offers, and updates from
                Whalesborough Farm Resort &amp; Spa. You can unsubscribe at any time.
              </label>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <Button type="submit" variant="primary" size="lg" className="w-full">
                Create Account
              </Button>
            </div>
          </form>

          {/* Sign in link */}
          <p className="mt-8 text-center font-body text-body-sm text-on-surface-variant">
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="text-secondary hover:text-primary transition-colors duration-fast font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
