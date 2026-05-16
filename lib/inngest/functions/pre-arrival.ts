import { inngest } from "../client";

/**
 * Scheduled 3 days before check-in.
 * Sends pre-arrival email with check-in instructions, ANPR info,
 * weather forecast link, and restaurant/spa upsell.
 */
export const preArrival = inngest.createFunction(
  {
    id: "pre-arrival",
    name: "Pre-Arrival Email",
  },
  { event: "booking/pre-arrival" },
  async ({ event, step }) => {
    const {
      bookingId,
      guestEmail,
      guestName,
      checkInDate,
      checkOutDate,
      accommodationType,
    } = event.data;

    // Send pre-arrival email with all relevant info
    await step.run("send-pre-arrival-email", async () => {
      const checkIn = new Date(checkInDate);
      const dayOfWeek = checkIn.toLocaleDateString("en-GB", {
        weekday: "long",
      });

      // TODO: Replace with real Resend integration
      console.log(`[Resend] Sending pre-arrival email to ${guestEmail}`, {
        bookingId,
        guestName,
        checkInDate,
        checkOutDate,
        accommodationType,
      });

      // Placeholder email content structure:
      // - Check-in time: 4pm
      // - Check-out time: 10am
      // - ANPR: "Your vehicle registration will be recognised at the gate"
      // - Directions: Link to /contact/finding-us
      // - Weather: Link to BBC Weather for Bude area
      // - Restaurant: "Book your table at the Lakeside" CTA
      // - Spa: "Treat yourself to a spa treatment" CTA
      // - Dog-friendly: Info if applicable

      const emailData = {
        from: "bookings@whalesborough.co.uk",
        to: guestEmail,
        subject: `Your stay at Whalesborough starts ${dayOfWeek} — everything you need to know`,
        content: {
          guestName,
          checkInTime: "4:00 PM",
          checkOutTime: "10:00 AM",
          anprNote:
            "Your vehicle registration will be recognised automatically at our entrance — no need to stop.",
          directionsUrl: "https://whalesborough.co.uk/contact/finding-us",
          weatherUrl:
            "https://www.bbc.co.uk/weather/2654399", // Bude weather
          restaurantCta: {
            text: "Book your table at the Lakeside Restaurant",
            url: "https://whalesborough.co.uk/dine/reserve",
          },
          spaCta: {
            text: "Book a spa treatment during your stay",
            url: "https://whalesborough.co.uk/spa/treatments",
          },
          accommodationType,
        },
      };

      // await resend.emails.send({
      //   ...emailData,
      //   react: PreArrivalEmail(emailData.content),
      // });

      return { sent: true, to: guestEmail, emailData };
    });

    return { success: true, bookingId };
  }
);
