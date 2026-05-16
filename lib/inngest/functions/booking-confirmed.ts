import { inngest } from "../client";

/**
 * Triggered when a booking is confirmed (payment succeeded).
 *
 * Steps:
 *  1. Send confirmation email via Resend
 *  2. Update audit log
 *  3. Schedule pre-arrival email (3 days before check-in)
 *  4. Schedule post-stay review request (2 days after check-out)
 */
export const bookingConfirmed = inngest.createFunction(
  {
    id: "booking-confirmed",
    name: "Booking Confirmed",
  },
  { event: "booking/confirmed" },
  async ({ event, step }) => {
    const {
      bookingId,
      guestEmail,
      guestName,
      checkInDate,
      checkOutDate,
      accommodationType,
      totalAmount,
    } = event.data;

    // Step 1: Send booking confirmation email
    await step.run("send-confirmation-email", async () => {
      // TODO: Replace with real Resend integration
      console.log(
        `[Resend] Sending booking confirmation to ${guestEmail}`,
        {
          bookingId,
          guestName,
          checkInDate,
          checkOutDate,
          accommodationType,
          totalAmount,
        }
      );

      // Placeholder: Resend API call
      // const { data, error } = await resend.emails.send({
      //   from: "bookings@whalesborough.co.uk",
      //   to: guestEmail,
      //   subject: `Booking Confirmed — ${accommodationType} at Whalesborough`,
      //   react: BookingConfirmationEmail({ guestName, bookingId, checkInDate, checkOutDate, accommodationType, totalAmount }),
      // });

      return { sent: true, to: guestEmail };
    });

    // Step 2: Update audit log
    await step.run("update-audit-log", async () => {
      // TODO: Replace with real database write
      console.log(`[Audit] Booking confirmed`, {
        bookingId,
        guestEmail,
        timestamp: new Date().toISOString(),
        action: "booking.confirmed",
      });

      return { logged: true };
    });

    // Step 3: Schedule pre-arrival email (3 days before check-in)
    const checkIn = new Date(checkInDate);
    const preArrivalDate = new Date(checkIn);
    preArrivalDate.setDate(preArrivalDate.getDate() - 3);

    // Only schedule if pre-arrival date is in the future
    const now = new Date();
    if (preArrivalDate > now) {
      await step.sendEvent("schedule-pre-arrival", {
        name: "booking/pre-arrival",
        data: {
          bookingId,
          guestEmail,
          guestName,
          checkInDate,
          checkOutDate,
          accommodationType,
        },
        ts: Math.floor(preArrivalDate.getTime() / 1000),
      });
    }

    // Step 4: Schedule post-stay review request (2 days after check-out)
    const checkOut = new Date(checkOutDate);
    const postStayDate = new Date(checkOut);
    postStayDate.setDate(postStayDate.getDate() + 2);

    await step.sendEvent("schedule-post-stay-review", {
      name: "booking/post-stay-review",
      data: {
        bookingId,
        guestEmail,
        guestName,
        checkInDate,
        checkOutDate,
        accommodationType,
      },
      ts: Math.floor(postStayDate.getTime() / 1000),
    });

    return { success: true, bookingId };
  }
);
