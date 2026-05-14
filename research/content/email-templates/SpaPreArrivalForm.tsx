/**
 * 14 · SpaPreArrivalForm
 * Sent: 48 hours before spa treatment if intake form incomplete.
 * Purpose: chase the medical intake form (without which we cannot proceed).
 * Type: transactional.
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
  tokens,
} from './_components';

export interface SpaPreArrivalFormProps {
  guestFirstName: string;
  treatmentName: string;
  dateTime: string;
  intakeFormUrl: string;
  viewInBrowserUrl?: string;
}

export const SpaPreArrivalForm: React.FC<SpaPreArrivalFormProps> = ({
  guestFirstName,
  treatmentName,
  dateTime,
  intakeFormUrl,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview="One small form before your spa treatment"
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>Three minutes, please</Eyebrow>
    <Heading level={1}>
      {guestFirstName}, your intake form is the last small thing.
    </Heading>
    <Paragraph>
      Your {treatmentName} treatment is in less than two days — {dateTime}.
      Please complete the health intake form so your therapist can prepare
      the right oils and adjust pressure to suit you.
    </Paragraph>

    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={intakeFormUrl}>Complete the form</Button>
    </Section>

    <Heading level={3}>Why we ask</Heading>
    <BulletList
      items={[
        'Pregnancy and recent surgery influence which oils and pressures are safe.',
        'Allergies and skin sensitivities tell us which products to substitute.',
        'Recent illness or medication might mean rescheduling is safer than proceeding.',
        'Goals for your session — relaxation, recovery, sleep — shape the therapist\'s approach.',
      ]}
    />

    <Callout title="A note on confidentiality">
      Your answers are visible only to the therapist treating you and our
      lead therapist. They are stored under our medical-data policy and
      removed thirty days after your visit.
    </Callout>

    <SoftRule />
    <Paragraph muted size="sm">
      Without a completed form we are unable to proceed, and would have to
      offer you a credit instead — which would be a shame. Three minutes,
      from any device.
    </Paragraph>
    <Signature name="The W Club Spa" role="Therapist team" />
  </EmailLayout>
);

export default SpaPreArrivalForm;
