"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin/admin-fetch";
import type { Lead } from "@/lib/db";

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [productFilter, setProductFilter] = useState("");

  // Modal state
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Load leads
  async function fetchLeads() {
    try {
      const res = await adminFetch("/admin/api/leads");
      if (!res.ok) throw new Error("Erro ao carregar leads.");
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erro de conexão.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeads();
  }, []);

  // Update lead status
  async function handleStatusChange(id: string, newStatus: Lead["status"]) {
    try {
      const res = await adminFetch("/admin/api/leads", {
        method: "PUT",
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        // Local state update
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (e) {
      console.error("Failed to update status", e);
    }
  }

  // Delete lead
  async function handleDeleteLead(id: string) {
    if (!confirm("Tem certeza que deseja excluir este lead permanentemente?")) return;

    try {
      const res = await adminFetch(`/admin/api/leads?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(null);
        }
      }
    } catch (e) {
      console.error("Failed to delete lead", e);
    }
  }

  // Export filtered leads to CSV
  function handleExportCsv(filteredLeads: Lead[]) {
    if (filteredLeads.length === 0) return;

    const headers = ["Data", "Nome", "E-mail", "Telefone", "Empresa", "Interesse", "Status", "Origem", "Mensagem"];
    const rows = filteredLeads.map((l) => [
      new Date(l.createdAt).toLocaleString("pt-BR"),
      l.fullName,
      l.email,
      l.phone,
      l.companyName,
      l.productInterest,
      l.status,
      l.sourcePath || "/",
      l.message.replace(/"/g, '""'), // escape quotes
    ]);

    const csvContent =
      "\uFEFF" + // UTF-8 BOM
      [headers.join(";"), ...rows.map((row) => row.map((val) => `"${val}"`).join(";"))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `leads_paivatech_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Filtered leads computation
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter ? l.status === statusFilter : true;
    const matchesProduct = productFilter ? l.productInterest === productFilter : true;

    return matchesSearch && matchesStatus && matchesProduct;
  });

  // Calculate metrics
  const totalCount = leads.length;
  const newCount = leads.filter((l) => l.status === "novo").length;
  const inProgressCount = leads.filter((l) => l.status === "atendimento").length;
  const convertedCount = leads.filter((l) => l.status === "convertido").length;

  // Group leads by product for interest stats
  const productStats: Record<string, number> = {};
  leads.forEach((l) => {
    productStats[l.productInterest] = (productStats[l.productInterest] || 0) + 1;
  });

  // Unique products for filter selection
  const uniqueProducts = Array.from(new Set(leads.map((l) => l.productInterest)));

  // Status mapping
  const statusLabels: Record<Lead["status"], string> = {
    novo: "Novo",
    atendimento: "Em Atendimento",
    convertido: "Convertido",
    perdido: "Perdido",
  };

  const statusBadgeClasses: Record<Lead["status"], string> = {
    novo: "bg-blue-500/10 text-blue-400 border-blue-400/20",
    atendimento: "bg-amber-500/10 text-amber-400 border-amber-400/20",
    convertido: "bg-emerald-500/10 text-emerald-400 border-emerald-400/20",
    perdido: "bg-slate-500/10 text-slate-400 border-slate-400/20",
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-slate-400 text-sm font-black uppercase tracking-widest animate-pulse">Carregando painel...</div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">Painel de Leads</h2>
          <p className="text-slate-400 text-sm">Gerencie o pipeline de conversões e contatos capturados.</p>
        </div>
        
        {filteredLeads.length > 0 && (
          <button
            onClick={() => handleExportCsv(filteredLeads)}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all active:scale-95"
          >
            <span>📥</span> Exportar Filtrados (.csv)
          </button>
        )}
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-sm text-red-400">
          <strong>Erro:</strong> {error}
        </div>
      )}

      {/* Metrics Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-card p-6 rounded-2xl border border-white/5 bg-slate-900/20 flex flex-col justify-between h-32">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Capturado</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-4xl font-black text-white">{totalCount}</span>
            <span className="text-xl">📊</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/5 bg-slate-900/20 flex flex-col justify-between h-32">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">Leads Novos</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-4xl font-black text-blue-400">{newCount}</span>
            <span className="text-xl">✨</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/5 bg-slate-900/20 flex flex-col justify-between h-32">
          <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">Em Atendimento</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-4xl font-black text-amber-400">{inProgressCount}</span>
            <span className="text-xl">💬</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/5 bg-slate-900/20 flex flex-col justify-between h-32">
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Convertidos</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-4xl font-black text-emerald-400">{convertedCount}</span>
            <span className="text-xl">🏆</span>
          </div>
        </div>
      </div>

      {/* Analytics (SVG Charts) */}
      {totalCount > 0 && (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Distribution chart (Leads por Produto) */}
          <div className="lg:col-span-12 glass-card p-6 rounded-[2rem] border border-white/10 bg-slate-900/30">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Interesse por Módulo/Produto</h3>
            <div className="space-y-4">
              {Object.entries(productStats).map(([prod, count]) => {
                const percentage = Math.round((count / totalCount) * 100);
                return (
                  <div key={prod} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-white uppercase tracking-wider">{prod}</span>
                      <span className="text-indigo-400">{count} lead{count > 1 ? "s" : ""} ({percentage}%)</span>
                    </div>
                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="glass-card p-6 rounded-[2rem] border border-white/10 bg-slate-900/30 space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Filtros & Busca</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <input
            type="text"
            placeholder="Buscar por nome, email, empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-slate-300 focus:border-indigo-500 focus:outline-none"
          >
            <option className="bg-slate-900 text-slate-300" value="">Todos os Status</option>
            <option className="bg-slate-900 text-slate-300" value="novo">Novo</option>
            <option className="bg-slate-900 text-slate-300" value="atendimento">Em Atendimento</option>
            <option className="bg-slate-900 text-slate-300" value="convertido">Convertido</option>
            <option className="bg-slate-900 text-slate-300" value="perdido">Perdido</option>
          </select>

          <select
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
            className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-slate-300 focus:border-indigo-500 focus:outline-none"
          >
            <option className="bg-slate-900 text-slate-300" value="">Todos os Sistemas</option>
            {uniqueProducts.map((p) => (
              <option key={p} className="bg-slate-900 text-slate-300" value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="glass-card rounded-[2.5rem] border border-white/10 bg-slate-900/30 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-black uppercase tracking-widest text-slate-500">
                <th className="p-6">Data</th>
                <th className="p-6">Nome / Empresa</th>
                <th className="p-6">Contato</th>
                <th className="p-6">Interesse</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Date */}
                    <td className="p-6 font-medium text-slate-400">
                      {new Date(lead.createdAt).toLocaleDateString("pt-BR")}
                    </td>

                    {/* Identity */}
                    <td className="p-6">
                      <div className="font-bold text-white">{lead.fullName}</div>
                      <div className="text-xs text-slate-500">{lead.companyName}</div>
                    </td>

                    {/* Contact info */}
                    <td className="p-6">
                      <div className="text-slate-300">{lead.email}</div>
                      <div className="text-xs text-slate-500">{lead.phone}</div>
                    </td>

                    {/* Interest */}
                    <td className="p-6">
                      <span className="rounded-lg bg-indigo-500/10 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-indigo-400 border border-indigo-500/10">
                        {lead.productInterest}
                      </span>
                    </td>

                    {/* Status Dropdown */}
                    <td className="p-6">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead["status"])}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-bold focus:outline-none transition-all ${statusBadgeClasses[lead.status]}`}
                      >
                        <option className="bg-slate-900 text-slate-300" value="novo">{statusLabels.novo}</option>
                        <option className="bg-slate-900 text-slate-300" value="atendimento">{statusLabels.atendimento}</option>
                        <option className="bg-slate-900 text-slate-300" value="convertido">{statusLabels.convertido}</option>
                        <option className="bg-slate-900 text-slate-300" value="perdido">{statusLabels.perdido}</option>
                      </select>
                    </td>

                    {/* Action buttons */}
                    <td className="p-6 text-right space-x-2">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="rounded-lg bg-white/5 border border-white/5 px-3 py-2 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all"
                        title="Ver Mensagem Completa"
                      >
                        🔍 Ver
                      </button>
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="rounded-lg bg-red-950/20 border border-red-900/30 px-3 py-2 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-950/50 transition-all"
                        title="Excluir"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-500 uppercase tracking-widest font-black text-xs">
                    Nenhum lead encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Lead Viewer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all">
          <div className="absolute inset-0" onClick={() => setSelectedLead(null)}></div>
          <div className="relative w-full max-w-2xl glass-card rounded-[2.5rem] border border-white/15 bg-slate-950/90 backdrop-blur-3xl shadow-2xl p-8 md:p-10 space-y-6">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <h3 className="text-2xl font-black text-white">{selectedLead.fullName}</h3>
                <p className="text-slate-400 text-xs mt-1">{selectedLead.companyName} · Lead ID: {selectedLead.id}</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-white text-2xl transition-all"
              >
                &times;
              </button>
            </div>

            {/* Modal Content */}
            <div className="grid gap-4 sm:grid-cols-2 text-sm text-slate-300">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">E-mail Profissional</span>
                <p className="font-semibold text-white">{selectedLead.email}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Telefone Comercial</span>
                <p className="font-semibold text-white">{selectedLead.phone}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Data de Envio</span>
                <p className="font-semibold">{new Date(selectedLead.createdAt).toLocaleString("pt-BR")}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Página de Origem</span>
                <p className="font-semibold break-all text-slate-400">{selectedLead.sourcePath || "/"}</p>
              </div>
              {selectedLead.consentPolicyVersion && (
                <div className="space-y-1 sm:col-span-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Consentimento da Política</span>
                  <p className="font-semibold">Aceito (Versão {selectedLead.consentPolicyVersion})</p>
                </div>
              )}
              <div className="space-y-1 sm:col-span-2 border-t border-white/5 pt-4 mt-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Mensagem/Necessidade do Lead</span>
                <p className="rounded-xl border border-white/5 bg-white/5 p-4 text-slate-300 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
                  {selectedLead.message}
                </p>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex flex-wrap gap-4 justify-between items-center border-t border-white/10 pt-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status do Lead:</span>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as Lead["status"])}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-bold focus:outline-none transition-all ${statusBadgeClasses[selectedLead.status]}`}
                >
                  <option className="bg-slate-900 text-slate-300" value="novo">{statusLabels.novo}</option>
                  <option className="bg-slate-900 text-slate-300" value="atendimento">{statusLabels.atendimento}</option>
                  <option className="bg-slate-900 text-slate-300" value="convertido">{statusLabels.convertido}</option>
                  <option className="bg-slate-900 text-slate-300" value="perdido">{statusLabels.perdido}</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleDeleteLead(selectedLead.id);
                  }}
                  className="rounded-xl bg-red-950/20 border border-red-900/30 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-red-400 hover:text-red-300 hover:bg-red-950/50 transition-all"
                >
                  Excluir Lead
                </button>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="rounded-xl bg-white/5 border border-white/10 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all"
                >
                  Fechar
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
