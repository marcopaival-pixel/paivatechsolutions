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

Abra **http://localhost:3000**. Guia completo de hosts e testes locais: [docto/TESTE_LOCAL.md](docto/TESTE_LOCAL.md).

## Auditoria e readiness

- Relatório vivo (v3.0): [docto/Auditoria_Relatorio.md](docto/Auditoria_Relatorio.md)
- **Produção:** [docto/PRODUCAO.md](docto/PRODUCAO.md) — domínio `www.paivatech.com.br`
- **Go-live Fase 0 (passo a passo):** [docto/GO_LIVE_FASE0.md](docto/GO_LIVE_FASE0.md)
- Preflight local: `.\docto\scripts\preflight-go-live.ps1` · Commit: [docto/COMMIT_ANTES_GO_LIVE.md](docto/COMMIT_ANTES_GO_LIVE.md)
- Plano de ação: [docto/Auditoria_Relatorio.md § 27](docto/Auditoria_Relatorio.md#27-plano-de-ação-prioritizado)
- Deploy Vercel: [docto/DEPLOY_VERCEL.md](docto/DEPLOY_VERCEL.md)
- Smoke produção: `.\docto\scripts\smoke-prod.ps1 -BaseUrl "https://seu-dominio"`
- Git / GitHub: [docto/GIT_SETUP.md](docto/GIT_SETUP.md)

## CI

GitHub Actions: `.github/workflows/nexshape-site-ci.yml` (lint, test, build no push/PR do site).
