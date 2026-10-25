"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { loginAdmin } from "../actions";
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@stellaris.dev");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await loginAdmin(email, password);
      if (res.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(res.error || "Credenciales inválidas");
      }
    } catch (err: any) {
      setError("Ocurrió un error al intentar iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0E] text-white flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[250px] bg-[#FF532A]/15 rounded-full blur-[90px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo badge */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-3 group">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-black/40 ring-1 ring-white/10 shrink-0 shadow-lg shadow-[#FF532A]/25">
              <Image
                src="/logo.webp"
                alt="Stellaris Dev"
                width={32}
                height={32}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-[#FF532A] transition-colors">
              STELLARIS<span className="text-[#FF532A]">.</span>DEV
            </span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF532A]" />
            Panel de Control Privado
          </div>
          <h1 className="text-2xl font-bold mt-4 tracking-tight">Acceso Administrativo</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Ingresa tus credenciales seguras para acceder a la gestión de Stellaris Dev.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#171719] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@stellaris.dev"
                  className="w-full bg-[#202024] border border-white/10 focus:border-[#FF532A] focus:ring-1 focus:ring-[#FF532A] text-white text-xs rounded-xl pl-10 pr-4 py-2.5 outline-none transition-all placeholder:text-neutral-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Introduce tu contraseña..."
                  className="w-full bg-[#202024] border border-white/10 focus:border-[#FF532A] focus:ring-1 focus:ring-[#FF532A] text-white text-xs rounded-xl pl-10 pr-4 py-2.5 outline-none transition-all placeholder:text-neutral-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-xs bg-[#FF532A] hover:bg-[#e0451e] text-white transition-all shadow-lg shadow-[#FF532A]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Entrar al Panel
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick info tip */}
          <div className="mt-5 pt-4 border-t border-white/5 flex items-start gap-2.5 text-xs text-neutral-400">
            <Sparkles className="w-4 h-4 text-[#FF532A] shrink-0 mt-0.5" />
            <p>
              Credenciales iniciales: <code className="text-white bg-white/10 px-1 py-0.5 rounded font-mono">admin@stellaris.dev</code> / <code className="text-white bg-white/10 px-1 py-0.5 rounded font-mono">stellaris2026</code> (Cifrado con <strong className="text-neutral-300">bcrypt</strong> en Neon Postgres).
            </p>
          </div>
        </div>

        {/* Back to website */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-neutral-400 hover:text-white transition-colors"
          >
            ← Volver al sitio web principal
          </Link>
        </div>
      </div>
    </div>
  );
}

