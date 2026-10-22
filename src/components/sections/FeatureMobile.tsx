"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function FeatureMobile() {
  const { lang } = useLanguage();

  return (
    <section className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 py-20 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center bg-white">
      {/* Left Devices SVG Illustration */}
      <div className="flex justify-center order-2 lg:order-1">
        <svg
          viewBox="0 0 520 340"
          width="100%"
          className="max-w-[540px] select-none"
          role="img"
          aria-label="Responsive devices"
        >
          {/* Laptop Base & Screen */}
          <rect x="20" y="20" width="360" height="226" rx="14" fill="#171717" />
          <rect x="34" y="34" width="332" height="198" rx="8" fill="#242427" />
          <rect x="52" y="56" width="150" height="16" rx="8" fill="#FF532A" />
          <rect x="52" y="86" width="210" height="9" rx="4" fill="#3A3A40" />
          <rect x="52" y="104" width="160" height="9" rx="4" fill="#3A3A40" />
          <rect x="52" y="130" width="84" height="26" rx="13" fill="#FF532A" />
          <rect x="52" y="172" width="92" height="46" rx="8" fill="#1C1C1F" />
          <rect x="154" y="172" width="92" height="46" rx="8" fill="#1C1C1F" />
          <rect x="256" y="172" width="92" height="46" rx="8" fill="#1C1C1F" />
          <path d="M4 262h392l-14 16H18z" fill="#D4D4D8" />

          {/* Tablet in Center */}
          <rect x="300" y="110" width="130" height="190" rx="16" fill="#171717" />
          <rect x="310" y="122" width="110" height="166" rx="8" fill="#FFFFFF" />
          <rect x="322" y="136" width="64" height="10" rx="5" fill="#171717" />
          <rect x="322" y="154" width="86" height="6" rx="3" fill="#D4D4D8" />
          <rect x="322" y="168" width="40" height="18" rx="9" fill="#FF532A" />
          <rect x="322" y="200" width="86" height="34" rx="6" fill="#F4F4F5" />
          <rect x="322" y="244" width="86" height="34" rx="6" fill="#F4F4F5" />

          {/* Smartphone on Right */}
          <rect x="400" y="150" width="104" height="170" rx="18" fill="#171717" stroke="#FFFFFF" strokeWidth="5" />
          <rect x="412" y="172" width="80" height="126" rx="6" fill="#242427" />
          <rect x="422" y="184" width="46" height="8" rx="4" fill="#FF532A" />
          <rect x="422" y="200" width="60" height="5" rx="3" fill="#3A3A40" />
          <rect x="422" y="212" width="30" height="14" rx="7" fill="#FF532A" />
          <rect x="422" y="238" width="60" height="22" rx="5" fill="#1C1C1F" />
        </svg>
      </div>

      {/* Right Text */}
      <div className="flex flex-col gap-6 items-start text-left order-1 lg:order-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-[2px] uppercase bg-neutral-100 text-neutral-700">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF532A]" />
          100% RESPONSIVE
        </div>
        <h2 className="hd text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.1] tracking-[-1px] text-[#171717] m-0">
          {lang === "es" ? "Diseños optimizados para " : "Flawless on "}
          <span className="text-[#FF532A]">
            {lang === "es" ? "celulares" : "mobile devices"}
          </span>
        </h2>
        <p className="m-0 text-neutral-600 text-base sm:text-[17px] leading-[1.6]">
          {lang === "es"
            ? "Más del 80% de tus clientes navegarán desde su teléfono. Tu sitio web cargará al instante y se sentirá como una app nativa."
            : "Over 80% of your visitors will browse from a smartphone. Your site will load instantly and feel like a native app."}
        </p>
        <div className="flex flex-col gap-3 text-base text-neutral-700">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#FF532A] text-white flex items-center justify-center text-xs font-bold shrink-0">✓</span>
            <span>{lang === "es" ? "Adaptado a cualquier tamaño de pantalla" : "Adaptive layout across all screens"}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#FF532A] text-white flex items-center justify-center text-xs font-bold shrink-0">✓</span>
            <span>{lang === "es" ? "Botones y textos fáciles de usar con el dedo" : "Thumb-friendly navigation and typography"}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#FF532A] text-white flex items-center justify-center text-xs font-bold shrink-0">✓</span>
            <span>{lang === "es" ? "Carga rápida incluso con datos móviles 4G" : "Instant load times on 4G cellular data"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}