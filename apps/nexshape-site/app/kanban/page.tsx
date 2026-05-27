import type { Metadata } from "next";
import Image from "next/image";
import { ProductFinalCta } from "@/components/ProductFinalCta";
import Link from "next/link";
import { ProductHeroCtas } from "@/components/ProductHeroCtas";
import { ProductLandingTopBar } from "@/components/ProductLandingTopBar";
import { getSystemAccessUrlBySlug } from "@/lib/products/landing-access";
import { systemAccessLinkProps } from "@/lib/products/system-access-link";

export const metadata: Metadata = {
  title: "KanbaPaiva · Gestão Ágil e Produtividade",
  description:
    "Organize seus fluxos de trabalho com o KanbaPaiva. Gestão visual de tarefas, logs de atividade e colaboração em tempo real.",
};

export default async function KanbanPage() {
  const contactHref = "/contato?produto=kanban";
  const systemAccessUrl = await getSystemAccessUrlBySlug("kanban");
  const benefits = [
    { title: "Gestão Visual (Kanban)", description: "Arraste e solte cartões entre colunas customizáveis para um controle total do fluxo.", icon: "📋" },
    { title: "Histórico de Atividade", description: "Acompanhe cada mudança, comentário e movimentação com logs detalhados de eventos.", icon: "🕒" },
    { title: "Colaboração em Equipe", description: "Sistema de comentários e menções para manter a comunicação centralizada na tarefa.", icon: "👥" },
    { title: "Políticas de Acesso", description: "Controle granular de permissões por quadro, garantindo segurança e privacidade.", icon: "🔐" },
    { title: "API de Integração", description: "Conecte seus fluxos com outras ferramentas através de nossa API robusta.", icon: "🔗" },
    { title: "Dashboard Dinâmico", description: "Visualize o progresso da sua equipe com métricas de produtividade em tempo real.", icon: "📊" },
  ];

  const modules = [
    {
      title: "Quadros & Listas",
      features: ["Quadros Ilimitados", "Colunas Customizáveis", "Etiquetas Coloridas", "Datas de Entrega (Due Dates)"],
    },
    {
      title: "Produtividade",
      features: ["Registro de Atividade Completo", "Sistema de Comentários", "Anexos de Arquivos", "Busca Global de Cards"],
    },
    {
      title: "Administração",
      features: ["Gestão de Usuários e Times", "Permissões por Nível", "Audit Logs para Segurança", "Backup de Dados"],
    },
  ];

  const targetAudience = [
    {
      title: "Desenvolvimento",
      plans: ["Tech Teams"],
      description: "Ideal para sprints de software, gestão de bugs e roadmap de produtos com metodologias ágeis.",
      icon: "/images/products/kanban/icon-dev.png",
    },
    {
      title: "Marketing & RH",
      plans: ["Business"],
      description: "Organize campanhas, processos seletivos e fluxos operacionais de forma visual e intuitiva.",
      icon: "/images/products/kanban/icon-marketing.png",
    },
    {
      title: "Pessoal",
      plans: ["Indivíduos"],
      description: "Gerencie seus projetos pessoais, estudos e tarefas diárias com simplicidade e foco.",
      icon: "/images/products/kanban/icon-personal.png",
    },
  ];

  return (
    <div className="relative isolate space-y-24 pb-8 sm:space-y-32 overflow-hidden">
      {/* Header Actions */}
      <ProductLandingTopBar
        contactHref={contactHref}
        systemAccessUrl={systemAccessUrl}
        accentButtonClass="bg-violet-600 shadow-violet-500/20 hover:bg-violet-500"
      />

      {/* Background decoration with animated blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full animate-blob"></div>
        <div className="absolute bottom-[20%] left-[-5%] w-[35%] h-[35%] bg-indigo-600/5 blur-[100px] rounded-full animate-blob animation-delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="space-y-10">
            <div className="inline-flex items-center rounded-full bg-violet-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.3em] text-violet-400 ring-1 ring-inset ring-violet-400/20">
              Gestão Ágil de Alta Performance
            </div>
            <h1 className="premium-gradient-text text-balance text-3xl font-black tracking-tight sm:text-5xl leading-[1.1]">
              KanbaPaiva <br/> <span className="text-white text-2xl sm:text-4xl">Seu Fluxo de Elite</span>
            </h1>
            <p className="text-base leading-7 text-slate-400 max-w-xl">
              Visualize seu progresso, elimine gargalos e potencialize a entrega da sua equipe com uma interface pensada para a produtividade máxima.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-6">
              <Link
                href={systemAccessUrl || "#"}
                {...systemAccessLinkProps(systemAccessUrl || "")}
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-violet-600 px-10 py-5 text-sm font-black uppercase tracking-widest text-white shadow-[0_0_40px_rgba(124,58,237,0.5)] transition-all hover:bg-violet-500 hover:shadow-[0_0_60px_rgba(124,58,237,0.7)] hover:-translate-y-1 active:scale-95 border border-violet-500/30"
              >
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                  <div className="relative h-full w-12 bg-white/20" />
                </div>
                <span>Acessar o Sistema KanbaPaiva</span>
                <span className="transition-transform group-hover:translate-x-2">→</span>
              </Link>
            </div>
          </div>
          <div className="relative px-4 [perspective:1000px]">
            <div className="relative aspect-[4/3] w-full lg:max-h-[480px] rounded-3xl overflow-hidden border border-white/10 bg-slate-900/40 backdrop-blur-3xl shadow-3xl transform [rotateY(-5deg)] hover:[rotateY(0deg)] transition-transform duration-1000 ease-out">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-transparent" />
              <Image
                src="/images/products/kanban/hero-mockup.png"
                alt="KanbaPaiva Dashboard Preview"
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
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-violet-500">Metodologia Visual</h2>
          <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Domine seus Processos
          </h3>
          <p className="text-base text-slate-400">
            O KanbaPaiva adapta-se ao seu jeito de trabalhar, não o contrário. Flexibilidade total para qualquer tipo de projeto.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="glass-card group p-10 rounded-[2.5rem] transition-all hover:-translate-y-2">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600/10 text-4xl transition-transform group-hover:scale-110 group-hover:rotate-6 border border-violet-500/20">
                {benefit.icon}
              </div>
              <h4 className="text-xl font-black text-white mb-4 uppercase tracking-tight">{benefit.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Activity Log Spotlight */}
      <section className="relative rounded-[3rem] bg-[#020617] px-10 py-24 overflow-hidden border border-white/5">
        <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-violet-500/10 blur-[150px] rounded-full animate-pulse-slow" />
        <div className="relative z-10 grid gap-20 lg:grid-cols-2 lg:items-center">
          <div className="space-y-10">
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl leading-[1.1]">
              Atividade em <br/> <span className="text-violet-400">Tempo Real.</span>
            </h2>
            <p className="text-base text-slate-400 leading-7">
              Nunca perca o rastro de nada. O KanbaPaiva registra cada interação, permitindo auditoria completa e transparência total sobre quem fez o quê e quando.
            </p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {["Criação de Cards", "Troca de Colunas", "Novos Comentários", "Arquivamento"].map((item) => (
                <li key={item} className="flex items-center gap-4 text-slate-300 font-bold text-sm bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/20 text-violet-400 text-[10px]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-video rounded-[2rem] border border-white/10 bg-slate-950 flex items-center justify-center shadow-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 via-transparent to-purple-500/10" />
            <div className="text-8xl group-hover:scale-110 transition-transform duration-1000">🕒</div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="space-y-20">
        <div className="text-center space-y-6">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-violet-500">Recursos da Plataforma</h2>
          <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Completo para sua Gestão</h3>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {modules.map((module) => (
            <div key={module.title} className="p-10 border border-white/5 rounded-[2.5rem] bg-white/2 hover:bg-white/5 transition-colors">
              <h4 className="text-xl font-black text-white mb-8 uppercase tracking-widest">{module.title}</h4>
              <ul className="space-y-5">
                {module.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-4 text-sm text-slate-400 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-600 shadow-[0_0_8px_rgba(124,58,237,0.8)]" />
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
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-violet-500">Casos de Uso</h2>
          <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Para todos os perfis</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">De projetos pessoais a grandes operações corporativas, mantenha tudo sob controle.</p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {targetAudience.map((item) => (
            <div key={item.title} className="glass-card group p-8 rounded-[2.5rem] flex flex-col h-full overflow-hidden">
              <div className="mb-8 relative flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                <Image 
                  src={item.icon} 
                  alt={item.title} 
                  fill 
                  className="object-cover p-2"
                />
              </div>
              
              <h4 className="text-xl sm:text-2xl font-black text-white mb-1 uppercase tracking-tighter leading-none whitespace-nowrap">
                {item.title}
              </h4>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {item.plans.map(plan => (
                  <span key={plan} className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-[10px] font-black uppercase tracking-widest text-violet-400">
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
        title="Pronto para organizar"
        titleHighlight="seu dia a dia?"
        highlightClassName="text-violet-500"
        description="Junte-se às equipes que já utilizam o KanbaPaiva para gerenciar seus fluxos com eficiência e transparência."
        productSlug="kanban"
        accent="violet"
        systemAccessUrl={systemAccessUrl}
      />
    </div>
  );
}
