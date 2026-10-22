"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, Globe } from "lucide-react";
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
    { label: t.navbar.services, href: "#servicios" },
    { label: t.navbar.projects, href: "#proyectos" },
    { label: t.navbar.process, href: "#proceso" },
    { label: t.navbar.pricing, href: "#precios" },
    { label: t.navbar.faq, href: "#faq" },
    { label: t.navbar.contact, href: "#contacto" },
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
      const sectionIds = ["inicio", "servicios", "proyectos", "proceso", "precios", "faq", "contacto"];
      const scrollPosition = currentScrollY + 220;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full pointer-events-none"
      } ${
        scrolled
          ? "bg-[#0a0f1d]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-xl shadow-black/30 py-3"
          : "bg-[#0a0f1d]/60 backdrop-blur-md py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo with Golden Star */}
          <Link href="#inicio" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all duration-300 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
              <Sparkles className="h-5 w-5 fill-amber-400/30 group-hover:fill-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-michroma text-sm sm:text-base font-bold tracking-wider text-white group-hover:text-amber-400 transition-colors">
                STELLARIS<span className="text-amber-400">.DEV</span>
              </span>
              <span className="text-[9px] text-slate-400 font-semibold tracking-widest uppercase -mt-0.5">
                WEB STUDIO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[12px] font-semibold px-3 py-1.5 rounded-full transition-all tracking-wide uppercase ${
                    isActive
                      ? "text-amber-400 bg-amber-400/10 border border-amber-400/30 shadow-[0_0_12px_rgba(251,191,36,0.15)]"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Language Switcher & Amber CTA Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Language Switcher Capsule */}
            <div className="flex items-center rounded-full bg-slate-900/90 border border-slate-800 p-0.5 text-xs font-mono">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  lang === "en"
                    ? "bg-amber-400 text-slate-950 shadow-[0_0_10px_rgba(251,191,36,0.4)]"
                    : "text-slate-400 hover:text-white"
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
                    ? "bg-amber-400 text-slate-950 shadow-[0_0_10px_rgba(251,191,36,0.4)]"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Cambiar a Español"
              >
                ES
              </button>
            </div>

            {/* CTA Button: Start Project */}
            <Link
              href="#contacto"
              className="hidden sm:inline-flex items-center justify-center font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full btn-amber-glow"
            >
              {t.navbar.ctaBtn}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-amber-400" />
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
            className="lg:hidden mx-4 mt-2 rounded-2xl border border-slate-800 bg-[#0a0f1d]/98 p-6 backdrop-blur-2xl shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((link) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-xs font-bold uppercase tracking-wider py-2.5 px-3 rounded-xl transition-colors ${
                      isActive
                        ? "text-amber-400 bg-amber-400/10 border border-amber-400/20"
                        : "text-slate-300 hover:text-amber-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-3 mt-1 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                  <Globe className="h-3.5 w-3.5 text-amber-400" />
                  Idioma / Language:
                </span>
                <div className="flex items-center rounded-full bg-slate-900 border border-slate-800 p-0.5 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setLang("en")}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      lang === "en"
                        ? "bg-amber-400 text-slate-950 font-extrabold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang("es")}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      lang === "es"
                        ? "bg-amber-400 text-slate-950 font-extrabold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    ES
                  </button>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  href="#contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex w-full items-center justify-center font-bold text-xs uppercase tracking-wider py-3 rounded-full btn-amber-glow text-center"
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
