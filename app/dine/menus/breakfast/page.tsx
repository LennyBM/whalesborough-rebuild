import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Breakfast",
  description: "From 8am. Locally roasted coffee, hot dishes, pastries baked on site.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="The Weir · Menus"
      title="Breakfast"
      description="From 8am. Locally roasted coffee, hot dishes, pastries baked on site."
    />
  );
}
