import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/contact/route";

function createRequest(body: unknown) {
  return new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const validPayload = {
  name: "John Guest",
  email: "john@example.com",
  subject: "Booking enquiry",
  message: "I would like to enquire about availability for a week in August.",
};

describe("POST /api/contact", () => {
  it("returns 200 for valid submission", async () => {
    const request = createRequest(validPayload);
    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.name).toBe("John Guest");
    expect(body.data.email).toBe("john@example.com");
    expect(body.data.subject).toBe("Booking enquiry");
  });

  it("returns 400 when required fields are missing", async () => {
    const request = createRequest({ name: "John" });
    const response = await POST(request);

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toBe("Validation failed");
    expect(body.details).toBeDefined();
  });

  it("returns 400 when email is invalid", async () => {
    const request = createRequest({ ...validPayload, email: "bad" });
    const response = await POST(request);

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.details.email).toBeDefined();
  });

  it("returns 400 when message is too short", async () => {
    const request = createRequest({ ...validPayload, message: "Hi" });
    const response = await POST(request);

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.details.message).toBeDefined();
  });
});
