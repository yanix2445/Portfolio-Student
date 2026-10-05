import "server-only";

import { createHash } from "node:crypto";
import { getResendNewsletterClient } from "@/server/integrations/resend.client";

export async function registerNewsletterSubscription(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const {
    resend,
    segmentId,
    topicId,
    fromEmail,
    replyToEmail,
    confirmationTemplateId,
  } = getResendNewsletterClient();
  const creation = await resend.contacts.create({
    email: normalizedEmail,
    unsubscribed: false,
    segments: [{ id: segmentId }],
    topics: [{ id: topicId, subscription: "opt_in" }],
  });

  if (creation.error) {
    if (creation.error.statusCode !== 409) {
      throw new Error("Unable to create the newsletter contact.");
    }

    const update = await resend.contacts.update({
      email: normalizedEmail,
      unsubscribed: false,
    });

    if (update.error) {
      throw new Error("Unable to reactivate the newsletter contact.");
    }

    const [segment, topic] = await Promise.all([
      resend.contacts.segments.add({ email: normalizedEmail, segmentId }),
      resend.contacts.topics.update({
        email: normalizedEmail,
        topics: [{ id: topicId, subscription: "opt_in" }],
      }),
    ]);
    const isAlreadyInSegment = segment.error?.statusCode === 409;

    if ((segment.error && !isAlreadyInSegment) || topic.error) {
      throw new Error("Unable to update the newsletter preferences.");
    }
  }

  const emailHash = createHash("sha256")
    .update(normalizedEmail)
    .digest("hex")
    .slice(0, 32);
  const confirmation = await resend.emails.send(
    {
      from: fromEmail,
      to: normalizedEmail,
      replyTo: replyToEmail,
      template: {
        id: confirmationTemplateId,
        variables: { SUBSCRIBER_EMAIL: normalizedEmail },
      },
      tags: [
        { name: "source", value: "portfolio-newsletter-confirmation" },
      ],
    },
    { idempotencyKey: `portfolio-newsletter-${emailHash}` },
  );

  if (confirmation.error) {
    throw new Error("Unable to deliver the newsletter confirmation.");
  }
}
