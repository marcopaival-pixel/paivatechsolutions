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
  title: "PaivaGrowth AI · Automação de Marketing, CRM e Chatbots de Elite",
  description:
    "Escile suas vendas com CRM Kanban, automações inteligentes de fluxos de trabalho e chatbots de IA com base de conhecimento (RAG).",
};

export default async function PaivaGrowthPage() {
  const contactHref = "/contato?produto=Marketing";
  const systemAccessUrl = await getSystemAccessUrlBySlug("marketing");
  const benefits = [
    { 
      title: "CRM Kanban de Vendas", 
      description: "Pipeline visual com colunas e estágios customizáveis para gerenciar leads, mover contatos e controlar o valor dos negócios.", 
      icon: "📊" 
    },
    { 
      title: "Automações Inteligentes", 
      description: "Crie fluxos de trabalho que disparam ações instantâneas a partir de gatilhos como criação de lead ou mudança de estágio.", 
      icon: "⚡" 
    },
    { 
      title: "IA Generativa & RAG", 
      description: "Alimente o cérebro da IA com arquivos PDF/TXT para responder a perguntas frequentes de forma precisa e sem alucinações.", 
      icon: "🧠" 
    },
    { 
      title: "Simulador de WhatsApp", 
      description: "Teste a personalidade do chatbot e o prompt do sistema em tempo real antes de disponibilizar para os clientes.", 
      icon: "💬" 
    },
    { 
      title: "Fluxos de Trabalho Visuais", 
      description: "Desenhe a jornada do lead com gatilhos de CRM, delays de espera e envios de mensagens customizadas.", 
      icon: "⚙️" 
    },
    { 
      title: "Faturamento & Tokens", 
      description: "Controle o consumo de tokens mensais por tenant e gerencie assinaturas integradas de maneira transparente via Stripe.", 
      icon: "🛡️" 
    },
  ];

  const modules = [
    {
      title: "CRM & Pipelines",
      features: [
        "Quadro Kanban de Vendas",
        "Arrastar e Soltar (Drag & Drop)",
        "Controle de Valores Estimados",
        "Contato Direto por Telefone e E-mail",
      ],
    },
    {
      title: "Automação & Gatilhos",
      features: [
        "Gatilho: Novo Lead Capturado",
        "Gatilho: Mudança de Estágio do Funil",
        "Gatilho: Mensagem WhatsApp Recebida",
        "Ação: Envio automático de WhatsApp e delays (ex: aguardar 10 min)",
      ],
    },
    {
      title: "Agente Inteligente IA",
      features: [
        "Prompt de Personalidade Editável",
        "Upload de PDF/TXT para RAG",
        "API gpt-4o-mini Integrada",
        "Simulador Interno de WhatsApp",
      ],
    },
  ];

  const targetAudience = [
    {
      title: "Starter",
      plans: ["Plano Inicial"],
      description: "Perfeito para negócios locais que querem organizar os leads no CRM e iniciar no atendimento automatizado por IA.",
      icon: "🌱",
    },
    {
      title: "Professional",
      plans: ["Escala", "Crescimento"],
      description: "Para empresas que precisam de automações robustas, múltiplos funis de vendas e inteligência contextual por RAG.",
      icon: "🚀",
    },
    {
      title: "Enterprise",
      plans: ["Customizado"],
      description: "Customização avançada de fluxos de dados, limite elevado de tokens, integrações adicionais e suporte prioritário.",
      icon: "💎",
    },
  ];

  return (
    <div className="relative isolate space-y-24 pb-8 sm:space-y-32 overflow-hidden">
      <ProductLandingTopBar
        contactHref={contactHref}
        systemAccessUrl={systemAccessUrl}
        accentButtonClass="bg-purple-600 shadow-purple-500/20 hover:bg-purple-500"
      />

      {/* Background decoration with animated blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-blob"></div>
        <div className="absolute bottom-[20%] left-[-5%] w-[35%] h-[35%] bg-indigo-600/5 blur-[100px] rounded-full animate-blob animation-delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="space-y-10">
            <div className="inline-flex items-center rounded-full bg-purple-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.3em] text-purple-400 ring-1 ring-inset ring-purple-400/20">
              Marketing de Performance & IA de Atendimento
            </div>
            <h1 className="premium-gradient-text text-balance text-3xl font-black tracking-tight sm:text-5xl leading-[1.1]">
              PaivaGrowth AI <br/> <span className="text-white text-2xl sm:text-4xl">Sua Operação Escalável</span>
            </h1>
            <p className="text-base leading-7 text-slate-400 max-w-xl">
              Automatize campanhas de captação de leads, controle seu funil com CRM Kanban e delegue atendimentos para IAs treinadas com a base de conhecimento do seu negócio.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-6">
              <Link
                href={systemAccessUrl || "#"}
                {...systemAccessLinkProps(systemAccessUrl || "")}
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-purple-600 px-10 py-5 text-sm font-black uppercase tracking-widest text-white shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all hover:bg-purple-500 hover:shadow-[0_0_60px_rgba(168,85,247,0.7)] hover:-translate-y-1 active:scale-95 border border-purple-500/30"
              >
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                  <div className="relative h-full w-12 bg-white/20" />
                </div>
                <span>Acessar o Sistema PaivaGrowth</span>
                <span className="transition-transform group-hover:translate-x-2">→</span>
              </Link>
            </div>
          </div>
          <div className="relative px-4 [perspective:1000px]">
            <div className="relative aspect-[4/3] w-full lg:max-h-[480px] rounded-3xl overflow-hidden border border-white/10 bg-slate-900/40 backdrop-blur-3xl shadow-3xl transform [rotateY(5deg)] hover:[rotateY(0deg)] transition-transform duration-1000 ease-out">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent" />
              <Image
                src="/images/products/marketing/hero-mockup.png"
                alt="PaivaGrowth AI Dashboard Preview"
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
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-purple-500">Marketing Autônomo</h2>
          <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Recursos do PaivaGrowth AI
          </h3>
          <p className="text-base text-slate-400">
            A convergência perfeita de gestão de leads (CRM), automação de fluxos de contato e inteligência conversacional contextualizada para o seu negócio.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="glass-card group p-10 rounded-[2.5rem] transition-all hover:-translate-y-2">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-600/10 text-4xl transition-transform group-hover:scale-110 group-hover:rotate-6 border border-purple-500/20">
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
        <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full animate-pulse-slow" />
        <div className="relative z-10 grid gap-20 lg:grid-cols-2 lg:items-center">
          <div className="space-y-10">
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl leading-[1.1]">
              IA Generativa <br/> <span className="text-purple-400">RAG em Tempo Real.</span>
            </h2>
            <p className="text-base text-slate-400 leading-7">
              Alimente seu assistente com manuais de marca, tabelas de preço, cardápios ou regulamentos. Nossa IA busca informações exclusivamente nos arquivos inseridos para garantir respostas fidedignas e evitar alucinações.
            </p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {["Base de Arquivos RAG", "Prompt do Sistema Customizado", "Simulador Integrado", "Limite de Tokens Transparente"].map((item) => (
                <li key={item} className="flex items-center gap-4 text-slate-300 font-bold text-sm bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/20 text-purple-400 text-[10px]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-video rounded-[2rem] border border-white/10 bg-slate-950 flex items-center justify-center shadow-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-indigo-500/10" />
            <Logo variant="icon" className="h-64 opacity-80 group-hover:scale-110 transition-transform duration-1000" theme="dark" />
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="space-y-20">
        <div className="text-center space-y-6">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-purple-500">Módulos da Plataforma</h2>
          <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Mapeamento Técnico de Funcionalidades</h3>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {modules.map((module) => (
            <div key={module.title} className="p-10 border border-white/5 rounded-[2.5rem] bg-white/2 hover:bg-white/5 transition-colors">
              <h4 className="text-xl font-black text-white mb-8 uppercase tracking-widest">{module.title}</h4>
              <ul className="space-y-5">
                {module.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-4 text-sm text-slate-400 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-600 shadow-[0_0_8px_rgba(147,51,234,0.8)]" />
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
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-purple-500">Modelos de Assinatura</h2>
          <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Escalabilidade Sob Medida</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">Adequado para empresas que estão iniciando ou para grandes operações comerciais.</p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {targetAudience.map((item) => (
            <div key={item.title} className="glass-card group p-10 rounded-[2.5rem] flex flex-col h-full">
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-purple-600/10 text-5xl border border-purple-500/20 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              
              <h4 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">{item.title}</h4>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {item.plans.map(plan => (
                  <span key={plan} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-purple-400">
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
        title="Pronto para impulsionar"
        titleHighlight="suas conversões?"
        highlightClassName="text-purple-500"
        description="Simplifique a captação de leads, estruture réguas de relacionamento por canais digitais e aumente a conversão com IA generativa contextual."
        productSlug="marketing"
        accent="purple"
        systemAccessUrl={systemAccessUrl}
      />
    </div>
  );
}
