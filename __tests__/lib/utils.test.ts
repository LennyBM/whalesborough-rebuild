import { describe, it, expect } from "vitest";
import { cn, formatCurrency, formatLongDate, plural } from "@/lib/utils";

describe("cn()", () => {
  it("merges multiple class strings", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("resolves Tailwind conflicts (last wins)", () => {
    expect(cn("px-4", "px-8")).toBe("px-8");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "text-lg")).toBe("base text-lg");
  });

  it("handles undefined and null inputs", () => {
    expect(cn("base", undefined, null, "end")).toBe("base end");
  });
});

describe("formatCurrency()", () => {
  it("formats £425,000 correctly", () => {
    expect(formatCurrency(425000)).toBe("£425,000");
  });

  it("formats £97 correctly", () => {
    expect(formatCurrency(97)).toBe("£97");
  });

  it("formats £1,730,505 correctly", () => {
    expect(formatCurrency(1730505)).toBe("£1,730,505");
  });

  it("formats decimal amounts", () => {
    expect(formatCurrency(99.5)).toBe("£99.50");
  });
});

describe("formatLongDate()", () => {
  it("formats a Date object correctly", () => {
    // May 15, 2026 is a Friday
    const date = new Date(2026, 4, 15);
    expect(formatLongDate(date)).toBe("Friday, 15 May 2026");
  });

  it("formats an ISO date string correctly", () => {
    const result = formatLongDate("2026-05-15T12:00:00.000Z");
    expect(result).toContain("May");
    expect(result).toContain("2026");
    expect(result).toContain("15");
  });
});

describe("plural()", () => {
  it("returns singular form for count of 1", () => {
    expect(plural(1, "night")).toBe("night");
  });

  it("returns auto-pluralised form for count > 1", () => {
    expect(plural(3, "night")).toBe("nights");
  });

  it("returns custom plural form when provided", () => {
    expect(plural(2, "child", "children")).toBe("children");
  });

  it("returns plural form for count of 0", () => {
    expect(plural(0, "night")).toBe("nights");
  });
});
