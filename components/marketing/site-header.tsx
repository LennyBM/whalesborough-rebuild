"use client";

import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-secondary">
      <div className="flex h-12 items-center justify-center px-4">
        <Link href="/" aria-label="Home">
          <Image
            src="/images/logo/whalesborough-logo.png"
            alt="Whalesborough"
            width={100}
            height={28}
            className="h-7 w-auto"
            priority
          />
        </Link>
      </div>
    </header>
  );
}
