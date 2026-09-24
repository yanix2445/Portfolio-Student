import type { LucideIcon } from "lucide-react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  Headphones,
  MonitorCog,
  Network,
  ServerCog,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { skillDomains } from "../skills.data";
import type { SkillDomain, SkillProofSource } from "../skill.types";

const skillIcons: Record<string, LucideIcon> = {
  "support-utilisateurs": Headphones,
  "gestion-parc": MonitorCog,
  "administration-microsoft": ServerCog,
  "reseaux-acces-distant": Network,
  "virtualisation-linux": Boxes,
  "developpement-automatisation": Workflow,
};

const proofRelationCount = skillDomains.reduce((total, skill) => total + skill.proofs.length, 0);
const practiceCount = skillDomains.reduce((total, skill) => total + skill.practices.length, 0);
const toolCount = new Set(skillDomains.flatMap((skill) => skill.tools)).size;

const skillLayers = [
  {
    slug: "assister",
    title: "Assister",
    description: "Recevoir la demande, qualifier l’incident et maintenir un poste exploitable.",
    skills: skillDomains.filter((skill) => ["support-utilisateurs", "gestion-parc"].includes(skill.slug)),
  },
  {
    slug: "administrer",
    title: "Administrer",
    description: "Faire fonctionner les identités, les services, les réseaux et les environnements de test.",
    skills: skillDomains.filter((skill) =>
      ["administration-microsoft", "reseaux-acces-distant", "virtualisation-linux"].includes(skill.slug),
    ),
  },
  {
    slug: "fiabiliser",
    title: "Fiabiliser",
    description: "Automatiser, versionner et documenter pour rendre l’intervention reproductible.",
    skills: skillDomains.filter((skill) => skill.slug === "developpement-automatisation"),
  },
] as const;

const proofSources: ReadonlyArray<{
  value: SkillProofSource;
  label: string;
  description: string;
}> = [
  { value: "E5", label: "Missions E5", description: "Situations vécues en stage" },
  { value: "E6", label: "Réalisation E6", description: "Dossier technique SISR" },
  { value: "Projet", label: "Projet personnel", description: "Conception et code publiés" },
];

function SkillIcon({ skill, className = "size-5" }: { skill: SkillDomain; className?: string }) {
  const Icon = skillIcons[skill.slug] ?? ServerCog;
  return <Icon aria-hidden="true" className={className} strokeWidth={2} />;
}

function ToolList({ skill }: { skill: SkillDomain }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={`Environnements pratiqués pour ${skill.title}`}>
      {skill.tools.map((tool) => (
        <li key={tool} className="rounded-full bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-[var(--home-text-muted)]">
          {tool}
        </li>
      ))}
    </ul>
  );
}

function PracticeList({ skill }: { skill: SkillDomain }) {
  return (
    <ul className="grid gap-3" aria-label={`Compétences détaillées pour ${skill.title}`}>
      {skill.practices.map((practice) => (
        <li key={practice} className="flex gap-3 text-sm leading-6 text-[var(--home-text-secondary)]">
          <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-[var(--home-accent-hover)]" />
          <span>{practice}</span>
        </li>
      ))}
    </ul>
  );
}

function ProofLinks({ skill }: { skill: SkillDomain }) {
  return (
    <div className="grid gap-2.5">
      {skill.proofs.map((proof) => (
        <Link
          key={`${skill.slug}-${proof.label}`}
          href={proof.href}
          className="group flex min-h-20 items-center justify-between gap-5 rounded-xl bg-black/25 p-4 transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-black/40 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--home-accent-hover)] motion-reduce:transition-none motion-reduce:active:scale-100"
        >
          <span className="min-w-0">
            <span className="block text-sm leading-5 font-semibold text-pretty">{proof.label}</span>
            <span className="mt-1.5 block text-xs font-medium text-[var(--home-accent-hover)]">
              {proof.source} · {proof.sourceLabel} · {proof.status}
            </span>
          </span>
          <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
        </Link>
      ))}
    </div>
  );
}

function CatalogSkillRecord({ skill }: { skill: SkillDomain }) {
  return (
    <article id={skill.slug} className="min-w-0 scroll-mt-32 rounded-2xl bg-[var(--home-surface-raised)] p-6 shadow-[0_28px_80px_-56px_rgba(0,0,0,0.95)] sm:p-8 lg:p-10">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[var(--home-accent)] text-black">
            <SkillIcon skill={skill} />
          </span>
          <div className="min-w-0">
            <h3 className="max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-balance [overflow-wrap:anywhere] sm:text-4xl">{skill.title}</h3>
            <p className="mt-3 text-sm font-semibold text-[var(--home-accent-hover)]">{skill.context}</p>
          </div>
        </div>
        <p className="shrink-0 text-sm text-[var(--home-text-subtle)]">
          {skill.proofs.length} preuve{skill.proofs.length > 1 ? "s" : ""} reliée{skill.proofs.length > 1 ? "s" : ""}
        </p>
      </header>

      <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--home-text-secondary)] text-pretty sm:text-lg sm:leading-8">{skill.summary}</p>

      <div className="mt-10 grid gap-10 border-t border-white/[0.09] pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <section aria-labelledby={`${skill.slug}-practices`}>
          <h4 id={`${skill.slug}-practices`} className="text-sm font-semibold text-[var(--home-text-muted)]">Compétences détaillées</h4>
          <div className="mt-5"><PracticeList skill={skill} /></div>
        </section>

        <div className="grid content-start gap-8">
          <section aria-labelledby={`${skill.slug}-tools`}>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h4 id={`${skill.slug}-tools`} className="text-sm font-semibold text-[var(--home-text-muted)]">Environnements pratiqués</h4>
              <span className="text-xs text-[var(--home-text-subtle)]">Inventaire technique du CV</span>
            </div>
            <div className="mt-5"><ToolList skill={skill} /></div>
          </section>

          <section aria-labelledby={`${skill.slug}-proofs`}>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h4 id={`${skill.slug}-proofs`} className="text-sm font-semibold text-[var(--home-text-muted)]">Preuves associées</h4>
              <span className="text-xs text-[var(--home-text-subtle)]">État réel affiché</span>
            </div>
            <ProofLinks skill={skill} />
          </section>
        </div>
      </div>
    </article>
  );
}

function MatrixProofs({ skill, source }: { skill: SkillDomain; source: SkillProofSource }) {
  const proofs = skill.proofs.filter((proof) => proof.source === source);

  if (proofs.length === 0) return <span className="text-sm text-[var(--home-text-subtle)]">Pas de preuve reliée</span>;

  return (
    <ul className="grid gap-3">
      {proofs.map((proof) => (
        <li key={`${skill.slug}-${source}-${proof.label}`}>
          <Link href={proof.href} className="group inline-flex items-start gap-2 text-sm leading-5 font-semibold text-[var(--home-text)] underline decoration-white/20 underline-offset-4 transition-colors duration-150 hover:text-[var(--home-accent-hover)] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--home-accent-hover)]">
            <span>{proof.label}</span>
            <ArrowUpRight aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
          </Link>
          <span className="mt-1 block text-xs text-[var(--home-text-subtle)]">{proof.status}</span>
        </li>
      ))}
    </ul>
  );
}

function EvidenceMatrix() {
  return (
    <section className="border-t border-white/[0.09] py-20 lg:py-28" aria-labelledby="evidence-matrix-title">
      <header className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-20">
        <h2 id="evidence-matrix-title" className="max-w-4xl text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl">Matrice des preuves.</h2>
        <div className="max-w-xl lg:justify-self-end">
          <p className="text-base leading-7 text-[var(--home-text-secondary)] text-pretty">Chaque domaine est relié à une mission E5, une réalisation E6 ou un projet personnel. Un emplacement vide signifie simplement qu’aucune preuve publique n’y est encore associée.</p>
          <p className="mt-5 text-sm font-semibold text-[var(--home-accent-hover)]">{proofRelationCount} relations de preuve · statuts conservés</p>
        </div>
      </header>

      <div className="mt-12 hidden overflow-hidden rounded-2xl bg-[var(--home-surface)] p-2 md:block">
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">Matrice reliant les domaines de compétences aux preuves E5, E6 et projets personnels</caption>
          <thead>
            <tr className="border-b border-white/[0.1]">
              <th scope="col" className="w-[25%] p-5 text-sm font-semibold text-[var(--home-text-muted)] lg:p-6">Domaine</th>
              {proofSources.map((source) => (
                <th key={source.value} scope="col" className="w-[25%] border-l border-white/[0.08] p-5 align-top lg:p-6">
                  <span className="block text-sm font-semibold text-[var(--home-text)]">{source.label}</span>
                  <span className="mt-1 block text-xs font-normal leading-5 text-[var(--home-text-subtle)]">{source.description}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {skillDomains.map((skill) => (
              <tr key={skill.slug} className="border-b border-white/[0.08] last:border-b-0">
                <th scope="row" className="p-5 align-top lg:p-6">
                  <a href={`#${skill.slug}`} className="inline-flex items-start gap-3 font-semibold text-pretty transition-colors duration-150 hover:text-[var(--home-accent-hover)] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--home-accent-hover)]">
                    <SkillIcon skill={skill} className="mt-0.5 size-4 shrink-0 text-[var(--home-accent-hover)]" />
                    <span>{skill.title}</span>
                  </a>
                </th>
                {proofSources.map((source) => (
                  <td key={source.value} className="border-l border-white/[0.08] p-5 align-top lg:p-6"><MatrixProofs skill={skill} source={source.value} /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 grid gap-4 md:hidden">
        {skillDomains.map((skill) => (
          <article key={skill.slug} className="rounded-2xl bg-[var(--home-surface)] p-5">
            <a href={`#${skill.slug}`} className="inline-flex items-start gap-3 text-lg font-semibold text-pretty focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--home-accent-hover)]">
              <SkillIcon skill={skill} className="mt-0.5 size-5 shrink-0 text-[var(--home-accent-hover)]" />
              <span>{skill.title}</span>
            </a>
            <div className="mt-6 grid gap-6">
              {proofSources.map((source) => (
                <section key={source.value} aria-labelledby={`${skill.slug}-${source.value}-mobile`}>
                  <h3 id={`${skill.slug}-${source.value}-mobile`} className="mb-3 text-xs font-semibold text-[var(--home-text-muted)]">{source.label}</h3>
                  <MatrixProofs skill={skill} source={source.value} />
                </section>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SkillsCatalog() {
  return (
    <main className="portfolio-surface min-h-screen bg-[var(--home-bg)] text-[var(--home-text)]">
      <section className="px-4 pt-12 pb-20 sm:px-6 lg:pt-20" aria-labelledby="skills-system-title">
        <div className="mx-auto max-w-7xl">
          <header className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-20">
            <h1 id="skills-system-title" className="max-w-3xl text-5xl font-semibold tracking-[-0.03em] text-balance sm:text-6xl lg:text-8xl">Assister.<br />Administrer.<br />Fiabiliser.</h1>
            <div className="max-w-2xl lg:justify-self-end">
              <p className="text-lg leading-8 text-[var(--home-text-secondary)] text-pretty">Mon CV inventorie les technologies. Cette page montre ce que je peux prendre en charge, dans quel contexte je l’ai pratiqué et où consulter la preuve correspondante.</p>
              <p className="mt-6 text-sm font-semibold text-[var(--home-accent-hover)]">{skillDomains.length} domaines · {practiceCount} compétences détaillées · {toolCount} environnements · {proofRelationCount} relations de preuve</p>
            </div>
          </header>

          <nav aria-label="Accéder à une catégorie de compétences" className="mt-16 grid gap-2 sm:grid-cols-3">
            {skillLayers.map((layer) => (
              <a key={layer.slug} href={`#category-${layer.slug}`} className="group flex min-h-44 flex-col justify-between rounded-2xl bg-[var(--home-surface)] p-6 shadow-[0_22px_65px_-52px_rgba(0,0,0,0.95)] transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[var(--home-surface-raised)] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--home-accent-hover)] motion-reduce:transition-none motion-reduce:active:scale-100">
                <span className="flex items-center justify-between gap-4">
                  <span className="text-2xl font-semibold tracking-[-0.03em]">{layer.title}</span>
                  <ArrowDownRight aria-hidden="true" className="size-5 text-[var(--home-accent-hover)] transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 motion-reduce:transition-none" />
                </span>
                <span className="mt-8 text-sm leading-6 text-[var(--home-text-secondary)] text-pretty">{layer.skills.map((skill) => skill.title).join(" · ")}</span>
              </a>
            ))}
          </nav>

          <div className="mt-8">
            {skillLayers.map((layer) => (
              <section key={layer.slug} id={`category-${layer.slug}`} className="grid min-w-0 scroll-mt-28 gap-10 py-16 lg:grid-cols-[0.34fr_1fr] lg:gap-16 lg:py-24" aria-labelledby={`layer-${layer.slug}`}>
                <header className="min-w-0 lg:sticky lg:top-28 lg:self-start">
                  <h2 id={`layer-${layer.slug}`} className="text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl">{layer.title}</h2>
                  <p className="mt-6 max-w-sm text-base leading-7 text-[var(--home-text-secondary)] text-pretty">{layer.description}</p>
                  <p className="mt-6 text-sm font-semibold text-[var(--home-accent-hover)]">{layer.skills.length} domaine{layer.skills.length > 1 ? "s" : ""} · {layer.skills.reduce((total, skill) => total + skill.practices.length, 0)} compétences détaillées</p>
                </header>

                <div className="grid min-w-0 gap-6">
                  {layer.skills.map((skill) => <CatalogSkillRecord key={skill.slug} skill={skill} />)}
                </div>
              </section>
            ))}
          </div>

          <EvidenceMatrix />
        </div>
      </section>
    </main>
  );
}
