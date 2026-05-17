import type { Metadata } from "next";
import { GalleryContent } from "./gallery-content";

export const metadata: Metadata = {
  title: "Gallery | Whalesborough Farm Resort & Spa, Cornwall",
  description:
    "Explore the estate through our gallery — rolling countryside, heritage cottages, lakeside suites, spa and restaurant imagery from five hundred acres above Widemouth Bay.",
};

export default function GalleryPage() {
  return <GalleryContent />;
}
