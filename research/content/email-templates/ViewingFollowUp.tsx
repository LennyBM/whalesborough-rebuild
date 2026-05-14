/**
 * 25 · ViewingFollowUp
 * Sent: 3 days after viewing day.
 * Purpose: factual follow-up; surface answers to common questions; offer
 *          continued conversation — no pressure, no urgency.
 * Type: marketing (PECR — requires consent, captured at viewing RSVP).
 */

import * as React from 'react';
import { Link, Section } from '@react-email/components';
import EmailLayout from './_layout';
import {
  Button,
  BulletList,
  Eyebrow,
  Heading,
  Paragraph,
  Signature,
  SoftRule,
  tokens,
} from './_components';

export interface ViewingFollowUpProps {
  prospectFirstName: string;
  viewingDate: string;
  propertyOfInterest?: string;
  resourceLibraryUrl: string;
  bookCallUrl: string;
  consentId: string;
  viewInBrowserUrl?: string;
}

export const ViewingFollowUp: React.FC<ViewingFollowUpProps> = ({
  prospectFirstName,
  viewingDate,
  propertyOfInterest,
  resourceLibraryUrl,
  bookCallUrl,
  consentId,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview="A short follow-up, no pressure"
    consentId={consentId}
    isMarketing
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>After your visit</Eyebrow>
    <Heading level={1}>
      {prospectFirstName}, thank you for joining us.
    </Heading>
    <Paragraph>
      It was a pleasure to host you on {viewingDate}. I wanted to follow
      up briefly — answers to the questions that come up most often after
      a viewing, and a way to continue the conversation if it would be
      useful.
    </Paragraph>

    {propertyOfInterest && (
      <Paragraph>
        You mentioned interest in {propertyOfInterest}. I have made a
        small note and will hold availability information for you for
        the next thirty days.
      </Paragraph>
    )}

    <SoftRule />

    <Heading level={3}>The questions that usually follow</Heading>
    <BulletList
      items={[
        'Site fees, management charges and the full annual running cost — a one-page summary.',
        'Rental income from sub-letting through Whalesborough\'s managed scheme — three real examples.',
        'Mortgage availability and lender appetite for leisure-park lodges in 2026.',
        'Resale data — what owners have realised on exit over the past five years.',
        'Reservation process: from holding deposit to completion.',
      ]}
    />

    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Link href={resourceLibraryUrl} style={{ color: tokens.color.primary }}>
        Open the resource library →
      </Link>
    </Section>

    <SoftRule />

    <Heading level={3}>If a conversation would help</Heading>
    <Paragraph>
      I keep three thirty-minute slots a week for follow-up calls. No
      script, no agenda — questions, on whichever angle is on your mind.
    </Paragraph>
    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={bookCallUrl}>Book a thirty-minute call</Button>
    </Section>

    <Paragraph muted size="sm">
      Whatever you decide, thank you for taking the time. The lodges
      remain in your inbox if you ever want to return to them.
    </Paragraph>

    <SoftRule />
    <Signature
      name="Catherine Pollard"
      role="Director of Property, Whalesborough"
    />
  </EmailLayout>
);

export default ViewingFollowUp;
