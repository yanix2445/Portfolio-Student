# Coding Assertions

## Before commit

| Order | Command | Checks |
| ----- | ------- | ------ |
| 1 | `pnpm lint` | Règles ESLint et conventions Next.js. |

## Before push

| Order | Command | Checks |
| ----- | ------- | ------ |
| 1 | `pnpm build` | Compilation TypeScript et build de production Next.js. |

## Behavior

- Si une assertion échoue, corriger la cause puis relancer la même commande avant de continuer.
