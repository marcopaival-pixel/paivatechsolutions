import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mensagem enviada",
  description: "Recebemos sua mensagem de contato.",
};

export default function ContatoEnviadoPage() {
  return (
    <div className="space-y-6 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Mensagem recebida</h1>
      <p className="mx-auto max-w-md text-slate-600">
        Obrigado pelo contato. Nossa equipe vai analisar sua mensagem e retornar em breve.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded border border-slate-300 px-4 py-2 font-medium text-slate-800 hover:border-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Voltar ao início
        </Link>
        <Link
          href="/contato"
          className="rounded bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800"
        >
          Novo contato
        </Link>
      </div>
    </div>
  );
}
