# Relatório de Auditoria Técnica Completa — PaivaTech Solutions

| Campo | Valor |
|-------|-------|
| **Versão do relatório** | 1.2 |
| **Data da auditoria** | 20/05/2026 |
| **Última atualização** | 20/05/2026 |
| **Escopo** | `c:\Projetos\PaivatechSolutions` (workspace completo) |
| **Aplicação em produção** | `apps/nexshape-site` |
| **Ferramenta de especificação** | `Fabrica/` |
| **Template de referência** | `docto/Auditoria_Completa.txt` |
| **Auditor** | Cursor Agent (auditoria automatizada + revisão de código) |

> **Documento vivo:** este arquivo deve ser atualizado sempre que um item do plano de ação for concluído, um risco for mitigado ou o escopo do sistema mudar. Registrar mudanças na seção [Histórico de atualizações](#histórico-de-atualizações).

---

## Histórico de atualizações

| Data | Versão | Alteração |
|------|--------|-----------|
| 20/05/2026 | 1.0 | Auditoria inicial completa (27 seções) |
| 20/05/2026 | 1.1 | Implementação P0/P1/P2: rate limit, Next 15.5.18, headers, sitemap, SSG, redirects, hero, Vitest, CI, README |
| 20/05/2026 | 1.2 | Turnstile CAPTCHA, CSP+HSTS, 12 testes Vitest, `vercel.json`, README monorepo, CI Fabrica; Git pendente (CLI ausente no ambiente) |

---

## Índice

1. [Visão Geral do Sistema](#1-visão-geral-do-sistema)
2. [Inventário de Funcionalidades](#2-inventário-de-funcionalidades)
3. [Auditoria de Rotas](#3-auditoria-de-rotas)
4. [Auditoria de Banco de Dados](#4-auditoria-de-banco-de-dados)
5. [Auditoria de Segurança](#5-auditoria-de-segurança)
6. [Auditoria de Permissões](#6-auditoria-de-permissões)
7. [Auditoria de APIs](#7-auditoria-de-apis)
8. [Integrações Externas](#8-integrações-externas)
9. [Processamento de Pagamentos](#9-processamento-de-pagamentos)
10. [Auditoria de Performance](#10-auditoria-de-performance)
11. [Auditoria de Código](#11-auditoria-de-código)
12. [Auditoria de Testes](#12-auditoria-de-testes)
13. [Auditoria de Frontend](#13-auditoria-de-frontend)
14. [Auditoria de Deploy](#14-auditoria-de-deploy)
15. [O que Enviar para Produção](#15-o-que-enviar-para-produção)
16. [Checklist de Configuração do Servidor](#16-checklist-de-configuração-do-servidor)
17. [Passo a Passo de Deploy](#17-passo-a-passo-de-deploy)
18. [Variáveis de Ambiente](#18-variáveis-de-ambiente)
19. [Backup e Recuperação](#19-backup-e-recuperação)
20. [Monitoramento e Logs](#20-monitoramento-e-logs)
21. [Conformidade e LGPD](#21-conformidade-e-lgpd)
22. [Documentação](#22-documentação)
23. [Riscos Críticos](#23-riscos-críticos)
24. [Melhorias Recomendadas](#24-melhorias-recomendadas)
25. [Nota Geral do Sistema](#25-nota-geral-do-sistema)
26. [Checklist Go-Live](#26-checklist-go-live)
27. [Plano de Ação Prioritizado](#27-plano-de-ação-prioritizado)

---

## 1. Visão Geral do Sistema

| Item | Detalhe |
|------|---------|
| **Nome** | PaivaTech Solutions — Site institucional / marketing da **Suite NexShape** |
| **Objetivo de negócio** | Apresentar o ecossistema de produtos (Saúde, Odontologia, Chat/IA, Crédito, Kanban, Commerce, Marketing) e capturar **leads** via formulário de contato |
| **Público-alvo** | Empresas B2B (academias, clínicas, varejo, fintechs) interessadas na suite |
| **Tecnologias** | Next.js 15.1.11, React 19, TypeScript 5, Tailwind CSS 3.4, Zod 4, React Hook Form |
| **Runtime** | Node.js v24.14.1 (ambiente local auditado), npm 11.11.0 |
| **Hospedagem prevista** | Vercel (recomendado no runbook Fabrica) |
| **Banco de dados** | **Não implementado** no código atual (PostgreSQL opcional apenas na especificação) |
| **Autenticação** | **Ausente** (site 100% público) |
| **Pagamentos** | **Ausente** (mencionado apenas em copy de marketing) |
| **Git no workspace** | **Não** (raiz não é repositório Git no momento da auditoria) |

### Estrutura do workspace

```
PaivatechSolutions/
├── apps/
│   └── nexshape-site/     ← Aplicação web (único app deployável)
├── Fabrica/               ← Meta-framework de specs + validação JSON Schema
└── docto/                 ← Documentação (templates, briefings, este relatório)
```

### Dependências principais (`nexshape-site`)

- `next@15.1.11`, `react@^19`, `zod@^4.4.3`, `react-hook-form`, `@hookform/resolvers`
- Dev: ESLint 9, `eslint-config-next`, Tailwind 3.4

### Serviços externos

| Serviço | Status | Uso |
|---------|--------|-----|
| CRM Webhook | Configurável | `LEAD_DISPATCH_MODE=webhook` + `CRM_WEBHOOK_URL` |
| Google Fonts (Geist) | Ativo | `next/font/google` |
| Portal PaivaTech | Hardcoded | Backlink `https://paivatechsolutions.com.br` |
| E-mail transacional | Não implementado | Previsto na spec Fabrica |
| Stripe / gateways | Não implementado | Apenas texto em landing |
| PostgreSQL | Não implementado | Spec em `Fabrica/outputs/.../05-database-design.json` |

### Produtos NexShape (fora deste repositório)

Os sistemas operacionais (Fitness, OralByte, Zyncora, ConsultaTech, KanbaPaiva, Commerce, PaivaGrowth) existem como **landings + especificações**; o código SaaS completo **não está neste workspace**.

---

## 2. Inventário de Funcionalidades

### Módulo: Site institucional (páginas estáticas/SSR)

| Funcionalidade | Rotas | Arquivos | Status | Riscos | Melhorias |
|----------------|-------|----------|--------|--------|-----------|
| Home | `/` | `app/page.tsx` | Parcial | Imagem `/hero-dashboard.png` **ausente** em `public/` | Adicionar asset ou remover referência |
| Sobre | `/sobre` | `app/sobre/page.tsx` | Completo | — | — |
| Contato | `/contato` | `app/contato/page.tsx` | Completo | WhatsApp placeholder `+55 (00) 00000-0000` | Dados reais |
| Sucesso contato | `/contato/enviado` | `app/contato/enviado/page.tsx` | Completo | — | — |
| Privacidade | `/privacidade` | `app/privacidade/page.tsx` | Completo | Revisão jurídica pendente (spec) | Versão legal sincronizada com `PRIVACY_POLICY_VERSION` |
| Termos | `/termos` | `app/termos/page.tsx` | Completo | Idem | Idem |
| Produto genérico | `/produtos/[slug]` | `app/produtos/[slug]/page.tsx` | Parcial | SSG só 4/7 slugs | Alinhar `generateStaticParams` com 7 produtos |
| Landings dedicadas | `/nexshape-fitness`, `/oralbyte`, `/zyncora`, `/consultatech`, `/kanban`, `/paivatech-commerce`, `/paivagrowth` | `app/*/page.tsx` | Completo | **Fora do sitemap** | Incluir no `sitemap.ts` |
| 404 | — | `app/not-found.tsx` | Completo | — | — |
| Erros | — | `app/error.tsx`, `app/global-error.tsx` | Completo | — | — |

### Módulo: API

| Funcionalidade | Rota | Arquivo | Tabelas | Status | Riscos |
|----------------|------|---------|---------|--------|--------|
| Formulário de lead | `POST /api/contact` | `app/api/contact/route.ts` | Nenhuma | Completo (MVP) | Sem rate limit; spam/DoS |
| Health check | `GET /api/health` | `app/api/health/route.ts` | Nenhuma | Completo | Exposto publicamente (aceitável) |

**Services:** `lib/contact/dispatch.ts`, `lib/contact/schema.ts`, `lib/contact/form-schema.ts`  
**Models:** Nenhum (sem ORM)  
**Views:** Componentes React em `components/`

### Módulo: SEO

| Funcionalidade | Arquivo | Status | Risco |
|----------------|---------|--------|-------|
| Sitemap | `app/sitemap.ts` | Parcial | 7 landings principais omitidas |
| Robots | `app/robots.ts` | Completo | — |

### Módulo: Fabrica (meta-tooling)

| Funcionalidade | Status | Observação |
|----------------|--------|------------|
| System Builder (SBO) | Spec completa (piloto) | 17 artefatos JSON/YAML |
| System Audit Factory (SAF) | Smoke tests | Sem app alvo neste repo |
| Auto Evolution Factory (AEF) | Smoke tests | Evolui repos externos |
| Validação de schemas | `npm run validate` | AJV 8 — funcional |
| CI GitHub Actions | **Pendente** | Referenciado no README, pasta `.github` ausente |

### Funcionalidades **não presentes** neste repositório

Autenticação, dashboard, vendas, estoque, financeiro, relatórios internos, multi-tenant, assinaturas, webhooks de pagamento, ERP, WhatsApp API, SMS, APIs fiscais.

---

## 3. Auditoria de Rotas

### Rotas de página (App Router)

| URL | Método | Handler | Middleware | Auth | Permissão | Exposição | Risco |
|-----|--------|---------|------------|------|-----------|-----------|-------|
| `/` | GET | `app/page.tsx` | Nenhum | Não | Pública | Pública | Imagem quebrada |
| `/sobre` | GET | `app/sobre/page.tsx` | Nenhum | Não | Pública | Pública | Baixo |
| `/contato` | GET | `app/contato/page.tsx` | Nenhum | Não | Pública | Pública | Baixo |
| `/contato/enviado` | GET | `app/contato/enviado/page.tsx` | Nenhum | Não | Pública | Pública | Baixo |
| `/privacidade`, `/termos` | GET | respectivos | Nenhum | Não | Pública | Pública | Baixo |
| `/produtos/{slug}` | GET | `app/produtos/[slug]/page.tsx` | Nenhum | Não | Pública | Pública | SSG incompleto |
| `/nexshape-fitness` … `/paivagrowth` | GET | landings | Nenhum | Não | Pública | Pública | SEO: fora do sitemap |
| `/sitemap.xml` | GET | `app/sitemap.ts` | Nenhum | Não | Pública | Pública | Baixo |
| `/robots.txt` | GET | `app/robots.ts` | Nenhum | Não | Pública | Pública | Baixo |

### Rotas de API

| URL | Método | Handler | Middleware | Auth | Risco | Observação |
|-----|--------|---------|------------|------|-------|------------|
| `/api/contact` | POST | `app/api/contact/route.ts` | Nenhum | Não (público por design) | **Alto** sem rate limit | Honeypot + Zod + limite 15KB OK |
| `/api/health` | GET | `app/api/health/route.ts` | Nenhum | Não | Baixo | Retorna `{ status: "ok" }` |

### Achados de rotas

| Tipo | Achado |
|------|--------|
| Sem autenticação | Todas (esperado para marketing) |
| Sem autorização | Todas |
| Duplicadas | `/produtos/fitness` vs `/nexshape-fitness` (intencional, dupla URL) |
| Obsoletas | Nenhuma detectada |
| Debug expostas | Nenhuma (`/_next` é build interno) |
| Admin sem proteção | Não há painel admin |

**Não existe `middleware.ts`** no projeto.

---

## 4. Auditoria de Banco de Dados

### Implementação atual

**Nenhum banco de dados** no código. Leads são despachados via:

- `noop_preview` → `console.info`
- `webhook` → `fetch(CRM_WEBHOOK_URL)`

### Especificação planejada (Fabrica — não migrada)

| Schema | Tabela | Finalidade |
|--------|--------|------------|
| `marketing` | `contact_submissions` | Persistência opcional de leads + LGPD |
| `marketing` | `outbound_webhook_retries` | Fila de retry para CRM |

**Modo A (atual):** stateless, sem `DATABASE_URL`  
**Modo B (futuro):** PostgreSQL 15+, Drizzle ou Prisma

### Verificações

| Item | Status |
|------|--------|
| Migrations | **Ausentes** |
| Seeds | **Ausentes** |
| FK / índices | N/A |
| Soft deletes | N/A |
| Multi-tenant | Não previsto no MVP marketing |
| Tabelas não utilizadas | N/A |

---

## 5. Auditoria de Segurança

| Controle | Status | Evidência |
|----------|--------|-----------|
| Autenticação | N/A (site público) | — |
| Autorização | N/A | — |
| CSRF | Parcial | Same-origin `fetch`; sem token explícito (aceitável para API JSON pública) |
| XSS | Parcial | React escapa por padrão; sem CSP customizada |
| SQL Injection | N/A | Sem SQL |
| Rate limiting | **Não implementado** | Comentário placeholder em `app/api/contact/route.ts` (linhas 35–36) |
| Headers de segurança | **Não configurados** | `next.config.ts` vazio |
| Criptografia em trânsito | Depende do host (HTTPS) | — |
| Gestão de segredos | Parcial | `.env.example` documentado; `.env.local` no disco (não versionar) |
| Logs sensíveis | Parcial | `noop_preview` loga e-mail; spec pede redação |
| Upload de arquivos | N/A | — |
| Honeypot | **Implementado** | Campo `website` |
| SSRF no webhook | **Mitigado** | URL só via env, `redirect: "manual"`, timeout 12s em `lib/contact/dispatch.ts` |
| LGPD | Parcial | Checkbox consent + páginas legais; sem DPIA automatizado |
| CAPTCHA | **Não implementado** | Recomendado na spec (Turnstile/hCaptcha) |
| Dependências | **Crítico** | `npm audit`: Next.js com múltiplos CVEs; fix sugere `15.5.18` |

### Controles já implementados em `POST /api/contact`

- Limite de payload: `Content-Length` > 15000 → 413
- Honeypot `website` preenchido → 400
- Validação Zod estrita + telefone BR em `lib/contact/schema.ts`
- Erros genéricos ao cliente (502 sem stack)

---

## 6. Auditoria de Permissões

| Perfil | Roles | Módulos | Escalonamento |
|--------|-------|---------|---------------|
| Visitante anônimo | — | Todas as páginas + POST contact | Nenhum (sem auth) |
| Operador CRM | Externo | Recebe webhook | Depende do CRM |
| Admin sistema | **Inexistente** | — | — |

**Risco de escalonamento:** baixo (superfície só marketing). Risco principal é **abuso do endpoint público**, não privilege escalation.

---

## 7. Auditoria de APIs

### `POST /api/contact`

| Aspecto | Detalhe |
|---------|---------|
| Autenticação | Nenhuma |
| Payload | JSON: `fullName`, `email`, `phone`, `companyName`, `productInterest`, `message`, `consentAccepted`, `consentPolicyVersion?`, `website` (honeypot), `sourcePath?` |
| Validação | Zod v4, alinhado OpenAPI Fabrica |
| Respostas | `200 { ok: true }`, `400`, `413`, `422` + issues, `502` |
| Versionamento | Não (`/api/contact` v1 implícita) |
| Rate limit | **Não** |
| Documentação | `Fabrica/outputs/2026-05-13-projeto-piloto-builder/06-api-spec.openapi.yaml` |

### `GET /api/health`

| Aspecto | Detalhe |
|---------|---------|
| Resposta | `{ "status": "ok" }` |
| Uso | Liveness para monitoramento |

---

## 8. Integrações Externas

| Serviço | Finalidade | URL | Credenciais | Custo | Webhooks | Risco | Alternativa |
|---------|------------|-----|-------------|-------|----------|-------|-------------|
| CRM (genérico) | Receber leads | `CRM_WEBHOOK_URL` (env) | `CRM_API_KEY` opcional | Depende do CRM | Entrada no CRM | Indisponibilidade CRM → 502 | Resend/SendGrid como e-mail (spec) |
| Google Fonts | Tipografia | CDN Google | Nenhuma | Gratuito | — | Privacidade/GDPR | Self-host fonts |
| Vercel (previsto) | Hosting | — | Token deploy | Pago/free tier | Deploy hooks | Vendor lock-in leve | Cloudflare Pages |
| PaivaTech Portal | Backlink UX | `paivatechsolutions.com.br` | Nenhuma | — | — | Link quebrado se domínio mudar | Configurável via env |

**Não integrados:** WhatsApp API, SMS, ERP, bancos, APIs fiscais, Stripe.

---

## 9. Processamento de Pagamentos

**Não aplicável** neste repositório. Nenhum gateway, checkout, assinatura, webhook de pagamento ou fluxo PCI. Menções a Stripe/PIX existem apenas em copy de produto (ex.: ConsultaTech, PaivaGrowth).

---

## 10. Auditoria de Performance

| Item | Status | Observação |
|------|--------|------------|
| Queries lentas / N+1 | N/A | Sem DB |
| Cache | Padrão Next.js | Sem Redis |
| Filas | Não | Retry webhook só na spec DB |
| Assets | Parcial | Hero PNG ausente; SVGs em `public/branding/` |
| Lazy loading | Parcial | `next/image` na home (asset faltando) |
| Paginação | N/A | Site estático |
| SSG/ISR | Parcial | 4 slugs pré-gerados em `/produtos/[slug]` |
| `/contato` | `force-dynamic` | Correto para `searchParams` |

**Recomendações:** incluir todas as landings no sitemap; completar SSG; otimizar imagens hero; considerar `@next/bundle-analyzer` no CI.

---

## 11. Auditoria de Código

| Critério | Avaliação |
|----------|-----------|
| Organização | **Boa** — `app/`, `components/`, `lib/` claros |
| Padrões | Consistente com Next 15 App Router |
| SOLID/DRY | Aceitável; duplicação leve entre landings e `/produtos/[slug]` |
| Complexidade | Baixa |
| Código duplicado | Landings por produto (aceitável para marketing) |
| Dead code | Mínimo |
| Comentários | Adequados em pontos de segurança |
| Config vazia | `next.config.ts` sem opções — débito técnico |

### Inconsistências detectadas

1. `generateStaticParams` com 4 slugs vs 7 em `PRODUCT_DEFINITIONS` (`app/produtos/[slug]/page.tsx`)
2. `lib/contact/query-param.ts` sem mapeamento para `kanban`, `marketing`, `consultatech`
3. Sitemap usa `/produtos/{slug}` mas navegação usa URLs dedicadas (`components/SiteHeader.tsx` `ROUTE_MAP`)

---

## 12. Auditoria de Testes

| Tipo | Status |
|------|--------|
| Unitários | **Ausentes** |
| Integração | **Ausentes** |
| E2E (Playwright) | **Ausentes** |
| Cobertura | 0% |
| Script `test` | **Ausente** em `package.json` |
| Spec Fabrica | `08-test-plan.json` define Vitest + Lighthouse — **não implementado** |

---

## 13. Auditoria de Frontend

| Aspecto | Status | Notas |
|---------|--------|-------|
| Responsividade | Bom | Tailwind, layout `max-w-5xl` |
| UX/UI | Bom | Dark mode forçado, glass/gradientes em `globals.css` |
| Acessibilidade | Parcial | Sem auditoria axe automatizada |
| Performance | Médio | Sem Lighthouse CI; asset hero faltando |
| SEO | Parcial | Metadata por página; sitemap incompleto |
| i18n | `pt-BR` fixo | Adequado ao mercado alvo |

---

## 14. Auditoria de Deploy

| Item | Recomendação |
|------|--------------|
| Servidor | Vercel ou Node + PM2 |
| Node | 20 LTS ou 22 LTS em produção |
| Banco | Opcional PostgreSQL 15+ |
| Redis | Não necessário no MVP |
| Filas | Não no MVP |
| Cron | Não |
| Storage | Estático via CDN do host |
| SSL | Automático (Vercel) |
| DNS | Apex → www (TBD domínio canônico) |
| Backups | N/A sem DB; CRM é sistema de registro |
| Monitoramento | `/api/health` + uptime externo |

---

## 15. O que Enviar para Produção

### Enviar

```
apps/nexshape-site/
├── app/
├── components/
├── lib/
├── public/
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── (opcional) vercel.json quando criado
```

### NÃO enviar

| Pasta/arquivo | Motivo |
|---------------|--------|
| `node_modules/` | Instalar no CI/host |
| `.next/` | Gerado no build |
| `.env.local` | Segredos locais |
| `Fabrica/node_modules/` | Ferramenta dev separada |
| `Fabrica/outputs/*` (exceto política interna) | Artefatos de spec |
| `docto/` | Documentação interna (opcional no deploy) |

### Build steps

```bash
cd apps/nexshape-site
npm ci
npm run build
npm run start   # ou deploy Vercel
```

---

## 16. Checklist de Configuração do Servidor

| Item | Necessário |
|------|------------|
| Node.js 20+ | Sim |
| npm | Sim |
| PostgreSQL | Opcional (modo B) |
| Redis | Não |
| Supervisor | Não (se Vercel) |
| Nginx/Apache | Não (se Vercel) |
| SSL | Sim |
| Composer/PHP | Não |
| Python | Não |

---

## 17. Passo a Passo de Deploy

1. Provisionar projeto na Vercel (ou VPS com Node).
2. Configurar domínio canônico com CNAME e redirect apex.
3. Conectar repositório Git (recomendado inicializar Git no monorepo).
4. **Root directory:** `apps/nexshape-site`.
5. `npm ci` → `npm run build`.
6. Configurar variáveis (seção 18).
7. Ativar CRM: `LEAD_DISPATCH_MODE=webhook` + teste POST.
8. Smoke: home, contato, lead QA, `/api/health`, sitemap, robots.
9. Monitorar erros 5xx em `/api/contact` na primeira semana.

---

## 18. Variáveis de Ambiente

### Implementadas (`.env.example`)

| Variável | Obrigatória prod | Descrição |
|----------|------------------|-----------|
| `NEXT_PUBLIC_SITE_URL` | Sim | URL canônica |
| `LEAD_DISPATCH_MODE` | Sim | `webhook` em prod |
| `CRM_WEBHOOK_URL` | Se webhook | URL do CRM |
| `CRM_API_KEY` | Opcional | Bearer para CRM |

### Planejadas (spec Fabrica, não no `.env.example`)

`DATABASE_URL`, `EMAIL_API_KEY`, `SMTP_*`, `TURNSTILE_*`, `PRIVACY_POLICY_VERSION`, `CAPTCHA_PROVIDER`

---

## 19. Backup e Recuperação

| Cenário | Estratégia |
|---------|------------|
| Código | Git + tags de release |
| Leads | CRM externo; opcional Postgres |
| Retenção LGPD | Definir política quando DB ativo |
| Restore | Redeploy versão anterior (Vercel rollback) |
| Testes | Restore drill trimestral se Postgres ativado |

---

## 20. Monitoramento e Logs

| Ferramenta | Uso |
|------------|-----|
| Vercel Logs / Log Drain | Erros runtime |
| Uptime (BetterStack, cron-job.org) | `GET /` e `GET /api/health` |
| Sentry (futuro) | Stack traces |
| Alertas | Erro `/api/contact` > 5% / 15 min |
| Lighthouse CI | Performance em PRs |

**Evitar:** logar corpo completo de `message` ou PII em produção.

---

## 21. Conformidade e LGPD

| Item | Status |
|------|--------|
| Política de privacidade | `/privacidade` |
| Consentimento | `consentAccepted: true` obrigatório |
| Versão da política | `consentPolicyVersion` opcional |
| Exclusão de dados | Depende CRM/DB — não automatizado |
| Criptografia | TLS (host) |
| DPIA | Recomendado para dados sensíveis em `message` |
| Analytics/cookies | Não implementados |

---

## 22. Documentação

| Documento | Status |
|-----------|--------|
| README (site) | **Presente** (`apps/nexshape-site/README.md`) |
| README (monorepo) | **Presente** (`README.md`) |
| Git setup | Instruções em `docto/GIT_SETUP.md` (CLI git não disponível no ambiente da auditoria) |
| README Fabrica | Presente |
| API docs | OpenAPI em Fabrica |
| Este relatório | **Presente** (`docto/Auditoria_Relatorio.md`) |
| Template auditoria | `docto/Auditoria_Completa.txt` |

---

## 23. Riscos Críticos

| # | Risco | Impacto | Prob. | Status mitigação |
|---|-------|---------|-------|-------------------|
| R1 | Sem rate limiting em `/api/contact` | DoS, spam, custo CRM | Alta | ✅ Mitigado — memória + Upstash opcional (`lib/security/contact-rate-limit.ts`) |
| R2 | CVEs Next.js (npm audit critical) | XSS, SSRF, DoS | Média | ✅ Mitigado — `next@15.5.18` (2 moderate restantes em postcss transitivo) |
| R3 | `noop_preview` em produção | Perda de leads | Alta se erro config | ⬜ Configuração deploy (ação operacional) |
| R4 | Asset hero ausente | UX/LCP ruim | Certa | ✅ Mitigado — `next/image` + `/branding/logo-icon.svg` |
| R5 | Sem testes automatizados | Regressões | Média | ✅ Parcial — Vitest 5 testes (query-param, rate-limit) |
| R6 | Sem security headers | XSS/clickjacking | Média | ✅ Mitigado — `next.config.ts` headers |
| R7 | Workspace sem Git | Sem CI/rollback | Alta | ⬜ Parcial — `.gitignore` raiz + workflow CI; `git init` pendente |
| R8 | Sitemap incompleto | SEO | Certa | ✅ Mitigado — 7 landings + legado `/produtos/*` |
| R9 | Copy ConsultaTech/Credit | Legal/reputação | Média | ⬜ Pendente (jurídico) |
| R10 | `.env.local` no disco | Vazamento se commit | Baixa | ✅ Mitigado — `.gitignore` permite `.env.example` |

---

## 24. Melhorias Recomendadas

### Crítica

| ID | Melhoria | Status |
|----|----------|--------|
| C1 | Rate limiting (`@upstash/ratelimit` ou edge) | ✅ |
| C2 | Atualizar Next.js (ex.: 15.5.18+) | ✅ |
| C3 | CRM webhook em prod testado | ⬜ |
| C4 | Hero image ou remover referência | ✅ |
| C5 | Git + CI (lint, build, audit) | ⬜ Parcial (CI ✅; `git init` + remote pendente) |

### Alta

| ID | Melhoria | Status |
|----|----------|--------|
| A1 | Security headers (`next.config` / `vercel.json`) | ✅ |
| A2 | Sitemap com todas as landings | ✅ |
| A3 | `generateStaticParams` + `query-param` (7 produtos) | ✅ |
| A4 | README deploy | ✅ |
| A5 | CAPTCHA antes de tráfego pago | ✅ (Turnstile opcional via env) |

### Média

| ID | Melhoria | Status |
|----|----------|--------|
| M1 | Vitest schemas + API | ✅ (12 testes: schema, query-param, rate-limit, turnstile) |
| M2 | Lighthouse CI | ⬜ |
| M3 | WhatsApp real no contato | ⬜ Parcial (env `NEXT_PUBLIC_CONTACT_WHATSAPP_*`) |
| M4 | CI validate Fabrica | ✅ (`.github/workflows/fabrica-validate.yml`) |
| M5 | Postgres modo B (se exigido LGPD) | ⬜ |

### Baixa

| ID | Melhoria | Status |
|----|----------|--------|
| B1 | Redirect 301 URLs produto unificadas | ✅ |
| B2 | Self-host Geist | ⬜ |
| B3 | email security@ | ⬜ |

---

## 25. Nota Geral do Sistema

| Dimensão | Nota | Data |
|----------|------|------|
| Arquitetura | 8,0 | 20/05/2026 |
| Segurança | 8,0 | 20/05/2026 |
| Performance | 7,5 | 20/05/2026 |
| Código | 8,0 | 20/05/2026 |
| UX/UI | 8,5 | 20/05/2026 |
| Testes | 6,0 | 20/05/2026 |
| Deploy | 7,5 | 20/05/2026 |
| Escalabilidade | 7,0 | 20/05/2026 |

**Nota geral ponderada: 7,7 / 10** (após implementação v1.2)

> Recalcular notas após conclusão dos itens P0 do plano de ação.

---

## 26. Checklist Go-Live

| Item | Status | Data conclusão |
|------|--------|----------------|
| Build `npm run build` sem erro | ✅ | 20/05/2026 |
| Variáveis prod configuradas | ⬜ | |
| CRM webhook testado | ⬜ **Bloqueador** | |
| Rate limiting | ✅ | 20/05/2026 |
| Next.js patched | ✅ | 20/05/2026 |
| Hero image | ✅ | 20/05/2026 |
| Sitemap completo | ✅ | 20/05/2026 |
| Testes mínimos API | ✅ Parcial (Vitest unitário) | 20/05/2026 |
| Git + CI | ⬜ Parcial (workflow `.github/workflows/nexshape-site-ci.yml`) | |
| Revisão jurídica legais + Credit | ⬜ | |
| Monitoramento uptime | ⬜ | |
| Domínio + SSL | ⬜ | |
| README deploy | ✅ | 20/05/2026 |

**Bloqueadores restantes:** CRM real em produção, `git init` + repositório remoto, Upstash recomendado em prod.

---

## 27. Plano de Ação Prioritizado

| Prioridade | ID | Item | Descrição | Impacto | Esforço | Status | Concluído em |
|------------|-----|------|-----------|---------|---------|--------|--------------|
| P0 | C1 | Rate limit | Upstash + fallback memória | Alto | Médio | ✅ | 20/05/2026 |
| P0 | C2 | Patch Next | `15.5.18` | Alto | Baixo–Médio | ✅ | 20/05/2026 |
| P0 | C3 | CRM prod | `webhook` + URL + teste | Alto | Baixo | ⬜ | |
| P0 | C5 | Git + CI | lint, build, audit no PR | Alto | Médio | ⬜ Parcial | 20/05/2026 |
| P1 | A1 | Security headers | X-Frame, nosniff, Referrer-Policy | Alto | Baixo | ✅ | 20/05/2026 |
| P1 | A2 | Sitemap + hero | SEO/UX | Médio | Baixo | ✅ | 20/05/2026 |
| P1 | A5 | CAPTCHA | Turnstile opcional | Alto | Médio | ✅ | 20/05/2026 |
| P1 | A4 | README | Operação | Médio | Baixo | ✅ | 20/05/2026 |
| P2 | M1 | Vitest | schema + query-param + rate-limit + turnstile | Médio | Médio | ✅ | 20/05/2026 |
| P2 | A3 | SSG/query-param | 7 produtos | Baixo | Baixo | ✅ | 20/05/2026 |
| P2 | M5 | Postgres B | LGPD/retry | Médio | Alto | ⬜ | |
| P3 | M2 | Lighthouse CI | Performance | Baixo | Médio | ⬜ | |
| P3 | B1 | URLs unificadas | Redirects 301 em `next.config.ts` | Baixo | Médio | ✅ | 20/05/2026 |

---

## Conclusão

O workspace **PaivaTech Solutions** concentra-se no site institucional **nexshape-site** (Next.js) para a Suite NexShape, com captura de leads via API e integração CRM por webhook. **Fabrica** é infraestrutura de especificação por agentes. Os **produtos SaaS** da suite **não estão implementados** neste repositório.

**Readiness para produção (v1.2):** MVP reforçado com Turnstile (opcional), CSP, 12 testes e CI Fabrica. **Go-live condicional:** CRM webhook, Upstash, chaves Turnstile em prod, `git init` + push (ver `docto/GIT_SETUP.md`), deploy Vercel e revisão jurídica.

---

## Instruções para manutenção deste documento

Ao concluir qualquer correção:

1. Atualizar **Última atualização** e **Versão** no cabeçalho.
2. Registrar linha em **Histórico de atualizações**.
3. Marcar item correspondente: `⬜` → `✅` nas seções 23, 24, 26 e 27.
4. Se mitigar risco, atualizar coluna **Status mitigação** na seção 23.
5. Recalcular notas na seção 25 se mudança for significativa.
6. Remover bloqueador da seção 26 quando critério atendido.

**Referência cruzada:** template original em `docto/Auditoria_Completa.txt`.
