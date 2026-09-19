import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PortfolioLanding } from "./portfolio-landing";

describe("PortfolioLanding", () => {
  it("propose les deux accès vers le créneau Cal.com de 30 minutes", () => {
    render(<PortfolioLanding />);

    const bookingLinks = [
      screen.getByRole("link", { name: "Prendre rendez-vous" }),
      screen.getByRole("link", { name: "Réserver 30 minutes" }),
    ];

    for (const link of bookingLinks) {
      expect(link.getAttribute("href")).toBe(
        "https://cal.com/yanis-harrat/rdv-30min",
      );
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toContain("noreferrer");
    }
  });

  it("permet de contacter Yanis à son adresse professionnelle", () => {
    render(<PortfolioLanding />);

    expect(screen.getByRole("link", { name: "M’écrire" }).getAttribute("href")).toBe(
      "mailto:contact@yanis-harrat.com",
    );
  });

  it("relie la navigation aux sections présentes sur la page", () => {
    render(<PortfolioLanding />);

    const navigation = screen.getByRole("navigation", {
      name: "Navigation principale",
    });
    const links = [
      { link: within(navigation).getByRole("link", { name: "Profil" }), id: "profil" },
      {
        link: within(navigation).getByRole("link", { name: "Compétences" }),
        id: "expertise",
      },
      {
        link: within(navigation).getByRole("link", { name: "Portfolio" }),
        id: "portfolio",
      },
      { link: screen.getByRole("link", { name: "Découvrir" }), id: "profil" },
    ];

    for (const { link, id } of links) {
      expect(link.getAttribute("href")).toBe(`#${id}`);
      expect(document.getElementById(id)).not.toBeNull();
    }
  });

  it("présente une structure de page compréhensible aux technologies d’assistance", () => {
    const { container } = render(<PortfolioLanding />);

    const primaryHeadings = screen.getAllByRole("heading", { level: 1 });
    const heroImage = container.querySelector(
      'img[src*="portfolio-hero.webp"]',
    );

    expect(primaryHeadings).toHaveLength(1);
    expect(primaryHeadings[0].textContent).toContain("Infrastructures");
    expect(primaryHeadings[0].textContent).toContain("pensées pour durer.");
    expect(
      screen.getByRole("navigation", { name: "Navigation principale" }),
    ).toBeDefined();
    expect(heroImage?.getAttribute("alt")).toBe("");

    for (const name of [
      "Trois axes, une même exigence.",
      "Le travail, sans raccourci.",
      "Une question, un projet ou simplement envie d’échanger ?",
    ]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeDefined();
    }
  });
});
