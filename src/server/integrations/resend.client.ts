import "server-only";
import { Resend } from "resend";

let resendClient: Resend | undefined;

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("Resend configuration is missing.");
  }

  resendClient ??= new Resend(apiKey);

  return resendClient;
}

export function getResendNewsletterClient() {
  const segmentId = process.env.RESEND_SEGMENT_ID;
  const topicId = process.env.RESEND_TOPIC_ID;

  if (!segmentId || !topicId) {
    throw new Error("Resend newsletter configuration is missing.");
  }

  return { resend: getResendClient(), segmentId, topicId };
}

export function getResendContactClient() {
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!fromEmail || !toEmail) {
    throw new Error("Resend contact configuration is missing.");
  }

  return { resend: getResendClient(), fromEmail, toEmail };
}
