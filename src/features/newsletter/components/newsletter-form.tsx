"use client";

import { useRef, useState, useTransition } from "react";
import {
  ArrowRight,
  CircleCheck,
  LoaderCircle,
  Mail,
  Mailbox,
  RotateCcw,
} from "lucide-react";
import contactStyles from "@/features/contact/components/contact-form.module.css";
import {
  TurnstileWidget,
  type TurnstileWidgetHandle,
} from "@/shared/components/turnstile-widget";
import { cn } from "@/shared/lib/cn";
import { newsletterSchema } from "../newsletter.schema";
import {
  initialNewsletterState,
  type NewsletterAction,
  type NewsletterFieldErrors,
  type NewsletterState,
} from "../newsletter.types";
import styles from "./newsletter-form.module.css";

type NewsletterFormProps = {
  action: NewsletterAction;
  initialState?: NewsletterState;
  appearance?: "default" | "home";
};

type SubmissionStage =
  | "idle"
  | "verifying"
  | "preparing"
  | "delivering"
  | "success";

const wait = (duration: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, duration));

const journeyCopy = {
  verifying: {
    title: "Vérification sécurisée",
    description: "Je vérifie que l’inscription peut être transmise.",
  },
  preparing: {
    title: "Votre inscription est prête",
    description: "L’enveloppe se ferme avant son envoi.",
  },
  delivering: {
    title: "Votre inscription est en route",
    description: "Elle rejoint la liste des nouvelles synthèses.",
  },
  success: {
    title: "Inscription confirmée",
    description: "Vous recevrez la prochaine synthèse dès sa publication.",
  },
} as const;

type NewsletterJourneyProps = {
  stage: Exclude<SubmissionStage, "idle">;
  message: string;
  onReset: () => void;
};

function NewsletterJourney({
  stage,
  message,
  onReset,
}: NewsletterJourneyProps) {
  const copy = journeyCopy[stage];

  return (
    <section
      className={`${contactStyles.deliveryScene} ${styles.compactScene}`}
      data-stage={stage}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className={`${contactStyles.deliverySceneInner} ${styles.compactInner}`}>
        <div
          className={`${contactStyles.deliveryVisual} ${styles.compactVisual}`}
          aria-hidden="true"
        >
          {stage === "verifying" ? (
            <span className={`${contactStyles.verificationSpinner} ${styles.compactSpinner}`}>
              <LoaderCircle />
            </span>
          ) : stage === "success" ? (
            <span className={`${contactStyles.finalCheck} ${styles.compactCheck}`}>
              <CircleCheck />
            </span>
          ) : (
            <div className={`${contactStyles.deliveryRoute} ${styles.compactRoute}`}>
              <span className={contactStyles.routeLine} />
              <span className={`${contactStyles.envelope} ${styles.compactEnvelope}`}>
                <span className={contactStyles.envelopeBack} />
                <span className={`${contactStyles.letter} ${styles.compactLetter}`} />
                <span className={contactStyles.envelopeFront} />
                <span className={`${contactStyles.envelopeFlap} ${styles.compactFlap}`} />
              </span>
              <span className={`${contactStyles.mailbox} ${styles.compactMailbox}`}>
                <Mailbox />
              </span>
            </div>
          )}
        </div>

        <div className={`${contactStyles.deliveryCopy} ${styles.compactCopy}`}>
          <p className={contactStyles.deliveryLabel}>
            {stage === "success" ? "Inscription validée" : "Inscription en cours"}
          </p>
          <h3>{copy.title}</h3>
          <p>{stage === "success" && message ? message : copy.description}</p>
        </div>

        {stage === "success" ? (
          <button
            type="button"
            onClick={onReset}
            className={`${contactStyles.resetButton} ${styles.compactReset}`}
          >
            <RotateCcw aria-hidden="true" />
            Inscrire une autre adresse
          </button>
        ) : null}
      </div>
    </section>
  );
}

function focusFirstInvalidField(errors?: NewsletterFieldErrors) {
  const targetId = errors?.email?.length
    ? "newsletter-email"
    : errors?.consent?.length
      ? "newsletter-consent"
      : undefined;

  if (targetId) {
    window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.focus();
    });
  }
}

export function NewsletterForm({
  action,
  initialState = initialNewsletterState,
  appearance = "default",
}: NewsletterFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);
  const submissionLockRef = useRef(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [state, setState] = useState<NewsletterState>(initialState);
  const [submissionStage, setSubmissionStage] = useState<SubmissionStage>(
    initialState.status === "success" ? "success" : "idle",
  );
  const [pending, startSubmission] = useTransition();

  const isJourneyActive = submissionStage !== "idle";
  const isVerifying = submissionStage === "verifying";
  const emailErrorId = state.fieldErrors?.email
    ? "newsletter-email-error"
    : undefined;
  const consentErrorId = state.fieldErrors?.consent
    ? "newsletter-consent-error"
    : undefined;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submissionLockRef.current) {
      return;
    }

    submissionLockRef.current = true;
    const formData = new FormData(event.currentTarget);
    const turnstileVerification =
      turnstileRef.current?.verify() ?? Promise.resolve("");
    const parsed = newsletterSchema.safeParse({
      email: formData.get("email"),
      consent: formData.get("consent"),
      website: formData.get("website"),
    });

    if (!parsed.success) {
      void turnstileVerification.finally(() => {
        turnstileRef.current?.reset();
      });
      const fields = parsed.error.flatten().fieldErrors;
      const fieldErrors: NewsletterFieldErrors = {
        email: fields.email,
        consent: fields.consent,
      };
      setState({
        status: "error",
        message: "Vérifiez les informations indiquées.",
        fieldErrors,
      });
      submissionLockRef.current = false;
      focusFirstInvalidField(fieldErrors);
      return;
    }

    setState(initialNewsletterState);
    setSubmissionStage("verifying");

    const [token] = await Promise.all([turnstileVerification, wait(480)]);

    if (!token) {
      setSubmissionStage("idle");
      submissionLockRef.current = false;
      return;
    }

    formData.set("cf-turnstile-response", token);
    setSubmissionStage("preparing");
    const preparationStartedAt = performance.now();

    startSubmission(async () => {
      let nextState: NewsletterState;

      try {
        nextState = await action(initialNewsletterState, formData);
      } catch {
        nextState = {
          status: "error",
          message:
            "L’inscription est momentanément indisponible. Réessayez dans quelques instants.",
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
        1_050 - (performance.now() - preparationStartedAt),
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

  const handleReset = () => {
    submissionLockRef.current = false;
    setState(initialNewsletterState);
    setSubmissionStage("idle");
    window.requestAnimationFrame(() => {
      document.getElementById("newsletter-email")?.focus();
    });
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onChange={(event) => {
        const target = event.target;

        if (!(target instanceof HTMLInputElement)) {
          return;
        }

        const fieldName = target.name as keyof NewsletterFieldErrors;
        if (state.fieldErrors?.[fieldName]) {
          setState((current) => ({
            ...current,
            fieldErrors: {
              ...current.fieldErrors,
              [fieldName]: undefined,
            },
          }));
        }
      }}
      aria-busy={isJourneyActive && submissionStage !== "success"}
      data-stage={submissionStage}
      className={styles.formShell}
      noValidate
    >
      <div
        className={`${styles.formContent} grid gap-5`}
        aria-hidden={isJourneyActive || undefined}
        inert={isJourneyActive || undefined}
      >
        <div className="grid gap-2">
          <label htmlFor="newsletter-email" className="text-sm font-medium text-white/82">
            Adresse e-mail
          </label>
          <div className="relative">
            <Mail
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/38"
            />
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              aria-invalid={Boolean(emailErrorId)}
              aria-describedby={emailErrorId}
              placeholder="vous@exemple.fr"
              className={cn(
                "min-h-13 w-full border border-white/16 bg-black/20 pr-4 pl-11 text-base text-white focus:border-brand",
                appearance === "home" ? "rounded-xl placeholder:text-white/55" : "placeholder:text-white/30",
              )}
            />
          </div>
          {state.fieldErrors?.email?.map((error) => (
            <p key={error} id={emailErrorId} className="text-sm text-[var(--portfolio-error)]">
              {error}
            </p>
          ))}
        </div>

        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="newsletter-website">Site internet</label>
          <input
            id="newsletter-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid gap-2">
          <label className="flex items-start gap-3 text-sm leading-6 text-white/58">
            <input
              id="newsletter-consent"
              name="consent"
              type="checkbox"
              required
              aria-invalid={Boolean(consentErrorId)}
              aria-describedby={consentErrorId}
              className="mt-1 size-4 shrink-0 accent-[var(--portfolio-accent-hover)]"
            />
            <span>
              J’accepte de recevoir par e-mail les nouvelles synthèses de veille. Je pourrai me désinscrire à tout moment.
            </span>
          </label>
          {state.fieldErrors?.consent?.map((error) => (
            <p key={error} id={consentErrorId} className="text-sm text-[var(--portfolio-error)]">
              {error}
            </p>
          ))}
        </div>

        <input
          type="hidden"
          name="cf-turnstile-response"
          value={turnstileToken}
        />
        <TurnstileWidget
          ref={turnstileRef}
          action="newsletter"
          onTokenChange={setTurnstileToken}
          showReadyStatus={false}
        />

        <button
          type="submit"
          disabled={pending || isVerifying || isJourneyActive}
          className={cn(
            "inline-flex min-h-12 w-fit items-center justify-center gap-2 bg-brand px-5 text-sm font-semibold text-brand-foreground transition-[transform,background-color] duration-150 ease-out hover:bg-[var(--portfolio-accent-hover)] active:scale-[0.97] disabled:cursor-wait disabled:opacity-65 motion-reduce:transition-none motion-reduce:active:scale-100",
            appearance === "home" && "rounded-xl",
          )}
        >
          Recevoir les synthèses
          <ArrowRight aria-hidden="true" className="size-4" />
        </button>

        <p
          role={state.message && state.status === "error" ? "alert" : "status"}
          aria-live="polite"
          className={
            state.message
              ? state.status === "error"
                ? "text-sm text-[var(--portfolio-error)]"
                : "text-sm text-white/58"
              : "sr-only"
          }
        >
          {state.message}
        </p>
      </div>

      {submissionStage !== "idle" ? (
        <NewsletterJourney
          stage={submissionStage}
          message={state.message}
          onReset={handleReset}
        />
      ) : null}
    </form>
  );
}
