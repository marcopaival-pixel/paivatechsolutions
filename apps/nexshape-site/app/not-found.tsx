import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-6 text-center py-16">
      <p className="text-sm font-medium text-indigo-600">Erro 404</p>
      <h1 className="text-3xl font-bold text-slate-900">Página não encontrada</h1>
      <p className="mx-auto max-w-md text-slate-600">
        O endereço pode estar incorreto ou o conteúdo foi movido. Use os links abaixo para continuar navegando.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800"
        >
          Ir ao início
        </Link>
        <Link
          href="/contato"
          className="rounded border border-slate-300 px-4 py-2 font-medium text-slate-800 hover:border-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Contato
        </Link>
      </div>
    </div>
  );
}
