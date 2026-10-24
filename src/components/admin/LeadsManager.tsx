"use client";

import React, { useState } from "react";
import { updateMessageStatusAction } from "@/app/admin/actions";
import {
  Inbox,
  Search,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Sparkles,
} from "lucide-react";

interface LeadMessage {
  id: number;
  name: string;
  email: string;
  projectType: string | null;
  details: string;
  status: string;
  createdAt: Date;
}

interface LeadsManagerProps {
  initialMessages: LeadMessage[];
}

export function LeadsManager({ initialMessages }: LeadsManagerProps) {
  const [messages, setMessages] = useState<LeadMessage[]>(initialMessages);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "contacted">("all");
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const filtered = messages.filter((m) => {
    const q = search.toLowerCase();
    const matchesSearch =
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.details.toLowerCase().includes(q) ||
      (m.projectType && m.projectType.toLowerCase().includes(q));

    if (filter === "unread") return matchesSearch && m.status === "unread";
    if (filter === "contacted") return matchesSearch && m.status === "contacted";
    return matchesSearch;
  });

  const toggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "unread" ? "contacted" : "unread";
    setLoadingId(id);
    try {
      await updateMessageStatusAction(id, newStatus);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Inbox className="w-6 h-6 text-[#FF532A]" />
            Bandeja de Consultas & Leads
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Personas y empresas interesadas que han completado el formulario de contacto de Stellaris Dev.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filter === "all"
                ? "bg-white text-black"
                : "bg-white/5 text-neutral-400 hover:text-white"
            }`}
          >
            Todos ({messages.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filter === "unread"
                ? "bg-[#FF532A] text-white"
                : "bg-white/5 text-neutral-400 hover:text-white"
            }`}
          >
            No leídos ({messages.filter((m) => m.status === "unread").length})
          </button>
          <button
            onClick={() => setFilter("contacted")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filter === "contacted"
                ? "bg-emerald-500 text-white"
                : "bg-white/5 text-neutral-400 hover:text-white"
            }`}
          >
            Contactados ({messages.filter((m) => m.status === "contacted").length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre, correo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#171719] border border-white/10 focus:border-[#FF532A] text-white text-xs rounded-xl pl-10 pr-4 py-2 outline-none placeholder:text-neutral-500"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-3">
        {filtered.map((msg) => (
          <div
            key={msg.id}
            className={`p-5 rounded-2xl border transition-all ${
              msg.status === "unread"
                ? "bg-[#1b1b1e] border-[#FF532A]/30 shadow-lg shadow-[#FF532A]/5"
                : "bg-[#171719] border-white/10 opacity-80"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                    msg.status === "unread"
                      ? "bg-[#FF532A] text-white"
                      : "bg-white/10 text-neutral-400"
                  }`}
                >
                  {msg.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white">{msg.name}</span>
                    <span className="text-xs text-neutral-400 flex items-center gap-1 font-mono">
                      <Mail className="w-3 h-3 text-neutral-500" />
                      {msg.email}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    Interés: <span className="text-[#FF532A] font-semibold">{msg.projectType || "General"}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
                <button
                  onClick={() => toggleStatus(msg.id, msg.status)}
                  disabled={loadingId === msg.id}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    msg.status === "unread"
                      ? "bg-[#FF532A]/10 border-[#FF532A]/30 text-[#FF532A] hover:bg-[#FF532A]/20"
                      : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                  }`}
                >
                  {msg.status === "unread" ? (
                    <>
                      <AlertCircle className="w-3.5 h-3.5" />
                      Marcar contactado
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Contactado ✓
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Message Body */}
            <div className="pt-3 text-xs text-neutral-300 leading-relaxed font-sans bg-[#202024]/50 p-3.5 rounded-xl mt-3 border border-white/5">
              <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold block mb-1">
                Detalle del requerimiento:
              </span>
              {msg.details}
            </div>

            {/* Direct Email Action */}
            <div className="mt-3 flex items-center justify-end">
              <a
                href={`mailto:${msg.email}?subject=Respuesta de Stellaris Dev - ${encodeURIComponent(msg.projectType || "Proyecto")}`}
                className="inline-flex items-center gap-1.5 text-xs text-[#FF532A] hover:underline font-semibold"
              >
                <Mail className="w-3.5 h-3.5" />
                Responder por correo a {msg.name} →
              </a>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-[#171719] border border-white/10 rounded-2xl">
            <MessageSquare className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
            <p className="text-xs text-neutral-400">No hay consultas en esta sección.</p>
          </div>
        )}
      </div>
    </div>
  );
}
