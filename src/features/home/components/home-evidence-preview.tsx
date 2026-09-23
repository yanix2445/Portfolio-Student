import { ArrowUpRight, BriefcaseBusiness, Network } from "lucide-react";
import Link from "next/link";
import { e5Missions } from "@/features/bts-e5";
import { homeE6Projects, homeRoutes } from "../home.data";
import { HomeReveal } from "./home-reveal";

export function HomeEvidencePreview() {
  return (
    <section id="experiences" className="bg-[var(--home-surface-warm)] px-4 py-20 sm:px-6 lg:py-24" aria-labelledby="home-evidence-title">
      <HomeReveal className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-14">
          <h2 id="home-evidence-title" className="max-w-3xl text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
            Six missions réalisées. Deux dossiers techniques en construction.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-[var(--home-text-muted)] text-pretty lg:justify-self-end">
            E5 documente mon travail en entreprise. E6 rassemble deux infrastructures administrées, automatisées et prêtes à être démontrées.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <article className="rounded-2xl bg-[var(--home-surface-raised)] p-5 ring-1 ring-white/[0.08] sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <BriefcaseBusiness className="size-5 text-[var(--home-accent-hover)]" aria-hidden="true" />
                <h3 className="text-xl font-semibold">E5 · Missions professionnelles</h3>
              </div>
              <Link href={homeRoutes.e5} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--home-accent-hover)] underline decoration-[var(--home-accent)]/40 underline-offset-8">
                Espace E5 <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <ol className="mt-5 grid gap-2">
              {e5Missions.map((mission) => (
                <li key={mission.slug}>
                  <Link href={`/epreuves/e5/${mission.slug}`} className="group grid min-h-16 gap-2 rounded-xl px-3 py-3 transition-colors duration-150 hover:bg-white/[0.045] sm:grid-cols-[1fr_auto] sm:items-center sm:px-4">
                    <span>
                      <span className="block text-sm font-semibold leading-5 text-pretty">{mission.title}</span>
                      <span className="mt-1 block text-xs text-[var(--home-text-subtle)]">{mission.organization}</span>
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--home-accent-hover)]">
                      Réalisée <ArrowUpRight className="size-3.5 transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </article>

          <article className="rounded-2xl bg-black/25 p-5 ring-1 ring-white/[0.08] sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Network className="size-5 text-[var(--home-accent-hover)]" aria-hidden="true" />
                <h3 className="text-xl font-semibold">E6 · Réalisations techniques</h3>
              </div>
              <Link href={homeRoutes.e6} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--home-accent-hover)] underline decoration-[var(--home-accent)]/40 underline-offset-8">
                Espace E6 <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {homeE6Projects.map((item, index) => (
                <Link key={item.slug} href={`${homeRoutes.e6}/${item.slug}`} className="group flex min-h-44 flex-col rounded-xl bg-[var(--home-surface-raised)] p-5 hover:bg-[#1d1d1d]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-[var(--home-accent-hover)]">Réalisation {index + 1}</span>
                    <span className="rounded-full bg-[var(--home-accent)] px-2.5 py-1 text-xs font-bold text-black">{item.status}</span>
                  </div>
                  <h4 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-balance">{item.title}</h4>
                  <p className="mt-3 text-sm leading-6 text-[var(--home-text-muted)] text-pretty">{item.summary}</p>
                  <span className="mt-auto inline-flex min-h-10 items-end gap-2 pt-4 text-sm font-semibold text-[var(--home-accent-hover)]">
                    État du dossier <ArrowUpRight className="mb-0.5 size-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </article>
        </div>
      </HomeReveal>
    </section>
  );
}
