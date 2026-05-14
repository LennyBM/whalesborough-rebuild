import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Lakeside Locals",
  description: "Our membership for residents and regulars. Priority seating and member events.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="The Weir · Membership"
      title="Lakeside Locals"
      description="Our membership for residents and regulars. Priority seating and member events."
    />
  );
}
