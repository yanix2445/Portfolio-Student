"use client";

import {
  CircleAlert,
  LoaderCircle,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
const TURNSTILE_SCRIPT_ID = "cloudflare-turnstile";
const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const VERIFICATION_TIMEOUT_MS = 120_000;

let turnstileScriptPromise: Promise<void> | null = null;

function loadTurnstileScript() {
  if (window.turnstile) {
    return Promise.resolve();
  }

  if (turnstileScriptPromise) {
    return turnstileScriptPromise;
  }

  turnstileScriptPromise = new Promise<void>((resolve, reject) => {
    document.getElementById(TURNSTILE_SCRIPT_ID)?.remove();

    const script = document.createElement("script");
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener(
      "error",
      () => {
        turnstileScriptPromise = null;
        reject(new Error("Turnstile script failed to load"));
      },
      { once: true },
    );
    document.head.append(script);
  });

  return turnstileScriptPromise;
}

type TurnstileWidgetId = string;

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      theme: "dark";
      size: "compact" | "flexible";
      appearance: "execute";
      execution: "execute";
      responseField: false;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "timeout-callback": () => void;
      "error-callback": () => void;
    },
  ) => TurnstileWidgetId;
  execute: (widgetId: TurnstileWidgetId) => void;
  reset: (widgetId: TurnstileWidgetId) => void;
  remove: (widgetId: TurnstileWidgetId) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export type TurnstileWidgetHandle = {
  verify: () => Promise<string>;
  reset: () => void;
};

type TurnstileWidgetProps = {
  action: "contact" | "newsletter";
  onTokenChange: (token: string) => void;
  showReadyStatus?: boolean;
};

type TurnstileStatus =
  | "loading"
  | "ready"
  | "verifying"
  | "verified"
  | "error";

type PendingVerification = {
  resolve: (token: string) => void;
  timeoutId: number;
};

export const TurnstileWidget = forwardRef<
  TurnstileWidgetHandle,
  TurnstileWidgetProps
>(function TurnstileWidget(
  { action, onTokenChange, showReadyStatus = true },
  forwardedRef,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<TurnstileWidgetId | null>(null);
  const pendingVerificationRef = useRef<PendingVerification | null>(null);
  const [status, setStatus] = useState<TurnstileStatus>("loading");
  const [widgetSize, setWidgetSize] = useState<
    "compact" | "flexible" | null
  >(null);
  const siteKey =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
      : TURNSTILE_TEST_SITE_KEY;

  const settleVerification = useCallback((token: string) => {
    const pendingVerification = pendingVerificationRef.current;
    if (!pendingVerification) {
      return;
    }

    window.clearTimeout(pendingVerification.timeoutId);
    pendingVerificationRef.current = null;
    pendingVerification.resolve(token);
  }, []);

  const reset = useCallback(() => {
    settleVerification("");
    onTokenChange("");

    if (widgetIdRef.current && window.turnstile) {
      try {
        window.turnstile.reset(widgetIdRef.current);
        setStatus("ready");
        return;
      } catch {
        setStatus("error");
        return;
      }
    }

    setStatus("error");
  }, [onTokenChange, settleVerification]);

  const verify = useCallback(() => {
    const widgetId = widgetIdRef.current;
    const turnstile = window.turnstile;

    if (!widgetId || !turnstile || pendingVerificationRef.current) {
      setStatus("error");
      onTokenChange("");
      return Promise.resolve("");
    }

    onTokenChange("");
    setStatus("verifying");

    return new Promise<string>((resolve) => {
      const timeoutId = window.setTimeout(() => {
        pendingVerificationRef.current = null;
        setStatus("error");
        onTokenChange("");
        resolve("");
      }, VERIFICATION_TIMEOUT_MS);

      pendingVerificationRef.current = { resolve, timeoutId };

      try {
        turnstile.execute(widgetId);
      } catch {
        window.clearTimeout(timeoutId);
        pendingVerificationRef.current = null;
        setStatus("error");
        onTokenChange("");
        resolve("");
      }
    });
  }, [onTokenChange]);

  useImperativeHandle(forwardedRef, () => ({ verify, reset }), [reset, verify]);

  const failVerification = useCallback(() => {
    setStatus("error");
    onTokenChange("");
    settleVerification("");
  }, [onTokenChange, settleVerification]);

  const renderWidget = useCallback(() => {
    if (
      !siteKey ||
      !widgetSize ||
      !containerRef.current ||
      !window.turnstile ||
      widgetIdRef.current
    ) {
      return;
    }

    try {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action,
        theme: "dark",
        size: widgetSize,
        appearance: "execute",
        execution: "execute",
        responseField: false,
        callback: (token) => {
          setStatus("verified");
          onTokenChange(token);
          settleVerification(token);
        },
        "expired-callback": failVerification,
        "timeout-callback": failVerification,
        "error-callback": failVerification,
      });
      setStatus("ready");
    } catch {
      failVerification();
    }
  }, [
    action,
    failVerification,
    onTokenChange,
    settleVerification,
    siteKey,
    widgetSize,
  ]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const container = containerRef.current;
    const updateWidgetSize = (width: number) => {
      setWidgetSize(width < 300 ? "compact" : "flexible");
    };
    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        updateWidgetSize(entry.contentRect.width);
      }
    });

    updateWidgetSize(container.getBoundingClientRect().width);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!widgetSize) {
      return;
    }

    let cancelled = false;
    void loadTurnstileScript()
      .then(() => {
        if (!cancelled) {
          renderWidget();
        }
      })
      .catch(() => {
        if (!cancelled) {
          failVerification();
        }
      });

    return () => {
      cancelled = true;
    };
  }, [failVerification, renderWidget, widgetSize]);

  useEffect(() => {
    return () => {
      settleVerification("");
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [settleVerification]);

  useEffect(() => {
    if (status !== "loading") {
      return;
    }

    const timeout = window.setTimeout(() => {
      if (!widgetIdRef.current) {
        failVerification();
      }
    }, 8_000);

    return () => window.clearTimeout(timeout);
  }, [failVerification, status]);

  const retry = () => {
    settleVerification("");
    onTokenChange("");
    setStatus("loading");

    if (window.turnstile) {
      if (widgetIdRef.current) {
        try {
          window.turnstile.reset(widgetIdRef.current);
          setStatus("ready");
          return;
        } catch {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
      }

      window.requestAnimationFrame(renderWidget);
      return;
    }

    turnstileScriptPromise = null;
    void loadTurnstileScript()
      .then(renderWidget)
      .catch(failVerification);
  };

  if (!siteKey) {
    return (
      <p role="alert" className="text-sm text-[var(--portfolio-error)]">
        La vérification anti-robot est momentanément indisponible.
      </p>
    );
  }

  const statusContent = {
    loading: {
      icon: (
        <LoaderCircle
          aria-hidden="true"
          className="size-4 animate-spin motion-reduce:animate-none"
        />
      ),
      message: "Chargement de la protection anti-robot…",
    },
    ready: {
      icon: (
        <ShieldCheck
          aria-hidden="true"
          className="size-4 text-[var(--portfolio-accent-hover)]"
        />
      ),
      message: "Protection anti-robot prête. Elle se déclenchera à l’envoi.",
    },
    verifying: {
      icon: (
        <LoaderCircle
          aria-hidden="true"
          className="size-4 animate-spin motion-reduce:animate-none"
        />
      ),
      message: "Vérification anti-robot en cours…",
    },
    verified: {
      icon: (
        <ShieldCheck
          aria-hidden="true"
          className="size-4 text-[var(--portfolio-accent-hover)]"
        />
      ),
      message: "Vérification terminée. Envoi de votre demande…",
    },
  } as const;

  return (
    <div
      className={
        status === "ready" && !showReadyStatus
          ? "invisible absolute inset-x-0 top-0"
          : "grid gap-3"
      }
    >
      <div ref={containerRef} className="flex w-full items-start justify-start" />

      {status === "ready" && !showReadyStatus ? null : status !== "error" ? (
        <div
          role="status"
          aria-live="polite"
          className="flex min-h-12 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-4 text-sm text-[var(--portfolio-text-muted)]"
        >
          {statusContent[status].icon}
          <span>{statusContent[status].message}</span>
        </div>
      ) : (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-[color-mix(in_srgb,var(--portfolio-error)_28%,transparent)] bg-[color-mix(in_srgb,var(--portfolio-error)_7%,transparent)] p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex min-w-0 items-start gap-3 text-sm leading-6 text-[var(--portfolio-error)]">
            <CircleAlert
              aria-hidden="true"
              className="mt-1 size-4 shrink-0"
              strokeWidth={2}
            />
            <p>
              La protection anti-robot n’a pas démarré. Vérifiez votre connexion
              ou relancez-la.
            </p>
          </div>
          <button
            type="button"
            onClick={retry}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-white/14 bg-white/[0.045] px-4 text-sm font-semibold text-white transition-[transform,border-color,background-color] duration-150 hover:border-white/24 hover:bg-white/[0.08] active:scale-[0.96] motion-reduce:transition-none motion-reduce:active:scale-100"
          >
            <RotateCcw aria-hidden="true" className="size-4" />
            Relancer la vérification
          </button>
        </div>
      )}
    </div>
  );
});
