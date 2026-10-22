"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function FeatureTech() {
  const { lang } = useLanguage();

  return (
    <div className="w-full px-4 sm:px-6 mb-6">
      <div className="bg-[#0B1020] text-[#E8ECF8] rounded-[48px] sm:rounded-[56px] py-16 sm:py-20 lg:py-24 shadow-2xl shadow-[#0B1020]/25 border border-[#2A3560]/40">
        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          {/* Left Text */}
          <div className="flex flex-col gap-6 items-start text-left">
            <div className="border border-[#2A3560] rounded-full px-4 py-2 text-[13px] text-[#A9B3CF]">
              {lang === "es" ? "Impulsados por IA" : "AI-Powered"}
            </div>

            <h2 className="hd text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.1] tracking-[-1px] text-[#E8ECF8] m-0">
              {lang === "es" ? "Tecnología de punta, " : "Cutting-edge tech, "}
              <span className="text-[#FFC857]">
                {lang === "es" ? "siempre actualizada" : "always up to date"}
              </span>
            </h2>

            <p className="m-0 text-[#A9B3CF] text-base sm:text-[17px] leading-[1.6]">
              {lang === "es"
                ? "Usamos inteligencia artificial para prototipar más rápido, escribir código más limpio y mantener tu sitio al día con lo último en desarrollo web."
                : "We leverage artificial intelligence to prototype faster, write cleaner code, and keep your website aligned with the latest web standards."}
            </p>

            <div className="flex flex-col gap-3 text-base text-[#E8ECF8]">
              <div className="flex items-center gap-2.5">
                <span className="text-[#FFC857] text-lg">✦</span>
                <span>{lang === "es" ? "Prototipos y entregas más rápidas" : "Faster delivery and prototype turnaround"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[#FFC857] text-lg">✦</span>
                <span>{lang === "es" ? "Código revisado y optimizado" : "Verified, optimized, high-performance code"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[#FFC857] text-lg">✦</span>
                <span>{lang === "es" ? "Herramientas y estándares siempre al día" : "Modern standards and libraries always current"}</span>
              </div>
            </div>
          </div>

          {/* Right SVG AI Chip exactly matching reference */}
          <div className="flex justify-center">
            <svg
              viewBox="0 0 440 340"
              width="100%"
              className="max-w-[460px] select-none"
              role="img"
              aria-label="Ilustración de un chip de inteligencia artificial conectado"
            >
              {/* Lines */}
              <g stroke="#2A3560" strokeWidth="2" fill="none">
                <path d="M150 170H40M290 170h110M220 100V30M220 240v70M170 120L90 50M270 120l80-70M170 220l-80 70M270 220l80 70" />
              </g>

              {/* Outer Circles */}
              <g fill="#121A33" stroke="#3A4678" strokeWidth="2">
                <circle cx="40" cy="170" r="12" />
                <circle cx="400" cy="170" r="12" />
                <circle cx="220" cy="30" r="12" />
                <circle cx="220" cy="310" r="12" />
                <circle cx="90" cy="50" r="10" />
                <circle cx="350" cy="50" r="10" />
                <circle cx="90" cy="290" r="10" />
                <circle cx="350" cy="290" r="10" />
              </g>

              {/* Central AI Card */}
              <rect x="150" y="100" width="140" height="140" rx="28" fill="#121A33" stroke="#FFC857" strokeWidth="3" />
              <rect x="172" y="122" width="96" height="96" rx="18" fill="#1B2547" />
              <text x="220" y="190" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="46" fill="#FFC857">
                AI
              </text>

              {/* Stars */}
              <g fill="#8FA2FF">
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
