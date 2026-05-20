# Configurar Git (quando `git` estiver instalado no PATH)

```powershell
cd c:\Projetos\PaivatechSolutions
git init
git add .
git commit -m "feat: site NexShape com auditoria, segurança e CI"
```

Conectar ao GitHub:

```powershell
git remote add origin https://github.com/SUA_ORG/PaivatechSolutions.git
git branch -M main
git push -u origin main
```

O workflow `.github/workflows/nexshape-site-ci.yml` roda automaticamente em push/PR que alterem `apps/nexshape-site/`.
