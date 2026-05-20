import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { PRODUCT_SLUGS } from "@/lib/config/products";
import { isProductSlug, PRODUCTS, productInterestFromProductSlug } from "@/lib/content/products";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isProductSlug(slug)) return { title: "Produto" };
  const p = PRODUCTS[slug];
  return {
    title: p.title,
    description: p.short,
  };
}

export default async function ProdutoPage({ params }: Props) {
  const { slug } = await params;
  if (!isProductSlug(slug)) notFound();

  const product = PRODUCTS[slug];
  const defaultProduct = productInterestFromProductSlug(slug);

  return (
    <div className="space-y-16 pb-20">
      <article className="relative isolate">
        <nav className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
          <Link href="/" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
            Início
          </Link>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <span>Produtos</span>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <span className="text-slate-900 dark:text-white">{product.title}</span>
        </nav>
        
        <h1 className="premium-gradient-text text-3xl font-extrabold tracking-tight sm:text-5xl">
          {product.title}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-400">
          {product.short}
        </p>

        {slug === "credit" && (
          <aside
            className="mt-10 rounded-2xl border border-amber-200 bg-amber-50/50 p-6 text-sm text-amber-900 backdrop-blur-sm dark:border-amber-900/30 dark:bg-amber-900/10 dark:text-amber-200"
            role="note"
          >
            <div className="flex gap-3">
              <span className="text-xl">⚖️</span>
              <p>
                <strong className="font-bold">Uso responsável e conformidade:</strong> funcionalidades de crédito e
                consulta cadastral devem ser utilizadas apenas com base legal válida (incluindo consentimento quando
                exigido), finalidade específica e medidas de segurança adequadas. Não prometemos aprovação de crédito nem
                substituímos análise humana ou regulatória.
              </p>
            </div>
          </aside>
        )}

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href={`/contato?produto=${slug}`}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 active:scale-95"
          >
            Solicitar demonstração
          </Link>
          <Link
            href="/contato"
            className="rounded-xl border border-slate-200 px-6 py-3 font-bold text-slate-900 transition-all hover:bg-slate-50 dark:border-slate-800 dark:text-white dark:hover:bg-slate-900 active:scale-95"
          >
            Contato comercial
          </Link>
        </div>
      </article>

      <section className="relative space-y-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
          </div>
          <div className="relative flex justify-start">
            <span className="bg-white pr-4 text-xl font-bold tracking-tight text-slate-900 dark:bg-slate-950 dark:text-white">
              Agende uma conversa
            </span>
          </div>
        </div>
        
        <div className="max-w-3xl">
          <p className="mb-8 text-slate-600 dark:text-slate-400">
            Preencha os dados abaixo para que nossa equipe técnica possa analisar seu cenário e retornar com uma proposta personalizada para o <strong>{product.title}</strong>.
          </p>
          <ContactForm key={slug} defaultProduct={defaultProduct} />
        </div>
      </section>
    </div>
  );
}
