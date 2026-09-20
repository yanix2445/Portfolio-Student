import { CheckCircle2 } from "lucide-react";
import { homeExperiences } from "../home.data";

export function HomeE5Preview() {
  return (
    <section id="e5" className="border-b border-white/10 bg-[#0b0b0b] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto w-full max-w-[90rem]">
        <p className="section-label">Expériences · Épreuve E5</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <h2 className="max-w-4xl text-4xl font-medium tracking-[-0.045em] sm:text-6xl">
            Six missions réalisées en entreprise.
          </h2>
          <p className="max-w-xl leading-7 text-white/58 lg:justify-self-end">
            Deux stages en 2026, un même poste et des responsabilités allant du support aux migrations de services.
          </p>
        </div>

        <div className="mt-14 grid gap-px bg-white/10 lg:grid-cols-2">
          {homeExperiences.map((experience) => (
            <article key={experience.organization} className="bg-[#0b0b0b] p-7 sm:p-10">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <h3 className="text-3xl font-medium tracking-[-0.03em]">
                    {experience.organization}
                  </h3>
                  <p className="mt-2 text-sm text-white/55">{experience.role}</p>
                </div>
                <p className="font-mono text-xs text-brand">{experience.period}</p>
              </div>
              <ul className="mt-7 grid gap-5">
                {experience.missions.map((mission) => (
                  <li key={mission} className="flex gap-3 leading-7 text-white/72">
                    <CheckCircle2 aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand" />
                    {mission}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
