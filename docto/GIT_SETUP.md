# Git — publicar no GitHub

O repositório **já foi inicializado** localmente em `c:\Projetos\PaivatechSolutions` com commits na branch `master`.

**Go-live completo:** [GO_LIVE_FASE0.md](./GO_LIVE_FASE0.md) · Relatório: [Auditoria_Relatorio.md § 28](./Auditoria_Relatorio.md#28-próximos-passos-go-live)

## 1. Criar repositório no GitHub

1. GitHub → **New repository** → nome sugerido: `PaivatechSolutions`
2. **Não** marque “Add README” (já existe no monorepo)
3. Copie a URL HTTPS, ex.: `https://github.com/SUA_ORG/PaivatechSolutions.git`

## 2. Conectar e enviar

```powershell
cd c:\Projetos\PaivatechSolutions

# Caminho do Git no Windows (se `git` não estiver no PATH):
$git = "C:\Program Files\Git\bin\git.exe"

& $git remote add origin https://github.com/SUA_ORG/PaivatechSolutions.git
& $git branch -M main
& $git push -u origin main
```

Substitua `SUA_ORG` pelo usuário ou organização real.

## 3. Verificar CI

Após o push, abra **Actions** no GitHub. O workflow `nexshape-site CI` deve executar:

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- Lighthouse (advisory, pode falhar sem impactar merge)

## 4. Próximo passo

Deploy na Vercel: [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md)
