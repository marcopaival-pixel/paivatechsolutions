"use client";

import { useEffect } from "react";
import Link from "next/link";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error("Runtime error captured by boundary:", error);
  }, [error]);

  return (
    <div className="relative isolate min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-600/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-md space-y-6">
        <div className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-red-400 ring-1 ring-inset ring-red-400/20 bg-red-400/5">
          Erro Operacional
        </div>
        
        <h1 className="premium-gradient-text text-4xl font-extrabold tracking-tight sm:text-5xl">
          Algo deu errado
        </h1>
        
        <p className="text-slate-400 text-sm leading-relaxed">
          Ocorreu uma falha inesperada durante a execução da página. Nossa equipe técnica já foi notificada.
        </p>

        {error.digest && (
          <p className="text-[10px] font-mono text-slate-600 tracking-wider">
            ID do Erro: {error.digest}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <button
            onClick={() => reset()}
            className="rounded-xl bg-indigo-600 px-6 py-3 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all active:scale-95"
          >
            Tentar novamente
          </button>
          <Link
            href="/"
            className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all active:scale-95"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
