import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "The local area",
  description: "Widemouth Bay, Bude Canal, Tintagel and beyond.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Local Area"
      title="The local area"
      description="Widemouth Bay, Bude Canal, Tintagel and beyond."
    />
  );
}
