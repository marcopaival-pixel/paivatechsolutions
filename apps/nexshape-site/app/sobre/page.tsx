import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre",
  description: "PaivaTech Solutions e a missão por trás da suite NexShape.",
};

export default function SobrePage() {
  return (
    <article className="max-w-3xl mx-auto space-y-12 pb-20">
      <div className="space-y-4">
        <h1 className="premium-gradient-text text-4xl font-extrabold tracking-tight sm:text-5xl">
          Sobre a PaivaTech Solutions
        </h1>
        <p className="text-lg leading-8 text-slate-600 dark:text-slate-400">
          Somos uma empresa de tecnologia focada em produtos que organizam o dia a dia de negócios reais — academias,
          clínicas, equipes de atendimento e operações que dependem de dados com responsabilidade.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-8 sm:p-10 space-y-6">
        <p className="text-slate-600 dark:text-slate-400">
          A <strong className="text-slate-900 dark:text-white">suite NexShape</strong> reúne módulos especializados (Saúde & Performance, OralByte, Chat e Credit) com uma visão
          comum: reduzir atrito operacional, melhorar a experiência de clientes e parceiros, e apoiar decisões com
          transparência e respeito à privacidade.
        </p>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Como trabalhamos</h2>
          <ul className="grid gap-4 text-slate-600 dark:text-slate-400">
            <li className="flex gap-x-3">
              <span className="text-indigo-600 dark:text-indigo-400">✦</span>
              <span>Desenvolvimento incremental e segurança em primeiro lugar.</span>
            </li>
            <li className="flex gap-x-3">
              <span className="text-indigo-600 dark:text-indigo-400">✦</span>
              <span>Contratos claros e alinhamento com LGPD onde aplicável.</span>
            </li>
            <li className="flex gap-x-3">
              <span className="text-indigo-600 dark:text-indigo-400">✦</span>
              <span>Suporte humano quando a automação não é suficiente.</span>
            </li>
          </ul>
        </div>

        <p className="pt-4">
          <Link href="/contato" className="inline-flex items-center gap-2 font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors">
            Entre em contato para conversar sobre o seu cenário
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </article>
  );
}
