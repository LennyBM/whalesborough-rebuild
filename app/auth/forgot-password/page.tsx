import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Forgotten password",
  description: "We'll send a magic link to your inbox.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Account"
      title="Forgotten password"
      description="We'll send a magic link to your inbox."
    />
  );
}
