# Deploy na Vercel — NexShape Site

> **Guia principal Fase 0:** [GO_LIVE_FASE0.md](./GO_LIVE_FASE0.md)  
> Repositório: https://github.com/marcopaival-pixel/paivatechsolutions

## 1. Importar projeto na Vercel

1. Acesse [vercel.com/new](https://vercel.com/new) (login com GitHub).
2. **Import Git Repository** → selecione `marcopaival-pixel/paivatechsolutions`.
3. Configure:

| Campo | Valor |
|-------|-------|
| **Root Directory** | `apps/nexshape-site` |
| **Framework Preset** | Next.js (detectado) |
| **Build Command** | `npm run build` (padrão) |
| **Install Command** | `npm ci` (já em `vercel.json`) |
| **Região** | `gru1` (São Paulo — já em `vercel.json`) |

4. **Antes de Deploy**, adicione as variáveis da seção 2 (mínimo: Upstash + secrets + CRM).
5. Clique **Deploy**.

## 2. Variáveis de ambiente (Production)

Use o template: [vercel-env.production.template.env](./vercel-env.production.template.env)  
Gere secrets: `.\docto\scripts\generate-secrets.ps1`

| Variável | Obrigatória | Exemplo / notas |
|----------|-------------|-----------------|
| `NEXT_PUBLIC_SITE_URL` | Sim | `https://www.seudominio.com.br` (ou URL `.vercel.app` no primeiro deploy) |
| `LEAD_DISPATCH_MODE` | Sim | `webhook` |
| `CRM_WEBHOOK_URL` | Se webhook | URL HTTPS do CRM |
| `CRM_WEBHOOK_ALLOWED_HOSTS` | **Sim em prod** | Hostname (ex.: `hooks.zapier.com`) |
| `CRM_API_KEY` | Opcional | Bearer token |
| `ADMIN_PASSWORD` | **Sim** | Senha forte (≠ `admin123`) |
| `SESSION_SECRET` | **Sim** | String aleatória longa |
| `UPSTASH_REDIS_REST_URL` | **Sim em prod** | [Upstash](https://console.upstash.com) → REST API |
| `UPSTASH_REDIS_REST_TOKEN` | **Sim em prod** | Par da URL acima |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Recomendado | Cloudflare Turnstile |
| `TURNSTILE_SECRET_KEY` | Recomendado | Secret do mesmo widget |
| `NEXT_PUBLIC_CONTACT_WHATSAPP_DISPLAY` | Opcional | `+55 (11) 99999-9999` |
| `NEXT_PUBLIC_CONTACT_WHATSAPP_URL` | Opcional | `https://wa.me/5511999999999` |
| `NEXT_PUBLIC_APP_DOMAIN_PRODUCTION` | Opcional | `paivatech.com.br` |
| `NEXT_PUBLIC_PORTAL_CENTRAL_URL` | Opcional | URL do Portal Central (fallback sidebar admin) |

Preview/Development: use `LEAD_DISPATCH_MODE=noop_preview` ou CRM sandbox.

### Onde criar cada integração

| Serviço | Console |
|---------|---------|
| Upstash Redis | https://console.upstash.com |
| Cloudflare Turnstile | https://dash.cloudflare.com → Turnstile |
| Vercel (deploy) | https://vercel.com |

## 3. Ordem recomendada (primeiro deploy)

1. Criar database **Upstash** (região São Paulo) → copiar URL + token.
2. Gerar `ADMIN_PASSWORD` + `SESSION_SECRET`.
3. Obter URL do **CRM webhook** + hostname para `CRM_WEBHOOK_ALLOWED_HOSTS`.
4. Importar na Vercel com **todas** as variáveis acima.
5. Deploy → anotar URL `*.vercel.app`.
6. Atualizar `NEXT_PUBLIC_SITE_URL` com a URL final → **Redeploy**.

## 4. Domínio customizado

1. Vercel → Project → **Settings → Domains**.
2. Adicionar domínio (ex.: `www.seudominio.com.br`).
3. Configurar DNS (CNAME para `cname.vercel-dns.com` ou registros indicados).
4. Aguardar SSL automático.
5. Atualizar `NEXT_PUBLIC_SITE_URL` → Redeploy.

## 5. Smoke test pós-deploy

```powershell
.\docto\scripts\smoke-prod.ps1 -BaseUrl "https://SEU_DOMINIO"
```

Esperado em `/api/health`:

```json
{ "status": "ok", "storage": { "mode": "redis" } }
```

Formulário: enviar lead de teste; validar no CRM e em `/admin`.

## 6. Monitoramento sugerido

| Ferramenta | Alvo |
|------------|------|
| UptimeRobot / Better Stack | `GET /api/health` a cada 5 min |
| Vercel Analytics | Tráfego e Web Vitals |
| Logs Vercel | Erros 5xx em `/api/contact` |

## 7. Rollback

Vercel → Deployments → **Promote** deployment anterior.

## 8. Checklist

- [ ] Projeto importado de `marcopaival-pixel/paivatechsolutions`
- [ ] Root Directory = `apps/nexshape-site`
- [ ] `LEAD_DISPATCH_MODE=webhook` em Production
- [ ] CRM recebeu lead de teste
- [ ] Upstash configurado (`storage.mode: redis` no health)
- [ ] `ADMIN_PASSWORD` + `SESSION_SECRET` em Production
- [ ] `CRM_WEBHOOK_ALLOWED_HOSTS` definido
- [ ] Turnstile ativo (ambas chaves) ou desligado (nenhuma)
- [ ] `NEXT_PUBLIC_SITE_URL` correto
- [ ] `/robots.txt` e `/sitemap.xml` retornam 200

Relatório de auditoria: [Auditoria_Relatorio.md](./Auditoria_Relatorio.md)
