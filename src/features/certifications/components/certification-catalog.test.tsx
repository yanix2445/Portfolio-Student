import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CertificationCatalog } from "./certification-catalog";

describe("CertificationCatalog", () => {
  it("filters the real catalog and promotes one item in each category", () => {
    render(<CertificationCatalog />);

    expect(screen.getByRole("button", { name: "Tout 6" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("region", { name: "6 acquis affichés" })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Formations 3" }));
    expect(screen.getByRole("button", { name: "Formations 3" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("region", { name: "3 acquis affichés" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Claude Code in Action", level: 2 })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Certifications 3" }));
    expect(screen.getByRole("heading", { name: "Google IT Support", level: 2 })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "Claude Code in Action" })).toBeNull();
  });
});
