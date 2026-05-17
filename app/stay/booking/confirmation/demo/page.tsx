'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { LinkArrow } from '@/components/ui/button'

export default function BookingConfirmationDemoPage() {
  return (
    <main className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Checkmark celebration */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-secondary/10"
        >
          <motion.svg
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="h-12 w-12 text-secondary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <h1 className="heading-editorial text-display-md text-on-surface">
            Booking Confirmed
          </h1>
          <p className="mt-3 text-body text-on-surface-muted">
            Reference: <span className="font-medium text-on-surface">WB-2026-4821</span>
          </p>
        </motion.div>

        {/* Confirmation details card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 bg-surface-container-low p-6 sm:p-8"
        >
          {/* Property header */}
          <div className="flex items-start gap-4">
            <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden">
              <Image
                src="/images/cottages/the-farmhouse.webp"
                alt="The Farmhouse"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="eyebrow text-on-surface-variant">Your stay</p>
              <h2 className="text-h3 text-on-surface">The Farmhouse</h2>
            </div>
          </div>

          {/* Details grid */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailRow label="Dates" value="Sat 12 July – Wed 16 July 2026" />
            <DetailRow label="Guests" value="8 adults, 2 children, 1 dog" />
            <DetailRow label="Check-in" value="4:00pm" />
            <DetailRow label="Check-out" value="10:00am" />
          </div>

          {/* Add-ons */}
          <div className="mt-6 border-t border-on-surface/10 pt-6">
            <p className="eyebrow text-on-surface-variant">Add-ons</p>
            <ul className="mt-2 space-y-1 text-body text-on-surface">
              <li>Cornish Welcome Hamper</li>
              <li>Dog Welcome Kit</li>
              <li>2x Spa Day Pass</li>
            </ul>
          </div>

          {/* Total */}
          <div className="mt-6 border-t border-on-surface/10 pt-6 flex items-baseline justify-between">
            <p className="text-body text-on-surface-muted">Total paid</p>
            <p className="text-h2 text-on-surface">&pound;1,395</p>
          </div>
        </motion.div>

        {/* What happens next */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10"
        >
          <h2 className="text-h3 text-on-surface">What happens next</h2>
          <ol className="mt-6 space-y-6">
            <TimelineItem
              step={1}
              title="Confirmation email sent"
              description="A full summary of your booking is on its way to your inbox now."
            />
            <TimelineItem
              step={2}
              title="3 days before arrival"
              description="We'll send a pre-arrival email with directions, entry codes, and our local recommendations."
            />
            <TimelineItem
              step={3}
              title="On arrival"
              description="A welcome pack will be waiting in your cottage when you arrive."
            />
          </ol>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-12 flex flex-col gap-3 sm:flex-row sm:gap-6"
        >
          <LinkArrow href="/account/bookings">View my bookings</LinkArrow>
          <LinkArrow href="/estate">Explore the estate</LinkArrow>
          <LinkArrow href="/spa/booking">Book a spa treatment</LinkArrow>
        </motion.div>
      </div>
    </main>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="eyebrow text-on-surface-variant">{label}</p>
      <p className="mt-0.5 text-body text-on-surface">{value}</p>
    </div>
  )
}

function TimelineItem({
  step,
  title,
  description,
}: {
  step: number
  title: string
  description: string
}) {
  return (
    <li className="flex gap-4">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary/10">
        <span className="text-sm font-medium text-secondary">{step}</span>
      </div>
      <div>
        <p className="text-body font-medium text-on-surface">{title}</p>
        <p className="mt-0.5 text-body text-on-surface-muted">{description}</p>
      </div>
    </li>
  )
}
