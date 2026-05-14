/**
 * 04 · PreArrival14Days
 * Sent: 14 days before arrival.
 * Purpose: focused nudge on restaurant tables and activity bookings, which
 *          fill up in the final fortnight.
 * Type: transactional (lifecycle).
 */

import * as React from 'react';
import { Section } from '@react-email/components';
import EmailLayout from './_layout';
import {
  Button,
  BulletList,
  Eyebrow,
  Heading,
  Paragraph,
  Signature,
  SoftRule,
  tokens,
} from './_components';

export interface PreArrival14DaysProps {
  guestFirstName: string;
  propertyName: string;
  arrivalDate: string;
  restaurantUrl: string;
  activitiesUrl: string;
  viewInBrowserUrl?: string;
}

export const PreArrival14Days: React.FC<PreArrival14DaysProps> = ({
  guestFirstName,
  propertyName,
  arrivalDate,
  restaurantUrl,
  activitiesUrl,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview={`Two weeks until ${propertyName}. A quiet reminder.`}
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>Fourteen days to go</Eyebrow>
    <Heading level={1}>
      {guestFirstName}, two reservations worth holding now.
    </Heading>
    <Paragraph>
      Your stay begins on {arrivalDate}. Tables at The Weir and treatments at
      The W Club tend to thin out in the final fortnight. A short word, just
      in case.
    </Paragraph>

    <SoftRule />

    <Heading level={3}>The Weir Restaurant</Heading>
    <Paragraph>
      Breakfast is yours by residency. For lunch and Friday evening's Grill
      and Chill we recommend reserving now — particularly if you would prefer
      the terrace.
    </Paragraph>
    <BulletList
      items={[
        'Breakfast: 7.30 to 10am, included in your stay.',
        'Lunch: noon to 2pm, à la carte.',
        'Grill and Chill: Fridays from 6pm, seasonal menu.',
      ]}
    />
    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={restaurantUrl}>Book a table</Button>
    </Section>

    <SoftRule />

    <Heading level={3}>Activities and experiences</Heading>
    <Paragraph>
      Group sizes are small by design. The farm tour, lake paddle, foraging
      walk and pottery session all hold a handful of places each session.
    </Paragraph>
    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={activitiesUrl} variant="ghost">
        Reserve a place
      </Button>
    </Section>

    <Paragraph muted size="sm">
      Anything you book now can be cancelled free of charge up to 48 hours
      ahead. We hold the spot, you hold the option.
    </Paragraph>

    <SoftRule />
    <Signature />
  </EmailLayout>
);

export default PreArrival14Days;
