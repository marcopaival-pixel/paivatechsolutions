import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative isolate mx-auto max-w-lg space-y-8 py-16 text-center overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[100px]" />
      </div>

      <div className="inline-flex items-center rounded-full bg-indigo-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.3em] text-indigo-400 ring-1 ring-inset ring-indigo-400/20">
        Erro 404
      </div>

      <div className="space-y-4">
        <h1 className="premium-gradient-text text-3xl font-black tracking-tight sm:text-4xl">
          Página não encontrada
        </h1>
        <p className="text-base leading-7 text-slate-400">
          O endereço pode estar incorreto ou o conteúdo foi movido. Use os links abaixo para continuar no ecossistema
          PaivaTech.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 pt-2">
        <Link
          href="/"
          className="rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500"
        >
          Ir ao início
        </Link>
        <Link
          href="/contato"
          className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10"
        >
          Contato
        </Link>
      </div>
    </div>
  );
}
