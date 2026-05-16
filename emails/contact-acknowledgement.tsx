import { Text, Section, Link, Button } from "@react-email/components";
import { render } from "@react-email/components";
import * as React from "react";
import { EmailLayout, styles } from "./layout";

interface ContactAcknowledgementProps {
  name: string;
}

export function ContactAcknowledgement({
  name = "Guest",
}: ContactAcknowledgementProps) {
  return (
    <EmailLayout preview="We've received your message and will be in touch soon">
      <Text style={styles.heading}>We&apos;ve received your message</Text>

      <Text style={styles.paragraph}>
        Dear {name},
      </Text>

      <Text style={styles.paragraph}>
        Thank you for getting in touch. Our team has received your enquiry and we
        aim to respond within 48 hours.
      </Text>

      <Text style={styles.paragraph}>
        If your enquiry is urgent, please call us on{" "}
        <Link href="tel:01288361397" style={styles.link}>01288 361 397</Link> and
        we will be happy to help.
      </Text>

      <Section style={exploreSection}>
        <Text style={exploreTitle}>While you wait, explore</Text>
        <Text style={exploreLinks}>
          <Link href="https://whalesborough.co.uk/stay" style={styles.link}>
            Accommodation
          </Link>
          {" — lodges, cottages, and spa suites across our 500-acre estate"}
        </Text>
        <Text style={exploreLinks}>
          <Link href="https://whalesborough.co.uk/spa" style={styles.link}>
            The Spa
          </Link>
          {" — treatments, spa days, and memberships"}
        </Text>
        <Text style={exploreLinks}>
          <Link href="https://whalesborough.co.uk/dine" style={styles.link}>
            Dining
          </Link>
          {" — lakeside restaurant and private dining"}
        </Text>
        <Text style={exploreLinks}>
          <Link href="https://whalesborough.co.uk/estate" style={styles.link}>
            The Estate
          </Link>
          {" — farm, activities, and local area guides"}
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
const exploreSection: React.CSSProperties = {
  backgroundColor: "#FAFAF8",
  borderRadius: "4px",
  padding: "20px 24px",
  margin: "24px 0",
};

const exploreTitle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "1px",
  color: "#7C8C6E",
  margin: "0 0 12px 0",
};

const exploreLinks: React.CSSProperties = {
  fontSize: "14px",
  color: "#1A1A1A",
  lineHeight: "1.6",
  margin: "0 0 8px 0",
};

// Helper function for programmatic rendering
export async function renderContactAcknowledgement(data: ContactAcknowledgementProps) {
  const html = await render(<ContactAcknowledgement {...data} />);
  return {
    subject: "We've received your message",
    html,
  };
}

export default ContactAcknowledgement;
