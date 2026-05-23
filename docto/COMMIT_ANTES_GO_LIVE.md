# Commit recomendado antes do go-live

Há alterações locais **não commitadas** (admin settings/Portal Central, auditoria v3.0, docs). Execute após o preflight passar.

> **Preflight 22/05/2026:** typecheck, 62 testes Vitest e build OK; `db.json` não rastreado pelo Git.

## 1. Preflight

```powershell
cd c:\Projetos\PaivatechSolutions
.\docto\scripts\preflight-go-live.ps1
```

## 2. Gerar secrets (guardar offline)

```powershell
.\docto\scripts\generate-secrets.ps1
```

Use os valores em [vercel-env.production.template.env](./vercel-env.production.template.env) na Vercel — **não** commite o arquivo preenchido.

## 3. Git (PowerShell)

```powershell
$git = "C:\Program Files\Git\bin\git.exe"
cd c:\Projetos\PaivatechSolutions

# Se db.json foi commitado no passado:
# & $git rm --cached apps/nexshape-site/db.json

& $git add apps/nexshape-site/
& $git add .github/
& $git add docto/
& $git add README.md

# NÃO adicionar:
# apps/nexshape-site/db.json
# apps/nexshape-site/tmp-cookies.txt
# readonly-test.json
# vercel-env.production.template.env (se preenchido com secrets)

& $git status

& $git commit -m "$(@'
feat(nexshape-site): Portal Central settings API, audit v3.0 and go-live prep

Add /admin/api/settings, Portal Central in dashboard, document env var,
fix ESLint in admin layout, and update audit report to v3.0 with preflight OK.
'@)"

# Primeira vez no GitHub:
# & $git remote add origin https://github.com/SUA_ORG/PaivatechSolutions.git
# & $git branch -M main
# & $git push -u origin main
```

## 4. Continuar go-live

[GO_LIVE_FASE0.md](./GO_LIVE_FASE0.md) a partir do §2 (Upstash), se o push já foi feito.
