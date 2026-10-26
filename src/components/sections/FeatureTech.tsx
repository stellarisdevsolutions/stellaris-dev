"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function FeatureTech() {
  const { lang } = useLanguage();

  return (
    <div className="w-full px-0 sm:px-6 my-0 sm:my-6 bg-white">
      <div className="bg-[#0C4651] text-white rounded-none sm:rounded-[48px] px-6 py-16 sm:py-20 lg:py-24 shadow-2xl border-y sm:border border-[#145C6A]">
        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          {/* Left Text */}
          <div className="flex flex-col gap-6 items-start text-left">
            <div className="border border-[#145C6A] bg-[#08343D] rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#E6FF2A]">
              {lang === "es" ? "✦ Impulsados por IA" : "✦ AI-Powered"}
            </div>

            <h2 className="hd text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.1] tracking-[-1px] text-white m-0">
              {lang === "es" ? "Tecnología de punta, " : "Cutting-edge tech, "}
              <span className="text-[#E6FF2A]">
                {lang === "es" ? "siempre actualizada" : "always up to date"}
              </span>
            </h2>

            <p className="m-0 text-slate-300 text-base sm:text-[17px] leading-[1.6]">
              {lang === "es"
                ? "Usamos inteligencia artificial para prototipar más rápido, escribir código más limpio y mantener tu sitio al día con lo último en desarrollo web."
                : "We leverage artificial intelligence to prototype faster, write cleaner code, and keep your website aligned with the latest web standards."}
            </p>

            <div className="flex flex-col gap-3 text-base text-slate-200">
              <div className="flex items-center gap-2.5">
                <span className="text-[#E6FF2A] text-lg">✦</span>
                <span>{lang === "es" ? "Prototipos y entregas más rápidas" : "Faster delivery and prototype turnaround"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[#E6FF2A] text-lg">✦</span>
                <span>{lang === "es" ? "Código revisado y optimizado" : "Verified, optimized, high-performance code"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[#E6FF2A] text-lg">✦</span>
                <span>{lang === "es" ? "Herramientas y estándares siempre al día" : "Modern standards and libraries always current"}</span>
              </div>
            </div>
          </div>

          {/* Right SVG AI Chip */}
          <div className="flex justify-center">
            <svg
              viewBox="0 0 440 340"
              width="100%"
              className="max-w-[460px] select-none"
              role="img"
              aria-label="Chip AI"
            >
              <g stroke="#145C6A" strokeWidth="2" fill="none">
                <path d="M150 170H40M290 170h110M220 100V30M220 240v70M170 120L90 50M270 120l80-70M170 220l-80 70M270 220l80 70" />
              </g>
              <g fill="#08343D" stroke="#145C6A" strokeWidth="2">
                <circle cx="40" cy="170" r="12" />
                <circle cx="400" cy="170" r="12" />
                <circle cx="220" cy="30" r="12" />
                <circle cx="220" cy="310" r="12" />
                <circle cx="90" cy="50" r="10" />
                <circle cx="350" cy="50" r="10" />
                <circle cx="90" cy="290" r="10" />
                <circle cx="350" cy="290" r="10" />
              </g>
              <rect x="150" y="100" width="140" height="140" rx="28" fill="#08343D" stroke="#E6FF2A" strokeWidth="3" />
              <rect x="172" y="122" width="96" height="96" rx="18" fill="#0A3942" />
              <text x="220" y="190" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontWeight="700" fontSize="46" fill="#E6FF2A">
                AI
              </text>
              <g fill="#E6FF2A">
                <path d="M400 90l5 12 12 5-12 5-5 12-5-12-12-5 12-5z" />
                <path d="M50 250l4 9 9 4-9 4-4 9-4-9-9-4 9-4z" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
