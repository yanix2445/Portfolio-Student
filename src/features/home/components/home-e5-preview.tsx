import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { homeExperiences, homeRoutes } from "../home.data";

export function HomeE5Preview() {
  return (
    <section id="e5" className="bg-surface-raised/35">
      <div className="page-shell page-section">
        <p className="section-label">Expériences · Épreuve E5</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <h2 className="max-w-4xl text-4xl font-medium tracking-[-0.045em] sm:text-6xl">
            Six missions réalisées en entreprise.
          </h2>
          <p className="max-w-xl leading-7 text-muted-foreground lg:justify-self-end">
            Deux stages en 2026, un même poste et des responsabilités allant du support aux migrations de services.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2 lg:items-start">
          {homeExperiences.map((experience, index) => (
            <article key={experience.organization} className={`editorial-card p-7 sm:p-10 ${index === 1 ? "lg:mt-14" : ""}`}>
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <h3 className="text-3xl font-medium tracking-[-0.03em]">
                    {experience.organization}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{experience.role}</p>
                </div>
                <p className="font-mono text-xs text-brand">{experience.period}</p>
              </div>
              <ul className="mt-7 grid gap-5">
                {experience.missions.map((mission) => (
                  <li key={mission} className="flex gap-3 leading-7 text-white/74">
                    <CheckCircle2 aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand" />
                    {mission}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-6">
          <Link href={homeRoutes.e5} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-brand/30 bg-brand/8 px-4 text-sm font-semibold text-brand hover:bg-brand/14">
            Consulter les six fiches E5
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <Link href={homeRoutes.career} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-white/62 hover:bg-white/5 hover:text-white">
            Voir mon parcours
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
