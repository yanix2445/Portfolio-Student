import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
  it("exposes the identity, primary navigation and booking action", () => {
    render(<SiteHeader />);

    expect(
      screen
        .getByRole("link", { name: "Yanis Harrat, accueil" })
        .getAttribute("href"),
    ).toBe("/");

    const navigation = screen.getByRole("navigation", {
      name: "Navigation principale",
    });

    for (const label of ["Compétences", "Expériences", "Projets", "Certifications", "Veille"]) {
      expect(within(navigation).getAllByRole("link", { name: label }).length).toBeGreaterThan(0);
    }

    const bookingLinks = screen.getAllByRole("link", {
      name: /réserver un échange/i,
    });
    expect(bookingLinks[0].getAttribute("href")).toBe(
      "https://cal.com/yanis-harrat/rdv-30min",
    );
  });
});
