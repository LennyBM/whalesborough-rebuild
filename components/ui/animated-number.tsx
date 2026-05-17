"use client"

import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useTransform, animate, motion } from "framer-motion"

interface AnimatedNumberProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  duration = 1.5,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (latest) => Math.round(latest))

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, {
        duration,
        ease: [0.16, 1, 0.3, 1], // out-luxury
      })
    }
  }, [isInView, value, duration, motionValue])

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>
        {isInView ? <Counter motionValue={rounded} /> : "0"}
      </motion.span>
      {suffix}
    </span>
  )
}

function Counter({ motionValue }: { motionValue: ReturnType<typeof useTransform<number, number>> }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const unsubscribe = motionValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = String(latest)
      }
    })
    return unsubscribe
  }, [motionValue])

  return <span ref={ref}>0</span>
}
