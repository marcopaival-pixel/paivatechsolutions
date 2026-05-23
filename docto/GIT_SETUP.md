# Git — publicar no GitHub

Repositório remoto configurado:

| Campo | Valor |
|-------|-------|
| **URL** | https://github.com/marcopaival-pixel/paivatechsolutions |
| **Branch** | `master` (tracking `origin/master`) |
| **Último push** | `65468a7` — Portal Central, auditoria v3.0 |

**Go-live completo:** [GO_LIVE_FASE0.md](./GO_LIVE_FASE0.md) · Relatório: [Auditoria_Relatorio.md § 28](./Auditoria_Relatorio.md#28-próximos-passos-go-live)

## CI no GitHub

Após cada push em `apps/nexshape-site/**`, o workflow **nexshape-site CI** executa:

- `npm run lint`
- `npm run typecheck`
- `npm run test` (62 casos Vitest)
- `npm run test:e2e` (advisory)
- `npm run build`
- Lighthouse + npm audit (advisory)

Acompanhe em: https://github.com/marcopaival-pixel/paivatechsolutions/actions

## Comandos úteis (PowerShell)

```powershell
$git = "C:\Program Files\Git\bin\git.exe"
cd c:\Projetos\PaivatechSolutions

& $git status
& $git push origin master
```

## Próximo passo

Deploy na Vercel: [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md)
