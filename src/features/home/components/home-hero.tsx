import { ArrowDown, Download } from "lucide-react";
import { siteConfig } from "@/shared/config/site.config";
import { HomeProfilePortrait } from "./home-profile-portrait";

export function HomeHero() {
  return (
    <section id="accueil" className="px-4 pb-20 pt-12 sm:px-6 lg:pt-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="flex items-center gap-3 text-sm font-semibold text-[var(--home-accent-hover)]">
            <span className="size-2 rounded-full bg-[var(--home-accent)] shadow-[0_0_0_5px_rgba(255,122,0,0.14)]" aria-hidden="true" />
            Disponible dès maintenant · alternance ou CDI
          </p>
          <h1 className="mt-7 max-w-4xl text-[clamp(2.65rem,5.5vw,5.25rem)] leading-[0.96] font-semibold tracking-[-0.04em] text-balance">
            Technicien support systèmes et réseaux, prêt à renforcer votre équipe.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-[var(--home-text-muted)] text-pretty sm:text-lg sm:leading-8">
            Je suis Yanis Harrat, étudiant en BTS SIO SISR. J’interviens sur le support, l’administration et la fiabilisation des environnements informatiques.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#experiences" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[var(--home-accent)] px-5 text-sm font-bold text-black transition-transform duration-150 ease-out active:scale-[0.97]">
              Voir mes preuves <ArrowDown className="size-4" aria-hidden="true" />
            </a>
            <a
              href={siteConfig.cvUrl}
              download="CV-Yanis-Harrat-Technicien-Systemes-Reseaux.pdf"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-white/[0.07] px-5 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/[0.1]"
            >
              <Download className="size-4" aria-hidden="true" /> Télécharger mon CV
            </a>
          </div>
          <p className="mt-5 text-sm text-[var(--home-text-subtle)]">Paris et toute l’Île-de-France · Présentiel · Hybride · Télétravail</p>
        </div>

        <HomeProfilePortrait />
      </div>
    </section>
  );
}
