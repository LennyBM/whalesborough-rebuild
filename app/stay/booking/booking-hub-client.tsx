"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  CalendarX2,
  MailCheck,
  Trees,
  Waves,
  UtensilsCrossed,
  Dog,
  Star,
  ArrowRight,
} from "lucide-react";

/* ─── Animation helpers ──────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Data ───────────────────────────────────────────────────────── */

const valueProps = [
  {
    icon: ShieldCheck,
    title: "Best rate guarantee",
    description: "Book direct and you will always pay the lowest available price. Find it cheaper elsewhere and we will match it.",
  },
  {
    icon: CalendarX2,
    title: "Flexible cancellation",
    description: "Plans change. Cancel free of charge up to 14 days before your arrival date for a full refund.",
  },
  {
    icon: MailCheck,
    title: "Instant confirmation",
    description: "Your booking is confirmed the moment you complete checkout. Confirmation email sent within seconds.",
  },
];

const inclusions = [
  {
    icon: Trees,
    title: "500 acres of estate",
    description: "Private walks, ancient woodland, fishing lakes and coastal paths from your doorstep.",
  },
  {
    icon: Waves,
    title: "Spa and wellness access",
    description: "Swimming pool, gym and thermal suite included. Treatments and private hot tubs available to upgrade.",
  },
  {
    icon: UtensilsCrossed,
    title: "The Weir Restaurant",
    description: "Breakfast included for cottage guests. Award-winning dinner menu available to all.",
  },
  {
    icon: Dog,
    title: "Dog-friendly",
    description: "Most properties welcome dogs. Miles of estate walks and a dog wash station on site.",
  },
];

const pricing = [
  {
    name: "Heritage Cottages",
    from: "£155",
    sleeps: "2–12",
    note: "Grade II listed barns and farmhouses",
  },
  {
    name: "Arvor Suites",
    from: "£150",
    sleeps: "2–4",
    note: "Contemporary suites with spa access",
  },
  {
    name: "Spa Lodges",
    from: "£400",
    sleeps: "2–6",
    note: "Private hot tub and terrace",
  },
];

const trustSignals = [
  { label: "VisitEngland", value: "5★ Gold" },
  { label: "Guest NPS", value: "83.3" },
  { label: "Feefo", value: "4.5/5" },
];

/* ─── Component ──────────────────────────────────────────────────── */

export function BookingHubClient() {
  return (
    <article className="bg-background min-h-screen">
      {/* ── Hero ── */}
      <section className="relative h-[60vh] min-h-[480px] lg:h-[70vh] overflow-hidden">
        <Image
          src="/images/hero/cottages-hero.webp"
          alt="Whalesborough heritage cottages at golden hour"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-content px-6 pb-16 lg:px-12 lg:pb-24">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="eyebrow text-white/80"
            >
              Direct booking
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="heading-editorial mt-3 text-display-md md:text-display-lg text-white max-w-3xl"
            >
              Book your stay
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 max-w-xl text-body-lg text-white/90"
            >
              500 acres of Cornish coastline. Heritage cottages, spa lodges and
              contemporary suites — all confirmed instantly.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Quick Book CTA ── */}
      <section className="mx-auto max-w-content px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="relative -mt-12 bg-surface-container-low p-8 md:p-12 lg:p-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8"
        >
          <div>
            <h2 className="font-display text-h2 text-on-surface">
              Ready to book?
            </h2>
            <p className="mt-2 text-body-lg text-on-surface-variant max-w-lg">
              Choose your dates, pick your property and confirm in minutes. No
              payment taken until checkout.
            </p>
          </div>
          <Link href="/stay/booking/dates">
            <Button
              variant="primary"
              size="lg"
              iconRight={<ArrowRight className="h-4 w-4" />}
            >
              Start booking
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* ── Value Props ── */}
      <section className="mx-auto max-w-content px-6 py-24 lg:px-12 lg:py-32">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="eyebrow text-on-surface-muted"
        >
          Why book direct
        </motion.p>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={1}
          className="heading-editorial mt-4 text-h1 text-on-surface max-w-2xl"
        >
          The best price, guaranteed
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {valueProps.map((prop, i) => (
            <motion.div
              key={prop.title}
              variants={fadeUp}
              custom={i + 2}
              className="flex flex-col gap-4"
            >
              <prop.icon
                className="h-8 w-8 text-primary"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h3 className="font-display text-h3 text-on-surface">
                {prop.title}
              </h3>
              <p className="text-body text-on-surface-variant">
                {prop.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── What's Included ── */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-24 lg:px-12 lg:py-32">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="eyebrow text-on-surface-muted"
          >
            Included with every stay
          </motion.p>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="heading-editorial mt-4 text-h1 text-on-surface max-w-2xl"
          >
            More than a place to sleep
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {inclusions.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i + 2}
                className="bg-background p-8 flex flex-col gap-4"
              >
                <item.icon
                  className="h-7 w-7 text-on-surface-variant"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="font-display text-h3 text-on-surface">
                  {item.title}
                </h3>
                <p className="text-body text-on-surface-variant">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Pricing Overview ── */}
      <section className="mx-auto max-w-content px-6 py-24 lg:px-12 lg:py-32">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="eyebrow text-on-surface-muted"
        >
          Pricing
        </motion.p>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={1}
          className="heading-editorial mt-4 text-h1 text-on-surface max-w-2xl"
        >
          Transparent pricing, no hidden fees
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mt-16 overflow-hidden"
        >
          <div className="grid divide-y divide-outline-variant">
            {pricing.map((tier, i) => (
              <motion.div
                key={tier.name}
                variants={fadeUp}
                custom={i + 2}
                className="grid grid-cols-1 gap-2 py-8 md:grid-cols-4 md:items-center md:gap-8"
              >
                <h3 className="font-display text-h3 text-on-surface">
                  {tier.name}
                </h3>
                <p className="text-body text-on-surface-variant">
                  {tier.note}
                </p>
                <p className="text-body text-on-surface-variant">
                  Sleeps {tier.sleeps}
                </p>
                <p className="font-display text-h3 text-on-surface md:text-right">
                  From {tier.from}
                  <span className="text-body text-on-surface-muted">/night</span>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <Link href="/stay/booking/dates">
            <Button
              variant="primary"
              size="lg"
              iconRight={<ArrowRight className="h-4 w-4" />}
            >
              Check availability
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* ── Trust Signals ── */}
      <section className="border-t border-outline-variant">
        <div className="mx-auto max-w-content px-6 py-16 lg:px-12 lg:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-col items-center gap-12 md:flex-row md:justify-center md:gap-20"
          >
            {trustSignals.map((signal, i) => (
              <motion.div
                key={signal.label}
                variants={fadeUp}
                custom={i}
                className="text-center"
              >
                <p className="font-display text-display-md text-on-surface">
                  {signal.value}
                </p>
                <p className="mt-2 eyebrow text-on-surface-muted">
                  {signal.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-24 lg:px-12 lg:py-32 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="heading-editorial text-h1 md:text-display-md text-on-surface max-w-2xl mx-auto"
          >
            Your Cornish escape starts here
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-body-lg text-on-surface-variant max-w-lg mx-auto"
          >
            Select your dates and we will show you every available property.
            No payment until checkout.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10"
          >
            <Link href="/stay/booking/dates">
              <Button
                variant="primary"
                size="lg"
                iconRight={<ArrowRight className="h-4 w-4" />}
              >
                Start booking
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </article>
  );
}
