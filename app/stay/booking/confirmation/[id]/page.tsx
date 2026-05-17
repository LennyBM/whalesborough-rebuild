'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Calendar, Share2, Users, Clock, Dog } from 'lucide-react'

// --- Confetti (CSS keyframes, no library) ---
const confettiColors = [
  '#703a1d',
  '#4a6457',
  '#e8b87d',
  '#8fb5a3',
  '#d4956a',
  '#5c8a72',
]

function ConfettiPiece({ index }: { index: number }) {
  const color = confettiColors[index % confettiColors.length]
  const left = Math.random() * 100
  const delay = Math.random() * 0.8
  const duration = 2.5 + Math.random() * 1.5
  const rotation = Math.random() * 360
  const size = 6 + Math.random() * 6

  return (
    <div
      className="confetti-piece absolute top-0 pointer-events-none"
      style={{
        left: `${left}%`,
        width: `${size}px`,
        height: `${size * 0.4}px`,
        backgroundColor: color,
        borderRadius: '2px',
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        transform: `rotate(${rotation}deg)`,
      }}
    />
  )
}

function Confetti() {
  const [pieces] = useState(() => Array.from({ length: 60 }, (_, i) => i))

  return (
    <div className="confetti-container fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((i) => (
        <ConfettiPiece key={i} index={i} />
      ))}
    </div>
  )
}

// --- Animated checkmark ---
function AnimatedCheckmark() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.2 }}
      className="relative mx-auto flex h-28 w-28 items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 1 }}
        animate={{ scale: 1.4, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
        className="absolute inset-0 rounded-full bg-secondary/20"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.15 }}
        className="absolute inset-0 rounded-full bg-secondary/10"
      />
      <svg
        className="relative h-14 w-14 text-secondary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          initial={{ pathLength: 0, opacity: 1 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </motion.div>
  )
}

// --- Calendar URL helper ---
function generateCalendarUrl(ref: string) {
  const start = '20260620T160000'
  const end = '20260623T100000'
  const title = encodeURIComponent('Whalesborough - Trevose Cottage')
  const location = encodeURIComponent(
    'Whalesborough Farm, Bude, Cornwall EX23 0AS'
  )
  const details = encodeURIComponent(
    `Your stay at Trevose Cottage. Check-in: 4pm. Ref: ${ref}`
  )
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&location=${location}&details=${details}`
}

// --- Main Page ---
export default function BookingConfirmationPage() {
  const params = useParams()
  const bookingRef = (params.id as string) || 'WB-2026-001'
  const [showConfetti, setShowConfetti] = useState(true)
  const [shareSupported, setShareSupported] = useState(false)

  useEffect(() => {
    setShareSupported(typeof navigator !== 'undefined' && !!navigator.share)
    const timer = setTimeout(() => setShowConfetti(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  const handleShare = async () => {
    const shareData = {
      title: 'Our trip to Whalesborough!',
      text: "We're heading to Trevose Cottage at Whalesborough, 20-23 June 2026!",
      url: typeof window !== 'undefined' ? window.location.href : '',
    }
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        // cancelled
      }
    } else {
      await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`)
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes confetti-fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .confetti-piece {
          animation-name: confetti-fall;
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation-fill-mode: forwards;
        }
      ` }} />

      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Confetti />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          {/* Animated checkmark */}
          <AnimatedCheckmark />

          {/* Heading */}
          <motion.div
            initial={{ opacity: 1, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <h1 className="font-display italic text-display-md text-on-surface">
              You&rsquo;re booked
            </h1>
            <p className="mt-3 text-body-lg text-on-surface-muted">
              Your coastal escape is confirmed
            </p>
          </motion.div>

          {/* Booking reference badge */}
          <motion.div
            initial={{ opacity: 1, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="mt-6 mx-auto w-fit rounded-full bg-secondary/10 px-5 py-2"
          >
            <p className="text-body-sm font-medium text-secondary tracking-wide">
              Ref: {bookingRef}
            </p>
          </motion.div>

          {/* Main booking card */}
          <motion.div
            initial={{ opacity: 1, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-10 overflow-hidden rounded-2xl bg-surface-container-low shadow-sm"
          >
            {/* Property image */}
            <div className="relative h-44 w-full overflow-hidden">
              <Image
                src="/images/cottages/whalesborough-cottage.webp"
                alt="Trevose Cottage at Whalesborough"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <p className="text-sm font-medium text-white/80">Your stay</p>
                <h2 className="font-display italic text-h2 text-white">
                  Trevose Cottage
                </h2>
              </div>
            </div>

            {/* Booking details */}
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-2 gap-5">
                <DetailItem
                  icon={<Calendar className="h-4 w-4" />}
                  label="Dates"
                  value="Fri 20 – Mon 23 Jun"
                  sub="3 nights"
                />
                <DetailItem
                  icon={<Users className="h-4 w-4" />}
                  label="Guests"
                  value="2 adults"
                />
                <DetailItem
                  icon={<Clock className="h-4 w-4" />}
                  label="Check-in"
                  value="4:00 pm"
                  sub="Check-out 10:00 am"
                />
                <DetailItem
                  icon={<Dog className="h-4 w-4" />}
                  label="Furry friends"
                  value="1 dog"
                />
              </div>

              <div className="my-6 border-t border-on-surface/8" />

              {/* Extras */}
              <div>
                <p className="text-body-sm font-medium text-on-surface-muted uppercase tracking-wider mb-3">
                  Extras
                </p>
                <div className="space-y-2">
                  <ExtraRow name="Relaxation Massage ×2" price="£170" />
                  <ExtraRow name="Cornish Welcome Hamper" price="£65" />
                  <ExtraRow name="Dog Welcome Pack" price="£25" />
                </div>
              </div>

              <div className="my-6 border-t border-on-surface/8" />

              {/* Total */}
              <div className="flex items-baseline justify-between">
                <p className="text-body text-on-surface-muted">Total paid</p>
                <p className="font-display italic text-display-sm text-on-surface">
                  &pound;1,155
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-6 grid grid-cols-2 gap-3"
          >
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 rounded-2xl bg-surface-container px-4 py-3.5 text-body-sm font-medium text-on-surface transition-colors hover:bg-surface-container-low active:scale-[0.97]"
            >
              <Share2 className="h-4 w-4 text-secondary" />
              <span>
                {shareSupported ? 'Share with companion' : 'Copy link'}
              </span>
            </button>
            <a
              href={generateCalendarUrl(bookingRef)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-surface-container px-4 py-3.5 text-body-sm font-medium text-on-surface transition-colors hover:bg-surface-container-low active:scale-[0.97]"
            >
              <Calendar className="h-4 w-4 text-secondary" />
              <span>Add to calendar</span>
            </a>
          </motion.div>

          {/* What happens next */}
          <motion.div
            initial={{ opacity: 1, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="mt-10 rounded-2xl bg-surface-container-low p-6 sm:p-8"
          >
            <h2 className="font-display italic text-h3 text-on-surface">
              What happens next
            </h2>
            <ol className="mt-6 space-y-5">
              <TimelineItem
                step={1}
                title="Confirmation email sent"
                description="Check your inbox for full booking details and directions."
                delay={1.1}
              />
              <TimelineItem
                step={2}
                title="7 days before arrival"
                description="We'll send your welcome pack with key collection, WiFi codes, and local tips."
                delay={1.2}
              />
              <TimelineItem
                step={3}
                title="Arrival day"
                description="Check-in from 4pm. Cottage ready, hamper chilled, fire laid."
                delay={1.3}
              />
            </ol>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 pb-8"
          >
            <Link href="/">
              <Button variant="primary" size="lg">
                Back to homepage
              </Button>
            </Link>
            <Link href="/estate">
              <Button variant="secondary" size="lg">
                Explore the estate
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  )
}

// --- Sub-components ---

function DetailItem({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 text-secondary">{icon}</div>
      <div>
        <p className="text-body-sm text-on-surface-muted">{label}</p>
        <p className="text-body font-medium text-on-surface">{value}</p>
        {sub && <p className="text-body-sm text-on-surface-muted">{sub}</p>}
      </div>
    </div>
  )
}

function ExtraRow({ name, price }: { name: string; price: string }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-body text-on-surface">{name}</p>
      <p className="text-body text-on-surface-muted">{price}</p>
    </div>
  )
}

function TimelineItem({
  step,
  title,
  description,
  delay,
}: {
  step: number
  title: string
  description: string
  delay: number
}) {
  return (
    <motion.li
      initial={{ opacity: 1, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex gap-4"
    >
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary/10">
        <span className="text-sm font-medium text-secondary">{step}</span>
      </div>
      <div>
        <p className="text-body font-medium text-on-surface">{title}</p>
        <p className="mt-0.5 text-body-sm text-on-surface-muted">
          {description}
        </p>
      </div>
    </motion.li>
  )
}
