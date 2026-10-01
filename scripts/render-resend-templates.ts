import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { render } from "react-email";
import { emailTemplateRegistry } from "../src/emails/email-template.registry";

const outputDirectory = join(process.cwd(), ".resend", "templates");

async function renderTemplates() {
  await mkdir(outputDirectory, { recursive: true });

  for (const template of emailTemplateRegistry) {
    const html = await render(template.react);
    const basePath = join(outputDirectory, template.alias);

    await Promise.all([
      writeFile(`${basePath}.html`, html, "utf8"),
      writeFile(`${basePath}.txt`, template.text, "utf8"),
    ]);

    console.info(`Rendered ${template.alias}`);
  }
}

renderTemplates().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Rendering failed.");
  process.exitCode = 1;
});
