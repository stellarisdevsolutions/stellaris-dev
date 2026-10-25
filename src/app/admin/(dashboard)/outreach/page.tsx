"use client";

import React, { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import {
  Upload,
  Send,
  Mail,
  CheckCircle2,
  AlertCircle,
  Eye,
  Edit3,
  Image as ImageIcon,
  Sparkles,
  RefreshCw,
  Search,
  ExternalLink,
  Trash2,
  Plus,
  Play,
  Check,
  X,
  Link as LinkIcon,
  Copy,
  Info,
} from "lucide-react";
import {
  sendOutreachEmailAction,
  sendTestOutreachEmailAction,
} from "@/app/admin/actions";
import { OutreachEmailData } from "@/lib/outreach-email";

// Lead enriquecido para el estado del cliente
interface LeadItem extends OutreachEmailData {
  id: string;
  companyName: string;
  status: "pending" | "sending" | "sent" | "error";
  sentAt?: string;
  errorMessage?: string;
}

// Maqueta en la Galería
interface MockupAsset {
  id: string;
  name: string;
  category: string;
  url: string;
  demoUrl: string;
  dimensions?: string;
  sizeKb?: string;
  format?: string;
}

// Maquetas predeterminadas con imágenes que cargan siempre en HD
const INITIAL_ASSETS: MockupAsset[] = [
  {
    id: "dental-clinic-1",
    name: "Clínica Dental & Citas en Línea",
    category: "Odontología",
    url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://dental.tiendastellaris.com",
    dimensions: "1200 × 750 px",
    sizeKb: "48.2 KB",
    format: "WEBP",
  },
  {
    id: "dental-clinic-2",
    name: "Consultorio Estética & Sonrisa",
    category: "Odontología",
    url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://dental.tiendastellaris.com",
    dimensions: "1200 × 800 px",
    sizeKb: "52.1 KB",
    format: "WEBP",
  },
  {
    id: "restaurant-pro",
    name: "Gourmet Bistro & Menú Móvil",
    category: "Restaurantes",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://restaurante.tiendastellaris.com",
    dimensions: "1200 × 800 px",
    sizeKb: "45.0 KB",
    format: "WEBP",
  },
  {
    id: "legal-firm",
    name: "Firma Legal & Asesoría Corporativa",
    category: "Abogados",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://legal.tiendastellaris.com",
    dimensions: "1200 × 795 px",
    sizeKb: "58.4 KB",
    format: "WEBP",
  },
  {
    id: "ecommerce-boutique",
    name: "Boutique Moda & Catálogo",
    category: "E-Commerce",
    url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://tienda.tiendastellaris.com",
    dimensions: "1200 × 800 px",
    sizeKb: "41.6 KB",
    format: "WEBP",
  },
  {
    id: "saas-dashboard",
    name: "Dashboard Analytics & SaaS",
    category: "Tecnología",
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://saas.tiendastellaris.com",
    dimensions: "1200 × 675 px",
    sizeKb: "39.8 KB",
    format: "WEBP",
  },
];

/**
 * Optimiza la imagen en el navegador usando Canvas y formato WebP a 0.85
 * Reduce drásticamente el peso (ej. 3MB -> 40KB) sin perder nitidez.
 */
async function optimizeImageInBrowser(file: File): Promise<{
  blob: Blob;
  dataUrl: string;
  dimensions: string;
  sizeKb: string;
  format: string;
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const MAX_WIDTH = 1200;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("No se pudo inicializar canvas"));
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Error al comprimir imagen"));
              return;
            }
            const dataUrl = canvas.toDataURL("image/webp", 0.85);
            const sizeKb = `${(blob.size / 1024).toFixed(1)} KB`;
            resolve({
              blob,
              dataUrl,
              dimensions: `${width} × ${height} px`,
              sizeKb,
              format: "WEBP",
            });
          },
          "image/webp",
          0.85
        );
      };
      img.onerror = () => reject(new Error("No se pudo cargar la imagen para optimizar"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Error al leer archivo"));
    reader.readAsDataURL(file);
  });
}

export default function OutreachPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("preview");
  const [searchQuery, setSearchQuery] = useState("");

  // Galería de maquetas estilo Image 2
  const [assets, setAssets] = useState<MockupAsset[]>(INITIAL_ASSETS);
  const [selectedAssetId, setSelectedAssetId] = useState<string>(INITIAL_ASSETS[0].id);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryTab, setGalleryTab] = useState<"library" | "upload">("library");

  // Estado para subir nueva maqueta con Nombre y Demo Link
  const [newAssetName, setNewAssetName] = useState("");
  const [newAssetDemoUrl, setNewAssetDemoUrl] = useState("");
  const [newAssetCategory, setNewAssetCategory] = useState("General");
  const [optimizingUpload, setOptimizingUpload] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Modal para cambiar Demo URL a todo el lote
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [batchDemoUrl, setBatchDemoUrl] = useState("");

  // Envíos
  const [isBatchSending, setIsBatchSending] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0 });
  const [testSendLoading, setTestSendLoading] = useState(false);
  const [testSendSuccess, setTestSendSuccess] = useState<string | null>(null);
  const [singleSendLoading, setSingleSendLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalUploadInputRef = useRef<HTMLInputElement>(null);

  // Cargar assets y leads desde localStorage
  useEffect(() => {
    const savedAssets = localStorage.getItem("stellaris_mockup_assets");
    if (savedAssets) {
      try {
        const parsed = JSON.parse(savedAssets);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAssets(parsed);
          setSelectedAssetId(parsed[0].id);
        }
      } catch (err) {
        console.warn("Error cargando assets:", err);
      }
    }

    const savedLeads = localStorage.getItem("stellaris_outreach_leads");
    if (savedLeads) {
      try {
        const parsed = JSON.parse(savedLeads);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLeads(parsed);
          setSelectedLeadId(parsed[0].id);
        }
      } catch (err) {
        console.warn("Error cargando prospectos:", err);
      }
    }
  }, []);

  // Guardar assets cuando cambien
  useEffect(() => {
    if (assets.length > 0) {
      localStorage.setItem("stellaris_mockup_assets", JSON.stringify(assets));
    }
  }, [assets]);

  // Guardar leads cuando cambien
  useEffect(() => {
    localStorage.setItem("stellaris_outreach_leads", JSON.stringify(leads));
  }, [leads]);

  // Lead activo seleccionado
  const activeLead = leads.find((l) => l.id === selectedLeadId) || leads[0] || null;

  // Asset activo seleccionado en la galería
  const selectedAsset = assets.find((a) => a.id === selectedAssetId) || assets[0] || null;

  // Procesar archivo CSV
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<any>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (!results.data || results.data.length === 0) {
          alert("El archivo CSV no contiene registros válidos.");
          return;
        }

        const newLeads: LeadItem[] = results.data
          .filter((row: any) => row.email && row.email.includes("@"))
          .map((row: any, index: number) => {
            let company = "";
            if (row.greeting) {
              company = row.greeting
                .replace(/Hola (equipo de |Dr\. |Dra\. )?/i, "")
                .replace(/,/g, "")
                .trim();
            }
            if (!company && row.subject) {
              const match = row.subject.split(/para |for /i);
              company = match[1]?.trim() || "";
            }

            return {
              id: `lead-${Date.now()}-${index}`,
              companyName: company || `Prospecto #${index + 1}`,
              email: row.email?.trim() || "",
              subject: row.subject?.trim() || "Propuesta de modernización web",
              greeting: row.greeting?.trim() || `Hola equipo de ${company || "su negocio"},`,
              intro_and_need: row.intro_and_need?.trim() || "",
              pitch:
                row.pitch?.trim() ||
                "En Stellaris Dev desarrollamos sitios web modernos, rápidos y optimizados para dispositivos móviles.",
              demo_url: row.demo_url?.trim() || "",
              image_url: row.image_url?.trim() || "",
              closing:
                row.closing?.trim() ||
                "Si les interesa ver más detalles, solo respondan a este correo y con gusto les preparo una propuesta personalizada.",
              signature:
                row.signature?.trim() ||
                "Saludos cordiales,\n\nStellaris Dev Solutions\nstellarisdevsolutions@gmail.com",
              status: "pending",
            };
          });

        if (newLeads.length === 0) {
          alert("No se encontraron correos válidos en las columnas del CSV.");
          return;
        }

        setLeads(newLeads);
        setSelectedLeadId(newLeads[0].id);
        alert(`¡Éxito! Se cargaron ${newLeads.length} prospectos listos para editar y enviar.`);
      },
      error: (error) => {
        console.error("Error al leer el CSV:", error);
        alert("Error al procesar el archivo CSV.");
      },
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Modificar campo del lead activo
  const updateActiveLead = (fields: Partial<LeadItem>) => {
    if (!activeLead) return;
    setLeads((prev) =>
      prev.map((lead) => (lead.id === activeLead.id ? { ...lead, ...fields } : lead))
    );
  };

  // Eliminar un prospecto individual
  const handleDeleteLead = (id: string, name: string) => {
    const confirm = window.confirm(`¿Eliminar a "${name}" de la lista?`);
    if (!confirm) return;

    setLeads((prev) => {
      const remaining = prev.filter((l) => l.id !== id);
      if (selectedLeadId === id) {
        setSelectedLeadId(remaining.length > 0 ? remaining[0].id : null);
      }
      return remaining;
    });
  };

  // Borrar toda la lista de prospectos
  const handleClearAllLeads = () => {
    if (leads.length === 0) return;
    const confirm = window.confirm(
      "¿Seguro que deseas vaciar toda la lista de prospectos? Esta acción no se puede deshacer."
    );
    if (!confirm) return;

    setLeads([]);
    setSelectedLeadId(null);
  };

  // Cambiar la Demo URL a todo el lote
  const handleApplyDemoUrlToAll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchDemoUrl.trim()) return;

    setLeads((prev) =>
      prev.map((l) => ({
        ...l,
        demo_url: batchDemoUrl.trim(),
      }))
    );
    setIsDemoModalOpen(false);
    alert(`¡Listo! Se asignó la demo "${batchDemoUrl.trim()}" a los ${leads.length} prospectos.`);
    setBatchDemoUrl("");
  };

  // Subir imagen optimizada en la galería (con nombre y link de demo)
  const handleOptimizeAndUploadAsset = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOptimizingUpload(true);
    try {
      // 1. Optimizar en el navegador a WebP 0.85
      const { blob, dataUrl, dimensions, sizeKb, format } = await optimizeImageInBrowser(file);

      let finalUrl = dataUrl;

      // 2. Intentar subir a Vercel Blob
      try {
        const cleanName = `${(newAssetName || file.name).replace(/\.[^/.]+$/, "")}-${Date.now()}.webp`;
        const res = await fetch(`/api/upload?filename=${encodeURIComponent(cleanName)}`, {
          method: "POST",
          body: blob,
        });
        if (res.ok) {
          const json = await res.json();
          if (json.url) finalUrl = json.url;
        }
      } catch (uploadErr) {
        console.warn("Fallback a Base64 local para la maqueta:", uploadErr);
      }

      const newAsset: MockupAsset = {
        id: `mockup-${Date.now()}`,
        name: newAssetName.trim() || file.name.replace(/\.[^/.]+$/, ""),
        category: newAssetCategory.trim() || "Personalizados",
        url: finalUrl,
        demoUrl: newAssetDemoUrl.trim() || "https://dental.tiendastellaris.com",
        dimensions,
        sizeKb,
        format,
      };

      setAssets((prev) => [newAsset, ...prev]);
      setSelectedAssetId(newAsset.id);
      setNewAssetName("");
      setNewAssetDemoUrl("");
      setGalleryTab("library");
      alert(`¡Maqueta optimizada con éxito! Peso: ${sizeKb} (${dimensions})`);
    } catch (err: any) {
      alert(`Error al procesar la imagen: ${err?.message}`);
    } finally {
      setOptimizingUpload(false);
      if (modalUploadInputRef.current) modalUploadInputRef.current.value = "";
    }
  };

  // Actualizar metadatos de la maqueta activa (Nombre y Demo Link)
  const updateSelectedAsset = (fields: Partial<MockupAsset>) => {
    if (!selectedAsset) return;
    setAssets((prev) =>
      prev.map((a) => (a.id === selectedAsset.id ? { ...a, ...fields } : a))
    );
  };

  // Eliminar maqueta de la galería
  const handleDeleteAsset = (id: string, name: string) => {
    if (assets.length <= 1) {
      alert("Debes conservar al menos una maqueta en la galería.");
      return;
    }
    const confirm = window.confirm(`¿Eliminar la maqueta "${name}" de la galería?`);
    if (!confirm) return;

    setAssets((prev) => {
      const remaining = prev.filter((a) => a.id !== id);
      if (selectedAssetId === id) {
        setSelectedAssetId(remaining[0].id);
      }
      return remaining;
    });
  };

  // Copiar URL directa
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  // Asignar maqueta al lead activo
  const handleApplyAssetToCurrent = () => {
    if (!selectedAsset) return;
    updateActiveLead({
      image_url: selectedAsset.url,
      demo_url: selectedAsset.demoUrl || activeLead?.demo_url,
    });
    setIsGalleryOpen(false);
  };

  // Asignar maqueta a TODO el lote
  const handleApplyAssetToAll = () => {
    if (!selectedAsset) return;
    setLeads((prev) =>
      prev.map((lead) => ({
        ...lead,
        image_url: selectedAsset.url,
        demo_url: selectedAsset.demoUrl || lead.demo_url,
      }))
    );
    setIsGalleryOpen(false);
    alert(`Se asignó la maqueta "${selectedAsset.name}" a todos los ${leads.length} prospectos.`);
  };

  // Enviar correo de prueba a mi Gmail
  const handleSendTestToMe = async () => {
    if (!activeLead) return;
    setTestSendLoading(true);
    setTestSendSuccess(null);

    try {
      const result = await sendTestOutreachEmailAction(
        {
          email: activeLead.email,
          subject: activeLead.subject,
          greeting: activeLead.greeting,
          intro_and_need: activeLead.intro_and_need,
          pitch: activeLead.pitch,
          demo_url: activeLead.demo_url,
          image_url: activeLead.image_url,
          closing: activeLead.closing,
          signature: activeLead.signature,
        },
        "stellarisdevsolutions@gmail.com"
      );

      if (result.success) {
        setTestSendSuccess(
          "¡Correo de prueba enviado con éxito a stellarisdevsolutions@gmail.com! Revisa tu bandeja de entrada."
        );
        setTimeout(() => setTestSendSuccess(null), 8000);
      } else {
        alert(`Error al enviar prueba: ${result.error || "Verifica tu clave de Resend"}`);
      }
    } catch (err: any) {
      alert(`Error: ${err?.message}`);
    } finally {
      setTestSendLoading(false);
    }
  };

  // Enviar correo individual al cliente
  const handleSendSingleLead = async () => {
    if (!activeLead) return;
    const confirm = window.confirm(
      `¿Confirmas el envío del correo real a:\n${activeLead.email}\nAsunto: ${activeLead.subject}?`
    );
    if (!confirm) return;

    setSingleSendLoading(true);
    updateActiveLead({ status: "sending" });

    try {
      const result = await sendOutreachEmailAction({
        email: activeLead.email,
        subject: activeLead.subject,
        greeting: activeLead.greeting,
        intro_and_need: activeLead.intro_and_need,
        pitch: activeLead.pitch,
        demo_url: activeLead.demo_url,
        image_url: activeLead.image_url,
        closing: activeLead.closing,
        signature: activeLead.signature,
      });

      if (result.success) {
        updateActiveLead({
          status: "sent",
          sentAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          errorMessage: undefined,
        });
      } else {
        updateActiveLead({
          status: "error",
          errorMessage: result.error || "Error de Resend",
        });
        alert(`Error: ${result.error}`);
      }
    } catch (err: any) {
      updateActiveLead({
        status: "error",
        errorMessage: err?.message || "Error al conectar",
      });
      alert(`Error: ${err?.message}`);
    } finally {
      setSingleSendLoading(false);
    }
  };

  // Enviar lote completo con 3.5 segundos de pausa
  const handleSendBatch = async () => {
    const pendingLeads = leads.filter((l) => l.status === "pending" || l.status === "error");
    if (pendingLeads.length === 0) {
      alert("No hay prospectos pendientes en este lote.");
      return;
    }

    const confirm = window.confirm(
      `¿Deseas enviar ${pendingLeads.length} correos pendientes ahora?\n\nSe enviarán uno por uno con 3.5 segundos de pausa entre cada uno para máxima entregabilidad.`
    );
    if (!confirm) return;

    setIsBatchSending(true);
    setBatchProgress({ current: 0, total: pendingLeads.length });

    for (let i = 0; i < pendingLeads.length; i++) {
      const lead = pendingLeads[i];
      setBatchProgress({ current: i + 1, total: pendingLeads.length });

      setLeads((prev) =>
        prev.map((l) => (l.id === lead.id ? { ...l, status: "sending" } : l))
      );

      try {
        const result = await sendOutreachEmailAction({
          email: lead.email,
          subject: lead.subject,
          greeting: lead.greeting,
          intro_and_need: lead.intro_and_need,
          pitch: lead.pitch,
          demo_url: lead.demo_url,
          image_url: lead.image_url,
          closing: lead.closing,
          signature: lead.signature,
        });

        if (result.success) {
          setLeads((prev) =>
            prev.map((l) =>
              l.id === lead.id
                ? {
                    ...l,
                    status: "sent",
                    sentAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    errorMessage: undefined,
                  }
                : l
            )
          );
        } else {
          setLeads((prev) =>
            prev.map((l) =>
              l.id === lead.id ? { ...l, status: "error", errorMessage: result.error } : l
            )
          );
        }
      } catch (err: any) {
        setLeads((prev) =>
          prev.map((l) =>
            l.id === lead.id ? { ...l, status: "error", errorMessage: err?.message } : l
          )
        );
      }

      if (i < pendingLeads.length - 1) {
        await new Promise((res) => setTimeout(res, 3500));
      }
    }

    setIsBatchSending(false);
    alert("¡Lote de prospección completado!");
  };

  // Filtrado de prospectos por búsqueda
  const filteredLeads = leads.filter((lead) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      lead.companyName.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.subject.toLowerCase().includes(q)
    );
  });

  const pendingCount = leads.filter((l) => l.status === "pending" || l.status === "error").length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#FF532A]/10 text-[#FF532A] text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Módulo de Prospección B2B</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Cold Outreach & Campañas CSV
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Sube tu CSV de prospectos, personaliza maquetas visuales y envía con Resend a la bandeja principal.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Subir CSV */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".csv"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-2 rounded-xl bg-[#202024] hover:bg-[#27272a] text-white border border-white/10 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-[#FF532A]" />
            <span>Subir Archivo CSV</span>
          </button>

          {/* Cambiar Demo a Todo el Lote */}
          <button
            type="button"
            disabled={leads.length === 0}
            onClick={() => setIsDemoModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#202024] hover:bg-[#27272a] text-white border border-white/10 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-40"
          >
            <LinkIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>Asignar Demo a Todo el Lote</span>
          </button>

          {/* Abrir Galería de Maquetas */}
          <button
            type="button"
            onClick={() => setIsGalleryOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#202024] hover:bg-[#27272a] text-white border border-white/10 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
            <span>Galería de Maquetas</span>
          </button>

          {/* Limpiar Lista de Leads */}
          {leads.length > 0 && (
            <button
              type="button"
              onClick={handleClearAllLeads}
              title="Borrar todos los prospectos de la lista"
              className="p-2 rounded-xl bg-[#202024] hover:bg-red-500/20 text-neutral-400 hover:text-red-400 border border-white/10 text-xs transition-all cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {/* Enviar Lote */}
          <button
            type="button"
            disabled={isBatchSending || pendingCount === 0}
            onClick={handleSendBatch}
            className="px-4 py-2 rounded-xl bg-[#FF532A] hover:bg-[#E5451D] disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-md shadow-[#FF532A]/20 cursor-pointer"
          >
            {isBatchSending ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>
                  Enviando ({batchProgress.current}/{batchProgress.total})...
                </span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Enviar Lote ({pendingCount} pendientes)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Test Send Feedback Alert */}
      {testSendSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{testSendSuccess}</span>
        </div>
      )}

      {/* Main 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Leads List (5 cols) */}
        <div className="lg:col-span-5 bg-[#141416] border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[740px]">
          {/* Search Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar prospecto o correo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#202024] border border-white/10 text-xs text-white placeholder-neutral-500 focus:border-[#FF532A] outline-hidden"
              />
            </div>
            <span className="text-xs font-semibold text-neutral-400 font-mono shrink-0">
              {leads.length} prospectos
            </span>
          </div>

          {/* Scrollable Leads List */}
          <div className="flex-1 overflow-y-auto divide-y divide-white/5 p-2 space-y-1">
            {filteredLeads.length === 0 ? (
              <div className="text-center py-16 text-neutral-500 text-xs px-4">
                <Upload className="w-8 h-8 mx-auto mb-2 opacity-40 text-neutral-400" />
                <p className="font-semibold text-neutral-400">No hay prospectos en la lista</p>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Sube tu archivo CSV generado con Gemini / Argon para comenzar.
                </p>
              </div>
            ) : (
              filteredLeads.map((lead) => {
                const isSelected = lead.id === activeLead?.id;
                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLeadId(lead.id)}
                    className={`p-3.5 rounded-xl cursor-pointer transition-all flex items-start justify-between gap-3 group ${
                      isSelected
                        ? "bg-[#FF532A]/15 border border-[#FF532A]/30 text-white"
                        : "hover:bg-white/5 text-neutral-300"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-white truncate">
                          {lead.companyName}
                        </span>
                        {lead.image_url && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30 shrink-0 font-semibold">
                            🖼️ Maqueta
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-neutral-400 truncate mb-1">
                        {lead.email}
                      </div>
                      <div className="text-[11px] text-neutral-500 truncate">
                        {lead.subject}
                      </div>
                    </div>

                    {/* Status & Delete action */}
                    <div className="shrink-0 flex items-center gap-2">
                      {lead.status === "sent" ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          <Check className="w-3 h-3" />
                          {lead.sentAt || "Enviado"}
                        </span>
                      ) : lead.status === "sending" ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          Enviando...
                        </span>
                      ) : lead.status === "error" ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                          <AlertCircle className="w-3 h-3" />
                          Error
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-400 bg-[#202024] px-2 py-0.5 rounded-full border border-white/10">
                          Pendiente
                        </span>
                      )}

                      {/* Botón borrar prospecto */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteLead(lead.id, lead.companyName);
                        }}
                        title="Eliminar prospecto"
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Editor & Live Preview (7 cols) */}
        <div className="lg:col-span-7 bg-[#141416] border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[740px]">
          {activeLead ? (
            <>
              {/* Top Bar: Tabs & Action Buttons */}
              <div className="p-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-[#18181b]">
                {/* Switcher Tab */}
                <div className="flex items-center gap-1 bg-[#202024] p-1 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setActiveTab("preview")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeTab === "preview"
                        ? "bg-[#FF532A] text-white shadow-sm"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Vista Previa del Correo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("editor")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeTab === "editor"
                        ? "bg-[#FF532A] text-white shadow-sm"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Editar Campos</span>
                  </button>
                </div>

                {/* Send Buttons for Active Lead */}
                <div className="flex items-center gap-2">
                  {/* Botón de prueba a Gmail */}
                  <button
                    type="button"
                    disabled={testSendLoading}
                    onClick={handleSendTestToMe}
                    title="Envía una prueba a stellarisdevsolutions@gmail.com"
                    className="px-3 py-1.5 rounded-xl bg-[#27272a] hover:bg-[#323238] text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all border border-white/10 cursor-pointer disabled:opacity-50"
                  >
                    {testSendLoading ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#FF532A]" />
                    ) : (
                      <Mail className="w-3.5 h-3.5 text-amber-400" />
                    )}
                    <span>Probar en mi Gmail</span>
                  </button>

                  {/* Enviar al cliente real */}
                  <button
                    type="button"
                    disabled={singleSendLoading || activeLead.status === "sending"}
                    onClick={handleSendSingleLead}
                    className="px-4 py-1.5 rounded-xl bg-[#FF532A] hover:bg-[#E5451D] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-[#FF532A]/20 cursor-pointer disabled:opacity-50"
                  >
                    {singleSendLoading ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    <span>Enviar a {activeLead.companyName}</span>
                  </button>
                </div>
              </div>

              {/* Tab 1: Editor de Campos */}
              {activeTab === "editor" && (
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                        Nombre de Empresa
                      </label>
                      <input
                        type="text"
                        value={activeLead.companyName}
                        onChange={(e) => updateActiveLead({ companyName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#202024] border border-white/10 text-white text-xs focus:border-[#FF532A] outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                        Correo del Cliente
                      </label>
                      <input
                        type="email"
                        value={activeLead.email}
                        onChange={(e) => updateActiveLead({ email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#202024] border border-white/10 text-white text-xs focus:border-[#FF532A] outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                      Asunto del Correo
                    </label>
                    <input
                      type="text"
                      value={activeLead.subject}
                      onChange={(e) => updateActiveLead({ subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#202024] border border-white/10 text-white text-xs focus:border-[#FF532A] outline-hidden font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                      Saludo
                    </label>
                    <input
                      type="text"
                      value={activeLead.greeting}
                      onChange={(e) => updateActiveLead({ greeting: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#202024] border border-white/10 text-white text-xs focus:border-[#FF532A] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                      Introducción y Detección de Falla (Auditoría Real)
                    </label>
                    <textarea
                      rows={3}
                      value={activeLead.intro_and_need}
                      onChange={(e) => updateActiveLead({ intro_and_need: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#202024] border border-white/10 text-white text-xs focus:border-[#FF532A] outline-hidden resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                      Propuesta / Pitch
                    </label>
                    <textarea
                      rows={2}
                      value={activeLead.pitch}
                      onChange={(e) => updateActiveLead({ pitch: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#202024] border border-white/10 text-white text-xs focus:border-[#FF532A] outline-hidden resize-none"
                    />
                  </div>

                  {/* Selector de Maqueta e Imagen */}
                  <div className="p-4 rounded-xl bg-[#202024] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-white flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-[#FF532A]" />
                        <span>Maqueta Visual Incrustada en el Correo</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => setIsGalleryOpen(true)}
                        className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold hover:bg-blue-500/30 transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Elegir o Subir desde Galería</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="block text-[11px] text-neutral-400 mb-1">
                          URL de la imagen (Mockup):
                        </span>
                        <input
                          type="text"
                          placeholder="https://.../mockup.jpg"
                          value={activeLead.image_url || ""}
                          onChange={(e) => updateActiveLead({ image_url: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#141416] border border-white/10 text-xs text-white placeholder-neutral-500 focus:border-[#FF532A] outline-hidden font-mono"
                        />
                      </div>
                      <div>
                        <span className="block text-[11px] text-neutral-400 mb-1">
                          Enlace a Demo en Vivo:
                        </span>
                        <input
                          type="text"
                          placeholder="https://dental.tiendastellaris.com"
                          value={activeLead.demo_url || ""}
                          onChange={(e) => updateActiveLead({ demo_url: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#141416] border border-white/10 text-xs text-white placeholder-neutral-500 focus:border-[#FF532A] outline-hidden font-mono"
                        />
                      </div>
                    </div>

                    {/* Previsualización miniatura de la imagen cargada */}
                    {activeLead.image_url && (
                      <div className="relative rounded-lg overflow-hidden border border-white/10 max-w-[200px] group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={activeLead.image_url}
                          alt="Mockup activo"
                          className="w-full h-24 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => updateActiveLead({ image_url: "" })}
                          className="absolute top-1 right-1 p-1 rounded-full bg-black/70 text-white hover:bg-red-500 transition-colors cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                      Cierre Suave (Call to Action)
                    </label>
                    <textarea
                      rows={2}
                      value={activeLead.closing}
                      onChange={(e) => updateActiveLead({ closing: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#202024] border border-white/10 text-white text-xs focus:border-[#FF532A] outline-hidden resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                      Firma
                    </label>
                    <textarea
                      rows={2}
                      value={activeLead.signature}
                      onChange={(e) => updateActiveLead({ signature: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#202024] border border-white/10 text-white text-xs focus:border-[#FF532A] outline-hidden font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Vista Previa Real del Correo */}
              {activeTab === "preview" && (
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0a0a0c]">
                  <div className="max-w-[580px] mx-auto bg-white rounded-2xl shadow-2xl border border-neutral-300 overflow-hidden text-neutral-900">
                    {/* Header */}
                    <div className="bg-[#f8f9fa] border-b border-neutral-200 px-6 py-4 space-y-1.5 text-xs font-mono">
                      <div>
                        <span className="text-neutral-500 font-sans font-semibold">De:</span>{" "}
                        <span className="font-bold text-[#FF532A]">
                          Stellaris Dev &lt;contact@tiendastellaris.com&gt;
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-500 font-sans font-semibold">Para:</span>{" "}
                        <span className="text-neutral-900 font-semibold">{activeLead.email}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 font-sans font-semibold">Responder a:</span>{" "}
                        <span className="text-neutral-600">stellarisdevsolutions@gmail.com</span>
                      </div>
                      <div className="pt-1 text-sm font-sans font-bold text-neutral-900">
                        {activeLead.subject}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 sm:p-8 space-y-4 font-sans text-[15px] leading-relaxed text-neutral-800">
                      <p className="font-semibold text-neutral-900 m-0">
                        {activeLead.greeting}
                      </p>

                      <p className="m-0 text-neutral-700 whitespace-pre-line">
                        {activeLead.intro_and_need}
                      </p>

                      <p className="m-0 text-neutral-700 whitespace-pre-line">
                        {activeLead.pitch}
                      </p>

                      {/* Mockup Preview Box */}
                      {activeLead.image_url ? (
                        <div className="my-6 text-center">
                          <div className="rounded-xl overflow-hidden border border-neutral-200 shadow-md inline-block bg-white">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={activeLead.image_url}
                              alt="Mockup de propuesta"
                              className="w-full max-w-[500px] h-auto block"
                            />
                          </div>

                          {activeLead.demo_url && (
                            <div className="mt-3">
                              <a
                                href={activeLead.demo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#FF532A] text-white text-xs font-bold shadow-md shadow-[#FF532A]/20 hover:bg-[#E5451D] transition-colors"
                              >
                                <span>Ver Demo en Vivo en Pantalla Completa</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 text-center text-xs text-neutral-500 my-4">
                          No hay imagen o maqueta asignada a este prospecto. Puedes elegir una de la galería.
                        </div>
                      )}

                      <p className="m-0 text-neutral-700 whitespace-pre-line">
                        {activeLead.closing}
                      </p>

                      {/* Signature */}
                      <div className="pt-4 border-t border-neutral-100 text-xs text-neutral-600 font-mono whitespace-pre-line">
                        {activeLead.signature}
                      </div>
                    </div>

                    {/* Footer Opt-out */}
                    <div className="px-6 py-3 bg-neutral-50 border-t border-neutral-100 text-center text-[10px] text-neutral-400">
                      Stellaris Dev Solutions • tiendastellaris.com • Si deseas no recibir más mensajes, responde con &quot;dar de baja&quot;.
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-neutral-500">
              <Upload className="w-12 h-12 mb-3 text-neutral-600 opacity-30" />
              <p className="text-sm font-semibold text-white">No hay ningún prospecto cargado</p>
              <p className="text-xs text-neutral-400 mt-1 max-w-sm">
                Sube tu archivo CSV para previsualizar los correos y maquetas.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Asignar Demo Link a Todo el Lote */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#171717] border border-white/15 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-emerald-400" />
                <span>Asignar Demo a Todo el Lote</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsDemoModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Ingresa el enlace de la demo en vivo. Se aplicará automáticamente a todos los{" "}
              <strong>{leads.length}</strong> prospectos del lote actual.
            </p>

            <form onSubmit={handleApplyDemoUrlToAll} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">
                  URL de la Demo en Vivo:
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://dental.tiendastellaris.com"
                  value={batchDemoUrl}
                  onChange={(e) => setBatchDemoUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#202024] border border-white/10 text-white text-xs focus:border-[#FF532A] outline-hidden font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDemoModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-neutral-300 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/20"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Aplicar a los {leads.length} prospectos</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Galería de Maquetas (Estilo exacto de Image 2) */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="bg-[#0b101b] border border-white/15 rounded-3xl max-w-5xl w-full h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#0e1424]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Galería de Maquetas Web
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Selecciona o sube maquetas optimizadas para personalizar los correos de prospección.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center bg-[#171f33] p-1 rounded-xl border border-white/10 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setGalleryTab("library")}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      galleryTab === "library"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Galería Web
                  </button>
                  <button
                    type="button"
                    onClick={() => setGalleryTab("upload")}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      galleryTab === "upload"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Subir Maqueta</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsGalleryOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            {galleryTab === "library" ? (
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
                {/* Left Side: Thumbnails Grid (7 cols) */}
                <div className="lg:col-span-7 p-6 border-r border-white/10 flex flex-col h-full overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Maquetas Disponibles
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[11px] font-semibold">
                        {assets.length} disponibles
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setGalleryTab("upload")}
                      className="px-3 py-1.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-blue-500/20"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Subir Nueva Maqueta</span>
                    </button>
                  </div>

                  {/* Grid of thumbnails */}
                  <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {assets.map((asset) => {
                      const isSelected = asset.id === selectedAsset?.id;
                      return (
                        <div
                          key={asset.id}
                          onClick={() => setSelectedAssetId(asset.id)}
                          className={`group relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all aspect-[4/3] bg-black/40 ${
                            isSelected
                              ? "border-blue-500 shadow-lg shadow-blue-500/20"
                              : "border-white/10 hover:border-white/30"
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={asset.url}
                            alt={asset.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />

                          {/* Blue Checkmark pill when selected */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}

                          {/* Category badge */}
                          <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] text-white font-semibold truncate">
                            {asset.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Side: Sidebar - DETALLES DE LA IMAGEN (5 cols) */}
                <div className="lg:col-span-5 p-6 bg-[#0e1424] flex flex-col justify-between h-full overflow-y-auto">
                  {selectedAsset ? (
                    <div className="space-y-4">
                      <div className="text-xs font-bold text-white uppercase tracking-wider">
                        Detalles de la Maqueta
                      </div>

                      {/* Large Preview */}
                      <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 aspect-[16/10] relative shadow-md">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={selectedAsset.url}
                          alt={selectedAsset.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Copy Direct URL */}
                      <button
                        type="button"
                        onClick={() => handleCopyUrl(selectedAsset.url)}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#171f33] hover:bg-[#1e2842] text-neutral-200 text-xs font-semibold border border-white/10 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        {copyFeedback ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">¡URL Copiada al Portapapeles!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-blue-400" />
                            <span>Copiar URL Directa</span>
                          </>
                        )}
                      </button>

                      {/* Editable Name & Demo Link */}
                      <div className="space-y-2.5 pt-1">
                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                            Nombre de la Maqueta:
                          </label>
                          <input
                            type="text"
                            value={selectedAsset.name}
                            onChange={(e) => updateSelectedAsset({ name: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-[#171f33] border border-white/10 text-white text-xs focus:border-blue-500 outline-hidden font-semibold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                            Link de la Demo en Vivo:
                          </label>
                          <input
                            type="url"
                            value={selectedAsset.demoUrl}
                            onChange={(e) => updateSelectedAsset({ demoUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-[#171f33] border border-white/10 text-white text-xs focus:border-blue-500 outline-hidden font-mono"
                          />
                        </div>
                      </div>

                      {/* Metadata Table */}
                      <div className="bg-[#171f33] border border-white/10 rounded-xl p-3.5 space-y-2 text-xs">
                        <div className="flex items-center justify-between text-neutral-400">
                          <span>Formato</span>
                          <span className="font-bold text-white font-mono">
                            {selectedAsset.format || "WEBP"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-neutral-400">
                          <span>Dimensiones</span>
                          <span className="font-bold text-white font-mono">
                            {selectedAsset.dimensions || "1200 × 800 px"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-neutral-400">
                          <span>Tamaño Optimizado</span>
                          <span className="font-bold text-emerald-400 font-mono">
                            {selectedAsset.sizeKb || "48.2 KB"}
                          </span>
                        </div>
                      </div>

                      {/* Eliminar de la galería */}
                      <button
                        type="button"
                        onClick={() => handleDeleteAsset(selectedAsset.id, selectedAsset.name)}
                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5 transition-colors cursor-pointer pt-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Eliminar de la galería</span>
                      </button>
                    </div>
                  ) : null}

                  {/* Bottom Apply Buttons */}
                  <div className="pt-4 space-y-2">
                    <button
                      type="button"
                      disabled={!selectedAsset || !activeLead}
                      onClick={handleApplyAssetToCurrent}
                      className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Usar Esta Imagen</span>
                    </button>

                    <button
                      type="button"
                      disabled={!selectedAsset || leads.length === 0}
                      onClick={handleApplyAssetToAll}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-200 text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Aplicar a Todo el Lote ({leads.length} prospectos)</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Tab 2: Formulario para Subir Maqueta con Optimización */
              <div className="flex-1 p-8 max-w-xl mx-auto w-full flex flex-col justify-center space-y-5">
                <div className="text-center space-y-1">
                  <h4 className="text-lg font-bold text-white">Subir Nueva Maqueta Optimizada</h4>
                  <p className="text-xs text-neutral-400">
                    La imagen se comprime automáticamente a WebP de alta resolución (menos de 60 KB).
                  </p>
                </div>

                <div className="space-y-4 bg-[#141c30] p-6 rounded-2xl border border-white/10">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Nombre de la Maqueta <span className="text-[#FF532A]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Dental Studio Houston HD"
                      value={newAssetName}
                      onChange={(e) => setNewAssetName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1424] border border-white/10 text-white text-xs focus:border-blue-500 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Categoría / Nicho
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Odontología / Restaurantes / Abogados"
                      value={newAssetCategory}
                      onChange={(e) => setNewAssetCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1424] border border-white/10 text-white text-xs focus:border-blue-500 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Enlace a la Demo en Vivo
                    </label>
                    <input
                      type="url"
                      placeholder="https://dental.tiendastellaris.com"
                      value={newAssetDemoUrl}
                      onChange={(e) => setNewAssetDemoUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1424] border border-white/10 text-white text-xs focus:border-blue-500 outline-hidden font-mono"
                    />
                  </div>

                  {/* File Upload Dropzone */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Archivo de Imagen
                    </label>
                    <input
                      type="file"
                      ref={modalUploadInputRef}
                      onChange={handleOptimizeAndUploadAsset}
                      accept="image/*"
                      className="hidden"
                    />

                    <div
                      onClick={() => modalUploadInputRef.current?.click()}
                      className="border-2 border-dashed border-white/20 hover:border-blue-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-[#0e1424] space-y-2"
                    >
                      {optimizingUpload ? (
                        <div className="flex flex-col items-center justify-center py-2 text-blue-400">
                          <RefreshCw className="w-8 h-8 animate-spin mb-2" />
                          <span className="text-xs font-bold">Optimizando y Comprimiendo a WebP...</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 mx-auto text-blue-400" />
                          <div className="text-xs font-bold text-white">
                            Haz clic para seleccionar la imagen
                          </div>
                          <div className="text-[11px] text-neutral-400">
                            PNG, JPG o WEBP. Se optimizará automáticamente sin perder resolución.
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setGalleryTab("library")}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Volver a la Galería
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
