import { Text, Section, Hr, Link, Button } from "@react-email/components";
import { render } from "@react-email/components";
import * as React from "react";
import { EmailLayout, styles } from "./layout";

interface BookingConfirmationProps {
  guestName: string;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  bookingReference: string;
  totalPrice: string;
}

export function BookingConfirmation({
  guestName = "Guest",
  propertyName = "Trelowen Lodge",
  checkIn = "Friday 14 March 2026",
  checkOut = "Monday 17 March 2026",
  guests = 2,
  bookingReference = "WB-2026-XXXX",
  totalPrice = "£1,245.00",
}: BookingConfirmationProps) {
  return (
    <EmailLayout preview={`Your booking at ${propertyName} is confirmed`}>
      <Text style={styles.heading}>Your booking is confirmed</Text>

      <Text style={styles.paragraph}>
        Dear {guestName},
      </Text>

      <Text style={styles.paragraph}>
        Thank you for choosing Whalesborough. We are delighted to confirm your upcoming stay
        and look forward to welcoming you to the estate.
      </Text>

      <Hr style={sectionDivider} />

      {/* Booking details */}
      <Section style={detailsSection}>
        <Text style={sectionTitle}>Booking Details</Text>
        <Text style={styles.detailRow}>
          <span style={styles.detailLabel}>Property: </span>{propertyName}
        </Text>
        <Text style={styles.detailRow}>
          <span style={styles.detailLabel}>Check-in: </span>{checkIn}
        </Text>
        <Text style={styles.detailRow}>
          <span style={styles.detailLabel}>Check-out: </span>{checkOut}
        </Text>
        <Text style={styles.detailRow}>
          <span style={styles.detailLabel}>Guests: </span>{guests}
        </Text>
        <Text style={styles.detailRow}>
          <span style={styles.detailLabel}>Reference: </span>{bookingReference}
        </Text>
        <Text style={styles.detailRow}>
          <span style={styles.detailLabel}>Total: </span>{totalPrice}
        </Text>
      </Section>

      <Hr style={sectionDivider} />

      {/* Arrival info */}
      <Section style={detailsSection}>
        <Text style={sectionTitle}>Arrival Information</Text>
        <Text style={styles.mutedText}>
          Check-in is from 4:00 PM. Our estate entrance uses ANPR (automatic number plate
          recognition) — the barrier will open automatically for the vehicle registered to
          your booking.
        </Text>
        <Text style={styles.mutedText}>
          On arrival, follow signs to reception where our team will hand over your keys and
          provide an estate map.
        </Text>
      </Section>

      <Hr style={sectionDivider} />

      {/* What to bring */}
      <Section style={detailsSection}>
        <Text style={sectionTitle}>What to Bring</Text>
        <Text style={styles.mutedText}>
          Your lodge is fully equipped with bed linen, towels, and kitchen essentials.
          We recommend bringing walking boots for exploring the 500-acre estate, swimwear
          for the spa, and your dog&apos;s favourite blanket if you are bringing a four-legged
          friend.
        </Text>
      </Section>

      <Section style={ctaSection}>
        <Button href="https://whalesborough.co.uk/account/bookings" style={styles.button}>
          View Your Booking
        </Button>
      </Section>

      <Text style={styles.mutedText}>
        Need to make changes? Contact us at{" "}
        <Link href="mailto:stay@whalesborough.co.uk" style={styles.link}>
          stay@whalesborough.co.uk
        </Link>{" "}
        or call 01288 361 397.
      </Text>
    </EmailLayout>
  );
}

// Styles specific to this template
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

const ctaSection: React.CSSProperties = {
  textAlign: "center",
  padding: "24px 0",
};

// Helper function for programmatic rendering
export async function renderBookingConfirmation(data: BookingConfirmationProps) {
  const html = await render(<BookingConfirmation {...data} />);
  return {
    subject: "Your Whalesborough booking is confirmed",
    html,
  };
}

export default BookingConfirmation;
