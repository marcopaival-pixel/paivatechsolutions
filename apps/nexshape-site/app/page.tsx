import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppContactButton } from "@/components/WhatsAppContactButton";
import { type ProductSlug } from "@/lib/content/products";
import { PRODUCT_LANDING_PATHS } from "@/lib/config/product-routes";
import { SITE_DESCRIPTION } from "@/lib/site/branding";
import { getProductsDynamic } from "@/lib/db";

export const dynamic = "force-dynamic";

const PRODUCT_CTA_LABELS: Record<ProductSlug, string> = {
  fitness: "Conhecer o NexShape",
  dental: "Conhecer o OralByte",
  chat: "Conhecer o Zyncora",
  credit: "Conhecer o ConsultaTech",
  kanban: "Conhecer o KanbaPaiva",
  commerce: "Conhecer o PaivaTech Commerce",
  marketing: "Conhecer o PaivaGrowth AI",
};

export const metadata: Metadata = {
  title: "PaivaTech Solutions",
  description: SITE_DESCRIPTION,
};
export default async function HomePage() {
  const products = await getProductsDynamic();
  return (
    <div className="relative isolate pb-20 overflow-hidden">
      {/* Background decoration with animated blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full animate-blob"></div>
        <div className="absolute top-[20%] right-[-5%] w-[35%] h-[35%] bg-purple-600/10 blur-[100px] rounded-full animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full animate-blob animation-delay-4000"></div>
      </div>

      <section className="mx-auto max-w-7xl px-4 pt-20 pb-16 flex flex-col items-center text-center">
        <div className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-400/20 bg-indigo-400/5 mb-8 animate-fade-in">
          PaivaTech Infrastructure Suite 2026
        </div>
        
        <h1 className="premium-gradient-text text-balance text-4xl md:text-5xl lg:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
          O Futuro da Gestão <br/> <span className="text-white">Operacional Inteligente</span>
        </h1>
        
        <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-400 mb-12">
          A PaivaTech Solutions apresenta um ecossistema de elite para verticais de alta performance. 
          Segurança, privacidade e IA integradas em cada módulo.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 mb-24">
          <Link
            href="/contato"
            className="rounded-2xl bg-indigo-600 px-10 py-5 text-sm font-black uppercase tracking-widest text-white shadow-2xl shadow-indigo-500/40 hover:bg-indigo-500 transition-all active:scale-95"
          >
            Falar com a equipe
          </Link>
          <WhatsAppContactButton />
          <Link href="/sobre" className="group text-sm font-black uppercase tracking-widest leading-6 text-white hover:text-indigo-400 transition-colors">
            Nossa Missão <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Hero Visual Mockup */}
        <div className="relative w-full max-w-7xl mx-auto [perspective:1000px]">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/50 backdrop-blur-3xl shadow-[0_0_100px_rgba(79,70,229,0.15)] transform [rotateX(2deg)] transition-transform hover:[rotateX(0deg)] duration-1000 ease-out">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-transparent opacity-50"></div>
            <Image
              src="/hero-dashboard.png"
              alt="PaivaTech — visão do ecossistema de gestão"
              width={1200}
              height={675}
              priority
              className="w-full h-auto opacity-90 scale-[1.01]"
            />
          </div>
          
          {/* Floating elements for depth */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full"></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-indigo-500">
            Ecossistema PaivaTech
          </h2>
          <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Sistemas Especializados
          </h3>
          <p className="text-slate-400 max-w-3xl mx-auto">
            Sete produtos modulares para operar com inteligência nativa — da saúde ao comércio, do atendimento com IA ao
            marketing.
          </p>
        </div>

        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 max-w-7xl mx-auto">
          {products.map((p) => {
            const slug = p.slug as ProductSlug;
            const icons: Record<string, string> = {
              fitness: "⚡",
              dental: "🦷",
              chat: "💬",
              credit: "📊",
              kanban: "📋",
              commerce: "🛒",
              marketing: "🎯",
            };
            return (
              <li key={slug} className="group">
                <Link
                  href={PRODUCT_LANDING_PATHS[slug] ?? `/produtos/${slug}`}
                  className="glass-card flex h-full flex-col p-8 focus-visible:outline-none rounded-[2.5rem]"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/10 text-3xl dark:bg-indigo-400/10 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-500">
                      {icons[slug] || "🚀"}
                    </div>
                    {p.badge && (
                      <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-indigo-400 border border-indigo-500/20">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">
                    {p.title}
                  </h4>
                  <p className="mt-4 flex-auto text-sm leading-7 text-slate-400 group-hover:text-slate-300 transition-colors">
                    {p.short}
                  </p>
                  <div className="mt-8 flex items-center rounded-xl bg-indigo-600 px-6 py-3 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-500/20 transition-all hover:brightness-110">
                    {PRODUCT_CTA_LABELS[slug]}
                    <span className="ml-2 transition-transform group-hover:translate-x-2">→</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
