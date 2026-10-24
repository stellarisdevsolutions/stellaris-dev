"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const { lang, setLang } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const leftNav = [
    { label: lang === "es" ? "INICIO" : "HOME", href: "/#home" },
    { label: lang === "es" ? "NOSOTROS" : "ABOUT", href: "/#about" },
    { label: lang === "es" ? "SERVICIOS" : "SERVICES", href: "/#services" },
    { label: lang === "es" ? "PROYECTOS" : "PROJECTS", href: "/projects" },
  ];

  const rightNav = [
    { label: "MARKETPLACE", href: "/marketplace" },
    { label: lang === "es" ? "PRECIOS" : "PRICING", href: "/#pricing" },
  ];

  const allNavItems = [
    { label: lang === "es" ? "INICIO" : "HOME", href: "/#home" },
    { label: lang === "es" ? "NOSOTROS" : "ABOUT", href: "/#about" },
    { label: lang === "es" ? "SERVICIOS" : "SERVICES", href: "/#services" },
    { label: lang === "es" ? "PROYECTOS" : "PROJECTS", href: "/projects" },
    { label: "MARKETPLACE", href: "/marketplace" },
    { label: lang === "es" ? "PROCESO" : "PROCESS", href: "/#process" },
    { label: lang === "es" ? "PRECIOS" : "PRICING", href: "/#pricing" },
  ];

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-[880px]">
      {/* Floating Pill Container matching exact reference */}
      <div className="bg-[#171717]/95 backdrop-blur-md border border-neutral-800/80 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-[0_20px_50px_rgba(0,0,0,0.35)] flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Navigation Links (Todos en mayúsculas) */}
        <nav className="hidden md:flex items-center gap-5 sm:gap-6 text-[12.5px] font-semibold tracking-wider text-neutral-300">
          {leftNav.map((link, idx) => (
            <Link
              key={link.label}
              href={link.href}
              className={`transition-colors hover:text-[#FF532A] ${
                idx === 0 ? "text-[#FF532A]" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Center Brand Logo with Circular Badge */}
        <Link
          href="/#home"
          className="hd flex items-center gap-2 font-bold text-[17px] sm:text-[19px] text-white tracking-tight group"
        >
          <span className="w-7 h-7 rounded-full bg-[#FF532A] text-white flex items-center justify-center font-bold text-xs shadow-md shadow-[#FF532A]/30 group-hover:scale-105 transition-transform">
            ✦
          </span>
          <span>Stellaris</span>
        </Link>

        {/* Right Nav Links & Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <nav className="hidden md:flex items-center gap-5 text-[12.5px] font-semibold tracking-wider text-neutral-300">
            {rightNav.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-[#FF532A]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Language Switcher Pill */}
          <div className="flex items-center rounded-full bg-neutral-900 border border-neutral-800 p-0.5 text-xs font-mono">
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                lang === "en"
                  ? "bg-[#FF532A] text-white shadow-xs"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang("es")}
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                lang === "es"
                  ? "bg-[#FF532A] text-white shadow-xs"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              ES
            </button>
          </div>

          {/* CTA: Botón de Contacto */}
          <Link
            href="/#contact"
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#FF532A] hover:bg-[#E5451D] text-white text-[12.5px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full shadow-md shadow-[#FF532A]/25 transition-all hover:scale-105"
          >
            <span>{lang === "es" ? "CONTACTO" : "CONTACT"}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-neutral-200 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
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
            className="md:hidden mt-3 rounded-3xl border border-neutral-800 bg-[#171717]/98 p-6 backdrop-blur-2xl shadow-2xl text-white"
          >
            <div className="flex flex-col gap-3.5">
              {allNavItems.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold tracking-wider text-neutral-200 hover:text-[#FF532A] py-1 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  Idioma / Language
                </span>
                <div className="flex items-center rounded-full bg-neutral-900 border border-neutral-800 p-0.5 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setLang("en")}
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      lang === "en" ? "bg-[#FF532A] text-white" : "text-neutral-400"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang("es")}
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      lang === "es" ? "bg-[#FF532A] text-white" : "text-neutral-400"
                    }`}
                  >
                    ES
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 bg-[#FF532A] hover:bg-[#E5451D] text-white font-bold tracking-wider uppercase text-sm rounded-full shadow-lg block"
                >
                  {lang === "es" ? "CONTACTO ↗" : "CONTACT ↗"}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
