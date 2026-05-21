import type { Metadata } from "next";
import Image from "next/image";
import { Logo } from "@/components/Logo";
import { ProductFinalCta } from "@/components/ProductFinalCta";
import { ProductHeroCtas } from "@/components/ProductHeroCtas";
import { ProductLandingTopBar } from "@/components/ProductLandingTopBar";
import { getSystemAccessUrlBySlug } from "@/lib/products/landing-access";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "NexShape Saúde & Performance · Gestão Inteligente com IA",
  description:
    "Sistema completo para gestão de treinos, avaliações físicas, bioimpedância, dietas e acompanhamento da evolução corporal dos alunos.",
};

export default async function NexShapeFitnessPage() {
  const contactHref = "/contato?produto=fitness";
  const systemAccessUrl = await getSystemAccessUrlBySlug("fitness");
  const benefits = [
    { title: "Gestão Multiempresa", description: "Controle várias unidades ou clínicas com um único acesso e isolamento total de dados.", icon: "🏢" },
    { title: "Inteligência Artificial", description: "NexBot e Orquestrador de Agentes para automatizar vendas, treinos e suporte.", icon: "🤖" },
    { title: "Análise Corporal IA", description: "Avaliações físicas precisas utilizando visão computacional e bioimpedância.", icon: "🧬" },
    { title: "Progressão de Carga", description: "Predição neural de volume e intensidade para otimizar os resultados dos alunos.", icon: "📈" },
    { title: "CRM Integrado", description: "Gestão de leads, propostas comerciais e assinatura digital de contratos.", icon: "💼" },
    { title: "Social & Gamificação", description: "Comunidade interna, conquistas e feed de evolução para aumentar a retenção.", icon: "🎮" },
  ];

  const modules = [
    {
      title: "Performance & Treino",
      features: ["Catálogo com 1000+ exercícios", "Controle de 1RM e PRs", "Planos de treino automatizados", "Repouso Ativo & Mobilidade"],
    },
    {
      title: "Nutrição & Saúde",
      features: ["Diário alimentar com macros", "Integração OpenFoodFacts", "Alertas de saúde automáticos", "NexHydra: Controle de hidratação"],
    },
    {
      title: "Administração & BI",
      features: ["Financeiro com Split de Pagamento", "Dashboards de retenção", "Auditoria completa LGPD", "Emissão de relatórios em PDF"],
    },
  ];

  const faqs = [
    { q: "O NexShape atende redes de academias?", a: "Sim! Nossa arquitetura multi-tenant permite gerir múltiplas unidades de forma centralizada ou independente." },
    { q: "Como funciona a Análise Corporal via IA?", a: "O sistema utiliza algoritmos de visão computacional para analisar fotos e dados biométricos, gerando relatórios de composição corporal precisos." },
    { q: "Posso integrar com o Mercado Pago?", a: "Sim, o NexShape possui integração nativa para assinaturas, cobranças recorrentes e split de pagamentos." },
    { q: "O que é o NexBot?", a: "É o nosso assistente de IA que pode prescrever treinos, tirar dúvidas nutricionais e até ajudar na recepção da sua academia." },
    { q: "Os dados dos meus alunos estão seguros?", a: "Seguimos rigorosamente a LGPD, com criptografia de ponta a ponta e logs de auditoria detalhados." },
  ];

  const targetAudience = [
    {
      title: "Aluno",
      plans: ["Free", "Premium"],
      description: "Aplicativo para acompanhar treinos, dietas, bioimpedância, avaliações físicas e evolução corporal.",
      icon: "👤",
    },
    {
      title: "Profissional",
      plans: ["Starter", "Professional", "Enterprise", "Sob Medida"],
      description: "Plataforma para personal trainers, nutricionistas e profissionais da saúde gerenciarem seus clientes.",
      icon: "👨‍🏫",
    },
    {
      title: "Clínica",
      plans: ["Clinical Starter", "Clinical Professional", "Clinical Enterprise", "Sob Medida"],
      description: "Solução completa para clínicas com agenda, prontuário, avaliações e relatórios.",
      icon: "🏥",
    },
  ];

  return (
    <div className="relative isolate space-y-32 pb-20 overflow-hidden">
      <ProductLandingTopBar
        contactHref={contactHref}
        systemAccessUrl={systemAccessUrl}
        accentButtonClass="bg-indigo-600 shadow-indigo-500/20 hover:bg-indigo-500"
      />

      {/* Background decoration with animated blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-blob"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[35%] h-[35%] bg-emerald-600/5 blur-[100px] rounded-full animate-blob animation-delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center rounded-full bg-indigo-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.3em] text-indigo-400 ring-1 ring-inset ring-indigo-400/20">
              Plataforma Premium de Saúde e Performance com Inteligência Artificial
            </div>
            <h1 className="premium-gradient-text text-balance text-3xl font-black tracking-tight sm:text-5xl leading-[1.1]">
              NexShape <br/> <span className="text-white text-2xl sm:text-4xl">Saúde & Performance</span>
            </h1>
            <p className="text-base leading-7 text-slate-400 max-w-xl">
              A plataforma robusta para academias, personal trainers, nutricionistas, clínicas de saúde e profissionais de educação física. Gestão completa de saúde e resultados com IA nativa.
            </p>
            <ProductHeroCtas
              contactHref={contactHref}
              systemAccessUrl={systemAccessUrl}
              primaryButtonClass="rounded-2xl bg-indigo-600 px-10 py-5 text-sm font-black uppercase tracking-widest text-white shadow-2xl shadow-indigo-500/40 hover:bg-indigo-500 transition-all active:scale-95"
              hideDemoButton
            />
          </div>
          <div className="relative px-4 [perspective:1000px]">
            <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-slate-900/40 backdrop-blur-3xl shadow-3xl transform [rotateY(-5deg)] hover:[rotateY(0deg)] transition-transform duration-1000 ease-out">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent" />
              <Image
                src="/images/products/fitness/hero-mockup.png"
                alt="NexShape Dashboard Preview"
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
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-indigo-500">Vantagens Competitivas</h2>
          <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Por que migrar para o NexShape?
          </h3>
          <p className="text-base text-slate-400">
            Mais que um software de gestão, um parceiro estratégico para escalar sua operação com tecnologia de elite.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="glass-card group p-10 rounded-[2.5rem] transition-all hover:-translate-y-2">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600/10 text-4xl transition-transform group-hover:scale-110 group-hover:rotate-6 border border-indigo-500/20">
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
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full animate-pulse-slow" />
        <div className="relative z-10 grid gap-20 lg:grid-cols-2 lg:items-center">
          <div className="space-y-10">
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl leading-[1.1]">
              Inteligência Artificial <br/> <span className="text-indigo-400">em cada decisão.</span>
            </h2>
            <p className="text-base text-slate-400 leading-7">
              Nosso Orquestrador de Agentes conecta você a múltiplos modelos de IA especializados, garantindo que cada área do seu negócio tenha a melhor performance do mercado.
            </p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {["Agente de Vendas", "Agente Nutricional", "Agente de Treino", "Agente de Retenção"].map((item) => (
                <li key={item} className="flex items-center gap-4 text-slate-300 font-bold text-sm bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-[10px]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-video rounded-[2rem] border border-white/10 bg-slate-950 flex items-center justify-center shadow-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-cyan-500/10" />
            <Logo variant="icon" className="h-64 opacity-80 group-hover:scale-110 transition-transform duration-1000" theme="dark" />
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="space-y-20">
        <div className="text-center space-y-6">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-indigo-500">Módulos do Ecossistema</h2>
          <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Controle Total 360º</h3>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {modules.map((module) => (
            <div key={module.title} className="p-10 border border-white/5 rounded-[2.5rem] bg-white/2 hover:bg-white/5 transition-colors">
              <h4 className="text-xl font-black text-white mb-8 uppercase tracking-widest">{module.title}</h4>
              <ul className="space-y-5">
                {module.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-4 text-sm text-slate-400 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.8)]" />
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
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-indigo-500">Ecossistema</h2>
          <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Soluções para todos os perfis</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">Uma plataforma completa, adaptada para cada necessidade do ecossistema de saúde e performance.</p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {targetAudience.map((item) => (
            <div key={item.title} className="glass-card group p-10 rounded-[2.5rem] flex flex-col h-full">
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-600/10 text-5xl border border-indigo-500/20 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              
              <h4 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">{item.title}</h4>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {item.plans.map(plan => (
                  <span key={plan} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-indigo-400">
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

      {/* FAQ Section */}
      <section className="space-y-20">
        <div className="text-center space-y-6">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-indigo-500">FAQ</h2>
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
        title="Pronto para o"
        titleHighlight="Próximo Nível?"
        highlightClassName="text-indigo-500"
        description="O NexShape conecta alunos, profissionais e clínicas em uma plataforma inteligente para gestão de saúde, performance e evolução corporal."
        productSlug="fitness"
        accent="indigo"
        systemAccessUrl={systemAccessUrl}
      />
    </div>
  );
}
