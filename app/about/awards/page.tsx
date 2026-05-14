import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Awards & Accreditations",
  description: "5★ Gold VisitEngland, NPS 83.3, Feefo 4.5/5 and more.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="About · Awards"
      title="Awards & Accreditations"
      description="5★ Gold VisitEngland, NPS 83.3, Feefo 4.5/5 and more."
    />
  );
}
