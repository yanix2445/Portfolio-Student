"use client";

import {
  useRef,
  useState,
  useTransition,
} from "react";
import { Select } from "@base-ui/react/select";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleAlert,
  CircleCheck,
  LoaderCircle,
  Mailbox,
  RotateCcw,
} from "lucide-react";
import {
  TurnstileWidget,
  type TurnstileWidgetHandle,
} from "@/shared/components/turnstile-widget";
import {
  contactFormSchema,
  contactReasonLabels,
  contactReasonValues,
} from "../contact.schema";
import {
  initialContactState,
  type ContactAction,
  type ContactFieldErrors,
  type ContactState,
} from "../contact.types";
import styles from "./contact-form.module.css";

const fieldClassName =
  "min-h-12 w-full rounded-xl border border-white/14 bg-black/25 px-4 text-base text-white caret-[var(--portfolio-accent-hover)] placeholder:text-[var(--portfolio-text-subtle)] transition-[border-color,background-color] duration-150 hover:border-white/22 focus:border-[var(--portfolio-accent)] aria-[invalid=true]:border-[var(--portfolio-error)]";

const fieldStatusClassName = "text-[var(--portfolio-text-subtle)]";

const invalidFieldIds = {
  firstName: "contact-first-name",
  lastName: "contact-last-name",
  email: "contact-email",
  phone: "contact-phone",
  organization: "contact-organization",
  reason: "contact-reason",
  message: "contact-message",
  consent: "contact-consent",
} as const;

const invalidFieldOrder = Object.keys(
  invalidFieldIds,
) as Array<keyof typeof invalidFieldIds>;

type SubmissionStage =
  | "idle"
  | "verifying"
  | "preparing"
  | "delivering"
  | "success";

const wait = (duration: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, duration));

function focusFirstInvalidField(errors?: ContactFieldErrors) {
  const firstInvalidField = invalidFieldOrder.find(
    (field) => errors?.[field]?.length,
  );

  if (!firstInvalidField) {
    return;
  }

  window.requestAnimationFrame(() => {
    document.getElementById(invalidFieldIds[firstInvalidField])?.focus();
  });
}

type ConsentCheckboxProps = {
  id: string;
  name: string;
  children: React.ReactNode;
  required?: boolean;
  invalid?: boolean;
  describedBy?: string;
};

function ConsentCheckbox({
  id,
  name,
  children,
  required,
  invalid,
  describedBy,
}: ConsentCheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="group -mx-2 flex min-h-11 cursor-pointer items-start gap-3 rounded-xl px-2 py-2 text-sm leading-6 text-[var(--portfolio-text-muted)] transition-colors duration-150 hover:bg-white/[0.035]"
    >
      <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center">
        <input
          id={id}
          name={name}
          type="checkbox"
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className="peer absolute inset-0 size-full cursor-pointer appearance-none rounded-md border border-white/24 bg-black/25 transition-[border-color,background-color] duration-150 checked:border-[var(--portfolio-accent)] checked:bg-[var(--portfolio-accent)] hover:border-white/40 aria-[invalid=true]:border-[var(--portfolio-error)]"
        />
        <Check
          aria-hidden="true"
          strokeWidth={2.5}
          className="pointer-events-none size-3.5 scale-75 text-black opacity-0 transition-[scale,opacity] duration-150 peer-checked:scale-100 peer-checked:opacity-100 motion-reduce:transition-none"
        />
      </span>
      <span>{children}</span>
    </label>
  );
}

type SubmissionJourneyProps = {
  stage: Exclude<SubmissionStage, "idle">;
  message: string;
  onReset: () => void;
};

const journeyCopy = {
  verifying: {
    title: "Vérification sécurisée",
    description: "Je vérifie que la demande peut être transmise.",
  },
  preparing: {
    title: "Votre message est prêt",
    description: "L’enveloppe se ferme pendant l’envoi sécurisé.",
  },
  delivering: {
    title: "Votre message est en route",
    description: "Direction ma boîte professionnelle.",
  },
  success: {
    title: "Message bien reçu",
    description: "Je vous répondrai personnellement depuis contact@yanis-harrat.com.",
  },
} as const;

function SubmissionJourney({ stage, message, onReset }: SubmissionJourneyProps) {
  const copy = journeyCopy[stage];

  return (
    <section
      className={styles.deliveryScene}
      data-stage={stage}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className={styles.deliverySceneInner}>
        <div className={styles.deliveryVisual} aria-hidden="true">
          {stage === "verifying" ? (
            <span className={styles.verificationSpinner}>
              <LoaderCircle />
            </span>
          ) : stage === "success" ? (
            <span className={styles.finalCheck}>
              <CircleCheck />
            </span>
          ) : (
            <div className={styles.deliveryRoute}>
              <span className={styles.routeLine} />
              <span className={styles.envelope}>
                <span className={styles.envelopeBack} />
                <span className={styles.letter} />
                <span className={styles.envelopeFront} />
                <span className={styles.envelopeFlap} />
              </span>
              <span className={styles.mailbox}>
                <Mailbox />
              </span>
            </div>
          )}
        </div>

        <div className={styles.deliveryCopy}>
          <p className={styles.deliveryLabel}>
            {stage === "success" ? "Demande transmise" : "Envoi en cours"}
          </p>
          <h3>{copy.title}</h3>
          <p>{stage === "success" && message ? message : copy.description}</p>
        </div>

        {stage === "success" ? (
          <button type="button" onClick={onReset} className={styles.resetButton}>
            <RotateCcw aria-hidden="true" />
            Envoyer un autre message
          </button>
        ) : null}
      </div>
    </section>
  );
}

type ContactFormProps = {
  action: ContactAction;
};

export function ContactForm({ action }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);
  const submissionLockRef = useRef(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [state, setState] = useState<ContactState>(initialContactState);
  const [clientErrors, setClientErrors] = useState<ContactFieldErrors>();
  const [submissionStage, setSubmissionStage] =
    useState<SubmissionStage>("idle");
  const [pending, startSubmission] = useTransition();

  const fieldErrors = clientErrors ?? state.fieldErrors;
  const isVerifying = submissionStage === "verifying";
  const isJourneyActive = submissionStage !== "idle";

  const errorId = (field: keyof NonNullable<ContactState["fieldErrors"]>) =>
    fieldErrors?.[field] ? `contact-${field}-error` : undefined;
  const visibleStateMessage =
    submissionStage !== "idle" ||
    (state.issue === "turnstile" && (turnstileToken || isVerifying))
      ? ""
      : state.message;

  const getClientInput = (formData: FormData) => ({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    organization: formData.get("organization"),
    reason: formData.get("reason"),
    message: formData.get("message"),
    consent: formData.get("consent"),
    newsletter: formData.get("newsletter"),
    website: formData.get("website"),
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submissionLockRef.current) {
      return;
    }

    submissionLockRef.current = true;
    const formData = new FormData(event.currentTarget);
    const turnstileVerification =
      turnstileRef.current?.verify() ?? Promise.resolve("");
    const parsed = contactFormSchema.safeParse(getClientInput(formData));

    if (!parsed.success) {
      void turnstileVerification.finally(() => {
        turnstileRef.current?.reset();
      });
      const errors = parsed.error.flatten().fieldErrors as ContactFieldErrors;
      setClientErrors(errors);
      setState({
        status: "error",
        message: "Vérifiez les informations indiquées.",
        fieldErrors: errors,
      });
      submissionLockRef.current = false;
      focusFirstInvalidField(errors);
      return;
    }

    setClientErrors(undefined);
    setState(initialContactState);
    formData.set("submissionId", crypto.randomUUID());
    setSubmissionStage("verifying");

    const [token] = await Promise.all([
      turnstileVerification,
      wait(560),
    ]);

    if (!token) {
      setSubmissionStage("idle");
      submissionLockRef.current = false;
      return;
    }

    formData.set("cf-turnstile-response", token);
    setSubmissionStage("preparing");
    const preparationStartedAt = performance.now();

    startSubmission(async () => {
      let nextState: ContactState;

      try {
        nextState = await action(initialContactState, formData);
      } catch {
        nextState = {
          status: "error",
          message:
            "L’envoi est momentanément indisponible. Vous pouvez réessayer ou écrire directement à contact@yanis-harrat.com.",
        };
      } finally {
        turnstileRef.current?.reset();
      }

      if (nextState.status !== "success") {
        setState(nextState);
        setSubmissionStage("idle");
        submissionLockRef.current = false;
        focusFirstInvalidField(nextState.fieldErrors);
        return;
      }

      const remainingPreparation = Math.max(
        0,
        1_150 - (performance.now() - preparationStartedAt),
      );
      await wait(remainingPreparation);
      setSubmissionStage("delivering");
      await wait(1_520);

      formRef.current?.reset();
      setTurnstileToken("");
      setState(nextState);
      setSubmissionStage("success");
    });
  };

  const handleNewMessage = () => {
    submissionLockRef.current = false;
    setState(initialContactState);
    setClientErrors(undefined);
    setSubmissionStage("idle");
    window.requestAnimationFrame(() => {
      document.getElementById("contact-first-name")?.focus();
    });
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onChange={(event) => {
        const target = event.target;

        if (
          !(
            target instanceof HTMLInputElement ||
            target instanceof HTMLTextAreaElement ||
            target instanceof HTMLSelectElement
          )
        ) {
          return;
        }

        const fieldName = target.name as
          | keyof ContactFieldErrors
          | undefined;

        if (fieldName && clientErrors?.[fieldName]) {
          setClientErrors((current) => ({
            ...current,
            [fieldName]: undefined,
          }));
        }
      }}
      aria-busy={isJourneyActive && submissionStage !== "success"}
      data-stage={submissionStage}
      className={`${styles.formShell} min-w-0 rounded-2xl border border-white/10 bg-[color-mix(in_srgb,var(--portfolio-panel)_94%,transparent)] p-5 sm:p-8`}
      noValidate
    >
      <div
        className={`${styles.formContent} grid gap-6`}
        aria-hidden={isJourneyActive || undefined}
        inert={isJourneyActive || undefined}
      >
      <div>
        <p className="font-mono text-xs tracking-[0.18em] text-[var(--portfolio-accent-hover)] uppercase">
          Prise de contact
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
          Parlez-moi de votre besoin.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--portfolio-text-muted)]">
          Les champs « obligatoire » servent à traiter votre demande. Aucune pièce jointe n’est acceptée.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="contact-first-name" className="text-sm font-medium">
            Prénom <span className={fieldStatusClassName}>· obligatoire</span>
          </label>
          <input
            id="contact-first-name"
            name="firstName"
            autoComplete="given-name"
            maxLength={60}
            required
            aria-invalid={Boolean(errorId("firstName"))}
            aria-describedby={errorId("firstName")}
            className={fieldClassName}
          />
          {fieldErrors?.firstName?.map((error) => (
            <p key={error} id={errorId("firstName")} className="text-sm text-[var(--portfolio-error)]">
              {error}
            </p>
          ))}
        </div>

        <div className="grid gap-2">
          <label htmlFor="contact-last-name" className="text-sm font-medium">
            Nom <span className={fieldStatusClassName}>· obligatoire</span>
          </label>
          <input
            id="contact-last-name"
            name="lastName"
            autoComplete="family-name"
            maxLength={60}
            required
            aria-invalid={Boolean(errorId("lastName"))}
            aria-describedby={errorId("lastName")}
            className={fieldClassName}
          />
          {fieldErrors?.lastName?.map((error) => (
            <p key={error} id={errorId("lastName")} className="text-sm text-[var(--portfolio-error)]">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="contact-email" className="text-sm font-medium">
            Adresse e-mail <span className={fieldStatusClassName}>· obligatoire</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            spellCheck={false}
            required
            placeholder="vous@entreprise.fr"
            aria-invalid={Boolean(errorId("email"))}
            aria-describedby={errorId("email")}
            className={fieldClassName}
          />
          {fieldErrors?.email?.map((error) => (
            <p key={error} id={errorId("email")} className="text-sm text-[var(--portfolio-error)]">
              {error}
            </p>
          ))}
        </div>

        <div className="grid gap-2">
          <label htmlFor="contact-phone" className="text-sm font-medium">
            Téléphone <span className={fieldStatusClassName}>· facultatif</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={30}
            placeholder="+33 6 00 00 00 00"
            aria-invalid={Boolean(errorId("phone"))}
            aria-describedby={errorId("phone")}
            className={fieldClassName}
          />
          {fieldErrors?.phone?.map((error) => (
            <p key={error} id={errorId("phone")} className="text-sm text-[var(--portfolio-error)]">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="contact-organization" className="text-sm font-medium">
            Entreprise ou organisation <span className={fieldStatusClassName}>· facultatif</span>
          </label>
          <input
            id="contact-organization"
            name="organization"
            autoComplete="organization"
            maxLength={100}
            aria-invalid={Boolean(errorId("organization"))}
            aria-describedby={errorId("organization")}
            className={fieldClassName}
          />
          {fieldErrors?.organization?.map((error) => (
            <p key={error} id={errorId("organization")} className="text-sm text-[var(--portfolio-error)]">
              {error}
            </p>
          ))}
        </div>

        <div className="grid gap-2">
          <Select.Root
            name="reason"
            required
            items={contactReasonValues.map((reason) => ({
              label: contactReasonLabels[reason],
              value: reason,
            }))}
          >
            <Select.Label className="text-sm font-medium">
              Objet de la demande <span className={fieldStatusClassName}>· obligatoire</span>
            </Select.Label>
            <Select.Trigger
              id="contact-reason"
              aria-invalid={Boolean(errorId("reason"))}
              aria-describedby={errorId("reason")}
              className="group flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-white/14 bg-black/25 px-4 text-base text-white outline-hidden transition-[border-color,background-color] duration-150 hover:border-white/22 hover:bg-white/[0.04] focus-visible:border-[var(--portfolio-accent)] focus-visible:ring-2 focus-visible:ring-[var(--portfolio-accent)]/25 data-popup-open:border-[var(--portfolio-accent)] aria-[invalid=true]:border-[var(--portfolio-error)]"
            >
              <Select.Value
                placeholder="Sélectionnez un objet"
                className="data-placeholder:text-[var(--portfolio-text-subtle)]"
              />
              <Select.Icon className="text-[var(--portfolio-text-subtle)]">
                <ChevronDown className="size-4 transition-transform duration-150 group-data-popup-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner
                sideOffset={8}
                alignItemWithTrigger={false}
                className="z-[100] outline-hidden"
              >
                <Select.Popup className="min-w-[var(--anchor-width)] origin-[var(--transform-origin)] overflow-hidden rounded-xl border border-white/12 bg-[var(--portfolio-panel)] p-1 text-white shadow-[0_24px_70px_rgba(0,0,0,0.55)] outline-hidden transition-[scale,opacity] duration-100 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0 motion-reduce:transition-none">
                  <Select.List className="grid gap-1">
                    {contactReasonValues.map((reason) => (
                      <Select.Item
                        key={reason}
                        value={reason}
                        className="grid min-h-11 cursor-default grid-cols-[1fr_auto] items-center gap-4 rounded-lg px-3 py-2 text-sm text-white/72 outline-hidden select-none data-highlighted:bg-white/[0.08] data-highlighted:text-white data-selected:bg-[color-mix(in_srgb,var(--portfolio-accent)_14%,transparent)] data-selected:text-[var(--portfolio-accent-hover)]"
                      >
                        <Select.ItemText>{contactReasonLabels[reason]}</Select.ItemText>
                        <Select.ItemIndicator>
                          <Check className="size-4" strokeWidth={2} aria-hidden="true" />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.List>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
          {fieldErrors?.reason?.map((error) => (
            <p key={error} id={errorId("reason")} className="text-sm text-[var(--portfolio-error)]">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="contact-message" className="text-sm font-medium">
          Votre message <span className={fieldStatusClassName}>· obligatoire</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={8}
          maxLength={4_000}
          required
          placeholder="Contexte, besoin, échéance et toute information utile…"
          aria-invalid={Boolean(errorId("message"))}
          aria-describedby={errorId("message")}
          className={`${fieldClassName} resize-y py-3`}
        />
        {fieldErrors?.message?.map((error) => (
          <p key={error} id={errorId("message")} className="text-sm text-[var(--portfolio-error)]">
            {error}
          </p>
        ))}
      </div>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="contact-website">Site internet</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-2 border-t border-white/10 pt-5">
        <ConsentCheckbox
          id="contact-consent"
          name="consent"
          required
          invalid={Boolean(errorId("consent"))}
          describedBy={errorId("consent")}
        >
          J’accepte l’utilisation de mes coordonnées pour traiter et suivre ma demande.
        </ConsentCheckbox>
        {fieldErrors?.consent?.map((error) => (
          <p key={error} id={errorId("consent")} className="text-sm text-[var(--portfolio-error)]">
            {error}
          </p>
        ))}

        <ConsentCheckbox id="contact-newsletter" name="newsletter">
          Je souhaite recevoir par e-mail les nouvelles synthèses de veille.
        </ConsentCheckbox>
      </div>

      <input
        type="hidden"
        name="cf-turnstile-response"
        value={turnstileToken}
      />
      <TurnstileWidget
        ref={turnstileRef}
        action="contact"
        onTokenChange={setTurnstileToken}
        showReadyStatus={false}
      />

      <div
        role={visibleStateMessage && state.status === "error" ? "alert" : "status"}
        aria-live={visibleStateMessage && state.status === "error" ? "assertive" : "polite"}
        className={
          visibleStateMessage
            ? `flex items-start gap-3 rounded-xl border px-4 py-3 text-sm leading-6 ${
                state.status === "error"
                  ? "border-[color-mix(in_srgb,var(--portfolio-error)_28%,transparent)] bg-[color-mix(in_srgb,var(--portfolio-error)_7%,transparent)] text-[var(--portfolio-error)]"
                  : "border-white/10 bg-white/[0.035] text-[var(--portfolio-text-muted)]"
              }`
            : "sr-only"
        }
      >
        {state.status === "error" ? (
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={2} />
        ) : state.status === "success" ? (
          <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[var(--portfolio-accent-hover)]" strokeWidth={2} />
        ) : null}
        <span>{visibleStateMessage}</span>
      </div>

      <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending || isVerifying || isJourneyActive}
          aria-busy={pending || isVerifying}
          aria-describedby="contact-submit-note"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--portfolio-accent)] ps-5 pe-[1.125rem] text-sm font-bold text-black transition-[transform,background-color] duration-150 ease-out hover:bg-[var(--portfolio-accent-hover)] active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-70 motion-reduce:transition-none motion-reduce:active:scale-100"
        >
          Envoyer ma demande
          <ArrowRight aria-hidden="true" className="size-4" />
        </button>
        <p id="contact-submit-note" className="max-w-sm text-xs leading-5 text-[var(--portfolio-text-subtle)]">
          Une nouvelle vérification anti-robot est effectuée à chaque envoi.{" "}
          Réponse depuis contact@yanis-harrat.com.
        </p>
      </div>
      </div>

      {submissionStage !== "idle" ? (
        <SubmissionJourney
          stage={submissionStage}
          message={state.message}
          onReset={handleNewMessage}
        />
      ) : null}
    </form>
  );
}
