import { inngest } from "../client";

/**
 * Triggered when a visitor subscribes to the newsletter.
 *
 * Steps:
 *  1. Send welcome email
 *  2. Sync to marketing platform (placeholder)
 *  3. Update audit log
 */
export const newsletterSubscribed = inngest.createFunction(
  {
    id: "newsletter-subscribed",
    name: "Newsletter Subscribed",
  },
  { event: "newsletter/subscribed" },
  async ({ event, step }) => {
    const { email, name, source } = event.data;

    // Step 1: Send welcome email
    await step.run("send-welcome-email", async () => {
      // TODO: Replace with real Resend integration
      console.log(`[Resend] Sending newsletter welcome to ${email}`, {
        name,
        source,
      });

      // Placeholder: Resend API call
      // await resend.emails.send({
      //   from: "hello@whalesborough.co.uk",
      //   to: email,
      //   subject: "Welcome to Whalesborough — Your Cornish escape starts here",
      //   react: NewsletterWelcomeEmail({ name }),
      // });

      return { sent: true, to: email };
    });

    // Step 2: Sync to marketing platform
    await step.run("sync-to-marketing-platform", async () => {
      // TODO: Replace with real Mailchimp / Brevo / Loops integration
      console.log(`[Marketing] Syncing subscriber to platform`, {
        email,
        name,
        source,
        lists: ["newsletter", "general"],
      });

      // Placeholder: Marketing platform API
      // await marketingClient.contacts.upsert({
      //   email,
      //   firstName: name?.split(" ")[0],
      //   lastName: name?.split(" ").slice(1).join(" "),
      //   tags: ["newsletter", source],
      // });

      return { synced: true };
    });

    // Step 3: Update audit log
    await step.run("update-audit-log", async () => {
      console.log(`[Audit] Newsletter subscription`, {
        email,
        source,
        timestamp: new Date().toISOString(),
        action: "newsletter.subscribed",
      });

      return { logged: true };
    });

    return { success: true, email };
  }
);
