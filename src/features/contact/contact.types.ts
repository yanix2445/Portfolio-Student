export type ContactStatus = "idle" | "success" | "error";

export type ContactFieldErrors = Partial<
  Record<
    | "firstName"
    | "lastName"
    | "email"
    | "phone"
    | "organization"
    | "reason"
    | "message"
    | "consent",
    string[]
  >
>;

export type ContactState = {
  status: ContactStatus;
  message: string;
  fieldErrors?: ContactFieldErrors;
  issue?: "turnstile";
};

export type ContactAction = (
  previousState: ContactState,
  formData: FormData,
) => Promise<ContactState>;

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
};
