export function HomeProjectVisual({ title }: { title: string }) {
  return (
    <div role="img" aria-label={`Aperçu visuel du projet ${title}`} className="relative isolate aspect-[16/10] w-full overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[#17191c]" />
      <div className="absolute inset-x-[7%] top-[9%] bottom-[8%] overflow-hidden rounded-[0.8rem] border border-white/12 bg-[#090a0c] shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
        <div className="flex h-[12%] items-center justify-between border-b border-white/8 px-[4%]">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-1.5 rounded-full bg-white/16" />
            <span className="size-1.5 rounded-full bg-white/10" />
            <span className="size-1.5 rounded-full bg-white/10" />
          </div>
          <span className="text-[clamp(0.36rem,0.7vw,0.6rem)] font-medium tracking-[0.18em] text-white/42 uppercase">Project / PF</span>
        </div>

        <div className="grid h-[88%] grid-cols-[1.12fr_0.88fr]">
          <div className="flex flex-col justify-between p-[8%]">
            <div>
              <span className="text-[clamp(0.38rem,0.72vw,0.64rem)] font-semibold tracking-[0.14em] text-[#ff7a00] uppercase">Portfolio</span>
              <div className="mt-[8%] h-2 w-[82%] rounded-full bg-white/82" />
              <div className="mt-[4%] h-2 w-[58%] rounded-full bg-white/82" />
              <div className="mt-[10%] h-1 w-[72%] rounded-full bg-white/17" />
              <div className="mt-[3%] h-1 w-[54%] rounded-full bg-white/12" />
            </div>
            <div className="flex gap-[3%]">
              <span className="h-5 w-[34%] rounded-sm bg-[#ff7a00]" />
              <span className="h-5 w-[22%] rounded-sm border border-white/14" />
            </div>
          </div>

          <div className="relative overflow-hidden border-l border-white/8 bg-[#ff7a00]">
            <div className="absolute inset-[12%] rounded-lg border border-black/14 bg-black/84 p-[10%]">
              <div className="h-[48%] rounded-md border border-white/9 bg-white/5" />
              <div className="mt-[9%] h-1.5 w-[76%] rounded-full bg-white/70" />
              <div className="mt-[5%] h-1 w-[52%] rounded-full bg-white/22" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
