import type { Metadata } from "next";
import Image from "next/image";
import { Logo } from "@/components/Logo";
import { ProductFinalCta } from "@/components/ProductFinalCta";
import { ProductHeroCtas } from "@/components/ProductHeroCtas";
import { ProductLandingTopBar } from "@/components/ProductLandingTopBar";
import { getSystemAccessUrlBySlug } from "@/lib/products/landing-access";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Zyncora · Central de Atendimento Inteligente com IA",
  description:
    "Automatize suas vendas e suporte com IA generativa, integração oficial com WhatsApp e CRM completo.",
};

export default async function ZyncoraPage() {
  const contactHref = "/contato?produto=zyncora";
  const systemAccessUrl = await getSystemAccessUrlBySlug("chat");
  const benefits = [
    { title: "IA Generativa & RAG", description: "Treine seu bot com seus próprios documentos, manuais e site para respostas precisas.", icon: "🧠" },
    { title: "WhatsApp Cloud Oficial", description: "Conectividade robusta via API oficial da Meta, garantindo estabilidade e segurança.", icon: "💬" },
    { title: "Fluxos Visuais (No-Code)", description: "Crie jornadas de automação complexas com um construtor visual intuitivo.", icon: "🎨" },
    { title: "CRM & Pipelines", description: "Gestão completa de leads e negócios integrada diretamente ao fluxo de conversas.", icon: "📈" },
    { title: "Transbordo Humano", description: "Filas de atendimento inteligentes com transição fluida entre IA e agentes reais.", icon: "🎧" },
    { title: "Compliance LGPD", description: "Auditoria completa, gestão de consentimentos e privacidade nativa de ponta a ponta.", icon: "🛡️" },
  ];

  const modules = [
    {
      title: "Atendimento & Canais",
      features: ["WhatsApp Cloud API", "Web Chat Widget Customizável", "Filas por Setor (Comercial, Suporte)", "Respostas Rápidas & Templates"],
    },
    {
      title: "Comercial & Vendas",
      features: ["Pipelines de Vendas Customizáveis", "Gestão de Leads e Negócios (Deals)", "Segmentação por Tags Inteligentes", "Agendamento Automatizado"],
    },
    {
      title: "Inteligência & Gestão",
      features: ["Base de Conhecimento (RAG)", "IA Generativa (Gemini/GPT)", "Auditoria LGPD Completa", "Dashboards de Performance"],
    },
  ];

  const targetAudience = [
    {
      title: "Starter",
      plans: ["Plano Inicial"],
      description: "Ideal para pequenas empresas que precisam automatizar o primeiro contato e organizar o fluxo de mensagens.",
      icon: "🚀",
    },
    {
      title: "Professional",
      plans: ["Escala", "Crescimento"],
      description: "Solução robusta para empresas com múltiplos atendentes, necessidade de CRM e IA generativa avançada.",
      icon: "🏢",
    },
    {
      title: "Enterprise",
      plans: ["Custom", "Sob Medida"],
      description: "Customização total, integração com sistemas legados, SLA dedicado e suporte premium prioritário.",
      icon: "💎",
    },
  ];

  return (
    <div className="relative isolate space-y-32 pb-20 overflow-hidden">
      <ProductLandingTopBar
        contactHref={contactHref}
        systemAccessUrl={systemAccessUrl}
        accentButtonClass="bg-blue-600 shadow-blue-500/20 hover:bg-blue-500"
      />

      {/* Background decoration with animated blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-blob"></div>
        <div className="absolute bottom-[20%] left-[-5%] w-[35%] h-[35%] bg-indigo-600/5 blur-[100px] rounded-full animate-blob animation-delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.3em] text-blue-400 ring-1 ring-inset ring-blue-400/20">
              Plataforma Premium de IA Conversacional e CRM Inteligente
            </div>
            <h1 className="premium-gradient-text text-balance text-3xl font-black tracking-tight sm:text-5xl leading-[1.1]">
              Zyncora <br/> <span className="text-white text-2xl sm:text-4xl">Inteligência que Converte</span>
            </h1>
            <p className="text-base leading-7 text-slate-400 max-w-xl">
              A evolução do atendimento automatizado. Transforme conversas em oportunidades reais com IA generativa de ponta e gestão comercial integrada.
            </p>
            <ProductHeroCtas
              contactHref={contactHref}
              systemAccessUrl={systemAccessUrl}
              primaryButtonClass="rounded-2xl bg-blue-600 px-10 py-5 text-sm font-black uppercase tracking-widest text-white shadow-2xl shadow-blue-500/40 hover:bg-blue-500 transition-all active:scale-95"
              hideDemoButton
            />
          </div>
          <div className="relative px-4 [perspective:1000px]">
            <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-slate-900/40 backdrop-blur-3xl shadow-3xl transform [rotateY(5deg)] hover:[rotateY(0deg)] transition-transform duration-1000 ease-out">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent" />
              <Image
                src="/images/products/chat/hero-mockup.png"
                alt="Zyncora Dashboard Preview"
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
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-blue-500">Tecnologia Conversacional</h2>
          <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Por que escolher o Zyncora?
          </h3>
          <p className="text-base text-slate-400">
            Muito além de um chatbot. Uma infraestrutura completa para escalar seu atendimento com inteligência e segurança.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="glass-card group p-10 rounded-[2.5rem] transition-all hover:-translate-y-2">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10 text-4xl transition-transform group-hover:scale-110 group-hover:rotate-6 border border-blue-500/20">
                {benefit.icon}
              </div>
              <h4 className="text-xl font-black text-white mb-4 uppercase tracking-tight">{benefit.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Specialization Section */}
      <section className="relative rounded-[3rem] bg-[#020617] px-10 py-24 overflow-hidden border border-white/5">
        <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full animate-pulse-slow" />
        <div className="relative z-10 grid gap-20 lg:grid-cols-2 lg:items-center">
          <div className="space-y-10">
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl leading-[1.1]">
              IA Generativa <br/> <span className="text-blue-400">Contextualizada.</span>
            </h2>
            <p className="text-base text-slate-400 leading-7">
              O Zyncora utiliza RAG (Retrieval-Augmented Generation) para que a IA responda baseada exclusivamente no conhecimento da sua empresa, evitando alucinações e garantindo precisão técnica.
            </p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {["Agente de Triagem", "Agente de Vendas", "Agente de Suporte", "Agente de Auditoria"].map((item) => (
                <li key={item} className="flex items-center gap-4 text-slate-300 font-bold text-sm bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-[10px]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-video rounded-[2rem] border border-white/10 bg-slate-950 flex items-center justify-center shadow-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-500/10" />
            <Logo variant="icon" className="h-64 opacity-80 group-hover:scale-110 transition-transform duration-1000" theme="dark" />
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="space-y-20">
        <div className="text-center space-y-6">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-blue-500">Módulos do Sistema</h2>
          <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Gestão 360º de Conversas</h3>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {modules.map((module) => (
            <div key={module.title} className="p-10 border border-white/5 rounded-[2.5rem] bg-white/2 hover:bg-white/5 transition-colors">
              <h4 className="text-xl font-black text-white mb-8 uppercase tracking-widest">{module.title}</h4>
              <ul className="space-y-5">
                {module.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-4 text-sm text-slate-400 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
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
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-blue-500">Modelos de Negócio</h2>
          <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Escalabilidade para todos</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">Do pequeno empreendedor à grande corporação, o Zyncora se adapta ao seu volume.</p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {targetAudience.map((item) => (
            <div key={item.title} className="glass-card group p-10 rounded-[2.5rem] flex flex-col h-full">
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600/10 text-5xl border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              
              <h4 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">{item.title}</h4>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {item.plans.map(plan => (
                  <span key={plan} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-blue-400">
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

      <ProductFinalCta
        title="Sua empresa está"
        titleHighlight="pronta para a IA?"
        highlightClassName="text-blue-500"
        description="O Zyncora conecta sua empresa a novos níveis de produtividade através de uma plataforma inteligente de IA generativa e CRM integrado."
        productSlug="chat"
        accent="blue"
        systemAccessUrl={systemAccessUrl}
      />
    </div>
  );
}
