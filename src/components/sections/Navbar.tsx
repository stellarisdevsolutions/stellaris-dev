"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["home", "about", "services", "process", "pricing", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  const isLinkActive = (href: string) => {
    if (href === "/marketplace") {
      return pathname.startsWith("/marketplace");
    }
    if (href === "/projects") {
      return pathname.startsWith("/projects");
    }
    if (pathname === "/") {
      if (href === "/#home") return activeSection === "home";
      if (href === "/#about") return activeSection === "about";
      if (href === "/#services") return activeSection === "services";
      if (href === "/#process") return activeSection === "process";
      if (href === "/#pricing") return activeSection === "pricing";
      if (href === "/#contact") return activeSection === "contact";
    }
    return false;
  };

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
      {/* Floating Pill Container con sombra sutil y elegante */}
      <div className="bg-[#0C4651]/95 backdrop-blur-md border border-[#145C6A]/80 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-[0_4px_24px_rgba(12,70,81,0.25)] flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Navigation Links (Todos en mayúsculas) */}
        <nav className="hidden md:flex items-center gap-5 sm:gap-6 text-[12.5px] font-semibold tracking-wider text-slate-200">
          {leftNav.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`transition-colors hover:text-[#E6FF2A] ${
                  active ? "text-[#E6FF2A] font-bold" : "text-slate-200"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Center Brand Logo with Circular Badge */}
        <Link
          href="/#home"
          className="hd flex items-center gap-2.5 font-bold text-[17px] sm:text-[19px] text-white tracking-tight group"
        >
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-[#08343D] ring-1 ring-[#145C6A] group-hover:scale-105 transition-transform shrink-0 shadow-md">
            <Image
              src="/logo.webp"
              alt="Kano Dev Logo"
              width={32}
              height={32}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <span>Kano<span className="text-[#E6FF2A]">.dev</span></span>
        </Link>

        {/* Right Nav Links & Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <nav className="hidden md:flex items-center gap-5 text-[12.5px] font-semibold tracking-wider text-slate-200">
            {rightNav.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`transition-colors hover:text-[#E6FF2A] ${
                    active ? "text-[#E6FF2A] font-bold" : "text-slate-200"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Language Switcher Pill */}
          <div className="flex items-center rounded-full bg-[#08343D] border border-[#145C6A] p-0.5 text-xs font-mono">
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                lang === "en"
                  ? "bg-[#E6FF2A] text-[#0C4651] shadow-xs"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang("es")}
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                lang === "es"
                  ? "bg-[#E6FF2A] text-[#0C4651] shadow-xs"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              ES
            </button>
          </div>

          {/* CTA: Botón de Contacto */}
          <Link
            href="/#contact"
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#E6FF2A] hover:bg-[#d8f219] text-[#0C4651] text-[12.5px] font-extrabold tracking-wider uppercase px-4 py-1.5 rounded-full shadow-md shadow-[#E6FF2A]/20 transition-all hover:scale-105 font-mono"
          >
            <span>{lang === "es" ? "CONTACTO" : "CONTACT"}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-200 hover:text-white rounded-full hover:bg-[#08343D] transition-colors"
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
            className="md:hidden mt-3 rounded-3xl border border-[#145C6A] bg-[#0C4651]/98 p-6 backdrop-blur-2xl shadow-2xl text-white"
          >
            <div className="flex flex-col gap-3.5">
              {allNavItems.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-semibold tracking-wider py-1 transition-colors ${
                      active
                        ? "text-[#E6FF2A] font-bold"
                        : "text-slate-200 hover:text-[#E6FF2A]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-3 border-t border-[#145C6A] flex items-center justify-between">
                <span className="text-xs text-slate-300">
                  Idioma / Language
                </span>
                <div className="flex items-center rounded-full bg-[#08343D] border border-[#145C6A] p-0.5 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setLang("en")}
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      lang === "en" ? "bg-[#E6FF2A] text-[#0C4651]" : "text-slate-300"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang("es")}
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      lang === "es" ? "bg-[#E6FF2A] text-[#0C4651]" : "text-slate-300"
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
                  className="w-full text-center py-3 bg-[#E6FF2A] hover:bg-[#d8f219] text-[#0C4651] font-extrabold tracking-wider uppercase text-sm rounded-full shadow-lg block font-mono"
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
