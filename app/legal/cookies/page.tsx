import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How we use cookies and similar technologies on our website.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Cookie Policy"
      description="How we use cookies and similar technologies on our website, and how you can manage your preferences."
    >
      <div className="prose-legal max-w-3xl space-y-12 text-on-surface-variant">
        <p className="text-body-sm text-on-surface-muted">
          Last updated: 14 May 2026
        </p>

        {/* 1. What Are Cookies */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">1. What Are Cookies</h2>
          <p className="text-body">
            Cookies are small text files placed on your device when you visit a
            website. They help the site remember your preferences, understand
            how you use the site, and deliver a better experience. Some cookies
            are essential for the site to function; others help us improve and
            personalise your experience.
          </p>
        </section>

        {/* 2. How We Use Cookies */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">2. How We Use Cookies</h2>
          <p className="text-body">
            We use cookies in accordance with the Privacy and Electronic
            Communications Regulations 2003 (PECR) and UK GDPR. Non-essential
            cookies are only placed after you have given consent via our cookie
            banner.
          </p>
        </section>

        {/* 3. Cookie Categories */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">3. Cookie Categories</h2>

          <h3 className="text-h3 text-on-surface">
            Strictly Necessary Cookies
          </h3>
          <p className="text-body">
            These cookies are essential for the website to function. They enable
            core features such as security, session management, and
            accessibility preferences. They cannot be disabled.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-body text-left">
              <thead>
                <tr className="border-b border-on-surface/10">
                  <th className="py-3 pr-4 font-semibold text-on-surface">Cookie</th>
                  <th className="py-3 pr-4 font-semibold text-on-surface">Purpose</th>
                  <th className="py-3 font-semibold text-on-surface">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-on-surface/5">
                <tr>
                  <td className="py-3 pr-4">__session</td>
                  <td className="py-3 pr-4">Maintains your logged-in session</td>
                  <td className="py-3">Session</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">cookie_consent</td>
                  <td className="py-3 pr-4">Stores your cookie preferences</td>
                  <td className="py-3">1 year</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">csrf_token</td>
                  <td className="py-3 pr-4">Prevents cross-site request forgery</td>
                  <td className="py-3">Session</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-h3 text-on-surface">Functional Cookies</h3>
          <p className="text-body">
            These cookies enable enhanced functionality and personalisation,
            such as remembering your preferred language, region, or display
            settings.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-body text-left">
              <thead>
                <tr className="border-b border-on-surface/10">
                  <th className="py-3 pr-4 font-semibold text-on-surface">Cookie</th>
                  <th className="py-3 pr-4 font-semibold text-on-surface">Purpose</th>
                  <th className="py-3 font-semibold text-on-surface">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-on-surface/5">
                <tr>
                  <td className="py-3 pr-4">preferred_dates</td>
                  <td className="py-3 pr-4">Remembers your last searched dates</td>
                  <td className="py-3">30 days</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">guest_count</td>
                  <td className="py-3 pr-4">Remembers party size for booking</td>
                  <td className="py-3">30 days</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-h3 text-on-surface">Analytics Cookies</h3>
          <p className="text-body">
            These cookies help us understand how visitors interact with our
            website by collecting information anonymously. This helps us improve
            the site.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-body text-left">
              <thead>
                <tr className="border-b border-on-surface/10">
                  <th className="py-3 pr-4 font-semibold text-on-surface">Cookie</th>
                  <th className="py-3 pr-4 font-semibold text-on-surface">Purpose</th>
                  <th className="py-3 font-semibold text-on-surface">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-on-surface/5">
                <tr>
                  <td className="py-3 pr-4">_ga</td>
                  <td className="py-3 pr-4">Google Analytics — distinguishes users</td>
                  <td className="py-3">2 years</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">_ga_*</td>
                  <td className="py-3 pr-4">Google Analytics — maintains session state</td>
                  <td className="py-3">2 years</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">_gid</td>
                  <td className="py-3 pr-4">Google Analytics — distinguishes users</td>
                  <td className="py-3">24 hours</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-h3 text-on-surface">Marketing Cookies</h3>
          <p className="text-body">
            These cookies are used to deliver advertisements relevant to you and
            to measure the effectiveness of advertising campaigns. They may be
            set by third-party advertising partners.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-body text-left">
              <thead>
                <tr className="border-b border-on-surface/10">
                  <th className="py-3 pr-4 font-semibold text-on-surface">Cookie</th>
                  <th className="py-3 pr-4 font-semibold text-on-surface">Purpose</th>
                  <th className="py-3 font-semibold text-on-surface">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-on-surface/5">
                <tr>
                  <td className="py-3 pr-4">_fbp</td>
                  <td className="py-3 pr-4">Meta Pixel — ad measurement</td>
                  <td className="py-3">3 months</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">_gcl_au</td>
                  <td className="py-3 pr-4">Google Ads — conversion tracking</td>
                  <td className="py-3">3 months</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Managing Cookies */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">
            4. How to Manage Your Cookie Preferences
          </h2>
          <p className="text-body">
            You can manage your cookie preferences at any time by clicking the
            &ldquo;Cookie Settings&rdquo; link in our website footer. This will
            reopen the consent banner where you can update your choices.
          </p>
          <p className="text-body">
            You can also control cookies through your browser settings. Most
            browsers allow you to:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>View what cookies are stored and delete them individually</li>
            <li>Block third-party cookies</li>
            <li>Block cookies from specific sites</li>
            <li>Block all cookies</li>
            <li>Delete all cookies when you close your browser</li>
          </ul>
          <p className="text-body">
            Please note that blocking all cookies may affect the functionality
            of this and many other websites.
          </p>
        </section>

        {/* 5. Third-Party Cookies */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">5. Third-Party Cookies</h2>
          <p className="text-body">
            Some cookies are placed by third-party services that appear on our
            pages. We do not control these cookies. The relevant third parties
            include:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>
              <strong>Google</strong> (Analytics, Ads) —{" "}
              <a
                href="https://policies.google.com/privacy"
                className="underline hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <strong>Meta</strong> (Facebook Pixel) —{" "}
              <a
                href="https://www.facebook.com/privacy/policy"
                className="underline hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <strong>Stripe</strong> (payment processing) —{" "}
              <a
                href="https://stripe.com/gb/privacy"
                className="underline hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </section>

        {/* 6. Changes */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">
            6. Changes to This Cookie Policy
          </h2>
          <p className="text-body">
            We may update this cookie policy from time to time to reflect
            changes in the cookies we use or for legal, operational, or
            regulatory reasons. Please revisit this page periodically to stay
            informed about our use of cookies.
          </p>
        </section>

        {/* 7. Contact */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">7. Contact Us</h2>
          <p className="text-body">
            If you have questions about our use of cookies, please contact us at{" "}
            <a
              href="mailto:privacy@whalesborough.co.uk"
              className="underline hover:text-primary"
            >
              privacy@whalesborough.co.uk
            </a>
            .
          </p>
        </section>
      </div>
    </PageShell>
  );
}
