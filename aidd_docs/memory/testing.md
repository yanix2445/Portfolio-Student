# Testing

## Current state

- Vitest et React Testing Library exécutent les tests de composants dans jsdom.
- `pnpm test` lance le mode interactif; `pnpm test:run` exécute la suite une fois.
- Les tests sont colocalisés avec le composant ciblé et utilisent le suffixe `.test.tsx`.
- La landing page couvre les destinations Cal.com et e-mail, les ancres internes et sa structure accessible.

## Browser QA

- Entry: lancer `pnpm dev` puis ouvrir `http://localhost:3000`.
- Auth: aucune authentification applicative.
- State: aucune fixture ni procédure de réinitialisation n'existe encore.
