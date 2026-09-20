import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2 } from "lucide-react";
import { e5Missions } from "../e5.data";

const organizations = ["EDLearn", "Secours Catholique-Caritas France"] as const;

export function E5List() {
  return (
    <div className="grid gap-16">
      {organizations.map((organization) => {
        const missions = e5Missions.filter(
          (mission) => mission.organization === organization,
        );
        const organizationId =
          organization === "EDLearn" ? "organization-edlearn" : "organization-secours-catholique";

        return (
          <section key={organization} aria-labelledby={organizationId} className="rounded-[1.5rem] border border-white/8 bg-surface-raised/35 p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <h2 id={organizationId} className="inline-flex items-center gap-3 text-3xl font-medium tracking-[-0.03em]">
                <Building2 aria-hidden="true" className="size-6 text-brand" />
                {organization}
              </h2>
              <p className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-white/55">3 réalisations</p>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {missions.map((mission, index) => (
                <article key={mission.slug} className={`editorial-card flex flex-col p-6 sm:p-8 ${index === 1 ? "lg:translate-y-5" : ""}`}>
                  <p className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-brand uppercase">
                    <CheckCircle2 aria-hidden="true" className="size-4" />
                    {mission.status}
                  </p>
                  <h3 className="mt-6 text-2xl font-medium tracking-[-0.03em]">{mission.title}</h3>
                  <p className="mt-4 flex-1 leading-7 text-muted-foreground">{mission.need}</p>
                  <Link
                    href={`/epreuves/e5/${mission.slug}`}
                    className="group mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl border border-brand/30 bg-brand/8 px-4 text-sm font-semibold text-brand hover:bg-brand/14"
                  >
                    Consulter la fiche
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
