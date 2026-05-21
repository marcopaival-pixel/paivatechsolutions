# Teste local — hosts, processos e checklist

Guia para rodar e validar o **PaivaTech Solutions** na sua máquina. O sistema testável neste monorepo é o site **nexshape-site** (vitrine institucional + captura de leads). Os produtos SaaS completos (Fitness, OralByte, etc.) **não** rodam neste repositório — todas as landings direcionam para `/contato`.

Relacionado: [Auditoria_Relatorio.md](./Auditoria_Relatorio.md) · [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md)

---

## 1. Pré-requisitos

| Requisito | Versão mínima | Verificar |
|-----------|---------------|-----------|
| Node.js | 20.x | `node -v` |
| npm | 10.x | `npm -v` |

Não é necessário localmente: PostgreSQL, Redis, Docker, PHP ou filas.  
Opcional para testes avançados: conta Upstash, Turnstile, webhook CRM (ver cenários abaixo).

---

## 2. Hosts e URLs locais

### 2.1 Aplicação principal (obrigatória para testar o site)

| Host | Porta | Processo | Descrição |
|------|-------|----------|-----------|
| `http://localhost:3000` | **3000** | `npm run dev` ou `npm run start` | Site NexShape / PaivaTech (Next.js) |

Defina no `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> Se a porta 3000 estiver ocupada, o Next.js usa **3001** (ou a seguinte livre). Confira a mensagem no terminal após `npm run dev`.

### 2.2 Páginas do site (navegador)

Todas no host **`http://localhost:3000`**:

| URL | Conteúdo |
|-----|----------|
| `/` | Home |
| `/sobre` | Sobre |
| `/contato` | Formulário de lead |
| `/contato/enviado` | Confirmação após envio |
| `/contato?produto=fitness` | Contato com produto pré-selecionado |
| `/privacidade` | Política de privacidade |
| `/termos` | Termos de uso |
| `/nexshape-fitness` | Landing Fitness |
| `/oralbyte` | Landing Odontologia |
| `/zyncora` | Landing Chat / IA |
| `/consultatech` | Landing Crédito |
| `/kanban` | Landing KanbaPaiva |
| `/paivatech-commerce` | Landing Commerce |
| `/paivagrowth` | Landing Marketing |
| `/produtos/fitness` | Redireciona 301 → `/nexshape-fitness` |
| `/sitemap.xml` | Sitemap |
| `/robots.txt` | Robots |
| `/admin/login` | Login do painel interno (marketing) |
| `/admin` | Leads capturados pelo formulário |
| `/admin/produtos` | Edição de títulos/descrições exibidos no site |

### 2.3 APIs (mesmo host `localhost:3000`)

| Método | URL | Uso |
|--------|-----|-----|
| `GET` | `http://localhost:3000/api/health` | Saúde do app |
| `POST` | `http://localhost:3000/api/contact` | Envio de lead (JSON) |

Exemplo health:

```powershell
curl http://localhost:3000/api/health
```

Resposta esperada:

```json
{ "status": "ok", "service": "nexshape-site", "timestamp": "..." }
```

Exemplo envio de lead (modo local `noop_preview`):

```powershell
curl -X POST http://localhost:3000/api/contact `
  -H "Content-Type: application/json" `
  -d '{
    "fullName": "Teste Local",
    "email": "teste@exemplo.com.br",
    "phone": "(11) 98765-4321",
    "companyName": "Empresa Teste",
    "productInterest": "Fitness",
    "message": "Mensagem de teste local com dez chars.",
    "consentAccepted": true,
    "website": ""
  }'
```

Resposta esperada: `{"ok":true}`. No terminal do `npm run dev`, deve aparecer log `[contact] noop_preview dispatch` (e-mail mascarado).

### 2.4 Sistemas externos referenciados (opcionais — fora deste repo)

Algumas landings apontam para outro host; **só funcionam se você tiver esses apps rodando**:

| Host | Porta | Onde aparece | Observação |
|------|-------|--------------|------------|
| `http://localhost:8000` | **8000** | `/kanban`, `/paivatech-commerce` | Links “acessar sistema” / login — **não** faz parte do `nexshape-site` |

| Host produção (referência) | Uso |
|----------------------------|-----|
| `https://paivatechsolutions.com.br` | Backlink do portal quando **não** está em localhost |

---

## 3. Processos a executar

### 3.1 Primeira vez (setup)

Execute na pasta do site:

```powershell
cd c:\Projetos\PaivatechSolutions\apps\nexshape-site

npm install

# Criar ambiente local (se ainda não existir)
copy .env.example .env.local
```

Edite `apps\nexshape-site\.env.local` (mínimo para dev):

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
LEAD_DISPATCH_MODE=noop_preview
```

### 3.2 Desenvolvimento (uso diário)

| Ordem | Comando | Onde | O que faz |
|-------|---------|------|-----------|
| 1 | `npm run dev` | `apps\nexshape-site` | Sobe o site em **http://localhost:3000** (hot reload, Turbopack) |
| — | *(manter terminal aberto)* | — | Servidor ativo enquanto testa no navegador |

Parar: `Ctrl+C` no terminal.

### 3.3 Validar antes de commit / deploy

| Ordem | Comando | Onde | O que faz |
|-------|---------|------|-----------|
| 1 | `npm run lint` | `apps\nexshape-site` | ESLint |
| 2 | `npm run typecheck` | `apps\nexshape-site` | TypeScript |
| 3 | `npm run test` | `apps\nexshape-site` | 18 testes Vitest (sem subir servidor) |
| 4 | `npm run build` | `apps\nexshape-site` | Build de produção |
| 5 | `npm run start` | `apps\nexshape-site` | Simula produção em **http://localhost:3000** (após o build) |

### 3.4 Fabrica (validar JSON de specs — opcional)

| Ordem | Comando | Onde | O que faz |
|-------|---------|------|-----------|
| 1 | `npm install` | `Fabrica` | Dependências AJV (só na primeira vez) |
| 2 | `npm run validate -- outputs/_smoke` | `Fabrica` | Valida artefatos smoke do Builder |
| 2b | `npm run validate -- outputs/_smoke-audit` | `Fabrica` | Valida smoke da Audit Factory |
| 2c | `npm run validate -- outputs/_smoke-evolution` | `Fabrica` | Valida smoke da Evolution Factory |

A Fabrica **não** expõe host HTTP; é ferramenta de linha de comando + Cursor.

### 3.5 Lighthouse local (opcional)

Requer build + servidor:

```powershell
cd c:\Projetos\PaivatechSolutions\apps\nexshape-site
npm run build
npm run lighthouse
```

Gera relatório em `apps\nexshape-site\.lighthouseci\` (pasta ignorada pelo Git).

---

## 4. Cenários de `.env.local` para testar integrações

### Cenário A — Padrão (recomendado para começar)

Leads só aparecem no **console** do terminal; sem CRM, sem CAPTCHA, rate limit em memória.

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
LEAD_DISPATCH_MODE=noop_preview
```

### Cenário B — Testar webhook CRM

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
LEAD_DISPATCH_MODE=webhook
CRM_WEBHOOK_URL=https://SEU_CRM/webhook
# CRM_API_KEY=seu-token
```

Reinicie `npm run dev` após alterar o `.env.local`.

### Cenário C — Testar CAPTCHA Turnstile

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
LEAD_DISPATCH_MODE=noop_preview
NEXT_PUBLIC_TURNSTILE_SITE_KEY=chave_site
TURNSTILE_SECRET_KEY=chave_secreta
```

O widget aparece em `/contato`; o envio falha sem token válido.

### Cenário D — Testar rate limit distribuído (Upstash)

```env
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

Sem essas variáveis, o limite é **em memória** (10 req/min por IP por instância Node).

### Cenário E — WhatsApp no contato

```env
NEXT_PUBLIC_CONTACT_WHATSAPP_DISPLAY=+55 (11) 99999-9999
NEXT_PUBLIC_CONTACT_WHATSAPP_URL=https://wa.me/5511999999999
```

---

## 5. Checklist de teste manual (navegador)

Com `npm run dev` rodando em `http://localhost:3000`:

| # | Teste | Resultado esperado |
|---|--------|-------------------|
| 1 | Abrir `/` | Home carrega; hero visível |
| 2 | Menu “Produtos” | Links para landings dedicadas |
| 3 | Abrir `/contato` | Formulário renderiza |
| 4 | Enviar formulário válido | Redireciona para `/contato/enviado` |
| 5 | Terminal do `dev` | Log `noop_preview dispatch` (se cenário A) |
| 6 | `GET /api/health` | JSON `status: ok` |
| 7 | Abrir `/sitemap.xml` | Lista URLs do site |
| 8 | URL inválida `/xyz` | Página 404 |
| 9 | `/contato?produto=kanban` | Select com Kanban pré-preenchido |
| 10 | Honeypot (só API) | `website` preenchido → erro 400 |
| 11 | `/admin/login` com senha do `.env.local` | Redireciona para `/admin` (leads) |
| 12 | Editar produto em `/admin/produtos` | Menu e `/contato` refletem o novo título |
| 13 | Configurar URL produção/dev em `/admin/produtos` | Botão **Acessar sistema** na landing usa o modo ativo |

**URLs de sistema (admin → landings):** em cada produto, preencha host de produção (ex. `fitness` → `https://fitness.paivatech.com.br`) e desenvolvimento (ex. `localhost:8000`), escolha o modo ativo e salve. Para testar tudo em dev local sem mudar o admin:

```env
NEXT_PUBLIC_FORCE_APP_ACCESS_MODE=development
```

**Painel admin (local):** defina no `.env.local`:

```env
ADMIN_PASSWORD=sua_senha_forte
SESSION_SECRET=string_aleatoria_longa
```

Sem `ADMIN_PASSWORD`, o login local usa `admin123` (apenas desenvolvimento).

---

## 6. Resumo rápido (copiar e colar)

**Terminal 1 — site:**

```powershell
cd c:\Projetos\PaivatechSolutions\apps\nexshape-site
npm run dev
```

**Navegador:** [http://localhost:3000](http://localhost:3000) · [http://localhost:3000/contato](http://localhost:3000/contato)

**Testes automatizados (outro terminal):**

```powershell
cd c:\Projetos\PaivatechSolutions\apps\nexshape-site
npm run test
```

---

## 7. Problemas comuns

| Problema | Solução |
|----------|---------|
| Porta 3000 em uso | Feche o outro processo ou use a porta indicada pelo Next (ex. 3001) |
| Alterou `.env.local` e não surtiu efeito | Pare (`Ctrl+C`) e rode `npm run dev` de novo |
| Formulário pede CAPTCHA e não envia | Remova chaves Turnstile do `.env.local` ou preencha ambas |
| “Não foi possível registrar o contato” | Reinicie `npm run dev`; confira `GET /api/health` (`storage.mode`). Em produção na Vercel, configure **Upstash** (`UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`) |
| `502` no contato com `webhook` | CRM inacessível ou URL/token incorretos (o lead pode ter sido salvo mesmo assim) |
| Login admin retorna 503 em produção | Configure `ADMIN_PASSWORD` e `SESSION_SECRET` na Vercel |
| `npm run dev` falha após clone | Rode `npm install` em `apps\nexshape-site` |

---

## 8. O que não roda localmente neste monorepo

- Banco PostgreSQL (modo B da spec — não implementado)
- Produtos SaaS completos (NexShape Fitness, OralByte, Zyncora, etc.)
- Filas, Redis obrigatório, e-mail transacional (apenas webhook/log)

Para go-live em servidor, use [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md) e [Auditoria_Relatorio.md § 28](./Auditoria_Relatorio.md#28-próximos-passos-go-live).
