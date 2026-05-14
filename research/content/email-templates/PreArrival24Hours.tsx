/**
 * 06 · PreArrival24Hours
 * Sent: 24 hours before arrival.
 * Purpose: gate code, check-in instructions, ANPR confirmation, early-arrival
 *          policy. The "last mile" email.
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

export interface PreArrival24HoursProps {
  guestFirstName: string;
  propertyName: string;
  arrivalDate: string;
  checkInTime: string;
  gateCode: string;
  parkingBay: string;
  registeredPlate: string;
  digitalCheckInUrl: string;
  viewInBrowserUrl?: string;
}

export const PreArrival24Hours: React.FC<PreArrival24HoursProps> = ({
  guestFirstName,
  propertyName,
  arrivalDate,
  checkInTime,
  gateCode,
  parkingBay,
  registeredPlate,
  digitalCheckInUrl,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview={`Tomorrow. ${propertyName} is ready. Gate code inside.`}
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>Tomorrow</Eyebrow>
    <Heading level={1}>
      {guestFirstName}, {propertyName} is ready for you.
    </Heading>
    <Paragraph>
      Linen is on the bed, the lamps are warm, the kitchen is stocked with
      your welcome hamper. Here is everything you need for tomorrow,{' '}
      {arrivalDate}.
    </Paragraph>

    <Section
      style={{
        backgroundColor: tokens.color.surfaceMid,
        padding: tokens.space.lg,
        margin: `${tokens.space.md} 0`,
        textAlign: 'center',
      }}
    >
      <Eyebrow>Estate gate code</Eyebrow>
      <Heading level={1} align="center">
        {gateCode}
      </Heading>
      <Paragraph muted size="sm">
        Active from 12 noon until 11pm on the day of your arrival.
      </Paragraph>
    </Section>

    <TwoColumnInfo
      rows={[
        { label: 'Property', value: propertyName },
        { label: 'Check-in', value: `${checkInTime} on ${arrivalDate}` },
        { label: 'Parking bay', value: parkingBay },
        { label: 'ANPR plate', value: registeredPlate },
      ]}
    />

    <Paragraph muted size="sm">
      Number-plate recognition opens the estate gate automatically for{' '}
      {registeredPlate}. If you are arriving in a different vehicle, reply to
      this email or use the code above.
    </Paragraph>

    <SoftRule />

    <Heading level={3}>On arrival</Heading>
    <BulletList
      items={[
        <>
          Enter the estate through the main gate and follow signs to{' '}
          {propertyName}.
        </>,
        <>
          Your key is in the lockbox by the door. The code is your booking
          reference — last four digits.
        </>,
        <>
          The Welcome Pavilion is open until 9pm if you would like a hello
          and a cup of something warm.
        </>,
        <>
          A short estate orientation video plays on the cottage tablet when
          you turn it on.
        </>,
      ]}
    />

    <Callout title="Arriving early?">
      Cottages are ready from {checkInTime}. You are welcome to arrive
      sooner, leave the car and head to The Weir for lunch — we will keep
      your bags safe at the Welcome Pavilion.
    </Callout>

    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={digitalCheckInUrl}>Complete digital check-in</Button>
    </Section>

    <Paragraph muted size="sm">
      Two minutes. Pre-load your photo ID and pet registration so we can
      skip the paperwork on arrival.
    </Paragraph>

    <SoftRule />
    <Signature />
  </EmailLayout>
);

export default PreArrival24Hours;
