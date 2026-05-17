import type { Metadata } from "next";
import { BookingHubClient } from "./booking-hub-client";

export const metadata: Metadata = {
  title: "Book Your Stay | Whalesborough",
  description:
    "Book direct for the best rate on heritage cottages, spa lodges and suites across our 500-acre coastal estate. Instant confirmation, flexible cancellation.",
  openGraph: {
    title: "Book Your Stay | Whalesborough",
    description:
      "Heritage cottages, spa lodges and suites on 500 acres of Cornish coastline. Book direct for the best rate.",
  },
};

export default function BookingHubPage() {
  return <BookingHubClient />;
}
