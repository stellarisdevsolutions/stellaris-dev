"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="w-full bg-[#171717] text-white rounded-t-[36px] sm:rounded-t-[48px] overflow-hidden mt-12 border-t border-neutral-800">
      <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 pt-16 pb-12 flex flex-col gap-10">
        {/* Top row */}
        <div className="flex justify-between items-center flex-wrap gap-6">
          <Link href="#inicio" className="hd flex items-center gap-2.5 font-bold text-xl sm:text-2xl text-white group">
            <span className="w-8 h-8 rounded-full bg-[#FF532A] text-white flex items-center justify-center font-bold text-sm shadow-md shadow-[#FF532A]/30 group-hover:scale-105 transition-transform">
              ✦
            </span>
            <span>Stellaris Dev</span>
          </Link>

          <div className="flex gap-6 sm:gap-8 text-sm font-medium flex-wrap text-neutral-300">
            <Link href="#servicios" className="hover:text-[#FF532A] transition-colors">
              {t.navbar.services}
            </Link>
            <Link href="#proyectos" className="hover:text-[#FF532A] transition-colors">
              {t.navbar.projects}
            </Link>
            <Link href="#proceso" className="hover:text-[#FF532A] transition-colors">
              {t.navbar.process}
            </Link>
            <Link href="#precios" className="hover:text-[#FF532A] transition-colors">
              {t.navbar.pricing}
            </Link>
            <Link href="#contacto" className="hover:text-[#FF532A] transition-colors">
              {t.navbar.contact}
            </Link>
          </div>
        </div>

        {/* Middle Call to action */}
        <div className="py-8 border-y border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h4 className="hd text-xl sm:text-2xl font-bold text-white m-0">
              {lang === "es" ? "¿Listo para iniciar tu próximo proyecto?" : "Ready to launch your next website?"}
            </h4>
            <p className="text-sm text-neutral-400 mt-1 m-0">
              {lang === "es"
                ? "Contáctanos hoy y recibe una cotización clara en menos de 24 horas."
                : "Get in touch today and receive a tailored estimate within 24 hours."}
            </p>
          </div>

          <Link
            href="https://wa.me/59169991245"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FF532A] hover:bg-[#E5451D] text-white font-semibold text-sm px-6 py-3.5 rounded-full shadow-lg shadow-[#FF532A]/30 transition-all hover:scale-105"
          >
            <span>WhatsApp: +591 69991245</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bottom row */}
        <div className="flex justify-between items-center flex-wrap gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Stellaris Dev Solutions. {lang === "es" ? "Todos los derechos reservados." : "All rights reserved."}
          </div>
          <div className="flex gap-4">
            <a href="mailto:stellarisdev.us@gmail.com" className="hover:text-white transition-colors">
              stellarisdev.us@gmail.com
            </a>
            <span>·</span>
            <span>Next.js 16 + React 19</span>
          </div>
        </div>
      </div>
    </footer>
  );
}