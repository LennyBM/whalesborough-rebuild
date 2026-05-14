import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Check your inbox",
  description:
    "We've sent you a sign-in link. Click it from this device to continue.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Account"
      title="Check your inbox"
      description="We've sent you a sign-in link. Click it from this device to continue. The link expires in 24 hours."
    />
  );
}
