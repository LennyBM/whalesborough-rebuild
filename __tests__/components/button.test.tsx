import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button component", () => {
  it("renders with children text", () => {
    render(<Button>Book Now</Button>);
    expect(screen.getByRole("button", { name: /book now/i })).toBeInTheDocument();
  });

  it("applies variant classes for secondary", () => {
    render(<Button variant="secondary">Explore</Button>);
    const button = screen.getByRole("button", { name: /explore/i });
    expect(button.className).toContain("border-secondary");
  });

  it("applies variant classes for ghost", () => {
    render(<Button variant="ghost">Menu</Button>);
    const button = screen.getByRole("button", { name: /menu/i });
    expect(button.className).toContain("bg-transparent");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Unavailable</Button>);
    const button = screen.getByRole("button", { name: /unavailable/i });
    expect(button).toBeDisabled();
  });

  it("is disabled when loading prop is true", () => {
    render(<Button loading>Submit</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("shows spinner SVG when loading", () => {
    render(<Button loading>Submit</Button>);
    const button = screen.getByRole("button");
    const svg = button.querySelector("svg.animate-spin");
    expect(svg).toBeInTheDocument();
  });

  it("renders screen-reader loading text when loading", () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByText("Loading")).toHaveClass("sr-only");
  });
});
