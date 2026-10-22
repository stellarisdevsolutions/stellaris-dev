"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function FeatureMobile() {
  const { lang } = useLanguage();

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 py-20 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
      {/* Left Devices SVG Illustration exactly from reference */}
      <div className="flex justify-center order-2 lg:order-1">
        <svg
          viewBox="0 0 520 340"
          width="100%"
          className="max-w-[540px] select-none"
          role="img"
          aria-label="Ilustración de un sitio web en computadora, tablet y celular"
        >
          {/* Laptop Base & Screen */}
          <rect x="20" y="20" width="360" height="226" rx="14" fill="#0B1020" />
          <rect x="34" y="34" width="332" height="198" rx="8" fill="#121A33" />
          <rect x="52" y="56" width="150" height="16" rx="8" fill="#8B5CF6" />
          <rect x="52" y="86" width="210" height="9" rx="4" fill="#2A3560" />
          <rect x="52" y="104" width="160" height="9" rx="4" fill="#2A3560" />
          <rect x="52" y="130" width="84" height="26" rx="13" fill="#8FA2FF" />
          <rect x="52" y="172" width="92" height="46" rx="8" fill="#1B2547" />
          <rect x="154" y="172" width="92" height="46" rx="8" fill="#1B2547" />
          <rect x="256" y="172" width="92" height="46" rx="8" fill="#1B2547" />
          <path d="M4 262h392l-14 16H18z" fill="#C9D0EA" />

          {/* Tablet in Center */}
          <rect x="300" y="110" width="130" height="190" rx="16" fill="#0B1020" />
          <rect x="310" y="122" width="110" height="166" rx="8" fill="#FFFFFF" />
          <rect x="322" y="136" width="64" height="10" rx="5" fill="#0B1020" />
          <rect x="322" y="154" width="86" height="6" rx="3" fill="#C9D0EA" />
          <rect x="322" y="168" width="40" height="18" rx="9" fill="#8B5CF6" />
          <rect x="322" y="200" width="86" height="34" rx="6" fill="#DDE3FF" />
          <rect x="322" y="244" width="86" height="34" rx="6" fill="#DDE3FF" />

          {/* Smartphone on Right */}
          <rect x="400" y="150" width="104" height="170" rx="18" fill="#0B1020" stroke="#F4F6FB" strokeWidth="5" />
          <rect x="412" y="172" width="80" height="126" rx="6" fill="#121A33" />
          <rect x="422" y="184" width="46" height="8" rx="4" fill="#8B5CF6" />
          <rect x="422" y="200" width="60" height="5" rx="3" fill="#2A3560" />
          <rect x="422" y="212" width="30" height="14" rx="7" fill="#8FA2FF" />
          <rect x="422" y="238" width="60" height="22" rx="5" fill="#1B2547" />
        </svg>
      </div>

      {/* Right Text */}
      <div className="flex flex-col gap-6 items-start text-left order-1 lg:order-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-[2px] uppercase bg-[#E8EEF9] text-[#222E54] border border-[#D5DFEE]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_6px_rgba(139,92,246,0.6)]" />
          100% RESPONSIVE
        </div>
        <h2 className="hd text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.1] tracking-[-1px] text-[#0B1020] m-0">
          {lang === "es" ? "Diseños aptos para " : "Mobile-first "}
          <span className="highlight-badge">
            {lang === "es" ? "celulares" : "experience"}
          </span>
        </h2>
        <p className="m-0 text-[#4A5373] text-base sm:text-[17px] leading-[1.6]">
          {lang === "es"
            ? "Tu sitio se ve y funciona perfecto en cualquier pantalla: celular, tablet o computadora."
            : "Your website looks and performs flawlessly on any screen: smartphone, tablet, or desktop."}
        </p>
        <div className="flex flex-col gap-3 text-base text-[#4A5373]">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#0B1020] text-[#8B5CF6] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
            <span>{lang === "es" ? "Adaptado a cualquier tamaño de pantalla" : "Smooth adaptation across any viewport"}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#0B1020] text-[#8B5CF6] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
            <span>{lang === "es" ? "Botones y textos fáciles de usar con el dedo" : "Thumb-friendly tap targets and typography"}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#0B1020] text-[#8B5CF6] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
            <span>{lang === "es" ? "Carga rápida incluso con datos móviles" : "Ultra-fast load times even on mobile data"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
