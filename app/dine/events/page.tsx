import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Events",
  description: "Grill and Chill, seasonal suppers, harvest festival.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="The Weir · Events"
      title="Events"
      description="Grill and Chill, seasonal suppers, harvest festival."
    />
  );
}
