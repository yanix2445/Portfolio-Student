"use client";

import { ArrowUpRight, Check, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { homeRoutes, homeSkills } from "../home.data";
import { HomeReveal } from "./home-reveal";

export function HomeSkillsPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSkill = homeSkills[activeIndex];

  return (
    <section id="competences" className="px-4 py-24 sm:px-6" aria-labelledby="home-skills-title">
      <HomeReveal className="mx-auto max-w-7xl">
        <header className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
          <h2 id="home-skills-title" className="max-w-4xl text-[clamp(2.5rem,4.5vw,4.25rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-balance">
            Six compétences reliées à des situations concrètes.
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-[var(--home-text-secondary)] text-pretty lg:justify-self-end">
            Sélectionnez un domaine pour voir les interventions que je peux prendre en charge, les environnements utilisés et les preuves associées.
          </p>
        </header>

        <div className="mt-14 grid overflow-hidden rounded-2xl bg-[var(--home-surface-raised)] shadow-[0_28px_80px_-52px_rgba(0,0,0,0.9)] lg:grid-cols-[0.72fr_1.28fr]">
          <div className="bg-black/20 p-3 sm:p-4 lg:flex lg:flex-col" aria-label="Choisir une compétence">
            {homeSkills.map((skill, index) => {
              const isActive = activeIndex === index;
              const proofCount = skill.proofs.length;
              const proofLabel = `${proofCount} preuve${proofCount > 1 ? "s" : ""}`;
              const keyTools = skill.tools.slice(0, 3).join(" · ");

              return (
                <button
                  key={skill.title}
                  type="button"
                  aria-pressed={isActive}
                  aria-controls="home-skill-evidence-panel"
                  onClick={() => setActiveIndex(index)}
                  className={`flex w-full items-start gap-4 rounded-xl px-4 py-4 text-left transition-[transform,background-color,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--home-accent-hover)] motion-reduce:transition-none lg:flex-1 lg:items-center ${isActive ? "bg-[var(--home-accent)] text-black" : "text-[var(--home-text-muted)] hover:bg-white/[0.055] hover:text-white"}`}
                >
                  <span className={`grid size-8 shrink-0 place-items-center rounded-lg text-xs font-semibold tabular-nums ${isActive ? "bg-black/10" : "bg-white/[0.06] text-[var(--home-accent-hover)]"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-pretty">{skill.title}</span>
                    <span className={`mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs leading-5 ${isActive ? "text-black/65" : "text-[var(--home-text-subtle)]"}`}>
                      <span>{skill.context}</span>
                      <span aria-hidden="true">·</span>
                      <span>{proofLabel}</span>
                    </span>
                    <span className={`mt-1 block text-xs leading-5 ${isActive ? "text-black/55" : "text-[var(--home-text-subtle)]"}`}>
                      {keyTools}
                    </span>
                  </span>
                  <Check className={`mt-1 size-4 shrink-0 transition-opacity duration-150 ${isActive ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <article id="home-skill-evidence-panel" aria-live="polite" className="flex min-h-[40rem] flex-col justify-between p-7 sm:p-10 lg:p-14">
            <div key={activeSkill.title} className="origin-left animate-[skill-detail-in_220ms_cubic-bezier(0.23,1,0.32,1)] motion-reduce:animate-none">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="text-sm font-semibold text-[var(--home-accent-hover)]">{activeSkill.context}</span>
                <span className="text-sm text-[var(--home-text-subtle)] tabular-nums">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(homeSkills.length).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-12 max-w-3xl text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-balance">
                {activeSkill.title}
              </h3>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--home-text-secondary)] text-pretty">
                {activeSkill.summary}
              </p>
              <div className="mt-10 grid gap-9 xl:grid-cols-[1.1fr_0.9fr] xl:gap-12">
                <div>
                  <h4 className="text-sm font-semibold text-[var(--home-text-muted)]">Interventions que je peux prendre en charge</h4>
                  <ul className="mt-4 grid gap-3" aria-label={`Pratiques pour ${activeSkill.title}`}>
                    {activeSkill.practices.map((practice) => (
                      <li key={practice} className="flex gap-3 text-sm leading-6 text-[var(--home-text-secondary)]">
                        <CheckCircle2 className="mt-1 size-4 shrink-0 text-[var(--home-accent-hover)]" aria-hidden="true" />
                        <span>{practice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[var(--home-text-muted)]">Environnements et outils</h4>
                  <ul className="mt-4 flex flex-wrap gap-2.5" aria-label={`Outils pour ${activeSkill.title}`}>
                    {activeSkill.tools.map((tool) => (
                      <li key={tool} className="rounded-full bg-white/[0.07] px-3.5 py-2 text-sm font-medium">{tool}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 border-t border-white/[0.08] pt-8">
                <h4 className="text-sm font-semibold text-[var(--home-text-muted)]">Preuves associées</h4>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {activeSkill.proofs.map((proof) => (
                    <Link key={proof.label} href={proof.href} className="group flex min-h-24 flex-col justify-between gap-4 rounded-xl bg-black/20 p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--home-accent-hover)]">
                      <span className="flex items-start justify-between gap-4">
                        <span className="text-sm font-semibold leading-5 text-pretty">{proof.label}</span>
                        <ArrowUpRight className="size-4 shrink-0 text-[var(--home-accent-hover)] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" aria-hidden="true" />
                      </span>
                      <span className="text-xs font-medium text-[var(--home-accent-hover)]">{proof.status}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href={homeRoutes.skills} className="group mt-12 inline-flex min-h-11 w-fit items-center gap-2 rounded-lg text-sm font-semibold text-[var(--home-accent-hover)] underline decoration-[var(--home-accent)]/35 underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--home-accent-hover)]">
              Consulter toutes les compétences
              <ArrowUpRight className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" aria-hidden="true" />
            </Link>
          </article>
        </div>
      </HomeReveal>
    </section>
  );
}
