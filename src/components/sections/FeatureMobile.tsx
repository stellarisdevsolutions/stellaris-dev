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
          <rect x="20" y="20" width="360" height="226" rx="14" fill="#0C4651" />
          <rect x="34" y="34" width="332" height="198" rx="8" fill="#08343D" />
          <rect x="52" y="56" width="150" height="16" rx="8" fill="#E6FF2A" />
          <rect x="52" y="86" width="210" height="9" rx="4" fill="#145C6A" />
          <rect x="52" y="104" width="160" height="9" rx="4" fill="#145C6A" />
          <rect x="52" y="130" width="84" height="26" rx="13" fill="#E6FF2A" />
          <rect x="52" y="172" width="92" height="46" rx="8" fill="#0A3942" />
          <rect x="154" y="172" width="92" height="46" rx="8" fill="#0A3942" />
          <rect x="256" y="172" width="92" height="46" rx="8" fill="#0A3942" />
          <path d="M4 262h392l-14 16H18z" fill="#D1E5E8" />

          {/* Tablet in Center */}
          <rect x="300" y="110" width="130" height="190" rx="16" fill="#0C4651" />
          <rect x="310" y="122" width="110" height="166" rx="8" fill="#FFFFFF" />
          <rect x="322" y="136" width="64" height="10" rx="5" fill="#0C4651" />
          <rect x="322" y="154" width="86" height="6" rx="3" fill="#D1E5E8" />
          <rect x="322" y="168" width="40" height="18" rx="9" fill="#E6FF2A" />
          <rect x="322" y="200" width="86" height="34" rx="6" fill="#F0F7F8" />
          <rect x="322" y="244" width="86" height="34" rx="6" fill="#F0F7F8" />

          {/* Smartphone on Right */}
          <rect x="400" y="150" width="104" height="170" rx="18" fill="#0C4651" stroke="#FFFFFF" strokeWidth="5" />
          <rect x="412" y="172" width="80" height="126" rx="6" fill="#08343D" />
          <rect x="422" y="184" width="46" height="8" rx="4" fill="#E6FF2A" />
          <rect x="422" y="200" width="60" height="5" rx="3" fill="#145C6A" />
          <rect x="422" y="212" width="30" height="14" rx="7" fill="#E6FF2A" />
          <rect x="422" y="238" width="60" height="22" rx="5" fill="#0A3942" />
        </svg>
      </div>

      {/* Right Text */}
      <div className="flex flex-col gap-5 items-start text-left order-1 lg:order-2">
        {/* Etiqueta superior */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-[2px] uppercase bg-[#0C4651]/5 text-[#0C4651] border border-[#0C4651]/10 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0C4651]" />
          100% RESPONSIVE
        </div>

        <h2 className="hd text-3xl sm:text-5xl lg:text-[54px] font-bold leading-[1.08] tracking-[-1.5px] text-[#0C4651] m-0">
          {lang === "es" ? "Diseños " : "Responsive "}
          <span className="inline-block relative text-[#0C4651] bg-[#E6FF2A] px-3 sm:px-4 py-0.5 rounded-xl shadow-sm shadow-[#E6FF2A]/30 -rotate-1 mx-1 border border-[#0C4651]/20">
            {lang === "es" ? "responsivos" : "designs"}
          </span>
        </h2>

        <p className="m-0 text-neutral-600 text-base sm:text-lg leading-relaxed max-w-[520px]">
          {lang === "es"
            ? "Tu sitio se ve bien y funciona igual de fácil en computadora, tableta y celular. Tus clientes compran y te contactan desde donde estén."
            : "Your website looks great and works effortlessly on desktop, tablet, and mobile. Customers purchase and contact you wherever they are."}
        </p>

        {/* 3 Puntos con Check */}
        <div className="flex flex-col gap-4 mt-2">
          {/* Point 1 */}
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-[#0C4651] text-[#E6FF2A] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm shadow-[#0C4651]/20">
              ✓
            </span>
            <div className="flex flex-col gap-0.5">
              <h3 className="hd text-lg sm:text-xl font-bold text-[#0C4651] m-0">
                {lang === "es" ? "Se adapta a cualquier pantalla" : "Adapts to any screen"}
              </h3>
              <p className="text-sm sm:text-[15px] text-neutral-600 leading-relaxed m-0">
                {lang === "es"
                  ? "Cada sección se reorganiza según el tamaño del dispositivo."
                  : "Every section intelligently reorganizes to fit the device viewport."}
              </p>
            </div>
          </div>

          {/* Point 2 */}
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-[#0C4651] text-[#E6FF2A] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm shadow-[#0C4651]/20">
              ✓
            </span>
            <div className="flex flex-col gap-0.5">
              <h3 className="hd text-lg sm:text-xl font-bold text-[#0C4651] m-0">
                {lang === "es" ? "Carga rápida" : "Fast loading"}
              </h3>
              <p className="text-sm sm:text-[15px] text-neutral-600 leading-relaxed m-0">
                {lang === "es"
                  ? "Código ligero para que nadie se vaya esperando."
                  : "Lightweight code so visitors never leave while waiting."}
              </p>
            </div>
          </div>

          {/* Point 3 */}
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-[#0C4651] text-[#E6FF2A] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm shadow-[#0C4651]/20">
              ✓
            </span>
            <div className="flex flex-col gap-0.5">
              <h3 className="hd text-lg sm:text-xl font-bold text-[#0C4651] m-0">
                {lang === "es" ? "Listo para móviles" : "Mobile ready"}
              </h3>
              <p className="text-sm sm:text-[15px] text-neutral-600 leading-relaxed m-0">
                {lang === "es"
                  ? "Botones y textos pensados para usarse con el dedo."
                  : "Buttons and typography engineered for effortless thumb tapping."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
