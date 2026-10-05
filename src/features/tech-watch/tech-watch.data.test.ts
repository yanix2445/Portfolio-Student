import { describe, expect, it } from "vitest";
import { watchArticles, watchSources, watchTopic } from "./tech-watch.data";

describe("tech watch data", () => {
  it("publishes uniquely addressable and dated syntheses", () => {
    expect(watchArticles.length).toBeGreaterThanOrEqual(2);
    expect(new Set(watchArticles.map((article) => article.slug)).size).toBe(watchArticles.length);

    for (const article of watchArticles) {
      expect(article.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(article.sources.length).toBeGreaterThan(0);
      expect(article.takeaways.length).toBeGreaterThan(0);
      expect(article.sources.every((source) => source.url.startsWith("https://"))).toBe(true);
    }
  });

  it("documents why each manually followed source matters", () => {
    expect(watchSources.length).toBeGreaterThanOrEqual(4);
    expect(watchSources.every((source) => source.rationale.length > 20)).toBe(true);
  });

  it("keeps the public watch aligned with systems, networks, and cybersecurity", () => {
    expect(watchTopic.title).toMatch(/systèmes.*réseaux.*cybersécurité/i);
    expect(watchArticles.some((article) => /réseau|Cisco/i.test(article.title))).toBe(true);
    expect(watchArticles.some((article) => /Intune|administration/i.test(article.title))).toBe(true);
    expect(JSON.stringify({ watchTopic, watchArticles })).not.toMatch(
      /développement web|développement applicatif/i,
    );
  });
});
