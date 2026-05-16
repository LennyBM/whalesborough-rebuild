import { EventSchemas, Inngest } from "inngest";

/**
 * Inngest client — background job orchestration for Whalesborough.
 */
type Events = {
  "ping/test": {
    data: { message: string };
  };
  "booking/confirmed": {
    data: {
      bookingId: string;
      guestEmail: string;
      guestName: string;
      checkInDate: string;
      checkOutDate: string;
      accommodationType: string;
      totalAmount: number;
    };
  };
  "booking/pre-arrival": {
    data: {
      bookingId: string;
      guestEmail: string;
      guestName: string;
      checkInDate: string;
      checkOutDate: string;
      accommodationType: string;
    };
  };
  "booking/post-stay-review": {
    data: {
      bookingId: string;
      guestEmail: string;
      guestName: string;
      checkInDate: string;
      checkOutDate: string;
      accommodationType: string;
    };
  };
  "lead/lodge-created": {
    data: {
      leadId: string;
      email: string;
      name: string;
      phone: string;
      type: "enquiry" | "viewing" | "callback";
      lodgeInterest: string;
      message?: string;
    };
  };
  "newsletter/subscribed": {
    data: {
      email: string;
      name?: string;
      source: string;
    };
  };
};

export const inngest = new Inngest({
  id: "whalesborough",
  name: "Whalesborough Booking Platform",
  schemas: new EventSchemas().fromRecord<Events>(),
  eventKey: process.env.INNGEST_EVENT_KEY,
});
