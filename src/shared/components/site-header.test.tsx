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

    for (const label of ["Compétences", "Expériences", "E6", "Veille"]) {
      expect(within(navigation).getByRole("link", { name: label })).toBeDefined();
    }

    const bookingLinks = screen.getAllByRole("link", {
      name: /prendre rendez-vous|rendez-vous/i,
    });
    expect(bookingLinks[0].getAttribute("href")).toBe(
      "https://cal.com/yanis-harrat/rdv-30min",
    );
  });
});
