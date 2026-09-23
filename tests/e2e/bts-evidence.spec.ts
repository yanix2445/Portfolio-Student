import { expect, test } from "@playwright/test";

test("les six fiches E5 et leurs preuves expurgées sont accessibles", async ({ page }) => {
  await page.goto("/epreuves/e5");
  await expect(page.getByRole("link", { name: "Consulter la fiche" })).toHaveCount(6);

  await page.getByRole("link", { name: "Consulter la fiche" }).first().click();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Preuves publiables" })).toBeVisible();
  await expect(page.getByText("En préparation")).toBeVisible();
});

test("les deux réalisations E6 restent explicitement en cours", async ({ page }) => {
  await page.goto("/epreuves/e6");
  await expect(page.getByText("En cours", { exact: true })).toHaveCount(2);

  await page.getByRole("link", { name: "Voir l’état de la réalisation" }).first().click();
  await expect(page.getByRole("heading", { name: "Résultat non publié" })).toBeVisible();
  await expect(page.getByText(/aucun test final, impact, conformité/i)).toBeVisible();
});

test("les pages publiques n’exposent pas d’identifiants d’infrastructure interne", async ({
  page,
}) => {
  const routes = ["/epreuves/e5", "/epreuves/e6", "/projets", "/parcours"];
  const forbiddenPatterns = [
    /\b10\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/,
    /\b192\.168\.\d{1,3}\.\d{1,3}\b/,
    /@[a-z0-9.-]*edlearn/i,
    /@[a-z0-9.-]*secours-catholique/i,
    /mot de passe\s*:/i,
  ];

  for (const route of routes) {
    await page.goto(route);
    const publicText = await page.locator("body").innerText();
    for (const pattern of forbiddenPatterns) {
      expect(publicText).not.toMatch(pattern);
    }
  }
});
