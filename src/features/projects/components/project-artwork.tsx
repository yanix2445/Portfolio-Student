import type { ProjectCollectionItem } from "../project-collection.data";

const labels: Record<ProjectCollectionItem["visual"], string> = {
  portfolio: "Interface du portfolio professionnel",
  system: "Schéma du système d’information hybride",
  watch: "Flux de veille technologique",
  network: "Architecture réseau à documenter",
  automation: "Flux d’automatisation à documenter",
  blank: "Emplacement visuel du futur projet",
};

export function ProjectArtwork({ project, className = "" }: { project: ProjectCollectionItem; className?: string }) {
  return (
    <div role="img" aria-label={labels[project.visual]} className={`relative isolate overflow-hidden bg-[#0d0d0d] ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,122,0,0.12),transparent_48%)]" />

      {project.visual === "portfolio" ? (
        <div className="absolute inset-[8%] overflow-hidden rounded-xl bg-[#070707] shadow-[0_24px_70px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
          <div className="flex h-[13%] items-center justify-between border-b border-white/8 px-[5%]">
            <div className="flex gap-1.5"><span className="size-1.5 rounded-full bg-[#ff7a00]" /><span className="size-1.5 rounded-full bg-white/15" /><span className="size-1.5 rounded-full bg-white/10" /></div>
            <span className="text-[clamp(0.38rem,0.7vw,0.62rem)] font-semibold tracking-[0.16em] text-white/38 uppercase">Portfolio / 2026</span>
          </div>
          <div className="grid h-[87%] grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-between p-[9%]">
              <div><div className="h-2 w-[82%] rounded-full bg-white/85" /><div className="mt-[5%] h-2 w-[58%] rounded-full bg-white/85" /><div className="mt-[11%] h-1 w-[70%] rounded-full bg-white/18" /><div className="mt-[4%] h-1 w-[48%] rounded-full bg-white/12" /></div>
              <div className="h-7 w-[42%] rounded-md bg-[#ff7a00]" />
            </div>
            <div className="relative bg-[#ff7a00]"><div className="absolute inset-[14%] rounded-lg bg-black/88 p-[10%]"><div className="h-[58%] rounded-md bg-white/[0.06] ring-1 ring-white/10" /><div className="mt-[10%] h-1.5 w-3/4 rounded-full bg-white/70" /><div className="mt-[5%] h-1 w-1/2 rounded-full bg-white/20" /></div></div>
          </div>
        </div>
      ) : null}

      {project.visual === "system" ? (
        <div className="absolute inset-[11%] grid grid-cols-2 gap-[5%]">
          {["Données", "Automatisation", "Interface", "Utilisateurs"].map((label, index) => (
            <div key={label} className="relative flex items-end rounded-xl bg-white/[0.055] p-[8%] ring-1 ring-white/10">
              <span className="text-[clamp(0.42rem,0.8vw,0.72rem)] font-semibold text-white/65">{label}</span>
              <span className={`absolute size-2 rounded-full ${index === 1 ? "bg-[#ff7a00]" : "bg-white/25"}`} style={{ top: `${24 + (index % 2) * 18}%`, left: `${22 + (index % 3) * 22}%` }} />
            </div>
          ))}
          <div className="pointer-events-none absolute inset-[22%] border border-dashed border-[#ff7a00]/35" />
        </div>
      ) : null}

      {project.visual === "watch" ? (
        <div className="absolute inset-[10%] grid grid-cols-[0.75fr_1.25fr] gap-[7%]">
          <div className="relative grid place-items-center"><div className="size-[72%] rounded-full border border-[#ff7a00]/55"><div className="m-[18%] size-[64%] rounded-full border border-white/14"><div className="m-[30%] size-[40%] rounded-full bg-[#ff7a00]" /></div></div><span className="absolute h-px w-full rotate-[28deg] bg-[#ff7a00]/30" /></div>
          <div className="flex flex-col justify-center gap-[8%]">{[78, 92, 64, 84, 52].map((width, index) => <div key={index} className="rounded-lg bg-white/[0.055] p-[7%] ring-1 ring-white/8"><div className="h-1.5 rounded-full bg-white/55" style={{ width: `${width}%` }} /><div className="mt-[6%] h-1 w-[46%] rounded-full bg-white/14" /></div>)}</div>
        </div>
      ) : null}

      {project.visual === "network" ? (
        <div className="absolute inset-[12%]">
          <div className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-[#ff7a00] text-xs font-bold text-black">LAN</div>
          {[[8, 12], [78, 10], [7, 72], [79, 70]].map(([left, top], index) => <div key={index} className="absolute grid size-12 place-items-center rounded-xl bg-white/[0.065] text-[0.55rem] font-semibold text-white/50 ring-1 ring-white/12" style={{ left: `${left}%`, top: `${top}%` }}>N{index + 1}</div>)}
          <div className="absolute inset-[18%] border border-dashed border-[#ff7a00]/30" />
        </div>
      ) : null}

      {project.visual === "automation" ? (
        <div className="absolute inset-[12%] flex items-center justify-between gap-[4%]">
          {["Entrée", "Script", "Test", "Sortie"].map((label, index) => <div key={label} className={`relative grid aspect-square w-[20%] place-items-center rounded-xl text-[clamp(0.42rem,0.8vw,0.72rem)] font-semibold ring-1 ${index === 1 ? "bg-[#ff7a00] text-black ring-transparent" : "bg-white/[0.055] text-white/55 ring-white/10"}`}><span>{label}</span>{index < 3 ? <span className="absolute left-[112%] h-px w-[28%] bg-white/20" /> : null}</div>)}
        </div>
      ) : null}

      {project.visual === "blank" ? (
        <div className="absolute inset-[12%] grid place-items-center rounded-2xl border border-dashed border-white/18"><div className="text-center"><span className="mx-auto grid size-12 place-items-center rounded-full bg-white/[0.05] text-2xl text-[#ff7a00]">+</span><span className="mt-4 block text-xs font-semibold tracking-[0.14em] text-white/40 uppercase">Prochaine étude de cas</span></div></div>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent px-[6%] pb-[5%] pt-[14%] text-[clamp(0.42rem,0.75vw,0.68rem)] font-semibold text-white/55">
        <span>{project.kind}</span><span>{project.year}</span>
      </div>
    </div>
  );
}
