import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projectCollection } from "../project-collection.data";
import { ProjectArtwork } from "./project-artwork";
import styles from "./project-gallery.module.css";

const [featuredProject, ...otherProjects] = projectCollection;

export function ProjectGallery() {
  return (
    <main className="portfolio-surface min-h-screen bg-[var(--home-bg)] px-4 pb-28 pt-14 text-[var(--home-text)] sm:px-6 sm:pt-20 lg:pt-24">
      <div className="mx-auto max-w-7xl">
        <header className="grid gap-9 border-b border-white/[0.1] pb-11 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.72fr)] lg:items-end lg:gap-24 lg:pb-16">
          <h1 className={`${styles.enter} max-w-[13ch] text-[clamp(3.2rem,6vw,5.8rem)] leading-[0.94] font-semibold tracking-[-0.035em] text-balance`}>
            Des projets à ouvrir, pas seulement à survoler.
          </h1>
          <div className={`${styles.enterDelayed} max-w-xl`}>
            <p className="text-base leading-7 text-[var(--home-text-muted)] text-pretty sm:text-lg sm:leading-8">
              Une collection visuelle conçue pour grandir. Chaque projet publié expose son contexte, ma contribution, la démarche et les preuves disponibles.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              <span className="font-semibold text-[var(--home-accent-hover)]">1 projet publié</span>
              <span className="size-1 rounded-full bg-white/25" aria-hidden="true" />
              <span className="text-[var(--home-text-subtle)]">5 emplacements déjà structurés</span>
            </div>
          </div>
        </header>

        <article className={`${styles.enterLater} ${styles.feature} mt-10 grid overflow-hidden rounded-2xl bg-[var(--home-surface-raised)] lg:grid-cols-[1.16fr_0.84fr]`}>
          <div className="relative min-h-72 overflow-hidden lg:min-h-[36rem]">
            <ProjectArtwork project={featuredProject} className={`${styles.artwork} size-full min-h-72 lg:min-h-[36rem]`} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/35 to-transparent lg:hidden" />
          </div>
          <div className="flex flex-col justify-between p-6 sm:p-9 lg:p-12">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <span className="font-semibold text-[var(--home-accent-hover)]">{featuredProject.kind}</span>
                <span className="inline-flex items-center gap-2 text-[var(--home-text-muted)]">
                  <span className="size-1.5 rounded-full bg-[var(--home-accent)] shadow-[0_0_16px_rgba(255,122,0,0.7)]" aria-hidden="true" />
                  {featuredProject.status}
                </span>
              </div>
              <h2 className="mt-12 max-w-[12ch] text-4xl leading-[0.98] font-semibold tracking-[-0.03em] text-balance [overflow-wrap:anywhere] sm:text-5xl">{featuredProject.title}</h2>
              <p className="mt-6 max-w-[48ch] text-base leading-7 text-[var(--home-text-muted)] text-pretty">{featuredProject.summary}</p>
              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technologies du projet principal">
                {featuredProject.tools.map((tool) => <li key={tool} className="rounded-lg bg-black/30 px-3 py-2 text-xs text-[var(--home-text-muted)] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)]">{tool}</li>)}
              </ul>
            </div>
            {featuredProject.href ? (
              <Link href={featuredProject.href} className="group mt-12 inline-flex min-h-12 w-fit items-center gap-2 rounded-xl bg-[var(--home-accent)] px-5 text-sm font-bold text-black shadow-[0_16px_40px_-20px_rgba(255,122,0,0.9)] transition-[background-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[var(--home-accent-hover)] hover:shadow-[0_20px_50px_-18px_rgba(255,122,0,0.8)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--home-accent-hover)] motion-reduce:transition-none motion-reduce:active:scale-100">
                Ouvrir l’étude de cas <ArrowUpRight className="size-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        </article>

        <section className={`${styles.collection} mt-20`} aria-labelledby="project-collection-title">
          <div className="grid gap-5 border-b border-white/[0.1] pb-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <h2 id="project-collection-title" className="max-w-2xl text-3xl font-semibold tracking-[-0.025em] text-balance sm:text-4xl">Projets à documenter.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--home-text-muted)] text-pretty">Les projets prennent leur place dès maintenant. Leur fiche détaillée s’ouvrira lorsque les preuves seront prêtes.</p>
            </div>
            <p className="text-sm tabular-nums text-[var(--home-text-subtle)]">{otherProjects.length} projets dans la collection</p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            {otherProjects.map((project, index) => {
              const isWide = index === 0 || index === 3;
              return (
                <article key={project.slug} className={`${styles.card} group overflow-hidden rounded-2xl bg-[var(--home-surface)] ${isWide ? "lg:col-span-4 lg:grid lg:grid-cols-[1.1fr_0.9fr]" : "lg:col-span-2"}`}>
                  <div className={`overflow-hidden ${isWide ? "lg:min-h-[23rem]" : ""}`}>
                    <ProjectArtwork project={project} className={`${styles.artwork} aspect-[16/10] size-full ${isWide ? "lg:aspect-auto" : ""}`} />
                  </div>
                  <div className="flex min-w-0 flex-col p-6 sm:p-7">
                    <div className="flex items-center justify-between gap-4 text-xs text-[var(--home-text-subtle)]">
                      <span>{project.kind}</span>
                      <span className="inline-flex items-center gap-2 whitespace-nowrap"><span className="size-1 rounded-full bg-white/35" aria-hidden="true" />{project.status}</span>
                    </div>
                    <h3 className="mt-7 text-2xl leading-[1.08] font-semibold tracking-[-0.02em] text-balance [overflow-wrap:anywhere]">{project.title}</h3>
                    <p className="mt-4 line-clamp-4 text-sm leading-6 text-[var(--home-text-muted)] text-pretty">{project.summary}</p>
                    <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-2 pt-7 text-xs text-[var(--home-text-subtle)]" aria-label={`Repères de ${project.title}`}>
                      {project.tools.slice(0, 3).map((tool) => <li key={tool}>{tool}</li>)}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
