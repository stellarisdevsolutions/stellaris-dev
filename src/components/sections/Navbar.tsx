"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: t.navbar.services, href: "#servicios" },
    { label: t.navbar.projects, href: "#proyectos" },
    { label: t.navbar.process, href: "#proceso" },
    { label: t.navbar.pricing, href: "#precios" },
    { label: t.navbar.contact, href: "#contacto" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#171717]/95 backdrop-blur-md border-b border-[#2E2E2E]/80 py-3 shadow-lg shadow-black/30"
          : "bg-transparent py-4 sm:py-6"
      }`}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo with Yellow Star & Red live status indicator */}
          <div className="flex items-center gap-4">
            <Link href="#inicio" className="hd flex items-center gap-2.5 font-bold text-xl sm:text-2xl text-[#F5F5F7] group">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFC928"
                strokeWidth="1.8"
                strokeLinejoin="round"
                className="shrink-0 transition-transform group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,201,40,0.5)]"
                aria-hidden="true"
              >
                <path d="M12 2l2.6 6.4L21 9.3l-5 4.4 1.5 6.6L12 16.8 6.5 20.3 8 13.7 3 9.3l6.4-.9z" />
              </svg>
              <span>Stellaris Dev</span>
            </Link>

            {/* Surgical Red Accent: Live status pulse badge */}
            <div className="hidden xl:flex items-center gap-2 border border-[#2E2E2E] bg-[#212121]/80 rounded-full px-3 py-1 text-xs text-[#A3A3A3]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF3340] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EF3340]"></span>
              </span>
              <span>{lang === "es" ? "Disponibles para proyectos" : "Available for projects"}</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-normal text-[#F5F5F7]">
            {navItems.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[#F5F5F7] hover:text-[#FF6A00] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action: Language Switcher & Accent CTA Button */}
          <div className="flex items-center gap-3">
            {/* Language Switcher Capsule */}
            <div className="flex items-center rounded-full bg-[#212121] border border-[#2E2E2E] p-0.5 text-xs font-mono">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  lang === "en"
                    ? "bg-[#FF6A00] text-white shadow-xs"
                    : "text-[#A3A3A3] hover:text-white"
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("es")}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  lang === "es"
                    ? "bg-[#FF6A00] text-white shadow-xs"
                    : "text-[#A3A3A3] hover:text-white"
                }`}
                title="Cambiar a Español"
              >
                ES
              </button>
            </div>

            {/* CTA Button: Cotizar proyecto */}
            <Link
              href="#contacto"
              className="hidden sm:inline-flex btn-accent px-5 py-2.5 text-[15px] font-medium"
            >
              {t.navbar.ctaBtn}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#F5F5F7] hover:text-[#FF6A00] rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-[#FF6A00]" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mx-4 mt-3 rounded-2xl border border-[#2E2E2E] bg-[#171717]/98 p-6 backdrop-blur-2xl shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-[#F5F5F7] hover:text-[#FF6A00] py-1 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-3 border-t border-[#2E2E2E] flex items-center justify-between">
                <span className="text-xs text-[#A3A3A3] flex items-center gap-1.5 font-medium">
                  <Globe className="h-3.5 w-3.5 text-[#FF6A00]" />
                  Idioma / Language:
                </span>
                <div className="flex items-center rounded-full bg-[#212121] border border-[#2E2E2E] p-0.5 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setLang("en")}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      lang === "en"
                        ? "bg-[#FF6A00] text-white"
                        : "text-[#A3A3A3] hover:text-white"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang("es")}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      lang === "es"
                        ? "bg-[#FF6A00] text-white"
                        : "text-[#A3A3A3] hover:text-white"
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
                  className="btn-accent w-full py-3 text-center text-sm font-medium"
                >
                  {t.navbar.ctaBtn}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
