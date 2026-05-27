import type { Metadata } from "next";
import Image from "next/image";
import { Logo } from "@/components/Logo";
import { ProductFinalCta } from "@/components/ProductFinalCta";
import Link from "next/link";
import { ProductHeroCtas } from "@/components/ProductHeroCtas";
import { ProductLandingTopBar } from "@/components/ProductLandingTopBar";
import { getSystemAccessUrlBySlug } from "@/lib/products/landing-access";
import { systemAccessLinkProps } from "@/lib/products/system-access-link";

export const metadata: Metadata = {
  title: "ConsultaTech · Inteligência em Crédito, Consultas Cadastrais & API",
  description:
    "Módulo robusto para consultas de CPF/CNPJ, histórico de veículos, gestão de carteira de créditos via PIX, conciliação e integração via API Sanctum.",
};

export default async function ConsultaTechPage() {
  const contactHref = "/contato?produto=credit";
  const systemAccessUrl = await getSystemAccessUrlBySlug("credit");
  const benefits = [
    {
      title: "Carteira Digital & Saldo",
      description: "Recargas de saldo flexíveis através de pacotes de crédito com geração de PIX dinâmico (QR Code) e confirmação em tempo real.",
      icon: "💳",
    },
    {
      title: "Consultas CPF, CNPJ & Veicular",
      description: "Buscas detalhadas de dados cadastrais, histórico de restrições financeiras e dados veiculares completos via provedores integrados.",
      icon: "🔍",
    },
    {
      title: "API REST via Sanctum",
      description: "Integração nativa para sistemas externos via tokens seguros. Endpoints para perfil, saldo de créditos e execução de consultas automáticas.",
      icon: "🔌",
    },
    {
      title: "Painel Financeiro & CSV",
      description: "Gestão completa de recebimentos, conciliação de faturas, logs de webhooks e exportação de relatórios para CSV otimizados para Excel (BOM).",
      icon: "📊",
    },
    {
      title: "Segurança 2FA TOTP",
      description: "Autenticação em duas etapas via Google Authenticator ou Authy para proteção de contas administrativas e operações sensíveis.",
      icon: "🔐",
    },
    {
      title: "Idempotência & Filas",
      description: "Processamento de webhooks e conciliações em background (workers assíncronos) com controle estrito de duplicidade de eventos.",
      icon: "🛡️",
    },
  ];

  const modules = [
    {
      title: "Área do Cliente",
      features: [
        "Visualização de saldo de créditos em tempo real",
        "Extrato completo de movimentações financeiras",
        "Aquisição de pacotes com PIX simulado/real",
        "Histórico detalhado de consultas executadas",
      ],
    },
    {
      title: "Painel Administrativo",
      features: [
        "Ajuste manual de saldo de usuários (admin/financeiro)",
        "Logs de auditoria completos (atividades administrativas)",
        "Reprocessamento de consultas falhadas sem débito",
        "Dashboard financeiro com conciliação manual de exceção",
      ],
    },
    {
      title: "API de Integração",
      features: [
        "Autenticação de portador (Bearer Token)",
        "Consulta de tipos e valores de consultas disponíveis",
        "Chamadas REST `/api/v1/consultations/{slug}`",
        "Validação de assinatura HMAC nos webhooks",
      ],
    },
  ];

  const faqs = [
    {
      q: "Como funciona o débito de créditos pelas consultas?",
      a: "Cada tipo de consulta (ex.: Busca cadastral de CPF, Histórico Veicular) possui um valor pré-definido em créditos. Ao executar a consulta pelo painel web ou via API, o saldo correspondente é debitado imediatamente da carteira do cliente.",
    },
    {
      q: "O reprocessamento de consultas falhadas consome créditos?",
      a: "Não. Através do painel de administração, a equipe de suporte pode reprocessar consultas que falharam temporariamente (devido a erros de provedores parceiros) sem que um novo débito seja efetuado no saldo do cliente.",
    },
    {
      q: "Como é garantida a segurança do webhook de pagamento PIX?",
      a: "O gateway envia os eventos de pagamento assinados com um cabeçalho `X-Mock-Signature` contendo um HMAC-SHA256 calculado sobre o corpo da requisição. O sistema valida essa assinatura usando a chave secreta configurada antes de processar qualquer recarga.",
    },
    {
      q: "Como funciona a API REST para integradores?",
      a: "Utilizando o Laravel Sanctum, os integradores geram chaves de API a partir do painel e as utilizam no cabeçalho Authorization. A API expõe endpoints em formato JSON para consultar saldos, verificar tipos de pesquisas disponíveis e disparar consultas cadastrais de forma automatizada.",
    },
    {
      q: "O uso da autenticação de dois fatores (2FA) é obrigatório?",
      a: "O ConsultaTech oferece a segurança 2FA via TOTP como opt-in nas configurações de perfil. Usuários que ativam a funcionalidade são obrigados a inserir o código de 6 dígitos no login do painel administrativo e a incluir a chave OTP na geração de novos tokens de API.",
    },
  ];

  const targetAudience = [
    {
      title: "Desenvolvedores & Tech",
      plans: ["API Standard", "API Custom"],
      description: "Integre as consultas diretamente no checkout do seu e-commerce, ERP ou plataforma de onboarding usando tokens de portador seguros e webhooks automatizados.",
      icon: "💻",
    },
    {
      title: "Analistas de Risco",
      plans: ["Painel Web", "Relatórios"],
      description: "Interface intuitiva para realizar buscas de CPFs/CNPJs manualmente, analisar fichas cadastrais, emitir extratos e exportar relatórios de compliance.",
      icon: "🕵️‍♂️",
    },
    {
      title: "Financeiro & Admin",
      plans: ["Gestão Geral", "Auditoria"],
      description: "Controle total de conciliação bancária, ajuste manual de créditos, auditoria estrita de ações administrativas (logs LGPD) e reprocessamento de transações.",
      icon: "👔",
    },
  ];

  return (
    <div className="relative isolate space-y-24 pb-8 sm:space-y-32 overflow-hidden">
      <ProductLandingTopBar
        contactHref={contactHref}
        systemAccessUrl={systemAccessUrl}
        accentButtonClass="bg-cyan-600 shadow-cyan-500/20 hover:bg-cyan-500"
      />

      {/* Background decoration with animated blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full animate-blob"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[35%] h-[35%] bg-indigo-600/5 blur-[100px] rounded-full animate-blob animation-delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="space-y-10">
            <div className="inline-flex items-center rounded-full bg-cyan-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.3em] text-cyan-400 ring-1 ring-inset ring-cyan-400/20">
              Análise cadastral inteligente, carteira digital de créditos e API REST
            </div>
            <h1 className="premium-gradient-text text-balance text-3xl font-black tracking-tight sm:text-5xl leading-[1.1]">
              ConsultaTech <br /> <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent text-2xl sm:text-4xl">& Decisão</span>
            </h1>
            <p className="text-base leading-7 text-slate-400 max-w-xl">
              Plataforma corporativa de consultas cadastrais. Gerencie seu orçamento de dados com uma carteira digital integrada via PIX dinâmico, consulte histórico de CPFs/CNPJs e automatize suas decisões de risco via API externa robusta.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-6">
              <Link
                href={systemAccessUrl || "#"}
                {...systemAccessLinkProps(systemAccessUrl || "")}
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-cyan-600 px-10 py-5 text-sm font-black uppercase tracking-widest text-white shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all hover:bg-cyan-500 hover:shadow-[0_0_60px_rgba(6,182,212,0.7)] hover:-translate-y-1 active:scale-95 border border-cyan-500/30"
              >
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                  <div className="relative h-full w-12 bg-white/20" />
                </div>
                <span>Acessar o Sistema ConsultaTech</span>
                <span className="transition-transform group-hover:translate-x-2">→</span>
              </Link>
            </div>
          </div>
          <div className="relative px-4 [perspective:1000px]">
            <div className="relative aspect-[4/3] w-full lg:max-h-[480px] rounded-3xl overflow-hidden border border-white/10 bg-slate-900/40 backdrop-blur-3xl shadow-3xl transform [rotateY(-5deg)] hover:[rotateY(0deg)] transition-transform duration-1000 ease-out">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent" />
              <Image
                src="/images/products/credit/hero-mockup.png"
                alt="ConsultaTech Dashboard Preview"
                fill
                className="object-contain p-8 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="space-y-20">
        <div className="max-w-3xl space-y-6">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-cyan-500">Recursos do Sistema</h2>
          <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Validação de Dados em Alta Escala
          </h3>
          <p className="text-base text-slate-400">
            Simplifique a esteira de validação cadastral do seu negócio com ferramentas focadas em performance, segurança e transparência financeira.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="glass-card group p-10 rounded-[2.5rem] transition-all hover:-translate-y-2 border border-white/5 hover:border-cyan-500/30">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-600/10 text-4xl transition-transform group-hover:scale-110 group-hover:rotate-6 border border-cyan-500/20">
                {benefit.icon}
              </div>
              <h4 className="text-xl font-black text-white mb-4 uppercase tracking-tight">{benefit.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlight Section */}
      <section className="relative rounded-[3rem] bg-[#020617] px-10 py-24 overflow-hidden border border-white/5">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full animate-pulse-slow" />
        <div className="relative z-10 grid gap-20 lg:grid-cols-2 lg:items-center">
          <div className="space-y-10">
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl leading-[1.1]">
              Fluxo Conciliado <br /> <span className="text-cyan-400">e 100% Auditável.</span>
            </h2>
            <p className="text-base text-slate-400 leading-7">
              Acompanhe cada centavo investido. O ConsultaTech registra logs detalhados de cada consulta, movimentações de crédito individuais por usuário, logs de webhooks idempotentes e auditorias de acessos administrativos.
            </p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {["Assinatura HMAC Webhooks", "Workers Assíncronos em Fila", "Log Geral de Auditoria Admin", "Exportação Excel Facilitada"].map((item) => (
                <li key={item} className="flex items-center gap-4 text-slate-300 font-bold text-sm bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 text-[10px]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-video rounded-[2rem] border border-white/10 bg-slate-950 flex items-center justify-center shadow-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-indigo-500/10" />
            <Logo variant="icon" className="h-64 opacity-80 group-hover:scale-110 transition-transform duration-1000" theme="dark" />
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="space-y-20">
        <div className="text-center space-y-6">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-cyan-500">Módulos do Sistema</h2>
          <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Controle 360º de Consultas</h3>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {modules.map((module) => (
            <div key={module.title} className="p-10 border border-white/5 rounded-[2.5rem] bg-white/2 hover:bg-white/5 transition-colors">
              <h4 className="text-xl font-black text-white mb-8 uppercase tracking-widest">{module.title}</h4>
              <ul className="space-y-5">
                {module.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-4 text-sm text-slate-400 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-600 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="space-y-20">
        <div className="text-center space-y-6">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-cyan-500">Soluções</h2>
          <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Flexibilidade Operacional</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">Nossas ferramentas cobrem as necessidades de todos os setores corporativos: de desenvolvedores a auditores.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {targetAudience.map((item) => (
            <div key={item.title} className="glass-card group p-10 rounded-[2.5rem] flex flex-col h-full border border-white/5 hover:border-cyan-500/30">
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-600/10 text-5xl border border-cyan-500/20 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>

              <h4 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">{item.title}</h4>

              <div className="flex flex-wrap gap-2 mb-6">
                {item.plans.map(plan => (
                  <span key={plan} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-cyan-400">
                    {plan}
                  </span>
                ))}
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-grow">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="space-y-20">
        <div className="text-center space-y-6">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-cyan-500">FAQ</h2>
          <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Perguntas Frequentes</h3>
        </div>
        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q} className="p-8 border border-white/5 rounded-3xl bg-slate-900/20">
              <h4 className="text-lg font-black text-white mb-3">{faq.q}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <ProductFinalCta
        title="Comece a consultar"
        titleHighlight="com Inteligência."
        highlightClassName="text-cyan-500"
        description="A infraestrutura ágil e segura que sua empresa precisa para validações cadastrais de CPF/CNPJ, veículos e gestão de limites de crédito."
        productSlug="credit"
        accent="cyan"
        systemAccessUrl={systemAccessUrl}
      />
    </div>
  );
}
