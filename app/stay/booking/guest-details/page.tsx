import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Guest details",
  description: "Names, dietary preferences, accessibility needs, dogs.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Booking · Step 4 of 5"
      title="Guest details"
      description="Names, dietary preferences, accessibility needs, dogs."
    />
  );
}
