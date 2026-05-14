/**
 * Whalesborough Email — Shared Components
 *
 * Coastal Editorial voice. Email-safe inline styles only.
 * All components forward props sparingly; we keep them small and predictable
 * so they render reliably across Gmail, Outlook (Windows/Mac), Apple Mail,
 * iOS Mail, Yahoo, ProtonMail and HEY.
 *
 * Tokens mirror the Coastal Editorial design system but are inlined here
 * because email clients strip CSS variables.
 */

import * as React from 'react';
import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

/* ──────────────────────────────────────────────────────────────────────
 * 1. Tokens — inlined because email clients strip :root variables.
 * ──────────────────────────────────────────────────────────────────── */

export const tokens = {
  color: {
    primary: '#703a1d',
    primaryHover: '#5e3018',
    onPrimary: '#ffffff',
    secondary: '#4a6457',
    background: '#fbf9f6',
    surface: '#ffffff',
    surfaceLow: '#f5f3f0',
    surfaceMid: '#efeeeb',
    onSurface: '#1b1c1a',
    onSurfaceVariant: '#424844',
    onSurfaceMuted: '#6b7370',
    outline: '#e4e2df',
    success: '#4a6e4f',
    warning: '#a86b2a',
    error: '#8a3324',
  },
  font: {
    body: '"Plus Jakarta Sans", Helvetica, Arial, sans-serif',
    heading:
      '"Newsreader", "Source Serif Pro", Georgia, "Times New Roman", serif',
  },
  size: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    md: '18px',
    lg: '22px',
    xl: '28px',
    xxl: '36px',
  },
  space: {
    xs: '8px',
    sm: '12px',
    md: '20px',
    lg: '32px',
    xl: '48px',
    xxl: '64px',
  },
  radius: '0px', // Coastal Editorial — no rounding.
  containerWidth: '600px',
} as const;

/* ──────────────────────────────────────────────────────────────────────
 * 2. Company constants — used in legal footer.
 * ──────────────────────────────────────────────────────────────────── */

export const company = {
  legalName: 'Whalesborough Farm Resort & Spa Limited',
  tradingName: 'Whalesborough',
  registeredOffice:
    'Whalesborough Farm, Marhamchurch, Bude, Cornwall, EX23 0JD',
  companyNumber: '00000000', // Replace with Companies House number on go-live.
  vatNumber: 'GB 000 0000 00', // Replace with VAT registration number.
  icoNumber: 'ZA000000', // Replace with ICO registration number.
  website: 'https://whalesborough.co.uk',
  email: 'hello@whalesborough.co.uk',
  reservationsEmail: 'reservations@whalesborough.co.uk',
  phone: '+44 1288 000000',
  logo: 'https://whalesborough.co.uk/logo.png',
  logoAlt: 'Whalesborough Farm Resort & Spa',
};

/* ──────────────────────────────────────────────────────────────────────
 * 3. Primitive: Button — cognac fill, full-width on mobile via 100% min.
 * ──────────────────────────────────────────────────────────────────── */

export interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({
  href,
  children,
  variant = 'primary',
}) => {
  const isPrimary = variant === 'primary';
  return (
    <Link
      href={href}
      style={{
        display: 'inline-block',
        backgroundColor: isPrimary ? tokens.color.primary : 'transparent',
        color: isPrimary ? tokens.color.onPrimary : tokens.color.primary,
        fontFamily: tokens.font.body,
        fontSize: tokens.size.base,
        fontWeight: 600,
        letterSpacing: '0.02em',
        lineHeight: 1.2,
        textDecoration: 'none',
        textAlign: 'center',
        padding: '16px 28px',
        borderRadius: tokens.radius,
        border: isPrimary ? 'none' : `1px solid ${tokens.color.primary}`,
        msoLineHeightRule: 'exactly',
      }}
    >
      {children}
    </Link>
  );
};

/* ──────────────────────────────────────────────────────────────────────
 * 4. Primitive: TwoColumnInfo — booking summary key/value table.
 * ──────────────────────────────────────────────────────────────────── */

export interface InfoRow {
  label: string;
  value: React.ReactNode;
}

export const TwoColumnInfo: React.FC<{ rows: InfoRow[] }> = ({ rows }) => (
  <Section
    style={{
      backgroundColor: tokens.color.surfaceLow,
      padding: tokens.space.md,
      margin: `${tokens.space.md} 0`,
    }}
  >
    {rows.map((row, i) => (
      <Row key={i} style={{ marginBottom: i === rows.length - 1 ? 0 : '10px' }}>
        <Column
          style={{
            width: '40%',
            verticalAlign: 'top',
            fontFamily: tokens.font.body,
            fontSize: tokens.size.sm,
            color: tokens.color.onSurfaceMuted,
            paddingRight: tokens.space.sm,
          }}
        >
          {row.label}
        </Column>
        <Column
          style={{
            width: '60%',
            verticalAlign: 'top',
            fontFamily: tokens.font.body,
            fontSize: tokens.size.sm,
            color: tokens.color.onSurface,
            fontWeight: 500,
          }}
        >
          {row.value}
        </Column>
      </Row>
    ))}
  </Section>
);

/* ──────────────────────────────────────────────────────────────────────
 * 5. Primitive: DividerSection — tonal separation, no borders.
 * ──────────────────────────────────────────────────────────────────── */

export const DividerSection: React.FC<{ height?: string }> = ({
  height = tokens.space.lg,
}) => (
  <Section
    style={{
      height,
      lineHeight: height,
      fontSize: '1px',
    }}
  >
    {' '}
  </Section>
);

/* ──────────────────────────────────────────────────────────────────────
 * 6. Primitive: SoftRule — felt-not-seen horizontal rule.
 * ──────────────────────────────────────────────────────────────────── */

export const SoftRule: React.FC = () => (
  <Hr
    style={{
      border: 'none',
      borderTop: `1px solid ${tokens.color.outline}`,
      margin: `${tokens.space.lg} 0`,
    }}
  />
);

/* ──────────────────────────────────────────────────────────────────────
 * 7. Primitive: Heading — serif, editorial.
 * ──────────────────────────────────────────────────────────────────── */

export interface HeadingProps {
  level?: 1 | 2 | 3;
  children: React.ReactNode;
  align?: 'left' | 'center';
}

export const Heading: React.FC<HeadingProps> = ({
  level = 1,
  children,
  align = 'left',
}) => {
  const sizeMap = {
    1: tokens.size.xxl,
    2: tokens.size.xl,
    3: tokens.size.lg,
  };
  const lineHeightMap = { 1: 1.15, 2: 1.2, 3: 1.3 };
  return (
    <Text
      style={{
        fontFamily: tokens.font.heading,
        fontSize: sizeMap[level],
        fontWeight: 400,
        lineHeight: lineHeightMap[level],
        color: tokens.color.onSurface,
        margin: `0 0 ${tokens.space.md} 0`,
        textAlign: align,
        letterSpacing: '-0.01em',
      }}
    >
      {children}
    </Text>
  );
};

/* ──────────────────────────────────────────────────────────────────────
 * 8. Primitive: Paragraph — body copy in Jakarta Sans.
 * ──────────────────────────────────────────────────────────────────── */

export const Paragraph: React.FC<{
  children: React.ReactNode;
  muted?: boolean;
  size?: 'sm' | 'base';
}> = ({ children, muted = false, size = 'base' }) => (
  <Text
    style={{
      fontFamily: tokens.font.body,
      fontSize: size === 'sm' ? tokens.size.sm : tokens.size.base,
      lineHeight: 1.65,
      color: muted ? tokens.color.onSurfaceMuted : tokens.color.onSurfaceVariant,
      margin: `0 0 ${tokens.space.md} 0`,
    }}
  >
    {children}
  </Text>
);

/* ──────────────────────────────────────────────────────────────────────
 * 9. Primitive: Eyebrow — small uppercase label above heading.
 * ──────────────────────────────────────────────────────────────────── */

export const Eyebrow: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Text
    style={{
      fontFamily: tokens.font.body,
      fontSize: tokens.size.xs,
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: tokens.color.primary,
      margin: `0 0 ${tokens.space.sm} 0`,
    }}
  >
    {children}
  </Text>
);

/* ──────────────────────────────────────────────────────────────────────
 * 10. Primitive: Callout — quiet card for important reminders.
 * ──────────────────────────────────────────────────────────────────── */

export const Callout: React.FC<{
  title?: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <Section
    style={{
      backgroundColor: tokens.color.surfaceMid,
      padding: tokens.space.md,
      margin: `${tokens.space.md} 0`,
    }}
  >
    {title && (
      <Text
        style={{
          fontFamily: tokens.font.heading,
          fontSize: tokens.size.md,
          color: tokens.color.onSurface,
          margin: `0 0 ${tokens.space.xs} 0`,
        }}
      >
        {title}
      </Text>
    )}
    <Text
      style={{
        fontFamily: tokens.font.body,
        fontSize: tokens.size.sm,
        lineHeight: 1.6,
        color: tokens.color.onSurfaceVariant,
        margin: 0,
      }}
    >
      {children}
    </Text>
  </Section>
);

/* ──────────────────────────────────────────────────────────────────────
 * 11. Primitive: BulletList — checklist or numbered list, email-safe.
 * ──────────────────────────────────────────────────────────────────── */

export const BulletList: React.FC<{ items: React.ReactNode[] }> = ({
  items,
}) => (
  <Section style={{ margin: `${tokens.space.sm} 0 ${tokens.space.md} 0` }}>
    {items.map((item, i) => (
      <Row key={i} style={{ marginBottom: '6px' }}>
        <Column
          style={{
            width: '20px',
            verticalAlign: 'top',
            fontFamily: tokens.font.body,
            fontSize: tokens.size.base,
            color: tokens.color.primary,
            lineHeight: 1.65,
          }}
        >
          —
        </Column>
        <Column
          style={{
            fontFamily: tokens.font.body,
            fontSize: tokens.size.base,
            color: tokens.color.onSurfaceVariant,
            lineHeight: 1.65,
          }}
        >
          {item}
        </Column>
      </Row>
    ))}
  </Section>
);

/* ──────────────────────────────────────────────────────────────────────
 * 12. Primitive: Receipt line — itemised receipt row.
 * ──────────────────────────────────────────────────────────────────── */

export const ReceiptLine: React.FC<{
  label: string;
  amount: string;
  bold?: boolean;
}> = ({ label, amount, bold = false }) => (
  <Row style={{ marginBottom: '6px' }}>
    <Column
      style={{
        fontFamily: tokens.font.body,
        fontSize: tokens.size.sm,
        color: tokens.color.onSurfaceVariant,
        fontWeight: bold ? 600 : 400,
      }}
    >
      {label}
    </Column>
    <Column
      align="right"
      style={{
        fontFamily: tokens.font.body,
        fontSize: tokens.size.sm,
        color: tokens.color.onSurface,
        fontWeight: bold ? 600 : 400,
      }}
    >
      {amount}
    </Column>
  </Row>
);

/* ──────────────────────────────────────────────────────────────────────
 * 13. Header block — logo, centred.
 * ──────────────────────────────────────────────────────────────────── */

export const EmailHeader: React.FC = () => (
  <Section
    style={{
      backgroundColor: tokens.color.background,
      padding: `${tokens.space.lg} ${tokens.space.md}`,
      textAlign: 'center',
    }}
  >
    <Link href={company.website}>
      <Img
        src={company.logo}
        alt={company.logoAlt}
        width="160"
        height="40"
        style={{
          display: 'inline-block',
          margin: '0 auto',
          maxWidth: '160px',
          height: 'auto',
        }}
      />
    </Link>
  </Section>
);

/* ──────────────────────────────────────────────────────────────────────
 * 14. Footer block — PECR + DUAA compliant.
 *
 * Footers must contain:
 *  - Registered company details (Companies Act 2006)
 *  - ICO registration (transparency under UK GDPR Art. 13)
 *  - Unsubscribe link with consent_id query param (PECR Reg 22)
 *  - Link to complaints procedure (DUAA 2025, in force 19 June 2026)
 *  - Link to accessibility statement (Equality Act 2010)
 *  - View-in-browser link for accessibility fallback
 * ──────────────────────────────────────────────────────────────────── */

export interface FooterProps {
  /**
   * Unique consent record reference. PECR audit-trail requirement.
   * Inserted as ?consent_id= on the unsubscribe link.
   * Pass `undefined` for purely transactional mail (booking confirmation,
   * receipt, password reset) — those messages have no marketing component.
   */
  consentId?: string;
  /** Transactional emails skip the unsubscribe block (PECR exempt). */
  isMarketing?: boolean;
  /** Optional preheader link to view this email in a browser. */
  viewInBrowserUrl?: string;
}

export const EmailFooter: React.FC<FooterProps> = ({
  consentId,
  isMarketing = false,
  viewInBrowserUrl,
}) => {
  const unsubscribeUrl =
    consentId
      ? `${company.website}/email/unsubscribe?consent_id=${encodeURIComponent(consentId)}`
      : `${company.website}/email/unsubscribe`;

  return (
    <Section
      style={{
        backgroundColor: tokens.color.surfaceLow,
        padding: `${tokens.space.lg} ${tokens.space.md}`,
        marginTop: tokens.space.lg,
      }}
    >
      {viewInBrowserUrl && (
        <Text
          style={{
            fontFamily: tokens.font.body,
            fontSize: tokens.size.xs,
            color: tokens.color.onSurfaceMuted,
            textAlign: 'center',
            margin: `0 0 ${tokens.space.sm} 0`,
          }}
        >
          <Link
            href={viewInBrowserUrl}
            style={{ color: tokens.color.onSurfaceMuted }}
          >
            View this email in your browser
          </Link>
        </Text>
      )}

      <Text
        style={{
          fontFamily: tokens.font.heading,
          fontSize: tokens.size.md,
          color: tokens.color.onSurface,
          textAlign: 'center',
          margin: `0 0 ${tokens.space.sm} 0`,
          letterSpacing: '0.02em',
        }}
      >
        Whalesborough
      </Text>

      <Text
        style={{
          fontFamily: tokens.font.body,
          fontSize: tokens.size.xs,
          lineHeight: 1.65,
          color: tokens.color.onSurfaceMuted,
          textAlign: 'center',
          margin: `0 0 ${tokens.space.md} 0`,
        }}
      >
        {company.registeredOffice}
        <br />
        Telephone {company.phone} · {company.email}
        <br />
        Registered in England No. {company.companyNumber} · VAT No.{' '}
        {company.vatNumber} · ICO Reg {company.icoNumber}
      </Text>

      <Text
        style={{
          fontFamily: tokens.font.body,
          fontSize: tokens.size.xs,
          lineHeight: 1.65,
          color: tokens.color.onSurfaceMuted,
          textAlign: 'center',
          margin: 0,
        }}
      >
        <Link
          href={`${company.website}/privacy`}
          style={{ color: tokens.color.onSurfaceMuted }}
        >
          Privacy
        </Link>
        {'  ·  '}
        <Link
          href={`${company.website}/cookies`}
          style={{ color: tokens.color.onSurfaceMuted }}
        >
          Cookies
        </Link>
        {'  ·  '}
        <Link
          href={`${company.website}/accessibility`}
          style={{ color: tokens.color.onSurfaceMuted }}
        >
          Accessibility
        </Link>
        {'  ·  '}
        <Link
          href={`${company.website}/complaints`}
          style={{ color: tokens.color.onSurfaceMuted }}
        >
          Complaints
        </Link>
        {isMarketing && (
          <>
            {'  ·  '}
            <Link
              href={unsubscribeUrl}
              style={{ color: tokens.color.onSurfaceMuted }}
            >
              Unsubscribe
            </Link>
          </>
        )}
      </Text>

      {isMarketing && (
        <Text
          style={{
            fontFamily: tokens.font.body,
            fontSize: '10px',
            lineHeight: 1.5,
            color: tokens.color.onSurfaceMuted,
            textAlign: 'center',
            margin: `${tokens.space.sm} 0 0 0`,
          }}
        >
          You are receiving this because you opted in to receive Whalesborough
          news. Consent record reference: {consentId ?? 'unknown'}. You can
          withdraw your consent at any time. We respond to all marketing
          objections within seven days, as required by PECR.
        </Text>
      )}
    </Section>
  );
};

/* ──────────────────────────────────────────────────────────────────────
 * 15. Signature — concierge closing, first-person plural.
 * ──────────────────────────────────────────────────────────────────── */

export const Signature: React.FC<{ name?: string; role?: string }> = ({
  name = 'The Whalesborough Concierge',
  role = 'Guest Experience Team',
}) => (
  <>
    <Paragraph>Until soon,</Paragraph>
    <Text
      style={{
        fontFamily: tokens.font.heading,
        fontSize: tokens.size.md,
        color: tokens.color.onSurface,
        margin: `0 0 4px 0`,
      }}
    >
      {name}
    </Text>
    <Text
      style={{
        fontFamily: tokens.font.body,
        fontSize: tokens.size.sm,
        color: tokens.color.onSurfaceMuted,
        margin: 0,
      }}
    >
      {role}
    </Text>
  </>
);
