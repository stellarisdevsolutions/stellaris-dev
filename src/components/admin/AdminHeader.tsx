"use client";

import React from "react";
import { Database, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

interface AdminHeaderProps {
  isDbConnected: boolean;
}

export function AdminHeader({ isDbConnected }: AdminHeaderProps) {
  return (
    <header className="h-16 border-b border-white/10 bg-[#141416]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left indicator */}
      <div className="flex items-center gap-3">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border ${
            isDbConnected
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-amber-500/10 border-amber-500/20 text-amber-300"
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>
            {isDbConnected ? "Vercel Postgres: Activo" : "Modo Local: Fallback Seguro"}
          </span>
          {isDbConnected ? (
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          ) : (
            <AlertTriangle className="w-3 h-3 text-amber-400" />
          )}
        </div>
      </div>

      {/* Right admin profile badge */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-semibold text-white">Stellaris Admin</p>
          <p className="text-[10px] text-neutral-400">Master Control</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF532A] to-amber-500 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-[#FF532A]/20">
          <ShieldCheck className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
}
