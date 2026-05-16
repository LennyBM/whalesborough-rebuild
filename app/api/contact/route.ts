import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Please provide a valid email address"),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    // Wave 3: write to contactEnquiries + send Resend email notification
    // await db.insert(contactEnquiries).values({ name, email, subject, message })
    // await resend.emails.send({ to: 'team@whalesborough.co.uk', subject: `New enquiry: ${subject}`, ... })

    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been received. We'll be in touch shortly.",
        data: { name, email, subject },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API] Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
