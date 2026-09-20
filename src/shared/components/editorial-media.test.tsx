import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { editorialMedia } from "@/shared/config/editorial-media.config";
import { EditorialMedia } from "./editorial-media";

describe("EditorialMedia", () => {
  it("exposes an informative alternative and the image provenance", () => {
    render(<EditorialMedia media={editorialMedia.infrastructure} />);

    expect(screen.getByRole("img", { name: /baies de serveurs/i })).toBeDefined();
    expect(screen.getByRole("link", { name: "Taylor Vick" }).getAttribute("href")).toContain(
      "unsplash.com/photos/",
    );
    expect(screen.getByRole("link", { name: "Unsplash" }).getAttribute("href")).toBe(
      "https://unsplash.com/license",
    );
  });

  it("can mark an image as decorative without removing its visible credit", () => {
    render(<EditorialMedia media={editorialMedia.support} decorative />);

    expect(screen.getByRole("presentation").getAttribute("alt")).toBe("");
    expect(screen.getByText(/illustration éditoriale/i)).toBeDefined();
  });
});
