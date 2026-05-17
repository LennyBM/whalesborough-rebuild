import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Spa Treatment | The W Club | Whalesborough",
  description:
    "Book treatments, spa days and gift vouchers at The W Club Spa. Call, book online via Try.be or visit reception. Whalesborough Farm Resort, Bude, Cornwall.",
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
