import { render } from "react-email";
import { Resend } from "resend";
import { emailTemplateRegistry } from "../src/emails/email-template.registry";

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.RESEND_FROM_EMAIL;
const contactEmail = process.env.CONTACT_TO_EMAIL;
const shouldPublish = process.argv.includes("--publish");
const templateIds: Record<string, string | undefined> = {
  "portfolio-contact-owner-v2": process.env.RESEND_CONTACT_OWNER_TEMPLATE_ID,
  "portfolio-contact-receipt-v2": process.env.RESEND_CONTACT_RECEIPT_TEMPLATE_ID,
  "portfolio-newsletter-confirmation":
    process.env.RESEND_NEWSLETTER_CONFIRMATION_TEMPLATE_ID,
  "portfolio-watch-digest": process.env.RESEND_WATCH_DIGEST_TEMPLATE_ID,
};

if (
  !apiKey ||
  !from ||
  !contactEmail ||
  Object.values(templateIds).some((identifier) => !identifier)
) {
  throw new Error(
    "Resend credentials, sender, contact address and all template IDs are required.",
  );
}

const resend = new Resend(apiKey);

async function synchronizeTemplates() {
  for (const template of emailTemplateRegistry) {
    const html = await render(template.react);
    const identifier = templateIds[template.alias];

    if (!identifier) {
      throw new Error(`Missing template ID for ${template.alias}.`);
    }

    // Resend validates placeholders against variables already attached to the
    // draft. Register variables first, then update content and metadata. This
    // also avoids an API 500 observed when every mutable field is sent in one
    // request.
    const variablesUpdate = await resend.templates.update(identifier, {
      variables: template.variables,
    });

    if (variablesUpdate.error) {
      throw new Error(
        `Unable to update ${template.alias} variables: ${variablesUpdate.error.message}`,
      );
    }

    const contentUpdate = await resend.templates.update(identifier, { html });

    if (contentUpdate.error) {
      throw new Error(
        `Unable to update ${template.alias} content: ${contentUpdate.error.message}`,
      );
    }

    const metadataUpdate = await resend.templates.update(identifier, {
      alias: template.alias,
      from,
      name: template.name,
      ...(template.alias === "portfolio-contact-owner-v2"
        ? {}
        : { replyTo: contactEmail }),
      subject: template.subject,
      text: template.text,
    });

    if (metadataUpdate.error) {
      throw new Error(
        `Unable to update ${template.alias} metadata: ${metadataUpdate.error.message}`,
      );
    }

    if (shouldPublish) {
      const publication = await resend.templates.publish(identifier);

      if (publication.error) {
        throw new Error(
          `Unable to publish ${template.alias}: ${publication.error.message}`,
        );
      }
    }

    console.info(
      `${template.alias}: ${shouldPublish ? "published" : "draft synchronized"}`,
    );
  }
}

synchronizeTemplates().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Template sync failed.");
  process.exitCode = 1;
});
