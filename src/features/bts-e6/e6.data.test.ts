import { describe, expect, it } from "vitest";
import { e6Realizations, getE6RealizationBySlug } from "./e6.data";

describe("E6 realization data", () => {
  it("exposes exactly two distinct in-progress realizations", () => {
    expect(e6Realizations).toHaveLength(2);
    expect(new Set(e6Realizations.map((item) => item.slug)).size).toBe(2);
    expect(e6Realizations.every((item) => item.status === "En cours")).toBe(true);
  });

  it("does not publish unproven results", () => {
    for (const realization of e6Realizations) {
      expect(realization.result).toBeNull();
      expect(getE6RealizationBySlug(realization.slug)).toBe(realization);
      expect(realization.currentWork.length).toBeGreaterThan(0);
      expect(realization.availableEvidence.length).toBeGreaterThan(0);
    }
  });
});
