import { Text, Section, Hr, Link, Button } from "@react-email/components";
import { render } from "@react-email/components";
import * as React from "react";
import { EmailLayout, styles } from "./layout";

interface LodgeLeadNotificationProps {
  type: string;
  collection: string;
  leadName: string;
  leadEmail: string;
  leadPhone?: string;
  message?: string;
  submittedAt: string;
}

export function LodgeLeadNotification({
  type = "Ownership Enquiry",
  collection = "Trelowen Collection",
  leadName = "John Smith",
  leadEmail = "john@example.com",
  leadPhone = "07700 900000",
  message = "I would like to arrange a viewing of the Trelowen lodges.",
  submittedAt = "17 May 2026, 10:32 AM",
}: LodgeLeadNotificationProps) {
  return (
    <EmailLayout preview={`New ${type} for ${collection} from ${leadName}`}>
      <Section style={alertBadge}>
        <Text style={badgeText}>NEW LEAD</Text>
      </Section>

      <Text style={styles.heading}>
        {type} — {collection}
      </Text>

      <Text style={styles.mutedText}>
        Submitted {submittedAt}
      </Text>

      <Hr style={sectionDivider} />

      {/* Lead details */}
      <Section style={detailsSection}>
        <Text style={sectionTitle}>Contact Details</Text>
        <Text style={styles.detailRow}>
          <span style={styles.detailLabel}>Name: </span>{leadName}
        </Text>
        <Text style={styles.detailRow}>
          <span style={styles.detailLabel}>Email: </span>
          <Link href={`mailto:${leadEmail}`} style={styles.link}>{leadEmail}</Link>
        </Text>
        {leadPhone && (
          <Text style={styles.detailRow}>
            <span style={styles.detailLabel}>Phone: </span>
            <Link href={`tel:${leadPhone}`} style={styles.link}>{leadPhone}</Link>
          </Text>
        )}
      </Section>

      {message && (
        <>
          <Hr style={sectionDivider} />
          <Section style={detailsSection}>
            <Text style={sectionTitle}>Message</Text>
            <Text style={messageBox}>{message}</Text>
          </Section>
        </>
      )}

      <Hr style={sectionDivider} />

      <Section style={ctaSection}>
        <Button href="https://whalesborough.co.uk/admin/leads" style={styles.button}>
          View in CRM
        </Button>
      </Section>

      <Text style={styles.mutedText}>
        This is an automated notification from the Whalesborough website. Please
        respond to this lead within 24 hours.
      </Text>
    </EmailLayout>
  );
}

// Styles specific to this template
const alertBadge: React.CSSProperties = {
  marginBottom: "16px",
};

const badgeText: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#7C8C6E",
  color: "#FFFFFF",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "1.5px",
  padding: "4px 12px",
  borderRadius: "3px",
  margin: 0,
};

const sectionDivider: React.CSSProperties = {
  borderColor: "#E8E6E3",
  margin: "24px 0",
};

const detailsSection: React.CSSProperties = {
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

const messageBox: React.CSSProperties = {
  fontSize: "14px",
  color: "#1A1A1A",
  lineHeight: "1.7",
  backgroundColor: "#FAFAF8",
  borderRadius: "4px",
  padding: "16px 20px",
  margin: 0,
  borderLeft: "3px solid #7C8C6E",
};

const ctaSection: React.CSSProperties = {
  textAlign: "center",
  padding: "24px 0",
};

// Helper function for programmatic rendering
export async function renderLodgeLeadNotification(data: LodgeLeadNotificationProps) {
  const html = await render(<LodgeLeadNotification {...data} />);
  return {
    subject: `[Lead] New ${data.type} enquiry - ${data.collection}`,
    html,
  };
}

export default LodgeLeadNotification;
