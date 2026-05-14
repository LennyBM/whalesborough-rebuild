import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Choose your stay",
  description: "Available properties for the dates you've selected.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Booking · Step 2 of 5"
      title="Choose your stay"
      description="Available properties for the dates you've selected."
    />
  );
}
