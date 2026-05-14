/**
 * 09 · CheckOutInstructions
 * Sent: morning of departure, 7am.
 * Purpose: process, timings, leave behind notes, review CTA primed.
 * Type: transactional (lifecycle).
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

export interface CheckOutInstructionsProps {
  guestFirstName: string;
  propertyName: string;
  checkOutTime: string;
  reviewUrl: string;
  rebookUrl: string;
  viewInBrowserUrl?: string;
}

export const CheckOutInstructions: React.FC<CheckOutInstructionsProps> = ({
  guestFirstName,
  propertyName,
  checkOutTime,
  reviewUrl,
  rebookUrl,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview="Your departure, gently explained."
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>Departure today</Eyebrow>
    <Heading level={1}>
      {guestFirstName}, no rush at all.
    </Heading>
    <Paragraph>
      Check-out from {propertyName} is by {checkOutTime}. We have laid out
      the few small things below. Breakfast at The Weir is open until 10am
      should you fancy one last walk to the restaurant.
    </Paragraph>

    <TwoColumnInfo
      rows={[
        { label: 'Check-out', value: `By ${checkOutTime}` },
        { label: 'Late check-out', value: 'Available on request, until 2pm — please ask' },
        { label: 'Luggage', value: 'We can hold your bags at the Welcome Pavilion all day' },
        { label: 'Estate gate', value: 'Remains open until 2pm — no code needed' },
      ]}
    />

    <SoftRule />

    <Heading level={3}>Before you leave</Heading>
    <BulletList
      items={[
        'Leave keys in the lockbox — the same code as on arrival.',
        'Used towels on the bathroom floor; clean towels stay folded.',
        'No need to strip the bed or empty the dishwasher; we have it.',
        'Recycling bins are colour-coded under the kitchen island.',
        'A note on the kitchen counter for anything that needs our attention is always welcome.',
      ]}
    />

    <Callout title="Lost property">
      We find a glasses case, a charging cable or a soft toy almost every
      week. Email{' '}
      <Link href="mailto:lostproperty@whalesborough.co.uk" style={{ color: tokens.color.primary }}>
        lostproperty@whalesborough.co.uk
      </Link>{' '}
      and we will reunite you with it.
    </Callout>

    <SoftRule />

    <Heading level={3}>One last small ask</Heading>
    <Paragraph>
      If your stay was what you hoped for, a few words from you mean a
      great deal — both to future guests and to the team who looked after
      you.
    </Paragraph>
    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={reviewUrl}>Share a few words</Button>
    </Section>

    <Paragraph muted size="sm">
      A separate review email arrives in a few days, when you have had
      time to settle. No need to do it twice.
    </Paragraph>

    <SoftRule />

    <Paragraph>
      A safe journey home, {guestFirstName}. When you are ready to come
      back, your guest profile is saved — preferences, the cottage you
      liked, your dog's name.
    </Paragraph>
    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Link href={rebookUrl} style={{ color: tokens.color.primary }}>
        Hold dates for next time →
      </Link>
    </Section>

    <Signature />
  </EmailLayout>
);

export default CheckOutInstructions;
