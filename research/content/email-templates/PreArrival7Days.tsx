/**
 * 05 · PreArrival7Days
 * Sent: 7 days before arrival.
 * Purpose: directions, arrival info, weather expectation, packing notes.
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

export interface PreArrival7DaysProps {
  guestFirstName: string;
  propertyName: string;
  arrivalDate: string;
  checkInWindow: string; // "from 4pm"
  postcode: string;
  drivingDirectionsUrl: string;
  weatherSummary: string; // e.g. "Mild, mid-teens, breezes off the coast"
  packingListUrl: string;
  viewInBrowserUrl?: string;
}

export const PreArrival7Days: React.FC<PreArrival7DaysProps> = ({
  guestFirstName,
  propertyName,
  arrivalDate,
  checkInWindow,
  postcode,
  drivingDirectionsUrl,
  weatherSummary,
  packingListUrl,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview={`Seven days until ${propertyName}. Directions and arrival.`}
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>One week to go</Eyebrow>
    <Heading level={1}>
      {guestFirstName}, here is everything for the drive down.
    </Heading>
    <Paragraph>
      We will see you at {propertyName} on {arrivalDate}. Cornwall is, as
      always, its own pace. A short note on how to find us and what to
      expect.
    </Paragraph>

    <TwoColumnInfo
      rows={[
        { label: 'Address', value: `Whalesborough Farm, ${postcode}` },
        { label: 'Check-in', value: checkInWindow },
        { label: 'Driving time', value: 'M5 to A30 to A39 to Bude — five hours from London' },
        { label: 'Nearest station', value: 'Bodmin Parkway, then 35 minutes by taxi' },
      ]}
    />

    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={drivingDirectionsUrl}>Open driving directions</Button>
    </Section>

    <SoftRule />

    <Heading level={3}>What the week looks like</Heading>
    <Paragraph>
      The forecast for your stay: {weatherSummary}. Cornwall keeps its own
      counsel, so we suggest layers and waterproofs alongside the linen.
    </Paragraph>

    <Heading level={3}>Packing, lightly</Heading>
    <BulletList
      items={[
        'Walking shoes for the coast path — it begins at the farm gate.',
        'Swimwear for the indoor pool and the wild Atlantic, if you are inclined.',
        'A robe travels well; we also leave one waiting for you.',
        'Wellies if you are walking the lower meadow after rain.',
        'Your dog\'s favourite bed; we provide bowls, towels, treats and a welcome biscuit.',
      ]}
    />

    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Link href={packingListUrl} style={{ color: tokens.color.primary }}>
        The full packing list, by season →
      </Link>
    </Section>

    <Callout title="The day before">
      The last email arrives twenty-four hours before your check-in time.
      Gate codes, parking, what to do if you are early — all in one place.
    </Callout>

    <SoftRule />
    <Signature />
  </EmailLayout>
);

export default PreArrival7Days;
