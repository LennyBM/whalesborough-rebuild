"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-surface-container-low flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="eyebrow text-secondary mb-3">Password Reset</p>
          <h1 className="font-display text-h2 text-on-surface">
            Forgot Your Password?
          </h1>
          <p className="mt-4 font-body text-body text-on-surface-variant">
            Enter your email address and we&apos;ll send you a link to reset your
            password.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-surface p-8 md:p-10">
          <form className="space-y-6">
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

            {/* Submit */}
            <div className="pt-4">
              <Button type="submit" variant="primary" size="lg" className="w-full">
                Send Reset Link
              </Button>
            </div>
          </form>

          {/* Back to sign in */}
          <p className="mt-8 text-center font-body text-body-sm text-on-surface-variant">
            <Link
              href="/auth/sign-in"
              className="text-secondary hover:text-primary transition-colors duration-fast font-medium"
            >
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
