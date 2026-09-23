import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HomePage } from "./home-page";

vi.mock("@/features/newsletter", () => ({
  NewsletterForm: () => <form aria-label="Newsletter" />,
  subscribeNewsletter: vi.fn(),
}));

describe("HomePage", () => {
  it("makes the recruiter decision information immediately understandable", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /technicien support systèmes et réseaux/i,
      }),
    ).toBeDefined();
    expect(screen.getAllByText(/disponible dès maintenant/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/alternance ou CDI/i)).toBeDefined();
    expect(screen.getByText(/Paris et toute l’Île-de-France/i)).toBeDefined();
    expect(screen.getByText(/Présentiel · Hybride · Télétravail/i)).toBeDefined();
  });

  it("renders the validated section chronology", () => {
    render(<HomePage />);

    const headings = screen
      .getAllByRole("heading", { level: 2 })
      .map((heading) => heading.textContent?.replace(/\s+/g, " ").trim());

    expect(headings).toEqual([
      "Repères rapides",
      "Ma méthode pour transformer une demande en solution durable",
      "Six compétences reliées à des situations concrètes.",
      "Six missions réalisées. Deux dossiers techniques en construction.",
      "Un projet réel aujourd’hui, une collection prête à grandir.",
      "Des acquis alignés avec le support, les systèmes et les réseaux.",
      "L’IA appliquée au développement web et applicatif.",
      "L’essentiel avant un premier échange.",
      "Un besoin en support systèmes et réseaux ? Échangeons pendant 30 minutes.",
    ]);
  });

  it("provides the three validated conversion actions", () => {
    render(<HomePage />);

    expect(
      screen.getAllByRole("link", { name: /réserver un échange/i }).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /me contacter|courriel/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /télécharger mon cv/i }).length).toBeGreaterThan(0);
  });

  it("keeps exactly six E5 missions and two E6 statuses visible", () => {
    render(<HomePage />);

    const e5Section = screen
      .getByRole("heading", {
        level: 2,
        name: "Six missions réalisées. Deux dossiers techniques en construction.",
      })
      .closest("section");

    expect(e5Section).not.toBeNull();
    expect(within(e5Section as HTMLElement).getAllByRole("listitem")).toHaveLength(6);

    const e6Card = screen.getByRole("heading", { level: 3, name: "E6 · Réalisations techniques" }).closest("article");
    expect(e6Card).not.toBeNull();
    expect(within(e6Card as HTMLElement).getAllByText("En cours")).toHaveLength(2);
  });
});
