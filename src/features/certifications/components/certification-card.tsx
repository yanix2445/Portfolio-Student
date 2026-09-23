import Image from "next/image";
import { Award } from "lucide-react";
import type { Certification } from "../certification.types";

export function CertificationCard({ certification }: { certification: Certification }) {
  return (
    <article className="grid h-full grid-rows-[auto_1fr] border border-white/12 bg-[#0b0b0b] p-6 sm:p-8">
      <div className="grid min-h-52 place-items-center border-b border-white/10 pb-7">
        {certification.badge.type === "image" ? (
          <Image
            src={certification.badge.src}
            alt={certification.badge.alt}
            width={220}
            height={220}
            className="size-44 object-contain sm:size-48"
          />
        ) : (
          <div
            className="grid size-40 place-items-center rounded-[2rem] border border-brand/50 bg-[radial-gradient(circle_at_35%_25%,rgba(255,138,31,0.28),transparent_55%),#121212] shadow-[inset_0_0_0_8px_rgba(255,255,255,0.03)]"
            role="img"
            aria-label={`Badge Anthropic ${certification.title}`}
          >
            <div className="text-center">
              <Award aria-hidden="true" className="mx-auto size-8 text-brand" />
              <p className="mt-3 font-mono text-3xl font-bold tracking-[-0.08em] text-white">
                {certification.badge.mark}
              </p>
              <p className="mt-2 font-mono text-[0.6rem] tracking-[0.22em] text-white/48 uppercase">
                Anthropic
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="pt-7">
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[0.68rem] uppercase">
          <span className="text-brand">{certification.kind}</span>
          <span className="text-white/38">{certification.issued}</span>
        </div>
        <h3 className="mt-4 text-2xl font-medium tracking-[-0.03em]">{certification.title}</h3>
        <p className="mt-2 text-sm text-white/46">{certification.issuer}</p>
        <p className="mt-5 leading-7 text-white/58">{certification.description}</p>
      </div>
    </article>
  );
}
