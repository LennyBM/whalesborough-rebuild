import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in with email, Google or Apple.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Account"
      title="Sign in"
      description="Sign in with email, Google or Apple."
    />
  );
}
