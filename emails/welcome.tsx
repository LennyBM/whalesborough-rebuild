import { Text, Section, Hr, Link, Button } from "@react-email/components";
import { render } from "@react-email/components";
import * as React from "react";
import { EmailLayout, styles } from "./layout";

interface WelcomeProps {
  name: string;
}

export function Welcome({
  name = "Guest",
}: WelcomeProps) {
  return (
    <EmailLayout preview="Welcome to Whalesborough — your account is ready">
      <Text style={styles.heading}>Welcome to Whalesborough</Text>

      <Text style={styles.paragraph}>
        Dear {name},
      </Text>

      <Text style={styles.paragraph}>
        Your account has been created. You now have access to everything Whalesborough
        has to offer — from booking your next stay to reserving spa treatments and
        managing your preferences.
      </Text>

      <Hr style={sectionDivider} />

      {/* What you can do */}
      <Section style={featuresSection}>
        <Text style={sectionTitle}>What you can do</Text>

        <Text style={featureItem}>
          <span style={featureBullet}>&#8226;</span>
          {" "}Book stays across our lodges, cottages, and spa suites
        </Text>
        <Text style={featureItem}>
          <span style={featureBullet}>&#8226;</span>
          {" "}Reserve spa treatments and browse spa day packages
        </Text>
        <Text style={featureItem}>
          <span style={featureBullet}>&#8226;</span>
          {" "}Book a table at our lakeside restaurant
        </Text>
        <Text style={featureItem}>
          <span style={featureBullet}>&#8226;</span>
          {" "}View and manage all your bookings in one place
        </Text>
        <Text style={featureItem}>
          <span style={featureBullet}>&#8226;</span>
          {" "}Save your preferences for faster future bookings
        </Text>
      </Section>

      <Section style={ctaSection}>
        <Button href="https://whalesborough.co.uk/account" style={styles.button}>
          Go to Your Account
        </Button>
      </Section>

      <Hr style={sectionDivider} />

      {/* Explore */}
      <Section style={exploreSection}>
        <Text style={sectionTitle}>Explore the Estate</Text>
        <Text style={exploreLinks}>
          <Link href="https://whalesborough.co.uk/stay" style={styles.link}>Browse accommodation</Link>
          {" — from cosy cottages to luxury spa lodges"}
        </Text>
        <Text style={exploreLinks}>
          <Link href="https://whalesborough.co.uk/spa" style={styles.link}>Discover the spa</Link>
          {" — treatments, memberships, and gift vouchers"}
        </Text>
        <Text style={exploreLinks}>
          <Link href="https://whalesborough.co.uk/estate/activities" style={styles.link}>Plan activities</Link>
          {" — walks, wildlife, and farm experiences"}
        </Text>
      </Section>

      <Hr style={sectionDivider} />

      {/* Newsletter preference */}
      <Section style={newsletterSection}>
        <Text style={styles.mutedText}>
          Would you like to receive occasional news about seasonal offers, new lodges,
          and estate events? You can manage your newsletter preferences at any time in
          your{" "}
          <Link href="https://whalesborough.co.uk/account" style={styles.link}>
            account settings
          </Link>.
        </Text>
      </Section>

      <Text style={styles.mutedText}>
        Warm regards,{"\n"}
        The Whalesborough Team
      </Text>
    </EmailLayout>
  );
}

// Styles specific to this template
const sectionDivider: React.CSSProperties = {
  borderColor: "#E8E6E3",
  margin: "24px 0",
};

const featuresSection: React.CSSProperties = {
  padding: "0",
};

const sectionTitle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "1px",
  color: "#7C8C6E",
  margin: "0 0 12px 0",
};

const featureItem: React.CSSProperties = {
  fontSize: "14px",
  color: "#1A1A1A",
  lineHeight: "1.6",
  margin: "0 0 8px 0",
  paddingLeft: "4px",
};

const featureBullet: React.CSSProperties = {
  color: "#7C8C6E",
};

const ctaSection: React.CSSProperties = {
  textAlign: "center",
  padding: "24px 0",
};

const exploreSection: React.CSSProperties = {
  padding: "0",
};

const exploreLinks: React.CSSProperties = {
  fontSize: "14px",
  color: "#1A1A1A",
  lineHeight: "1.6",
  margin: "0 0 8px 0",
};

const newsletterSection: React.CSSProperties = {
  backgroundColor: "#FAFAF8",
  borderRadius: "4px",
  padding: "16px 20px",
};

// Helper function for programmatic rendering
export async function renderWelcome(data: WelcomeProps) {
  const html = await render(<Welcome {...data} />);
  return {
    subject: "Welcome to Whalesborough",
    html,
  };
}

export default Welcome;
