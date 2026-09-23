import Link from "next/link";
import { ArrowLeft, CheckCircle2, EyeOff, Wrench } from "lucide-react";
import type { E5Mission } from "../e5.types";

export function E5Detail({ mission }: { mission: E5Mission }) {
  return (
    <article>
      <div className="border-b border-white/10 bg-[#0b0b0b] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto w-full max-w-[90rem]">
          <Link href="/epreuves/e5" className="inline-flex min-h-11 items-center gap-2 text-sm text-white/58 hover:text-brand">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Retour aux réalisations E5
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <p className="section-label">Épreuve E5 · {mission.organization}</p>
              <h1 className="mt-6 max-w-5xl text-5xl font-medium leading-[0.98] tracking-[-0.05em] text-balance sm:text-7xl">
                {mission.title}
              </h1>
            </div>
            <dl className="grid grid-cols-2 gap-5 border-l border-white/12 pl-6 text-sm">
              <div>
                <dt className="text-white/42">Statut</dt>
                <dd className="mt-1 font-semibold text-brand">{mission.status}</dd>
              </div>
              <div>
                <dt className="text-white/42">Période</dt>
                <dd className="mt-1 text-white/75">{mission.period}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-white/42">Rôle</dt>
                <dd className="mt-1 text-white/75">Technicien support systèmes et réseaux</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid w-full max-w-[90rem] gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="grid gap-12">
            <DetailSection title="Contexte">
              <p>{mission.context}</p>
            </DetailSection>
            <DetailSection title="Besoin">
              <p>{mission.need}</p>
            </DetailSection>
            <DetailSection title="Ma contribution">
              <BulletList items={mission.contribution} />
            </DetailSection>
            <DetailSection title="Démarche">
              <ol className="grid gap-4">
                {mission.approach.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="grid size-7 shrink-0 place-items-center bg-brand font-mono text-xs font-bold text-black">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </DetailSection>
            <DetailSection title="Difficultés et confidentialité">
              <BulletList items={mission.difficulties} icon="private" />
            </DetailSection>
            <DetailSection title="Résultat disponible">
              <p>{mission.result}</p>
            </DetailSection>
          </div>

          <aside className="grid content-start gap-5 lg:sticky lg:top-24">
            <section className="border border-white/12 bg-[#0b0b0b] p-6">
              <h2 className="inline-flex items-center gap-2 text-xl font-medium">
                <Wrench aria-hidden="true" className="size-5 text-brand" />
                Outils pertinents
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {mission.tools.map((tool) => (
                  <li key={tool} className="border border-white/12 px-2.5 py-1.5 font-mono text-xs text-white/62">
                    {tool}
                  </li>
                ))}
              </ul>
            </section>

            <section className="border border-white/12 bg-[#0b0b0b] p-6">
              <h2 className="text-xl font-medium">Compétences mobilisées</h2>
              <BulletList items={mission.competencies} />
            </section>

            <section className="border border-brand/30 bg-brand/5 p-6">
              <h2 className="text-xl font-medium">Preuves publiables</h2>
              <ul className="mt-5 grid gap-4">
                {mission.evidence.map((evidence) => (
                  <li key={evidence.label}>
                    <p className="text-sm leading-6 text-white/68">{evidence.label}</p>
                    <p className="mt-1 font-mono text-xs text-brand">{evidence.publication}</p>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </article>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-3xl font-medium tracking-[-0.03em]">{title}</h2>
      <div className="mt-5 max-w-3xl text-base leading-8 text-white/64">{children}</div>
    </section>
  );
}

function BulletList({ items, icon = "check" }: { items: readonly string[]; icon?: "check" | "private" }) {
  const Icon = icon === "private" ? EyeOff : CheckCircle2;
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Icon aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
