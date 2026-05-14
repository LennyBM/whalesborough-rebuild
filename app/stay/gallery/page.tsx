import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Stay gallery",
  description: "Inside our cottages, suites and spa lodges.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Photography"
      title="Stay gallery"
      description="Inside our cottages, suites and spa lodges."
    />
  );
}
