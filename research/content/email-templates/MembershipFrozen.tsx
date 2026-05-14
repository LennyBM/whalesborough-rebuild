/**
 * 18 · MembershipFrozen
 * Sent: when a member places their account on hold.
 * Purpose: confirm pause, set return date, reassure about payment.
 * Type: transactional.
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
  TwoColumnInfo,
  tokens,
} from './_components';

export interface MembershipFrozenProps {
  memberFirstName: string;
  membershipTier: string;
  frozenFrom: string;
  frozenUntil: string;
  unfreezeUrl: string;
  contactUrl: string;
  viewInBrowserUrl?: string;
}

export const MembershipFrozen: React.FC<MembershipFrozenProps> = ({
  memberFirstName,
  membershipTier,
  frozenFrom,
  frozenUntil,
  unfreezeUrl,
  contactUrl,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview="Your membership is paused"
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>Paused</Eyebrow>
    <Heading level={1}>
      {memberFirstName}, your membership is on hold.
    </Heading>
    <Paragraph>
      We have paused your {membershipTier} membership as requested. No
      payment will be taken during the freeze period, and your member
      number remains yours.
    </Paragraph>

    <TwoColumnInfo
      rows={[
        { label: 'Tier', value: membershipTier },
        { label: 'Paused from', value: frozenFrom },
        { label: 'Resumes', value: frozenUntil },
        { label: 'Member number', value: 'unchanged' },
      ]}
    />

    <SoftRule />

    <Heading level={3}>While you are away</Heading>
    <Paragraph>
      You retain member rates on day visits at reception. Your saved
      preferences, therapist history and class bookings all stay in place.
      The W Club app will show your membership as paused, with a single
      tap to resume.
    </Paragraph>

    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={unfreezeUrl} variant="ghost">
        Resume membership early
      </Button>
    </Section>

    <Callout title="If circumstances change">
      Pausing is free for up to three months, twice a year. If you need
      longer, please{' '}
      <Link href={contactUrl} style={{ color: tokens.color.primary }}>
        speak to our membership director
      </Link>{' '}
      directly — we will find a way.
    </Callout>

    <SoftRule />
    <Signature name="Anya Tregenna" role="Membership Director" />
  </EmailLayout>
);

export default MembershipFrozen;
