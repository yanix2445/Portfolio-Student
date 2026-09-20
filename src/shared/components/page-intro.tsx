import type { ReactNode } from "react";
import { EditorialMedia } from "@/shared/components/editorial-media";
import type { EditorialMedia as EditorialMediaConfig } from "@/shared/config/editorial-media.config";
import { cn } from "@/shared/lib/cn";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  media?: EditorialMediaConfig;
  mediaClassName?: string;
  className?: string;
};

export function PageIntro({
  eyebrow,
  title,
  description,
  actions,
  media,
  mediaClassName,
  className,
}: PageIntroProps) {
  return (
    <header className={cn("page-shell page-section", className)}>
      <div
        className={cn(
          "page-intro",
          media && "lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,.72fr)]",
        )}
      >
        <div className="self-end">
          <p className="section-label">{eyebrow}</p>
          <h1 className="mt-6 max-w-5xl text-5xl leading-[0.94] font-medium tracking-[-0.055em] text-balance sm:text-7xl lg:text-[5.75rem]">
            {title}
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
            {description}
          </p>
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {media ? (
          <EditorialMedia
            media={media}
            className={cn("mt-10 lg:mt-0", mediaClassName)}
            imageClassName="aspect-[4/3]"
          />
        ) : null}
      </div>
    </header>
  );
}
