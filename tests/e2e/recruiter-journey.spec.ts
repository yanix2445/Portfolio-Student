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
  await expect(page.getByRole("link", { name: /courriel/i })).toHaveAttribute(
    "href",
    "mailto:contact@yanis-harrat.com",
  );

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
