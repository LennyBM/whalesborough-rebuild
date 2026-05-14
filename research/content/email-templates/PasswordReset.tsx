/**
 * 29 · PasswordReset
 * Sent: on password reset request.
 * Purpose: deliver a single-use password reset link.
 * Type: transactional security.
 */

import * as React from 'react';
import { Section } from '@react-email/components';
import EmailLayout from './_layout';
import {
  Button,
  Callout,
  Eyebrow,
  Heading,
  Paragraph,
  SoftRule,
  company,
  tokens,
} from './_components';

export interface PasswordResetProps {
  resetUrl: string;
  expiresInMinutes: number;
  requestIpHint?: string;
  deviceHint?: string;
  viewInBrowserUrl?: string;
}

export const PasswordReset: React.FC<PasswordResetProps> = ({
  resetUrl,
  expiresInMinutes,
  requestIpHint,
  deviceHint,
  viewInBrowserUrl,
}) => (
  <EmailLayout
    preview="Reset your Whalesborough password"
    viewInBrowserUrl={viewInBrowserUrl}
  >
    <Eyebrow>Password reset</Eyebrow>
    <Heading level={1}>Set a new password</Heading>
    <Paragraph>
      Tap the button below to choose a new password. The link is
      single-use and expires in {expiresInMinutes} minutes.
    </Paragraph>

    <Section style={{ margin: `${tokens.space.md} 0` }}>
      <Button href={resetUrl}>Reset password</Button>
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
        {resetUrl}
      </span>
    </Paragraph>

    {(requestIpHint || deviceHint) && (
      <Paragraph size="sm" muted>
        Requested {requestIpHint && `${requestIpHint} `}
        {deviceHint && `on ${deviceHint}`}.
      </Paragraph>
    )}

    <SoftRule />

    <Callout title="If this was not you">
      Your password is unchanged. The link expires in {expiresInMinutes}{' '}
      minutes and can only be used once. If you receive these messages
      unexpectedly, please write to {company.email} and we will review
      your account access.
    </Callout>
  </EmailLayout>
);

export default PasswordReset;
