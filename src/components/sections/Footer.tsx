"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { lang } = useLanguage();
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/marketplace") {
      return pathname.startsWith("/marketplace");
    }
    if (href === "/projects") {
      return pathname.startsWith("/projects");
    }
    if (pathname === "/" && href === "/#home") {
      return true;
    }
    return false;
  };

  const navItems = [
    { label: lang === "es" ? "INICIO" : "HOME", href: "/#home" },
    { label: lang === "es" ? "NOSOTROS" : "ABOUT", href: "/#about" },
    { label: lang === "es" ? "SERVICIOS" : "SERVICES", href: "/#services" },
    { label: lang === "es" ? "PROYECTOS" : "PROJECTS", href: "/projects" },
    { label: "MARKETPLACE", href: "/marketplace" },
    { label: lang === "es" ? "PROCESO" : "PROCESS", href: "/#process" },
    { label: lang === "es" ? "PRECIOS" : "PRICING", href: "/#pricing" },
    { label: lang === "es" ? "CONTACTO" : "CONTACT", href: "/#contact" },
  ];

  return (
    <footer className="w-full bg-[#171717] text-white rounded-t-[36px] sm:rounded-t-[48px] overflow-hidden mt-12 border-t border-neutral-800">
      <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 pt-16 pb-12 flex flex-col gap-10">
        {/* Top row */}
        <div className="flex justify-between items-center flex-wrap gap-6">
          <Link href="/#home" className="hd flex items-center gap-2.5 font-bold text-xl sm:text-2xl text-white group">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-black/40 ring-1 ring-white/10 group-hover:scale-105 transition-transform shrink-0 shadow-md shadow-[#FF532A]/20">
              <Image
                src="/logo.webp"
                alt="Stellaris Dev Logo"
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
            <span>Stellaris Dev</span>
          </Link>

          {/* Navigation Links identical in style, order and casing to the Header */}
          <nav className="flex gap-5 sm:gap-7 text-[12.5px] font-semibold tracking-wider flex-wrap items-center">
            {navItems.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors uppercase hover:text-[#FF532A] ${
                    active ? "text-[#FF532A] font-bold" : "text-neutral-300"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
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

          {lang === "es" ? (
            <Link
              href="https://wa.me/59169991245"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FF532A] hover:bg-[#E5451D] text-white font-semibold text-sm px-6 py-3.5 rounded-full shadow-lg shadow-[#FF532A]/30 transition-all hover:scale-105"
            >
              <span>WhatsApp: +591 69991245</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-[#FF532A] hover:bg-[#E5451D] text-white font-semibold text-sm px-6 py-3.5 rounded-full shadow-lg shadow-[#FF532A]/30 transition-all hover:scale-105"
            >
              <span>Contact Us</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Bottom row con enlaces legales */}
        <div className="flex justify-between items-center flex-wrap gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Stellaris Dev Solutions. {lang === "es" ? "Todos los derechos reservados." : "All rights reserved."}
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/privacy-policy" className="hover:text-[#FF532A] transition-colors">
              {lang === "es" ? "Política de Privacidad" : "Privacy Policy"}
            </Link>
            <span>·</span>
            <Link href="/terms-and-conditions" className="hover:text-[#FF532A] transition-colors">
              {lang === "es" ? "Términos y Condiciones" : "Terms & Conditions"}
            </Link>
            <span>·</span>
            <a href="mailto:contact@tiendastellaris.com" className="hover:text-white transition-colors">
              contact@tiendastellaris.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
