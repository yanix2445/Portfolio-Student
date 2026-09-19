import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Mail,
  Network,
  Server,
  ShieldCheck,
} from "lucide-react";

const expertiseAreas = [
  {
    icon: Server,
    title: "Systèmes",
    description:
      "Administration, virtualisation et maintien en condition opérationnelle.",
  },
  {
    icon: Network,
    title: "Réseaux",
    description:
      "Conception, configuration et supervision d’infrastructures connectées.",
  },
  {
    icon: ShieldCheck,
    title: "Cybersécurité",
    description:
      "Sécurisation des accès, analyse des risques et bonnes pratiques.",
  },
] as const;

const portfolioSections = [
  {
    index: "01",
    eyebrow: "Expérimenter",
    title: "Projets",
    description:
      "Des réalisations personnelles et étudiantes, avec leur contexte, leur architecture et les choix techniques effectués.",
  },
  {
    index: "02",
    eyebrow: "Démontrer",
    title: "Épreuves E5 & E6",
    description:
      "Les situations professionnelles préparées pour le BTS SIO, documentées de la méthode jusqu’aux résultats.",
  },
  {
    index: "03",
    eyebrow: "Comprendre",
    title: "Veille technologique",
    description:
      "Une sélection structurée de ressources pour suivre les évolutions des systèmes, des réseaux et de la sécurité.",
  },
] as const;

export function PortfolioLanding() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#070707] text-[#f7f3ec]">
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
        <Image
          src="/images/portfolio-hero.webp"
          alt=""
          fill
          fetchPriority="high"
          sizes="100vw"
          className="-z-30 object-cover object-[68%_center] sm:object-[66%_center] lg:object-center"
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.81)_32%,rgba(0,0,0,0.2)_66%,rgba(0,0,0,0.34)_100%)] max-lg:bg-[linear-gradient(90deg,rgba(0,0,0,0.93)_0%,rgba(0,0,0,0.68)_54%,rgba(0,0,0,0.3)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.22)_0%,transparent_42%,rgba(7,7,7,0.94)_100%)]" />
        <div className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-35" />

        <header className="mx-auto flex w-full max-w-[90rem] items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
          <a
            href="#accueil"
            className="reveal flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff8a1f]"
            aria-label="Retour en haut de la page"
          >
            <span className="grid size-10 place-items-center border border-white/25 bg-black/20 text-sm font-bold tracking-[-0.04em] backdrop-blur-sm">
              YH
            </span>
            <span className="hidden text-sm font-medium tracking-[0.16em] text-white/82 uppercase sm:block">
              Yanis Harrat
            </span>
          </a>

          <nav
            aria-label="Navigation principale"
            className="reveal reveal-delay-1 hidden items-center gap-8 text-sm text-white/68 lg:flex"
          >
            <a className="nav-link" href="#profil">
              Profil
            </a>
            <a className="nav-link" href="#expertise">
              Compétences
            </a>
            <a className="nav-link" href="#portfolio">
              Portfolio
            </a>
          </nav>

          <a
            href="https://cal.com/yanis-harrat/rdv-30min"
            target="_blank"
            rel="noreferrer"
            aria-label="Prendre rendez-vous"
            className="reveal reveal-delay-2 inline-flex min-h-11 items-center gap-2 border border-white/25 bg-black/20 px-4 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-[#ff8a1f] hover:bg-[#ff8a1f] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff8a1f]"
          >
            <CalendarDays aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">Prendre rendez-vous</span>
            <span className="sm:hidden">Rendez-vous</span>
          </a>
        </header>

        <div
          id="accueil"
          className="mx-auto flex w-full max-w-[90rem] flex-1 items-end px-5 pb-12 pt-20 sm:px-8 sm:pb-16 lg:items-center lg:px-12 lg:pb-20 lg:pt-24"
        >
          <div className="max-w-3xl">
            <p className="reveal reveal-delay-1 mb-5 flex items-center gap-3 font-mono text-xs font-medium tracking-[0.22em] text-[#ff9b3d] uppercase sm:text-sm">
              <span className="h-px w-8 bg-[#ff8a1f]" aria-hidden="true" />
              Portfolio · BTS SIO SISR
            </p>

            <h1 className="reveal reveal-delay-2 text-[clamp(3.35rem,8.1vw,7.8rem)] font-semibold leading-[0.84] tracking-[-0.072em] text-balance">
              Infrastructures
              <span className="block font-light text-white/58">pensées pour durer.</span>
            </h1>

            <div className="reveal reveal-delay-3 mt-8 grid max-w-2xl gap-8 border-l border-[#ff8a1f]/70 pl-5 sm:grid-cols-[1fr_auto] sm:items-end sm:pl-7">
              <p className="max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                Je suis Yanis, étudiant en BTS SIO option SISR. Je documente
                ici mon parcours, mes compétences et les projets qui forgent
                ma pratique des systèmes, des réseaux et de la cybersécurité.
              </p>

              <a
                href="#profil"
                className="group inline-flex min-h-12 w-fit items-center gap-3 bg-[#ff8a1f] px-5 text-sm font-semibold text-[#111] transition-colors hover:bg-[#ffad61] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Découvrir
                <ArrowDown
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-y-1"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between border-t border-white/12 px-5 py-4 font-mono text-[0.72rem] tracking-[0.16em] text-white/48 uppercase sm:px-8 lg:px-12">
          <span>Étudiant administrateur systèmes & réseaux</span>
          <span className="hidden sm:block">France · 2026</span>
        </div>
      </section>

      <section
        id="profil"
        className="relative border-b border-white/10 px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
      >
        <div className="mx-auto grid max-w-[90rem] gap-16 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24">
          <div>
            <p className="section-label">À propos</p>
            <p className="mt-7 max-w-sm text-base leading-7 text-white/52">
              Curieux, méthodique et orienté terrain, j’aime comprendre ce qui
              se passe derrière l’écran et rendre la technique lisible.
            </p>
          </div>

          <div>
            <h2 className="max-w-4xl text-4xl font-medium leading-[1.05] tracking-[-0.045em] text-balance sm:text-6xl lg:text-7xl">
              Construire une infrastructure, c’est relier la technique aux
              <span className="text-[#ff8a1f]"> usages réels.</span>
            </h2>
            <div className="mt-10 grid gap-6 border-t border-white/12 pt-8 text-base leading-7 text-white/62 sm:grid-cols-2">
              <p>
                Ma formation SISR me permet d’aborder un service dans son
                ensemble : réseau, systèmes, disponibilité, sécurité et
                documentation.
              </p>
              <p>
                Ce portfolio rassemble les preuves de ce parcours et montre
                autant le résultat que la démarche utilisée pour y parvenir.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="expertise"
        className="border-b border-white/10 bg-[#0b0b0b] px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
      >
        <div className="mx-auto max-w-[90rem]">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="section-label">Compétences</p>
              <h2 className="mt-6 max-w-2xl text-4xl font-medium tracking-[-0.045em] sm:text-6xl">
                Trois axes, une même exigence.
              </h2>
            </div>
            <p className="max-w-sm text-base leading-7 text-white/52">
              Des compétences techniques développées en cours, en laboratoire
              et à travers mes projets personnels.
            </p>
          </div>

          <div className="mt-14 grid border-l border-t border-white/12 md:grid-cols-3">
            {expertiseAreas.map((area, index) => {
              const Icon = area.icon;

              return (
                <article
                  key={area.title}
                  className="group min-h-72 border-b border-r border-white/12 p-7 transition-colors hover:bg-[#ff8a1f] sm:p-9"
                >
                  <div className="flex items-start justify-between">
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="size-8 text-[#ff8a1f] transition-colors group-hover:text-black"
                    />
                    <span className="font-mono text-xs text-white/35 transition-colors group-hover:text-black/55">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-20 text-2xl font-medium tracking-[-0.03em] transition-colors group-hover:text-black">
                    {area.title}
                  </h3>
                  <p className="mt-3 max-w-xs leading-7 text-white/50 transition-colors group-hover:text-black/70">
                    {area.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="portfolio" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto max-w-[90rem]">
          <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr]">
            <div>
              <p className="section-label">À explorer</p>
              <h2 className="mt-6 max-w-md text-4xl font-medium tracking-[-0.045em] sm:text-6xl">
                Le travail, sans raccourci.
              </h2>
            </div>

            <div className="border-t border-white/14">
              {portfolioSections.map((section) => (
                <article
                  key={section.title}
                  className="group grid gap-5 border-b border-white/14 py-8 sm:grid-cols-[4rem_0.75fr_1.25fr] sm:items-start sm:gap-8 sm:py-10"
                >
                  <span className="font-mono text-xs text-[#ff8a1f]">
                    {section.index}
                  </span>
                  <div>
                    <p className="font-mono text-xs tracking-[0.14em] text-white/38 uppercase">
                      {section.eyebrow}
                    </p>
                    <h3 className="mt-2 text-2xl font-medium tracking-[-0.025em] sm:text-3xl">
                      {section.title}
                    </h3>
                  </div>
                  <p className="max-w-xl leading-7 text-white/52">
                    {section.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-5 sm:px-8 sm:pb-8 lg:px-12 lg:pb-12">
        <div className="mx-auto max-w-[90rem] bg-[#ff8a1f] px-6 py-12 text-[#111] sm:px-10 sm:py-16 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="font-mono text-xs font-medium tracking-[0.18em] uppercase">
                Entrons en contact
              </p>
              <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-balance sm:text-6xl lg:text-7xl">
                Une question, un projet ou simplement envie d’échanger ?
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href="https://cal.com/yanis-harrat/rdv-30min"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-12 items-center justify-between gap-8 bg-[#111] px-5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              >
                Réserver 30 minutes
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
              <a
                href="mailto:contact@yanis-harrat.com"
                className="inline-flex min-h-12 items-center justify-center gap-3 border border-black/35 px-5 text-sm font-semibold transition-colors hover:bg-black/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              >
                <Mail aria-hidden="true" className="size-4" />
                M’écrire
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[90rem] flex-col gap-4 text-sm text-white/42 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Yanis Harrat</p>
          <p>Portfolio étudiant · BTS SIO SISR</p>
        </div>
      </footer>
    </main>
  );
}
