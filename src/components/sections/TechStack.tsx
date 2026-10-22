"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { useLanguage } from "@/context/LanguageContext";

const TECHS = [
  { name: "Next.js 16", badge: "Turbopack" },
  { name: "React 19", badge: "Server Actions" },
  { name: "Tailwind CSS v4", badge: "Design" },
  { name: "TypeScript", badge: "Type-Safe" },
  { name: "Framer Motion", badge: "Animations" },
  { name: "Figma", badge: "UI/UX" },
  { name: "Vercel", badge: "Global CDN" },
];

export function TechStack() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full py-10 bg-[#f8fafc] border-b border-slate-200/80">
      <Container>
        <div className="flex flex-col items-center text-center">
          <p className="text-xs uppercase font-bold tracking-widest text-slate-500 mb-6">
            {t.techStack.label}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-4xl">
            {TECHS.map((tech) => (
              <div
                key={tech.name}
                className="group flex items-center gap-2 rounded-full border border-slate-300/80 bg-white px-4 py-2 shadow-xs hover:border-amber-400 hover:shadow-md transition-all duration-200 cursor-default"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
                <span className="text-xs sm:text-sm font-bold text-slate-800">
                  {tech.name}
                </span>
                <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  {tech.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
