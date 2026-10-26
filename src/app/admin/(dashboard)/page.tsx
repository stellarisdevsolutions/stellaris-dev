import React from "react";
import Link from "next/link";
import {
  getAllProjects,
  getAllMarketplaceProducts,
  getAllContactMessages,
} from "@/db/service";
import { isDatabaseConfigured } from "@/db";
import {
  FolderGit2,
  ShoppingBag,
  Inbox,
  Database,
  Plus,
  ArrowRight,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const [projectsList, marketplaceList, messagesList] = await Promise.all([
    getAllProjects(),
    getAllMarketplaceProducts(),
    getAllContactMessages(),
  ]);

  const unreadMessagesCount = messagesList.filter((m) => m.status === "unread").length;

  return (
    <div className="space-y-8">
      {/* Top greeting banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#E6FF2A]/10 border border-[#E6FF2A]/20 text-[#E6FF2A] text-xs font-medium mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Vercel Fullstack Admin
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Resumen del Sistema
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Gestiona el contenido público, productos del marketplace y clientes potenciales.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-all border border-white/10"
          >
            <Plus className="w-4 h-4 text-[#E6FF2A]" />
            Nuevo Proyecto
          </Link>
          <Link
            href="/admin/marketplace"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#E6FF2A] hover:bg-[#D8F219] text-[#0C4651] font-bold transition-all shadow-lg shadow-[#E6FF2A]/20"
          >
            <Plus className="w-4 h-4" />
            Nueva Solución
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Projects */}
        <Link
          href="/admin/projects"
          className="bg-[#171719] border border-white/10 hover:border-white/20 p-5 rounded-2xl transition-all group block"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-neutral-400">Proyectos Activos</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold tracking-tight text-white">
            {projectsList.length}
          </div>
          <div className="flex items-center gap-1 text-xs text-neutral-400 mt-2 group-hover:text-white transition-colors">
            <span>Ver listado completo</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>

        {/* Card 2: Marketplace */}
        <Link
          href="/admin/marketplace"
          className="bg-[#171719] border border-white/10 hover:border-white/20 p-5 rounded-2xl transition-all group block"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-neutral-400">Soluciones en Venta</span>
            <div className="w-9 h-9 rounded-xl bg-[#E6FF2A]/10 border border-[#E6FF2A]/20 text-[#E6FF2A] flex items-center justify-center group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold tracking-tight text-white">
            {marketplaceList.length}
          </div>
          <div className="flex items-center gap-1 text-xs text-neutral-400 mt-2 group-hover:text-white transition-colors">
            <span>Gestionar catálogo</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>

        {/* Card 3: Leads */}
        <Link
          href="/admin/leads"
          className="bg-[#171719] border border-white/10 hover:border-white/20 p-5 rounded-2xl transition-all group block relative overflow-hidden"
        >
          {unreadMessagesCount > 0 && (
            <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E6FF2A] text-[#0C4651] font-bold">
              {unreadMessagesCount} nuevo{unreadMessagesCount > 1 ? "s" : ""}
            </span>
          )}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-neutral-400">Mensajes Recibidos</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold tracking-tight text-white">
            {messagesList.length}
          </div>
          <div className="flex items-center gap-1 text-xs text-neutral-400 mt-2 group-hover:text-white transition-colors">
            <span>Revisar bandeja</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>

        {/* Card 4: Database Status */}
        <Link
          href="/admin/settings"
          className="bg-[#171719] border border-white/10 hover:border-white/20 p-5 rounded-2xl transition-all group block"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-neutral-400">Vercel Database</span>
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform ${
                isDatabaseConfigured
                  ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                  : "bg-amber-500/10 border border-amber-500/20 text-amber-300"
              }`}
            >
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="text-base font-bold tracking-tight text-white flex items-center gap-2">
            {isDatabaseConfigured ? (
              <span className="text-emerald-400 flex items-center gap-1 text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Postgres Conectado
              </span>
            ) : (
              <span className="text-amber-300 text-sm font-semibold">Modo Local (Mock)</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-neutral-400 mt-4 group-hover:text-white transition-colors">
            <span>Configuración y sincronización</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Main Grid: Recent Activity & Quick Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Recent Messages */}
        <div className="lg:col-span-2 bg-[#171719] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Inbox className="w-4 h-4 text-[#E6FF2A]" />
                Últimas Consultas de Clientes
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Mensajes enviados desde el formulario web
              </p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-[#E6FF2A] hover:underline"
            >
              Ver todos ({messagesList.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {messagesList.slice(0, 4).map((msg) => (
              <div
                key={msg.id}
                className="p-4 rounded-xl bg-[#202024]/60 border border-white/5 hover:border-white/10 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{msg.name}</span>
                    <span className="text-xs text-neutral-400 font-mono">({msg.email})</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                        msg.status === "unread"
                          ? "bg-[#E6FF2A]/10 border-[#E6FF2A]/30 text-[#E6FF2A]"
                          : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                      }`}
                    >
                      {msg.status === "unread" ? "Nuevo" : "Contactado"}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 line-clamp-1">
                    <span className="text-[#E6FF2A] font-semibold">{msg.projectType}: </span>
                    {msg.details}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] text-neutral-500 flex items-center gap-1 sm:justify-end">
                    <Clock className="w-3 h-3" />
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}

            {messagesList.length === 0 && (
              <div className="text-center py-8 text-neutral-500 text-xs">
                No hay consultas registradas aún.
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 col): System & Quick Tools */}
        <div className="space-y-6">
          {/* Quick links card */}
          <div className="bg-[#171719] border border-white/10 rounded-2xl p-6">
            <h2 className="text-base font-bold text-white mb-4">Acciones Rápidas</h2>
            <div className="space-y-2.5">
              <Link
                href="/admin/projects"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#202024]/80 hover:bg-[#202024] border border-white/5 hover:border-white/15 text-xs text-neutral-200 transition-all"
              >
                <span>Administrar Proyectos</span>
                <span className="text-[#E6FF2A] font-semibold">→</span>
              </Link>
              <Link
                href="/admin/marketplace"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#202024]/80 hover:bg-[#202024] border border-white/5 hover:border-white/15 text-xs text-neutral-200 transition-all"
              >
                <span>Editar Precios Marketplace</span>
                <span className="text-[#E6FF2A] font-semibold">→</span>
              </Link>
              <Link
                href="/admin/settings"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#202024]/80 hover:bg-[#202024] border border-white/5 hover:border-white/15 text-xs text-neutral-200 transition-all"
              >
                <span>Sincronizar Base de Datos Vercel</span>
                <span className="text-[#E6FF2A] font-semibold">→</span>
              </Link>
            </div>
          </div>

          {/* Vercel Integration Tip */}
          <div className="bg-gradient-to-br from-[#171719] to-[#202024] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-white">
              <Sparkles className="w-4 h-4 text-[#E6FF2A]" />
              Despliegue en Vercel
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Al conectar la base de datos de Vercel (Postgres/Neon), el panel cambiará automáticamente a modo persistente sin necesidad de cambios en código.
            </p>
            <Link
              href="/admin/settings"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E6FF2A] hover:underline"
            >
              Ver instrucciones de conexión <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
