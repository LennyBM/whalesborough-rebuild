import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "About Whalesborough",
  description: "How the estate came to be and where it's going.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="About"
      title="About Whalesborough"
      description="How the estate came to be and where it's going."
    />
  );
}
