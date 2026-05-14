import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Your account",
  description: "Manage your bookings, preferences and saved properties.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Account"
      title="Your account"
      description="Manage your bookings, preferences and saved properties."
    />
  );
}
