import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description: "We release new plots in cohorts. Be first to hear.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Lodge Ownership"
      title="Join the waitlist"
      description="We release new plots in cohorts. Be first to hear."
    />
  );
}
