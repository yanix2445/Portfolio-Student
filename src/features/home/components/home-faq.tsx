import { homeFaqs } from "../home.data";
import { HomeReveal } from "./home-reveal";

export function HomeFaq() {
  return (
    <section className="px-4 py-20 sm:px-6" aria-labelledby="home-faq-title">
      <HomeReveal className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-14">
        <div>
          <h2 id="home-faq-title" className="max-w-xl text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
            L’essentiel avant un premier échange.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-[var(--home-text-muted)] text-pretty">
            Poste, mobilité, niveau d’études et environnements techniques : les réponses sont accessibles sans quitter la page.
          </p>
        </div>

        <div className="grid gap-3">
          {homeFaqs.map(([question, answer], index) => (
            <details key={question} open={index === 0} className="group rounded-2xl bg-[var(--home-surface)] p-5 ring-1 ring-white/[0.08] open:bg-[var(--home-surface-warm)] open:ring-[var(--home-accent)]/35">
              <summary className="grid min-h-11 cursor-pointer list-none grid-cols-[1fr_auto] items-center gap-4 font-semibold focus-visible:outline-[var(--home-accent-hover)]">
                <span>{question}</span>
                <span className="grid size-9 place-items-center rounded-full bg-white/[0.06] text-xl font-normal text-[var(--home-accent-hover)] transition-transform duration-150 ease-out group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-4 border-t border-white/[0.08] pt-4 text-sm leading-6 text-[var(--home-text-muted)] text-pretty">{answer}</p>
            </details>
          ))}
        </div>
      </HomeReveal>
    </section>
  );
}
