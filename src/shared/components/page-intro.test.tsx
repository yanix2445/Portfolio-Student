import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { editorialMedia } from "@/shared/config/editorial-media.config";
import { PageIntro } from "./page-intro";

describe("PageIntro", () => {
  it("renders the editorial hierarchy with an optional action and media", () => {
    render(
      <PageIntro
        eyebrow="Rubrique"
        title="Un titre éditorial"
        description="Une introduction concise."
        actions={<a href="/suite">Continuer</a>}
        media={editorialMedia.development}
      />,
    );

    expect(screen.getByRole("heading", { level: 1, name: "Un titre éditorial" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Continuer" }).getAttribute("href")).toBe("/suite");
    expect(screen.getByRole("img", { name: /code source/i })).toBeDefined();
  });

  it("renders without a media region", () => {
    render(
      <PageIntro eyebrow="Rubrique" title="Titre seul" description="Description seule." />,
    );

    expect(screen.getByRole("heading", { name: "Titre seul" })).toBeDefined();
    expect(screen.queryByRole("img")).toBeNull();
  });
});
