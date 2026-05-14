import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Save preferences, manage bookings, earn loyalty rewards.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Account"
      title="Create an account"
      description="Save preferences, manage bookings, earn loyalty rewards."
    />
  );
}
