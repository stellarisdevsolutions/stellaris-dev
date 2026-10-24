"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  Sparkles,
} from "lucide-react";
import { convertToWebP, formatBytes } from "@/lib/image-utils";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  onClear?: () => void;
  label?: string;
}

export function ImageUploader({
  value,
  onChange,
  onClear,
  label = "Imagen o Captura",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [compressionBadge, setCompressionBadge] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(value || null);
  }, [value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Solo se permiten archivos de imagen (PNG, JPG, WebP, SVG).");
      return;
    }

    // Since we optimize and compress client-side, we allow files up to 15 MB
    if (file.size > 15 * 1024 * 1024) {
      setError("La imagen original no debe superar los 15 MB.");
      return;
    }

    setError(null);
    setUploading(true);
    setStatusMessage("Convirtiendo a WebP ultraligero sin perder nitidez...");

    try {
      // 1. Convert to WebP client-side (lossless visual quality 0.88, preserves resolution)
      const { file: webpFile, originalSize, compressedSize, savingsPercent } =
        await convertToWebP(file, 0.88, 2560);

      if (savingsPercent > 0) {
        setCompressionBadge(
          `WebP: ${formatBytes(originalSize)} ➔ ${formatBytes(
            compressedSize
          )} (-${savingsPercent}%)`
        );
      } else {
        setCompressionBadge(`WebP: ${formatBytes(compressedSize)}`);
      }

      setStatusMessage("Subiendo archivo optimizado a Vercel Blob...");

      // 2. Upload the optimized WebP to Vercel Blob
      const response = await fetch(
        `/api/upload?filename=${encodeURIComponent(webpFile.name)}`,
        {
          method: "POST",
          body: webpFile,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al subir la imagen");
      }

      setPreview(data.url);
      onChange(data.url);
    } catch (err: any) {
      setError(err?.message || "No se pudo subir la imagen a Vercel Blob.");
      setCompressionBadge(null);
    } finally {
      setUploading(false);
      setStatusMessage(null);
    }
  };

  const handleClear = () => {
    setPreview(null);
    setCompressionBadge(null);
    onChange("");
    if (onClear) onClear();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-semibold text-neutral-300">
          {label}
        </label>
      )}

      {preview ? (
        <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#202024] p-2.5 flex items-center gap-3">
          <div className="w-16 h-16 rounded-lg bg-black/40 overflow-hidden relative shrink-0 flex items-center justify-center border border-white/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Imagen lista en CDN
              </p>
              {compressionBadge && (
                <span className="inline-flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#FF532A]/15 text-[#FF532A] font-bold">
                  <Sparkles className="w-2.5 h-2.5" />
                  {compressionBadge}
                </span>
              )}
            </div>
            <p className="text-[10px] text-neutral-400 font-mono truncate mt-0.5">
              {preview}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
            title="Quitar imagen (se borrará del CDN solo al Guardar)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-white/15 hover:border-[#FF532A]/50 rounded-xl p-4 text-center cursor-pointer transition-all bg-[#202024]/40 hover:bg-[#202024]/80 group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {uploading ? (
              <div className="flex flex-col items-center justify-center py-2">
                <Loader2 className="w-6 h-6 text-[#FF532A] animate-spin mb-2" />
                <span className="text-xs text-neutral-200 font-medium">
                  {statusMessage || "Procesando imagen..."}
                </span>
                <span className="text-[10px] text-neutral-400 mt-0.5 font-mono">
                  Conversión WebP en alta resolución
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-1">
                <UploadCloud className="w-6 h-6 text-neutral-400 group-hover:text-[#FF532A] transition-colors mb-1.5" />
                <span className="text-xs text-neutral-300 font-medium group-hover:text-white">
                  Haz clic para subir imagen (conversión automática a WebP)
                </span>
                <span className="text-[10px] text-neutral-500 mt-0.5">
                  PNG, JPG, WebP o SVG (se optimiza sin perder nitidez)
                </span>
              </div>
            )}
          </div>

          {/* Or manual URL */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[10px] text-neutral-500 font-mono uppercase">
              o URL externa:
            </span>
            <input
              type="text"
              value={value || ""}
              onChange={(e) => {
                setPreview(e.target.value);
                onChange(e.target.value);
              }}
              placeholder="https://..."
              className="flex-1 bg-[#202024] border border-white/10 text-white text-[11px] rounded-lg px-2.5 py-1.5 outline-none focus:border-[#FF532A]"
            />
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
