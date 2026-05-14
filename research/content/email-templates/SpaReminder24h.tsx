/**
 * 15 · SpaReminder24h
 * Sent: 24 hours before treatment.
 * Purpose: final reminder, arrival time, what to wear.
 * Type: transactional.
 */

import * as React from 'react';
import EmailLayout from './_layout';
import {
  BulletList,
  Callout,
  Eyebrow,
  Heading,
  Paragraph,
  Signature,
  SoftRule,
  TwoColumnInfo,
} from './_components';

export interface SpaReminder24hProps {
  guestFirstName: string;
  treatmentName: string;
  therapistName?: string;
  dateTime: string;
  arrivalTime: string;
  viewInBrowserUrl?: string;
}

export const SpaReminder24h: React.FC<SpaReminder24hProps> = ({
  guestFirstName,
  treatmentName,
  therapistName,
  dateTime,
  arrivalTime,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview={`Tomorrow at the spa — ${treatmentName}`}
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>Tomorrow</Eyebrow>
    <Heading level={1}>
      {guestFirstName}, the spa is ready for you.
    </Heading>
    <Paragraph>
      A short note to confirm your {treatmentName} treatment tomorrow.
      Everything below, in case it is useful.
    </Paragraph>

    <TwoColumnInfo
      rows={[
        { label: 'Treatment', value: treatmentName },
        ...(therapistName ? [{ label: 'Therapist', value: therapistName }] : []),
        { label: 'Date and time', value: dateTime },
        { label: 'Please arrive', value: arrivalTime },
      ]}
    />

    <SoftRule />

    <Heading level={3}>What to wear, what to bring</Heading>
    <BulletList
      items={[
        'Swimwear if you intend to use the pool before or after.',
        'A robe and slippers are provided in your locker.',
        'Phones stay in the locker — there are no chargers on the wellness floor.',
        'A water bottle; refill stations are throughout.',
      ]}
    />

    <Callout title="Eating beforehand">
      Best to eat lightly within two hours of your treatment. The Weir
      Restaurant serves a small wellness plate from 11am.
    </Callout>

    <SoftRule />
    <Signature name="The W Club Spa" role="Treatment reservations" />
  </EmailLayout>
);

export default SpaReminder24h;
