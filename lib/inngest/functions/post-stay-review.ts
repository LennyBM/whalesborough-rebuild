import { inngest } from "../client";

/**
 * Scheduled 2 days after check-out.
 * Sends review request email with Feefo review link.
 */
export const postStayReview = inngest.createFunction(
  {
    id: "post-stay-review",
    name: "Post-Stay Review Request",
  },
  { event: "booking/post-stay-review" },
  async ({ event, step }) => {
    const {
      bookingId,
      guestEmail,
      guestName,
      checkInDate,
      checkOutDate,
      accommodationType,
    } = event.data;

    // Send review request email
    await step.run("send-review-request-email", async () => {
      // TODO: Replace with real Resend integration
      console.log(
        `[Resend] Sending post-stay review request to ${guestEmail}`,
        {
          bookingId,
          guestName,
          accommodationType,
        }
      );

      const emailData = {
        from: "hello@whalesborough.co.uk",
        to: guestEmail,
        subject: `How was your stay at Whalesborough, ${guestName?.split(" ")[0]}?`,
        content: {
          guestName,
          accommodationType,
          checkInDate,
          checkOutDate,
          // Feefo review link — merchant-specific URL
          feefoReviewUrl: `https://www.feefo.com/leave-feedback/whalesborough?ref=${bookingId}`,
          googleReviewUrl:
            "https://g.page/r/whalesborough/review",
          message:
            "We hope you had a wonderful time at Whalesborough. Your feedback helps us improve and helps other guests discover our estate.",
        },
      };

      // await resend.emails.send({
      //   ...emailData,
      //   react: PostStayReviewEmail(emailData.content),
      // });

      return { sent: true, to: guestEmail, emailData };
    });

    return { success: true, bookingId };
  }
);
