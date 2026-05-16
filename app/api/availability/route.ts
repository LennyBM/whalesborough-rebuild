import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const availabilityQuerySchema = z.object({
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "checkIn must be YYYY-MM-DD format"),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "checkOut must be YYYY-MM-DD format"),
  guests: z.coerce.number().int().min(1).max(12).optional().default(2),
  propertyType: z
    .enum(["spa-lodge", "cottage", "arvor-suite"])
    .optional(),
});

// Mock data for development — replaced in Wave 3
const MOCK_PROPERTIES = [
  {
    id: "prop_spa_lodge_01",
    name: "Lakeside Spa Lodge",
    type: "spa-lodge",
    sleeps: 6,
    bedrooms: 3,
    pricePerNight: 295,
    features: ["private hot tub", "lake view", "spa access"],
    image: "/images/properties/spa-lodge-01.jpg",
  },
  {
    id: "prop_spa_lodge_02",
    name: "Woodland Spa Lodge",
    type: "spa-lodge",
    sleeps: 4,
    bedrooms: 2,
    pricePerNight: 245,
    features: ["private hot tub", "woodland setting", "spa access"],
    image: "/images/properties/spa-lodge-02.jpg",
  },
  {
    id: "prop_cottage_01",
    name: "Farmhouse Cottage",
    type: "cottage",
    sleeps: 8,
    bedrooms: 4,
    pricePerNight: 320,
    features: ["garden", "dog friendly", "farm views"],
    image: "/images/properties/cottage-01.jpg",
  },
  {
    id: "prop_cottage_02",
    name: "Orchard Cottage",
    type: "cottage",
    sleeps: 4,
    bedrooms: 2,
    pricePerNight: 195,
    features: ["garden", "dog friendly", "orchard setting"],
    image: "/images/properties/cottage-02.jpg",
  },
  {
    id: "prop_arvor_01",
    name: "Arvor Suite - Sea View",
    type: "arvor-suite",
    sleeps: 2,
    bedrooms: 1,
    pricePerNight: 175,
    features: ["sea view", "balcony", "spa access"],
    image: "/images/properties/arvor-01.jpg",
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      checkIn: searchParams.get("checkIn") ?? "",
      checkOut: searchParams.get("checkOut") ?? "",
      guests: searchParams.get("guests") ?? undefined,
      propertyType: searchParams.get("propertyType") ?? undefined,
    };

    const result = availabilityQuerySchema.safeParse(params);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { checkIn, checkOut, guests, propertyType } = result.data;

    // Validate date logic
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      return NextResponse.json(
        { error: "checkOut must be after checkIn" },
        { status: 400 }
      );
    }

    // Wave 3: query properties + bookings tables
    // const available = await db.query.properties.findMany({
    //   where: and(
    //     eq(properties.type, propertyType),
    //     gte(properties.sleeps, guests),
    //     notExists(conflictingBookings)
    //   )
    // })

    // Filter mock data
    let available = MOCK_PROPERTIES.filter((p) => p.sleeps >= guests);

    if (propertyType) {
      available = available.filter((p) => p.type === propertyType);
    }

    // Calculate total price
    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const results = available.map((p) => ({
      ...p,
      nights,
      totalPrice: p.pricePerNight * nights,
      checkIn,
      checkOut,
    }));

    return NextResponse.json(
      {
        success: true,
        data: results,
        meta: { checkIn, checkOut, guests, propertyType, nights, count: results.length },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Availability API] Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
