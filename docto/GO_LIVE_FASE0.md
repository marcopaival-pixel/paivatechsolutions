# Go-live — Fase 0 (operacional)

Guia executável para colocar o **nexshape-site** em produção. O código e os testes (Vitest + Playwright) já estão prontos; esta fase é **configuração de contas, secrets e DNS**.

| Ordem | Passo | Tempo estimado | Doc |
|-------|--------|----------------|-----|
| 1 | Publicar no GitHub | 15–30 min | [§ 1](#1-github--push-do-código) |
| 2 | Criar Upstash Redis | 10 min | [§ 2](#2-upstash-redis-obrigatório-em-produção) |
| 3 | Configurar CRM webhook | 15–30 min | [§ 3](#3-crm-webhook) |
| 4 | Gerar secrets admin | 5 min | [§ 4](#4-secrets-do-painel-admin) |
| 5 | Deploy na Vercel | 20–40 min | [§ 5](#5-vercel--variáveis-de-ambiente) |
| 6 | Domínio e SSL | 15 min + propagação DNS | [§ 6](#6-domínio-e-ssl) |
| 7 | Smoke test | 15 min | [§ 7](#7-smoke-test-obrigatório) |
| 8 | Monitoramento | 10 min | [§ 8](#8-monitoramento) |

Relatório técnico completo: [Auditoria_Relatorio.md](./Auditoria_Relatorio.md) (v3.0).

---

## 0. Preflight local (antes de tudo)

```powershell
cd c:\Projetos\PaivatechSolutions
.\docto\scripts\preflight-go-live.ps1
.\docto\scripts\generate-secrets.ps1   # copiar ADMIN_PASSWORD e SESSION_SECRET
```

Commit pendente: [COMMIT_ANTES_GO_LIVE.md](./COMMIT_ANTES_GO_LIVE.md)  
Template Vercel (vazio): [vercel-env.production.template.env](./vercel-env.production.template.env)

---

## Pré-requisitos

- Conta [GitHub](https://github.com)
- Conta [Vercel](https://vercel.com) (login com GitHub)
- Conta [Upstash](https://console.upstash.com) (plano free cobre MVP)
- URL de webhook do seu CRM (Zapier, Make, HubSpot, RD Station, etc.)
- Opcional: [Cloudflare](https://dash.cloudflare.com) para Turnstile (CAPTCHA)
- Domínio registrado (ex.: Registro.br, Cloudflare)

**Antes do push:** confirme que `apps/nexshape-site/db.json` **não** será commitado (está no `.gitignore`). Se já foi versionado:

```powershell
cd c:\Projetos\PaivatechSolutions
git rm --cached apps/nexshape-site/db.json
git commit -m "chore: stop tracking local db.json with PII"
```

---

## 1. GitHub — push do código

Detalhes: [GIT_SETUP.md](./GIT_SETUP.md)

```powershell
cd c:\Projetos\PaivatechSolutions

$git = "C:\Program Files\Git\bin\git.exe"  # se `git` não estiver no PATH

# Criar repo vazio no GitHub (sem README), depois:
& $git remote add origin https://github.com/SUA_ORG/PaivatechSolutions.git
& $git branch -M main
& $git push -u origin main
```

### Critério de saída

- [ ] Repositório visível no GitHub
- [ ] Workflow **nexshape-site CI** verde em Actions (lint, typecheck, test, build)

---

## 2. Upstash Redis (obrigatório em produção)

Sem Redis na Vercel, leads ficam em `/tmp` e **somem** a cada redeploy.

### Passo a passo

1. Acesse [console.upstash.com](https://console.upstash.com) → **Create Database**
2. Nome sugerido: `nexshape-site-prod`
3. Região: **South America (São Paulo)** ou mais próxima da Vercel `gru1`
4. Tipo: Regional (suficiente para o site)
5. Após criar, abra a database → aba **REST API**
6. Copie:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

Guarde em um gerenciador de senhas (1Password, Bitwarden, etc.) — **não** commite no Git.

### Critério de saída (após deploy)

```powershell
curl -s https://SEU_DOMINIO/api/health
```

JSON esperado (trecho):

```json
{
  "status": "ok",
  "service": "nexshape-site",
  "storage": { "mode": "redis" }
}
```

Se `storage.mode` for `file` ou `unavailable`, Redis não está configurado corretamente na Vercel.

---

## 3. CRM webhook

### 3.1 Obter URL do webhook

Exemplos por ferramenta:

| CRM / automação | Onde pegar a URL |
|-----------------|------------------|
| Zapier | Zap → Webhooks by Zapier → Catch Hook |
| Make (Integromat) | Cenário → módulo Webhook customizado |
| HubSpot | Workflows → Webhook action |
| RD Station / outros | Documentação do conector “entrada via POST JSON” |

O endpoint deve aceitar **POST** com corpo **JSON**.

### 3.2 Payload enviado pelo site

Campos principais (ver `lib/contact/schema.ts`):

| Campo | Tipo | Exemplo |
|-------|------|---------|
| `fullName` | string | Maria Silva |
| `email` | string | maria@empresa.com.br |
| `phone` | string | +55 11 99999-9999 |
| `companyName` | string | Empresa XYZ |
| `productInterest` | string | Fitness, OralByte, Outros, … |
| `message` | string | Texto do lead |
| `consentAccepted` | boolean | true |
| `consentPolicyVersion` | string | opcional |
| `sourcePath` | string | `/contato?produto=fitness` |

### 3.3 Variáveis na Vercel

| Variável | Valor |
|----------|-------|
| `LEAD_DISPATCH_MODE` | `webhook` |
| `CRM_WEBHOOK_URL` | URL completa do webhook (HTTPS) |
| `CRM_API_KEY` | Token Bearer, **se** o CRM exigir |
| `CRM_WEBHOOK_ALLOWED_HOSTS` | **Obrigatório em produção** — hostname(s) da URL, separados por vírgula |

Exemplo:

```env
LEAD_DISPATCH_MODE=webhook
CRM_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/123456/abcdef/
CRM_WEBHOOK_ALLOWED_HOSTS=hooks.zapier.com
```

Se a URL for `https://api.seucrm.com/v1/leads`:

```env
CRM_WEBHOOK_ALLOWED_HOSTS=api.seucrm.com
```

> O código **bloqueia** webhook em produção sem `CRM_WEBHOOK_ALLOWED_HOSTS` (mitigação SSRF).

### Critério de saída

- [ ] Lead de teste no formulário `/contato` aparece no CRM em até 2 minutos
- [ ] Logs Vercel sem `CRM webhook failed` após o teste

---

## 4. Secrets do painel admin

O painel fica em `https://SEU_DOMINIO/admin/login`.

### Gerar valores

PowerShell (senha forte + secret aleatório):

```powershell
# Senha admin (copie e guarde)
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 24 | ForEach-Object { [char]$_ })

# SESSION_SECRET (32+ caracteres aleatórios)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }) -as [byte[]])
```

### Variáveis na Vercel (Production)

| Variável | Regra |
|----------|-------|
| `ADMIN_PASSWORD` | Forte, **diferente** de `admin123` |
| `SESSION_SECRET` | Obrigatório em produção; independente da senha |

Sem `SESSION_SECRET`, o login admin retorna **503** em produção.

### Critério de saída

- [ ] Login em `/admin/login` com a senha definida
- [ ] Dashboard `/admin` lista leads (após enviar um lead de teste)
- [ ] Logout funciona

---

## 5. Vercel — variáveis de ambiente

Resumo: [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md)

### 5.1 Criar projeto

1. [vercel.com](https://vercel.com) → **Add New** → **Project**
2. Importar repositório `PaivatechSolutions`
3. **Root Directory:** `apps/nexshape-site` (obrigatório)
4. Framework: Next.js (auto)
5. **Deploy** (primeiro build pode usar URL `*.vercel.app`)

### 5.2 Tabela completa — Production

| Variável | Obrigatória | Valor / origem |
|----------|-------------|----------------|
| `NEXT_PUBLIC_SITE_URL` | Sim | `https://www.seudominio.com.br` (URL final com `https://`, sem barra no final) |
| `LEAD_DISPATCH_MODE` | Sim | `webhook` |
| `CRM_WEBHOOK_URL` | Sim (se webhook) | § 3 |
| `CRM_WEBHOOK_ALLOWED_HOSTS` | Sim (prod + webhook) | Hostname da URL do CRM |
| `CRM_API_KEY` | Opcional | Bearer do CRM |
| `UPSTASH_REDIS_REST_URL` | **Sim (prod)** | § 2 |
| `UPSTASH_REDIS_REST_TOKEN` | **Sim (prod)** | § 2 |
| `ADMIN_PASSWORD` | Sim | § 4 |
| `SESSION_SECRET` | Sim | § 4 |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Recomendado | Cloudflare Turnstile |
| `TURNSTILE_SECRET_KEY` | Recomendado | Par do widget (ambos ou nenhum) |
| `NEXT_PUBLIC_CONTACT_WHATSAPP_DISPLAY` | Opcional | Ou configure em `/admin/contato` |
| `NEXT_PUBLIC_CONTACT_WHATSAPP_URL` | Opcional | `https://wa.me/55...` |
| `NEXT_PUBLIC_APP_DOMAIN_PRODUCTION` | Opcional | Default `paivatech.com.br` |
| `APP_REDIRECT_ALLOWED_HOSTS` | Opcional | Hosts extras para redirect de apps |

**Preview / Development** na Vercel:

```env
LEAD_DISPATCH_MODE=noop_preview
```

(pode omitir Redis no Preview se aceitar perda de leads entre previews)

### 5.3 Turnstile (recomendado antes de tráfego pago)

1. Cloudflare → **Turnstile** → Create widget
2. Domínios: seu domínio de produção + `localhost` (testes locais)
3. Copiar **Site Key** → `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
4. Copiar **Secret Key** → `TURNSTILE_SECRET_KEY`
5. Redeploy na Vercel após salvar as variáveis

### 5.4 Redeploy

Após **qualquer** alteração em Environment Variables:

**Deployments** → último deploy → **⋯** → **Redeploy** (Production).

### Critério de saída

- [ ] Build verde na Vercel
- [ ] Preview URL abre home e `/contato`

---

## 6. Domínio e SSL

1. Vercel → projeto → **Settings** → **Domains**
2. Adicionar domínio canônico (ex.: `www.paivatechsolutions.com.br`)
3. Configurar DNS no registrador conforme instruções da Vercel (CNAME ou A)
4. Aguardar SSL (automático, geralmente minutos)
5. Atualizar `NEXT_PUBLIC_SITE_URL` para o domínio final → **Redeploy**
6. Opcional: redirect apex → `www` na Vercel

### Critério de saída

- [ ] `https://SEU_DOMINIO` abre sem aviso de certificado
- [ ] `https://SEU_DOMINIO/robots.txt` → 200
- [ ] `https://SEU_DOMINIO/sitemap.xml` → 200

---

## 7. Smoke test (obrigatório)

Substitua `SEU_DOMINIO` pelo domínio real.

### 7.1 Script PowerShell

```powershell
$base = "https://SEU_DOMINIO"

Write-Host "=== Health ==="
$health = Invoke-RestMethod -Uri "$base/api/health"
$health | ConvertTo-Json -Depth 5
if ($health.storage.mode -ne "redis") {
  Write-Warning "ATENÇÃO: storage.mode não é redis — configure Upstash"
}

Write-Host "`n=== Páginas ==="
@( "", "/contato", "/sobre", "/robots.txt", "/sitemap.xml", "/nexshape-fitness/acessar" ) | ForEach-Object {
  $url = "$base$_"
  try {
    $r = Invoke-WebRequest -Uri $url -Method Head -MaximumRedirection 5
    Write-Host "OK $($r.StatusCode) $url"
  } catch {
    Write-Host "FAIL $url $($_.Exception.Message)"
  }
}
```

### 7.2 Checklist manual

| # | Teste | Esperado |
|---|--------|----------|
| 1 | `GET /api/health` | `status: ok`, `storage.mode: redis` |
| 2 | Home `/` | Carrega sem erro |
| 3 | `/contato` | Formulário visível |
| 4 | Enviar lead QA | Sucesso → `/contato/enviado` + lead no CRM |
| 5 | `/admin/login` | Login com `ADMIN_PASSWORD` |
| 6 | `/admin` | Lista o lead QA |
| 7 | Botão “Acessar sistema” (landing) | Redirect ou fallback contato (não 404) |
| 8 | `/admin` → export CSV | Download opcional |

### 7.3 Lead de teste sugerido

- Nome: `Lead QA Go-Live`
- E-mail: caixa de teste real
- Produto: qualquer um da lista
- Mensagem: incluir data/hora para rastreio

---

## 8. Monitoramento

| Ferramenta | Configuração |
|------------|----------------|
| [UptimeRobot](https://uptimerobot.com) ou Better Stack | Monitor HTTP a cada 5 min → `GET https://SEU_DOMINIO/api/health` |
| Vercel → Logs | Alertas de erro 5xx (integração e-mail/Slack) |
| Vercel Analytics | Opcional — Web Vitals |

Primeira semana: revisar logs de `/api/contact` diariamente.

---

## Bloqueadores — referência rápida

| Sintoma | Causa provável | Ação |
|---------|----------------|------|
| Leads não chegam no CRM | `noop_preview` ou webhook errado | `LEAD_DISPATCH_MODE=webhook` + teste URL |
| `502` no formulário | CRM down ou allowlist | Ver logs; conferir `CRM_WEBHOOK_ALLOWED_HOSTS` |
| Leads somem após deploy | Sem Redis | Configurar Upstash |
| Admin login 503 | Secrets ausentes | `ADMIN_PASSWORD` + `SESSION_SECRET` |
| Admin PUT falha 403 | CSRF / sessão | Fazer logout/login; não chamar API sem cookie |
| `storage.mode: file` | Upstash não configurado | Variáveis REST na Vercel + redeploy |
| Turnstile bloqueia usuários | Só site key sem secret | Configurar **ambas** chaves ou remover ambas |

---

## Após concluir a Fase 0

1. Marque itens em [Auditoria_Relatorio.md § 26](./Auditoria_Relatorio.md#26-checklist-go-live)
2. Atualize a tabela **Registro de execução** em [§ 27](./Auditoria_Relatorio.md#27-plano-de-ação-prioritizado) com datas
3. Pendências de negócio (jurídico, WhatsApp oficial): [Auditoria § 28 passo 5](./Auditoria_Relatorio.md#28-próximos-passos-go-live)

**Fase 3+ (opcional):** audit log admin, Postgres modo B, Sentry — ver plano de ação no relatório de auditoria.
