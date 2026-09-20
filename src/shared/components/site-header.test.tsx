import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
  it("exposes the identity, primary navigation, CV and booking actions", () => {
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

    const cvLinks = screen.getAllByRole("link", { name: /télécharger mon cv/i });
    expect(cvLinks[0].getAttribute("href")).toBe("/documents/cv-yanis-harrat.pdf");
    expect(cvLinks[0].getAttribute("download")).toBe(
      "CV-Yanis-Harrat-Technicien-Systemes-Reseaux.pdf",
    );
  });
});
