import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Lunch",
  description: "From midday. Long lunches encouraged.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="The Weir · Menus"
      title="Lunch"
      description="From midday. Long lunches encouraged."
    />
  );
}
