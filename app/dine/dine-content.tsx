"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { LinkArrow } from "@/components/ui/button";

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const mealTimes = [
  { label: "Breakfast", time: "7:30am – 10:00am", note: "Estate guests" },
  { label: "Lunch", time: "12:00pm – 3:00pm", note: "Open to all" },
  { label: "Sunday Lunch", time: "12:00pm – 3:00pm", note: "Booking advised" },
  { label: "Private Dining", time: "By arrangement", note: "Groups of 8–20" },
];

const starters = [
  { dish: "Cornish crab, brown butter, sea herbs, sourdough crisp", price: "£14" },
  { dish: "Beetroot cured trout, horseradish cream, watercress", price: "£12" },
  { dish: "Estate garden soup, herb oil, warm soda bread", price: "£8" },
  { dish: "Porthilly mussels, cider, wild garlic, crusty bread", price: "£13" },
];

const mains = [
  { dish: "Day-boat hake, crushed new potatoes, samphire, caper butter", price: "£24" },
  { dish: "Grass-fed sirloin, bone marrow butter, triple-cooked chips, watercress", price: "£28" },
  { dish: "Roast cauliflower, romesco, toasted almonds, estate leaves", price: "£18" },
  { dish: "Slow-braised lamb shoulder, root vegetables, rosemary jus", price: "£26" },
];

const desserts = [
  { dish: "Chocolate fondant, clotted cream, sea salt", price: "£12" },
  { dish: "Rhubarb and custard, ginger crumb, elderflower", price: "£10" },
  { dish: "Cornish cheese board, chutney, oat crackers", price: "£11" },
  { dish: "Vanilla panna cotta, seasonal fruit compote", price: "£9" },
];

export function DineContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
        <Image
          src="/images/restaurant/weir-restaurant-exterior.webp"
          alt="The Weir Restaurant at Whalesborough, a stone building beside the lake"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <motion.div
          className="absolute inset-0 flex flex-col justify-end px-6 pb-16 lg:px-12 lg:pb-24"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p
            className="eyebrow text-white/80"
            variants={fade}
            custom={0}
          >
            Whalesborough Estate
          </motion.p>
          <motion.h1
            className="heading-editorial mt-4 text-display-md md:text-display-lg lg:text-display-xl max-w-3xl text-white"
            variants={fade}
            custom={1}
          >
            The Weir
          </motion.h1>
          <motion.p
            className="mt-4 max-w-xl text-body-lg text-white/85"
            variants={fade}
            custom={2}
          >
            Lakeside dining. Open fire. Honest Cornish food.
          </motion.p>
        </motion.div>
      </section>

      {/* Editorial Intro */}
      <section className="bg-background">
        <motion.div
          className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <motion.p className="eyebrow text-on-surface-muted" variants={fade} custom={0}>
                The Restaurant
              </motion.p>
              <motion.h2
                className="heading-editorial mt-4 text-h1 text-on-surface"
                variants={fade}
                custom={1}
              >
                What grows here,{" "}
                <span className="italic">goes here</span>.
              </motion.h2>
              <motion.p
                className="mt-6 text-body-lg text-on-surface-variant"
                variants={fade}
                custom={2}
              >
                The Weir Restaurant sits at the water&apos;s edge, where the estate
                lake meets the treeline. The kitchen works to a simple rule: if
                it can be grown in our market garden or sourced within the county,
                it belongs on the plate.
              </motion.p>
              <motion.p
                className="mt-4 text-body text-on-surface-variant"
                variants={fade}
                custom={3}
              >
                Cornish day-boat fish. Grass-fed beef from neighbouring farms.
                Herbs cut that morning. An open fire that anchors the room through
                every season. This is not a restaurant trying to impress — it is
                a kitchen that respects its surroundings.
              </motion.p>
            </div>
            <motion.div
              className="relative aspect-[4/5] overflow-hidden"
              variants={fade}
              custom={2}
            >
              <Image
                src="/images/restaurant/restaurant.webp"
                alt="Interior of The Weir Restaurant with lakeside views"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Meal Times */}
      <section className="bg-surface-container-low">
        <motion.div
          className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <motion.p className="eyebrow text-on-surface-muted" variants={fade} custom={0}>
            Opening hours
          </motion.p>
          <motion.h2
            className="heading-editorial mt-4 text-h1 text-on-surface"
            variants={fade}
            custom={1}
          >
            When to find us
          </motion.h2>
          <div className="mt-12 grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
            {mealTimes.map((item, i) => (
              <motion.div
                key={item.label}
                className="border-l border-outline-variant px-6 py-6 first:border-l-0 sm:[&:nth-child(2)]:border-l lg:[&:nth-child(2)]:border-l"
                variants={fade}
                custom={i + 2}
              >
                <p className="text-body font-medium text-on-surface">{item.label}</p>
                <p className="mt-2 font-display text-h3 italic text-on-surface">
                  {item.time}
                </p>
                <p className="mt-1 text-body-sm text-on-surface-muted">{item.note}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Menu Highlights */}
      <section className="bg-background">
        <motion.div
          className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <motion.p className="eyebrow text-on-surface-muted" variants={fade} custom={0}>
            Seasonal menu
          </motion.p>
          <motion.h2
            className="heading-editorial mt-4 text-h1 text-on-surface"
            variants={fade}
            custom={1}
          >
            From the kitchen
          </motion.h2>
          <motion.p
            className="mt-4 max-w-2xl text-body text-on-surface-variant"
            variants={fade}
            custom={2}
          >
            Our menu changes with the seasons and the garden. These dishes reflect
            what is typically available — the blackboard in the restaurant tells
            the full story each day.
          </motion.p>

          <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-3 lg:gap-12">
            {/* Starters */}
            <motion.div variants={fade} custom={3}>
              <h3 className="font-display text-h3 italic text-on-surface">Starters</h3>
              <div className="mt-6 space-y-5">
                {starters.map((item) => (
                  <div key={item.dish} className="flex items-baseline justify-between gap-4">
                    <p className="text-body text-on-surface-variant">{item.dish}</p>
                    <p className="shrink-0 font-display text-body italic text-on-surface">
                      {item.price}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Mains */}
            <motion.div variants={fade} custom={4}>
              <h3 className="font-display text-h3 italic text-on-surface">Mains</h3>
              <div className="mt-6 space-y-5">
                {mains.map((item) => (
                  <div key={item.dish} className="flex items-baseline justify-between gap-4">
                    <p className="text-body text-on-surface-variant">{item.dish}</p>
                    <p className="shrink-0 font-display text-body italic text-on-surface">
                      {item.price}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Desserts */}
            <motion.div variants={fade} custom={5}>
              <h3 className="font-display text-h3 italic text-on-surface">Desserts</h3>
              <div className="mt-6 space-y-5">
                {desserts.map((item) => (
                  <div key={item.dish} className="flex items-baseline justify-between gap-4">
                    <p className="text-body text-on-surface-variant">{item.dish}</p>
                    <p className="shrink-0 font-display text-body italic text-on-surface">
                      {item.price}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Breakfast image break */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src="/images/restaurant/breakfast-coffee.webp"
          alt="Morning coffee at The Weir, overlooking the lake"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/10" />
      </section>

      {/* Lakeside Locals */}
      <section className="bg-surface-container-low">
        <motion.div
          className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <div className="mx-auto max-w-3xl text-center">
            <motion.p className="eyebrow text-on-surface-muted" variants={fade} custom={0}>
              Lakeside Locals
            </motion.p>
            <motion.h2
              className="heading-editorial mt-4 text-h1 text-on-surface"
              variants={fade}
              custom={1}
            >
              You don&apos;t need to be a guest
            </motion.h2>
            <motion.p
              className="mt-6 text-body-lg text-on-surface-variant"
              variants={fade}
              custom={2}
            >
              The Weir is open to everyone for lunch, seven days a week. Whether
              you live in the village or are passing through North Cornwall, the
              lakeside table is yours. We have long believed a good restaurant
              should serve its community as much as its guests.
            </motion.p>
            <motion.p
              className="mt-4 text-body text-on-surface-variant"
              variants={fade}
              custom={3}
            >
              Bring the dog. Bring the family. Arrive without a reservation and
              stay as long as you like. On Mondays, our Lakeside Locals card
              holders receive 20% off their meal.
            </motion.p>
            <motion.div className="mt-10" variants={fade} custom={4}>
              <LinkArrow href="/dine/lakeside-locals">
                Learn about Lakeside Locals
              </LinkArrow>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Reserve CTA */}
      <section className="bg-surface-container">
        <motion.div
          className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <div className="mx-auto max-w-3xl text-center">
            <motion.p className="eyebrow text-on-surface-muted" variants={fade} custom={0}>
              Reserve
            </motion.p>
            <motion.h2
              className="heading-editorial mt-4 text-h1 text-on-surface"
              variants={fade}
              custom={1}
            >
              Your table by the lake
            </motion.h2>
            <motion.p
              className="mt-6 text-body-lg text-on-surface-variant"
              variants={fade}
              custom={2}
            >
              While walk-ins are always welcome, you can reserve ahead for lunch
              or Sunday lunch to guarantee your favourite spot.
            </motion.p>
            <motion.div className="mt-10 flex justify-center" variants={fade} custom={3}>
              <Link
                href="/dine/reserve"
                className="inline-flex items-center gap-2 bg-primary px-8 py-4 font-body text-button uppercase text-primary-fg transition-colors duration-fast ease-out-luxury hover:bg-primary-hover"
              >
                Reserve a table
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
