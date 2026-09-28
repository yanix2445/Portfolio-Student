"use client";

import Image from "next/image";
import { Award } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { Certification } from "../certification.types";
import { certifications } from "../certifications.data";
import styles from "./certification-catalog.module.css";

const filters = ["Tout", "Certifications", "Formations"] as const;
type Filter = (typeof filters)[number];

const filterCounts: Record<Filter, number> = {
  Tout: certifications.length,
  Certifications: certifications.filter((item) => item.kind !== "Formation").length,
  Formations: certifications.filter((item) => item.kind === "Formation").length,
};

function CertificationBadge({ certification, className = "", eager = false }: { certification: Certification; className?: string; eager?: boolean }) {
  if (certification.badge.type === "image") {
    return (
      <Image
        src={certification.badge.src}
        alt={certification.badge.alt}
        width={320}
        height={320}
        loading={eager ? "eager" : "lazy"}
        className={`object-contain ${className}`}
      />
    );
  }

  return (
    <div className={`${styles.textBadge} ${className}`} role="img" aria-label={`Badge ${certification.issuer} ${certification.title}`}>
      <div className="text-center">
        <Award aria-hidden="true" className="mx-auto size-7 text-[var(--home-accent-hover)]" strokeWidth={1.7} />
        <p className="mt-3 text-2xl font-bold tracking-[-0.04em]">{certification.badge.mark}</p>
        <p className="mt-2 text-xs font-semibold tracking-wider text-[var(--home-text-subtle)] uppercase">{certification.issuer}</p>
      </div>
    </div>
  );
}

export function CertificationCatalog() {
  const [filter, setFilter] = useState<Filter>("Tout");
  const [displayedFilter, setDisplayedFilter] = useState<Filter>("Tout");
  const contentRef = useRef<HTMLDivElement>(null);
  const activeAnimation = useRef<Animation | null>(null);
  const transitionId = useRef(0);

  const visible = useMemo(() => certifications.filter((item) => {
    if (displayedFilter === "Tout") return true;
    if (displayedFilter === "Formations") return item.kind === "Formation";
    return item.kind !== "Formation";
  }), [displayedFilter]);

  useEffect(() => () => {
    transitionId.current += 1;
    activeAnimation.current?.cancel();
  }, []);

  const selectFilter = (nextFilter: Filter, animate: boolean) => {
    if (nextFilter === filter) return;

    const shouldAnimate = animate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setFilter(nextFilter);
    transitionId.current += 1;
    const currentTransition = transitionId.current;
    activeAnimation.current?.cancel();
    activeAnimation.current = null;

    const content = contentRef.current;
    if (!shouldAnimate || !content) {
      setDisplayedFilter(nextFilter);
      return;
    }

    const exitAnimation = content.animate(
      [{ opacity: 1 }, { opacity: 0.32 }],
      { duration: 120, easing: "cubic-bezier(0.23, 1, 0.32, 1)", fill: "forwards" },
    );
    activeAnimation.current = exitAnimation;

    void exitAnimation.finished.then(() => {
      if (transitionId.current !== currentTransition) return;

      flushSync(() => setDisplayedFilter(nextFilter));
      const enterAnimation = content.animate(
        [{ opacity: 0.32 }, { opacity: 1 }],
        { duration: 220, easing: "cubic-bezier(0.23, 1, 0.32, 1)", fill: "both" },
      );
      exitAnimation.cancel();
      activeAnimation.current = enterAnimation;
      void enterAnimation.finished.then(() => {
        if (activeAnimation.current === enterAnimation) activeAnimation.current = null;
      }).catch(() => undefined);
    }).catch(() => undefined);
  };

  const featured = visible.find((item) => item.slug === "google-it-support")
    ?? visible.find((item) => item.slug === "anthropic-claude-code-in-action");
  const galleryItems = visible.filter((item) => item.slug !== featured?.slug);
  const technicalItems = galleryItems.filter((item) => item.kind !== "Formation");
  const trainingItems = galleryItems.filter((item) => item.kind === "Formation");

  const renderCards = (items: readonly Certification[]) => items.map((item) => (
    <article key={item.slug} className={item.kind === "Formation" ? styles.badgeCardTraining : styles.badgeCard}>
      <div className={styles.badgeVisual}>
        <CertificationBadge certification={item} className="size-36 sm:size-40" />
      </div>
      <div className={styles.badgeCaption}>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--home-text-subtle)]">
          <span>{item.issuer}</span>
          <span className="tabular-nums">{item.issued}</span>
        </div>
        <h3 className="mt-3 text-2xl leading-8 font-semibold tracking-[-0.03em] text-balance">{item.title}</h3>
        <p className="mt-2 text-sm text-[var(--home-accent-hover)]">{item.kind}</p>
        <p className="mt-4 text-sm leading-6 text-[var(--home-text-muted)] text-pretty">{item.description}</p>
      </div>
    </article>
  ));

  return (
    <div className="portfolio-shell px-4 pb-28 pt-14 sm:px-6 sm:pt-20 lg:pt-24">
      <header className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:gap-20">
        <div className={styles.filterBlock}>
          <h1 className="max-w-[14ch] text-5xl leading-none font-semibold tracking-[-0.04em] text-balance sm:text-6xl">Certifications et formations.</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--home-text-muted)] text-pretty">Des parcours suivis en support informatique, cybersécurité et intelligence artificielle, présentés avec leur organisme et leur contenu.</p>
        </div>
        <div className={styles.filterBlock}>
          <p className="mb-4 text-sm leading-6 text-[var(--home-text-subtle)] lg:text-right">Afficher par type</p>
          <div className={styles.filterBar} role="group" aria-label="Filtrer la galerie">
            {filters.map((item) => (
              <button key={item} type="button" aria-label={`${item} ${filterCounts[item]}`} aria-controls="certification-gallery-results" aria-pressed={filter === item} onClick={(event) => selectFilter(item, event.detail !== 0)} className={styles.filter}>
                <span>{item}</span>
                <span className={styles.filterCount}>{filterCounts[item]}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <section id="certification-gallery-results" className="mt-8" aria-label={`${visible.length} acquis affichés`}>
        <div ref={contentRef}>
          {featured ? (
            <article className={styles.galleryLead}>
              <div className={styles.galleryLeadCopy}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--home-text-subtle)]">
                  <span>{featured.issuer}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featured.kind}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{featured.issued}</span>
                </div>
                <h2 className="mt-5 max-w-[15ch] text-4xl leading-[1.02] font-semibold tracking-[-0.04em] text-balance sm:text-5xl">{featured.title}</h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-[var(--home-text-muted)] text-pretty">{featured.description}</p>
              </div>
              <div className={styles.galleryLeadVisual}>
                <CertificationBadge certification={featured} eager className="size-52 sm:size-60" />
              </div>
            </article>
          ) : null}

          {technicalItems.length > 0 ? (
            <div className={`${styles.galleryGroup} ${featured ? "mt-14" : ""}`}>
              <div className={styles.galleryGroupHeading}>
                <div>
                  <h2 className="text-2xl font-semibold tracking-[-0.03em]">Certifications techniques</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--home-text-subtle)]">Cybersécurité et fondamentaux des infrastructures.</p>
                </div>
                <span>{technicalItems.length} parcours</span>
              </div>
              <div className={`${styles.badgeGallery} mt-6`}>{renderCards(technicalItems)}</div>
            </div>
          ) : null}

          {trainingItems.length > 0 ? (
            <div className={`${styles.galleryGroup} ${featured || technicalItems.length > 0 ? "mt-14" : ""}`}>
              <div className={styles.galleryGroupHeading}>
                <div>
                  <h2 className="text-2xl font-semibold tracking-[-0.03em]">Formations complémentaires</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--home-text-subtle)]">Claude, développement assisté et collaboration responsable avec l’intelligence artificielle.</p>
                </div>
                <span>{trainingItems.length} formations</span>
              </div>
              <div className={`${styles.badgeGallery} mt-6`}>{renderCards(trainingItems)}</div>
            </div>
          ) : null}
        </div>
      </section>

      <div className={styles.galleryFooter}>
        <p role="status" aria-live="polite" aria-atomic="true">
          <span className="sr-only">{displayedFilter} : </span>
          {visible.length} acquis affichés
        </p>
        <p>Les badges sont publics. Les documents PDF originaux restent privés.</p>
      </div>
    </div>
  );
}
