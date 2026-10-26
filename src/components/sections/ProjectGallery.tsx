"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Language } from "@/i18n/translations";

interface ProjectGalleryProps {
  mainImage: string;
  gallery?: string[];
  title: string;
  lang?: Language;
}

export function ProjectGallery({
  mainImage,
  gallery = [],
  title,
  lang = "es",
}: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // If there are no additional images in gallery, do not render the section at all
  if (!gallery || gallery.length === 0) {
    return null;
  }

  // Combine main image + gallery items for full browsing
  const allImages = [mainImage, ...gallery].filter(Boolean);

  const activeImage = allImages[selectedIndex] || mainImage;
  const isImageBlob =
    activeImage?.startsWith("http") || activeImage?.startsWith("/");

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="mb-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#0C4651] block mb-1">
            {lang === "es" ? "✦ GALERÍA VISUAL" : "✦ VISUAL GALLERY"}
          </span>
          <h2 className="hd text-3xl sm:text-4xl font-bold tracking-tight text-[#0C4651]">
            {lang === "es" ? (
              <>
                Así <span className="text-[#0C4651] bg-[#E6FF2A] px-2 py-0.5 rounded-lg border border-[#0C4651]/20">se ve</span>
              </>
            ) : (
              <>
                What it <span className="text-[#0C4651] bg-[#E6FF2A] px-2 py-0.5 rounded-lg border border-[#0C4651]/20">looks like</span>
              </>
            )}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-500">
          {lang === "es"
            ? "Haz clic o desliza en las capturas inferiores para ver los detalles."
            : "Click or swipe through the thumbnails below to inspect details."}
        </p>
      </div>

      {/* Imagen Grande Seleccionada (Visor Principal) */}
      <div className="w-full rounded-3xl sm:rounded-[36px] bg-[#0C4651] overflow-hidden border border-[#145C6A] shadow-xl relative mb-6 group">
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full flex items-center justify-center bg-black/60">
          {isImageBlob ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={activeImage}
              src={activeImage}
              alt={`${title} - captura ampliada ${selectedIndex + 1}`}
              className="w-full h-full object-cover object-top transition-opacity duration-300"
            />
          ) : (
            <div
              className={`w-full h-full ${
                activeImage || "bg-gradient-to-br from-[#0C4651] to-[#08343D]"
              } flex flex-col items-center justify-center text-center p-8 text-white`}
            >
              <Eye className="w-12 h-12 text-[#E6FF2A] mb-3" />
              <span className="font-semibold text-lg">{title}</span>
              <span className="text-xs font-mono text-slate-300 mt-1">
                {lang === "es"
                  ? `Captura ${selectedIndex + 1} de ${allImages.length}`
                  : `Capture ${selectedIndex + 1} of ${allImages.length}`}
              </span>
            </div>
          )}

          {/* Indicator pill */}
          <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium border border-white/10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E6FF2A]" />
            <span>
              {selectedIndex === 0
                ? lang === "es"
                  ? "Portada Principal"
                  : "Main Preview"
                : lang === "es"
                ? `Captura ${selectedIndex} de ${gallery.length}`
                : `Capture ${selectedIndex} of ${gallery.length}`}
            </span>
          </div>

          {/* Prev / Next controls on large image */}
          {allImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#E6FF2A] hover:text-[#0C4651] text-white flex items-center justify-center backdrop-blur-md border border-white/10 opacity-80 hover:opacity-100 transition-all cursor-pointer shadow-lg hover:scale-105"
                title="Captura anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#E6FF2A] hover:text-[#0C4651] text-white flex items-center justify-center backdrop-blur-md border border-white/10 opacity-80 hover:opacity-100 transition-all cursor-pointer shadow-lg hover:scale-105"
                title="Siguiente captura"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Carrusel de Miniaturas Inferior */}
      <div className="flex items-center gap-4 overflow-x-auto pb-3 pt-1 snap-x scrollbar-thin scrollbar-thumb-neutral-300">
        {allImages.map((imgUrl, idx) => {
          const isSelected = idx === selectedIndex;
          const isBlob = imgUrl?.startsWith("http") || imgUrl?.startsWith("/");

          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`snap-start shrink-0 w-[140px] sm:w-[180px] aspect-[16/10] rounded-2xl overflow-hidden border-2 transition-all duration-200 cursor-pointer text-left relative group ${
                isSelected
                  ? "border-[#E6FF2A] shadow-md shadow-[#E6FF2A]/20 scale-[1.02]"
                  : "border-neutral-200 hover:border-[#145C6A] opacity-70 hover:opacity-100"
              }`}
            >
              {isBlob ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={imgUrl}
                  alt={`Miniatura ${idx + 1}`}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div
                  className={`w-full h-full ${
                    imgUrl || "bg-neutral-800"
                  } flex items-center justify-center text-white text-[10px] font-mono`}
                >
                  {lang === "es" ? `Captura ${idx + 1}` : `Capture ${idx + 1}`}
                </div>
              )}

              {/* Tag overlay */}
              <div className="absolute bottom-1.5 left-1.5 right-1.5">
                <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm text-white text-[10px] font-medium block truncate">
                  {idx === 0
                    ? lang === "es"
                      ? "Principal"
                      : "Main"
                    : lang === "es"
                    ? `Detalle ${idx}`
                    : `Detail ${idx}`}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
