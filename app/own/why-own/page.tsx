import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Why own at Whalesborough",
  description: "What ownership looks like across a year.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Lodge Ownership"
      title="Why own at Whalesborough"
      description="What ownership looks like across a year."
    />
  );
}
