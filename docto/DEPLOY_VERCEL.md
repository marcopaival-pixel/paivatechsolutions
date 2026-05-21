# Deploy na Vercel — NexShape Site

> **Guia principal Fase 0:** [GO_LIVE_FASE0.md](./GO_LIVE_FASE0.md) (passo a passo completo).  
> Ordem: [GIT_SETUP.md](./GIT_SETUP.md) → este arquivo → smoke [scripts/smoke-prod.ps1](./scripts/smoke-prod.ps1)

## 1. Criar projeto

| Campo | Valor |
|-------|-------|
| Repositório | `PaivatechSolutions` (monorepo) |
| Root Directory | `apps/nexshape-site` |
| Framework | Next.js (detectado) |
| Região | `gru1` (já em `vercel.json`) |

## 2. Variáveis de ambiente (Production)

Copie do `.env.example` e preencha no painel **Settings → Environment Variables**.

| Variável | Obrigatória | Exemplo / notas |
|----------|-------------|-----------------|
| `NEXT_PUBLIC_SITE_URL` | Sim | `https://www.seudominio.com.br` |
| `LEAD_DISPATCH_MODE` | Sim | `webhook` |
| `CRM_WEBHOOK_URL` | Se webhook | URL do CRM (HTTPS) |
| `CRM_WEBHOOK_ALLOWED_HOSTS` | **Sim em prod** | Hostname da URL (ex.: `hooks.zapier.com`) |
| `CRM_API_KEY` | Opcional | Bearer token |
| `ADMIN_PASSWORD` | **Sim** | Senha forte (≠ `admin123`) |
| `SESSION_SECRET` | **Sim** | String aleatória longa (independente da senha) |
| `UPSTASH_REDIS_REST_URL` | **Sim em prod** | [Upstash](https://console.upstash.com) → REST API |
| `UPSTASH_REDIS_REST_TOKEN` | **Sim em prod** | Par da URL acima |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Recomendado | Cloudflare Turnstile |
| `TURNSTILE_SECRET_KEY` | Recomendado | Secret do mesmo widget |
| `NEXT_PUBLIC_CONTACT_WHATSAPP_DISPLAY` | Opcional | `+55 (11) 99999-9999` |
| `NEXT_PUBLIC_CONTACT_WHATSAPP_URL` | Opcional | `https://wa.me/5511999999999` |

Preview/Development: use `LEAD_DISPATCH_MODE=noop_preview` ou CRM sandbox.

### Onde criar cada integração

| Serviço | Console |
|---------|---------|
| Upstash Redis | https://console.upstash.com |
| Cloudflare Turnstile | https://dash.cloudflare.com → Turnstile |
| Vercel (deploy) | https://vercel.com |

## 3. Domínio

1. Adicionar domínio customizado no projeto Vercel.
2. Configurar DNS (CNAME para `cname.vercel-dns.com` ou registros indicados).
3. Aguardar SSL automático.
4. Confirmar `NEXT_PUBLIC_SITE_URL` igual ao domínio canônico (com `https://`).

## 4. Smoke test pós-deploy

```powershell
.\docto\scripts\smoke-prod.ps1 -BaseUrl "https://SEU_DOMINIO"
```

Ou manualmente:

```bash
curl -s https://SEU_DOMINIO/api/health
```

Esperado: `"storage": { "mode": "redis" }`.

Formulário: enviar lead de teste com etiqueta QA no CRM; validar em `/admin` após login.

## 5. Monitoramento sugerido

| Ferramenta | Alvo |
|------------|------|
| UptimeRobot / Better Stack | `GET /api/health` a cada 5 min |
| Vercel Analytics | Tráfego e Web Vitals |
| Logs Vercel | Erros `502` em `/api/contact` |

## 6. Rollback

Vercel → Deployments → Promote deployment anterior (instant rollback).

## 7. Checklist

- [ ] `LEAD_DISPATCH_MODE=webhook` em Production
- [ ] CRM recebeu lead de teste
- [ ] Upstash configurado (`storage.mode: redis` no health)
- [ ] `ADMIN_PASSWORD` + `SESSION_SECRET` em Production
- [ ] `CRM_WEBHOOK_ALLOWED_HOSTS` definido
- [ ] Turnstile ativo (ambas as chaves) ou desligado (nenhuma)
- [ ] `NEXT_PUBLIC_SITE_URL` correto
- [ ] `/robots.txt` e `/sitemap.xml` retornam 200

## 8. Depois do deploy

- Monitoramento e pendências de negócio: [Auditoria_Relatorio.md — seção 28](./Auditoria_Relatorio.md#28-próximos-passos-go-live) (passos 4 e 5)

Relatório de auditoria: [Auditoria_Relatorio.md](./Auditoria_Relatorio.md)
