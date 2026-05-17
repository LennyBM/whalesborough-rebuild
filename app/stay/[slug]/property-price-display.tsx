"use client"

import { AnimatedNumber } from "@/components/ui/animated-number"

export function PropertyPriceDisplay({ price }: { price: number }) {
  return <AnimatedNumber value={price} prefix="£" suffix="/night" />
}
