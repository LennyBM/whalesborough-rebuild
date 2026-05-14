import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Reserve a table",
  description: "Book for two or for twenty. Outdoor and indoor.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="The Weir · Reserve"
      title="Reserve a table"
      description="Book for two or for twenty. Outdoor and indoor."
    />
  );
}
