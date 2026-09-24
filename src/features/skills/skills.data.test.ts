import { describe, expect, it } from "vitest";
import { e5Missions } from "@/features/bts-e5/e5.data";
import { e6Realizations } from "@/features/bts-e6/e6.data";
import { portfolioProjects } from "@/features/projects/projects.data";
import { skillDomains } from "./skills.data";

const slugsFrom = (paths: readonly string[], prefix: string) =>
  new Set(paths.map((path) => `${prefix}${path}`));

describe("skills catalog data", () => {
  it("keeps six complete and distinct domains", () => {
    expect(skillDomains).toHaveLength(6);
    expect(new Set(skillDomains.map((domain) => domain.slug)).size).toBe(6);

    for (const domain of skillDomains) {
      expect(domain.practices.length).toBeGreaterThanOrEqual(4);
      expect(domain.tools.length).toBeGreaterThan(0);
      expect(domain.proofs.length).toBeGreaterThan(0);
    }
  });

  it("connects every proof to a published E5, E6 or project route", () => {
    const allowedRoutes = new Set([
      ...slugsFrom(e5Missions.map((item) => item.slug), "/epreuves/e5/"),
      ...slugsFrom(e6Realizations.map((item) => item.slug), "/epreuves/e6/"),
      ...slugsFrom(portfolioProjects.map((item) => item.slug), "/projets/"),
    ]);

    for (const proof of skillDomains.flatMap((domain) => domain.proofs)) {
      expect(allowedRoutes.has(proof.href)).toBe(true);
      expect(proof.sourceLabel.length).toBeGreaterThan(0);
    }
  });

  it("does not present in-progress E6 work as completed", () => {
    const e6Proofs = skillDomains.flatMap((domain) => domain.proofs).filter((proof) => proof.source === "E6");

    expect(e6Proofs.length).toBeGreaterThan(0);
    expect(e6Proofs.every((proof) => proof.status === "Réalisation en cours")).toBe(true);
  });
});
