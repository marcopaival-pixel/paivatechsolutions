import type { Metadata } from "next";
import Link from "next/link";
import { SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/site/branding";

export const metadata: Metadata = {
  title: "Sobre",
  description: SITE_DESCRIPTION,
};

export default function SobrePage() {
  return (
    <div className="relative isolate pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[8%] left-[-8%] w-[42%] h-[42%] bg-indigo-600/12 blur-[120px] rounded-full animate-blob" />
        <div className="absolute bottom-[12%] right-[-6%] w-[38%] h-[38%] bg-purple-600/10 blur-[110px] rounded-full animate-blob animation-delay-2000" />
      </div>

      <article className="mx-auto max-w-3xl space-y-12 pt-6">
        <header className="space-y-6">
          <div className="inline-flex items-center rounded-full bg-indigo-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.3em] text-indigo-400 ring-1 ring-inset ring-indigo-400/20">
            Quem somos
          </div>
          <h1 className="premium-gradient-text text-balance text-4xl font-black tracking-tight sm:text-6xl leading-[1.1]">
            Sobre a <span className="text-white">PaivaTech Solutions</span>
          </h1>
          <p className="text-lg leading-8 text-slate-400">{SITE_TAGLINE}</p>
          <p className="leading-8 text-slate-400">
            Somos uma empresa de tecnologia focada em produtos que organizam o dia a dia de negócios reais — academias,
            clínicas, equipes de atendimento e operações que dependem de dados com responsabilidade.
          </p>
        </header>

        <div className="glass-card rounded-[2.5rem] p-8 sm:p-10 space-y-8 border border-white/10">
          <div className="space-y-4">
            <p className="text-lg leading-8 text-slate-400">
              A <strong className="text-white">PaivaTech</strong> é um ecossistema de produtos especializados — de
              academias e clínicas a atendimento com IA, crédito, comércio e marketing — pensado para quem precisa
              operar com precisão, escalar sem perder controle e tomar decisões com dados confiáveis.
            </p>
            <p className="leading-8 text-slate-400">
              Cada módulo resolve um desafio específico do seu negócio, mas todos compartilham a mesma base: menos
              atrito no dia a dia, experiência melhor para clientes e parceiros, e governança com transparência e
              respeito à privacidade.
            </p>
          </div>

          <div className="space-y-5">
            <h2 className="text-sm font-black uppercase tracking-[0.25em] text-slate-500">Como trabalhamos</h2>
            <ul className="grid gap-4">
              {[
                {
                  title: "Entrega contínua",
                  text: "Evoluímos em ciclos curtos, com segurança e estabilidade desde o primeiro deploy.",
                },
                {
                  title: "Clareza e conformidade",
                  text: "Contratos objetivos e práticas alinhadas à LGPD em cada produto.",
                },
                {
                  title: "Suporte de verdade",
                  text: "Quando a automação não resolve, nossa equipe entra em cena.",
                },
              ].map((item) => (
                <li
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-5 transition-colors hover:border-white/10 hover:bg-white/[0.05]"
                >
                  <span className="mt-0.5 text-indigo-400">✦</span>
                  <span className="text-slate-400">
                    <strong className="text-white">{item.title}.</strong> {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/contato"
            className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500"
          >
            Vamos conversar sobre a sua operação
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>
    </div>
  );
}
