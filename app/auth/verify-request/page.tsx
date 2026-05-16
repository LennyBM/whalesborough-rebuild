"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

export default function VerifyRequestPage() {
  return (
    <main className="min-h-screen bg-surface-container-low flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        {/* Confirmation card */}
        <div className="bg-surface p-8 md:p-10 text-center">
          {/* Icon */}
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center bg-surface-container-low">
            <Mail className="h-8 w-8 text-secondary" aria-hidden="true" />
          </div>

          {/* Header */}
          <p className="eyebrow text-secondary mb-3">Almost There</p>
          <h1 className="font-display text-h2 text-on-surface">
            Check Your Email
          </h1>

          {/* Description */}
          <p className="mt-6 font-body text-body text-on-surface-variant leading-relaxed">
            We&apos;ve sent a password reset link to your email address. Please
            check your inbox and follow the instructions to reset your password.
          </p>

          <p className="mt-4 font-body text-body-sm text-on-surface-variant">
            Didn&apos;t receive the email? Check your spam folder or try again in a
            few minutes.
          </p>

          {/* Back to sign in */}
          <div className="mt-10 pt-6 border-t border-outline-variant/30">
            <Link
              href="/auth/sign-in"
              className="font-body text-body-sm text-secondary hover:text-primary transition-colors duration-fast font-medium"
            >
              Return to sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
