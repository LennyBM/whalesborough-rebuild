import type { Metadata } from "next";

import { EstateContent } from "./estate-content";

export const metadata: Metadata = {
  title: "The Estate | Whalesborough",
  description:
    "Five hundred acres of North Cornwall countryside above Widemouth Bay — heritage cottages, a working farm, three lakes, woodland walks, clifftop paths, spa and restaurant.",
  openGraph: {
    title: "The Estate | Whalesborough",
    description:
      "Five hundred acres of North Cornwall countryside above Widemouth Bay — heritage cottages, a working farm, three lakes, woodland walks, clifftop paths, spa and restaurant.",
    images: [{ url: "/images/general/estate-aerial.webp" }],
  },
};

export default function Page() {
  return <EstateContent />;
}
