"use client";

import { useEffect } from "react";
import "./globals.css";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global critical error captured:", error);
  }, [error]);

  return (
    <html lang="pt-BR" className="dark" style={{ colorScheme: 'dark' }}>
      <body className="font-sans antialiased bg-[#020617] text-[#f8fafc] min-h-screen flex flex-col items-center justify-center">
        <div className="relative isolate text-center px-4 py-16 overflow-hidden max-w-md w-full">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-600/10 blur-[100px] rounded-full"></div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-red-400 ring-1 ring-inset ring-red-400/20 bg-red-400/5">
              Falha Crítica do Sistema
            </div>
            
            <h1 className="premium-gradient-text text-4xl font-extrabold tracking-tight sm:text-5xl">
              Erro Crítico
            </h1>
            
            <p className="text-slate-400 text-sm leading-relaxed">
              Ocorreu uma falha na infraestrutura básica do site. Estamos trabalhando para restabelecer os serviços o mais rápido possível.
            </p>

            {error.digest && (
              <p className="text-[10px] font-mono text-slate-600 tracking-wider">
                ID do Erro: {error.digest}
              </p>
            )}

            <div className="pt-4">
              <button
                onClick={() => reset()}
                className="rounded-xl bg-indigo-600 px-6 py-3 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all active:scale-95"
              >
                Recarregar Sistema
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
