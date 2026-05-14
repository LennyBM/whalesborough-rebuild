import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Book a viewing",
  description: "Half-day site tours every Tuesday and Thursday.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Lodge Ownership"
      title="Book a viewing"
      description="Half-day site tours every Tuesday and Thursday."
    />
  );
}
