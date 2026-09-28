"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, Check, CircleDot, FileText } from "lucide-react";
import { watchArticles, watchSources, watchTopic } from "../tech-watch.data";
import styles from "./watch-hub.module.css";

const routeItems = [
  ["01", "Sujet", "#veille-sujet"],
  ["02", "Pourquoi", "#veille-pourquoi"],
  ["03", "Mise en place", "#veille-methode"],
  ["04", "Sources", "#veille-sources"],
  ["05", "Articles", "#veille-articles"],
] as const;

const sourceCategoryLabels: Record<string, string> = {
  "Référentiels": "Documentations officielles",
  "Écosystème IA": "Outils et éditeurs IA suivis",
  "Retours techniques": "Actualités et retours d’expérience",
};

const watchPresentation = {
  reason:
    "J’ai choisi ce thème parce que l’intelligence artificielle entre directement dans les outils de développement que j’utilise et modifie déjà la manière de rechercher, coder, tester et diagnostiquer. Je veux comprendre ce qu’elle apporte réellement, sans confondre nouveauté, promesse et pratique fiable.",
  connection:
    "Le sujet relie mon intérêt pour le développement web à mes compétences en systèmes et réseaux : intégration côté serveur, protection des secrets, contrôle des accès, journalisation et maintien d’une validation humaine.",
  goal:
    "L’objectif n’est pas de suivre chaque annonce. Il est d’identifier les évolutions assez solides pour changer une pratique, puis d’en expliquer les bénéfices, les limites et les conditions d’usage.",
} as const;

const watchObjectives = [
  {
    title: "Comprendre les usages réels",
    text: "Observer comment l’IA intervient dans la conception, le code, le diagnostic et la maintenance.",
  },
  {
    title: "Garder la maîtrise technique",
    text: "Vérifier les frontières serveur-client, la protection des secrets et la place de la revue humaine.",
  },
  {
    title: "Transformer l’information en pratique",
    text: "Relier chaque évolution à un cas concret plutôt qu’à une simple annonce produit.",
  },
] as const;

const setupSteps = [
  {
    number: "01",
    title: "Cadre de recherche",
    text: "Une question centrale fixe le périmètre : les usages de l’IA qui touchent réellement au développement et à l’exploitation d’une application.",
  },
  {
    number: "02",
    title: "Collecte manuelle",
    text: "Chaque semaine, je consulte les documentations officielles et les publications techniques des éditeurs suivis.",
  },
  {
    number: "03",
    title: "Grille de vérification",
    text: "Je contrôle l’origine, la stabilité, l’impact concret et les limites de chaque information avant de la conserver.",
  },
  {
    number: "04",
    title: "Synthèse publiée",
    text: "Quand un enseignement est vérifiable, je le reformule, je cite les sources consultées et j’explicite mon analyse.",
  },
] as const;

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function WatchHub() {
  const latest = [...watchArticles].reverse()[0];
  const categories = Array.from(new Set(watchSources.map((source) => source.category)));
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const sections = routeItems
      .map(([, , href]) => document.querySelector(href))
      .filter(Boolean) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveStep(sections.indexOf(visible.target));
      },
      { rootMargin: "-20% 0px -55%", threshold: [0.1, 0.35, 0.7] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className={`${styles.watchPage} portfolio-surface`}>
      <section className={`${styles.routeHero} ${styles.enter}`} id="veille-sujet" aria-labelledby="veille-title">
        <div className={styles.routeHeroMain}>
          <h1 id="veille-title">Comprendre ce que l’IA change vraiment dans le développement.</h1>
          <p className={styles.heroQuestion}>{watchTopic.question}</p>
          <div className={styles.heroActions}>
            <a className={styles.secondaryButton} href="#veille-pourquoi">Découvrir ma démarche <ArrowDown aria-hidden="true" /></a>
            <Link className={styles.primaryButton} href="/veille/articles">Voir les articles <ArrowRight aria-hidden="true" /></Link>
          </div>
          <dl className={styles.proofStrip}>
            <div><dt>synthèses publiées</dt><dd>{String(watchArticles.length).padStart(2, "0")}</dd></div>
            <div><dt>sources présentées</dt><dd>{String(watchSources.length).padStart(2, "0")}</dd></div>
            <div><dt>revue par semaine</dt><dd>1×</dd></div>
          </dl>
        </div>
        <nav className={styles.routeMap} aria-label="Parcours de la page">
          <p>Parcours de lecture</p>
          <ol data-step={activeStep}>
            {routeItems.map(([number, label, href], index) => (
              <li key={number} data-active={index === activeStep ? "" : undefined}>
                <a href={href} aria-current={index === activeStep ? "location" : undefined}><span>{number}</span>{label}</a>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      <section className={styles.routeFeature} id="veille-pourquoi" aria-labelledby="veille-why-title">
        <article className={styles.routeLatest}>
          <div className={styles.routeLatestMeta}><span>Point de départ</span><span>Développement · systèmes · sécurité</span></div>
          <div className={styles.routeLatestBody}>
            <div><h2 id="veille-why-title">Un sujet au croisement de mes pratiques.</h2><p>{watchPresentation.reason}</p></div>
            <ol aria-label="Ce que ce sujet me permet d’étudier">
              <li><span>01</span>{watchPresentation.connection}</li>
              <li><span>02</span>{watchPresentation.goal}</li>
            </ol>
          </div>
        </article>
        <div className={styles.objectiveRail}>
          {watchObjectives.map((objective, index) => (
            <article key={objective.title}><span>0{index + 1}</span><div><h3>{objective.title}</h3><p>{objective.text}</p></div></article>
          ))}
        </div>
      </section>

      <section className={styles.routeMethod} id="veille-methode" aria-labelledby="veille-method-title">
        <header><div aria-hidden="true" /><div><h2 id="veille-method-title">Une routine simple, répétable et vérifiable.</h2><p>{watchTopic.cadence}</p></div></header>
        <ol className={styles.methodTrack}>
          {setupSteps.map((step) => (
            <li key={step.number}><span>{step.number}</span><CircleDot aria-hidden="true" /><div><h3>{step.title}</h3><p>{step.text}</p></div></li>
          ))}
        </ol>
        <ul className={styles.criteriaList}>
          {watchTopic.selectionCriteria.map((criterion) => <li key={criterion}><Check aria-hidden="true" />{criterion}</li>)}
        </ul>
      </section>

      <section className={styles.routeSources} id="veille-sources" aria-labelledby="veille-sources-title">
        <header>
          <h2 id="veille-sources-title">Une information n’entre dans la veille qu’avec une provenance.</h2>
          <p>Cette sélection n’est pas exhaustive : elle présente quelques sources de référence. Le registre évolue avec les documentations, outils, éditeurs, actualités et retours d’expérience consultés au fil de ma veille.</p>
        </header>
        <div className={styles.sourceRegistry}>
          {categories.map((category) => (
            <section key={category} aria-labelledby={`sources-${category.replaceAll(" ", "-")}`}>
              <h3 id={`sources-${category.replaceAll(" ", "-")}`}>{sourceCategoryLabels[category] ?? category}</h3>
              <ul>
                {watchSources.filter((source) => source.category === category).map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noreferrer"><span><strong>{source.name}</strong><small>{source.publisher}</small></span><ArrowUpRight aria-hidden="true" /></a>
                    <p>{source.rationale}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className={styles.presentationOutcome} id="veille-articles" aria-labelledby="veille-articles-title">
        <div><FileText aria-hidden="true" /><h2 id="veille-articles-title">Des articles qui montrent le raisonnement, pas seulement la conclusion.</h2><p>Chaque publication présente la question étudiée, les enseignements retenus, mon analyse, les limites identifiées et les sources utilisées.</p><Link className={styles.darkButton} href="/veille/articles">Voir tous les articles <ArrowRight aria-hidden="true" /></Link></div>
        <article><span>Dernière synthèse · {dateFormatter.format(new Date(latest.publishedAt))}</span><h3>{latest.title}</h3><p>{latest.excerpt}</p><Link className={styles.textLink} href={`/veille/${latest.slug}`}>Lire la synthèse <ArrowRight aria-hidden="true" /></Link></article>
      </section>

      <aside className={styles.endNote}><span>Fin du parcours</span><a href="#veille-sujet">Revenir au sujet <ArrowUp aria-hidden="true" /></a></aside>
    </main>
  );
}
