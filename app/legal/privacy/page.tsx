import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How we collect, process and protect your personal data — UK GDPR / DPA 2018.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      description="How we collect, process and protect your personal data — UK GDPR / DPA 2018."
    />
  );
}
