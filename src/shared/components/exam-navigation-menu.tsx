"use client";

import { Menu } from "@base-ui/react/menu";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/shared/config/site.config";

type ExamNavigationMenuProps = {
  compact?: boolean;
};

export function ExamNavigationMenu({ compact = false }: ExamNavigationMenuProps) {
  return (
    <Menu.Root>
      <Menu.Trigger
        className={
          compact
            ? "inline-flex min-h-11 items-center gap-1 px-3 text-xs font-medium text-[var(--portfolio-text-muted)] transition-colors duration-150 hover:text-[var(--portfolio-text)] focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--portfolio-accent-hover)] data-pressed:text-[var(--portfolio-text)]"
            : "inline-flex min-h-11 items-center gap-1.5 text-sm text-[var(--portfolio-text-muted)] transition-colors duration-150 hover:text-white focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--portfolio-accent-hover)] data-pressed:text-white"
        }
      >
        Épreuves
        <ChevronDown className="size-3.5 transition-transform duration-150 ease-out [[data-pressed]_&]:rotate-180" aria-hidden="true" />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner sideOffset={10} align="center" className="z-[70] outline-hidden">
          <Menu.Popup className="w-[min(20rem,calc(100vw-1.5rem))] origin-[var(--transform-origin)] rounded-2xl bg-[color-mix(in_srgb,var(--portfolio-chrome)_96%,transparent)] p-2 text-[var(--portfolio-text)] shadow-[0_22px_60px_rgba(0,0,0,0.52)] ring-1 ring-white/10 backdrop-blur-2xl transition-[transform,opacity] duration-150 ease-out outline-hidden data-ending-style:scale-[0.97] data-ending-style:opacity-0 data-starting-style:scale-[0.97] data-starting-style:opacity-0 motion-reduce:transition-none">
            {siteConfig.examNavigation.map((item) => (
              <Menu.LinkItem
                key={item.href}
                closeOnClick
                render={<Link href={item.href} />}
                className="group grid min-h-14 grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl px-3 py-2.5 outline-hidden transition-colors duration-150 data-highlighted:bg-white/[0.07] data-highlighted:text-white"
              >
                <span className="grid size-9 place-items-center rounded-lg bg-[var(--portfolio-accent)]/12 font-mono text-xs font-bold text-[var(--portfolio-accent-hover)]">
                  {item.shortLabel}
                </span>
                <span className="grid gap-0.5">
                  <span className="text-sm font-semibold">{item.label}</span>
                  <span className="text-xs text-[var(--portfolio-text-subtle)]">{item.description}</span>
                </span>
                <ArrowUpRight className="size-4 text-[var(--portfolio-text-subtle)] transition-transform duration-150 group-data-highlighted:-translate-y-0.5 group-data-highlighted:translate-x-0.5 group-data-highlighted:text-[var(--portfolio-accent-hover)] motion-reduce:transition-none" aria-hidden="true" />
              </Menu.LinkItem>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
