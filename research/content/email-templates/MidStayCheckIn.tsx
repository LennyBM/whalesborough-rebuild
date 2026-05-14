/**
 * 08 · MidStayCheckIn
 * Sent: midway through stays of 4+ nights.
 * Purpose: surface any issues quietly, prompt second-half experiences.
 * Type: transactional (lifecycle).
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
  company,
  tokens,
} from './_components';

export interface MidStayCheckInProps {
  guestFirstName: string;
  propertyName: string;
  nightsRemaining: number;
  conciergeChatUrl: string;
  experienceUrl: string;
  viewInBrowserUrl?: string;
}

export const MidStayCheckIn: React.FC<MidStayCheckInProps> = ({
  guestFirstName,
  propertyName,
  nightsRemaining,
  conciergeChatUrl,
  experienceUrl,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview="A quiet word, midway through your stay."
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>Midway</Eyebrow>
    <Heading level={1}>
      {guestFirstName}, how is {propertyName} treating you?
    </Heading>
    <Paragraph>
      You have {nightsRemaining}{' '}
      {nightsRemaining === 1 ? 'night' : 'nights'} still to come. We hoped
      to ask, lightly, whether everything is as it should be.
    </Paragraph>

    <Paragraph>
      If there is anything we can fix or improve, this is the moment to
      tell us. Sometimes guests stay quiet until after they have left —
      that helps no one.
    </Paragraph>

    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={conciergeChatUrl}>Open concierge chat</Button>
    </Section>

    <SoftRule />

    <Heading level={3}>Still to be had</Heading>
    <Paragraph>
      For the second half of your stay, a small list of things our guests
      tend to wish they had tried:
    </Paragraph>
    <BulletList
      items={[
        'The sunrise yoga class on the lake jetty — Tuesdays and Thursdays at 7am.',
        'A bottle of Camel Valley brut, delivered to the cottage at 6pm.',
        'A late-afternoon facial — the spa has same-day availability.',
        'Dinner at The Weir on a Friday for Grill and Chill.',
      ]}
    />

    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Link
        href={experienceUrl}
        style={{ color: tokens.color.primary }}
      >
        Browse the rest of the week →
      </Link>
    </Section>

    <SoftRule />
    <Paragraph muted size="sm">
      The duty manager is on {company.phone}, around the clock. We are here
      if you need anything.
    </Paragraph>
    <Signature />
  </EmailLayout>
);

export default MidStayCheckIn;
