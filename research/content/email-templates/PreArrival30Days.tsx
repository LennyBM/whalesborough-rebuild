/**
 * 03 · PreArrival30Days
 * Sent: 30 days before arrival.
 * Purpose: build anticipation, open spa booking window, prompt restaurant
 *          reservation, sell experiences.
 * Type: transactional (lifecycle — tied to active booking).
 */

import * as React from 'react';
import { Link, Section } from '@react-email/components';
import EmailLayout from './_layout';
import {
  Button,
  BulletList,
  Callout,
  DividerSection,
  Eyebrow,
  Heading,
  Paragraph,
  Signature,
  SoftRule,
  tokens,
} from './_components';

export interface PreArrival30DaysProps {
  guestFirstName: string;
  propertyName: string;
  arrivalDate: string;
  spaUrl: string;
  restaurantUrl: string;
  activitiesUrl: string;
  manageBookingUrl: string;
  viewInBrowserUrl?: string;
}

export const PreArrival30Days: React.FC<PreArrival30DaysProps> = ({
  guestFirstName,
  propertyName,
  arrivalDate,
  spaUrl,
  restaurantUrl,
  activitiesUrl,
  manageBookingUrl,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview={`Thirty days until ${propertyName}. A gentle checklist.`}
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>Thirty days to go</Eyebrow>
    <Heading level={1}>{guestFirstName}, the lake is waiting.</Heading>
    <Paragraph>
      Your stay at {propertyName} begins on {arrivalDate}. We have started
      preparing the cottage. There is, gently, a little to think about now —
      most of it pleasant.
    </Paragraph>

    <SoftRule />

    <Heading level={3}>The W Club Spa</Heading>
    <Paragraph>
      Treatment availability opens to our resident guests today. Saturdays in
      season book first — Annick Goutal facials and the Sound Bath ritual are
      typically gone within ten days. Reserve early to choose your time.
    </Paragraph>
    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={spaUrl}>Reserve a treatment</Button>
    </Section>

    <SoftRule />

    <Heading level={3}>The Weir Restaurant</Heading>
    <Paragraph>
      Breakfast is included for residents. Lunch and our seasonal Grill and
      Chill evenings are by reservation. Tables overlooking the lake go first.
    </Paragraph>
    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={restaurantUrl} variant="ghost">
        Book a table
      </Button>
    </Section>

    <SoftRule />

    <Heading level={3}>Worth thinking about</Heading>
    <BulletList
      items={[
        <>A guided farm tour — Tuesdays and Fridays at 10am.</>,
        <>Stand-up paddleboarding on the lake, with kit included.</>,
        <>
          A private dinner laid out in your cottage on arrival evening —
          handmade by Chef Andy.
        </>,
        <>
          The estate fitness programme, included in residency: yoga at dawn,
          forest bathing at dusk.
        </>,
      ]}
    />
    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={activitiesUrl} variant="ghost">
        See the full estate diary
      </Button>
    </Section>

    <Callout title="Anything to tell us?">
      Dietary preferences, accessibility needs, an anniversary you would like
      us to mark quietly — add them in your{' '}
      <Link
        href={manageBookingUrl}
        style={{ color: tokens.color.primary }}
      >
        guest portal
      </Link>
      . We read every note.
    </Callout>

    <DividerSection />
    <Signature />
  </EmailLayout>
);

export default PreArrival30Days;
