# Produção — www.paivatech.com.br

Referência rápida do ambiente de produção do **nexshape-site**.

| Campo | Valor |
|-------|-------|
| **Domínio canônico** | `https://www.paivatech.com.br` |
| **Repositório** | https://github.com/marcopaival-pixel/paivatechsolutions |
| **Root Vercel** | `apps/nexshape-site` |
| **Região** | `gru1` (São Paulo) |
| **Admin** | https://www.paivatech.com.br/admin/login |
| **Health** | https://www.paivatech.com.br/api/health |

## Variável obrigatória na Vercel

```env
NEXT_PUBLIC_SITE_URL=https://www.paivatech.com.br
```

Sem barra final. Após alterar, **Redeploy** em Production.

## DNS (Registro.br / Cloudflare)

Configure no painel do registrador **e** na Vercel → Project → Settings → Domains.

| Host | Tipo | Valor | Observação |
|------|------|-------|------------|
| `www` | CNAME | `cname.vercel-dns.com` | Domínio principal do site |
| `@` (apex) | A | `76.76.21.21` | Vercel apex — ou redirect `@` → `www` |

Na Vercel, adicione **ambos** se quiser:

- `www.paivatech.com.br` (primário)
- `paivatech.com.br` (redirect para `www` — configurável na Vercel)

Propagação DNS: 15 min a 48 h.

## Smoke test

```powershell
.\docto\scripts\smoke-prod.ps1 -BaseUrl "https://www.paivatech.com.br"
```

Health esperado (com Upstash):

```json
{
  "status": "ok",
  "service": "nexshape-site",
  "storage": { "mode": "redis" }
}
```

## URLs de validação

| URL | Esperado |
|-----|----------|
| https://www.paivatech.com.br/ | 200 |
| https://www.paivatech.com.br/contato | 200 |
| https://www.paivatech.com.br/api/health | 200 + `storage.mode: redis` |
| https://www.paivatech.com.br/robots.txt | 200 |
| https://www.paivatech.com.br/sitemap.xml | 200 |
| https://www.paivatech.com.br/admin/login | 200 (noindex) |

## Redirects de produtos (apps SaaS)

Default em `.env`: `NEXT_PUBLIC_APP_DOMAIN_PRODUCTION=paivatech.com.br`

Exemplo: botão "Acessar sistema" do Fitness pode apontar para `https://fitness.paivatech.com.br` (configurável em `/admin/produtos`).

Hosts permitidos no redirect incluem `paivatech.com.br` por padrão.

## Checklist P0-05 (domínio)

- [ ] Domínio adicionado na Vercel
- [ ] DNS `www` → CNAME Vercel
- [ ] SSL ativo (cadeado verde)
- [ ] `NEXT_PUBLIC_SITE_URL=https://www.paivatech.com.br` na Vercel
- [ ] Redeploy após env vars
- [ ] Smoke script OK

Relacionado: [GO_LIVE_FASE0.md](./GO_LIVE_FASE0.md) · [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md)
