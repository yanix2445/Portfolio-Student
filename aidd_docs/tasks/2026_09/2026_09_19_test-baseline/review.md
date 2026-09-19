# Review: Base de tests de la landing page

- **Verdict**: approve
- **Diff**: `HEAD...working-tree`
- **Axes run**: code, functional, relevancy
- **Date**: 2026_09_19
- **Findings**: 0 critical, 0 warning, 0 minor

## Phases

### Phase 1 — Base de tests de la landing page

- [x] Les deux CTA de réservation ciblent le créneau Cal.com de 30 minutes et ouvrent un nouvel onglet sécurisé — `src/features/home/components/portfolio-landing.test.tsx:7`
- [x] Le contact utilise l'adresse professionnelle attendue — `src/features/home/components/portfolio-landing.test.tsx:24`
- [x] Les liens de navigation ciblent des sections présentes — `src/features/home/components/portfolio-landing.test.tsx:32`
- [x] La structure accessible expose un titre principal unique, une navigation nommée et les titres de section — `src/features/home/components/portfolio-landing.test.tsx:57`
- [ ] Les styles et l'intégralité des textes sont testés — not-applicable : volontairement exclus pour éviter des tests fragiles.

## Findings

| Sev | Kind | Phase | Location | Issue | Fix |
| --- | ---- | ----- | -------- | ----- | --- |
| — | — | — | — | None. | — |

## Verification

| Metric | Value |
| --- | --- |
| Verified | 80% (4/5) |
| Files checked | `package.json`, `pnpm-lock.yaml`, `vitest.config.mts`, `vitest.setup.ts`, `src/features/home/components/portfolio-landing.tsx`, `src/features/home/components/portfolio-landing.test.tsx`, `aidd_docs/memory/testing.md`, `aidd_docs/memory/coding-assertions.md` |
| Unchecked | Styles et intégralité des textes — not-applicable |
| Unplanned | Ajout du libellé accessible du CTA Cal.com; alignement de `@types/node` sur Node.js 24; mise à jour de la mémoire de tests |
