import type { Metadata } from "next";

import { PageShell } from "@/components/marketing/page-shell";

export const metadata: Metadata = {
  title: "Complaints Procedure",
  description:
    "How to make a complaint and what to expect — our formal complaints procedure.",
};

export default function Page() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Complaints Procedure"
      description="How to make a complaint and what to expect from our response."
    >
      <div className="prose-legal max-w-3xl space-y-12 text-on-surface-variant">
        <p className="text-body-sm text-on-surface-muted">
          Last updated: May 2026
        </p>

        {/* 1. Introduction */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">1. Introduction</h2>
          <p className="text-body">
            Whalesborough Farm Resort &amp; Spa is committed to providing an
            excellent experience for every guest. However, we recognise that
            things can sometimes go wrong. If you are dissatisfied with any
            aspect of our service, we want to hear from you so we can put things
            right.
          </p>
          <p className="text-body">
            This procedure sets out how to make a complaint, what you can expect
            from us, and how to escalate if you are not satisfied with our
            response.
          </p>
        </section>

        {/* 2. How to Complain */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">2. How to Make a Complaint</h2>
          <p className="text-body">
            You can submit a complaint through any of the following channels:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:complaints@whalesborough.co.uk"
                className="underline hover:text-primary"
              >
                complaints@whalesborough.co.uk
              </a>
            </li>
            <li>
              <strong>Telephone:</strong> 01288 361378 (Monday to Friday, 9am to
              5pm)
            </li>
            <li>
              <strong>Post:</strong> Complaints Manager, Whalesborough Farm,
              Marhamchurch, Bude, Cornwall EX23 0JD
            </li>
            <li>
              <strong>In person:</strong> Speak to any member of our management
              team at reception
            </li>
          </ul>
          <p className="text-body">
            To help us investigate your complaint effectively, please provide:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>Your full name and contact details</li>
            <li>
              Your booking reference (if applicable)
            </li>
            <li>The date(s) the issue occurred</li>
            <li>A clear description of your complaint</li>
            <li>What outcome you are seeking</li>
            <li>Any supporting evidence (photographs, correspondence, etc.)</li>
          </ul>
        </section>

        {/* 3. Our Process */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">3. Our Process</h2>

          <h3 className="text-h3 text-on-surface">Stage 1: Acknowledgement</h3>
          <p className="text-body">
            We will acknowledge your complaint within <strong>7 calendar
            days</strong> of receipt. Your acknowledgement will include:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>Confirmation of the complaint details as we understand them</li>
            <li>A unique reference number for your case</li>
            <li>The name of the person handling your complaint</li>
            <li>An expected timeline for our response</li>
          </ul>

          <h3 className="text-h3 text-on-surface">Stage 2: Investigation</h3>
          <p className="text-body">
            We will investigate your complaint thoroughly. This may involve
            reviewing records, speaking with staff members, and examining any
            evidence provided. We may contact you during this stage if we need
            further information.
          </p>

          <h3 className="text-h3 text-on-surface">Stage 3: Resolution</h3>
          <p className="text-body">
            We aim to provide a full written response within{" "}
            <strong>28 calendar days</strong> of receiving your complaint. Our
            response will include:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>A summary of the complaint and our investigation findings</li>
            <li>Our decision and reasoning</li>
            <li>
              Any remedial action we intend to take or have already taken
            </li>
            <li>Information on how to escalate if you remain dissatisfied</li>
          </ul>
          <p className="text-body">
            If we cannot resolve your complaint within 28 days (for example,
            where a complex investigation is required), we will write to you
            explaining the delay and providing a revised timeline.
          </p>
        </section>

        {/* 4. Escalation */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">
            4. If You Remain Dissatisfied
          </h2>
          <p className="text-body">
            If you are not satisfied with our response, you may escalate your
            complaint to the General Manager by writing to the address above,
            marking your letter &ldquo;Escalated Complaint&rdquo;. The General
            Manager will review the case independently and respond within 14
            calendar days.
          </p>

          <h3 className="text-h3 text-on-surface">External escalation</h3>
          <p className="text-body">
            If you remain dissatisfied after our internal process, you may
            contact the following bodies depending on the nature of your
            complaint:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-body">
            <li>
              <strong>Data protection complaints:</strong> Information
              Commissioner&apos;s Office (ICO) —{" "}
              <a
                href="https://ico.org.uk"
                className="underline hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                ico.org.uk
              </a>{" "}
              / 0303 123 1113
            </li>
            <li>
              <strong>Consumer rights:</strong> Citizens Advice Consumer Service
              — 0808 223 1133
            </li>
            <li>
              <strong>Trading standards:</strong> Cornwall Council Trading
              Standards — 0808 223 1133
            </li>
            <li>
              <strong>Accessibility:</strong> Equality and Human Rights
              Commission (EHRC) —{" "}
              <a
                href="https://www.equalityhumanrights.com"
                className="underline hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                equalityhumanrights.com
              </a>
            </li>
          </ul>
        </section>

        {/* 5. Data Protection */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">
            5. Data Protection &amp; Confidentiality
          </h2>
          <p className="text-body">
            All complaints are handled in confidence. Personal data provided as
            part of a complaint is processed in accordance with our{" "}
            <a href="/legal/privacy" className="underline hover:text-primary">
              Privacy Policy
            </a>{" "}
            and retained for 3 years from the date of resolution for legal and
            regulatory compliance purposes.
          </p>
        </section>

        {/* 6. Learning from Complaints */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">
            6. Learning from Complaints
          </h2>
          <p className="text-body">
            We treat every complaint as an opportunity to improve. Complaints
            are reviewed regularly by our management team to identify trends,
            address systemic issues, and enhance our services for all guests.
          </p>
        </section>

        {/* 7. Contact */}
        <section className="space-y-4">
          <h2 className="text-h2 text-on-surface">7. Contact</h2>
          <p className="text-body">
            If you have any questions about this procedure, please contact us at{" "}
            <a
              href="mailto:complaints@whalesborough.co.uk"
              className="underline hover:text-primary"
            >
              complaints@whalesborough.co.uk
            </a>{" "}
            or call 01288 361378.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
