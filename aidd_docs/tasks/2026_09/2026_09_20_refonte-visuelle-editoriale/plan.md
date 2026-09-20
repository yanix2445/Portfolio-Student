---
objective: "Le portfolio présente une identité éditoriale technique, chaleureuse et moderne sur toutes ses pages, avec des médias réels correctement attribués, sans altérer l'authenticité des preuves ni les parcours de conversion."
status: in-progress
---

<!-- Fill or omit these sections; never add, rename, or reorder one. -->

# Plan: Refonte visuelle éditoriale du portfolio

## Overview

| Field      | Value                   |
| ---------- | ----------------------- |
| **Goal**   | Affiner la palette, assouplir les compositions et intégrer des photographies haute définition sans compromettre la crédibilité, l'accessibilité ni les performances. |
| **Source** | [`brainstorm.md`](./brainstorm.md) |

## Phases

| #   | Phase        | File                         |
| --- | ------------ | ---------------------------- |
| 1   | Fondations visuelles et gouvernance des médias | [`phase-1.md`](./phase-1.md) |
| 2   | Accueil éditorial et conversion recruteur | [`phase-2.md`](./phase-2.md) |
| 3   | Pages de preuves, parcours et réalisations | [`phase-3.md`](./phase-3.md) |
| 4   | Certifications et veille magazine | [`phase-4.md`](./phase-4.md) |
| 5   | Validation transverse et mémoire du design | [`phase-5.md`](./phase-5.md) |

## Resources

<!-- External sources only (URLs, docs), not code files. Omit if none consulted. -->

| Source | Verified          |
| ------ | ----------------- |
| https://nextjs.org/docs/app/api-reference/components/image | `next/image` réserve le ratio intrinsèque, optimise les images et requiert `sizes` pour les médias responsives utilisant `fill`. |
| https://unsplash.com/license | Les photographies Unsplash peuvent être utilisées gratuitement, y compris commercialement ; l'attribution reste souhaitable. |
| https://unsplash.com/terms | Les droits associés aux personnes reconnaissables, marques, œuvres et propriétés visibles restent distincts de la licence de la photographie. |

## Decisions

<!-- Architecture-magnitude only, one you'd regret reversing. Omit if none qualify. -->

| Decision   | Why   |
| ---------- | ----- |
| Conserver les médias éditoriaux en fichiers locaux optimisés avec une configuration typée de provenance. | Évite le hotlinking, stabilise le rendu et permet d'afficher clairement la nature illustrative, l'auteur, la source et la licence. |
| Limiter les photographies libres de droits à quatre familles visuelles et réserver les preuves aux contenus authentiques. | Préserve la crédibilité du portfolio et empêche qu'une image générique soit interprétée comme une photo de stage ou une réalisation personnelle. |
| Construire des primitives visuelles partagées pour les introductions et médias éditoriaux. | Garantit une identité cohérente entre les routes sans casser l'architecture par feature ni dupliquer les règles d'accessibilité. |
| Garder les routes, contenus, statuts E5/E6 et appels à l'action existants. | La refonte améliore la hiérarchie et la perception sans réécrire les faits déjà validés ni perturber le SEO. |
