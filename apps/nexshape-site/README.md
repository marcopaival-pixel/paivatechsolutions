# PaivaTech Site

Site institucional do ecossistema **PaivaTech** — Next.js 15 App Router, captura de leads via `POST /api/contact`.

## Requisitos

- Node.js 20+
- npm 10+

## Desenvolvimento

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Guia de teste local (hosts, processos, checklist): [../../docto/TESTE_LOCAL.md](../../docto/TESTE_LOCAL.md).

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento (Turbopack) |
| `npm run build` | Build de produção |
| `npm run start` | Servidor após build |
| `npm run lint` | ESLint |
| `npm run test` | Vitest (unitários) |
| `npm run test:e2e` | Playwright (E2E, porta 3099) |

## Variáveis de ambiente

Ver `.env.example`. Em produção:

- `NEXT_PUBLIC_SITE_URL` — URL canônica
- `LEAD_DISPATCH_MODE=webhook` + `CRM_WEBHOOK_URL`
- `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` — rate limit entre instâncias serverless
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` — CAPTCHA Cloudflare (obrigatório quando ambos definidos)

Sem Upstash, o rate limit usa memória por instância (fallback). Sem Turnstile, o formulário funciona sem widget CAPTCHA.

## Deploy (Vercel)

1. Root directory: `apps/nexshape-site`
2. Framework: Next.js
3. Configurar secrets no painel (nunca commitar `.env.local`)
4. Smoke pós-deploy: `/`, `/contato`, `POST /api/contact`, `/api/health`, `/sitemap.xml`

## Auditoria

Relatório vivo: `../../docto/Auditoria_Relatorio.md`
