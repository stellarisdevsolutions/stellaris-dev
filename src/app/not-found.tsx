import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-[#171717] flex flex-col selection:bg-[#E6FF2A] selection:text-[#0C4651]">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-24 px-6 text-center">
        <div className="w-full max-w-[640px] mx-auto flex flex-col items-center">
          {/* Badge 404 */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-6 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6FF2A]" />
            <span>ERROR 404 • PÁGINA NO ENCONTRADA</span>
          </div>

          {/* Gran 404 Estilizado */}
          <div className="hd text-7xl sm:text-9xl font-extrabold text-[#171717] tracking-tighter leading-none mb-6">
            4<span className="text-[#0C4651]">0</span>4
          </div>

          <h1 className="hd text-2xl sm:text-4xl font-bold tracking-tight text-[#171717] mb-4">
            Esta página no orbita en nuestro universo
          </h1>

          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-8 max-w-[480px]">
            La ruta que estás buscando no existe, fue reubicada o el enlace ha caducado. Vuelve al inicio o explora nuestros proyectos y plantillas.
          </p>

          {/* Botones de Acción */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#E6FF2A] hover:bg-[#D8F219] text-[#0C4651] text-sm font-semibold px-6 py-3 rounded-full shadow-md shadow-[#E6FF2A]/20 transition-all hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al Inicio</span>
            </Link>

            <Link
              href="/marketplace"
              className="inline-flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 text-[#171717] text-sm font-semibold px-6 py-3 rounded-full transition-all"
            >
              <span>Explorar Marketplace</span>
              <ArrowUpRight className="w-4 h-4 text-[#0C4651]" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
