import "server-only";

import { getResendNewsletterClient } from "@/server/integrations/resend.client";

export async function registerNewsletterSubscription(email: string) {
  const { resend, segmentId, topicId } = getResendNewsletterClient();
  const creation = await resend.contacts.create({
    email,
    unsubscribed: false,
    segments: [{ id: segmentId }],
    topics: [{ id: topicId, subscription: "opt_in" }],
  });

  if (!creation.error) {
    return;
  }

  if (creation.error.statusCode !== 409) {
    throw new Error("Unable to create the newsletter contact.");
  }

  const update = await resend.contacts.update({
    email,
    unsubscribed: false,
  });

  if (update.error) {
    throw new Error("Unable to reactivate the newsletter contact.");
  }

  const [segment, topic] = await Promise.all([
    resend.contacts.segments.add({ email, segmentId }),
    resend.contacts.topics.update({
      email,
      topics: [{ id: topicId, subscription: "opt_in" }],
    }),
  ]);
  const isAlreadyInSegment = segment.error?.statusCode === 409;

  if ((segment.error && !isAlreadyInSegment) || topic.error) {
    throw new Error("Unable to update the newsletter preferences.");
  }
}
