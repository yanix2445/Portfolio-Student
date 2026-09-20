import Image from "next/image";
import { ArrowDown, ArrowUpRight, CalendarDays, Download, Mail } from "lucide-react";
import { siteConfig } from "@/shared/config/site.config";

export function HomeHero() {
  return (
    <section className="px-3 pt-3 sm:px-5">
      <div className="relative isolate mx-auto min-h-[calc(100svh-6.5rem)] max-w-[96rem] overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[var(--shadow-soft)]">
        <Image
          src="/images/portfolio-hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-30 object-cover object-[70%_center] sm:object-[66%_center] lg:object-center"
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(7,5,4,0.98)_0%,rgba(7,5,4,0.9)_38%,rgba(7,5,4,0.18)_73%,rgba(7,5,4,0.5)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(16,9,5,0.05),transparent_45%,rgba(8,6,5,0.94)_100%)]" />
        <div className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-20" />

        <div className="mx-auto flex min-h-[calc(100svh-6.5rem)] w-full max-w-[90rem] items-end px-5 py-14 sm:px-9 sm:py-20 lg:items-center lg:px-12">
          <div className="max-w-4xl">
          <p className="reveal mb-5 flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.2em] text-brand uppercase sm:text-sm">
            <span className="size-2 animate-pulse rounded-full bg-brand" aria-hidden="true" />
            Disponible dès maintenant · Alternance ou CDI
          </p>

          <h1 className="reveal reveal-delay-1 text-[clamp(3rem,7vw,7rem)] leading-[0.86] font-semibold tracking-[-0.07em] text-balance">
            Technicien support
            {" "}
            <span className="block font-light text-white/62">
              systèmes & réseaux.
            </span>
          </h1>

          <p className="reveal reveal-delay-2 mt-7 max-w-2xl border-l border-brand pl-5 text-base leading-7 text-white/72 sm:pl-7 sm:text-lg sm:leading-8">
            Je suis Yanis Harrat, étudiant en BTS SIO SISR. J’interviens sur
            le support, l’administration et la fiabilisation des
            environnements informatiques.
          </p>

          <div className="reveal reveal-delay-3 mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs tracking-[0.08em] text-white/58 uppercase">
            <span>Paris et toute l’Île-de-France</span>
            <span>Présentiel · Hybride · Télétravail</span>
          </div>

          <div className="reveal reveal-delay-3 mt-9 flex flex-wrap gap-3">
            <a
              href="#e5"
              className="inline-flex min-h-12 items-center gap-3 rounded-xl bg-brand px-5 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/15 transition-all hover:-translate-y-0.5 hover:bg-[#ffad61]"
            >
              Voir mes réalisations
              <ArrowDown aria-hidden="true" className="size-4" />
            </a>
            <a
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center gap-3 rounded-xl border border-white/25 bg-black/25 px-5 text-sm font-semibold text-white backdrop-blur-sm hover:border-brand"
            >
              <CalendarDays aria-hidden="true" className="size-4" />
              Prendre rendez-vous
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex min-h-12 items-center gap-3 rounded-xl px-4 text-sm font-semibold text-white/76 hover:bg-white/5 hover:text-brand"
            >
              <Mail aria-hidden="true" className="size-4" />
              Me contacter
            </a>
            <a
              href={siteConfig.cvUrl}
              download="CV-Yanis-Harrat-Technicien-Systemes-Reseaux.pdf"
              className="inline-flex min-h-12 items-center gap-3 rounded-xl px-4 text-sm font-semibold text-white/76 hover:bg-white/5 hover:text-brand"
            >
              <Download aria-hidden="true" className="size-4" />
              Télécharger mon CV
            </a>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
