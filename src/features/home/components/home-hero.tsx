import Image from "next/image";
import { ArrowDown, ArrowUpRight, CalendarDays, Download, Mail } from "lucide-react";
import { siteConfig } from "@/shared/config/site.config";

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden border-b border-white/10">
      <Image
        src="/images/portfolio-hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover object-[68%_center] sm:object-[66%_center] lg:object-center"
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(0,0,0,0.97)_0%,rgba(0,0,0,0.86)_38%,rgba(0,0,0,0.22)_72%,rgba(0,0,0,0.46)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.16),transparent_55%,#070707_100%)]" />
      <div className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-30" />

      <div className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-[90rem] items-end px-5 py-14 sm:px-8 sm:py-20 lg:items-center lg:px-12">
        <div className="max-w-4xl">
          <p className="reveal mb-5 flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.2em] text-brand uppercase sm:text-sm">
            <span className="size-2 animate-pulse rounded-full bg-brand" aria-hidden="true" />
            Disponible dès maintenant · Alternance ou CDI
          </p>

          <h1 className="reveal reveal-delay-1 text-[clamp(3.2rem,7.5vw,7.5rem)] font-semibold leading-[0.86] tracking-[-0.07em] text-balance">
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
              className="inline-flex min-h-12 items-center gap-3 bg-brand px-5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-[#ffad61]"
            >
              Voir mes réalisations
              <ArrowDown aria-hidden="true" className="size-4" />
            </a>
            <a
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center gap-3 border border-white/25 bg-black/25 px-5 text-sm font-semibold text-white backdrop-blur-sm hover:border-brand"
            >
              <CalendarDays aria-hidden="true" className="size-4" />
              Prendre rendez-vous
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex min-h-12 items-center gap-3 px-4 text-sm font-semibold text-white/76 hover:text-brand"
            >
              <Mail aria-hidden="true" className="size-4" />
              Me contacter
            </a>
            <a
              href={siteConfig.cvUrl}
              download="CV-Yanis-Harrat-Technicien-Systemes-Reseaux.pdf"
              className="inline-flex min-h-12 items-center gap-3 px-4 text-sm font-semibold text-white/76 hover:text-brand"
            >
              <Download aria-hidden="true" className="size-4" />
              Télécharger mon CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
