"use client";

import React, { useState } from "react";
import { seedDatabaseAction } from "@/app/admin/actions";
import {
  Database,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Terminal,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Layers,
} from "lucide-react";

interface DatabaseSettingsProps {
  isConfigured: boolean;
}

export function DatabaseSettings({ isConfigured }: DatabaseSettingsProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSeed = async () => {
    if (!confirm("¿Deseas sincronizar y sembrar los datos predeterminados en la base de datos?")) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await seedDatabaseAction();
      setResult(res);
    } catch (err: any) {
      setResult({
        success: false,
        message: err?.message || "Ocurrió un error al ejecutar el sembrado.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <Database className="w-6 h-6 text-[#E6FF2A]" />
          Base de Datos & Sincronización Vercel
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Configuración de Vercel Postgres / Neon con Drizzle ORM y herramientas de migración.
        </p>
      </div>

      {/* Status Card */}
      <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                isConfigured
                  ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                  : "bg-amber-500/10 border border-amber-500/20 text-amber-300"
              }`}
            >
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white">
                  Vercel Postgres (Neon)
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                    isConfigured
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                      : "bg-amber-500/10 border-amber-500/20 text-amber-300"
                  }`}
                >
                  {isConfigured ? "Conectado y Operativo" : "Modo Local Fallback"}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                {isConfigured
                  ? "La variable POSTGRES_URL está activa. Todas las operaciones leen y escriben en Postgres."
                  : "No se detectó POSTGRES_URL. La app opera en modo seguro con datos locales estáticos sin romperse."}
              </p>
            </div>
          </div>

          <button
            onClick={handleSeed}
            disabled={loading || !isConfigured}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#E6FF2A] hover:bg-[#D8F219] disabled:opacity-40 disabled:hover:bg-[#E6FF2A] text-[#0C4651] transition-all shadow-lg shadow-[#E6FF2A]/20 flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Sembrar Datos Iniciales (Seed)
          </button>
        </div>

        {result && (
          <div
            className={`p-4 rounded-xl text-xs border flex items-center gap-2.5 ${
              result.success
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}
          >
            {result.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
            <span>{result.message}</span>
          </div>
        )}
      </div>

      {/* Guide: How to connect Vercel Postgres */}
      <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#E6FF2A]" />
          ¿Cómo activar la base de datos en Vercel con 1 clic?
        </h2>

        <div className="space-y-3 text-xs text-neutral-300 leading-relaxed">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#202024]/60 border border-white/5">
            <span className="w-6 h-6 rounded-full bg-[#E6FF2A] text-[#0C4651] font-bold flex items-center justify-center shrink-0 text-xs">
              1
            </span>
            <div>
              <p className="font-semibold text-white">Crea o vincula tu base de datos en Vercel</p>
              <p className="text-neutral-400 mt-0.5">
                En tu proyecto de Vercel Dashboard, ve a la pestaña <strong>Storage</strong> y selecciona <strong>Postgres (Neon)</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#202024]/60 border border-white/5">
            <span className="w-6 h-6 rounded-full bg-[#E6FF2A] text-[#0C4651] font-bold flex items-center justify-center shrink-0 text-xs">
              2
            </span>
            <div>
              <p className="font-semibold text-white">Variables Automáticas</p>
              <p className="text-neutral-400 mt-0.5">
                Vercel inyecta automáticamente <code className="text-[#E6FF2A] bg-white/5 px-1 py-0.5 rounded font-mono">POSTGRES_URL</code> en tus variables de entorno de producción.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#202024]/60 border border-white/5">
            <span className="w-6 h-6 rounded-full bg-[#E6FF2A] text-[#0C4651] font-bold flex items-center justify-center shrink-0 text-xs">
              3
            </span>
            <div>
              <p className="font-semibold text-white">Empujar el esquema (Push)</p>
              <p className="text-neutral-400 mt-0.5">
                Para sincronizar las tablas de Drizzle con Vercel, ejecuta en la terminal:
              </p>
              <div className="mt-2 p-2.5 rounded-lg bg-black/60 font-mono text-[#E6FF2A] text-[11px] flex items-center justify-between">
                <code>pnpm db:push</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drizzle Kit Commands Reference */}
      <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#E6FF2A]" />
          Comandos CLI de Drizzle ORM
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-[#202024] border border-white/5 space-y-1.5">
            <span className="font-mono text-[#E6FF2A] font-bold">pnpm db:push</span>
            <p className="text-neutral-400 text-[11px]">
              Aplica el esquema de `schema.ts` a tu base de datos Vercel al instante.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#202024] border border-white/5 space-y-1.5">
            <span className="font-mono text-[#E6FF2A] font-bold">pnpm db:seed</span>
            <p className="text-neutral-400 text-[11px]">
              Inserta los proyectos y productos iniciales de demostración en Postgres.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#202024] border border-white/5 space-y-1.5">
            <span className="font-mono text-[#E6FF2A] font-bold">pnpm db:studio</span>
            <p className="text-neutral-400 text-[11px]">
              Abre el visualizador visual interactivo de Drizzle en tu navegador.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
