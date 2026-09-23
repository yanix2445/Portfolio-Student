import { HomeAnimatedTagline, HomeReveal } from "./home-reveal";

export function HomeStatement() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20" aria-labelledby="home-statement-title">
      <HomeReveal className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[var(--home-accent)] text-black shadow-[0_24px_72px_-48px_rgba(255,122,0,0.72)]">
        <div className="grid gap-10 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(19rem,0.6fr)] lg:items-end lg:px-14">
          <div>
            <h2 id="home-statement-title" className="sr-only">
              Ma méthode pour transformer une demande en solution durable
            </h2>
            <HomeAnimatedTagline
              text="Comprendre. Résoudre. Documenter."
              className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-7xl"
            />
          </div>

          <p className="max-w-md border-l border-black/25 pl-5 text-lg leading-8 text-black/75 text-pretty lg:mb-1">
            Une intervention utile à l’utilisateur aujourd’hui, exploitable par l’équipe demain.
          </p>
        </div>
      </HomeReveal>
    </section>
  );
}
