# Portfolio de Yanis Harrat

Portfolio professionnel Next.js de Yanis Harrat, technicien support systèmes et réseaux en BTS SIO SISR.

## Développement local

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

L'application est disponible sur `http://localhost:3000`. En développement, Turnstile utilise automatiquement les clés de test officielles Cloudflare.

## Variables requises

Consultez `.env.example` pour le contrat complet. Les secrets Resend et Turnstile restent côté serveur; seule la clé publique Turnstile porte le préfixe `NEXT_PUBLIC_`.

`TURNSTILE_TEST_MODE=1` est réservé à la suite Playwright. Cette variable ne doit jamais être créée dans Vercel Preview ou Production.

## Validation

```bash
git diff --check
pnpm lint
pnpm exec tsc --noEmit
pnpm test:run
pnpm build
pnpm test:e2e
```

Playwright reconstruit une version de production isolée avec Turnstile de test et sans accès au compte Resend réel.

## Production

- Hébergement et Server Actions : Vercel, projet `yanis`
- Domaine et protection anti-robot : Cloudflare DNS et Turnstile
- Envoi applicatif : Resend
- Réception professionnelle : Infomaniak Mail

Les branches publient une Preview Vercel. La branche `main` publie `https://www.yanis-harrat.com` et `https://yanis-harrat.com`.
