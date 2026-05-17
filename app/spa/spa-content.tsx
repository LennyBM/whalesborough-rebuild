"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { LinkArrow } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const treatments = [
  {
    title: "Massage & Body",
    description:
      "Deep tissue, hot stone, and Cornish sea-salt body scrubs. Tension released, circulation restored.",
    from: "£75",
    duration: "60 mins",
  },
  {
    title: "Facials",
    description:
      "Bespoke facials using Gaia Natural Skincare — Cornish botanicals that feed, not fight, your skin.",
    from: "£65",
    duration: "45 mins",
  },
  {
    title: "Rituals & Journeys",
    description:
      "Extended treatments that combine body, face and scalp. Surrender the afternoon to the land.",
    from: "£120",
    duration: "90 mins",
  },
  {
    title: "Couples Experiences",
    description:
      "Side-by-side treatment suites, shared thermal journeys, prosecco on the terrace. An occasion, not just a booking.",
    from: "£180",
    duration: undefined,
  },
];

const facilityImages = [
  { src: "/images/spa/spa-interior.webp", alt: "The W Club Spa interior with floor-to-ceiling glass" },
  { src: "/images/spa/spa-barn-full.webp", alt: "The Spa Barn at Whalesborough" },
  { src: "/images/spa/pool.webp", alt: "Indoor infinity pool overlooking the lakes" },
  { src: "/images/spa/spa-treatment.webp", alt: "Spa treatment room with Cornish botanicals" },
  { src: "/images/spa/spa-exterior.webp", alt: "The W Club Spa exterior at dusk" },
  { src: "/images/spa/spa-wellness.webp", alt: "Relaxation suite with heated loungers" },
];

export function SpaContent() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
        <Image
          src="/images/spa/pool-shoot.webp"
          alt="The W Club Spa — indoor pool with estate views"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-hero px-6 pb-16 lg:px-12 lg:pb-24">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="eyebrow text-white/80"
            >
              Wellness at Whalesborough
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="heading-editorial mt-4 text-display-md text-white md:text-display-lg lg:text-display-xl"
            >
              The W Club
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-6 max-w-xl text-body-lg text-white/90"
            >
              Indoor pool, thermal suite, outdoor hot tubs — and a treatment menu
              drawn from the Cornish landscape.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 flex flex-wrap gap-6"
            >
              <Link href="/spa/booking">
                <LinkArrow className="text-white hover:text-white/80">
                  Book a treatment
                </LinkArrow>
              </Link>
              <Link href="/spa/spa-days">
                <LinkArrow className="text-white hover:text-white/80">
                  Spa day packages
                </LinkArrow>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Introduction ─── */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20"
          >
            <div>
              <motion.p variants={fadeUp} custom={0} className="eyebrow text-on-surface-muted">
                The W Club Spa
              </motion.p>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="heading-editorial mt-4 text-h1 text-on-surface"
              >
                A spa shaped by the{" "}
                <span className="font-display italic">estate</span>.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="mt-6 text-body-lg text-on-surface-variant"
              >
                Five hundred acres of working farmland, three spring-fed lakes and
                the salt air of the Atlantic. The landscape here is the treatment —
                we simply brought it indoors.
              </motion.p>
            </div>
            <div className="space-y-6">
              <motion.p variants={fadeUp} custom={2} className="text-body text-on-surface-variant">
                Our 15-metre indoor infinity pool is heated to 30 degrees and
                overlooks the lakes through floor-to-ceiling glass. Step outside to
                the outdoor hot tubs or thermal suite — Swedish sauna, aroma steam
                room, and experience showers designed for contrast therapy.
              </motion.p>
              <motion.p variants={fadeUp} custom={3} className="text-body text-on-surface-variant">
                Treatments use Gaia Natural Skincare, formulated from Cornish
                botanicals and estate-grown herbs. Sea-salt scrubs, wildflower oils,
                mineral-rich clays — ingredients drawn from the land you can see
                through every window.
              </motion.p>
              <motion.p variants={fadeUp} custom={4} className="text-body text-on-surface-variant">
                This is not a hotel spa bolted onto a resort. The W Club was
                designed from the ground up as a place to slow down — luxury, but
                never pretentious.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Treatment Categories ─── */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} custom={0} className="eyebrow text-on-surface-muted">
              Treatments
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="heading-editorial mt-4 text-h1 max-w-3xl text-on-surface"
            >
              Rituals drawn from the land
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 max-w-2xl text-body-lg text-on-surface-variant"
            >
              Every treatment on our menu uses Cornish botanicals, estate-grown
              ingredients, and the rhythms of the coast as its foundation.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mt-16 grid grid-cols-1 gap-px bg-outline-variant/30 sm:grid-cols-2"
          >
            {treatments.map((t, i) => (
              <motion.div
                key={t.title}
                variants={fadeUp}
                custom={i}
                className="bg-surface-container-low p-8 lg:p-12"
              >
                <h3 className="text-h2 text-on-surface">{t.title}</h3>
                <p className="mt-4 text-body text-on-surface-variant">
                  {t.description}
                </p>
                <div className="mt-6 flex items-baseline gap-4">
                  <span className="text-h3 text-on-surface">from {t.from}</span>
                  {t.duration && (
                    <span className="text-body-sm text-on-surface-muted">
                      {t.duration}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <Link href="/spa/treatments">
              <LinkArrow>View the full treatment menu</LinkArrow>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── Facilities Image Grid ─── */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} custom={0} className="eyebrow text-on-surface-muted">
              Facilities
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="heading-editorial mt-4 text-h1 max-w-3xl text-on-surface"
            >
              Water, heat, stillness
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 max-w-2xl text-body-lg text-on-surface-variant"
            >
              15m indoor infinity pool, outdoor heated hot tubs, Swedish sauna,
              aroma steam room, experience showers, relaxation suite, and a
              Technogym fitness studio overlooking the lakes.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {facilityImages.map((img, i) => (
              <motion.div
                key={img.src}
                variants={fadeUp}
                custom={i}
                className="relative aspect-[4/3] overflow-hidden"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Membership CTA ─── */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20"
          >
            <div>
              <motion.p variants={fadeUp} custom={0} className="eyebrow text-on-surface-muted">
                Membership
              </motion.p>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="heading-editorial mt-4 text-h1 text-on-surface"
              >
                Lakeside Locals
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="mt-6 text-body-lg text-on-surface-variant"
              >
                Live nearby? The W Club membership gives you year-round access to
                pools, thermal suite, gym, and member-only rates on treatments. A
                space to return to, not just visit.
              </motion.p>
              <motion.div
                variants={fadeUp}
                custom={3}
                className="mt-8 flex flex-wrap gap-6"
              >
                <Link href="/spa/memberships">
                  <LinkArrow>Membership details</LinkArrow>
                </Link>
                <Link href="/spa/gift-vouchers">
                  <LinkArrow>Gift vouchers</LinkArrow>
                </Link>
              </motion.div>
            </div>
            <motion.div
              variants={fadeUp}
              custom={2}
              className="relative aspect-[4/3] overflow-hidden"
            >
              <Image
                src="/images/spa/spa-wellness.webp"
                alt="Relaxation suite at The W Club Spa"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Opening Hours ─── */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 gap-12 lg:grid-cols-3"
          >
            <div className="lg:col-span-2">
              <motion.p variants={fadeUp} custom={0} className="eyebrow text-on-surface-muted">
                Visit
              </motion.p>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="heading-editorial mt-4 text-h1 text-on-surface"
              >
                Opening hours
              </motion.h2>
              <motion.div
                variants={fadeUp}
                custom={2}
                className="mt-8 space-y-4"
              >
                <div className="flex justify-between border-b border-outline-variant/30 pb-4 max-w-md">
                  <span className="text-body text-on-surface">Spa & Thermal Suite</span>
                  <span className="text-body text-on-surface-variant">7:00am &ndash; 9:00pm</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/30 pb-4 max-w-md">
                  <span className="text-body text-on-surface">Swimming Pool</span>
                  <span className="text-body text-on-surface-variant">7:00am &ndash; 8:00pm</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/30 pb-4 max-w-md">
                  <span className="text-body text-on-surface">Fitness Suite</span>
                  <span className="text-body text-on-surface-variant">6:00am &ndash; 9:00pm</span>
                </div>
                <div className="flex justify-between max-w-md">
                  <span className="text-body text-on-surface">Treatments</span>
                  <span className="text-body text-on-surface-variant">9:00am &ndash; 7:00pm</span>
                </div>
              </motion.div>
              <motion.p
                variants={fadeUp}
                custom={3}
                className="mt-6 text-body-sm text-on-surface-muted"
              >
                Open Monday to Sunday, 365 days a year.
              </motion.p>
            </div>
            <motion.div
              variants={fadeUp}
              custom={2}
              className="flex flex-col justify-center"
            >
              <p className="text-body text-on-surface-variant">
                Access included for all resort guests and lodge owners. Day spa
                visitors and members welcome — advance booking recommended.
              </p>
              <div className="mt-6">
                <Link href="/spa/booking">
                  <LinkArrow>Book your visit</LinkArrow>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
