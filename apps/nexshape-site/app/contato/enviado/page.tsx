import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mensagem enviada",
  description: "Recebemos sua mensagem de contato.",
};

export default function ContatoEnviadoPage() {
  return (
    <div className="mx-auto max-w-lg space-y-8 py-10 text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-2xl">
        ✓
      </div>
      <div className="space-y-4">
        <h1 className="premium-gradient-text text-3xl font-black tracking-tight sm:text-4xl">
          Mensagem recebida
        </h1>
        <p className="text-base leading-7 text-slate-400">
          Obrigado pelo contato. Nossa equipe vai analisar sua mensagem e retornar em até 1 dia útil com orientação
          sobre o próximo passo.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 pt-2">
        <Link
          href="/"
          className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10"
        >
          Voltar ao início
        </Link>
        <Link
          href="/contato"
          className="rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500"
        >
          Novo contato
        </Link>
      </div>
    </div>
  );
}
