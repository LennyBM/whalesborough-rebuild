"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-surface-container-low flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="eyebrow text-secondary mb-3">Welcome Back</p>
          <h1 className="font-display text-h2 text-on-surface">
            Sign In
          </h1>
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

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/auth/forgot-password"
                  className="font-body text-body-sm text-secondary hover:text-primary transition-colors duration-fast"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              <Button type="submit" variant="primary" size="lg" className="w-full">
                Sign In
              </Button>
            </div>
          </form>

          {/* Sign up link */}
          <p className="mt-8 text-center font-body text-body-sm text-on-surface-variant">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="text-secondary hover:text-primary transition-colors duration-fast font-medium"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
