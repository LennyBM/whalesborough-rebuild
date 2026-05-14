import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Private Dining",
  description: "Our private room seats up to fourteen. Tasting menus on request.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="The Weir · Private"
      title="Private Dining"
      description="Our private room seats up to fourteen. Tasting menus on request."
    />
  );
}
