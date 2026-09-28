---
objective: "La page d'accueil permet à un recruteur d'identifier en quelques secondes le profil, les preuves et la disponibilité de Yanis, puis de réserver un échange depuis une interface moderne, accessible et cohérente."
status: pending
---

# Plan: Refonte de l'accueil tech premium et humain

## Overview

| Field      | Value |
| ---------- | ----- |
| **Goal**   | Reconcevoir l'accueil autour d'une décision recruteur rapide, d'une preuve professionnelle progressive et d'une action principale de prise de rendez-vous. |
| **Source** | Demande utilisateur et brief validé dans la conversation du 20 septembre 2026. |

## Phases

| #   | Phase | File |
| --- | ----- | ---- |
| 1 | Fondations visuelles et mouvement progressif | [`phase-1.md`](./phase-1.md) |
| 2 | Présentation, preuves et compétences | [`phase-2.md`](./phase-2.md) |
| 3 | Expériences, réalisations et certifications | [`phase-3.md`](./phase-3.md) |
| 4 | Veille, objections, conversion et validation | [`phase-4.md`](./phase-4.md) |

## Resources

| Source | Verified |
| ------ | -------- |
| https://nextjs.org/docs/app/getting-started/images | `next/image` conserve des dimensions stables, sert des formats adaptés et permet de prioriser uniquement l'image principale. |
| https://nextjs.org/docs/app/getting-started/fonts | `next/font` auto-héberge les fontes et évite les requêtes externes ainsi que les décalages de mise en page. |
| https://nextjs.org/docs/app/getting-started/server-and-client-components | Les composants restent serveur par défaut et les API du navigateur sont isolées dans de petites frontières clientes. |
| https://nextjs.org/docs/architecture/accessibility | Les titres descriptifs, le lint JSX, les textes alternatifs, les contrastes et `prefers-reduced-motion` restent obligatoires. |

## Decisions

| Decision | Why |
| -------- | --- |
| Limiter la refonte à la feature `home` et à ses styles dédiés. | La direction doit être validée sur l'accueil avant toute propagation aux pages internes ou au shell partagé. |
| Conserver les contenus métier dans les données TypeScript existantes et réutiliser les certifications canoniques. | La refonte change la présentation, pas la source de vérité ni l'architecture sans base de données. |
| Garder les sections en Server Components et isoler les révélations au défilement dans deux composants clients minimaux. | Le HTML utile reste rendu immédiatement tandis que `IntersectionObserver` ne charge du JavaScript que pour les effets visuels nécessaires. |
| Utiliser le rendez-vous Cal.com comme action principale, avec le CV et les preuves comme actions secondaires. | Ce parcours répond directement à l'objectif de permettre au recruteur de décider rapidement s'il contacte Yanis. |
| Conserver la photo personnelle existante comme unique grande image de l'accueil. | Elle est authentique, en haute définition et aucune autre photographie personnelle validée n'est disponible. |
| Comparer trois variantes A, B et C à partir du même hero validé. | La comparaison porte sur la hiérarchie typographique, la densité et la FAQ sans remettre en cause la composition appréciée par Yanis. |
| Partager la palette de la variante Direct entre les trois propositions. | Yanis préfère ce noir franc, cet orange vif et ce contraste plus direct; des tokens sémantiques dédiés évitent les dérives entre variantes. |
| Garder trois traitements de FAQ distincts. | A apporte du contexte recruteur, B privilégie une lecture technique compacte et C transforme les réponses en cartes de décision. |
| Verrouiller le hero de la variante C comme direction définitive. | Yanis a validé explicitement sa composition, ses proportions, sa typographie, la mise en scène de la photo et sa palette; les itérations suivantes ne doivent plus modifier cette section. |
| Verrouiller la FAQ de la variante A comme direction définitive. | Yanis a validé la mise en page en deux colonnes, les trois informations de qualification rapide et l’accordéon numéroté; cette section sera combinée au hero C dans la version finale. |
| Verrouiller le CTA final compact de la variante A. | Yanis a validé le bloc orange après réduction de sa hauteur et resserrement des espaces entre le statut, le titre et les actions; cette densité doit être conservée lors de l’assemblage final. |
| Verrouiller la section unifiée Veille et Newsletter de la variante A. | Yanis a validé le module commun où la veille, sa dernière synthèse et l’accès aux publications occupent la zone principale, tandis que l’inscription par e-mail reste une colonne secondaire intégrée sans grand aplat orange. |
| Verrouiller la section Certifications éditoriale de la variante A avec Google IT Support en preuve principale. | Yanis a validé la hiérarchie composée d’une certification principale, de deux preuves secondaires et d’un ensemble Anthropic commun. L’accueil conserve une sélection courte pilotée par les données, tandis que la page dédiée reste le catalogue extensible pour les prochaines certifications. |
