"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PROJECTS, ProjectItem } from "@/data/projects";

export function Portfolio({ items = PROJECTS }: { items?: ProjectItem[] }) {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");

  const projectsList = items || PROJECTS;

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
  const existingCategoryIds = new Set(projectsList.map((p) => p.category));

  // Filtramos las pestañas para mostrar SOLO las categorías que tienen proyectos registrados
  const visibleCategories: { id: string; label: string }[] = [
    { id: "all", label: lang === "es" ? "Todos" : "All" },
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

  // Filtrar proyectos según la categoría activa
  const filteredProjects = projectsList.filter(
    (p) => activeTab === "all" || p.category === activeTab
  );

  // Máximo 2 filas (6 proyectos en grid de 3 columnas)
  const displayedProjects = filteredProjects.slice(0, 6);

  // Condición para mostrar el botón de ver más si hay más de 6 proyectos
  const hasMoreProjects = filteredProjects.length > 6 || projectsList.length > 6;

  return (
    <section id="portfolio" className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 py-20 sm:py-24 bg-white">
      {/* Header matching reference layout */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-12"
      >
        <h2 className="hd text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#171717] m-0 max-w-[540px]">
          {lang === "es" ? "Echa un vistazo a nuestro " : "Have a Look at our "}
          <span className="inline-block relative text-white bg-[#FF532A] px-3 sm:px-4 py-0.5 rounded-xl shadow-sm shadow-[#FF532A]/25 -rotate-1 mx-1">
            {lang === "es" ? "Portafolio" : "Portfolio"}
          </span>
        </h2>

        {/* Top-Right "Cotizar" Button */}
        <Link
          href="#contact"
          className="self-start sm:self-auto inline-flex items-center gap-1.5 bg-[#FF532A] hover:bg-[#E5451D] text-white text-sm font-semibold px-6 py-3 rounded-full shadow-lg shadow-[#FF532A]/25 transition-all hover:scale-105 active:scale-95"
        >
          <span>{lang === "es" ? "Cotizar Proyecto" : "Hire Us"}</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-wrap items-center gap-2 mb-10"
      >
        {visibleCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            type="button"
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === cat.id
                ? "bg-[#171717] text-white shadow-md"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid / Cards with subtle stagger */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {displayedProjects.map((project, idx) => {
          const title =
            typeof project.title === "object"
              ? project.title[lang] || project.title.es || project.title.en || ""
              : project.title;

          const catLabel =
            typeof project.categoryLabel === "object"
              ? project.categoryLabel[lang] || project.categoryLabel.es || project.categoryLabel.en || project.category
              : project.category;

          const imageSrc =
            project.bgPreview?.startsWith("http") || project.bgPreview?.startsWith("/")
              ? project.bgPreview
              : project.gallery?.[0];

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className="flex flex-col"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group flex flex-col transition-all duration-300 hover:-translate-y-1"
              >
                {/* Imagen/Preview Limpia - SIN NADA ENCIMA */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 mb-3 shadow-xs">
                  {imageSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageSrc}
                      alt={title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
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
                  {/* Etiqueta de Categoría */}
                  <span className="text-xs font-semibold text-[#FF532A] uppercase tracking-wider mb-1">
                    {catLabel}
                  </span>

                  {/* Título del proyecto */}
                  <h3 className="hd text-base sm:text-lg lg:text-xl font-bold text-[#171717] group-hover:text-[#FF532A] transition-colors line-clamp-2 leading-snug m-0">
                    {title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Botón Ver todos los proyectos si hay más de 6 proyectos */}
      {hasMoreProjects && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-12 sm:mt-16 flex justify-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-[#171717] hover:bg-[#FF532A] text-white text-sm sm:text-base font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-black/10 transition-all duration-300 hover:scale-105 active:scale-95 group"
          >
            <span>
              {lang === "es" ? "Ver todos los proyectos" : "View All Projects"}
            </span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      )}
    </section>
  );
}
