/**
 * 07 · CheckInToday
 * Sent: morning of arrival, around 8am.
 * Purpose: welcome the guest, brief them on the first 24 hours, surface
 *          on-site contact points.
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
  company,
  tokens,
} from './_components';

export interface CheckInTodayProps {
  guestFirstName: string;
  propertyName: string;
  checkInTime: string;
  conciergeChatUrl: string;
  estateMapUrl: string;
  todaysWeather: string;
  viewInBrowserUrl?: string;
}

export const CheckInToday: React.FC<CheckInTodayProps> = ({
  guestFirstName,
  propertyName,
  checkInTime,
  conciergeChatUrl,
  estateMapUrl,
  todaysWeather,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview={`Welcome to Whalesborough, ${guestFirstName}.`}
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>Today</Eyebrow>
    <Heading level={1}>{guestFirstName}, welcome to Whalesborough.</Heading>
    <Paragraph>
      We will see you at {propertyName} from {checkInTime}. The forecast for
      today, in case it shapes your plans: {todaysWeather}.
    </Paragraph>

    <SoftRule />

    <Heading level={3}>Your first afternoon</Heading>
    <BulletList
      items={[
        <>
          A short walk around the lake takes about thirty minutes. The
          best light is the hour before sunset.
        </>,
        <>
          The Weir Restaurant serves lunch until 2pm, and from 6pm if you
          have a table.
        </>,
        <>
          The W Club Spa pool is open from 7am until 9pm. Robes are in the
          cottage wardrobe.
        </>,
        <>
          Your Estate Pass — on the cottage tablet — unlocks the gym,
          fitness studio and steam room.
        </>,
      ]}
    />

    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={estateMapUrl}>Open the estate map</Button>
    </Section>

    <SoftRule />

    <Heading level={3}>If anything is amiss</Heading>
    <Paragraph>
      Light bulbs, missing slippers, the heating quibbling — anything at
      all. We would rather know straight away.
    </Paragraph>
    <BulletList
      items={[
        <>
          <Link
            href={conciergeChatUrl}
            style={{ color: tokens.color.primary }}
          >
            Concierge chat
          </Link>
          {' '}— in your guest portal. Median reply time: under three
          minutes.
        </>,
        <>Welcome Pavilion: 7am to 9pm, daily.</>,
        <>
          Telephone {company.phone} — answered 24 hours by our duty manager.
        </>,
      ]}
    />

    <Callout title="A small thing">
      Please leave shoes on the porch — the wood floors are local oak and
      mark easily. There is a basket of slippers in every cottage.
    </Callout>

    <SoftRule />
    <Signature />
  </EmailLayout>
);

export default CheckInToday;
