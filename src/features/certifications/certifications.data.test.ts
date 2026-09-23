import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { certifications } from "./certifications.data";

describe("certification catalog data", () => {
  it("contains six unique badges split between three primary and three Anthropic entries", () => {
    expect(certifications).toHaveLength(6);
    expect(new Set(certifications.map((item) => item.slug)).size).toBe(6);
    expect(certifications.filter((item) => item.featured)).toHaveLength(3);
    expect(certifications.filter((item) => item.issuer === "Anthropic")).toHaveLength(3);
  });

  it("publishes every referenced badge image and no certificate document URL", () => {
    for (const certification of certifications) {
      expect("documentUrl" in certification).toBe(false);

      if (certification.badge.type === "image") {
        expect(
          existsSync(join(process.cwd(), "public", certification.badge.src)),
        ).toBe(true);
      }
    }
  });
});
