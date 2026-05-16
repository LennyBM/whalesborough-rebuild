import type { Metadata } from "next";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Accommodation FAQs | Whalesborough Farm Resort, Cornwall",
  description:
    "Frequently asked questions about staying at Whalesborough — check-in and check-out times, dog policy, parking, EV charging, Wi-Fi, hot tubs and cancellation.",
};

const faqs = [
  {
    question: "What time is check-in and check-out?",
    answer:
      "Check-in is from 4:00 pm. Check-out is by 10:00 am. Early check-in or late check-out may be available on request — please contact us at least 48 hours in advance and we will do our best to accommodate.",
  },
  {
    question: "How does arrival work?",
    answer:
      "The estate uses ANPR contactless gates, so there is no need to check in at a reception desk. Simply drive through the gate and head to your accommodation — your number plate is registered when you book. The gates operate 24 hours a day, 7 days a week.",
  },
  {
    question: "Are dogs allowed?",
    answer:
      "Yes — all 27 cottages welcome dogs. Each cottage has an enclosed garden, and we provide a welcome pack (treats, blanket and bowl) plus luxury dog bedding. Dogs must be kept on leads in communal areas and are not permitted in the spa. A maximum of two dogs per cottage applies unless agreed in advance.",
  },
  {
    question: "Is there parking?",
    answer:
      "Every cottage and suite has dedicated parking directly outside or within a short walk. The estate roads are private and speed-limited to 10 mph for the safety of guests, children and wildlife.",
  },
  {
    question: "Is there EV charging on site?",
    answer:
      "Yes. We have four super-fast EV charging points located in the Arvor Suites car park, available to all guests at no additional charge. Simply plug in and charge — no app or account required.",
  },
  {
    question: "Is Wi-Fi included?",
    answer:
      "Complimentary high-speed Wi-Fi is included in all accommodation. The network covers the entire estate including outdoor communal areas. Connection details are provided in your welcome information.",
  },
  {
    question: "Which properties have hot tubs?",
    answer:
      "Seven of our heritage cottages and all spa lodges have private hot tubs. Hot tubs are maintained and cleaned between every guest. They are available year-round and are especially magical on clear winter evenings.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Cancellations made more than 28 days before arrival receive a full refund minus the booking fee. Cancellations between 14 and 28 days before arrival receive a 50% refund. Cancellations within 14 days of arrival are non-refundable. We strongly recommend travel insurance for all bookings.",
  },
  {
    question: "Are there any additional charges?",
    answer:
      "The price you see at booking is the price you pay — there are no hidden fees. Optional extras such as celebration hampers, spa treatments and add-on experiences can be booked separately.",
  },
  {
    question: "Can I arrange a special occasion surprise?",
    answer:
      "Absolutely. We can arrange flowers, champagne, celebration hampers, private dining and more — all set up in your accommodation before you arrive. Contact our team at least 72 hours before your stay.",
  },
  {
    question: "Is the estate accessible?",
    answer:
      "Several of our cottages and all Wetroom Suites in the Arvor building are designed for wheelchair users and guests with reduced mobility. Level-access wetrooms, grab rails and wider doorways are standard. Please contact us to discuss your specific requirements.",
  },
  {
    question: "What time does the spa close?",
    answer:
      "The spa is open daily from 7:00 am to 9:00 pm. The thermal suite and hydrotherapy pool close at 8:30 pm. Arvor Suite guests receive complimentary access throughout their stay.",
  },
];

export default function StayFaqsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-20 pt-24 lg:px-12 lg:pb-32 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">
            Frequently Asked Questions
          </p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg lg:text-display-xl max-w-4xl text-on-surface">
            Everything you need{" "}
            <span className="italic">to know</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            From check-in times to hot tub maintenance, here are the answers to
            the questions we hear most often. If something is not covered here,
            our team is always happy to help.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-3xl divide-y divide-outline-variant">
            {faqs.map((faq, i) => (
              <details key={i} className="group py-6 first:pt-0 last:pb-0">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-h3 text-on-surface [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="shrink-0 text-on-surface-muted transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-body text-on-surface-variant">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32 text-center">
          <h2 className="heading-editorial text-h1 text-on-surface">
            Still have questions?
          </h2>
          <p className="mt-6 mx-auto max-w-xl text-body-lg text-on-surface-variant">
            Our team is available seven days a week. Get in touch and we will
            respond within a few hours.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <LinkArrow href="/contact">
              Contact us
            </LinkArrow>
          </div>
        </div>
      </section>
    </>
  );
}
