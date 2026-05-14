/**
 * 26 · WaitlistJoined
 * Sent: when a guest joins the waitlist for a sold-out cottage / viewing day.
 * Purpose: confirm position, set expectations, no pressure.
 * Type: transactional (account event).
 */

import * as React from 'react';
import { Link, Section } from '@react-email/components';
import EmailLayout from './_layout';
import {
  BulletList,
  Eyebrow,
  Heading,
  Paragraph,
  Signature,
  SoftRule,
  TwoColumnInfo,
  tokens,
} from './_components';

export interface WaitlistJoinedProps {
  guestFirstName: string;
  waitlistedFor: string; // "Calf House, 14 - 21 August 2026"
  position: number;
  estimatedNotificationWindow: string; // "Within 14 days, typically"
  manageWaitlistUrl: string;
  viewInBrowserUrl?: string;
}

export const WaitlistJoined: React.FC<WaitlistJoinedProps> = ({
  guestFirstName,
  waitlistedFor,
  position,
  estimatedNotificationWindow,
  manageWaitlistUrl,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview="You are on the list"
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>Waitlist</Eyebrow>
    <Heading level={1}>
      {guestFirstName}, you are on the list.
    </Heading>
    <Paragraph>
      We have you down for {waitlistedFor}. Cottages do free up — usually
      within two weeks of the date — and the waitlist runs in strict
      order.
    </Paragraph>

    <TwoColumnInfo
      rows={[
        { label: 'On the list for', value: waitlistedFor },
        { label: 'Your position', value: `${position} of available list` },
        { label: 'Typical notice', value: estimatedNotificationWindow },
      ]}
    />

    <SoftRule />

    <Heading level={3}>What happens if a space opens</Heading>
    <BulletList
      items={[
        'You will receive an email with a 24-hour hold on the cottage.',
        'A direct link will take you to checkout — your guest profile means it is short.',
        'If you do not claim within 24 hours, the offer passes to the next on the list.',
        'No payment is taken unless you complete the booking.',
      ]}
    />

    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Link
        href={manageWaitlistUrl}
        style={{ color: tokens.color.primary }}
      >
        Manage your waitlist preferences →
      </Link>
    </Section>

    <Paragraph muted size="sm">
      Removing yourself from the waitlist takes one click and does not
      affect your guest account.
    </Paragraph>

    <SoftRule />
    <Signature />
  </EmailLayout>
);

export default WaitlistJoined;
