# PaivaTech Solutions (monorepo)

| Pasta | Descrição |
|-------|-----------|
| `apps/nexshape-site` | Site institucional Suite NexShape (Next.js 15) |
| `Fabrica` | System Builder / Audit / Evolution — specs JSON + validação |
| `docto` | Documentação e relatório de auditoria |

## Início rápido (site)

```bash
cd apps/nexshape-site
npm install
cp .env.example .env.local
npm run dev
```

## Auditoria e readiness

Relatório vivo: [docto/Auditoria_Relatorio.md](docto/Auditoria_Relatorio.md)

## CI

GitHub Actions: `.github/workflows/nexshape-site-ci.yml` (lint, test, build no push/PR do site).
