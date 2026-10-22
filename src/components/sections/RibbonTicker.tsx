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
        className="hd bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#6366F1] text-white py-4.5 sm:py-5 flex items-center justify-center -rotate-[1.5deg] -mx-10 scale-105 shadow-[0_10px_30px_rgba(139,92,246,0.35)] border-y border-[#8B5CF6]/60"
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
