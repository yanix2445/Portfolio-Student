import { render } from "react-email";
import { describe, expect, it } from "vitest";
import { emailTemplateAliases } from "./email-template.config";
import { emailTemplateRegistry } from "./email-template.registry";

describe("email template registry", () => {
  const reservedVariableNames = new Set([
    "FIRST_NAME",
    "LAST_NAME",
    "EMAIL",
    "UNSUBSCRIBE_URL",
    "contact",
    "this",
  ]);

  it("keeps stable, unique aliases for every hosted template", () => {
    const aliases = emailTemplateRegistry.map((template) => template.alias);

    expect(aliases).toEqual([
      emailTemplateAliases.contactOwner,
      emailTemplateAliases.contactReceipt,
      emailTemplateAliases.newsletterConfirmation,
      emailTemplateAliases.watchDigest,
    ]);
    expect(new Set(aliases).size).toBe(aliases.length);
  });

  it.each(emailTemplateRegistry)(
    "renders $alias as a branded, accessible email",
    async (template) => {
      const html = await render(template.react);

      expect(html).toMatch(/<html (?=[^>]*lang="fr")(?=[^>]*dir="ltr")[^>]*>/);
      expect(html).toContain("<!DOCTYPE html");
      expect(html).toContain("https://www.yanis-harrat.com/images/brand/yanis-harrat-logo.png");
      expect(html).toContain('alt="Logo de Yanis Harrat"');
      expect(html).toContain("#ff7a00");
      expect(html).toContain("max-width:600px");
      expect(html).not.toContain("<svg");
      expect(html).not.toContain(".webp");
      expect((html.match(/<h1/g) ?? []).length).toBe(1);
      expect(template.text.trim().length).toBeGreaterThan(80);
    },
  );

  it.each(emailTemplateRegistry)(
    "declares every custom placeholder used by $alias",
    async (template) => {
      const html = await render(template.react);
      const content = [html, template.subject, template.text].join("\n");
      const placeholders = new Set(
        [...content.matchAll(/\{\{\{([A-Z0-9_]+)\}\}\}/g)].map(
          (match) => match[1],
        ),
      );
      const declaredVariables = new Set(
        template.variables.map((variable) => variable.key),
      );

      placeholders.delete("RESEND_UNSUBSCRIBE_URL");

      expect(declaredVariables).toEqual(placeholders);
      expect(
        template.variables.every(
          (variable) => !reservedVariableNames.has(variable.key),
        ),
      ).toBe(true);
    },
  );

  it("includes the direct reply context in the owner notification", async () => {
    const owner = emailTemplateRegistry.find(
      (template) => template.alias === emailTemplateAliases.contactOwner,
    );

    expect(owner).toBeDefined();
    const html = await render(owner!.react);
    expect(html).toContain("Répondre à");
    expect(html).toContain("Le champ Reply-To");
    expect(html).toContain("{{{MESSAGE}}}");
  });

  it("includes booking and unsubscribe actions in the appropriate templates", async () => {
    const receipt = emailTemplateRegistry.find(
      (template) => template.alias === emailTemplateAliases.contactReceipt,
    );
    const digest = emailTemplateRegistry.find(
      (template) => template.alias === emailTemplateAliases.watchDigest,
    );

    expect(await render(receipt!.react)).toContain(
      'href="https://cal.com/yanis-harrat"',
    );
    expect(await render(digest!.react)).toContain(
      "{{{RESEND_UNSUBSCRIBE_URL}}}",
    );
  });

  it("confirms the newsletter subscription with the registered address", async () => {
    const confirmation = emailTemplateRegistry.find(
      (template) =>
        template.alias === emailTemplateAliases.newsletterConfirmation,
    );

    expect(confirmation).toBeDefined();
    const html = await render(confirmation!.react);
    expect(html).toContain("Votre inscription est confirmée");
    expect(html).toContain("{{{SUBSCRIBER_EMAIL}}}");
    expect(html).toContain('href="https://www.yanis-harrat.com/veille"');
  });
});
