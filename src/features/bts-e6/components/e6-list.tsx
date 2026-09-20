import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { e6Realizations } from "../e6.data";

export function E6List() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {e6Realizations.map((realization, index) => (
        <article key={realization.slug} className="flex min-h-[28rem] flex-col border border-white/12 bg-[#0b0b0b] p-7 sm:p-10">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-xs text-white/35">Réalisation 0{index + 1}</span>
            <span className="inline-flex items-center gap-2 border border-brand/40 bg-brand/10 px-3 py-1 font-mono text-xs font-semibold text-brand uppercase">
              <Clock3 aria-hidden="true" className="size-3.5" />
              {realization.status}
            </span>
          </div>
          <h2 className="mt-16 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
            {realization.title}
          </h2>
          <p className="mt-5 max-w-2xl flex-1 leading-7 text-white/58">{realization.summary}</p>
          <Link
            href={`/epreuves/e6/${realization.slug}`}
            className="group mt-9 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand"
          >
            Voir l’état de la réalisation
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </article>
      ))}
    </div>
  );
}
