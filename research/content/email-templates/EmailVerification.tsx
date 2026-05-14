/**
 * 28 · EmailVerification
 * Sent: on account creation / email address change.
 * Purpose: verify control of the email address.
 * Type: transactional security.
 */

import * as React from 'react';
import { Section } from '@react-email/components';
import EmailLayout from './_layout';
import {
  Button,
  Eyebrow,
  Heading,
  Paragraph,
  SoftRule,
  company,
  tokens,
} from './_components';

export interface EmailVerificationProps {
  verifyUrl: string;
  expiresInHours: number;
  emailBeingVerified: string;
  viewInBrowserUrl?: string;
}

export const EmailVerification: React.FC<EmailVerificationProps> = ({
  verifyUrl,
  expiresInHours,
  emailBeingVerified,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview="Verify your email to finish setting up your account"
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>One quick step</Eyebrow>
    <Heading level={1}>Confirm your email address</Heading>
    <Paragraph>
      To finish setting up your Whalesborough account, please confirm
      that {emailBeingVerified} is yours. The link below is valid for{' '}
      {expiresInHours} hours.
    </Paragraph>

    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={verifyUrl}>Confirm email address</Button>
    </Section>

    <Paragraph muted size="sm">
      Or copy this link into your browser:
      <br />
      <span
        style={{
          fontFamily: 'Menlo, Consolas, monospace',
          fontSize: tokens.size.xs,
          wordBreak: 'break-all',
          color: tokens.color.onSurface,
        }}
      >
        {verifyUrl}
      </span>
    </Paragraph>

    <SoftRule />

    <Paragraph muted size="sm">
      If you did not create an account with us, please ignore this email
      — your address will not be added to anything. Concerns? Email{' '}
      {company.email}.
    </Paragraph>
  </EmailLayout>
);

export default EmailVerification;
