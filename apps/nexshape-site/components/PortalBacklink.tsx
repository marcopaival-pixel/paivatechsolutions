"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export function PortalBacklink() {
  const searchParams = useSearchParams();
  const [showBacklink, setShowBacklink] = useState(false);

  useEffect(() => {
    // Check for parameter in URL
    const from = searchParams.get("from");
    
    // Check for stored origin in session
    const storedFrom = typeof window !== "undefined" ? sessionStorage.getItem("paivatech_origin") : null;

    if (from === "paivatech" || storedFrom === "paivatech") {
      setShowBacklink(true);
      // Persist in session if it comes from URL
      if (from === "paivatech" && typeof window !== "undefined") {
        sessionStorage.setItem("paivatech_origin", "paivatech");
      }
    }
  }, [searchParams]);

  if (!showBacklink) return null;

  const returnUrl = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:3000"
    : "https://paivatechsolutions.com.br";

  return (
    <div className="flex items-center gap-3 py-1 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/30 px-4 -mx-4 mb-3 sm:mb-0 sm:px-0 sm:mx-0 sm:border-0 sm:bg-transparent">
      <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
        Uma solução da PaivaTech Solutions
      </span>
      <Link
        href={returnUrl}
        className="group flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
      >
        <span className="transition-transform group-hover:-translate-x-0.5 inline-block">←</span>
        Voltar ao Portal
      </Link>
    </div>
  );
}
