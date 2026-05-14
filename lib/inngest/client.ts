import { EventSchemas, Inngest } from "inngest";

/**
 * Inngest client — background job orchestration.
 *
 * Wave 2 will register typed events:
 *  - booking/created
 *  - booking/payment-succeeded
 *  - booking/check-in
 *  - lead/captured
 *  - viewing/booked
 *  - spa/reminder
 */
type Events = {
  "ping/test": {
    data: { message: string };
  };
};

export const inngest = new Inngest({
  id: "whalesborough",
  name: "Whalesborough Booking Platform",
  schemas: new EventSchemas().fromRecord<Events>(),
  eventKey: process.env.INNGEST_EVENT_KEY,
});

/** All Inngest functions exported here are registered with the serve handler. */
export const functions: ReturnType<typeof inngest.createFunction>[] = [];
