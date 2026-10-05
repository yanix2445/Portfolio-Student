export const emailTemplateAliases = {
  contactOwner: "portfolio-contact-owner-v2",
  contactReceipt: "portfolio-contact-receipt-v2",
  newsletterConfirmation: "portfolio-newsletter-confirmation",
  watchDigest: "portfolio-watch-digest",
} as const;

export const emailTemplateVariables = {
  visitorFirstName: "{{{VISITOR_FIRST_NAME}}}",
  visitorLastName: "{{{VISITOR_LAST_NAME}}}",
  visitorEmail: "{{{VISITOR_EMAIL}}}",
  phone: "{{{PHONE}}}",
  organization: "{{{ORGANIZATION}}}",
  reason: "{{{REASON}}}",
  message: "{{{MESSAGE}}}",
  newsletterStatus: "{{{NEWSLETTER_STATUS}}}",
  subscriberEmail: "{{{SUBSCRIBER_EMAIL}}}",
  editionLabel: "{{{EDITION_LABEL}}}",
  articleTitle: "{{{ARTICLE_TITLE}}}",
  articleSummary: "{{{ARTICLE_SUMMARY}}}",
  readTime: "{{{READ_TIME}}}",
  articleUrl: "{{{ARTICLE_URL}}}",
  unsubscribeUrl: "{{{RESEND_UNSUBSCRIBE_URL}}}",
} as const;
