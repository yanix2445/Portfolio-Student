import { expect, test } from "@playwright/test";

const canonicalOrigin = "https://www.yanis-harrat.com";

test("un recruteur comprend le profil et atteint les trois conversions", async ({
  page,
  request,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /technicien support systèmes et réseaux/i,
    }),
  ).toBeVisible();
  await expect(page.getByText(/disponible dès maintenant/i).first()).toBeVisible();

  const cvLink = page.getByRole("link", { name: "Télécharger mon CV" }).first();
  await expect(cvLink).toHaveAttribute("href", "/documents/cv-yanis-harrat.pdf");
  await expect(cvLink).toHaveAttribute(
    "download",
    "CV-Yanis-Harrat-Technicien-Systemes-Reseaux.pdf",
  );

  const cvResponse = await request.get("/documents/cv-yanis-harrat.pdf");
  expect(cvResponse.ok()).toBeTruthy();
  expect(cvResponse.headers()["content-type"]).toContain("application/pdf");

  await expect(page.getByRole("link", { name: /réserver un échange/i }).first()).toHaveAttribute(
    "href",
    "https://cal.com/yanis-harrat",
  );
  const contactLink = page.getByRole("link", { name: "Me contacter" });
  await expect(contactLink).toHaveAttribute("href", "/contact");
  await contactLink.click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Un échange clair commence par le bon contexte",
  );
  await expect(
    page.getByRole("link", { name: "contact@yanis-harrat.com" }),
  ).toHaveAttribute("href", "mailto:contact@yanis-harrat.com");

  await page.goto("/");
  await page.getByRole("link", { name: "Espace E5" }).click();
  await expect(page).toHaveURL(/\/epreuves\/e5$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Des situations réelles aux compétences démontrées",
  );
});

test("l’ancre de l’URL suit la section visible pendant le défilement", async ({ page }) => {
  await page.goto("/");
  await expect.poll(() => new URL(page.url()).hash).toBe("#accueil");

  for (const sectionId of [
    "competences",
    "epreuves",
    "experiences",
    "projets",
    "certifications",
    "veille",
    "faq",
  ]) {
    await page.locator(`#${sectionId}`).evaluate((section) => {
      section.scrollIntoView({ block: "start" });
    });
    await expect.poll(() => new URL(page.url()).hash).toBe(`#${sectionId}`);
  }

  await page.goto("/#experiences");
  await expect.poll(() => new URL(page.url()).hash).toBe("#experiences");
  await page.reload();
  await expect.poll(() => new URL(page.url()).hash).toBe("#experiences");

  const anchoredTop = await page.locator("#experiences").evaluate((section) =>
    Math.round(section.getBoundingClientRect().top),
  );
  expect(anchoredTop).toBeGreaterThanOrEqual(0);
  expect(anchoredTop).toBeLessThan(160);
});

test("les routes publiques possèdent un titre, une description, un H1 et une canonique", async ({
  page,
}) => {
  const routes = [
    "/",
    "/competences",
    "/parcours",
    "/epreuves/e5",
    "/epreuves/e6",
    "/projets",
    "/certifications",
    "/veille",
    "/veille/articles",
  ];

  for (const route of routes) {
    await page.goto(route);
    await expect(page).toHaveTitle(/Yanis Harrat/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      route === "/" ? canonicalOrigin : `${canonicalOrigin}${route}`,
    );
  }
});

test("le quadrillage habille toutes les pages internes, mais pas l’accueil", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main.home-page")).toHaveCSS("background-image", "none");

  for (const route of [
    "/competences",
    "/parcours",
    "/epreuves/e5",
    "/epreuves/e6",
    "/projets",
    "/certifications",
    "/veille",
    "/veille/articles",
  ]) {
    await page.goto(route);
    await expect(page.locator("main.portfolio-surface")).toHaveCSS(
      "background-image",
      /linear-gradient/,
    );
  }
});

test("tous les retours de page partagent exactement le même composant", async ({ page }) => {
  const routes = [
    ["/epreuves/e5/migration-serveur-impression-cloud", "/epreuves/e5"],
    ["/epreuves/e6/infrastructure-pme-automatisation", "/epreuves/e6"],
    ["/projets/portfolio-professionnel", "/projets"],
    ["/veille/integrer-ia-frontieres-serveur", "/veille"],
    ["/veille/articles", "/veille"],
    ["/page-inexistante", "/"],
  ] as const;
  let referenceStyle: Record<string, string> | undefined;

  for (const [route, destination] of routes) {
    await page.goto(route);
    const backLink = page.locator(".portfolio-back-link").first();
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute("href", destination);
    await backLink.focus();

    const style = await backLink.evaluate((element) => {
      const computed = getComputedStyle(element);
      return {
        minHeight: computed.minHeight,
        gap: computed.gap,
        paddingInlineStart: computed.paddingInlineStart,
        paddingInlineEnd: computed.paddingInlineEnd,
        borderRadius: computed.borderRadius,
        color: computed.color,
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
        outlineStyle: computed.outlineStyle,
      };
    });

    referenceStyle ??= style;
    expect(style).toEqual(referenceStyle);
    expect(style.outlineStyle).not.toBe("none");

    await backLink.hover();
    await expect(backLink).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(backLink).toHaveCSS("color", style.color);
    await expect(backLink.locator("svg")).toHaveCSS(
      "transform",
      "matrix(1, 0, 0, 1, -4, 0)",
    );
  }
});

test("la route de prototype n’est pas exposée en production", async ({
  request,
}) => {
  const response = await request.get("/prototypes/articles");
  expect(response.status()).toBe(404);
});

test("l’animation des retours respecte la réduction des mouvements", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/projets/portfolio-professionnel");

  const backLink = page.locator(".portfolio-back-link").first();
  await backLink.hover();
  await expect(backLink.locator("svg")).toHaveCSS("transform", "none");
});

test("le sitemap, robots et les données structurées décrivent le site public", async ({
  page,
  request,
}) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  const sitemapText = await sitemap.text();
  expect(sitemapText).toContain(`${canonicalOrigin}/epreuves/e5/vpn-acces-distant`);
  expect(sitemapText).toContain(`${canonicalOrigin}/veille/nextjs-mcp-agents-developpement`);
  expect(sitemapText).toContain(`${canonicalOrigin}/veille/articles`);

  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain(`${canonicalOrigin}/sitemap.xml`);

  await page.goto("/");
  const jsonLd = page.locator('script[type="application/ld+json"]');
  await expect(jsonLd).toHaveCount(1);
  expect(JSON.parse((await jsonLd.textContent()) ?? "{}")["@type"]).toBe("Person");
});
