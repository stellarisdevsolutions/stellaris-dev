"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Sparkles, ArrowUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full border-t border-slate-900 bg-[#070b14] py-12 text-slate-400 overflow-hidden">
      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand & Mission */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="#inicio" className="flex items-center gap-2.5 mb-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
                <Sparkles className="h-4 w-4 fill-amber-400/30" />
              </div>
              <span className="font-michroma text-base font-bold text-white tracking-wider">
                STELLARIS<span className="text-amber-400">.DEV</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 max-w-sm">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick Navigation & Direct Contacts */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-slate-400">
              <Link href="#servicios" className="hover:text-amber-400 transition-colors">
                {t.navbar.services}
              </Link>
              <Link href="#proyectos" className="hover:text-amber-400 transition-colors">
                {t.navbar.projects}
              </Link>
              <Link href="#proceso" className="hover:text-amber-400 transition-colors">
                {t.navbar.process}
              </Link>
              <Link href="#precios" className="hover:text-amber-400 transition-colors">
                {t.navbar.pricing}
              </Link>
              <Link href="#contacto" className="hover:text-amber-400 transition-colors">
                {t.navbar.contact}
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <a
                href="https://wa.me/59169991245"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/50 transition-colors font-mono"
              >
                WA: +591 69991245
              </a>
              <a
                href="mailto:stellarisdev.us@gmail.com"
                className="px-3 py-1.5 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-300 hover:bg-amber-900/50 transition-colors font-mono"
              >
                stellarisdev.us@gmail.com
              </a>
            </div>
          </div>

          {/* Scroll to Top */}
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-400/40 transition-all cursor-pointer shadow-md"
              title="Volver arriba"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-slate-600">
          <p>© {new Date().getFullYear()} Stellaris Dev. {t.footer.rights}</p>
          <p>{t.footer.techText}</p>
        </div>
      </Container>
    </footer>
  );
}
