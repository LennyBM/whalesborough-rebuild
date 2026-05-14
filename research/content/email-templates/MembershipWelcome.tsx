/**
 * 16 · MembershipWelcome
 * Sent: on completion of W Club Spa membership signup.
 * Purpose: welcome, set expectations, surface first benefits.
 * Type: transactional (account creation).
 */

import * as React from 'react';
import { Link, Section } from '@react-email/components';
import EmailLayout from './_layout';
import {
  Button,
  BulletList,
  Callout,
  Eyebrow,
  Heading,
  Paragraph,
  Signature,
  SoftRule,
  TwoColumnInfo,
  tokens,
} from './_components';

export interface MembershipWelcomeProps {
  memberFirstName: string;
  membershipTier: string; // "Wellness", "Wellness Plus", "Lakeside"
  membershipNumber: string;
  monthlyFee: string;
  firstBillingDate: string;
  partnerName?: string;
  bookTreatmentUrl: string;
  appUrl: string;
  viewInBrowserUrl?: string;
}

export const MembershipWelcome: React.FC<MembershipWelcomeProps> = ({
  memberFirstName,
  membershipTier,
  membershipNumber,
  monthlyFee,
  firstBillingDate,
  partnerName,
  bookTreatmentUrl,
  appUrl,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview="Welcome to The W Club"
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>Welcome to The W Club</Eyebrow>
    <Heading level={1}>
      {memberFirstName}, the spa is yours.
    </Heading>
    <Paragraph>
      Your {membershipTier} membership is live. We have set up your
      account, paired your access card and added you{partnerName ? ` and ${partnerName}` : ''}{' '}
      to the member directory. Below is the practical detail.
    </Paragraph>

    <TwoColumnInfo
      rows={[
        { label: 'Member name', value: memberFirstName },
        { label: 'Membership tier', value: membershipTier },
        { label: 'Member number', value: membershipNumber },
        { label: 'Monthly fee', value: monthlyFee },
        { label: 'First payment', value: firstBillingDate },
        ...(partnerName ? [{ label: 'Joint member', value: partnerName }] : []),
      ]}
    />

    <SoftRule />

    <Heading level={3}>Where to begin</Heading>
    <Paragraph>
      Your membership unlocks the pool, gym, sauna, steam room and member
      lounge from 6am to 10pm, every day of the year. To get the most
      from your first month:
    </Paragraph>
    <BulletList
      items={[
        'Book your complimentary onboarding session — a 30-minute walk-through of the facilities.',
        'Reserve your first treatment, included in your tier this month.',
        'Add the W Club app to your phone for one-tap booking and contactless entry.',
        'Subscribe to the weekly class schedule (Tuesdays at 6am).',
      ]}
    />

    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={bookTreatmentUrl}>Book your first treatment</Button>
    </Section>
    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Link href={appUrl} style={{ color: tokens.color.primary }}>
        Download the W Club app →
      </Link>
    </Section>

    <Callout title="Member benefits at a glance">
      Twenty per cent off The Weir Restaurant on weekdays. First refusal
      on Saturday treatment slots. Friends and family rate on cottage
      stays. A bottle of Camel Valley on your anniversary.
    </Callout>

    <SoftRule />
    <Signature name="Anya Tregenna" role="Membership Director" />
  </EmailLayout>
);

export default MembershipWelcome;
