import Link from "next/link";
import { PRODUCT_DEFINITIONS } from "@/lib/config/products";
import { PRODUCT_LANDING_PATHS } from "@/lib/config/product-routes";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-white/5 bg-[#020617] py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          <div className="col-span-full lg:col-span-1">
            <Logo variant="horizontal" className="h-8 mb-6" theme="dark" />
            <p className="text-xs leading-6 text-slate-500 font-medium">
              Arquitetura de elite para negócios de alta performance. 
              SaaS Intelligence & Cloud Infrastructure.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Ecossistema</h4>
            <div className="flex flex-col gap-3">
              {PRODUCT_DEFINITIONS.map((p) => (
                <Link key={p.slug} href={PRODUCT_LANDING_PATHS[p.slug] || `/produtos/${p.slug}`} className="text-xs text-slate-500 hover:text-indigo-400 transition-colors">
                  {p.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Institucional</h4>
            <div className="flex flex-col gap-3">
              <Link href="/sobre" className="text-xs text-slate-500 hover:text-indigo-400 transition-colors">Sobre a PaivaTech</Link>
              <Link href="/privacidade" className="text-xs text-slate-500 hover:text-indigo-400 transition-colors">Privacidade</Link>
              <Link href="/termos" className="text-xs text-slate-500 hover:text-indigo-400 transition-colors">Termos de Uso</Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Suporte</h4>
            <div className="flex flex-col gap-3">
              <Link href="/contato" className="text-xs text-slate-500 hover:text-indigo-400 transition-colors">Falar com Especialista</Link>
              <span className="text-xs text-slate-500">contato@paivatech.com.br</span>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            © {new Date().getFullYear()} PaivaTech Solutions · Made with Intelligence
          </p>
          <div className="flex gap-4">
            {/* Social icons could go here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
