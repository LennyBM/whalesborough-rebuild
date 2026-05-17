"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button, LinkArrow } from "@/components/ui/button";

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── Data ─── */
const collections = [
  {
    title: "Gwelva Collection",
    tagline: "Ocean-facing grandeur",
    beds: "2-3 bed",
    price: "From £650,000",
    description:
      "Floor-to-ceiling glass oriented toward the Atlantic. Private hot tub, wrap-around deck, vaulted living spaces designed for light and life.",
    href: "/own/lodges/gwelva",
  },
  {
    title: "Trelowen Collection",
    tagline: "Woodland contemporary",
    beds: "2 bed",
    price: "From £425,000",
    description:
      "Set among ancient oaks with contemporary cedar and glass architecture. Quiet, considered, deeply comfortable.",
    href: "/own/lodges/trelowen",
  },
  {
    title: "Tevi Collection",
    tagline: "Compact luxury",
    beds: "1-2 bed",
    price: "From £285,000",
    description:
      "Estate-edge lodges with all the design integrity of our larger collections. Ideal for couples or a Cornish bolt-hole.",
    href: "/own/lodges/tevi",
  },
  {
    title: "Bespoke",
    tagline: "Your vision, our estate",
    beds: "Any configuration",
    price: "From £500,000",
    description:
      "Work with our architectural partners to design something entirely yours. Choose your plot, specify every finish, own the result.",
    href: "/own/lodges/bespoke",
  },
];

const processSteps = [
  { step: "01", title: "Enquire", description: "Register your interest and receive the ownership prospectus." },
  { step: "02", title: "View", description: "Visit the estate, walk available plots, tour the show lodge." },
  { step: "03", title: "Reserve", description: "Secure your preferred plot with a £5,000 reservation fee." },
  { step: "04", title: "Design", description: "A design consultation to select finishes, layout options and extras." },
  { step: "05", title: "Completion", description: "Exchange, complete, and collect the keys to your Cornish home." },
];

/* ─── Page component ─── */
export function OwnPageContent() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <Image
          src="/images/general/estate-aerial.webp"
          alt="Aerial view of the Whalesborough estate stretching to the Cornish coast"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mx-auto w-full max-w-hero px-6 pb-16 lg:px-12 lg:pb-24"
          >
            <motion.p variants={fadeUp} className="eyebrow text-white/70">
              Lodge Ownership
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="heading-editorial mt-4 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-white"
            >
              A place to <span className="italic">return to</span>.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-body-lg text-white/80">
              Four architect-designed collections across five hundred acres of
              pasture, woodland and clifftop on the North Cornwall coast.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <Link href="/own/viewing/book">
                <Button variant="primary" size="lg">
                  Book a Private Viewing
                </Button>
              </Link>
              <Link href="/own/waitlist">
                <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-on-surface">
                  Join the Waitlist
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ EDITORIAL PITCH ═══ */}
      <section className="bg-background">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mx-auto max-w-content px-6 py-24 lg:px-12 lg:py-40"
        >
          <motion.p variants={fadeUp} className="eyebrow text-on-surface-muted">
            The proposition
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="heading-editorial mt-4 text-display-md lg:text-display-lg text-on-surface max-w-3xl"
          >
            Not an investment. A lifestyle purchase{" "}
            <span className="italic">with rental income</span>.
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3"
          >
            <div>
              <h3 className="text-h3 font-display text-on-surface">Your holiday home</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Use your lodge whenever you like. This is a genuine second home on
                one of the most beautiful stretches of the English coastline, not a
                timeshare, not a fractional scheme.
              </p>
            </div>
            <div>
              <h3 className="text-h3 font-display text-on-surface">Managed rental</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                When you are away, your lodge enters our managed letting programme.
                We handle everything: marketing, guest management, housekeeping,
                maintenance. You receive the income.
              </p>
            </div>
            <div>
              <h3 className="text-h3 font-display text-on-surface">Estate access</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                Full access to the W Club Spa, The Weir Restaurant, lakeside trails,
                watersports and five hundred acres of private Cornish countryside.
                Priority booking, preferential rates.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ COLLECTIONS ═══ */}
      <section className="bg-surface-container-low">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mx-auto max-w-hero px-6 py-24 lg:px-12 lg:py-40"
        >
          <motion.p variants={fadeUp} className="eyebrow text-on-surface-muted">
            Four Collections
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="heading-editorial mt-4 text-h1 text-on-surface max-w-3xl"
          >
            Find the lodge that fits your life
          </motion.h2>
          <motion.div
            variants={stagger}
            className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2"
          >
            {collections.map((c) => (
              <motion.div key={c.title} variants={fadeUp}>
                <Link href={c.href} className="group block">
                  <div className="aspect-[4/3] bg-surface-container relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-sage/10 to-sage/30 group-hover:from-sage/20 group-hover:to-sage/40 transition-colors duration-500" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="eyebrow text-on-surface-muted">{c.tagline}</p>
                      <p className="font-display text-h2 italic text-on-surface/60 mt-1">
                        {c.title}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="heading-editorial text-h2 text-on-surface group-hover:text-primary transition-colors duration-300">
                      {c.title}
                    </h3>
                    <p className="mt-1 flex items-baseline gap-3">
                      <span className="eyebrow text-primary">{c.price}</span>
                      <span className="text-body-sm text-on-surface-muted">{c.beds}</span>
                    </p>
                    <p className="mt-3 text-body text-on-surface-variant">
                      {c.description}
                    </p>
                    <div className="mt-4">
                      <LinkArrow href={c.href}>Explore collection</LinkArrow>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="bg-background">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mx-auto max-w-content px-6 py-24 lg:px-12 lg:py-40"
        >
          <motion.p variants={fadeUp} className="eyebrow text-on-surface-muted">
            How it works
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="heading-editorial mt-4 text-h1 text-on-surface max-w-2xl"
          >
            From first enquiry to front-door keys
          </motion.h2>
          <motion.div
            variants={stagger}
            className="mt-16 grid grid-cols-1 gap-0 sm:grid-cols-5"
          >
            {processSteps.map((s, i) => (
              <motion.div
                key={s.step}
                variants={fadeUp}
                className="relative py-8 sm:py-0 sm:pr-6"
              >
                {i < processSteps.length - 1 && (
                  <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-px bg-outline-variant" />
                )}
                <p className="text-display-md font-display text-primary/40">{s.step}</p>
                <h3 className="mt-3 text-h3 font-display text-on-surface">{s.title}</h3>
                <p className="mt-2 text-body-sm text-on-surface-variant">{s.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ INCOME ═══ */}
      <section className="bg-surface-container-low">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mx-auto max-w-content px-6 py-24 lg:px-12 lg:py-40"
        >
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <motion.p variants={fadeUp} className="eyebrow text-on-surface-muted">
                Rental Income
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="heading-editorial mt-4 text-h1 text-on-surface"
              >
                Earn while you are away
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-6 text-body-lg text-on-surface-variant max-w-lg"
              >
                Projected rental yields of 5-7% net, managed entirely by our
                on-estate team. We handle guest bookings, changeovers, maintenance
                and marketing. You receive quarterly income reports and payments.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="mt-4 text-body text-on-surface-muted"
              >
                Your lodge is your home first. Use it whenever you wish. The rental
                programme works around your calendar, not the other way around.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8">
                <LinkArrow href="/own/rental-income">
                  Full income projections
                </LinkArrow>
              </motion.div>
            </div>
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-6">
              <div className="bg-surface-container p-8">
                <p className="text-display-md font-display text-primary">5-7%</p>
                <p className="mt-2 eyebrow text-on-surface-muted">Projected net yield</p>
              </div>
              <div className="bg-surface-container p-8">
                <p className="text-display-md font-display text-primary">Quarterly</p>
                <p className="mt-2 eyebrow text-on-surface-muted">Income payments</p>
              </div>
              <div className="bg-surface-container p-8">
                <p className="text-display-md font-display text-primary">Fully</p>
                <p className="mt-2 eyebrow text-on-surface-muted">Managed lettings</p>
              </div>
              <div className="bg-surface-container p-8">
                <p className="text-display-md font-display text-primary">Flexible</p>
                <p className="mt-2 eyebrow text-on-surface-muted">Personal use</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══ ESTATE IMAGE BREAK ═══ */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src="/images/general/estate-view.webp"
          alt="View across the Whalesborough estate toward the Cornish coastline"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
      </section>

      {/* ═══ CTA — VIEWING ═══ */}
      <section className="bg-surface-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mx-auto max-w-content px-6 py-24 lg:px-12 lg:py-32 text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="heading-editorial text-display-md lg:text-display-lg text-on-surface"
          >
            See it for yourself
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-body-lg text-on-surface-variant max-w-xl mx-auto"
          >
            Book a private viewing with our ownership team. Walk the plots, tour
            the show lodge, and discover the estate at your own pace. No pressure,
            no obligation.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link href="/own/viewing/book">
              <Button variant="primary" size="lg">
                Book a Private Viewing
              </Button>
            </Link>
            <Link href="/own/waitlist">
              <Button variant="tertiary" size="lg">
                Join the Waitlist
              </Button>
            </Link>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-body-sm text-on-surface-muted"
          >
            Or call our ownership team directly on 01288 361941
          </motion.p>
        </motion.div>
      </section>
    </>
  );
}
