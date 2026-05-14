import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Memberships",
  description: "Local and resident membership tiers. Annual and monthly.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="The W Club · Membership"
      title="Memberships"
      description="Local and resident membership tiers. Annual and monthly."
    />
  );
}
