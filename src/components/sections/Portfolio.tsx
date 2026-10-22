"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function Portfolio() {
  const { lang } = useLanguage();

  return (
    <section id="proyectos" className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 pb-24 flex flex-col gap-12">
      {/* Header */}
      <div className="text-center flex flex-col gap-3 items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-[2px] uppercase bg-[#E8EEF9] text-[#222E54] border border-[#D5DFEE]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_6px_rgba(139,92,246,0.6)]" />
          {lang === "es" ? "NUESTRO TRABAJO" : "OUR WORK"}
        </div>
        <h2 className="hd text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.1] tracking-[-1px] text-[#0B1020]">
          {lang === "es" ? "Proyectos " : "Recent "}
          <span className="highlight-badge">
            {lang === "es" ? "recientes" : "projects"}
          </span>
        </h2>
      </div>

      {/* Grid of 4 Projects from reference */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {/* Project 1: Dark UI */}
        <Link
          href="#contacto"
          className="lt rounded-[20px] overflow-hidden flex flex-col group shadow-xs hover:shadow-xl transition-all duration-300"
        >
          <div className="h-[170px] bg-[#0B1020] p-6 box-border flex flex-col justify-start border-b border-[#2A3560]/40">
            <div className="h-3 w-[60%] rounded-[6px] bg-[#8B5CF6] mb-3 group-hover:w-[70%] transition-all shadow-[0_0_10px_rgba(139,92,246,0.4)]" />
            <div className="h-2 w-[85%] rounded-[4px] bg-[#2A3560] mb-2" />
            <div className="h-2 w-[50%] rounded-[4px] bg-[#2A3560]" />
          </div>
          <div className="p-5">
            <div className="hd text-[18px] font-medium text-[#0B1020] group-hover:text-[#8B5CF6] transition-colors">
              Nexus Corporate
            </div>
            <div className="text-[14px] text-[#4A5373] mt-1">
              {lang === "es" ? "Sitio corporativo" : "Corporate Website"}
            </div>
          </div>
        </Link>

        {/* Project 2: Violet Bento UI */}
        <Link
          href="#contacto"
          className="lt rounded-[20px] overflow-hidden flex flex-col group shadow-xs hover:shadow-xl transition-all duration-300"
        >
          <div className="h-[170px] bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] p-6 box-border grid grid-cols-2 gap-2.5">
            <div className="rounded-xl bg-[#0B1020] group-hover:scale-95 transition-transform" />
            <div className="rounded-xl bg-white group-hover:scale-105 transition-transform" />
            <div className="rounded-xl bg-white group-hover:scale-105 transition-transform" />
            <div className="rounded-xl bg-[#0B1020] group-hover:scale-95 transition-transform" />
          </div>
          <div className="p-5">
            <div className="hd text-[18px] font-medium text-[#0B1020] group-hover:text-[#8B5CF6] transition-colors">
              Aura Fashion Store
            </div>
            <div className="text-[14px] text-[#4A5373] mt-1">
              {lang === "es" ? "Tienda online" : "Online Store"}
            </div>
          </div>
        </Link>

        {/* Project 3: Pastel Blue UI */}
        <Link
          href="#contacto"
          className="lt rounded-[20px] overflow-hidden flex flex-col group shadow-xs hover:shadow-xl transition-all duration-300"
        >
          <div className="h-[170px] bg-[#DDE3FF] p-6 box-border flex flex-col justify-between">
            <div>
              <div className="h-3 w-[55%] rounded-[6px] bg-[#0B1020] mb-3" />
              <div className="h-2 w-[80%] rounded-[4px] bg-[#9AA7E8]" />
            </div>
            <div className="h-[30px] w-[90px] rounded-full bg-[#0B1020]" />
          </div>
          <div className="p-5">
            <div className="hd text-[18px] font-medium text-[#0B1020] group-hover:text-[#8B5CF6] transition-colors">
              Vanguard Living
            </div>
            <div className="text-[14px] text-[#4A5373] mt-1">
              {lang === "es" ? "Landing page" : "Landing Page"}
            </div>
          </div>
        </Link>

        {/* Project 4: Chart Bar UI */}
        <Link
          href="#contacto"
          className="lt rounded-[20px] overflow-hidden flex flex-col group shadow-xs hover:shadow-xl transition-all duration-300"
        >
          <div className="h-[170px] bg-[#0B1020] p-6 box-border flex items-end gap-2.5 border-b border-[#2A3560]/40">
            <div className="w-[18%] h-[40%] rounded-[6px] bg-[#2A3560]" />
            <div className="w-[18%] h-[60%] rounded-[6px] bg-[#8FA2FF]" />
            <div className="w-[18%] h-[50%] rounded-[6px] bg-[#2A3560]" />
            <div className="w-[18%] h-[85%] rounded-[6px] bg-[#8B5CF6] shadow-[0_0_12px_rgba(139,92,246,0.6)]" />
          </div>
          <div className="p-5">
            <div className="hd text-[18px] font-medium text-[#0B1020] group-hover:text-[#8B5CF6] transition-colors">
              Kroma Analytics
            </div>
            <div className="text-[14px] text-[#4A5373] mt-1">
              {lang === "es" ? "App web & Dashboard" : "Web App & Dashboard"}
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
