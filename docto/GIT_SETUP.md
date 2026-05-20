# Git — repositório local

O repositório já foi inicializado com commit inicial. Para conectar ao remoto:

Conectar ao GitHub:

```powershell
git remote add origin https://github.com/SUA_ORG/PaivatechSolutions.git
git branch -M main
git push -u origin main
```

O workflow `.github/workflows/nexshape-site-ci.yml` roda automaticamente em push/PR que alterem `apps/nexshape-site/`.
