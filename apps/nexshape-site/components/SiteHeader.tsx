"use client";

import Link from "next/link";
import { PRODUCT_DEFINITIONS } from "@/lib/config/products";
import { PRODUCT_LANDING_PATHS } from "@/lib/config/product-routes";
import { PortalBacklink } from "./PortalBacklink";
import { Suspense, useState, useEffect } from "react";
import { Logo } from "./Logo";

function getProductIcon(slug: string) {
  switch (slug) {
    case "fitness":
      return (
        <svg className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "dental":
      return (
        <svg className="h-5 w-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case "chat":
      return (
        <svg className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      );
    case "credit":
      return (
        <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case "kanban":
      return (
        <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      );
    case "commerce":
      return (
        <svg className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      );
    case "marketing":
      return (
        <svg className="h-5 w-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    default:
      return (
        <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
}

function getProductBadge(slug: string) {
  switch (slug) {
    case "fitness":
    case "dental":
      return { text: "Premium", className: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" };
    case "chat":
    case "marketing":
      return { text: "IA", className: "bg-purple-500/10 text-purple-400 border border-purple-500/20" };
    case "credit":
      return { text: "Novo", className: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" };
    default:
      return null;
  }
}

export function SiteHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close menus on resize to avoid UI quirks
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-5xl px-4">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] px-6 md:px-8 py-3 transition-all duration-300">
        <div className="mb-1">
          <Suspense fallback={null}>
            <PortalBacklink />
          </Suspense>
        </div>
        
        <div className="flex items-center justify-between py-1">
          {/* Logo */}
          <Link href="/" className="transition-all hover:scale-105 active:scale-95 shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
            <Logo variant="horizontal" className="h-9" theme="dark" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
            <Link href="/" className="transition-colors hover:text-white focus-visible:outline-none">
              Início
            </Link>

            {/* Dropdown de Produtos */}
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-1.5 transition-colors hover:text-white focus-visible:outline-none uppercase ${isDropdownOpen ? "text-white" : ""}`}
              >
                Produtos
                <svg 
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${isDropdownOpen ? "rotate-180 text-white" : "text-slate-500"}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu Panel */}
              <div 
                className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 transition-all duration-300 ${
                  isDropdownOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="w-[620px] rounded-3xl border border-white/10 bg-slate-950/95 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-3xl grid grid-cols-2 gap-3">
                  {PRODUCT_DEFINITIONS.map((p) => {
                    const icon = getProductIcon(p.slug);
                    const badge = getProductBadge(p.slug);
                    const href = PRODUCT_LANDING_PATHS[p.slug] || `/produtos/${p.slug}`;
                    
                    return (
                      <Link 
                        key={p.slug} 
                        href={href} 
                        onClick={() => setIsDropdownOpen(false)}
                        className="group/item flex items-start gap-3.5 rounded-2xl p-3 hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-200"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover/item:bg-indigo-600/10 group-hover/item:border-indigo-500/30 transition-all duration-200">
                          {icon}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-white group-hover/item:text-indigo-400 transition-colors uppercase tracking-wider">
                              {p.navLabel}
                            </span>
                            {badge && (
                              <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full ${badge.className}`}>
                                {badge.text}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] leading-normal text-slate-400 font-medium line-clamp-2 group-hover/item:text-slate-300 transition-colors">
                            {p.short}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                  
                  {/* Dropdown Footer */}
                  <div className="col-span-2 mt-2 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] text-slate-500 font-semibold tracking-wider uppercase px-2">
                    <span>Ecossistema PaivaTech</span>
                    <span className="text-indigo-400">Inovação & Performance</span>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/contato"
              className="relative overflow-hidden rounded-xl bg-white px-6 py-2.5 text-slate-950 transition-all hover:bg-indigo-500 hover:text-white shadow-lg active:scale-95 uppercase duration-200 font-bold"
            >
              Contato
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex md:hidden items-center justify-center p-2 rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-white transition-all active:scale-95"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div 
          className={`grid transition-all duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen ? "grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-white/5" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-4 pb-2">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 block mb-2">
                Nossos Produtos
              </span>
              <div className="grid gap-2">
                {PRODUCT_DEFINITIONS.map((p) => {
                  const icon = getProductIcon(p.slug);
                  const badge = getProductBadge(p.slug);
                  const href = PRODUCT_LANDING_PATHS[p.slug] || `/produtos/${p.slug}`;

                  return (
                    <Link
                      key={p.slug}
                      href={href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3.5 rounded-xl p-2.5 bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-200"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/5 text-indigo-400">
                        {icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-white uppercase tracking-wider truncate">
                            {p.navLabel}
                          </span>
                          {badge && (
                            <span className={`text-[7px] font-black uppercase tracking-widest px-1 py-0.5 rounded-full shrink-0 ${badge.className}`}>
                              {badge.text}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="pt-2">
                <Link
                  href="/contato"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg active:scale-98 hover:bg-indigo-500 transition-all duration-200"
                >
                  Falar com Especialista (Contato)
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
