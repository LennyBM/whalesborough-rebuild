import type { Metadata } from "next";

import { LinkArrow } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Restaurant FAQs",
  description:
    "Frequently asked questions about The Weir Restaurant: opening hours, dogs, allergens, children, walk-in policy, and more.",
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 pb-16 pt-24 lg:px-12 lg:pb-24 lg:pt-40">
          <p className="eyebrow text-on-surface-muted">The Weir · FAQs</p>
          <h1 className="heading-editorial mt-6 text-display-md md:text-display-lg max-w-4xl text-on-surface">
            Questions about{" "}
            <span className="italic">dining</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-body-lg text-on-surface-variant">
            Everything you need to know before you visit — from opening hours
            and dogs to allergens and children. If your question is not
            answered here, call us on 01288 362234.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="max-w-3xl space-y-0">
            <FaqItem
              question="What are your opening hours?"
              answer="We serve breakfast from 8:30am to 11:00am and lunch from 12:00pm to 3:00pm, seven days a week. We are closed in the evening."
            />
            <FaqItem
              question="Do I need to book a table?"
              answer="No. The Weir operates entirely on a walk-in basis. Simply arrive during opening hours and we will seat you. No reservation needed, no confirmation emails — just turn up when it suits."
            />
            <FaqItem
              question="Are dogs welcome?"
              answer="Yes. Dogs are welcome inside the restaurant at all times. We provide water bowls and there is no need to pre-arrange. Well-behaved dogs on leads, please."
            />
            <FaqItem
              question="Do you cater for allergies and dietary requirements?"
              answer="Absolutely. Please inform your server of any allergies or dietary requirements when you sit down. Our kitchen can accommodate coeliac, dairy-free, nut-free, vegan and vegetarian diets. Gluten-free bread is always available. Allergen information for every dish is available on request."
            />
            <FaqItem
              question="Is there a children's menu?"
              answer="Yes. We offer a dedicated children's menu at both breakfast and lunch. High chairs are available. The terrace also has a children's play area visible from the tables, so little ones can run around while you finish your coffee."
            />
            <FaqItem
              question="What if I'm in a large group?"
              answer="For groups of six or more, we recommend calling ahead on 01288 362234 so we can prepare a table. This is not a booking — just a heads-up. For private dining and celebrations, see our private dining page."
            />
            <FaqItem
              question="Do you serve dinner?"
              answer="Not currently. We serve breakfast and lunch only. However, we do host occasional evening events through the year — see our events page for the latest."
            />
            <FaqItem
              question="Where does your food come from?"
              answer="Much of our produce comes from Neetfield Market Garden on the estate. Beyond that, we work with Cornish suppliers: day-boat fish from Newlyn, beef from North Cornwall, dairy from Trewithen, bread from our Bude bakery. Our menus change with the seasons."
            />
            <FaqItem
              question="Is there outdoor seating?"
              answer="Yes. Our terrace overlooks the lake and is open during warmer months. It is first-come, first-served — we cannot reserve outdoor tables."
            />
            <FaqItem
              question="Is the restaurant accessible?"
              answer="The Weir is fully accessible at ground level with step-free access from the car park. Accessible facilities are available. If you have specific requirements, please call ahead and we will ensure everything is in place."
            />
            <FaqItem
              question="What is Lakeside Locals?"
              answer="Lakeside Locals is our free membership for local residents. Members receive 20% off their entire bill every Monday. Ask at the restaurant or see our Lakeside Locals page for details."
            />
            <FaqItem
              question="Is there parking?"
              answer="Yes. Free parking is available directly outside the restaurant with accessible bays closest to the entrance."
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-20 lg:px-12 lg:py-32">
          <div className="max-w-2xl">
            <p className="eyebrow text-on-surface-muted">Still have questions?</p>
            <h2 className="heading-editorial mt-4 text-h1 text-on-surface">
              Get in touch
            </h2>
            <p className="mt-6 text-body-lg text-on-surface-variant">
              Our team is happy to help with anything not covered above.
            </p>
            <div className="mt-8 space-y-2 text-body text-on-surface-variant">
              <p>
                <span className="font-medium text-on-surface">Phone:</span>{" "}
                01288 362234
              </p>
              <p>
                <span className="font-medium text-on-surface">Email:</span>{" "}
                theweir@whalesborough.co.uk
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-8">
              <LinkArrow href="/dine">Back to The Weir</LinkArrow>
              <LinkArrow href="/dine/menus">View menus</LinkArrow>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="group border-b border-outline-variant">
      <summary className="flex cursor-pointer items-center justify-between py-6 text-body font-medium text-on-surface transition-colors hover:text-primary">
        <span className="pr-4">{question}</span>
        <span className="shrink-0 text-on-surface-muted transition-transform duration-fast ease-out-luxury group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="pb-6">
        <p className="text-body text-on-surface-variant">{answer}</p>
      </div>
    </details>
  );
}
