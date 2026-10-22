"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function Process() {
  const { lang } = useLanguage();

  return (
    <div id="proceso" className="w-full px-4 sm:px-6">
      <div className="bg-[#0B1020] text-[#E8ECF8] rounded-[48px] sm:rounded-[56px] py-20 sm:py-24 shadow-2xl shadow-[#0B1020]/25 border border-[#2A3560]/40">
        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 flex flex-col gap-14">
          {/* Header */}
          <div className="text-center flex flex-col gap-3 items-center">
            <div className="text-[14px] font-medium tracking-[2px] text-[#A9B3CF] uppercase">
              {lang === "es" ? "PROCESO" : "WORKFLOW"}
            </div>
            <h2 className="hd text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.1] tracking-[-1px] text-[#E8ECF8] m-0">
              {lang === "es" ? "Cómo " : "How we "}
              <span className="text-[#A78BFA] drop-shadow-[0_0_15px_rgba(167,139,250,0.4)]">
                {lang === "es" ? "trabajamos" : "work"}
              </span>
            </h2>
          </div>

          {/* 4 Steps with Connector Lines and Violet Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {/* Step 1 */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="hd w-[52px] h-[52px] rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] text-white font-bold text-[22px] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                  1
                </div>
                <div className="flex-1 h-[2px] bg-[#2A3560] hidden sm:block" />
              </div>
              <h3 className="hd text-[22px] font-bold text-white m-0">
                {lang === "es" ? "Contacto y plan" : "Contact & Plan"}
              </h3>
              <p className="text-[#A9B3CF] leading-[1.6] text-[15px] m-0">
                {lang === "es"
                  ? "Hablamos de tu idea, definimos objetivos y armamos el plan del proyecto."
                  : "We explore your goals, define scope, and prepare a fixed roadmap."}
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="hd w-[52px] h-[52px] rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] text-white font-bold text-[22px] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                  2
                </div>
                <div className="flex-1 h-[2px] bg-[#2A3560] hidden sm:block" />
              </div>
              <h3 className="hd text-[22px] font-bold text-white m-0">
                {lang === "es" ? "Diseño y prototipo" : "Design & Prototype"}
              </h3>
              <p className="text-[#A9B3CF] leading-[1.6] text-[15px] m-0">
                {lang === "es"
                  ? "Creamos el diseño y un prototipo para que lo veas y apruebes antes de programar."
                  : "We design a high-fidelity mockup so you review and approve every visual detail first."}
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="hd w-[52px] h-[52px] rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] text-white font-bold text-[22px] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                  3
                </div>
                <div className="flex-1 h-[2px] bg-[#2A3560] hidden sm:block" />
              </div>
              <h3 className="hd text-[22px] font-bold text-white m-0">
                {lang === "es" ? "Construimos" : "Development"}
              </h3>
              <p className="text-[#A9B3CF] leading-[1.6] text-[15px] m-0">
                {lang === "es"
                  ? "Desarrollamos tu sitio con código limpio, rápido y adaptado a celulares."
                  : "We build clean, ultra-fast pages fully optimized for mobile devices."}
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="hd w-[52px] h-[52px] rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] text-white font-bold text-[22px] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                  4
                </div>
              </div>
              <h3 className="hd text-[22px] font-bold text-white m-0">
                {lang === "es" ? "Despliegue" : "Launch & Support"}
              </h3>
              <p className="text-[#A9B3CF] leading-[1.6] text-[15px] m-0">
                {lang === "es"
                  ? "Publicamos tu web, la probamos y te acompañamos después del lanzamiento."
                  : "We launch your live site with SSL security and provide continuous post-launch support."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
