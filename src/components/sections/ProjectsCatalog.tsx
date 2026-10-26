"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ProjectItem } from "@/data/projects";

interface ProjectsCatalogProps {
  initialProjects: ProjectItem[];
}

export function ProjectsCatalog({ initialProjects }: ProjectsCatalogProps) {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mapa de etiquetas bilingües para las categorías
  const categoryLabels: Record<string, { es: string; en: string }> = {
    web: { es: "Sitios Web", en: "Websites" },
    ecommerce: { es: "Tienda Online", en: "Online Store" },
    "custom-systems": { es: "Sistemas a Medida", en: "Custom Systems" },
    cms: { es: "CMS", en: "CMS" },
    agency: { es: "Agencias", en: "Agencies" },
    portfolio: { es: "Portafolios", en: "Portfolios" },
    landing: { es: "Landing Pages", en: "Landing Pages" },
  };

  // Conjunto de categorías que realmente tienen proyectos cargados
  const existingCategoryIds = new Set(initialProjects.map((p) => p.category));

  // Filtramos las pestañas para mostrar SOLO las categorías que tienen proyectos registrados
  const visibleCategories: { id: string; label: string }[] = [
    { id: "all", label: lang === "es" ? "Todos los Proyectos" : "All Projects" },
  ];

  Object.entries(categoryLabels).forEach(([id, labels]) => {
    if (existingCategoryIds.has(id)) {
      visibleCategories.push({
        id,
        label: labels[lang] || labels.es,
      });
    }
  });

  // Agregar categorías dinámicas adicionales si existen en la BD pero no en el mapa predeterminado
  existingCategoryIds.forEach((id) => {
    if (!categoryLabels[id] && id) {
      visibleCategories.push({
        id,
        label: id.charAt(0).toUpperCase() + id.slice(1),
      });
    }
  });

  // Filtrado de proyectos por categoría y búsqueda
  const filteredProjects = initialProjects.filter((p) => {
    const matchesCategory = activeTab === "all" || p.category === activeTab;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const titleEn = typeof p.title === "object" ? p.title.en : p.title || "";
    const titleEs = typeof p.title === "object" ? p.title.es : p.title || "";
    const matchesSearch =
      titleEn.toLowerCase().includes(q) ||
      titleEs.toLowerCase().includes(q) ||
      p.client.toLowerCase().includes(q) ||
      (p.tagline?.es && p.tagline.es.toLowerCase().includes(q)) ||
      (p.tagline?.en && p.tagline.en.toLowerCase().includes(q)) ||
      p.stack?.some((s) => s.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8">
      {/* Breadcrumb / Regresar al Inicio */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-[#0C4651] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>{lang === "es" ? "Volver al inicio" : "Back to home"}</span>
        </Link>
      </div>

      {/* Header Principal con título y párrafo al lado derecho */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b border-neutral-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold uppercase tracking-wider text-[#0C4651] mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0C4651]" />
            <span>{lang === "es" ? "CASOS DE ÉXITO & PORTAFOLIO" : "CASE STUDIES & PORTFOLIO"}</span>
          </div>
          <h1 className="hd text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0C4651] leading-[1.08] m-0">
            {lang === "es" ? "Nuestros " : "Our "}
            <span className="inline-block relative text-[#0C4651] bg-[#E6FF2A] px-3.5 sm:px-5 py-0.5 rounded-xl shadow-sm shadow-[#E6FF2A]/30 -rotate-1 mx-1 border border-[#0C4651]/20">
              {lang === "es" ? "Proyectos" : "Projects"}
            </span>
          </h1>
        </div>

        {/* Párrafo al lado derecho */}
        <p className="m-0 text-sm sm:text-base text-neutral-600 max-w-[460px] leading-relaxed">
          {lang === "es"
            ? "Explora nuestras implementaciones web reales: desde landing pages de alta conversión hasta tiendas online y plataformas a medida."
            : "Explore our real client work: high-conversion landing pages, automated online stores, and custom web platforms."}
        </p>
      </div>

      {/* MISMA FILA: BOTONES DE FILTRO + BUSCADOR TIPO PILL */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        {/* Botones de Filtro (Solo categorías que contienen proyectos) */}
        <div className="flex flex-wrap items-center gap-2">
          {visibleCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              type="button"
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === cat.id
                  ? "bg-[#0C4651] text-[#E6FF2A] shadow-md shadow-[#0C4651]/20 font-bold"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Buscador Tipo Pill */}
        <div className="w-full md:w-[380px] lg:w-[420px] flex items-center bg-white border border-neutral-200 rounded-full p-1.5 shadow-sm shadow-neutral-100 focus-within:border-[#0C4651] focus-within:shadow-md transition-all shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === "es"
                ? "Buscar por nombre, cliente o tecnología..."
                : "Search by project, client or stack..."
            }
            className="flex-1 bg-transparent border-0 px-4 py-2 text-xs sm:text-sm text-[#0C4651] placeholder-neutral-400 outline-none"
          />
          <button
            type="button"
            className="px-5 py-2.5 bg-[#0C4651] hover:bg-[#145C6A] text-[#E6FF2A] text-xs sm:text-sm font-bold rounded-full transition-all shrink-0 shadow-sm shadow-[#0C4651]/20 cursor-pointer"
          >
            {lang === "es" ? "Buscar" : "Search"}
          </button>
        </div>
      </div>

      {/* Grid de Proyectos - Tal cual como en la página de inicio (sin nada encima de la imagen) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project) => {
          const title =
            typeof project.title === "object"
              ? project.title[lang] || project.title.es || project.title.en || ""
              : project.title;

          const catLabel =
            typeof project.categoryLabel === "object"
              ? project.categoryLabel[lang] || project.categoryLabel.es || project.categoryLabel.en || project.category
              : categoryLabels[project.category]?.[lang] || categoryLabels[project.category]?.es || project.category;

          const imageSrc =
            project.bgPreview?.startsWith("http") || project.bgPreview?.startsWith("/")
              ? project.bgPreview
              : project.gallery?.[0];

          return (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group flex flex-col transition-all duration-300"
            >
              {/* Imagen/Preview Limpia - SIN NADA ENCIMA */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 mb-3 shadow-xs">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className={`w-full h-full ${
                      project.bgPreview || "bg-neutral-900"
                    } flex items-center justify-center transition-transform duration-500 group-hover:scale-105`}
                  >
                    <span className="text-xl sm:text-2xl font-bold text-white/90 font-mono tracking-tight px-4 text-center">
                      {project.client}
                    </span>
                  </div>
                )}
              </div>

              {/* Información debajo de la imagen (limpio, sin nada sobre la foto) */}
              <div className="flex flex-col">
                {/* Etiqueta de Categoría - NO diseño cápsula (tipográfica, minimalista) */}
                <span className="text-xs font-semibold text-[#0C4651] uppercase tracking-wider mb-1">
                  {catLabel}
                </span>

                {/* Título del proyecto - Máximo 2 filas */}
                <h3 className="hd text-base sm:text-lg lg:text-xl font-bold text-[#0C4651] group-hover:text-[#145C6A] transition-colors line-clamp-2 leading-snug m-0">
                  {title}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-neutral-200 mt-6">
          <p className="text-neutral-500 text-sm">
            {lang === "es"
              ? "No se encontraron proyectos para los filtros seleccionados."
              : "No projects found for the selected filters."}
          </p>
        </div>
      )}
    </div>
  );
}
