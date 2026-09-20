import "server-only";
import { Resend } from "resend";

let resendClient: Resend | undefined;

export function getResendNewsletterClient() {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    throw new Error("Resend newsletter configuration is missing.");
  }

  resendClient ??= new Resend(apiKey);

  return { resend: resendClient, audienceId };
}
