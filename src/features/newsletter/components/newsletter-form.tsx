"use client";

import { useActionState } from "react";
import { ArrowRight, LoaderCircle, Mail } from "lucide-react";
import {
  initialNewsletterState,
  type NewsletterAction,
  type NewsletterState,
} from "../newsletter.types";

type NewsletterFormProps = {
  action: NewsletterAction;
  initialState?: NewsletterState;
};

export function NewsletterForm({
  action,
  initialState = initialNewsletterState,
}: NewsletterFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const emailErrorId = state.fieldErrors?.email ? "newsletter-email-error" : undefined;
  const consentErrorId = state.fieldErrors?.consent ? "newsletter-consent-error" : undefined;

  return (
    <form action={formAction} className="grid gap-5" noValidate>
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
            className="min-h-13 w-full border border-white/16 bg-black/20 pr-4 pl-11 text-base text-white placeholder:text-white/30 focus:border-brand"
          />
        </div>
        {state.fieldErrors?.email?.map((error) => (
          <p key={error} id={emailErrorId} className="text-sm text-[#ffb37a]">
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
            name="consent"
            type="checkbox"
            required
            aria-invalid={Boolean(consentErrorId)}
            aria-describedby={consentErrorId}
            className="mt-1 size-4 shrink-0 accent-[#ff8a1f]"
          />
          <span>
            J’accepte de recevoir par e-mail les nouvelles synthèses de veille. Je pourrai me désinscrire à tout moment.
          </span>
        </label>
        {state.fieldErrors?.consent?.map((error) => (
          <p key={error} id={consentErrorId} className="text-sm text-[#ffb37a]">
            {error}
          </p>
        ))}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-fit items-center justify-center gap-2 bg-brand px-5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-[#ffad61] disabled:cursor-wait disabled:opacity-65"
      >
        {pending ? (
          <>
            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
            Inscription en cours…
          </>
        ) : (
          <>
            Recevoir les synthèses
            <ArrowRight aria-hidden="true" className="size-4" />
          </>
        )}
      </button>

      <p
        role={state.status === "error" ? "alert" : "status"}
        aria-live="polite"
        className={state.status === "error" ? "text-sm text-[#ffb37a]" : "text-sm text-white/58"}
      >
        {state.message}
      </p>
    </form>
  );
}
