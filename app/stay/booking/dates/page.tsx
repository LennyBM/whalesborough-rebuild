import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "When are you coming?",
  description: "Choose your dates and party. Sea-view cottages book quickest.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Booking · Step 1 of 5"
      title="When are you coming?"
      description="Choose your dates and party. Sea-view cottages book quickest."
    />
  );
}
