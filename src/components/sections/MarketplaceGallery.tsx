"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Language } from "@/i18n/translations";

interface MarketplaceGalleryProps {
  mainImage: string;
  gallery?: string[];
  title: string;
  lang?: Language;
}

export function MarketplaceGallery({
  mainImage,
  gallery = [],
  title,
  lang = "es",
}: MarketplaceGalleryProps) {
  // If there are no additional images in gallery, do not render the section at all
  if (!gallery || gallery.length === 0) {
    return null;
  }

  // Combine main image + gallery items for full browsing
  const allImages = [mainImage, ...gallery].filter(Boolean);
  const [selectedIndex, setSelectedIndex] = useState(0);

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
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF532A] block mb-1">
            {lang === "es" ? "✦ GALERÍA & CAPTURAS" : "✦ GALLERY & SCREENSHOTS"}
          </span>
          <h2 className="hd text-3xl sm:text-4xl font-bold tracking-tight text-[#171717]">
            {lang === "es" ? (
              <>
                Así <span className="text-[#FF532A]">se ve el sistema</span>
              </>
            ) : (
              <>
                What the system <span className="text-[#FF532A]">looks like</span>
              </>
            )}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-500">
          {lang === "es"
            ? "Explora las pantallas, paneles y módulos incluidos en este paquete."
            : "Explore the screens, panels, and modules included in this bundle."}
        </p>
      </div>

      {/* Imagen Grande Seleccionada (Visor Principal) */}
      <div className="w-full rounded-3xl sm:rounded-[36px] bg-[#171717] overflow-hidden border border-neutral-800 shadow-xl relative mb-6 group">
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
                activeImage || "bg-gradient-to-br from-neutral-900 to-[#171717]"
              } flex flex-col items-center justify-center text-center p-8 text-white`}
            >
              <Eye className="w-12 h-12 text-[#FF532A] mb-3" />
              <span className="font-semibold text-lg">{title}</span>
              <span className="text-xs font-mono text-neutral-400 mt-1">
                {lang === "es"
                  ? `Captura ${selectedIndex + 1} de ${allImages.length}`
                  : `Screenshot ${selectedIndex + 1} of ${allImages.length}`}
              </span>
            </div>
          )}

          {/* Indicator pill */}
          <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium border border-white/10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF532A]" />
            <span>
              {selectedIndex === 0
                ? lang === "es"
                  ? "Portada Principal"
                  : "Main Cover"
                : lang === "es"
                ? `Captura ${selectedIndex + 1}`
                : `Screenshot ${selectedIndex + 1}`}
            </span>
          </div>

          {/* Counter pill */}
          <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-mono border border-white/10">
            {selectedIndex + 1} / {allImages.length}
          </div>

          {/* Controls Prev / Next */}
          {allImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label={lang === "es" ? "Imagen anterior" : "Previous image"}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-[#FF532A] text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer shadow-lg z-20"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label={lang === "es" ? "Siguiente imagen" : "Next image"}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-[#FF532A] text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer shadow-lg z-20"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Carrusel / Tira de Miniaturas Inferiores */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-neutral-300">
          {allImages.map((img, idx) => {
            const isSelected = idx === selectedIndex;
            const isThumbBlob = img?.startsWith("http") || img?.startsWith("/");

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                aria-label={
                  lang === "es"
                    ? `Ver captura ${idx + 1}`
                    : `View screenshot ${idx + 1}`
                }
                className={`relative shrink-0 w-28 sm:w-36 aspect-[16/10] rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#FF532A] shadow-md shadow-[#FF532A]/25 scale-102 ring-2 ring-[#FF532A]/20"
                    : "border-neutral-200 hover:border-neutral-400 opacity-70 hover:opacity-100"
                }`}
              >
                {isThumbBlob ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={img}
                    alt={`${title} - miniatura ${idx + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div
                    className={`w-full h-full ${
                      img || "bg-neutral-800"
                    } flex items-center justify-center text-white text-[10px] font-mono`}
                  >
                    #{idx + 1}
                  </div>
                )}
                {idx === 0 && (
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/75 text-[9px] font-bold text-white uppercase tracking-wider">
                    {lang === "es" ? "Cover" : "Cover"}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
