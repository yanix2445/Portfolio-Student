import { homeProofs } from "../home.data";

export function HomeProofStrip() {
  return (
    <section aria-labelledby="preuves-title" className="page-shell py-5 sm:py-8">
      <h2 id="preuves-title" className="sr-only">
        Repères rapides
      </h2>
      <div className="editorial-card grid grid-cols-2 overflow-hidden lg:grid-cols-4">
        {homeProofs.map((proof) => (
          <div
            key={proof.label}
            className="border-r border-b border-white/8 px-5 py-7 last:border-r-0 sm:px-8 lg:border-b-0 lg:px-10"
          >
            <p className="font-heading text-4xl font-semibold text-brand sm:text-5xl">
              {proof.value}
            </p>
            <p className="mt-2 max-w-44 text-sm leading-6 text-muted-foreground">
              {proof.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
