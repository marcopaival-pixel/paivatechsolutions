import Link from "next/link";
import type { ProductSlug } from "@/lib/config/products";
import { systemAccessLinkProps } from "@/lib/products/system-access-link";
import { CONTACT_PRODUCT_QUERY } from "@/lib/config/product-routes";
import { getContactWhatsApp } from "@/lib/site/whatsapp";

type Accent = "indigo" | "teal" | "blue" | "violet" | "amber" | "cyan" | "purple";

const ACCENT: Record<
  Accent,
  { button: string; shadow: string; hoverText: string; ring: string }
> = {
  indigo: {
    button: "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20 hover:shadow-[0_0_30px_rgba(79,70,229,0.4)]",
    shadow: "shadow-indigo-500/20",
    hoverText: "hover:text-indigo-400",
    ring: "group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50",
  },
  teal: {
    button: "bg-teal-600 hover:bg-teal-500 shadow-teal-500/20 hover:shadow-[0_0_30px_rgba(20,184,166,0.4)]",
    shadow: "shadow-teal-500/20",
    hoverText: "hover:text-teal-400",
    ring: "group-hover:bg-teal-500/20 group-hover:border-teal-500/50",
  },
  blue: {
    button: "bg-blue-600 hover:bg-blue-500 shadow-blue-500/20 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]",
    shadow: "shadow-blue-500/20",
    hoverText: "hover:text-blue-400",
    ring: "group-hover:bg-blue-500/20 group-hover:border-blue-500/50",
  },
  violet: {
    button: "bg-violet-600 hover:bg-violet-500 shadow-violet-500/20 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]",
    shadow: "shadow-violet-500/20",
    hoverText: "hover:text-violet-400",
    ring: "group-hover:bg-violet-500/20 group-hover:border-violet-500/50",
  },
  amber: {
    button: "bg-amber-600 hover:bg-amber-500 shadow-amber-500/20 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]",
    shadow: "shadow-amber-500/20",
    hoverText: "hover:text-amber-400",
    ring: "group-hover:bg-amber-500/20 group-hover:border-amber-500/50",
  },
  cyan: {
    button: "bg-cyan-600 hover:bg-cyan-500 shadow-cyan-500/20 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]",
    shadow: "shadow-cyan-500/20",
    hoverText: "hover:text-cyan-400",
    ring: "group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50",
  },
  purple: {
    button: "bg-purple-600 hover:bg-purple-500 shadow-purple-500/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]",
    shadow: "shadow-purple-500/20",
    hoverText: "hover:text-purple-400",
    ring: "group-hover:bg-purple-500/20 group-hover:border-purple-500/50",
  },
};
interface ProductFinalCtaProps {
  title: string;
  titleHighlight: string;
  highlightClassName?: string;
  description: string;
  productSlug: ProductSlug;
  accent?: Accent;
  /** URL do sistema operacional (admin: produção ou desenvolvimento) */
  systemAccessUrl?: string | null;
}

export async function ProductFinalCta({
  title,
  titleHighlight,
  highlightClassName = "text-indigo-500",
  description,
  productSlug,
  accent = "indigo",
  systemAccessUrl,
}: ProductFinalCtaProps) {
  const styles = ACCENT[accent];
  const { url: whatsappUrl } = await getContactWhatsApp();
  const contactHref = `/contato?produto=${CONTACT_PRODUCT_QUERY[productSlug]}`;

  return (
    <section id="contato" className="space-y-20 pt-10">
      <div className="text-center space-y-8">
        <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl leading-[1.1]">
          {title} <br /> <span className={highlightClassName}>{titleHighlight}</span>
        </h2>
        <p className="mx-auto max-w-2xl text-base text-slate-400">{description}</p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-6">

          {systemAccessUrl ? (
            <Link
              href={systemAccessUrl}
              {...systemAccessLinkProps(systemAccessUrl)}
              className="rounded-2xl border border-white/10 bg-white/5 px-10 py-5 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white/10 active:scale-95"
            >
              Acessar sistema
            </Link>
          ) : null}
          {whatsappUrl ? (
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-3 text-sm font-black uppercase tracking-widest text-white ${styles.hoverText} transition-all`}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors ${styles.ring}`}
              >
                <span className="transition-transform group-hover:rotate-12">📱</span>
              </span>
              WhatsApp <span className="transition-transform group-hover:translate-x-2">→</span>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
