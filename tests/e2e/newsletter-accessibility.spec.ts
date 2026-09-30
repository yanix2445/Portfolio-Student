import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function mockTurnstile(page: Page) {
  await page.addInitScript(() => {
    let callback: ((token: string) => void) | undefined;

    window.turnstile = {
      render: (_container, options) => {
        callback = options.callback;
        return "newsletter-test-widget";
      },
      execute: () => {
        window.setTimeout(() => callback?.("XXXX.DUMMY.TOKEN.XXXX"), 0);
      },
      reset: () => undefined,
      remove: () => undefined,
    };
  });
}

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
  await mockTurnstile(page);
  await page.goto("/");

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

  const transitionDuration = await page.locator(".home-reveal").first().evaluate((element) =>
    getComputedStyle(element).transitionDuration,
  );
  expect(transitionDuration).toBe("0s");

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});
