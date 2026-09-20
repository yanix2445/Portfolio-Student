import Image from "next/image";
import { cn } from "@/shared/lib/cn";
import type { EditorialMedia as EditorialMediaConfig } from "@/shared/config/editorial-media.config";

type EditorialMediaProps = {
  media: EditorialMediaConfig;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  decorative?: boolean;
};

export function EditorialMedia({
  media,
  className,
  imageClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  decorative = false,
}: EditorialMediaProps) {
  return (
    <figure className={cn("group/media", className)}>
      <div className="relative isolate overflow-hidden rounded-[var(--radius-media)] border border-white/10 bg-surface-raised shadow-[var(--shadow-soft)]">
        <Image
          src={media.src}
          width={media.width}
          height={media.height}
          alt={decorative ? "" : media.alt}
          sizes={sizes}
          priority={priority}
          className={cn(
            "size-full object-cover transition duration-700 ease-out group-hover/media:scale-[1.015]",
            imageClassName,
          )}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,transparent_40%,rgb(10_8_6/.4))]"
        />
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.65rem] leading-5 tracking-[0.08em] text-muted-foreground uppercase">
        <span>{media.caption}</span>
        <span aria-hidden="true">·</span>
        <a
          href={media.creditHref}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-white/25 underline-offset-4 transition-colors hover:text-foreground"
        >
          {media.creditLabel}
        </a>
        <span aria-hidden="true">/</span>
        <a
          href={media.licenseHref}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-white/25 underline-offset-4 transition-colors hover:text-foreground"
        >
          {media.licenseLabel}
        </a>
      </figcaption>
    </figure>
  );
}
