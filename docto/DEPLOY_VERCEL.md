# Deploy na Vercel — NexShape Site

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
| `CRM_WEBHOOK_URL` | Se webhook | URL do CRM |
| `CRM_API_KEY` | Opcional | Bearer token |
| `UPSTASH_REDIS_REST_URL` | Recomendado | Console Upstash |
| `UPSTASH_REDIS_REST_TOKEN` | Recomendado | Par da URL acima |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Recomendado | Cloudflare Turnstile |
| `TURNSTILE_SECRET_KEY` | Recomendado | Secret do mesmo widget |
| `NEXT_PUBLIC_CONTACT_WHATSAPP_DISPLAY` | Opcional | `+55 (11) 99999-9999` |
| `NEXT_PUBLIC_CONTACT_WHATSAPP_URL` | Opcional | `https://wa.me/5511999999999` |

Preview/Development: use `LEAD_DISPATCH_MODE=noop_preview` ou CRM sandbox.

## 3. Domínio

1. Adicionar domínio customizado no projeto Vercel.
2. Configurar DNS (CNAME para `cname.vercel-dns.com` ou registros indicados).
3. Aguardar SSL automático.
4. Confirmar `NEXT_PUBLIC_SITE_URL` igual ao domínio canônico (com `https://`).

## 4. Smoke test pós-deploy

```bash
curl -s https://SEU_DOMINIO/api/health
curl -sI https://SEU_DOMINIO/
curl -s https://SEU_DOMINIO/sitemap.xml | head
```

Formulário: enviar lead de teste com etiqueta QA no CRM.

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
- [ ] Upstash configurado
- [ ] Turnstile ativo (ambas as chaves)
- [ ] `NEXT_PUBLIC_SITE_URL` correto
- [ ] `/robots.txt` e `/sitemap.xml` retornam 200

Relatório de auditoria: [Auditoria_Relatorio.md](./Auditoria_Relatorio.md)
