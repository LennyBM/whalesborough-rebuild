/**
 * 23 · BrochureDelivery
 * Sent: immediately after lodge sales brochure download form is completed.
 * Purpose: deliver the gated PDF; soft next step; no hard sell.
 * Type: transactional (lead-capture fulfilment).
 *
 * Note: this is the message that follows a *separate* explicit consent for
 *       lodge-sales marketing. Lodge sales are NOT 'similar' to holiday
 *       bookings under PECR soft opt-in. Consent is captured at the form.
 */

import * as React from 'react';
import { Link, Section } from '@react-email/components';
import EmailLayout from './_layout';
import {
  Button,
  Callout,
  Eyebrow,
  Heading,
  Paragraph,
  Signature,
  SoftRule,
  tokens,
} from './_components';

export interface BrochureDeliveryProps {
  prospectFirstName: string;
  brochureName: string; // "The Lodges of Whalesborough"
  brochurePdfUrl: string;
  viewingsUrl: string;
  contactUrl: string;
  consentId: string;
  viewInBrowserUrl?: string;
}

export const BrochureDelivery: React.FC<BrochureDeliveryProps> = ({
  prospectFirstName,
  brochureName,
  brochurePdfUrl,
  viewingsUrl,
  contactUrl,
  consentId,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview="Your Whalesborough lodge brochure is ready"
    consentId={consentId}
    isMarketing
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>Your brochure</Eyebrow>
    <Heading level={1}>
      {prospectFirstName}, the brochure is yours.
    </Heading>
    <Paragraph>
      Here is {brochureName}, as requested. It is a long read — about
      forty pages — and the print version remains the most considered
      way to understand what living at Whalesborough is like.
    </Paragraph>

    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={brochurePdfUrl}>Open the brochure (PDF)</Button>
    </Section>

    <Paragraph muted size="sm">
      Twelve megabytes; suitable for tablet, desktop or print. If you
      would prefer a physical copy posted, simply reply to this email
      with your address.
    </Paragraph>

    <SoftRule />

    <Heading level={3}>When you are ready, not before</Heading>
    <Paragraph>
      We hold ten viewing days a year, six guests at each. They take a
      whole morning and a long lunch — you see the lodges, meet our
      property team and walk the estate. No pressure, no follow-up unless
      you invite it.
    </Paragraph>
    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Link href={viewingsUrl} style={{ color: tokens.color.primary }}>
        See upcoming viewing days →
      </Link>
    </Section>

    <Callout title="A question first?">
      Catherine Pollard, our Director of Property, is available for
      private conversations by appointment.{' '}
      <Link href={contactUrl} style={{ color: tokens.color.primary }}>
        Reach her directly
      </Link>{' '}
      — or simply reply to this email.
    </Callout>

    <SoftRule />
    <Signature
      name="Catherine Pollard"
      role="Director of Property, Whalesborough"
    />
  </EmailLayout>
);

export default BrochureDelivery;
