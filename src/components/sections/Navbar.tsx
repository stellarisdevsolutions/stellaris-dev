"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Globe, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const leftNav = [
    { label: lang === "es" ? "Inicio" : "Home", href: "#inicio" },
    { label: t.navbar.services, href: "#servicios" },
    { label: t.navbar.projects, href: "#proyectos" },
  ];

  const rightNav = [
    { label: t.navbar.pricing, href: "#precios" },
    { label: t.navbar.contact, href: "#contacto" },
  ];

  const allNavItems = [
    { label: lang === "es" ? "Inicio" : "Home", href: "#inicio" },
    { label: t.navbar.services, href: "#servicios" },
    { label: t.navbar.projects, href: "#proyectos" },
    { label: t.navbar.process, href: "#proceso" },
    { label: t.navbar.pricing, href: "#precios" },
    { label: t.navbar.contact, href: "#contacto" },
  ];

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-[880px]">
      {/* Floating Pill Container in Slate 900 */}
      <div className="bg-[#0F172A]/95 backdrop-blur-md border border-slate-700/80 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-[0_20px_50px_rgba(15,23,42,0.4)] flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 sm:gap-6 text-[13.5px] font-medium text-slate-300">
          {leftNav.map((link, idx) => (
            <Link
              key={link.label}
              href={link.href}
              className={`transition-colors hover:text-[#2563EB] ${
                idx === 0 ? "text-[#2563EB] font-semibold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Center Brand Logo with Blue Circular Badge */}
        <Link
          href="#inicio"
          className="hd flex items-center gap-2 font-bold text-[17px] sm:text-[19px] text-white tracking-tight group"
        >
          <span className="w-7 h-7 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform">
            ✦
          </span>
          <span>Stellaris</span>
        </Link>

        {/* Right Nav Links & Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <nav className="hidden md:flex items-center gap-5 text-[13.5px] font-medium text-slate-300">
            {rightNav.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-[#2563EB]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Language Switcher Pill */}
          <div className="flex items-center rounded-full bg-slate-800 border border-slate-700 p-0.5 text-xs font-mono">
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                lang === "en"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang("es")}
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                lang === "es"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              ES
            </button>
          </div>

          {/* Quick CTA in Emerald Green #10B981 */}
          <Link
            href="#contacto"
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#10B981] hover:bg-[#059669] text-white text-[13px] font-semibold px-4 py-1.5 rounded-full shadow-md shadow-emerald-500/25 transition-all hover:scale-105"
          >
            <span>{lang === "es" ? "Cotizar" : "Hire Us"}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-200 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 rounded-3xl border border-slate-700 bg-[#0F172A]/98 p-6 backdrop-blur-2xl shadow-2xl text-white"
          >
            <div className="flex flex-col gap-3.5">
              {allNavItems.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-slate-200 hover:text-[#2563EB] py-1 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-3 border-t border-slate-700 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-[#2563EB]" />
                  Idioma / Language
                </span>
                <div className="flex items-center rounded-full bg-slate-800 border border-slate-700 p-0.5 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setLang("en")}
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      lang === "en" ? "bg-[#2563EB] text-white" : "text-slate-400"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang("es")}
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      lang === "es" ? "bg-[#2563EB] text-white" : "text-slate-400"
                    }`}
                  >
                    ES
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="#contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 bg-[#10B981] hover:bg-[#059669] text-white font-semibold text-sm rounded-full shadow-lg block"
                >
                  {lang === "es" ? "Empezar Proyecto ↗" : "Start Project ↗"}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}