"use client";

import { useEffect, useMemo, useState } from "react";
import { adminFetchJson } from "@/lib/admin/api-client";
import { buildWhatsAppUrl, formatWhatsAppDisplay } from "@/lib/site/whatsapp-utils";

type ContactSettings = {
  whatsappPhone?: string;
  whatsappDisplay?: string;
};

export default function AdminContactPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [whatsappPhone, setWhatsappPhone] = useState("");
  const [whatsappDisplay, setWhatsappDisplay] = useState("");

  function syncDisplayFromPhone(phoneValue: string) {
    const digits = phoneValue.replace(/\D/g, "");
    if (digits.length >= 10) {
      setWhatsappDisplay(formatWhatsAppDisplay(digits));
    } else if (!phoneValue.trim()) {
      setWhatsappDisplay("");
    }
  }

  function handlePhoneChange(value: string) {
    setWhatsappPhone(value);
    syncDisplayFromPhone(value);
  }

  const preview = useMemo(() => {
    const digits = whatsappPhone.replace(/\D/g, "");
    if (digits.length < 10) {
      return { url: null as string | null, display: null as string | null };
    }
    return {
      url: buildWhatsAppUrl(digits),
      display: whatsappDisplay.trim() || formatWhatsAppDisplay(digits),
    };
  }, [whatsappPhone, whatsappDisplay]);

  async function fetchSettings() {
    const result = await adminFetchJson<{
      settings?: ContactSettings;
    }>("/admin/api/contact");

    if (result.ok) {
      const s = result.data.settings ?? {};
      const phone = s.whatsappPhone ?? "";
      setWhatsappPhone(phone);
      if (s.whatsappDisplay?.trim()) {
        setWhatsappDisplay(s.whatsappDisplay);
      } else if (phone.replace(/\D/g, "").length >= 10) {
        setWhatsappDisplay(formatWhatsAppDisplay(phone));
      } else {
        setWhatsappDisplay("");
      }
    } else {
      setError(result.error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchSettings();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMsg(null);

    const digits = whatsappPhone.replace(/\D/g, "");
    if (whatsappPhone.trim() && digits.length < 10) {
      setError("Telefone inválido. Use DDI + DDD + número (mín. 10 dígitos), ex.: 5511987654321.");
      setSaving(false);
      return;
    }

    const result = await adminFetchJson<{
      ok?: boolean;
      settings?: ContactSettings;
      message?: string;
    }>("/admin/api/contact", {
      method: "PUT",
      body: JSON.stringify({
        whatsappPhone: digits || whatsappPhone.trim(),
        whatsappDisplay: whatsappDisplay.trim() || undefined,
      }),
    });

    if (result.ok && result.data.ok) {
      const s = result.data.settings ?? {};
      setWhatsappPhone(s.whatsappPhone ?? "");
      setWhatsappDisplay(s.whatsappDisplay ?? "");
      setSuccessMsg("WhatsApp atualizado no site!");
    } else {
      setError(result.ok ? result.data.message || "Erro ao salvar." : result.error);
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-slate-400 text-sm font-black uppercase tracking-widest animate-pulse">
          Carregando contato...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Contato & WhatsApp</h2>
        <p className="text-slate-400 text-sm mt-1">
          Número usado no botão <strong className="text-slate-300">Fale Conosco</strong> da home, na página de
          contato e nas landings de produto.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-950/30 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}
      {successMsg && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-300">
          {successMsg}
        </div>
      )}

      <form
        onSubmit={handleSave}
        className="max-w-xl space-y-6 rounded-3xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-xl"
      >
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-[#25D366]">WhatsApp</h3>

          <div className="space-y-2">
            <label htmlFor="whatsappPhone" className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Telefone (somente números, com DDI)
            </label>
            <input
              id="whatsappPhone"
              type="text"
              inputMode="numeric"
              value={whatsappPhone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="5511999999999"
              className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm font-mono text-white placeholder:text-slate-600 focus:border-[#25D366]/50 focus:outline-none focus:ring-1 focus:ring-[#25D366]/30"
            />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Ex.: Brasil — DDI 55 + DDD + número → <span className="font-mono text-slate-400">5511987654321</span>
              . O texto de exibição abaixo é preenchido automaticamente.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="whatsappDisplay" className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Texto de exibição (opcional)
            </label>
            <input
              id="whatsappDisplay"
              type="text"
              value={whatsappDisplay}
              onChange={(e) => setWhatsappDisplay(e.target.value)}
              placeholder="+55 (11) 98765-4321"
              className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
            />
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Preview no site
            </p>
            <p className="text-sm font-mono text-white break-all">
              {preview.url ?? "— Informe um telefone válido"}
            </p>
            {preview.display ? (
              <p className="text-xs text-slate-400">Exibição: {preview.display}</p>
            ) : null}
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-xl bg-indigo-600 py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 disabled:opacity-50 transition-all"
        >
          {saving ? "Salvando..." : "Salvar WhatsApp"}
        </button>
      </form>
    </div>
  );
}
