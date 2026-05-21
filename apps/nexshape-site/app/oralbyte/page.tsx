import type { Metadata } from "next";
import Image from "next/image";
import { Logo } from "@/components/Logo";
import { ProductFinalCta } from "@/components/ProductFinalCta";
import { ProductHeroCtas } from "@/components/ProductHeroCtas";
import { ProductLandingTopBar } from "@/components/ProductLandingTopBar";
import { getSystemAccessUrlBySlug } from "@/lib/products/landing-access";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "OralByte · Gestão Premium para Clínicas & Harmonização Orofacial (HOF)",
  description:
    "Organize a recepção, agenda multi-profissional, prontuário clínico e procedimentos estéticos/HOF com inteligência e controle total de insumos.",
};

export default async function OralBytePage() {
  const contactHref = "/contato?produto=oralbyte";
  const systemAccessUrl = await getSystemAccessUrlBySlug("dental");
  const benefits = [
    {
      title: "Gestão Multiclínica (SaaS)",
      description: "Controle múltiplos consultórios ou franquias em uma única conta, com isolamento total de dados e painel administrativo centralizado.",
      icon: "🏢",
    },
    {
      title: "Harmonização Orofacial (HOF)",
      description: "Mapeamento facial completo com registro milimétrico de dosagens, marca, número de lote de toxinas, preenchedores e fios.",
      icon: "💉",
    },
    {
      title: "Prontuário & Anamnese",
      description: "Ficha clínica completa, questionário de saúde customizável, histórico de patologias, alergias e linha do tempo de evolução.",
      icon: "📋",
    },
    {
      title: "Agenda Multi-profissional",
      description: "Calendário interativo filtrado por especialista com status em tempo real (agendado, confirmado, falta, concluído).",
      icon: "📅",
    },
    {
      title: "Faturamento & API Metrics",
      description: "Acompanhe de forma transparente o consumo de envio de WhatsApp, consultas cadastrais CPF/CNPJ e armazenamento de imagens.",
      icon: "📊",
    },
    {
      title: "Termos & Consentimento",
      description: "Emissão de termos de consentimento e intercorrências com assinatura eletrônica integrada e total conformidade com a LGPD.",
      icon: "🔐",
    },
  ];

  const modules = [
    {
      title: "Agenda & Recepção",
      features: [
        "Cadastro público de pacientes (PF/PJ)",
        "Validação algorítmica de CPF/CNPJ",
        "Lembretes de consulta via WhatsApp/E-mail",
        "Controle de status de comparecimento",
      ],
    },
    {
      title: "Clínico & HOF",
      features: [
        "Mapeamento por regiões faciais",
        "Evolução por sessão de atendimento",
        "Timeline de fotos Antes & Depois",
        "Termos de consentimento assinados",
      ],
    },
    {
      title: "Financeiro & Operações",
      features: [
        "Contas a pagar e a receber",
        "Pacotes de tratamentos por sessões",
        "Operação e downloads de Backups do DB",
        "Geração de chaves de API externa",
      ],
    },
  ];

  const faqs = [
    {
      q: "O OralByte atende redes de clínicas ou franquias?",
      a: "Sim! Nossa arquitetura multitenancy permite gerenciar múltiplos consultórios com total isolamento de dados por clinicId, oferecendo aos administradores métricas globais e aos profissionais acesso estrito à sua unidade.",
    },
    {
      q: "Como funciona a validação no cadastro de pacientes?",
      a: "No link de onboarding público, o paciente preenche seus dados (Pessoa Física ou Jurídica). O sistema realiza a validação do algoritmo oficial de CPF/CNPJ antes de salvar, evitando duplicidades ou dados incorretos no banco.",
    },
    {
      q: "Qual é o diferencial do módulo de Harmonização Orofacial (HOF)?",
      a: "Oferecemos um mapa facial interativo onde o profissional registra a aplicação de toxina botulínica, preenchedores, bioestimuladores e fios de sustentação. O sistema registra a dose, a região exata, a marca e o lote do produto, além de manter um controle estrito de intercorrências e condutas.",
    },
    {
      q: "Como o consumo de APIs é tarifado no modelo SaaS?",
      a: "O administrador acompanha em tempo real o dashboard de consumo. O faturamento consolida a assinatura fixa e a cobrança variável de APIs consumidas (consultas de crédito de CPF/CNPJ, envio real de WhatsApp e armazenamento de fotos na nuvem).",
    },
    {
      q: "Existe controle de termos de consentimento e LGPD?",
      a: "Sim. O sistema permite emitir termos específicos para cada procedimento estético e odontológico, coletando a assinatura do paciente com registros de data, hora e IP para total validade jurídica e conformidade regulatória.",
    },
  ];

  const targetAudience = [
    {
      title: "Clínica Standard",
      plans: ["Básico", "Profissional"],
      description: "Ideal para consultórios individuais. Agenda, prontuário clássico, controle financeiro básico e suporte a múltiplos profissionais.",
      icon: "🦷",
    },
    {
      title: "Clínica HOF & Estética",
      plans: ["Profissional HOF", "Premium"],
      description: "Foco total em procedimentos estéticos avançados. Mapeamento facial, gestão de lotes de insumos, termos de consentimento eletrônico e galeria de fotos.",
      icon: "✨",
    },
    {
      title: "Redes & Franquias",
      plans: ["Enterprise", "Custom API"],
      description: "Estrutura robusta multitenant com relatórios globais de faturamento, webhooks integrados, chaves de API externa e limites estendidos de armazenamento.",
      icon: "🌐",
    },
  ];

  return (
    <div className="relative isolate space-y-32 pb-20 overflow-hidden">
      <ProductLandingTopBar
        contactHref={contactHref}
        systemAccessUrl={systemAccessUrl}
        accentButtonClass="bg-teal-600 shadow-teal-500/20 hover:bg-teal-500"
      />

      {/* Background decoration with animated blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-teal-600/10 blur-[120px] rounded-full animate-blob"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[35%] h-[35%] bg-cyan-600/5 blur-[100px] rounded-full animate-blob animation-delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center rounded-full bg-teal-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.3em] text-teal-400 ring-1 ring-inset ring-teal-400/20">
              Prontuário Inteligente, Agenda Multi-profissional e Mapeamento Facial HOF
            </div>
            <h1 className="premium-gradient-text text-balance text-3xl font-black tracking-tight sm:text-5xl leading-[1.1]">
              OralByte <br /> <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent text-2xl sm:text-4xl">& Harmonização</span>
            </h1>
            <p className="text-base leading-7 text-slate-400 max-w-xl">
              Uma plataforma SaaS moderna para simplificar o Onboarding de pacientes, organizar a agenda de especialistas e otimizar procedimentos clínicos e de estética facial com controle rigoroso de insumos, termos jurídicos e faturamento.
            </p>
            <ProductHeroCtas
              contactHref={contactHref}
              systemAccessUrl={systemAccessUrl}
              primaryButtonClass="rounded-2xl bg-teal-600 px-10 py-5 text-sm font-black uppercase tracking-widest text-white shadow-2xl shadow-teal-500/40 hover:bg-teal-500 transition-all active:scale-95"
              hideDemoButton
            />
          </div>
          <div className="relative px-4 [perspective:1000px]">
            <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-slate-900/40 backdrop-blur-3xl shadow-3xl transform [rotateY(-5deg)] hover:[rotateY(0deg)] transition-transform duration-1000 ease-out">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-transparent" />
              <Image
                src="/images/products/dental/hero-mockup.png"
                alt="OralByte Dashboard Preview"
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
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-teal-500">Recursos de Ponta</h2>
          <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Acelerando sua Prática Clínica
          </h3>
          <p className="text-base text-slate-400">
            A combinação ideal entre organização operacional para consultórios e ferramentas específicas para odontologia e estética corporal.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="glass-card group p-10 rounded-[2.5rem] transition-all hover:-translate-y-2 border border-white/5 hover:border-teal-500/30">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-600/10 text-4xl transition-transform group-hover:scale-110 group-hover:rotate-6 border border-teal-500/20">
                {benefit.icon}
              </div>
              <h4 className="text-xl font-black text-white mb-4 uppercase tracking-tight">{benefit.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOF Specialization Section */}
      <section className="relative rounded-[3rem] bg-[#020617] px-10 py-24 overflow-hidden border border-white/5">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-teal-500/10 blur-[150px] rounded-full animate-pulse-slow" />
        <div className="relative z-10 grid gap-20 lg:grid-cols-2 lg:items-center">
          <div className="space-y-10">
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl leading-[1.1]">
              Mapeamento de HOF <br /> <span className="text-teal-400">com precisão cirúrgica.</span>
            </h2>
            <p className="text-base text-slate-400 leading-7">
              Acompanhe a aplicação de toxinas e volumizadores com marcação visual detalhada de pontos no mapa facial. Registre dosagens, lotes de ampolas e gerencie termos legais em instantes.
            </p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {["Mapa Facial Interativo", "Controle de Lote & Ampolas", "Termo de Consentimento Livre", "Galeria de Evolução por Fotos"].map((item) => (
                <li key={item} className="flex items-center gap-4 text-slate-300 font-bold text-sm bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 text-[10px]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-video rounded-[2rem] border border-white/10 bg-slate-950 flex items-center justify-center shadow-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 via-transparent to-cyan-500/10" />
            <Logo variant="icon" className="h-64 opacity-80 group-hover:scale-110 transition-transform duration-1000" theme="dark" />
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="space-y-20">
        <div className="text-center space-y-6">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-teal-500">Módulos do Sistema</h2>
          <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Arquitetura Completa de Gestão</h3>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {modules.map((module) => (
            <div key={module.title} className="p-10 border border-white/5 rounded-[2.5rem] bg-white/2 hover:bg-white/5 transition-colors">
              <h4 className="text-xl font-black text-white mb-8 uppercase tracking-widest">{module.title}</h4>
              <ul className="space-y-5">
                {module.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-4 text-sm text-slate-400 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-600 shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
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
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-teal-500">Soluções</h2>
          <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Perfis & Integrações</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">Desenvolvido sob medida para profissionais individuais, clínicas de estética e franquias odontológicas.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {targetAudience.map((item) => (
            <div key={item.title} className="glass-card group p-10 rounded-[2.5rem] flex flex-col h-full border border-white/5 hover:border-teal-500/30">
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-600/10 text-5xl border border-teal-500/20 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>

              <h4 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">{item.title}</h4>

              <div className="flex flex-wrap gap-2 mb-6">
                {item.plans.map(plan => (
                  <span key={plan} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-teal-400">
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
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-teal-500">FAQ</h2>
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
        title="Eleve o nível da sua"
        titleHighlight="Gestão Clínica."
        highlightClassName="text-teal-500"
        description="A integração perfeita de recepção, agenda odontológica e harmonização orofacial em um ambiente seguro, ágil e em total conformidade."
        productSlug="dental"
        accent="teal"
        systemAccessUrl={systemAccessUrl}
      />
    </div>
  );
}
