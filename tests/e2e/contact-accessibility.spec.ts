import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function mockTurnstile(page: Page) {
  await page.addInitScript(() => {
    let callback: ((token: string) => void) | undefined;
    window.turnstile = {
      render: (_container, options) => {
        callback = options.callback;
        return "test-widget";
      },
      execute: () => {
        const testWindow = window as typeof window & {
          __turnstileExecutions?: number;
        };
        testWindow.__turnstileExecutions =
          (testWindow.__turnstileExecutions ?? 0) + 1;
        window.setTimeout(() => callback?.("test-token"), 0);
      },
      reset: () => undefined,
      remove: () => undefined,
    };
  });
}

test.describe("page de contact", () => {
  test("reste accessible et sans débordement à 320 px", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto("/contact");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);

    const pageWidth = await page.evaluate(() => ({
      client: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    }));

    expect(pageWidth.scroll).toBe(pageWidth.client);
  });

  test("ouvre le sélecteur au clavier et focalise le premier champ invalide", async ({
    page,
  }) => {
    await mockTurnstile(page);
    await page.goto("/contact");

    const reason = page.getByRole("combobox", {
      name: "Objet de la demande · obligatoire",
    });
    await reason.focus();
    await reason.press("Enter");
    await expect(page.getByRole("listbox")).toBeVisible();
    await reason.press("Escape");

    const submit = page.getByRole("button", { name: "Envoyer ma demande" });
    await expect(submit).toBeEnabled();
    await submit.click();

    await expect(page.getByLabel("Prénom · obligatoire")).toBeFocused();
    await expect(page.getByText("Indiquez votre prénom.")).toBeVisible();
  });

  test("conserve toutes les valeurs lorsqu’un champ est invalide", async ({
    page,
  }) => {
    await mockTurnstile(page);
    await page.goto("/contact");

    await page.getByLabel("Prénom · obligatoire", { exact: true }).fill("Jean");
    await page.getByLabel("Nom · obligatoire", { exact: true }).fill("Dupont");
    await page
      .getByLabel("Adresse e-mail · obligatoire")
      .fill("jean@example.com");
    await page.getByLabel("Téléphone · facultatif").fill("+33 6 00 00 00 00");
    await page
      .getByLabel("Entreprise ou organisation · facultatif")
      .fill("Entreprise Exemple");
    await page
      .getByRole("combobox", { name: "Objet de la demande · obligatoire" })
      .click();
    await page
      .getByRole("option", { name: "Opportunité professionnelle" })
      .click();
    await page.getByLabel("Votre message · obligatoire").fill("Trop court");
    await page
      .getByLabel(
        "J’accepte l’utilisation de mes coordonnées pour traiter et suivre ma demande.",
      )
      .check();
    await page
      .getByLabel(
        "Je souhaite recevoir par e-mail les nouvelles synthèses de veille.",
      )
      .check();

    const submit = page.getByRole("button", { name: "Envoyer ma demande" });
    await expect(submit).toBeEnabled({ timeout: 15_000 });
    await submit.click();

    await expect(page.getByLabel("Votre message · obligatoire")).toBeFocused();
    await expect(
      page.getByText("Décrivez votre demande en au moins 20 caractères."),
    ).toBeVisible();
    await expect(
      page.getByLabel("Prénom · obligatoire", { exact: true }),
    ).toHaveValue("Jean");
    await expect(
      page.getByLabel("Nom · obligatoire", { exact: true }),
    ).toHaveValue("Dupont");
    await expect(page.getByLabel("Adresse e-mail · obligatoire")).toHaveValue(
      "jean@example.com",
    );
    await expect(page.getByLabel("Téléphone · facultatif")).toHaveValue(
      "+33 6 00 00 00 00",
    );
    await expect(
      page.getByLabel("Entreprise ou organisation · facultatif"),
    ).toHaveValue("Entreprise Exemple");
    await expect(
      page.getByRole("combobox", {
        name: "Objet de la demande · obligatoire",
      }),
    ).toContainText("Opportunité professionnelle");
    await expect(page.getByLabel("Votre message · obligatoire")).toHaveValue(
      "Trop court",
    );
    await expect(page.getByLabel(/J’accepte l’utilisation/)).toBeChecked();
    await expect(page.getByLabel(/Je souhaite recevoir par e-mail/)).toBeChecked();

    await submit.click();
    await expect
      .poll(() =>
        page.evaluate(
          () =>
            (window as typeof window & { __turnstileExecutions?: number })
              .__turnstileExecutions,
        ),
      )
      .toBe(2);
  });
});
