/**
 * 22 · LakesideLocalsWelcome
 * Sent: on signup to the Lakeside Locals restaurant membership.
 * Purpose: welcome, set member benefits, prompt first booking.
 * Type: transactional (account creation).
 */

import * as React from 'react';
import { Section } from '@react-email/components';
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

export interface LakesideLocalsWelcomeProps {
  memberFirstName: string;
  membershipNumber: string;
  joinedDate: string;
  bookTableUrl: string;
  viewInBrowserUrl?: string;
}

export const LakesideLocalsWelcome: React.FC<LakesideLocalsWelcomeProps> = ({
  memberFirstName,
  membershipNumber,
  joinedDate,
  bookTableUrl,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview="Welcome to Lakeside Locals"
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>Lakeside Locals</Eyebrow>
    <Heading level={1}>
      {memberFirstName}, a permanent seat at the table.
    </Heading>
    <Paragraph>
      We are pleased to welcome you to Lakeside Locals, the membership
      we built for the people who consider The Weir their local. Below
      is what is yours from today.
    </Paragraph>

    <TwoColumnInfo
      rows={[
        { label: 'Member', value: memberFirstName },
        { label: 'Member number', value: membershipNumber },
        { label: 'Joined', value: joinedDate },
      ]}
    />

    <SoftRule />

    <Heading level={3}>Member benefits</Heading>
    <BulletList
      items={[
        'Fifteen per cent off food, every day of the year — applied automatically at the table.',
        'First refusal on Grill and Chill Fridays and event tickets, twelve hours before public release.',
        'A dedicated reservations line — answered by name.',
        'A complimentary glass of Camel Valley on your birthday, every year.',
        'Quiet access to the chef\'s private kitchen tour, twice a year.',
      ]}
    />

    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={bookTableUrl}>Book your next table</Button>
    </Section>

    <Callout title="Bringing friends">
      Your member benefits extend to a table of up to six. Booking under
      your name is enough — we will recognise you.
    </Callout>

    <SoftRule />
    <Signature name="Chef Andy Tregenna" role="The Weir Restaurant" />
  </EmailLayout>
);

export default LakesideLocalsWelcome;
