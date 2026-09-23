---
target: src/app/page.tsx
total_score: 23
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 1
target_identity: "file:/Users/yanis/Developer/CODEX/portfolio/src/app/page.tsx"
target_fingerprint: "sha256:ddb63265b8db905fe0b85575e6e2e8bdcb2a1414e86144fbcba7fa2cc8f42599"
target_path: /Users/yanis/Developer/CODEX/portfolio/src/app/page.tsx
timestamp: 2026-09-22T17-40-15Z
slug: src-app-page-tsx
---
Method: dual-agent (A: d52fd6c4-bb85-48d3-a49a-2799da429fef · B: adc90369-2550-4ee8-9ec9-554dcb4a573d)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | Statut de disponibilité vert clair, mais absence d'indicateur de position active (scrollspy) lors du défilement. |
| 2 | Match System / Real World | 2/4 | Jargon académique hermétique (« Épreuve E5 », « Épreuve E6 ») et vocabulaire Web Dev omniprésent au détriment du lexique SISR. |
| 3 | User Control and Freedom | 2/4 | Menu mobile `<details>` sans fermeture automatique au clic d'ancre ou extérieur ; liens Cal.com ouvrant un onglet externe sans avertissement. |
| 4 | Consistency and Standards | 2/4 | Icônes `ArrowUpRight` (liens externes) utilisées pour la navigation interne (`/epreuves/e6`) ; mélange d'ancres locales et de routes dans le header. |
| 5 | Error Prevention | 3/4 | Lien `mailto:` direct qui échoue silencieusement ou ouvre une invite non désirée sur un poste d'entreprise sans client de messagerie configuré. |
| 6 | Recognition Rather Than Recall | 2/4 | Les acronymes E5/E6 obligent le visiteur à un effort de mémoire permanent ; compétences déconnectées visuellement des fiches projets correspondantes. |
| 7 | Flexibility and Efficiency of Use | 2/4 | Lien d'évitement accessible présent, mais aucun filtre par domaine métier (Système, Réseau, Support) pour le jury ou le recruteur pressé. |
| 8 | Aesthetic and Minimalist Design | 2/4 | Typographie Cormorant Garamond inadaptée au domaine technique ; répétition de grilles monochromes à bordures 1px ; présence d'un projet factice non rédigé. |
| 9 | Error Recovery | 3/4 | Page 404 fonctionnelle et contextualisée. |
| 10 | Help and Documentation | 2/4 | Aucune précision contextuelle sur les modalités de l'alternance (rythme école/entreprise, date de démarrage, disponibilité géographique). |
| **Total** | | **23/40** | **Acceptable (57.5%) — Des améliorations substantielles sont requises pour convaincre un jury BTS et des DSI.** |

---

## Design Specificity Verdict

### Verdict Global : Dissonance Identitaire Majeure (Template d'agence créative plaqué sur un profil Technicien Systèmes & Réseaux)

**Évaluation LLM non ancrée :**
Le site souffre d'un profond contresens entre le métier revendiqué (*« Technicien support systèmes et réseaux »*) et la grammaire visuelle et éditoriale déployée :
1. **Typographie anachronique :** L'usage de **Cormorant Garamond** (sérif humaniste du XVIe siècle) avec un crénage ultra-serré (`tracking-[-0.07em]`) pour les titres H1/H2 évoque une marque de cosmétiques ou une revue littéraire, à l'opposé de la rigueur, de la clarté et de l'ingénierie attendues d'un futur administrateur réseau.
2. **Fuite vers le Web Dev et l'IA générique :** La section *Projets* n'expose qu'un unique travail : son propre portfolio en Next.js/React. La *Veille technologique* porte sur « L'IA appliquée au développement web et applicatif ». Dans les compétences, le développement web occupe un statut majeur. Pour un jury BTS SISR ou un responsable d'infrastructure, le profil ressemble à un étudiant SLAM (développeur) égaré, masquant ses compétences réelles en réseaux (VLANs, OPNsense, AD, DNS, GLPI).
3. **Absence des artefacts de l'infrastructure :** Pas de schémas de topologie réseau, pas d'indicateurs de statut (ping, SLA, uptime), pas d'extraits de scripts PowerShell/Bash ou de terminaux documentés. L'identité se résume à une grille abstraite SaaS et des cartes sombres uniformes.

**Scan Déterministe CLI :**
- **Cible :** `src/app/page.tsx`, `src/features/home/components/`, `src/shared/components/site-header.tsx`, `src/shared/components/site-footer.tsx` (11 composants audités).
- **Résultats :** 0 finding primaire, 0 advisory, code de sortie `0`.
- **Analyse :** Le code est syntaxiquement propre et respecte les règles structurelles de base (aucun composant non sécurisé, pas d'em-dash excessif, pas d'animations CSS désuètes). Toutefois, le moteur statique ne valide pas la cohérence contextuelle métier, le choix typographique ni la pertinence du lexique disciplinaire.

**Preuve Visuelle & Navigateur :**
*Signal de repli :* Visualisation navigateur non disponible dans cet environnement (aucun outil de pilotage navigateur de type Chrome DevTools ou Puppeteer connecté). L'inspection visuelle et structurelle a été menée directement sur les arbres de composants React et les styles Tailwind associés.

---

## Overall Impression

Une base technique React/Next.js propre, accessible et sémantique, mais une interface prisonnière d'une contradiction : le candidat possède d'excellentes expériences de terrain réelles (GLPI, Zendesk, VPN, migration cloud, VLANs OPNsense), mais le design et le contenu les dissimulent sous une coquille d'agence web et un labyrinthe d'acronymes scolaires. Le potentiel est élevé si l'on redonne au site son ADN d'ingénierie système.

---

## What's Working

1. **La crédibilité opérationnelle des missions en entreprise (E5) :** Les fiches de stage (EDLearn et Secours Catholique) sont exemplaires : problématiques réelles, volume d'utilisateurs, outils du métier (GLPI, migration cloud, VPN). C'est le cœur de valeur du profil.
2. **La clarté du statut de recrutement dès le Hero :** Le badge clignotant de disponibilité immédiate combiné à la mention géographique *« Paris et toute l’Île-de-France · Alternance ou CDI »* donne aux recruteurs les critères d'embauche essentiels en 2 secondes.
3. **Une structure technique et accessible saine :** Balisage HTML5 sémantique (`<main>`, `<header>`, `<article>`), respect de `prefers-reduced-motion`, métadonnées OpenGraph et données structurées JSON-LD Profile intégrées.

---

## Priority Issues

### [P0] Remplacer Cormorant Garamond par une typographie d'ingénierie système
- **Pourquoi :** Une sérif littéraire précieuse discrédite l'image de rigueur technique d'un futur administrateur systèmes et réseaux auprès des directeurs techniques et jurys.
- **Fix :** Basculer les titres vers une typographie sans-serif technique robuste (ex. **Geist Sans** avec un `font-weight: 600-700` ou **Space Grotesk** / **Inter**) et valoriser **Geist Mono** pour les adresses IP, commandes CLI, VLANs et spécifications matérielles.
- **Commande recommandée :** `/impeccable typeset`

### [P1] Traduire le jargon académique (« E5 / E6 ») en intitulés métier compréhensibles
- **Pourquoi :** Les recruteurs RH ne connaissent pas la nomenclature de l'Éducation Nationale et passent à côté de vos compétences concrètes en support et administration réseau.
- **Fix :** Adopter un double étiquetage pédagogique :  
  - Pour E5 : `Missions en entreprise` avec sous-titre/badge `Support & Services (Épreuve BTS E5)`.  
  - Pour E6 : `Infrastructures & Automatisation` avec badge `Administration Systèmes & Réseaux (Épreuve BTS E6)`.
- **Commande recommandée :** `/impeccable clarify`

### [P2] Éliminer le projet vide en E6 et réaligner la vitrine Projets & Veille sur le SISR
- **Pourquoi :** Afficher *« Seconde réalisation professionnelle — Le périmètre détaillé sera publié dès que... »* expose un portfolio inachevé au jury BTS. Présenter un portfolio web en unique projet et une veille sur le dev applicatif fait passer le candidat pour un profil SLAM (développeur).
- **Fix :** Retirer le placeholder vide en E6 (ou documenter un lab concret) ; remplacer le projet portfolio web par un projet d'infrastructure (lab Active Directory, pare-feu OPNsense, supervision Zabbix) ; réorienter la veille vers les infrastructures et la sécurité.
- **Commande recommandée :** `/impeccable distill`

### [P3] Désengorger le Hero du paradoxe du choix (4 CTAs concurrents)
- **Pourquoi :** 4 boutons côte à côte au premier écran (« Voir mes réalisations », « Prendre rendez-vous », « Me contacter », « Télécharger mon CV ») diluent l'attention et réduisent le taux de passage à l'action.
- **Fix :** Réduire le Hero à **2 boutons prioritaires** :  
  1. Action principale : `Découvrir mes réalisations` (ancre vers les missions terrain).  
  2. Action secondaire : `Télécharger le CV (PDF)` avec indication du poids/format.  
  Regrouper Cal.com et le contact direct dans un module unifié en fin de page.
- **Commande recommandée :** `/impeccable polish`

### [P4] Rompre la monotonie des grilles uniformes et enrichir l'identité réseau
- **Pourquoi :** 8 sections d'affilée construites sur le même moule de boîtes noires à bordure 1px créent une fatigue visuelle rapide et un manque de relief.
- **Fix :** Structurer la section E5 sous forme de journal d'intervention technique ; intégrer un schéma de topologie réseau visuel pour le projet E6 ; remplacer l'aplat orange criard du CTA final par un bloc texturé élégant.
- **Commande recommandée :** `/impeccable layout`

---

## Persona Red Flags

### Jordan — Chargée de recrutement RH (30 secondes d'attention)
- **Alerte :** Voit les mentions brutes « Épreuve E5 » et « Épreuve E6 » sans comprendre s'il s'agit de stages en entreprise ou d'exercices scolaires.
- **Alerte :** Ne trouve nulle part le rythme de l'alternance (ex. *3 jours entreprise / 2 jours école*) pour valider l'adéquation avec le calendrier de son entreprise.
- **Alerte :** Clique sur « Me contacter » depuis son navigateur d'entreprise : l'ouverture automatique d'Outlook échoue silencieusement ou génère une erreur.

### Riley — Membre du Jury BTS SIO SISR (Évaluateur technique intransigeant)
- **Alerte :** Découvre en section E6 la carte « Seconde réalisation professionnelle » avec un texte de chantier déclarant le document manquant.
- **Alerte :** Constate que l'unique réalisation de la section Projets est un site web React/Next.js et que la veille porte sur le dev applicatif, pénalisant la conformité au référentiel SISR.
- **Alerte :** L'icône de lien externe `ArrowUpRight` est utilisée pour naviguer vers la page interne de détail E6 (`/epreuves/e6/...`).

### Casey — Recruteur technique sur smartphone (En déplacement)
- **Alerte :** Le menu mobile accordéon (`<details>`) ne se referme pas automatiquement après avoir cliqué sur un lien d'ancrage, masquant la page sous le panneau de navigation.
- **Alerte :** Les 4 boutons du Hero s'empilent et repoussent le contenu informatif sous la ligne de flottaison.
- **Alerte :** Le bandeau de preuves chiffrées (« 2 », « 6 », « 2 », « 6 ») présente des bordures hachées et asymétriques sur petit écran.

---

## Minor Observations

1. **Navigation du Header :** Mélange d'ancres locales (`/#competences`, `/#e5`) et de routes complètes (`/veille`), créant des comportements hétérogènes lors du clic selon la page courante.
2. **Accessibilité du logo mobile :** Sur écran < 640px, le nom complet est masqué et le monogramme porte `aria-hidden="true"`, ne laissant aucun libellé textuel pour l'accueil.
3. **Hiérarchie des certifications :** Un webinaire d'une heure (« Claude 101 ») a le même poids visuel qu'une certification Google Cyber de 6 mois.
4. **Contraste WCAG :** Textes secondaires en `text-white/40` ou `text-white/35` (`~3.0:1` à `3.7:1`) sous le seuil minimal de lisibilité de 4.5:1.

---

## Questions to Consider

1. *« Si un DSI ou un responsable d'infrastructure atterrit sur ton site sans lire ton nom, qu'est-ce qui le convainc en 5 secondes qu'il visite le profil d'un futur administrateur réseau plutôt que celui d'un développeur web junior ? »*
2. *« Pourquoi ton unique projet personnel et ta veille technologique traitent-ils de développement web React et d'IA applicative, alors que ton diplôme d'État et ton futur métier sont dédiés à la résilience des infrastructures et à la cybersécurité ? »*
3. *« Si tu retirais les codes académiques "BTS SIO", "E5" et "E6", est-ce qu'un recruteur RH comprendrait immédiatement que tu as déjà administré des parcs sous GLPI, déployé des VPN et migré des serveurs d'impression en production ? »*
