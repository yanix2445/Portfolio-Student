"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { getE5MissionBySlug } from "@/features/bts-e5";
import { experiences } from "../experiences.data";

export function ExperienceRegistry() {
  const [openSlug, setOpenSlug] = useState<string | null>(experiences[0]?.slug ?? null);

  return (
    <div className="px-4 pb-24 pt-16 sm:px-6 sm:pt-20 lg:pt-24">
      <div className="mx-auto max-w-7xl">
        <header className="grid gap-6 border-b border-white/[0.12] pb-8 lg:grid-cols-[1fr_0.78fr] lg:items-end lg:gap-24 lg:pb-12">
          <h1 className="reveal max-w-[42.5rem] text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl">
            Toutes mes expériences, sans détour.
          </h1>
          <div className="reveal reveal-delay-1 max-w-[42.5rem]">
            <p className="text-base leading-7 text-[var(--home-text-muted)] text-pretty sm:text-lg sm:leading-8">
              Cinq expériences qui montrent ma progression vers le support systèmes et réseaux, avec leurs responsabilités, environnements et preuves disponibles.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--home-text-subtle)]" aria-label="5 expériences et 6 preuves E5">
              <span className="whitespace-nowrap font-semibold text-[var(--home-accent-hover)]">5 expériences</span>
              <span className="whitespace-nowrap">6 preuves E5</span>
            </div>
          </div>
        </header>

        <section className="grid scroll-mt-24 pt-8 lg:grid-cols-[17rem_1fr] lg:gap-16 lg:pt-12" aria-label="Registre des expériences">
          <aside className="hidden min-w-0 lg:sticky lg:top-28 lg:block lg:self-start">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-sm font-semibold">Index des expériences</h2>
              <span className="text-xs tabular-nums text-[var(--home-text-subtle)]">5 expériences</span>
            </div>
            <nav className="mt-5" aria-label="Index du parcours">
              <ol className="border-y border-white/[0.1]">
                {experiences.map((experience, index) => (
                  <li key={experience.slug} className="border-white/[0.1] [&+&]:border-t">
                    <a
                      href={`#record-${experience.slug}`}
                      data-active={openSlug === experience.slug ? "" : undefined}
                      aria-current={openSlug === experience.slug ? "true" : undefined}
                      onClick={() => setOpenSlug(experience.slug)}
                      className="group flex min-h-14 items-center gap-4 py-3 text-sm text-[var(--home-text-muted)] transition-[color,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--home-accent-hover)] data-[active]:text-white"
                    >
                      <span className="grid size-7 shrink-0 place-items-center rounded-full text-xs tabular-nums text-[var(--home-text-subtle)] ring-1 ring-white/10 transition-[background-color,color] group-data-[active]:bg-[var(--home-accent)] group-data-[active]:text-black group-data-[active]:ring-transparent">
                        {index + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold leading-5 text-pretty [overflow-wrap:anywhere]">{experience.organization}</span>
                        <span className="mt-1 block text-xs text-[var(--home-text-subtle)]">{experience.period}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <p className="mt-6 text-sm leading-6 text-[var(--home-text-subtle)]">
              Les fiches E5 apparaissent uniquement dans les deux expériences réalisées pour le BTS.
            </p>
          </aside>

          <div className="reveal reveal-delay-2 min-w-0">
            <div className="overflow-hidden rounded-2xl bg-[var(--home-surface)] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]">
              {experiences.map((experience, index) => {
                const missions = experience.missionSlugs?.flatMap((slug) => {
                  const mission = getE5MissionBySlug(slug);
                  return mission ? [mission] : [];
                }) ?? [];

                return (
                  <details id={`record-${experience.slug}`} key={experience.slug} open={openSlug === experience.slug} className="group scroll-mt-28 [&+&]:border-t [&+&]:border-white/[0.1]">
                    <summary
                      onClick={(event) => {
                        event.preventDefault();
                        setOpenSlug((current) => current === experience.slug ? null : experience.slug);
                      }}
                      className="grid min-h-28 cursor-pointer list-none gap-4 p-6 transition-[background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/[0.035] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--home-accent-hover)] group-open:bg-white/[0.025] sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:p-8 [&::-webkit-details-marker]:hidden"
                    >
                      <span className="font-mono text-xs tabular-nums text-[var(--home-accent-hover)]">{(index + 1).toString().padStart(2, "0")}</span>
                      <span>
                        <span className="block text-xl font-semibold text-balance [overflow-wrap:anywhere] sm:text-2xl">{experience.role}</span>
                        <span className="mt-2 block text-sm text-[var(--home-text-muted)] [overflow-wrap:anywhere]">{experience.organization} · {experience.period}</span>
                      </span>
                      <span className="flex items-center justify-between gap-3 text-xs text-[var(--home-text-subtle)]">
                        <span className="[overflow-wrap:anywhere]">{missions.length ? `${missions.length} preuves E5` : experience.domain}</span>
                        <ChevronDown className="size-5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-open:rotate-180" strokeWidth={1.5} aria-hidden="true" />
                      </span>
                    </summary>

                    <div className="border-t border-white/[0.1] bg-black/20 px-6 py-8 sm:px-8 sm:py-10 sm:pl-[7rem]">
                      <div className="flex flex-wrap gap-2 text-xs text-[var(--home-text-subtle)]">
                        <span className="rounded-lg bg-white/[0.05] px-3 py-2">{experience.type}</span>
                        <span className="rounded-lg bg-white/[0.05] px-3 py-2">{experience.domain}</span>
                        <span className="rounded-lg bg-white/[0.05] px-3 py-2">{experience.context}</span>
                        {experience.location ? <span className="rounded-lg bg-white/[0.05] px-3 py-2">{experience.location}</span> : null}
                      </div>
                      <p className="mt-6 max-w-[70ch] text-base leading-7 text-[var(--home-text-muted)] text-pretty [overflow-wrap:anywhere]">{experience.summary}</p>

                      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.65fr]">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--home-text-subtle)]">Responsabilités</p>
                          <ul className="mt-5 grid gap-4">
                            {experience.highlights.map((highlight) => (
                              <li key={highlight} className="flex gap-3 text-sm leading-6 text-[var(--home-text-muted)] [overflow-wrap:anywhere]">
                                <Check className="mt-1 size-4 shrink-0 text-[var(--home-accent-hover)]" strokeWidth={2} aria-hidden="true" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--home-text-subtle)]">Environnements</p>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {experience.tools.map((tool) => (
                              <span key={tool} className="max-w-full rounded-lg bg-black/30 px-3 py-2 text-xs text-[var(--home-text-muted)] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.07)] [overflow-wrap:anywhere]">{tool}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {missions.length ? (
                        <div className="mt-8 border-t border-white/[0.1] pt-6">
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--home-accent-hover)]">Fiches E5 consultables</p>
                          <ul className="mt-3 divide-y divide-white/[0.1]">
                            {missions.map((mission) => (
                              <li key={mission.slug}>
                                <Link href={`/epreuves/e5/${mission.slug}`} className="group/link flex min-h-14 items-center justify-between gap-4 py-4 text-sm font-semibold transition-[color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-[var(--home-accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--home-accent-hover)]">
                                  <span className="[overflow-wrap:anywhere]">{mission.title}</span>
                                  <ArrowUpRight className="size-4 shrink-0 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden="true" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : experience.evidenceNote ? (
                        <div className="mt-8 border-t border-white/[0.1] pt-6">
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--home-accent-hover)]">Trace disponible</p>
                          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--home-text-muted)] [overflow-wrap:anywhere]">{experience.evidenceNote}</p>
                        </div>
                      ) : null}
                    </div>
                  </details>
                );
              })}
            </div>

            <footer className="mt-8 flex flex-col justify-between gap-6 border-t border-white/[0.1] pt-8 sm:flex-row sm:items-center">
              <p className="max-w-xl text-sm leading-6 text-[var(--home-text-subtle)]">
                Chaque compétence annoncée dans le portfolio reste reliée à une expérience, un projet ou une preuve identifiable.
              </p>
              <Link href="/competences" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white py-2 ps-3 pe-2.5 text-base font-semibold text-black transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:scale-[0.96]">
                Voir la matrice de compétences
                <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden="true" />
              </Link>
            </footer>
          </div>
        </section>
      </div>
    </div>
  );
}
