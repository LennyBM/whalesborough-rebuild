import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Make it yours",
  description: "Welcome hampers, spa treatments, restaurant tables, activity passes.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Booking · Step 3 of 5"
      title="Make it yours"
      description="Welcome hampers, spa treatments, restaurant tables, activity passes."
    />
  );
}
