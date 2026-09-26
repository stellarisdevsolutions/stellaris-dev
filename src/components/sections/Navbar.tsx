"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, Bot, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  const navItems = [
    { label: t.navbar.home, href: "#inicio" },
    { label: t.navbar.about, href: "#nosotros" },
    { label: t.navbar.process, href: "#proceso" },
    { label: t.navbar.services, href: "#servicios" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Smart Header: hide when scrolling down, show when scrolling up
      if (currentScrollY <= 50) {
        setVisible(true);
      } else if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        setVisible(false);
        setMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollYRef.current) {
        setVisible(true);
      }

      lastScrollYRef.current = currentScrollY;

      // Active section detector
      const sections = ["inicio", "nosotros", "proceso", "servicios", "contacto"];
      const scrollPosition = currentScrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 px-4 sm:px-6 transition-transform duration-300 ease-in-out ${
        visible ? "translate-y-0" : "-translate-y-[130%] pointer-events-none"
      }`}
    >
      <div className="mx-auto max-w-6xl">
        {/* Floating Capsule Bar */}
        <div
          className={`relative flex items-center justify-between rounded-full border px-4 sm:px-6 py-2.5 backdrop-blur-2xl transition-all duration-300 ${
            scrolled
              ? "border-cyan-500/30 bg-[#070b14]/90 shadow-[0_8px_32px_rgba(0,0,0,0.8)]"
              : "border-cyan-500/20 bg-[#070b14]/80 shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
          }`}
        >
          {/* Logo */}
          <Link href="#inicio" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.25)] group-hover:scale-105 transition-transform">
              <Bot className="h-5 w-5 text-cyan-400" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-michroma text-xs sm:text-sm font-bold tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                  STELLARIS
                </span>
                <Sparkles className="h-3 w-3 text-cyan-400" />
              </div>
              <span className="text-[8px] sm:text-[9px] text-cyan-400/80 font-medium tracking-widest uppercase -mt-0.5">
                DESARROLLO WEB
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[11px] font-bold px-3.5 py-1.5 rounded-full transition-all tracking-wider uppercase ${
                    isActive
                      ? "text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Language Switcher & Contact Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher Capsule */}
            <div className="flex items-center rounded-full bg-slate-900/90 border border-cyan-500/30 p-0.5 text-xs font-mono">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                  lang === "en"
                    ? "bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("es")}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                  lang === "es"
                    ? "bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(0,240,255,0.5)]"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Cambiar a Español"
              >
                ES
              </button>
            </div>

            {/* CTA Button: Contact */}
            <Link
              href="#contacto"
              className="hidden sm:inline-flex items-center justify-center font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full btn-cyan-glow transition-all duration-300 active:scale-95"
            >
              {t.navbar.contactBtn}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-cyan-400" />
              ) : (
                <Menu className="h-5 w-5" />
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
            className="lg:hidden mt-2 mx-auto max-w-6xl rounded-2xl border border-cyan-500/20 bg-[#070b14]/95 p-6 backdrop-blur-2xl shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((link) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-xs font-bold uppercase tracking-wider py-2 px-3 rounded-xl transition-colors ${
                      isActive
                        ? "text-cyan-300 bg-cyan-950/60 border border-cyan-500/30"
                        : "text-slate-300 hover:text-cyan-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Language Switcher in Mobile Drawer */}
              <div className="flex items-center justify-between py-3 border-t border-cyan-500/20">
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-cyan-400" />
                  Language / Idioma:
                </span>
                <div className="flex items-center rounded-full bg-slate-900 border border-cyan-500/30 p-0.5 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setLang("en")}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      lang === "en"
                        ? "bg-cyan-500 text-slate-950 font-extrabold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    English (EN)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang("es")}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      lang === "es"
                        ? "bg-cyan-500 text-slate-950 font-extrabold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Español (ES)
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-cyan-500/20">
                <Link
                  href="#contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex w-full items-center justify-center font-bold text-xs uppercase tracking-wider py-3 rounded-full btn-cyan-glow text-center"
                >
                  {t.navbar.contactBtn}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
