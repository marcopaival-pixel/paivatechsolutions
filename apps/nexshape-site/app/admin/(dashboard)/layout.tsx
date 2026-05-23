"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin/admin-fetch";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [portalUrl, setPortalUrl] = useState(process.env.NEXT_PUBLIC_PORTAL_CENTRAL_URL || "http://localhost:3000");

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await adminFetch("/admin/api/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.settings?.portalCentralHost) {
            let host = data.settings.portalCentralHost;
            if (!/^https?:\/\//i.test(host)) {
              host = "http://" + host;
            }
            setPortalUrl(host);
          }
        }
      } catch {
        // ignore errors
      }
    }
    fetchSettings();
  }, []);

  async function handleLogout() {
    try {
      const res = await adminFetch("/admin/api/logout", { method: "POST" });
      if (res.ok) {
        router.refresh();
        router.push("/admin/login");
      }
    } catch (e) {
      console.error("Logout failed", e);
    }
  }

  const linkClass = (path: string) => {
    const base = "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide border transition-all ";
    const active = "bg-white/10 text-white border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]";
    const inactive = "bg-white/[0.02] text-slate-400 border-white/5 hover:bg-white/5 hover:text-white";
    return base + (pathname === path ? active : inactive);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col md:flex-row relative isolate overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[130px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[130px] rounded-full"></div>
      </div>

      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-slate-900/30 backdrop-blur-2xl p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Logo / Header */}
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h1 className="font-black text-lg tracking-tight uppercase text-white">PaivaTech</h1>
              <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Marketing & Leads</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2.5">
            <Link href="/admin" className={linkClass("/admin")}>
              <span>📊</span> Leads
            </Link>
            <Link href="/admin/produtos" className={linkClass("/admin/produtos")}>
              <span>🛒</span> Produtos
            </Link>
            <Link href="/admin/contato" className={linkClass("/admin/contato")}>
              <span>💬</span> Contato
            </Link>
            <div className="my-2 border-t border-white/5"></div>
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-sm font-semibold tracking-wide text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 transition-all"
            >
              <span>🔗</span> Portal Central
            </a>
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] hover:bg-white/5 text-sm font-semibold tracking-wide text-slate-400 hover:text-white border border-white/5 transition-all"
            >
              <span>🌐</span> Ir para o Site
            </Link>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-red-950/20 hover:bg-red-950/50 text-red-400 hover:text-red-300 border border-red-900/30 text-xs font-black uppercase tracking-widest transition-all"
          >
            <span>🚪</span> Sair da Sessão
          </button>
          <p className="text-[10px] text-slate-500 font-medium text-center">PaivaTech Solutions &copy; 2026</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow overflow-y-auto w-full">
        <main className="p-6 md:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
