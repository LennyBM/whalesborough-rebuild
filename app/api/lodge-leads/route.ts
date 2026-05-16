import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const lodgeLeadSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().min(7, "Please provide a valid phone number").max(20),
  collection: z.enum(["gwelva", "tevi", "trelowen", "bespoke"], {
    errorMap: () => ({ message: "Please select a valid collection" }),
  }),
  type: z.enum(["brochure", "viewing", "waitlist"], {
    errorMap: () => ({ message: "Please select a valid enquiry type" }),
  }),
  message: z.string().max(2000).optional().default(""),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = lodgeLeadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, phone, collection, type, message } = result.data;

    // Wave 3: write to lodgeLeads + trigger Inngest workflow
    // await db.insert(lodgeLeads).values({ name, email, phone, collection, type, message })
    // await inngest.send({ name: "lodge-lead/created", data: { leadId, collection, type } })

    return NextResponse.json(
      {
        success: true,
        message: "Your ownership enquiry has been received. Our team will be in touch within 24 hours.",
        data: { name, email, collection, type },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Lodge Leads API] Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
