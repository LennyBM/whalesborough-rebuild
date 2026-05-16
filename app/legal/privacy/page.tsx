import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How we collect, process and protect your personal data — UK GDPR / DPA 2018.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      description="How we collect, process and protect your personal data under the UK General Data Protection Regulation and Data Protection Act 2018."
    >
      <div className="prose-legal max-w-3xl space-y-12 text-on-surface-variant">
        <p className="text-body-sm text-on-surface-muted">
          Last updated: 14 May 2026
        </p>

        {/* 1. Data Controller */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">1. Data Controller</h2>
          <p className="text-body">
            Whalesborough Farm Resort &amp; Spa Ltd is the data controller
            responsible for your personal data. We are registered in England
            &amp; Wales.
          </p>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>
              <strong>Registered address:</strong> Whalesborough Farm,
              Marhamchurch, Bude, Cornwall EX23 0JD
            </li>
            <li>
              <strong>ICO registration number:</strong> ZA000000
            </li>
            <li>
              <strong>Data Protection Officer:</strong>{" "}
              <a
                href="mailto:privacy@whalesborough.co.uk"
                className="underline hover:text-primary"
              >
                privacy@whalesborough.co.uk
              </a>
            </li>
          </ul>
        </section>

        {/* 2. What We Collect */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">
            2. What Personal Data We Collect
          </h2>
          <p className="text-body">
            We collect personal data when you make a booking, enquire about our
            services, sign up for marketing, use our website, or interact with
            us in person.
          </p>
          <h3 className="text-h3 text-on-surface">Identity &amp; contact data</h3>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>Full name, email address, phone number, postal address</li>
            <li>Date of birth (where required for spa treatments)</li>
            <li>Vehicle registration (for car park management)</li>
          </ul>
          <h3 className="text-h3 text-on-surface">Booking &amp; transaction data</h3>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>Booking reference numbers and dates of stay</li>
            <li>Payment card details (processed securely by Stripe)</li>
            <li>Dietary requirements, accessibility needs, special requests</li>
            <li>Pet details (for dog-friendly accommodation)</li>
          </ul>
          <h3 className="text-h3 text-on-surface">Technical &amp; usage data</h3>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>IP address, browser type, device information</li>
            <li>Pages visited, time on site, referral source</li>
            <li>Cookie identifiers (see our Cookie Policy)</li>
          </ul>
          <h3 className="text-h3 text-on-surface">Health data</h3>
          <p className="text-body">
            For spa treatments, we may collect health information via
            consultation forms. This is processed under Article 9(2)(a) UK GDPR
            (explicit consent) and retained only for the duration necessary to
            provide safe treatments.
          </p>
        </section>

        {/* 3. Lawful Bases */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">
            3. Lawful Bases for Processing
          </h2>
          <p className="text-body">
            We process your personal data under the following lawful bases:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>
              <strong>Contract:</strong> To fulfil accommodation, spa, and
              dining bookings you have made with us.
            </li>
            <li>
              <strong>Legitimate interests:</strong> To improve our services,
              prevent fraud, and send service communications about your booking.
            </li>
            <li>
              <strong>Consent:</strong> To send marketing communications, place
              non-essential cookies, and process health data for spa treatments.
            </li>
            <li>
              <strong>Legal obligation:</strong> To comply with tax, health and
              safety, and licensing requirements.
            </li>
          </ul>
        </section>

        {/* 4. Third-Party Processors */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">
            4. Who We Share Your Data With
          </h2>
          <p className="text-body">
            We share personal data only where necessary to provide our services
            or where required by law. Our key data processors include:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>
              <strong>Landal GreenParks</strong> — accommodation booking and
              property management
            </li>
            <li>
              <strong>Try.be</strong> — spa booking and treatment management
            </li>
            <li>
              <strong>Stripe</strong> — secure payment processing (PCI DSS
              Level 1 compliant)
            </li>
            <li>
              <strong>Google Analytics</strong> — anonymised website usage data
            </li>
            <li>
              <strong>Mailchimp / email service provider</strong> — marketing
              communications (consent-based only)
            </li>
          </ul>
          <p className="text-body">
            All processors are bound by data processing agreements and are
            required to implement appropriate security measures. We do not sell
            your personal data to any third party.
          </p>
        </section>

        {/* 5. International Transfers */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">5. International Transfers</h2>
          <p className="text-body">
            Some of our third-party processors operate outside the UK. Where
            data is transferred internationally, we ensure appropriate
            safeguards are in place, including UK International Data Transfer
            Agreements (IDTAs) or transfers to countries with an adequacy
            decision.
          </p>
        </section>

        {/* 6. Data Retention */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">6. How Long We Keep Your Data</h2>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>
              <strong>Booking records:</strong> 6 years from date of stay (tax
              and legal compliance)
            </li>
            <li>
              <strong>Marketing preferences:</strong> Until you withdraw consent
            </li>
            <li>
              <strong>Spa health forms:</strong> 3 years from last treatment
            </li>
            <li>
              <strong>Website analytics:</strong> 26 months (anonymised)
            </li>
            <li>
              <strong>Enquiry data:</strong> 2 years from last contact
            </li>
          </ul>
        </section>

        {/* 7. Your Rights */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">7. Your Rights</h2>
          <p className="text-body">
            Under UK GDPR, you have the following rights regarding your personal
            data:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>
              <strong>Right of access</strong> — request a copy of the data we
              hold about you
            </li>
            <li>
              <strong>Right to rectification</strong> — have inaccurate data
              corrected
            </li>
            <li>
              <strong>Right to erasure</strong> — request deletion of your data
              (subject to legal retention requirements)
            </li>
            <li>
              <strong>Right to restrict processing</strong> — limit how we use
              your data
            </li>
            <li>
              <strong>Right to data portability</strong> — receive your data in
              a structured, machine-readable format
            </li>
            <li>
              <strong>Right to object</strong> — object to processing based on
              legitimate interests or direct marketing
            </li>
            <li>
              <strong>Right to withdraw consent</strong> — where processing is
              based on consent, withdraw at any time
            </li>
          </ul>
          <p className="text-body">
            To exercise any of these rights, email{" "}
            <a
              href="mailto:privacy@whalesborough.co.uk"
              className="underline hover:text-primary"
            >
              privacy@whalesborough.co.uk
            </a>
            . We will respond within one calendar month.
          </p>
        </section>

        {/* 8. Cookies */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">8. Cookies</h2>
          <p className="text-body">
            Our website uses cookies to function correctly and to help us
            understand how visitors use the site. For full details of the
            cookies we use and how to manage your preferences, please see our{" "}
            <a href="/legal/cookies" className="underline hover:text-primary">
              Cookie Policy
            </a>
            .
          </p>
        </section>

        {/* 9. Security */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">
            9. How We Protect Your Data
          </h2>
          <p className="text-body">
            We implement appropriate technical and organisational measures to
            protect your personal data, including encryption in transit (TLS
            1.2+), secure access controls, regular security reviews, and staff
            training on data protection.
          </p>
        </section>

        {/* 10. Complaints */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">10. Complaints</h2>
          <p className="text-body">
            If you are unhappy with how we have handled your personal data, you
            have the right to lodge a complaint with the Information
            Commissioner&apos;s Office (ICO):
          </p>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>
              Website:{" "}
              <a
                href="https://ico.org.uk"
                className="underline hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                ico.org.uk
              </a>
            </li>
            <li>Telephone: 0303 123 1113</li>
          </ul>
          <p className="text-body">
            We would appreciate the opportunity to resolve your concern directly
            first. Please contact us at{" "}
            <a
              href="mailto:privacy@whalesborough.co.uk"
              className="underline hover:text-primary"
            >
              privacy@whalesborough.co.uk
            </a>
            .
          </p>
        </section>

        {/* 11. Changes */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">
            11. Changes to This Policy
          </h2>
          <p className="text-body">
            We may update this privacy policy from time to time. Any changes
            will be posted on this page with an updated revision date. Where
            changes are significant, we will notify you by email or prominent
            notice on our website.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
