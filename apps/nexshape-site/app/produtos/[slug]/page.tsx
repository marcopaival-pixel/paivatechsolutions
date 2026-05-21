import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { getProductInterestOptionsForContact } from "@/lib/contact/build-product-interest-options";
import { PRODUCT_SLUGS } from "@/lib/config/products";
import { PRODUCT_LANDING_PATHS, CONTACT_PRODUCT_QUERY } from "@/lib/config/product-routes";
import { isProductSlug, productInterestFromProductSlug } from "@/lib/content/products";
import { getProductsDynamic } from "@/lib/db";
import { resolveProductAppUrl } from "@/lib/products/resolve-app-url";
import { isTurnstileEnabled, turnstileSiteKey } from "@/lib/security/turnstile";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isProductSlug(slug)) return { title: "Produto" };
  const products = await getProductsDynamic();
  const p = products.find((x) => x.slug === slug);
  if (!p) return { title: "Produto" };
  return {
    title: p.title,
    description: p.short,
  };
}

export default async function ProdutoPage({ params }: Props) {
  const { slug } = await params;
  if (!isProductSlug(slug)) notFound();

  const [products, productOptions] = await Promise.all([
    getProductsDynamic(),
    getProductInterestOptionsForContact(),
  ]);
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const defaultProduct = productInterestFromProductSlug(slug);
  const landingPath = PRODUCT_LANDING_PATHS[slug];
  const systemAccessUrl = resolveProductAppUrl(product);
  const contactHref = `/contato?produto=${CONTACT_PRODUCT_QUERY[slug]}`;

  return (
    <div className="relative isolate pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[6%] left-[-8%] h-[42%] w-[42%] rounded-full bg-indigo-600/12 blur-[120px] animate-blob" />
        <div className="absolute bottom-[8%] right-[-6%] h-[38%] w-[38%] rounded-full bg-purple-600/10 blur-[110px] animate-blob animation-delay-2000" />
      </div>

      <div className="space-y-20 pt-6">
        <article className="mx-auto max-w-4xl space-y-8">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
            <Link href="/" className="transition-colors hover:text-indigo-400">
              Início
            </Link>
            <span className="text-slate-700">/</span>
            <span>Produtos</span>
            <span className="text-slate-700">/</span>
            <span className="text-slate-300">{product.title}</span>
          </nav>

          <div className="inline-flex items-center rounded-full bg-indigo-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.3em] text-indigo-400 ring-1 ring-inset ring-indigo-400/20">
            Ecossistema PaivaTech
          </div>

          <h1 className="premium-gradient-text text-balance text-4xl font-black tracking-tight sm:text-6xl leading-[1.1]">
            {product.title}
          </h1>

          <p className="max-w-3xl text-lg leading-8 text-slate-400">{product.short}</p>

          {slug === "credit" && (
            <aside
              className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-6 text-sm text-amber-100"
              role="note"
            >
              <div className="flex gap-3">
                <span className="text-xl">⚖️</span>
                <p>
                  <strong className="font-bold text-white">Uso responsável e conformidade:</strong> funcionalidades de
                  crédito e consulta cadastral devem ser utilizadas apenas com base legal válida, finalidade específica
                  e medidas de segurança adequadas. Não prometemos aprovação de crédito nem substituímos análise humana
                  ou regulatória.
                </p>
              </div>
            </aside>
          )}

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href={contactHref}
              className="rounded-2xl bg-indigo-600 px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 active:scale-95"
            >
              Solicitar demonstração
            </Link>
            {systemAccessUrl ? (
              <Link
                href={systemAccessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white/10 active:scale-95"
              >
                Acessar sistema
              </Link>
            ) : null}
            {landingPath ? (
              <Link
                href={landingPath}
                className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white/10 active:scale-95"
              >
                Ver página completa
              </Link>
            ) : null}
          </div>
        </article>

        <section className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-3">
            <h2 className="text-sm font-black uppercase tracking-[0.25em] text-slate-500">Agende uma conversa</h2>
            <p className="text-slate-400 leading-relaxed">
              Preencha o formulário e nossa equipe retorna com orientação sobre implantação e escopo do{" "}
              <strong className="text-white">{product.title}</strong>.
            </p>
          </div>
          <ContactForm
            key={slug}
            defaultProduct={defaultProduct}
            productOptions={productOptions}
            turnstileEnabled={isTurnstileEnabled()}
            turnstileSiteKey={turnstileSiteKey()}
          />
        </section>
      </div>
    </div>
  );
}
