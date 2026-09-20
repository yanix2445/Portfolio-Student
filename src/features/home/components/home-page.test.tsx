import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomePage } from "./home-page";

describe("HomePage", () => {
  it("makes the recruiter decision information immediately understandable", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /technicien support systèmes & réseaux/i,
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
      "Opérationnel sur le terrain.",
      "Six missions réalisées en entreprise.",
      "Administrer, automatiser, prouver.",
      "Apprendre en construisant.",
      "Des acquis vérifiables, du support à la cybersécurité.",
      "L’IA appliquée au développement web et applicatif.",
      "Mon profil correspond à votre besoin ?",
    ]);
  });

  it("provides the core contact actions without offering an unvalidated CV", () => {
    render(<HomePage />);

    expect(
      screen.getAllByRole("link", { name: /prendre rendez-vous|réserver 30 minutes/i }).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /me contacter|écrire un courriel/i }).length).toBeGreaterThan(0);
    expect(screen.queryByRole("link", { name: /cv/i })).toBeNull();
  });

  it("keeps exactly six E5 missions and two E6 statuses visible", () => {
    render(<HomePage />);

    const e5Section = screen
      .getByRole("heading", {
        level: 2,
        name: "Six missions réalisées en entreprise.",
      })
      .closest("section");

    expect(e5Section).not.toBeNull();
    expect(within(e5Section as HTMLElement).getAllByRole("listitem")).toHaveLength(6);
    expect(screen.getAllByText("En cours")).toHaveLength(2);
  });
});
