import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { ProductFinalCta } from "@/components/ProductFinalCta";
import { ProductHeroCtas } from "@/components/ProductHeroCtas";
import { ProductLandingTopBar } from "@/components/ProductLandingTopBar";
import { getSystemAccessUrlBySlug } from "@/lib/products/landing-access";

export const metadata: Metadata = {
  title: "PaivaTech Commerce · Gestão Comercial de Elite e PDV",
  description:
    "Sistema completo de gestão comercial e de vendas multi-tenant para restaurantes, cafeterias e comércio em geral, com PDV frente de caixa, KDS e comandas eletrônicas.",
};

export default async function PaivaTechCommercePage() {
  const contactHref = "/contato?produto=commerce";
  const systemAccessUrl = await getSystemAccessUrlBySlug("commerce");
  const benefits = [
    { title: "Arquitetura Multi-Tenant", description: "Isolamento total de dados por banco de dados SQLite para cada restaurante/estabelecimento comercial.", icon: "🏢" },
    { title: "PDV Frente de Caixa Rápido", description: "Interface de vendas ultra rápida com split de pagamento (PIX, Cartão, Dinheiro) e emissão simulada de NFC-e.", icon: "💻" },
    { title: "Gestão de Salão & Mesas", description: "Mapa interativo do salão com status em tempo real (livre, ocupado com subtotal, reservado).", icon: "🛋️" },
    { title: "Monitor de Cozinha (KDS)", description: "Kitchen Display System para visualização e despacho de pedidos por tempo de espera.", icon: "🍳" },
    { title: "Painel Executivo", description: "Indicadores em tempo real de faturamento diário, ocupação de mesas e tempo médio de preparo.", icon: "📊" },
    { title: "Provisionamento Instantâneo", description: "Criação de novos estabelecimentos em segundos com banco de dados isolado e cardápio de teste semeado.", icon: "🚀" },
  ];

  const modules = [
    {
      title: "Vendas & Frente de Caixa",
      features: ["PDV Rápido com Atalhos", "Split de Pagamentos Dinâmico", "Simulador de NFC-e com QR Code", "Histórico de Transações"],
    },
    {
      title: "Salão & Cozinha (KDS)",
      features: ["Mapa Visual de Mesas & Comandas", "Filtro de Status Colorido", "Kitchen Display System (KDS)", "Controle de Tempo de Espera"],
    },
    {
      title: "Administração & Multi-Tenant",
      features: ["Provisionamento Automatizado", "Configuração de Planos SaaS", "Gestão de Usuários e Permissões", "Isolamento Absoluto de Dados"],
    },
  ];

  const faqs = [
    { q: "O que é o FoodSaaS Builder / PaivaTech Commerce?", a: "É uma plataforma SaaS de gestão gastronômica e comercial multi-tenant, projetada para gerenciar múltiplos restaurantes e pontos de vendas com bancos de dados 100% isolados." },
    { q: "Como funciona o Split de Pagamento no PDV?", a: "Ao fechar uma conta no caixa, o operador pode dividir o pagamento entre múltiplas modalidades (ex: parte em PIX, parte em Cartão e o restante em Dinheiro) com poucos cliques." },
    { q: "O KDS atualiza em tempo real?", a: "Sim, os pedidos lançados nas mesas ou no PDV aparecem imediatamente no monitor de cozinha (KDS), ordenados por tempo de preparação." },
    { q: "O que significa o isolamento Multi-Tenant?", a: "Significa que cada restaurante cadastrado tem seu próprio arquivo de banco de dados. Isso impede o vazamento de informações e garante conformidade total com as diretrizes da LGPD." },
    { q: "Como posso criar um novo restaurante para testes?", a: "Basta acessar o portal do administrador e criar um novo estabelecimento informando o nome e o subdomínio desejado. O sistema cria automaticamente a estrutura em segundos." },
  ];

  const targetAudience = [
    {
      title: "Restaurantes & Bares",
      plans: ["Sabor & Grill"],
      description: "Controle completo do salão com comandas por mesa, KDS integrado e fechamento de caixa simplificado.",
      icon: "🍔",
    },
    {
      title: "Cafeterias & Bistrôs",
      plans: ["Estoque & Ficha Técnica"],
      description: "Lançamento ágil de itens, gestão de insumos, baixa automática em receitas e controle de caixa rápido.",
      icon: "☕",
    },
    {
      title: "Gestores de Redes",
      plans: ["Landlord Multi-tenant"],
      description: "Visão centralizada de faturamento, controle de assinaturas dos tenants e painel administrativo geral.",
      icon: "👑",
    },
  ];

  return (
    <div className="relative isolate space-y-32 pb-20 overflow-hidden">
      {/* Header Actions */}
      <ProductLandingTopBar
        contactHref={contactHref}
        systemAccessUrl={systemAccessUrl}
        accentButtonClass="bg-amber-600 shadow-amber-500/20 hover:bg-amber-500"
      />

      {/* Background decoration with animated blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-amber-600/10 blur-[120px] rounded-full animate-blob"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[35%] h-[35%] bg-orange-600/5 blur-[100px] rounded-full animate-blob animation-delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.3em] text-amber-400 ring-1 ring-inset ring-amber-400/20">
              Ecossistema Comercial Completo com Multi-tenancy
            </div>
            <h1 className="premium-gradient-text text-balance text-3xl font-black tracking-tight sm:text-5xl leading-[1.1]">
              PaivaTech <br/> <span className="text-white text-2xl sm:text-4xl">Commerce</span>
            </h1>
            <p className="text-base leading-7 text-slate-400 max-w-xl">
              A plataforma definitiva para restaurantes, bares, cafeterias e comércio em geral. Ofereça controle de salão, comandas eletrônicas, frente de caixa rápido com split de pagamento e monitor KDS, tudo sob uma arquitetura multi-tenant isolada e segura.
            </p>
            <ProductHeroCtas
              contactHref={contactHref}
              systemAccessUrl={systemAccessUrl}
              primaryButtonClass="rounded-2xl bg-amber-600 px-10 py-5 text-sm font-black uppercase tracking-widest text-white shadow-2xl shadow-amber-500/40 hover:bg-amber-500 transition-all active:scale-95"
            />
          </div>
          <div className="relative px-4 [perspective:1000px]">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-slate-900/40 backdrop-blur-3xl shadow-3xl transform [rotateY(-5deg)] hover:[rotateY(0deg)] transition-transform duration-1000 ease-out flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent" />
              <div className="relative text-center space-y-6">
                <span className="text-8xl block animate-bounce">🛒</span>
                <div className="inline-block rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-amber-400">
                  Frente de Caixa & KDS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="space-y-20">
        <div className="max-w-3xl space-y-6">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-amber-500">Módulos Inteligentes</h2>
          <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Uma Experiência Comercial de Elite
          </h3>
          <p className="text-base text-slate-400">
            Gerencie todos os aspectos do seu negócio com rapidez, segurança de dados e total flexibilidade operacional.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="glass-card group p-10 rounded-[2.5rem] transition-all hover:-translate-y-2">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-600/10 text-4xl transition-transform group-hover:scale-110 group-hover:rotate-6 border border-amber-500/20">
                {benefit.icon}
              </div>
              <h4 className="text-xl font-black text-white mb-4 uppercase tracking-tight">{benefit.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Database Isolation Section */}
      <section className="relative rounded-[3rem] bg-[#020617] px-10 py-24 overflow-hidden border border-white/5">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-amber-500/10 blur-[150px] rounded-full animate-pulse-slow" />
        <div className="relative z-10 grid gap-20 lg:grid-cols-2 lg:items-center">
          <div className="space-y-10">
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl leading-[1.1]">
              Segurança e <br/> <span className="text-amber-400">Isolamento Absoluto.</span>
            </h2>
            <p className="text-base text-slate-400 leading-7">
              A arquitetura multi-tenant provê a cada estabelecimento um arquivo SQLite exclusivo. Seus dados cadastrais, financeiros e de estoque ficam isolados de outros restaurantes, eliminando riscos de vazamento de dados.
            </p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {["Split de Banco por Tenant", "Conformidade com a LGPD", "Métricas Executivas Separadas", "Customização de Domínios"].map((item) => (
                <li key={item} className="flex items-center gap-4 text-slate-300 font-bold text-sm bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 text-[10px]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-video rounded-[2rem] border border-white/10 bg-slate-950 flex items-center justify-center shadow-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-orange-500/10" />
            <Logo variant="icon" className="h-64 opacity-80 group-hover:scale-110 transition-transform duration-1000" theme="dark" />
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="space-y-20">
        <div className="text-center space-y-6">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-amber-500">Recursos do Ecossistema</h2>
          <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Controle Comercial 360º</h3>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {modules.map((module) => (
            <div key={module.title} className="p-10 border border-white/5 rounded-[2.5rem] bg-white/2 hover:bg-white/5 transition-colors">
              <h4 className="text-xl font-black text-white mb-8 uppercase tracking-widest">{module.title}</h4>
              <ul className="space-y-5">
                {module.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-4 text-sm text-slate-400 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-600 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
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
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-amber-500">Público-Alvo</h2>
          <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Soluções sob medida para o seu Negócio</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">Do pequeno estabelecimento de bairro à grandes franqueadores e administradores de plataformas SaaS.</p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {targetAudience.map((item) => (
            <div key={item.title} className="glass-card group p-10 rounded-[2.5rem] flex flex-col h-full">
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-600/10 text-5xl border border-amber-500/20 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              
              <h4 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">{item.title}</h4>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {item.plans.map(plan => (
                  <span key={plan} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-amber-400">
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
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-amber-500">FAQ</h2>
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
        title="Pronto para impulsionar"
        titleHighlight="suas vendas?"
        highlightClassName="text-amber-500"
        description="Experimente o PaivaTech Commerce com automação de PDV, gestão por mesa e controle integrado de KDS para cozinha em tempo real."
        productSlug="commerce"
        accent="amber"
        systemAccessUrl={systemAccessUrl}
      />
    </div>
  );
}
