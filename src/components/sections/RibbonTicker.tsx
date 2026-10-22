"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function RibbonTicker() {
  const { lang } = useLanguage();

  const words =
    lang === "es"
      ? ["Diseñar", "Desarrollar", "Lanzar", "Crecer"]
      : ["Design", "Develop", "Launch", "Scale"];

  // Duplicate for smooth continuous marquee
  const loop = [...words, ...words, ...words, ...words, ...words, ...words];

  return (
    <div className="relative w-full overflow-hidden mb-24 select-none">
      <div
        className="hd bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#00F0FF] text-[#0B1020] py-4.5 sm:py-5 flex items-center justify-center -rotate-[1.5deg] -mx-10 scale-105 shadow-[0_10px_30px_rgba(0,240,255,0.25)] border-y border-[#00F0FF]/60"
      >
        <div className="animate-ribbon flex items-center gap-7">
          {loop.map((w, idx) => (
            <React.Fragment key={idx}>
              <span className="text-2xl sm:text-[28px] font-bold tracking-tight">
                {w}
              </span>
              <span className="text-2xl sm:text-[28px] font-normal opacity-80">
                ✦
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
