import { ProjectList } from "@/features/projects";

export default function ProjectsPage() {
  return (
    <main>
      <header className="border-b border-white/10 bg-[#0b0b0b] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto w-full max-w-[90rem]">
          <p className="section-label">Projets</p>
          <h1 className="mt-6 max-w-5xl text-5xl font-medium leading-[0.98] tracking-[-0.05em] text-balance sm:text-7xl">
            Des projets dont je peux montrer la démarche.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/58">
            Seuls les projets disposant d’un contexte réel, d’une contribution identifiable et d’une preuve consultable sont publiés.
          </p>
        </div>
      </header>
      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24" aria-label="Liste des projets">
        <div className="mx-auto w-full max-w-[90rem]">
          <ProjectList />
        </div>
      </section>
    </main>
  );
}
