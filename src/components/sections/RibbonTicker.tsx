"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function RibbonTicker() {
  const { lang } = useLanguage();

  const words =
    lang === "es"
      ? [
          "Diseño Web",
          "Next.js 16",
          "Tiendas Online",
          "Landing Pages",
          "UI/UX Design",
          "E-Commerce",
          "Optimización SEO",
        ]
      : [
          "Web Design",
          "Next.js 16",
          "Online Stores",
          "Landing Pages",
          "UI/UX Design",
          "E-Commerce",
          "SEO Optimization",
        ];

  const loop = [...words, ...words, ...words, ...words];

  return (
    <div className="relative w-full overflow-hidden my-12 sm:my-16 select-none bg-white">
      <div className="hd bg-[#E6FF2A] text-[#0C4651] py-4 sm:py-4.5 flex items-center justify-center shadow-md border-y border-[#145C6A]/20">
        <div className="animate-ribbon flex items-center gap-8 sm:gap-10">
          {loop.map((w, idx) => (
            <React.Fragment key={idx}>
              <span className="text-lg sm:text-xl font-bold tracking-tight uppercase">
                {w}
              </span>
              <span className="text-lg sm:text-xl font-bold text-[#0C4651]/60">
                +
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}