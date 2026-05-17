"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export function BackButton({ label = "Back", href }: { label?: string; href?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => href ? router.push(href) : router.back()}
      className="inline-flex items-center gap-1 text-sm font-body text-on-surface-muted hover:text-on-surface transition-colors mb-4"
    >
      <ChevronLeft className="h-4 w-4" />
      {label}
    </button>
  );
}
