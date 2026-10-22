"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="w-full bg-[#171717] text-[#F5F5F7] rounded-t-[48px] sm:rounded-t-[56px] overflow-hidden mt-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-[#2E2E2E]">
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 pt-14 pb-10 flex flex-col gap-8">
        {/* Top row */}
        <div className="flex justify-between items-center flex-wrap gap-5">
          <Link href="#inicio" className="hd flex items-center gap-2.5 font-bold text-[22px] text-[#F5F5F7] group">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFC928"
              strokeWidth="1.8"
              strokeLinejoin="round"
              className="group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(255,201,40,0.4)]"
              aria-hidden="true"
            >
              <path d="M12 2l2.6 6.4L21 9.3l-5 4.4 1.5 6.6L12 16.8 6.5 20.3 8 13.7 3 9.3l6.4-.9z" />
            </svg>
            <span>Stellaris Dev</span>
          </Link>

          <div className="flex gap-7 text-[15px] flex-wrap">
            <Link href="#servicios" className="text-[#F5F5F7] hover:text-[#FF6A00] transition-colors">
              {t.navbar.services}
            </Link>
            <Link href="#proyectos" className="text-[#F5F5F7] hover:text-[#FF6A00] transition-colors">
              {t.navbar.projects}
            </Link>
            <Link href="#proceso" className="text-[#F5F5F7] hover:text-[#FF6A00] transition-colors">
              {t.navbar.process}
            </Link>
            <Link href="#precios" className="text-[#F5F5F7] hover:text-[#FF6A00] transition-colors">
              {t.navbar.pricing}
            </Link>
            <Link href="#contacto" className="text-[#F5F5F7] hover:text-[#FF6A00] transition-colors">
              {t.navbar.contact}
            </Link>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 border-t border-[#2E2E2E] flex justify-between flex-wrap gap-3 text-[#A3A3A3] text-[14px]">
          <div>© {new Date().getFullYear()} Stellaris Dev Solutions</div>
          <div className="flex items-center gap-4">
            <a href="https://wa.me/59169991245" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6A00] transition-colors">
              WhatsApp (+591 69991245)
            </a>
            <span>·</span>
            <a href="mailto:stellarisdev.us@gmail.com" className="hover:text-[#FF6A00] transition-colors">
              stellarisdev.us@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
