import type { Metadata } from "next";
import Link from "next/link";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Spa FAQs | The W Club | Whalesborough",
  description:
    "Everything you need to know before your visit to The W Club Spa — what to bring, arrival times, age restrictions, cancellation policy and more.",
};

const faqs = [
  {
    question: "What should I bring?",
    answer:
      "Bring swimwear for pool and thermal suite access. We provide a robe, towel, slippers and a secure locker for all guests. Hair dryers, straighteners and vanity amenities are available in the changing rooms.",
  },
  {
    question: "What time should I arrive?",
    answer:
      "Please arrive 15 minutes before your treatment time. This allows you to complete a brief consultation form, change into your robe and begin to unwind in the thermal suite before your therapist collects you.",
  },
  {
    question: "Are there age restrictions?",
    answer:
      "Guests must be 16 or over to use the thermal suite and relaxation areas. The pools are available to all ages during family swim sessions. Children under 16 must be accompanied by an adult at all times. Spa days and treatments are available to guests aged 16 and over.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "We require 24 hours' notice for cancellations or amendments. Late cancellations or no-shows may be charged at 50% of the treatment value. Spa day packages cancelled within 48 hours may be charged in full. We understand that circumstances change — please call us as early as possible.",
  },
  {
    question: "Can I visit if I am pregnant?",
    answer:
      "Yes. We welcome expectant mothers from the second trimester onwards. Our Pregnancy Massage is specifically designed for you. Please avoid the sauna and steam room during pregnancy, but the pools and relaxation suite are perfectly safe. Let us know when booking so we can advise on suitable treatments.",
  },
  {
    question: "What about medical conditions?",
    answer:
      "Please inform us of any medical conditions, recent surgery, skin conditions or allergies when booking. Your therapist will conduct a consultation before treatment and may adapt the service or recommend an alternative. Some conditions may require written GP approval before heat-based treatments.",
  },
  {
    question: "Can I use the facilities without a treatment?",
    answer:
      "Pool and thermal suite access is included with all spa day packages and available to members. Day guests booking individual treatments receive facility access for 30 minutes before and after their appointment. Facility-only passes are not available to the general public.",
  },
  {
    question: "Is the spa accessible?",
    answer:
      "The spa is fully accessible at ground level with step-free access to pools, changing rooms and treatment rooms. A pool hoist is available. Please contact us in advance so we can ensure everything is prepared for your visit.",
  },
  {
    question: "Can I buy a gift voucher?",
    answer:
      "Yes. We offer experience vouchers for specific treatments or spa days, and monetary vouchers in any amount. Vouchers are valid for twelve months and can be delivered digitally or as a physical card. Purchase online or at spa reception.",
  },
  {
    question: "What happens if I am late?",
    answer:
      "If you arrive late, your treatment time may be shortened to avoid delaying subsequent guests. The full cost will still apply. If you are running more than 15 minutes late, please call us and we will do our best to accommodate you.",
  },
  {
    question: "Is food available?",
    answer:
      "Spa day guests enjoy lunch at The Weir Restaurant as part of their package. Herbal teas, infused water and light refreshments are complimentary in the relaxation suite. Treatment-only guests can book a table at the restaurant separately.",
  },
  {
    question: "What is your mobile phone policy?",
    answer:
      "We ask that mobile phones are kept on silent and used only in the changing rooms. Photography is not permitted in the pool, thermal or relaxation areas. This protects the privacy of all guests and preserves the calm environment.",
  },
];

export default function SpaFaqsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">The W Club · FAQs</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Before you{" "}
            <span className="italic">arrive</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            The answers to the questions we hear most often. If something is
            not covered here, call spa reception or drop us a message — we are
            always happy to help.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-3xl space-y-10">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="border-b border-outline-variant pb-10 last:border-0"
              >
                <h2 className="text-h3 text-on-surface">{faq.question}</h2>
                <p className="mt-4 text-body text-on-surface-variant">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="max-w-2xl">
            <h2 className="heading-editorial text-h2 text-on-surface">
              Still have questions?
            </h2>
            <p className="mt-4 text-body-lg text-on-surface-variant">
              Our spa reception team is available seven days a week from
              8:00am to 8:00pm. Call us on 01288 361 354 or send a message.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              <Link href="/contact">
                <LinkArrow>Get in touch</LinkArrow>
              </Link>
              <Link href="/spa/booking">
                <LinkArrow>Book a treatment</LinkArrow>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
