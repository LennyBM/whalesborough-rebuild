import { inngest } from "../client";

/**
 * Triggered when a new lodge ownership lead is created.
 *
 * Steps:
 *  1. Send internal notification to ownership team
 *  2. Send acknowledgement email to lead
 *  3. If type is "viewing", create a task for Graeme
 *  4. Update audit log
 */
export const lodgeLeadCreated = inngest.createFunction(
  {
    id: "lodge-lead-created",
    name: "Lodge Lead Created",
  },
  { event: "lead/lodge-created" },
  async ({ event, step }) => {
    const {
      leadId,
      email,
      name,
      phone,
      type, // "enquiry" | "viewing" | "callback"
      lodgeInterest, // e.g. "Gwelva", "Tevi", "Trelowen", "Bespoke"
      message,
    } = event.data;

    // Step 1: Send internal notification to ownership team
    await step.run("notify-ownership-team", async () => {
      // TODO: Replace with real Resend / Slack integration
      console.log(`[Internal] New lodge ownership lead`, {
        leadId,
        name,
        email,
        phone,
        type,
        lodgeInterest,
      });

      // Placeholder: Send to ownership team
      // await resend.emails.send({
      //   from: "platform@whalesborough.co.uk",
      //   to: "ownership@whalesborough.co.uk",
      //   subject: `New Lodge Lead: ${name} — ${lodgeInterest} (${type})`,
      //   html: `...`,
      // });

      return { notified: true };
    });

    // Step 2: Send acknowledgement email to lead
    await step.run("send-lead-acknowledgement", async () => {
      // TODO: Replace with real Resend integration
      console.log(`[Resend] Sending lead acknowledgement to ${email}`, {
        leadId,
        name,
        lodgeInterest,
        type,
      });

      // Placeholder: Resend API call
      // await resend.emails.send({
      //   from: "ownership@whalesborough.co.uk",
      //   to: email,
      //   subject: "Thank you for your interest in Whalesborough ownership",
      //   react: LeadAcknowledgementEmail({ name, lodgeInterest, type }),
      // });

      return { sent: true, to: email };
    });

    // Step 3: If type is "viewing", create a task for Graeme
    if (type === "viewing") {
      await step.run("create-viewing-task", async () => {
        // TODO: Replace with real task/CRM integration
        console.log(`[Task] Creating viewing task for Graeme`, {
          leadId,
          name,
          email,
          phone,
          lodgeInterest,
        });

        // Placeholder: Create task in project management / CRM
        // await db.tasks.create({
        //   assignee: "graeme",
        //   title: `Viewing: ${name} — ${lodgeInterest}`,
        //   description: `Contact ${name} (${phone}) to arrange viewing for ${lodgeInterest}`,
        //   priority: "high",
        //   leadId,
        // });

        return { taskCreated: true, assignee: "graeme" };
      });
    }

    // Step 4: Update audit log
    await step.run("update-audit-log", async () => {
      console.log(`[Audit] Lodge lead created`, {
        leadId,
        email,
        type,
        lodgeInterest,
        timestamp: new Date().toISOString(),
        action: "lead.lodge_created",
      });

      return { logged: true };
    });

    return { success: true, leadId, type };
  }
);
