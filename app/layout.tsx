import type { Metadata, Viewport } from "next";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";

import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Providers } from "@/app/providers";
import { cn } from "@/lib/utils";

import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://whalesborough.co.uk",
  ),
  title: {
    default: "Whalesborough Farm Resort & Spa — Cornish coast luxury",
    template: "%s · Whalesborough Farm Resort & Spa",
  },
  description:
    "A 500-acre working estate on the Cornish coast. Holiday cottages, lodges, the W Club Spa and The Weir Restaurant. 5★ Gold VisitEngland.",
  keywords: [
    "Whalesborough",
    "Cornwall holiday cottages",
    "Bude resort",
    "Cornish spa",
    "luxury lodge sales Cornwall",
    "Marhamchurch",
    "dog friendly Cornwall",
  ],
  authors: [{ name: "Whalesborough Farm Resort & Spa" }],
  creator: "Whalesborough Farm Resort & Spa",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: "Whalesborough Farm Resort & Spa",
    title: "Whalesborough Farm Resort & Spa — Cornish coast luxury",
    description:
      "A 500-acre working estate on the Cornish coast. Holiday cottages, lodges, spa and restaurant.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Whalesborough Farm Resort & Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Whalesborough Farm Resort & Spa",
    description:
      "A working estate on the Cornish coast. Cottages, lodges, spa and restaurant.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "hospitality",
};

export const viewport: Viewport = {
  themeColor: "#4a6457",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={cn(newsreader.variable, jakarta.variable)}>
      <body className="font-body antialiased">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-toast focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-fg"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" className="min-h-[60vh]">
            {children}
          </main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
