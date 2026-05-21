"use client";

import { useEffect, useMemo, useState } from "react";
import { adminFetch } from "@/lib/admin/admin-fetch";
import type { ProductAppAccessMode, ProductCustomization } from "@/lib/db";
import { previewProductAppUrls } from "@/lib/products/resolve-app-url";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductCustomization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingProduct, setEditingProduct] = useState<ProductCustomization | null>(null);
  const [title, setTitle] = useState("");
  const [short, setShort] = useState("");
  const [navLabel, setNavLabel] = useState("");
  const [badge, setBadge] = useState("");
  const [appHostProduction, setAppHostProduction] = useState("");
  const [appHostDevelopment, setAppHostDevelopment] = useState("");
  const [appAccessMode, setAppAccessMode] = useState<ProductAppAccessMode>("production");

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const urlPreview = useMemo(
    () =>
      previewProductAppUrls({
        appHostProduction,
        appHostDevelopment,
        appAccessMode,
      }),
    [appHostProduction, appHostDevelopment, appAccessMode],
  );

  async function fetchProducts() {
    try {
      const res = await adminFetch("/admin/api/products");
      if (!res.ok) throw new Error("Erro ao carregar produtos.");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erro de conexão.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function startEdit(p: ProductCustomization) {
    setEditingProduct(p);
    setTitle(p.title);
    setShort(p.short);
    setNavLabel(p.navLabel);
    setBadge(p.badge || "");
    setAppHostProduction(p.appHostProduction || "");
    setAppHostDevelopment(p.appHostDevelopment || "");
    setAppAccessMode(p.appAccessMode || "production");
    setSuccessMsg(null);
    setError(null);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editingProduct) return;

    setSaving(true);
    setSuccessMsg(null);
    setError(null);

    try {
      const res = await adminFetch("/admin/api/products", {
        method: "PUT",
        body: JSON.stringify({
          slug: editingProduct.slug,
          title,
          short,
          navLabel,
          badge: badge || undefined,
          appHostProduction: appHostProduction || undefined,
          appHostDevelopment: appHostDevelopment || undefined,
          appAccessMode,
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.slug === editingProduct.slug ? data.product : p)),
        );
        setSuccessMsg("Produto atualizado com sucesso!");
        setTimeout(() => {
          setEditingProduct(null);
          setSuccessMsg(null);
        }, 1200);
      } else {
        setError(data.message || "Erro ao salvar alterações.");
      }
    } catch {
      setError("Erro ao se conectar ao servidor.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-slate-400 text-sm font-black uppercase tracking-widest animate-pulse">
          Carregando produtos...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Gerenciar Produtos</h2>
        <p className="text-slate-400 text-sm mt-1">
          Textos de marketing e URLs de acesso ao sistema (produção / desenvolvimento).
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-sm text-red-400">
          <strong>Erro:</strong> {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {products.map((p) => {
          const preview = previewProductAppUrls(p);
          return (
            <div
              key={p.slug}
              className="glass-card p-6 rounded-3xl border border-white/10 bg-slate-900/20 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Slug: {p.slug}
                  </span>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {p.badge && (
                      <span className="rounded-full bg-indigo-500/15 px-2 py-0.5 text-[10px] font-black uppercase text-indigo-400 border border-indigo-500/20">
                        {p.badge}
                      </span>
                    )}
                    {preview.active && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase border ${
                          preview.activeMode === "production"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {preview.activeMode === "production" ? "Prod" : "Dev"}
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-black text-white">{p.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">{p.short}</p>
                {preview.active ? (
                  <p className="text-[10px] font-mono text-slate-500 truncate" title={preview.active}>
                    🔗 {preview.active}
                  </p>
                ) : (
                  <p className="text-[10px] text-slate-600 uppercase tracking-widest">Sem URL de sistema</p>
                )}
              </div>

              <button
                type="button"
                onClick={() => startEdit(p)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-200 hover:text-white hover:bg-white/10 transition-all"
              >
                <span>⚙️</span> Editar
              </button>
            </div>
          );
        })}
      </div>

      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => !saving && setEditingProduct(null)} />
          <form
            onSubmit={handleSave}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card rounded-[2.5rem] border border-white/15 bg-slate-950/90 backdrop-blur-3xl shadow-2xl p-8 md:p-10 space-y-6"
          >
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-2xl font-black text-white">Editar produto</h3>
              <p className="text-slate-400 text-xs mt-1">Slug: {editingProduct.slug}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Apresentação</h4>
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">Título</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">Menu</label>
                  <input
                    type="text"
                    value={navLabel}
                    onChange={(e) => setNavLabel(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">Badge</label>
                  <input
                    type="text"
                    value={badge}
                    placeholder="Opcional"
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">Descrição</label>
                <textarea
                  value={short}
                  rows={3}
                  onChange={(e) => setShort(e.target.value)}
                  className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3.5 text-sm text-white focus:border-indigo-500 focus:outline-none resize-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-4 border-t border-white/10 pt-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400">
                Acesso ao sistema
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Informe subdomínio (ex.: <code className="text-slate-400">fitness</code>) ou URL completa.
                Domínio de produção: variável <code className="text-slate-400">NEXT_PUBLIC_APP_DOMAIN_PRODUCTION</code>.
              </p>

              <div className="space-y-2">
                <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                  Produção
                </label>
                <input
                  type="text"
                  value={appHostProduction}
                  placeholder="fitness ou https://fitness.paivatech.com.br"
                  onChange={(e) => setAppHostProduction(e.target.value)}
                  className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3.5 text-sm text-white font-mono focus:border-indigo-500 focus:outline-none"
                />
                {urlPreview.production && (
                  <p className="text-[10px] text-emerald-400/90 font-mono truncate">→ {urlPreview.production}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                  Desenvolvimento
                </label>
                <input
                  type="text"
                  value={appHostDevelopment}
                  placeholder="localhost:8000"
                  onChange={(e) => setAppHostDevelopment(e.target.value)}
                  className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3.5 text-sm text-white font-mono focus:border-indigo-500 focus:outline-none"
                />
                {urlPreview.development && (
                  <p className="text-[10px] text-amber-400/90 font-mono truncate">→ {urlPreview.development}</p>
                )}
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold tracking-wider text-slate-400 uppercase block">
                  Modo ativo (redirecionamento no site)
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      { id: "production" as const, label: "Produção" },
                      { id: "development" as const, label: "Desenvolvimento" },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAppAccessMode(opt.id)}
                      className={`rounded-xl border px-4 py-3 text-xs font-black uppercase tracking-widest transition-all ${
                        appAccessMode === opt.id
                          ? "border-indigo-500 bg-indigo-600/20 text-white"
                          : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-4 space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300">
                  URL usada no site agora
                </p>
                <p className="text-sm font-mono text-white break-all">
                  {urlPreview.active ?? "— Nenhuma (botão Acessar sistema oculto)"}
                </p>
              </div>
            </div>

            {successMsg && (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-xs font-semibold text-emerald-400">
                ✅ {successMsg}
              </div>
            )}

            <div className="flex gap-4 justify-end border-t border-white/10 pt-6">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                disabled={saving}
                className="rounded-xl bg-white/5 border border-white/10 px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-300 hover:text-white disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-indigo-600 px-5 py-3 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 disabled:opacity-50 active:scale-95"
              >
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
