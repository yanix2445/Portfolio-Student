import { homeProofs } from "../home.data";

export function HomeProofStrip() {
  return (
    <section aria-labelledby="preuves-title" className="px-4 pb-14 sm:px-6 lg:pb-20">
      <h2 id="preuves-title" className="sr-only">
        Repères rapides
      </h2>
      <div className="mx-auto grid max-w-7xl grid-cols-2 overflow-hidden rounded-2xl bg-[var(--home-surface)] shadow-[0_24px_60px_-48px_rgba(0,0,0,0.9)] ring-1 ring-white/[0.07] lg:grid-cols-4">
        {homeProofs.map((proof) => (
          <div
            key={proof.label}
            className="border-white/[0.07] p-4 even:border-l lg:border-l lg:first:border-l-0 sm:p-5"
          >
            <p className="text-2xl font-semibold text-[var(--home-accent-hover)] tabular-nums sm:text-3xl">
              {proof.value}
            </p>
            <p className="mt-1 text-xs leading-5 text-[var(--home-text-muted)] sm:text-sm">
              {proof.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
