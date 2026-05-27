import Link from "next/link";
import { systemAccessLinkProps } from "@/lib/products/system-access-link";

interface ProductHeroCtasProps {
  contactHref: string;
  systemAccessUrl: string | null;
  primaryButtonClass: string;
  secondaryButtonClass?: string;
  hideDemoButton?: boolean;
}

export function ProductHeroCtas({
  contactHref,
  systemAccessUrl,
  primaryButtonClass,
  secondaryButtonClass = "rounded-2xl border border-white/10 bg-white/5 px-10 py-5 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white/10 active:scale-95",
  hideDemoButton = false,
}: ProductHeroCtasProps) {
  return (
    <div className="flex flex-wrap gap-6">

      {systemAccessUrl ? (
        <Link
          href={systemAccessUrl}
          {...systemAccessLinkProps(systemAccessUrl)}
          className={secondaryButtonClass}
        >
          Acessar sistema
        </Link>
      ) : null}
    </div>
  );
}
