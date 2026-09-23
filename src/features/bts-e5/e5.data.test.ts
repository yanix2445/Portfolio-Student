import { describe, expect, it } from "vitest";
import { e5Missions, getE5MissionBySlug } from "./e5.data";

describe("E5 mission data", () => {
  it("contains exactly three completed missions for each organization", () => {
    expect(e5Missions).toHaveLength(6);
    expect(e5Missions.filter((mission) => mission.organization === "EDLearn")).toHaveLength(3);
    expect(
      e5Missions.filter(
        (mission) => mission.organization === "Secours Catholique-Caritas France",
      ),
    ).toHaveLength(3);
    expect(e5Missions.every((mission) => mission.status === "Réalisée")).toBe(true);
  });

  it("uses unique slugs and provides every required evidence field", () => {
    const slugs = e5Missions.map((mission) => mission.slug);
    expect(new Set(slugs).size).toBe(6);

    for (const mission of e5Missions) {
      expect(getE5MissionBySlug(mission.slug)).toBe(mission);
      expect(mission.contribution.length).toBeGreaterThan(0);
      expect(mission.approach.length).toBeGreaterThan(0);
      expect(mission.difficulties.length).toBeGreaterThan(0);
      expect(mission.result.length).toBeGreaterThan(0);
      expect(mission.evidence.length).toBeGreaterThan(0);
      expect(mission.competencies.length).toBeGreaterThan(0);
    }
  });
});
