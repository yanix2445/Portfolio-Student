import { homeProofs } from "../home.data";

export function HomeProofStrip() {
  return (
    <section aria-labelledby="preuves-title" className="border-b border-white/10">
      <h2 id="preuves-title" className="sr-only">
        Repères rapides
      </h2>
      <div className="mx-auto grid w-full max-w-[90rem] grid-cols-2 lg:grid-cols-4">
        {homeProofs.map((proof) => (
          <div
            key={proof.label}
            className="border-b border-r border-white/10 px-5 py-8 last:border-r-0 sm:px-8 lg:border-b-0 lg:px-10"
          >
            <p className="font-heading text-4xl font-semibold text-brand sm:text-5xl">
              {proof.value}
            </p>
            <p className="mt-2 max-w-44 text-sm leading-6 text-white/55">
              {proof.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
