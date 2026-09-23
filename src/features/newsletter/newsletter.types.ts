export type NewsletterStatus = "idle" | "success" | "error";

export type NewsletterFieldErrors = {
  email?: string[];
  consent?: string[];
};

export type NewsletterState = {
  status: NewsletterStatus;
  message: string;
  fieldErrors?: NewsletterFieldErrors;
};

export type NewsletterAction = (
  previousState: NewsletterState,
  formData: FormData,
) => Promise<NewsletterState>;

export const initialNewsletterState: NewsletterState = {
  status: "idle",
  message: "",
};
