import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  emailOptIn: z.boolean().default(true),
  smsOptIn: z.boolean().default(false),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email, emailOptIn, smsOptIn } = result.data;

    // Wave 3: write to newsletterSubscribers table
    // await db.insert(newsletterSubscribers).values({ email, emailOptIn, smsOptIn })

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to the newsletter",
        data: { email, emailOptIn, smsOptIn },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Newsletter API] Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
