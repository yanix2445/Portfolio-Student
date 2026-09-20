import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { e6Realizations } from "../e6.data";

export function E6List() {
  return (
    <div className="grid gap-5 lg:grid-cols-12 lg:items-start">
      {e6Realizations.map((realization, index) => (
        <article key={realization.slug} className={`editorial-card flex min-h-[28rem] flex-col p-7 sm:p-10 ${index === 0 ? "lg:col-span-7" : "lg:col-span-5 lg:mt-16"}`}>
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-xs text-white/35">Réalisation 0{index + 1}</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 font-mono text-xs font-semibold text-brand uppercase">
              <Clock3 aria-hidden="true" className="size-3.5" />
              {realization.status}
            </span>
          </div>
          <h2 className="mt-16 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
            {realization.title}
          </h2>
          <p className="mt-5 max-w-2xl flex-1 leading-7 text-muted-foreground">{realization.summary}</p>
          <Link
            href={`/epreuves/e6/${realization.slug}`}
            className="group mt-9 inline-flex min-h-11 items-center gap-2 self-start rounded-xl border border-brand/30 bg-brand/8 px-4 text-sm font-semibold text-brand hover:bg-brand/14"
          >
            Voir l’état de la réalisation
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </article>
      ))}
    </div>
  );
}
