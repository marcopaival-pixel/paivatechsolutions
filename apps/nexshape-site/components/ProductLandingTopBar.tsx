import Link from "next/link";
import { systemAccessLinkProps } from "@/lib/products/system-access-link";

interface ProductLandingTopBarProps {
  contactHref: string;
  systemAccessUrl: string | null;
  accentButtonClass: string;
}

export function ProductLandingTopBar({
  contactHref,
  systemAccessUrl,
  accentButtonClass,
}: ProductLandingTopBarProps) {
  return (
    <div className="fixed top-8 left-8 right-8 z-50 flex justify-between items-center pointer-events-none">
      <Link
        href="/"
        className="group flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-widest text-white backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all active:scale-95 pointer-events-auto"
      >
        <span className="transition-transform group-hover:-translate-x-1">←</span>
        Voltar ao Portal
      </Link>

      {systemAccessUrl ? (
        <Link
          href={systemAccessUrl}
          {...systemAccessLinkProps(systemAccessUrl)}
          className={`group flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest text-white shadow-lg transition-all active:scale-95 pointer-events-auto ${accentButtonClass}`}
        >
          Acessar sistema
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      ) : (
        <Link
          href={contactHref}
          className={`group flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest text-white shadow-lg transition-all active:scale-95 pointer-events-auto ${accentButtonClass}`}
        >
          Falar com a equipe
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      )}
    </div>
  );
}
