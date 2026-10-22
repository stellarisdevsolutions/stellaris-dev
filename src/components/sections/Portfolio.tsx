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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-[2px] uppercase bg-[#EBEBEF] text-[#171717] border border-[#DDDDE2]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
          {lang === "es" ? "NUESTRO TRABAJO" : "OUR WORK"}
        </div>
        <h2 className="hd text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.1] tracking-[-1px] text-[#171717]">
          {lang === "es" ? "Proyectos " : "Recent "}
          <span className="highlight-badge">
            {lang === "es" ? "recientes" : "projects"}
          </span>
        </h2>
      </div>

      {/* Grid of 4 Projects with Solar/Carbon Mockups */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {/* Project 1: Dark UI */}
        <Link
          href="#contacto"
          className="lt rounded-[20px] overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300"
        >
          <div className="h-[170px] bg-[#171717] p-6 box-border flex flex-col justify-start">
            <div className="h-3 w-[60%] rounded-[6px] bg-[#FF6A00] mb-3 group-hover:w-[70%] transition-all" />
            <div className="h-2 w-[85%] rounded-[4px] bg-[#2E2E2E] mb-2" />
            <div className="h-2 w-[50%] rounded-[4px] bg-[#2E2E2E]" />
          </div>
          <div className="p-5">
            <div className="hd text-[18px] font-medium text-[#171717] group-hover:text-[#FF6A00] transition-colors">
              Nexus Corporate
            </div>
            <div className="text-[14px] text-[#666666] mt-1">
              {lang === "es" ? "Sitio corporativo" : "Corporate Website"}
            </div>
          </div>
        </Link>

        {/* Project 2: Yellow/Orange Bento UI */}
        <Link
          href="#contacto"
          className="lt rounded-[20px] overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300"
        >
          <div className="h-[170px] bg-gradient-to-br from-[#FF6A00] to-[#FFC928] p-6 box-border grid grid-cols-2 gap-2.5">
            <div className="rounded-xl bg-[#171717] group-hover:scale-95 transition-transform" />
            <div className="rounded-xl bg-white group-hover:scale-105 transition-transform" />
            <div className="rounded-xl bg-white group-hover:scale-105 transition-transform" />
            <div className="rounded-xl bg-[#171717] group-hover:scale-95 transition-transform" />
          </div>
          <div className="p-5">
            <div className="hd text-[18px] font-medium text-[#171717] group-hover:text-[#FF6A00] transition-colors">
              Aura Fashion Store
            </div>
            <div className="text-[14px] text-[#666666] mt-1">
              {lang === "es" ? "Tienda online" : "Online Store"}
            </div>
          </div>
        </Link>

        {/* Project 3: Minimal Light Tech */}
        <Link
          href="#contacto"
          className="lt rounded-[20px] overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300"
        >
          <div className="h-[170px] bg-[#EBEBEF] p-6 box-border flex flex-col justify-between">
            <div>
              <div className="h-3 w-[55%] rounded-[6px] bg-[#171717] mb-3" />
              <div className="h-2 w-[80%] rounded-[4px] bg-[#C5C5CD]" />
            </div>
            <div className="h-[30px] w-[90px] rounded-full bg-[#171717] group-hover:bg-[#FF6A00] transition-colors" />
          </div>
          <div className="p-5">
            <div className="hd text-[18px] font-medium text-[#171717] group-hover:text-[#FF6A00] transition-colors">
              Vanguard Living
            </div>
            <div className="text-[14px] text-[#666666] mt-1">
              {lang === "es" ? "Landing page" : "Landing Page"}
            </div>
          </div>
        </Link>

        {/* Project 4: Chart Bar UI with Red & Orange */}
        <Link
          href="#contacto"
          className="lt rounded-[20px] overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300"
        >
          <div className="h-[170px] bg-[#171717] p-6 box-border flex items-end gap-2.5">
            <div className="w-[18%] h-[40%] rounded-[6px] bg-[#2E2E2E]" />
            <div className="w-[18%] h-[60%] rounded-[6px] bg-[#EF3340] shadow-[0_0_10px_rgba(239,51,64,0.4)]" />
            <div className="w-[18%] h-[50%] rounded-[6px] bg-[#2E2E2E]" />
            <div className="w-[18%] h-[85%] rounded-[6px] bg-[#FF6A00] shadow-[0_0_12px_rgba(255,106,0,0.5)]" />
          </div>
          <div className="p-5">
            <div className="hd text-[18px] font-medium text-[#171717] group-hover:text-[#FF6A00] transition-colors">
              Kroma Analytics
            </div>
            <div className="text-[14px] text-[#666666] mt-1">
              {lang === "es" ? "App web & Dashboard" : "Web App & Dashboard"}
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
