import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("la veille ne présente aucune violation d’accessibilité critique ou sérieuse", async ({
  page,
}) => {
  await page.goto("/veille");

  const results = await new AxeBuilder({ page }).analyze();
  const blockingViolations = results.violations.filter((violation) =>
    ["critical", "serious"].includes(violation.impact ?? ""),
  );

  expect(blockingViolations).toEqual([]);
});

test("le formulaire annonce les erreurs de validation et de fournisseur", async ({ page }) => {
  await page.goto("/veille");

  const email = page.getByLabel("Adresse e-mail");
  const consent = page.getByRole("checkbox");
  await email.fill("adresse-invalide");
  await consent.check();
  await page.getByRole("button", { name: "Recevoir les synthèses" }).click();
  await expect(page.getByText("Saisissez une adresse e-mail valide.")).toBeVisible();
  await expect(page.locator("form").getByRole("alert")).toContainText("Vérifiez");
  await expect(email).toHaveAttribute("aria-describedby", "newsletter-email-error");

  await email.fill("test-portfolio@example.com");
  await consent.check();
  await page.getByRole("button", { name: "Recevoir les synthèses" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "momentanément indisponible",
  );
});

test("le parcours clavier, le mouvement réduit et le responsive restent utilisables", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Aller au contenu principal" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();

  const animationDuration = await page.locator(".reveal").first().evaluate((element) =>
    getComputedStyle(element).animationDuration,
  );
  expect(["0.01ms", "0.00001s", "1e-05s"]).toContain(animationDuration);

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});
