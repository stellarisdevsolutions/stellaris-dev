"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const TECHS = [
  "Next.js 16",
  "React 19",
  "Tailwind CSS",
  "TypeScript",
  "Node.js",
  "Shopify",
  "WordPress",
  "Figma",
  "Google Cloud",
  "Vercel",
];

export function TechStack() {
  const { lang } = useLanguage();

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 py-10 flex flex-col items-center gap-5 text-center bg-white">
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-[2px] uppercase bg-neutral-100 text-neutral-700">
        <span className="w-1.5 h-1.5 rounded-full bg-[#0C4651]" />
        {lang === "es" ? "TECNOLOGÍAS QUE DOMINAMOS" : "TECHNOLOGIES WE MASTER"}
      </div>
      <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
        {TECHS.map((tech) => (
          <span
            key={tech}
            className="rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-[13px] sm:text-[14px] font-medium text-[#0C4651] bg-neutral-50 border border-neutral-200/80 flex items-center gap-2 cursor-default hover:border-[#0C4651] hover:bg-white hover:shadow-sm transition-all"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0C4651]" />
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}