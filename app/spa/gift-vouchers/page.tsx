import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Gift Vouchers",
  description: "Treatments, spa days, full retreats — gifted in any amount.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="The W Club · Gifts"
      title="Gift Vouchers"
      description="Treatments, spa days, full retreats — gifted in any amount."
    />
  );
}
