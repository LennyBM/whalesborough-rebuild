import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Menus",
  description: "What we're serving this season.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="The Weir · Menus"
      title="Menus"
      description="What we're serving this season."
    />
  );
}
