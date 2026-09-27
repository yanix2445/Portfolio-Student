import { fireEvent, render, screen, within } from "@testing-library/react";
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

    for (const label of ["Compétences", "Expériences", "Projets perso", "Certifications", "Veille techno", "FAQ"]) {
      expect(within(navigation).getAllByRole("link", { name: label }).length).toBeGreaterThan(0);
    }

    expect(within(navigation).getAllByRole("button", { name: "Épreuves" }).length).toBeGreaterThan(0);

    fireEvent.click(within(navigation).getAllByRole("button", { name: "Épreuves" })[0]);

    expect(screen.getByRole("menuitem", { name: /E5.*Missions professionnelles/i }).getAttribute("href")).toBe("/epreuves/e5");
    expect(screen.getByRole("menuitem", { name: /E6.*Réalisations techniques/i }).getAttribute("href")).toBe("/epreuves/e6");

    const bookingLinks = screen.getAllByRole("link", {
      name: /réserver un échange/i,
    });
    expect(bookingLinks[0].getAttribute("href")).toBe(
      "https://cal.com/yanis-harrat",
    );
  });
});
