import {
  CalendarDays,
  Clock3,
  Mail,
  MessageSquareText,
  PhoneCall,
  Video,
} from "lucide-react";
import {
  GithubBrandIcon,
  LinkedinBrandIcon,
} from "@/shared/components/brand-icons";
import { siteConfig } from "@/shared/config/site.config";
import { ContactForm } from "./contact-form";
import { submitContact } from "../actions/submit-contact.action";

export function ContactPage() {
  return (
    <main className="portfolio-surface min-h-screen px-4 py-16 sm:px-6 sm:py-24">
      <div className="portfolio-shell">
        <header className="grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20 lg:pb-16">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-[var(--portfolio-accent-hover)] uppercase">
              Contact professionnel
            </p>
            <h1 className="mt-5 max-w-5xl text-5xl font-semibold tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">
              Un échange clair commence par le bon contexte.
            </h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-[var(--portfolio-text-muted)] text-pretty lg:pb-2">
            Opportunité, mission technique, collaboration ou question sur mon parcours : présentez votre besoin et je vous répondrai personnellement.
          </p>
        </header>

        <div className="grid gap-8 py-12 lg:grid-cols-[minmax(17rem,0.58fr)_minmax(0,1.42fr)] lg:items-start lg:gap-10 lg:py-16">
          <aside className="grid min-w-0 gap-5 lg:sticky lg:top-28">
            <section className="rounded-2xl border border-white/10 bg-[var(--portfolio-panel)] p-6">
              <CalendarDays className="size-5 text-[var(--portfolio-accent-hover)]" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-semibold tracking-[-0.025em]">
                Choisir directement un créneau
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--portfolio-text-muted)]">
                Les disponibilités de rappel, d’appel audio et de visioconférence sont gérées dans mon calendrier Cal.com.
              </p>
              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--portfolio-accent)] ps-4 pe-3.5 text-sm font-bold text-black transition-[transform,background-color] duration-150 ease-out hover:bg-[var(--portfolio-accent-hover)] active:scale-[0.96] motion-reduce:transition-none motion-reduce:active:scale-100"
              >
                Voir mes disponibilités
                <Clock3 className="size-4" strokeWidth={2.5} aria-hidden="true" />
              </a>
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-5 text-xs text-[var(--portfolio-text-subtle)]">
                <span className="flex items-center gap-2"><PhoneCall className="size-4" strokeWidth={1.5} aria-hidden="true" /> Audio</span>
                <span className="flex items-center gap-2"><Video className="size-4" strokeWidth={1.5} aria-hidden="true" /> Visioconférence</span>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-[var(--portfolio-panel)] p-6">
              <MessageSquareText className="size-5 text-[var(--portfolio-accent-hover)]" aria-hidden="true" />
              <h2 className="mt-5 text-xl font-semibold">Autres moyens de contact</h2>
              <div className="mt-4 grid gap-1 text-sm">
                <a href={`mailto:${siteConfig.email}`} className="-mx-2 inline-flex min-h-11 items-center gap-3 rounded-lg px-2 text-[var(--portfolio-text-muted)] transition-[color,background-color] duration-150 hover:bg-white/[0.035] hover:text-white">
                  <Mail className="size-4" strokeWidth={1.5} aria-hidden="true" /> {siteConfig.email}
                </a>
                <a href={siteConfig.linkedInUrl} target="_blank" rel="noreferrer" className="-mx-2 inline-flex min-h-11 items-center gap-3 rounded-lg px-2 text-[var(--portfolio-text-muted)] transition-[color,background-color] duration-150 hover:bg-white/[0.035] hover:text-white">
                  <LinkedinBrandIcon className="size-4" aria-hidden="true" /> LinkedIn
                </a>
                <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer" className="-mx-2 inline-flex min-h-11 items-center gap-3 rounded-lg px-2 text-[var(--portfolio-text-muted)] transition-[color,background-color] duration-150 hover:bg-white/[0.035] hover:text-white">
                  <GithubBrandIcon className="size-4" aria-hidden="true" /> GitHub
                </a>
              </div>
            </section>
          </aside>

          <ContactForm action={submitContact} />
        </div>
      </div>
    </main>
  );
}
