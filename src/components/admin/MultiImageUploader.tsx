"use client";

import React, { useState, useRef } from "react";
import {
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Loader2,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Plus,
  Link as LinkIcon,
  Eye,
  X,
} from "lucide-react";
import { convertToWebP, formatBytes } from "@/lib/image-utils";

interface MultiImageUploaderProps {
  images: string[];
  onAddImages: (urls: string[]) => void;
  onRemoveImage: (index: number) => void;
  onReorderImage?: (fromIndex: number, toIndex: number) => void;
  label?: string;
  helperText?: string;
}

export function MultiImageUploader({
  images = [],
  onAddImages,
  onRemoveImage,
  onReorderImage,
  label = "Galería de Imágenes Adicionales",
  helperText = "Arrastra o selecciona varias imágenes a la vez. Se optimizarán automáticamente a WebP de alta resolución.",
}: MultiImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progressInfo, setProgressInfo] = useState<{
    current: number;
    total: number;
    fileName: string;
    savingsBadge?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState("");
  const [previewModalUrl, setPreviewModalUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Procesa múltiples archivos en lote
  const handleProcessFiles = async (files: FileList | File[]) => {
    const fileList = Array.from(files).filter((f) => f.type.startsWith("image/"));

    if (fileList.length === 0) {
      setError("Solo se permiten archivos de imagen válidos (PNG, JPG, WebP, etc.).");
      return;
    }

    setError(null);
    setUploading(true);

    const uploadedUrls: string[] = [];
    const total = fileList.length;

    for (let i = 0; i < total; i++) {
      const file = fileList[i];
      setProgressInfo({
        current: i + 1,
        total,
        fileName: file.name,
      });

      try {
        // 1. Optimizar a WebP
        const { file: webpFile, originalSize, compressedSize, savingsPercent } =
          await convertToWebP(file, 0.88, 2560);

        const savingsBadge =
          savingsPercent > 0
            ? `${formatBytes(originalSize)} ➔ ${formatBytes(compressedSize)} (-${savingsPercent}%)`
            : formatBytes(compressedSize);

        setProgressInfo({
          current: i + 1,
          total,
          fileName: file.name,
          savingsBadge,
        });

        // 2. Subir a Vercel Blob
        const response = await fetch(
          `/api/upload?filename=${encodeURIComponent(webpFile.name)}`,
          {
            method: "POST",
            body: webpFile,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || `Error al subir ${file.name}`);
        }

        uploadedUrls.push(data.url);
      } catch (err: any) {
        console.error("Error subiendo imagen:", file.name, err);
        setError(err?.message || `Fallo al procesar ${file.name}`);
      }
    }

    if (uploadedUrls.length > 0) {
      onAddImages(uploadedUrls);
    }

    setUploading(false);
    setProgressInfo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleManualAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualUrl.trim()) return;
    onAddImages([manualUrl.trim()]);
    setManualUrl("");
    setShowUrlInput(false);
  };

  return (
    <div className="space-y-4">
      {/* Cabecera / Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <label className="block text-xs font-bold text-white uppercase tracking-wider">
            {label} ({images.length})
          </label>
          {helperText && (
            <p className="text-[11px] text-neutral-400 mt-0.5">{helperText}</p>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-xs text-neutral-400 hover:text-[#E6FF2A] flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>{showUrlInput ? "Ocultar URL manual" : "Añadir por URL"}</span>
        </button>
      </div>

      {/* Input manual de URL opcional */}
      {showUrlInput && (
        <form onSubmit={handleManualAddUrl} className="flex gap-2 p-3 rounded-xl bg-[#202024] border border-white/10 animate-in fade-in duration-150">
          <input
            type="url"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            placeholder="https://ejemplo.com/captura.webp"
            className="flex-1 px-3 py-2 rounded-lg bg-[#141416] border border-white/10 text-xs text-white placeholder-neutral-500 focus:border-[#E6FF2A] outline-hidden font-mono"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#E6FF2A] hover:bg-[#D8F219] text-[#0C4651] text-xs font-bold cursor-pointer transition-colors"
          >
            Añadir
          </button>
        </form>
      )}

      {/* Mensaje de Error */}
      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid de imágenes existentes */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((imgUrl, idx) => (
            <div
              key={`${imgUrl}-${idx}`}
              className="relative aspect-video rounded-xl bg-black/40 border border-white/10 overflow-hidden group shadow-sm hover:border-[#E6FF2A]/50 transition-all"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgUrl}
                alt={`Captura ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />

              {/* Overlay oscuro en hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setPreviewModalUrl(imgUrl)}
                  className="p-1.5 rounded-lg bg-black/70 hover:bg-black text-white hover:text-[#E6FF2A] transition-colors cursor-pointer"
                  title="Ampliar vista previa"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onRemoveImage(idx)}
                  className="p-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition-colors cursor-pointer"
                  title="Eliminar de galería"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Botones de Reordenar (Izquierda / Derecha) */}
              {onReorderImage && (
                <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {idx > 0 && (
                    <button
                      type="button"
                      onClick={() => onReorderImage(idx, idx - 1)}
                      className="p-1 rounded bg-black/80 hover:bg-[#E6FF2A] hover:text-[#0C4651] text-white transition-colors cursor-pointer"
                      title="Mover a la izquierda"
                    >
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                  )}
                  {idx < images.length - 1 && (
                    <button
                      type="button"
                      onClick={() => onReorderImage(idx, idx + 1)}
                      className="p-1 rounded bg-black/80 hover:bg-[#E6FF2A] hover:text-[#0C4651] text-white transition-colors cursor-pointer"
                      title="Mover a la derecha"
                    >
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}

              {/* Badge de orden (#1, #2) */}
              <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black/80 text-white border border-white/10 shadow-xs pointer-events-none">
                #{idx + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Zona de Arrastrar y Soltar MÚLTIPLES imágenes */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files) {
            handleProcessFiles(e.dataTransfer.files);
          }
        }}
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`relative rounded-2xl border-2 border-dashed p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer group ${
          isDragging
            ? "border-[#E6FF2A] bg-[#E6FF2A]/10 scale-[1.01]"
            : "border-white/15 hover:border-[#E6FF2A]/60 bg-[#141416]/50 hover:bg-[#141416]"
        } ${uploading ? "pointer-events-none opacity-80" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) {
              handleProcessFiles(e.target.files);
            }
          }}
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-3 py-2">
            <Loader2 className="w-8 h-8 text-[#E6FF2A] animate-spin" />
            <div className="space-y-1">
              <p className="text-xs font-bold text-white">
                Optimizando y subiendo ({progressInfo?.current}/{progressInfo?.total})
              </p>
              <p className="text-[11px] text-neutral-400 font-mono truncate max-w-xs">
                {progressInfo?.fileName}
              </p>
              {progressInfo?.savingsBadge && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E6FF2A]/15 text-[#E6FF2A] font-bold mt-1">
                  <Sparkles className="w-3 h-3" />
                  {progressInfo.savingsBadge}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-[#E6FF2A]/10 text-[#E6FF2A] border border-[#E6FF2A]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white group-hover:text-[#E6FF2A] transition-colors">
                Arrastra aquí múltiples imágenes o haz clic para seleccionarlas
              </p>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Admite selección múltiple (PNG, JPG, WebP). Cada imagen se convertirá a WebP ligero de alta resolución.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Previsualización Ampliada */}
      {previewModalUrl && (
        <div
          className="fixed inset-0 z-70 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewModalUrl(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              type="button"
              onClick={() => setPreviewModalUrl(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-[#E6FF2A] text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
              <span>Cerrar</span>
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewModalUrl}
              alt="Vista previa ampliada"
              className="max-w-full max-h-[85vh] rounded-2xl border border-white/20 object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
