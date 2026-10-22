"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Portfolio() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    { id: "all", label: lang === "es" ? "Todos" : "All" },
    { id: "landing", label: lang === "es" ? "Landing Pages" : "Landing Pages" },
    { id: "web", label: lang === "es" ? "Sitios Web" : "Websites" },
    { id: "ecommerce", label: lang === "es" ? "E-Commerce" : "E-Commerce" },
  ];

  const projects = [
    {
      id: 1,
      title: "Food Express - Delivery & Restaurant App",
      category: "landing",
      categoryLabel: lang === "es" ? "Landing Page / E-commerce" : "Landing Page",
      desc:
        lang === "es"
          ? "Plataforma de pedidos rápidos en línea con pagos integrados y catálogo interactivo."
          : "Fast online delivery platform with automated checkout and interactive digital menu.",
      accent: "#FF532A",
      bgPreview: "bg-gradient-to-br from-neutral-900 to-[#171717]",
    },
    {
      id: 2,
      title: "Nexus SaaS - Analytics Dashboard",
      category: "web",
      categoryLabel: lang === "es" ? "Sitio Corporativo & App" : "Corporate Web & App",
      desc:
        lang === "es"
          ? "Portal web corporativo con panel de administración y analíticas en tiempo real."
          : "Corporate web portal with administrative dashboard and real-time conversion metrics.",
      accent: "#171717",
      bgPreview: "bg-gradient-to-br from-[#242428] to-[#171717]",
    },
    {
      id: 3,
      title: "Aura Boutique - Luxury E-Commerce",
      category: "ecommerce",
      categoryLabel: lang === "es" ? "Tienda Online" : "E-Commerce Store",
      desc:
        lang === "es"
          ? "Tienda digital de alta gama con catálogo optimizado para ventas en celulares."
          : "High-end digital store with mobile-first checkout and automated stock control.",
      accent: "#FF532A",
      bgPreview: "bg-gradient-to-br from-[#FF532A] to-[#E0451F]",
    },
  ];

  return (
    <section id="proyectos" className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 py-20 sm:py-24 bg-white">
      {/* Header matching exact reference layout */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-12">
        <h2 className="hd text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#171717] m-0 max-w-[540px]">
          {lang === "es" ? "Echa un vistazo a nuestro " : "Have a Look at our "}
          <span className="text-[#FF532A]">
            {lang === "es" ? "Portafolio" : "Portfolio"}
          </span>
        </h2>

        {/* Top-Right "See More" Button */}
        <Link
          href="#contacto"
          className="self-start sm:self-auto inline-flex items-center gap-1.5 bg-[#FF532A] hover:bg-[#E5451D] text-white text-sm font-semibold px-6 py-3 rounded-full shadow-lg shadow-[#FF532A]/25 transition-all hover:scale-105 active:scale-95"
        >
          <span>{lang === "es" ? "Ver más" : "See More"}</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2.5 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === cat.id
                ? "bg-[#171717] text-white shadow-md"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid / Cards matching Reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects
          .filter((p) => activeTab === "all" || p.category === activeTab)
          .map((project) => (
            <div
              key={project.id}
              className="group flex flex-col rounded-[28px] border border-neutral-200/80 bg-white p-5 sm:p-6 shadow-sm hover:shadow-xl hover:border-[#FF532A]/40 transition-all duration-300"
            >
              {/* Card Visual Preview Box */}
              <div
                className={`w-full h-[220px] rounded-2xl ${project.bgPreview} p-5 flex flex-col justify-between text-white relative overflow-hidden mb-5`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold">
                    {project.categoryLabel}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white text-[#171717] flex items-center justify-center group-hover:bg-[#FF532A] group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Geometric UI representation */}
                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15">
                  <div className="w-[65%] h-2.5 rounded-full bg-white mb-2" />
                  <div className="w-[85%] h-1.5 rounded-full bg-white/60 mb-2" />
                  <div className="w-[45%] h-1.5 rounded-full bg-white/60" />
                </div>
              </div>

              {/* Project Info */}
              <div className="flex flex-col gap-2">
                <Link
                  href="#contacto"
                  className="hd text-xl font-bold text-[#171717] group-hover:text-[#FF532A] transition-colors flex items-center gap-1.5"
                >
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#FF532A]" />
                </Link>
                <p className="text-xs sm:text-[13px] text-neutral-500 leading-relaxed m-0">
                  {project.desc}
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}