import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
  Img,
  Font,
  Preview,
} from "@react-email/components";
import * as React from "react";

const colors = {
  bg: "#FAFAF8",
  white: "#FFFFFF",
  text: "#1A1A1A",
  muted: "#6B6B6B",
  sage: "#7C8C6E",
  sageDark: "#5A6B4D",
  border: "#E8E6E3",
};

interface EmailLayoutProps {
  preview?: string;
  children: React.ReactNode;
}

export function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Georgia"
          fallbackFontFamily="serif"
        />
      </Head>
      {preview && <Preview>{preview}</Preview>}
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={wordmark}>WHALESBOROUGH</Text>
            <Text style={tagline}>Farm Resort & Spa</Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            {children}
          </Section>

          {/* Footer */}
          <Hr style={divider} />
          <Section style={footer}>
            <Text style={footerLinks}>
              <Link href="https://whalesborough.co.uk/stay" style={footerLink}>Stay</Link>
              {" | "}
              <Link href="https://whalesborough.co.uk/spa" style={footerLink}>Spa</Link>
              {" | "}
              <Link href="https://whalesborough.co.uk/dine" style={footerLink}>Dine</Link>
              {" | "}
              <Link href="https://whalesborough.co.uk/estate" style={footerLink}>Estate</Link>
            </Text>
            <Text style={addressText}>
              Whalesborough Farm Resort & Spa{"\n"}
              Marhamchurch, Bude, Cornwall EX23 0HY
            </Text>
            <Text style={socialLinks}>
              <Link href="https://instagram.com/whalesborough" style={footerLink}>Instagram</Link>
              {" | "}
              <Link href="https://facebook.com/whalesborough" style={footerLink}>Facebook</Link>
            </Text>
            <Text style={unsubscribeText}>
              <Link href="{{unsubscribeUrl}}" style={unsubscribeLink}>Unsubscribe</Link>
              {" from marketing emails"}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const body: React.CSSProperties = {
  backgroundColor: colors.bg,
  fontFamily: "Georgia, serif",
  margin: 0,
  padding: 0,
};

const container: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "40px 20px",
};

const header: React.CSSProperties = {
  textAlign: "center",
  paddingBottom: "32px",
};

const wordmark: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: 400,
  letterSpacing: "4px",
  color: colors.text,
  margin: "0 0 4px 0",
};

const tagline: React.CSSProperties = {
  fontSize: "12px",
  letterSpacing: "2px",
  color: colors.muted,
  margin: 0,
  textTransform: "uppercase",
};

const content: React.CSSProperties = {
  backgroundColor: colors.white,
  borderRadius: "4px",
  padding: "40px 32px",
  border: `1px solid ${colors.border}`,
};

const divider: React.CSSProperties = {
  borderColor: colors.border,
  margin: "32px 0",
};

const footer: React.CSSProperties = {
  textAlign: "center",
  padding: "0 20px",
};

const footerLinks: React.CSSProperties = {
  fontSize: "13px",
  color: colors.muted,
  margin: "0 0 16px 0",
};

const footerLink: React.CSSProperties = {
  color: colors.sage,
  textDecoration: "none",
};

const addressText: React.CSSProperties = {
  fontSize: "12px",
  color: colors.muted,
  lineHeight: "1.6",
  margin: "0 0 16px 0",
  whiteSpace: "pre-line",
};

const socialLinks: React.CSSProperties = {
  fontSize: "13px",
  color: colors.muted,
  margin: "0 0 16px 0",
};

const unsubscribeText: React.CSSProperties = {
  fontSize: "11px",
  color: colors.muted,
  margin: 0,
};

const unsubscribeLink: React.CSSProperties = {
  color: colors.muted,
  textDecoration: "underline",
};

// Shared style exports for child templates
export const styles = {
  heading: {
    fontSize: "24px",
    fontWeight: 400,
    color: "#1A1A1A",
    margin: "0 0 24px 0",
    lineHeight: "1.3",
  } as React.CSSProperties,
  paragraph: {
    fontSize: "15px",
    color: "#1A1A1A",
    lineHeight: "1.7",
    margin: "0 0 16px 0",
  } as React.CSSProperties,
  mutedText: {
    fontSize: "14px",
    color: "#6B6B6B",
    lineHeight: "1.6",
    margin: "0 0 16px 0",
  } as React.CSSProperties,
  button: {
    backgroundColor: "#7C8C6E",
    color: "#FFFFFF",
    padding: "12px 28px",
    borderRadius: "4px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 500,
    display: "inline-block",
  } as React.CSSProperties,
  detailRow: {
    fontSize: "14px",
    color: "#1A1A1A",
    margin: "0 0 8px 0",
    lineHeight: "1.5",
  } as React.CSSProperties,
  detailLabel: {
    color: "#6B6B6B",
    fontWeight: 400,
  } as React.CSSProperties,
  link: {
    color: "#7C8C6E",
    textDecoration: "underline",
  } as React.CSSProperties,
};

export default EmailLayout;
