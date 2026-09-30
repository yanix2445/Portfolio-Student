# Testing

## Current state

- Vitest et React Testing Library exécutent les tests de composants dans jsdom.
- `pnpm test` lance le mode interactif; `pnpm test:run` exécute la suite une fois.
- Les tests sont colocalisés avec le code ciblé et utilisent les suffixes `.test.ts` ou `.test.tsx`.
- Playwright reconstruit l'application avec les clés de test officielles Turnstile, un fournisseur Resend isolé et un serveur dédié sur le port 3100.
- Les scénarios E2E couvrent ordinateur et mobile : routes publiques, métadonnées, conversions recruteur, accessibilité, conservation des champs, nouveau challenge Turnstile par tentative et absence de la route prototype.
- `pnpm lint` échoue au premier avertissement applicatif. Les bundles d'outillage `.agent`, `.agents` et `.claude` ne font pas partie du périmètre linté.

## Browser QA

- Entry: lancer `pnpm dev` puis ouvrir `http://localhost:3000`.
- Auth: aucune authentification applicative.
- State: les tests E2E n'utilisent jamais les clés Resend ou Turnstile de production.
- Validation locale complète: `git diff --check`, `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm test:run`, `pnpm build`, puis `pnpm test:e2e`.
