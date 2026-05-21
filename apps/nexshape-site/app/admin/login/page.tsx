"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password) {
      setError("Por favor, informe a senha.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/admin/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        router.refresh();
        router.push("/admin");
      } else {
        setError(data.message || "Erro ao realizar login.");
      }
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative isolate min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 overflow-hidden">
      {/* Background glowing blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-purple-600/10 blur-[150px] rounded-full animate-pulse animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Glow effect card outline */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-[2.5rem] blur-2xl opacity-15"></div>

        {/* Login Card */}
        <div className="relative glass-card rounded-[2.5rem] p-10 border border-white/10 shadow-2xl shadow-black/50 bg-slate-900/40 backdrop-blur-3xl space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600/10 text-3xl border border-indigo-500/20 mb-2">
              🔒
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">Acesso Restrito</h1>
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-[0.25em]">PaivaTech Admin</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="password-field" className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                Senha de Acesso
              </label>
              <input
                id="password-field"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder:text-slate-600 ring-indigo-500 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-semibold text-red-400 flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-indigo-600 px-8 py-4.5 font-black uppercase tracking-widest text-white transition-all hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] disabled:opacity-50 active:scale-[0.98] shadow-2xl shadow-indigo-500/20"
            >
              {loading ? "Autenticando..." : "Entrar no Painel"}
              {!loading && <span className="transition-transform group-hover:translate-x-1">→</span>}
            </button>
          </form>

          {/* Footer link */}
          <div className="text-center">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              ← Voltar ao site público
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
