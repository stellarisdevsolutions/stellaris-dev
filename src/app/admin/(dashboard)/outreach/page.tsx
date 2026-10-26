"use client";

import React, { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import {
  Upload,
  FileSpreadsheet,
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
  Copy,
  Info,
  Clock,
  AlertTriangle,
  History,
  Lock,
  Save,
  CloudUpload,
} from "lucide-react";
import {
  sendOutreachEmailAction,
  sendTestOutreachEmailAction,
  deleteBlobsAction,
  getOutreachHistoryAction,
  checkOutreachDuplicatesAction,
  deleteOutreachHistoryAction,
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

// Historial permanente de enviados
interface SentRecord {
  id: string;
  companyName: string;
  email: string;
  subject: string;
  sentAt: string;
  demoUrl?: string;
}

// Maqueta de la galería
interface MockupAsset {
  id: string;
  name: string;
  category: string;
  url: string;
  demoUrl: string;
  format?: string;
  dimensions?: string;
  sizeKb?: string | number;
}

const DEFAULT_ASSETS: MockupAsset[] = [
  {
    id: "dental-hd",
    name: "BrightSmile Dental Clinic HD",
    category: "Clínicas & Odontología",
    url: "https://dental.tiendastellaris.com/BrightSmile_Dental_Demo_HD.jpg",
    demoUrl: "https://dental.tiendastellaris.com",
    format: "WEBP",
    dimensions: "1200 × 750 px",
    sizeKb: "45 KB",
  },
  {
    id: "restaurant-pro",
    name: "Gourmet Bistro & Reservas Móviles",
    category: "Restaurantes & Bares",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://restaurante.tiendastellaris.com",
    format: "WEBP",
    dimensions: "1200 × 800 px",
    sizeKb: "48 KB",
  },
  {
    id: "legal-firm",
    name: "Apex Corporate Law & Consultoría",
    category: "Abogados & Legal",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://legal.tiendastellaris.com",
    format: "WEBP",
    dimensions: "1200 × 720 px",
    sizeKb: "52 KB",
  },
  {
    id: "ecommerce-boutique",
    name: "OmniStore E-Commerce & Catálogo",
    category: "Tiendas & Retail",
    url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://tienda.tiendastellaris.com",
    format: "WEBP",
    dimensions: "1200 × 800 px",
    sizeKb: "58 KB",
  },
  {
    id: "saas-dashboard",
    name: "CloudAnalytics B2B SaaS Platform",
    category: "SaaS & Software",
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://saas.tiendastellaris.com",
    format: "WEBP",
    dimensions: "1200 × 760 px",
    sizeKb: "49 KB",
  },
];

// Prospectos dentales del CSV para carga rápida si la lista está vacía
const SAMPLE_DENTAL_LEADS: Omit<LeadItem, "id" | "status">[] = [
  {
    companyName: "Fiesta Clínica Dental",
    email: "info@fiestaclinicadental.com",
    subject: "Modernización web y reservas móviles para Fiesta Clínica Dental",
    greeting: "Hola equipo de Fiesta Clínica Dental,",
    intro_and_need:
      "Vi su clínica dental en el norte de Houston / Spring y la excelente atención que brindan a la comunidad. Al revisar su perfil en Google Maps, noté que el enlace a su página web muestra un aviso de seguridad antes de entrar y que el diseño en celulares podría ser mucho más ágil para que los pacientes reserven cita en segundos.",
    pitch:
      "En Stellaris Dev Solutions desarrollamos sitios web modernos, rápidos y con agendamiento en línea diseñados especialmente para clínicas dentales.",
    demo_url: "https://dental.tiendastellaris.com",
    image_url:
      "https://dental.tiendastellaris.com/BrightSmile_Dental_Demo_HD.jpg",
    closing:
      "Sé que usted y su equipo están ocupados con pacientes todo el día, así que no hace falta hacer llamadas. Si les gusta este estilo, solo respondan a este correo y con gusto les envío una vista previa adaptada para Fiesta Clínica Dental, junto con opciones simples de precios.",
    signature:
      "Saludos cordiales,\n\nStellaris Dev Solutions\nstellarisdevsolutions@gmail.com",
  },
  {
    companyName: "Apex Dental Houston",
    email: "info.apexdental@gmail.com",
    subject: "Modernización web y citas en línea para Apex Dental Houston",
    greeting: "Hola equipo de Apex Dental,",
    intro_and_need:
      "Encontré su clínica dental en Gessner Rd en Houston y vi la gran trayectoria que tienen atendiendo a las familias de la zona. Al visitar su sitio web desde Google Maps, noté que aparece una advertencia del navegador antes de entrar y que las consultas aún se manejan por correo en lugar de un agendador móvil directo.",
    pitch:
      "En Stellaris Dev Solutions desarrollamos sitios web modernos, rápidos y con agendamiento en línea diseñados especialmente para clínicas dentales.",
    demo_url: "https://dental.tiendastellaris.com",
    image_url:
      "https://dental.tiendastellaris.com/BrightSmile_Dental_Demo_HD.jpg",
    closing:
      "Sé que usted y su equipo están ocupados con pacientes todo el día, así que no hace falta hacer llamadas. Si les gusta este estilo, solo respondan a este correo y con gusto les envío una vista previa personalizada para Apex Dental, junto con opciones simples de precios.",
    signature:
      "Saludos cordiales,\n\nStellaris Dev Solutions\nstellarisdevsolutions@gmail.com",
  },
  {
    companyName: "Dental Bright Houston",
    email: "dentalbrighttx@gmail.com",
    subject: "Modernización web y reservas en línea para Dental Bright Houston",
    greeting: "Hola Dr. Falahat y equipo de Dental Bright,",
    intro_and_need:
      "Encontré su clínica dental en la calle Hillcroft en Houston. Al visitar su sitio web, noté algunos botones de plantilla sin configurar en el menú principal y que las consultas se dirigen a un correo de Gmail en lugar de contar con reserva de citas directa desde el celular.",
    pitch:
      "En Stellaris Dev Solutions desarrollamos sitios web modernos, rápidos y con agendamiento en línea diseñados especialmente para clínicas dentales.",
    demo_url: "https://dental.tiendastellaris.com",
    image_url:
      "https://dental.tiendastellaris.com/BrightSmile_Dental_Demo_HD.jpg",
    closing:
      "Sé que usted y su equipo están ocupados con pacientes todo el día, así que no hace falta hacer llamadas. Si les gusta este estilo, solo respondan a este correo y con gusto les envío una vista previa personalizada para Dental Bright, junto con opciones simples de precios.",
    signature:
      "Saludos cordiales,\n\nStellaris Dev Solutions\nstellarisdevsolutions@gmail.com",
  },
];

/**
 * Optimiza y comprime una imagen local a formato WebP ligero (máx 1200px)
 * sin perder calidad visual para envíos de correo ultrarrápidos.
 */
async function optimizeImageToWebP(file: File): Promise<{
  blob: Blob;
  dimensions: string;
  sizeKb: string;
}> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const canvas = document.createElement("canvas");
      const maxW = 1200;
      let width = img.width;
      let height = img.height;

      if (width > maxW) {
        height = Math.round((height * maxW) / width);
        width = maxW;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context no soportado"));
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const sizeKb = (blob.size / 1024).toFixed(1) + " KB";
            const dimensions = `${width} × ${height} px`;
            resolve({ blob, dimensions, sizeKb });
          } else {
            reject(new Error("Error al convertir a WebP"));
          }
        },
        "image/webp",
        0.85
      );
    };

    img.onerror = () => reject(new Error("No se pudo cargar la imagen"));
    img.src = objectUrl;
  });
}

export default function OutreachPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [sentHistory, setSentHistory] = useState<SentRecord[]>([]);
  const [activeView, setActiveView] = useState<"queue" | "history">("queue");
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "editor">("preview");
  const [searchQuery, setSearchQuery] = useState("");

  // Galería de maquetas
  const [assets, setAssets] = useState<MockupAsset[]>(DEFAULT_ASSETS);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryTab, setGalleryTab] = useState<"gallery" | "upload">("gallery");
  const [galleryOrigin, setGalleryOrigin] = useState<"header" | "lead">("header");
  const [selectedAssetId, setSelectedAssetId] = useState<string>(DEFAULT_ASSETS[0].id);
  const [gallerySearch, setGallerySearch] = useState("");
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Edición en panel derecho
  const [isEditingAsset, setIsEditingAsset] = useState(false);
  const [assetDraft, setAssetDraft] = useState({ name: "", category: "", demoUrl: "" });

  // Pestaña Subir Nueva Maqueta (Workflow sin archivos fantasma)
  const [pendingUploadFile, setPendingUploadFile] = useState<File | null>(null);
  const [pendingUploadBlob, setPendingUploadBlob] = useState<Blob | null>(null);
  const [pendingUploadPreview, setPendingUploadPreview] = useState<string | null>(null);
  const [pendingDimensions, setPendingDimensions] = useState("");
  const [pendingSizeKb, setPendingSizeKb] = useState("");
  const [newMockupName, setNewMockupName] = useState("");
  const [newMockupCategory, setNewMockupCategory] = useState("");
  const [newMockupDemoUrl, setNewMockupDemoUrl] = useState("");
  const [isSubmittingNewMockup, setIsSubmittingNewMockup] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modales tipo SweetAlert
  const [swalDeleteAsset, setSwalDeleteAsset] = useState<MockupAsset | null>(null);
  const [swalBatchSend, setSwalBatchSend] = useState(false);
  const [swalSingleSend, setSwalSingleSend] = useState<LeadItem | null>(null);
  const [swalTestSend, setSwalTestSend] = useState<LeadItem | null>(null);
  const [swalClearBatch, setSwalClearBatch] = useState(false);

  // Bloquear el scroll del fondo cuando cualquier modal esté abierto
  useEffect(() => {
    const isAnyModalOpen =
      isGalleryOpen ||
      swalBatchSend ||
      swalClearBatch ||
      !!swalDeleteAsset ||
      !!swalSingleSend ||
      !!swalTestSend;

    if (isAnyModalOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [
    isGalleryOpen,
    swalBatchSend,
    swalClearBatch,
    swalDeleteAsset,
    swalSingleSend,
    swalTestSend,
  ]);

  // Estados de envío
  const [isBatchSending, setIsBatchSending] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0 });
  const [testSendLoading, setTestSendLoading] = useState(false);
  const [singleSendLoading, setSingleSendLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Cargar muestra dental inicial
  const loadSampleData = () => {
    const formatted: LeadItem[] = SAMPLE_DENTAL_LEADS.map((item, idx) => ({
      ...item,
      id: `sample-${idx + 1}-${Date.now()}`,
      status: "pending",
    }));
    setLeads(formatted);
    setSelectedLeadId(formatted[0].id);
  };

  // Cargar datos persistentes
  useEffect(() => {
    // 1. Leads pendientes
    const savedLeads = localStorage.getItem("stellaris_outreach_leads_v2");
    if (savedLeads) {
      try {
        const parsed = JSON.parse(savedLeads);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLeads(parsed);
          setSelectedLeadId(parsed[0].id);
        }
      } catch (err) {
        console.warn("Error loading leads:", err);
      }
    } else {
      loadSampleData();
    }

    // 2. Historial de enviados (Cargado desde la Base de Datos PostgreSQL)
    getOutreachHistoryAction()
      .then((records) => {
        if (records && records.length > 0) {
          const mapped: SentRecord[] = records.map((r) => ({
            id: String(r.id),
            companyName: r.companyName,
            email: r.email,
            subject: r.subject,
            sentAt: new Date(r.sentAt).toLocaleString([], {
              dateStyle: "short",
              timeStyle: "short",
            }),
            demoUrl: r.demoUrl || undefined,
          }));
          setSentHistory(mapped);
        } else {
          const savedHistory = localStorage.getItem("stellaris_outreach_history");
          if (savedHistory) {
            try {
              const parsed = JSON.parse(savedHistory);
              if (Array.isArray(parsed)) setSentHistory(parsed);
            } catch (err) {
              console.warn("Error loading history:", err);
            }
          }
        }
      })
      .catch(() => {
        const savedHistory = localStorage.getItem("stellaris_outreach_history");
        if (savedHistory) {
          try {
            const parsed = JSON.parse(savedHistory);
            if (Array.isArray(parsed)) setSentHistory(parsed);
          } catch (err) {
            console.warn("Error loading history:", err);
          }
        }
      });

    // 3. Galería de maquetas
    const savedAssets = localStorage.getItem("stellaris_outreach_assets");
    if (savedAssets) {
      try {
        const parsed = JSON.parse(savedAssets);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAssets(parsed);
          setSelectedAssetId(parsed[0].id);
        }
      } catch (err) {
        console.warn("Error loading assets:", err);
      }
    }
  }, []);

  // Guardar leads pendientes
  useEffect(() => {
    localStorage.setItem("stellaris_outreach_leads_v2", JSON.stringify(leads));
  }, [leads]);

  // Guardar galería
  useEffect(() => {
    localStorage.setItem("stellaris_outreach_assets", JSON.stringify(assets));
  }, [assets]);

  // Lead activo seleccionado
  const activeLead = leads.find((l) => l.id === selectedLeadId) || leads[0] || null;

  // Maqueta seleccionada en la galería
  const selectedAsset =
    assets.find((a) => a.id === selectedAssetId) || assets[0] || null;

  // Sincronizar borrador al cambiar de maqueta seleccionada
  useEffect(() => {
    if (selectedAsset) {
      setAssetDraft({
        name: selectedAsset.name,
        category: selectedAsset.category,
        demoUrl: selectedAsset.demoUrl,
      });
      setIsEditingAsset(false);
    }
  }, [selectedAssetId, selectedAsset]);

  // Parsear CSV subido
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
              greeting:
                row.greeting?.trim() || `Hola equipo de ${company || "su negocio"},`,
              intro_and_need: row.intro_and_need?.trim() || "",
              pitch:
                row.pitch?.trim() ||
                "En Stellaris Dev desarrollamos sitios web modernos, rápidos y optimizados para dispositivos móviles.",
              demo_url: row.demo_url?.trim() || "",
              image_url: row.image_url?.trim() || "",
              closing:
                row.closing?.trim() ||
                "Si les interesa ver más detalles, solo respondan a este correo y con gusto les envío una propuesta sin compromiso.",
              signature:
                row.signature?.trim() ||
                "Saludos cordiales,\n\nStellaris Dev Solutions\nstellarisdevsolutions@gmail.com",
              status: "pending",
            };
          });

        if (newLeads.length === 0) {
          alert("No se encontraron correos válidos en el archivo.");
          return;
        }

        // Comprobación automática de duplicados contra la base de datos
        const emailsToCheck = newLeads.map((l) => l.email);
        checkOutreachDuplicatesAction(emailsToCheck)
          .then((duplicates) => {
            if (duplicates && duplicates.length > 0) {
              const dupSample = duplicates.slice(0, 3).join(", ");
              const extraCount = duplicates.length > 3 ? ` y ${duplicates.length - 3} más` : "";
              const shouldOmit = window.confirm(
                `⚠️ Se detectaron ${duplicates.length} correos que ya habían sido contactados anteriormente en tu base de datos (${dupSample}${extraCount}).\n\n¿Deseas omitirlos automáticamente para no repetir prospectos?`
              );
              if (shouldOmit) {
                const uniqueLeads = newLeads.filter(
                  (l) => !duplicates.includes(l.email.toLowerCase())
                );
                if (uniqueLeads.length === 0) {
                  alert("Todos los prospectos del archivo ya fueron contactados anteriormente.");
                  return;
                }
                setLeads(uniqueLeads);
                setSelectedLeadId(uniqueLeads[0].id);
                setActiveView("queue");
                showToast(`¡Listo! Se cargaron ${uniqueLeads.length} prospectos nuevos.`);
                return;
              }
            }
            setLeads(newLeads);
            setSelectedLeadId(newLeads[0].id);
            setActiveView("queue");
            showToast(`¡Listo! Se cargaron ${newLeads.length} prospectos en la cola.`);
          })
          .catch(() => {
            setLeads(newLeads);
            setSelectedLeadId(newLeads[0].id);
            setActiveView("queue");
            showToast(`¡Listo! Se cargaron ${newLeads.length} prospectos en la cola.`);
          });
      },
      error: (error) => {
        console.error("Error CSV:", error);
        alert("Error al leer el CSV. Asegúrate de que use formato delimitado por comas.");
      },
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Paso 1: Selección y optimización en memoria de la imagen para la maqueta
  const handleSelectMockupFile = async (file: File) => {
    try {
      const { blob, dimensions, sizeKb } = await optimizeImageToWebP(file);
      const previewUrl = URL.createObjectURL(blob);
      const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, " ").trim();

      setPendingUploadFile(file);
      setPendingUploadBlob(blob);
      setPendingUploadPreview(previewUrl);
      setPendingDimensions(dimensions);
      setPendingSizeKb(sizeKb);

      setNewMockupName(cleanName);
      setNewMockupCategory("Personalizados");
      setNewMockupDemoUrl(activeLead?.demo_url || "https://dental.tiendastellaris.com");
    } catch (err: any) {
      alert("No se pudo procesar la imagen: " + err?.message);
    }
  };

  // Paso 2: Cancelar la subida sin dejar archivos fantasma
  const handleCancelNewMockup = () => {
    if (pendingUploadPreview) {
      URL.revokeObjectURL(pendingUploadPreview);
    }
    setPendingUploadFile(null);
    setPendingUploadBlob(null);
    setPendingUploadPreview(null);
    setNewMockupName("");
    setNewMockupCategory("");
    setNewMockupDemoUrl("");
    setGalleryTab("gallery");
  };

  // Cerrar modal de galería limpiando estado de subida (evita imágenes fantasma)
  const handleCloseGalleryModal = () => {
    handleCancelNewMockup();
    setIsEditingAsset(false);
    setIsGalleryOpen(false);
  };

  // Paso 3: Guardar y subir a Vercel Blob únicamente al confirmar el registro
  const handleConfirmRegisterMockup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingUploadBlob || !newMockupName.trim() || !newMockupDemoUrl.trim()) {
      alert("Por favor completa los campos requeridos (*).");
      return;
    }

    setIsSubmittingNewMockup(true);

    try {
      const cleanSlug = newMockupName.toLowerCase().replace(/[^a-z0-9_-]/g, "_");
      const filename = `${cleanSlug}-${Date.now()}.webp`;

      // Subir a Vercel Blob
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(filename)}`, {
        method: "POST",
        body: pendingUploadBlob,
      });

      let finalUrl = "";
      if (response.ok) {
        const data = await response.json();
        finalUrl = data.url;
      } else {
        // Fallback a Base64 si el token no está configurado
        finalUrl = await new Promise<string>((res) => {
          const reader = new FileReader();
          reader.onload = () => res(reader.result as string);
          reader.readAsDataURL(pendingUploadBlob);
        });
      }

      const newAsset: MockupAsset = {
        id: `mockup-${Date.now()}`,
        name: newMockupName.trim(),
        category: newMockupCategory.trim() || "Personalizados",
        url: finalUrl,
        demoUrl: newMockupDemoUrl.trim(),
        format: "WEBP",
        dimensions: pendingDimensions,
        sizeKb: pendingSizeKb,
      };

      setAssets((prev) => [newAsset, ...prev]);
      setSelectedAssetId(newAsset.id);

      // Limpiar estados de subida
      handleCancelNewMockup();
      setGalleryTab("gallery");
      showToast("✅ ¡Maqueta registrada con éxito en la galería!");
    } catch (err: any) {
      alert("Error al registrar la maqueta: " + err?.message);
    } finally {
      setIsSubmittingNewMockup(false);
    }
  };

  // Guardar edición de datos de la maqueta
  const handleSaveAssetEdit = () => {
    if (!selectedAsset) return;
    if (!assetDraft.name.trim() || !assetDraft.demoUrl.trim()) {
      alert("El nombre y el enlace de la demo no pueden estar vacíos.");
      return;
    }

    setAssets((prev) =>
      prev.map((a) =>
        a.id === selectedAsset.id
          ? {
              ...a,
              name: assetDraft.name.trim(),
              category: assetDraft.category.trim() || "General",
              demoUrl: assetDraft.demoUrl.trim(),
            }
          : a
      )
    );

    setIsEditingAsset(false);
    showToast("✅ ¡Datos de la maqueta guardados exitosamente!");
  };

  // Eliminar maqueta con confirmación Swal y borrado físico de Blob
  const handleConfirmDeleteAsset = async () => {
    if (!swalDeleteAsset) return;
    const assetToDelete = swalDeleteAsset;
    setSwalDeleteAsset(null);

    // 1. Borrar de la lista local
    setAssets((prev) => prev.filter((a) => a.id !== assetToDelete.id));

    // 2. Si es URL de Vercel Blob, borrar físicamente en la nube
    if (assetToDelete.url.includes(".blob.vercel-storage.com")) {
      try {
        await deleteBlobsAction([assetToDelete.url]);
      } catch (err) {
        console.warn("Error borrando blob físico:", err);
      }
    }

    const remaining = assets.filter((a) => a.id !== assetToDelete.id);
    if (remaining.length > 0) {
      setSelectedAssetId(remaining[0].id);
    }
    showToast(`🗑️ Maqueta "${assetToDelete.name}" eliminada de forma permanente.`);
  };

  // Actualizar lead activo
  const updateActiveLead = (fields: Partial<LeadItem>) => {
    if (!activeLead) return;
    setLeads((prev) =>
      prev.map((lead) => (lead.id === activeLead.id ? { ...lead, ...fields } : lead))
    );
  };

  // Aplicar maqueta solo al prospecto activo
  const applyAssetToCurrentLead = () => {
    if (!selectedAsset || !activeLead) return;
    updateActiveLead({
      image_url: selectedAsset.url,
      demo_url: selectedAsset.demoUrl || activeLead.demo_url,
    });
    setIsGalleryOpen(false);
    showToast(`✅ Maqueta asignada a ${activeLead.companyName}`);
  };

  // Aplicar maqueta a todo el lote
  const applyAssetToAllLeads = () => {
    if (!selectedAsset) return;
    setLeads((prev) =>
      prev.map((l) => ({
        ...l,
        image_url: selectedAsset.url,
        demo_url: selectedAsset.demoUrl || l.demo_url,
      }))
    );
    setIsGalleryOpen(false);
    showToast(`✅ Se aplicó "${selectedAsset.name}" a todo el lote (${leads.length} prospectos)`);
  };

  // Enviar prueba a mi Gmail tras confirmación con Swal
  const handleExecuteTestSend = async (targetLead: LeadItem) => {
    setTestSendLoading(true);

    try {
      const result = await sendTestOutreachEmailAction(
        {
          email: targetLead.email,
          subject: targetLead.subject,
          greeting: targetLead.greeting,
          intro_and_need: targetLead.intro_and_need,
          pitch: targetLead.pitch,
          demo_url: targetLead.demo_url,
          image_url: targetLead.image_url,
          closing: targetLead.closing,
          signature: targetLead.signature,
        },
        "stellarisdevsolutions@gmail.com"
      );

      if (result.success) {
        showToast("📬 ¡Prueba enviada a stellarisdevsolutions@gmail.com! Revisa tu bandeja.");
      } else {
        alert(`Error al enviar prueba: ${result.error || "Verifica tu RESEND_API_KEY"}`);
      }
    } catch (err: any) {
      alert(`Error: ${err?.message || "Ocurrió un error inesperado"}`);
    } finally {
      setTestSendLoading(false);
    }
  };

  // Enviar individual (tras confirmar con Swal)
  const handleExecuteSingleSend = async () => {
    if (!swalSingleSend) return;
    const targetLead = swalSingleSend;
    setSwalSingleSend(null);
    setSingleSendLoading(true);

    try {
      const result = await sendOutreachEmailAction({
        email: targetLead.email,
        companyName: targetLead.companyName,
        subject: targetLead.subject,
        greeting: targetLead.greeting,
        intro_and_need: targetLead.intro_and_need,
        pitch: targetLead.pitch,
        demo_url: targetLead.demo_url,
        image_url: targetLead.image_url,
        closing: targetLead.closing,
        signature: targetLead.signature,
      });

      if (result.success) {
        const timeNow = new Date().toLocaleString([], {
          dateStyle: "short",
          timeStyle: "short",
        });

        // 1. Añadir al historial permanente
        setSentHistory((prev) => [
          {
            id: targetLead.id,
            companyName: targetLead.companyName,
            email: targetLead.email,
            subject: targetLead.subject,
            sentAt: timeNow,
            demoUrl: targetLead.demo_url,
          },
          ...prev,
        ]);

        // 2. Desaparecer de la lista activa de pendientes
        setLeads((prev) => {
          const remaining = prev.filter((l) => l.id !== targetLead.id);
          if (remaining.length > 0) {
            setSelectedLeadId(remaining[0].id);
          } else {
            setSelectedLeadId(null);
          }
          return remaining;
        });

        showToast(`✉️ Correo enviado con éxito a ${targetLead.companyName}`);
      } else {
        alert(`Error al enviar correo: ${result.error}`);
      }
    } catch (err: any) {
      alert(`Error al enviar: ${err?.message}`);
    } finally {
      setSingleSendLoading(false);
    }
  };

  // Enviar lote completo (tras confirmar con Swal)
  const handleExecuteBatchSend = async () => {
    setSwalBatchSend(false);
    if (leads.length === 0) return;

    setIsBatchSending(true);
    setBatchProgress({ current: 0, total: leads.length });

    const leadsSnapshot = [...leads];
    const successfullySentIds: string[] = [];
    const newHistoryRecords: SentRecord[] = [];

    for (let i = 0; i < leadsSnapshot.length; i++) {
      const lead = leadsSnapshot[i];
      setBatchProgress({ current: i + 1, total: leadsSnapshot.length });

      try {
        const result = await sendOutreachEmailAction({
          email: lead.email,
          companyName: lead.companyName,
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
          successfullySentIds.push(lead.id);
          newHistoryRecords.push({
            id: lead.id,
            companyName: lead.companyName,
            email: lead.email,
            subject: lead.subject,
            sentAt: new Date().toLocaleString([], {
              dateStyle: "short",
              timeStyle: "short",
            }),
            demoUrl: lead.demo_url,
          });
        }
      } catch (err) {
        console.error("Fallo al enviar a", lead.email, err);
      }

      // Pausa humana de 3.5 segundos entre envíos
      if (i < leadsSnapshot.length - 1) {
        await new Promise((res) => setTimeout(res, 3500));
      }
    }

    // Actualizar historial permanente
    setSentHistory((prev) => [...newHistoryRecords, ...prev]);

    // Eliminar de la cola activa solo los enviados exitosamente
    setLeads((prev) => {
      const remaining = prev.filter((l) => !successfullySentIds.includes(l.id));
      if (remaining.length > 0) {
        setSelectedLeadId(remaining[0].id);
      } else {
        setSelectedLeadId(null);
      }
      return remaining;
    });

    setIsBatchSending(false);
    showToast(`🚀 ¡Lote completado! Se enviaron ${successfullySentIds.length} correos.`);
  };

  // Eliminar un prospecto individual de la cola
  const handleDeleteLead = (id: string) => {
    setLeads((prev) => {
      const remaining = prev.filter((l) => l.id !== id);
      if (selectedLeadId === id) {
        setSelectedLeadId(remaining.length > 0 ? remaining[0].id : null);
      }
      return remaining;
    });
    showToast("🗑️ Prospecto retirado de la cola");
  };

  // Vaciar la cola completa del lote
  const handleConfirmClearBatch = () => {
    setLeads([]);
    setSelectedLeadId(null);
    setSwalClearBatch(false);
    showToast("🗑️ Se vació la cola del lote con éxito");
  };

  // Filtrar maquetas por búsqueda
  const filteredAssets = assets.filter(
    (a) =>
      a.name.toLowerCase().includes(gallerySearch.toLowerCase()) ||
      a.category.toLowerCase().includes(gallerySearch.toLowerCase())
  );

  // Filtrar prospectos por búsqueda
  const filteredLeads = leads.filter(
    (lead) =>
      searchQuery === "" ||
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Toast flotante */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-70 bg-[#171717] border border-[#E6FF2A]/50 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-5 h-5 text-[#E6FF2A] shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Header con EXACTAMENTE 3 botones principales */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#E6FF2A]/10 text-[#E6FF2A] text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Módulo de Prospección B2B</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Cold Outreach & Campañas
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Prospección con CSV, maquetas de alta resolución en WebP y envíos con Resend.
          </p>
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-wrap items-center gap-3">
          {/* 1. Cargar CSV */}
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
            className="px-4 py-2.5 rounded-xl bg-[#202024] hover:bg-[#27272a] text-white border border-white/10 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:border-[#E6FF2A]/40"
          >
            <Upload className="w-4 h-4 text-[#E6FF2A]" />
            <span>Subir Archivo CSV</span>
          </button>

          {/* 2. Galería de Maquetas */}
          <button
            type="button"
            onClick={() => {
              setGalleryOrigin("header");
              setGalleryTab("gallery");
              setIsGalleryOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-[#202024] hover:bg-[#27272a] text-white border border-white/10 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:border-[#E6FF2A]/40"
          >
            <ImageIcon className="w-4 h-4 text-[#E6FF2A]" />
            <span>Galería de Maquetas</span>
          </button>

          {/* 3. Vaciar Lote */}
          {leads.length > 0 && (
            <button
              type="button"
              disabled={isBatchSending}
              onClick={() => setSwalClearBatch(true)}
              className="px-4 py-2.5 rounded-xl bg-[#202024] hover:bg-red-500/10 text-neutral-300 hover:text-red-400 border border-white/10 hover:border-red-500/30 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm disabled:opacity-50"
              title="Vaciar todos los prospectos de la cola actual"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
              <span>Vaciar Lote</span>
            </button>
          )}

          {/* 4. Enviar Lote */}
          <button
            type="button"
            disabled={isBatchSending || leads.length === 0}
            onClick={() => setSwalBatchSend(true)}
            className="px-5 py-2.5 rounded-xl bg-[#E6FF2A] hover:bg-[#D8F219] disabled:opacity-50 text-[#0C4651] text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-[#E6FF2A]/25 cursor-pointer"
          >
            {isBatchSending ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>
                  Enviando ({batchProgress.current}/{batchProgress.total})...
                </span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Enviar Lote ({leads.length})</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Toggle View: Cola de Pendientes vs Historial de Enviados */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#141416] border border-white/10 text-xs">
          <button
            type="button"
            onClick={() => setActiveView("queue")}
            className={`px-3.5 py-1.5 rounded-lg font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeView === "queue"
                ? "bg-[#E6FF2A] text-[#0C4651] font-bold shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Cola de Envío ({leads.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView("history")}
            className={`px-3.5 py-1.5 rounded-lg font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeView === "history"
                ? "bg-[#E6FF2A] text-[#0C4651] font-bold shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Historial de Enviados ({sentHistory.length})</span>
          </button>
        </div>

        {activeView === "queue" && (
          <div className="flex items-center gap-3">
            {leads.length > 0 && (
              <button
                type="button"
                disabled={isBatchSending}
                onClick={() => setSwalClearBatch(true)}
                className="text-xs text-neutral-400 hover:text-red-400 flex items-center gap-1.5 font-medium transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Vaciar lote ({leads.length})</span>
              </button>
            )}
            {leads.length === 0 && (
              <button
                type="button"
                onClick={loadSampleData}
                className="text-xs text-[#E6FF2A] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Cargar prospectos de prueba (dentistas)</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* VIEW 1: COLA DE PROSPECTOS PENDIENTES */}
      {activeView === "queue" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Columna Izquierda: Lista de prospectos pendientes (5 cols) */}
          <div className="lg:col-span-5 bg-[#141416] border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[740px]">
            {/* Buscador */}
            <div className="p-4 border-b border-white/10">
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar en la cola..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#202024] border border-white/10 text-xs text-white placeholder-neutral-500 focus:border-[#E6FF2A] outline-hidden"
                />
              </div>
            </div>

            {/* Lista scrollable */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain divide-y divide-white/5 p-2 space-y-1">
              {filteredLeads.length === 0 ? (
                <div className="text-center py-16 px-4 text-neutral-500 text-xs space-y-3">
                  <FileSpreadsheet className="w-10 h-10 mx-auto text-neutral-600" />
                  <p className="font-semibold text-neutral-400">
                    No hay prospectos en la cola de trabajo
                  </p>
                  <p className="max-w-xs mx-auto text-[11px] text-neutral-500">
                    Sube un nuevo archivo CSV con el botón superior para comenzar tu siguiente lote.
                  </p>
                </div>
              ) : (
                filteredLeads.map((lead) => {
                  const isSelected = lead.id === activeLead?.id;
                  return (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLeadId(lead.id)}
                      className={`group p-3.5 rounded-xl cursor-pointer transition-all flex items-start justify-between gap-3 ${
                        isSelected
                          ? "bg-[#E6FF2A]/15 border border-[#E6FF2A]/30 text-white"
                          : "hover:bg-white/5 text-neutral-300"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-sm text-white truncate">
                            {lead.companyName}
                          </span>
                          {lead.image_url && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#E6FF2A]/15 text-[#E6FF2A] border border-[#E6FF2A]/30 shrink-0 font-medium">
                              🖼️ Con maqueta
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

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteLead(lead.id);
                        }}
                        title="Eliminar este prospecto de la cola"
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Columna Derecha: Editor y Previsualizador (7 cols) */}
          <div className="lg:col-span-7 bg-[#141416] border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[740px]">
            {activeLead ? (
              <>
                {/* Barra superior de pestañas y acciones del lead */}
                <div className="p-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-[#18181b]">
                  <div className="flex items-center gap-1 bg-[#202024] p-1 rounded-xl border border-white/10">
                    <button
                      type="button"
                      onClick={() => setActiveTab("preview")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeTab === "preview"
                          ? "bg-[#E6FF2A] text-[#0C4651] font-bold shadow-sm"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Vista Previa</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("editor")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeTab === "editor"
                          ? "bg-[#E6FF2A] text-[#0C4651] font-bold shadow-sm"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Editar Campos</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Botón eliminar prospecto activo */}
                    <button
                      type="button"
                      onClick={() => handleDeleteLead(activeLead.id)}
                      title="Quitar este prospecto de la cola"
                      className="p-1.5 rounded-xl bg-[#27272a] hover:bg-red-500/15 text-neutral-400 hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Botón de prueba a Gmail (con confirmación Swal) */}
                    <button
                      type="button"
                      disabled={testSendLoading}
                      onClick={() => setSwalTestSend(activeLead)}
                      title="Envía una copia de prueba a stellarisdevsolutions@gmail.com"
                      className="px-3 py-1.5 rounded-xl bg-[#27272a] hover:bg-[#323238] text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all border border-white/10 cursor-pointer disabled:opacity-50"
                    >
                      {testSendLoading ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#E6FF2A]" />
                      ) : (
                        <Mail className="w-3.5 h-3.5 text-amber-400" />
                      )}
                      <span>Probar en mi Gmail</span>
                    </button>

                    {/* Botón enviar individual */}
                    <button
                      type="button"
                      disabled={singleSendLoading}
                      onClick={() => setSwalSingleSend(activeLead)}
                      className="px-4 py-1.5 rounded-xl bg-[#E6FF2A] hover:bg-[#D8F219] text-[#0C4651] text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-[#E6FF2A]/20 cursor-pointer disabled:opacity-50"
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

                {/* Contenido Pestaña 1: Vista Previa */}
                {activeTab === "preview" && (
                  <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6 bg-[#0a0a0c]">
                    <div className="max-w-[580px] mx-auto bg-white rounded-2xl shadow-2xl border border-neutral-300 overflow-hidden text-neutral-900">
                      {/* Fake Header */}
                      <div className="bg-[#f8f9fa] border-b border-neutral-200 px-6 py-4 space-y-1.5 text-xs font-mono">
                        <div>
                          <span className="text-neutral-500 font-sans font-semibold">De:</span>{" "}
                          <span className="font-bold text-[#E6FF2A]">
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

                      {/* Cuerpo */}
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

                        {/* Maqueta */}
                        {activeLead.image_url ? (
                          <div className="my-6 text-center">
                            <div className="rounded-xl overflow-hidden border border-neutral-200 shadow-md inline-block bg-white">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={activeLead.image_url}
                                alt="Mockup propuesta"
                                className="w-full max-w-[500px] h-auto block"
                              />
                            </div>
                            {activeLead.demo_url && (
                              <div className="mt-3">
                                <a
                                  href={activeLead.demo_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#E6FF2A] text-[#0C4651] text-xs font-bold shadow-md shadow-[#E6FF2A]/20 hover:bg-[#D8F219] transition-colors"
                                >
                                  <span>Ver Demo en Vivo en Pantalla Completa</span>
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="p-4 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 text-center text-xs text-neutral-500 my-4">
                            Sin maqueta asignada. Abre la Galería de Maquetas para asignar una.
                          </div>
                        )}

                        <p className="m-0 text-neutral-700 whitespace-pre-line">
                          {activeLead.closing}
                        </p>

                        {/* Firma */}
                        <div className="pt-4 border-t border-neutral-100 text-xs text-neutral-600 font-mono whitespace-pre-line">
                          {activeLead.signature}
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="px-6 py-3 bg-neutral-50 border-t border-neutral-100 text-center text-[10px] text-neutral-400">
                        Stellaris Dev Solutions • tiendastellaris.com • Si deseas no recibir más mensajes, responde con &quot;dar de baja&quot;.
                      </div>
                    </div>
                  </div>
                )}

                {/* Contenido Pestaña 2: Editor de Campos */}
                {activeTab === "editor" && (
                  <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                          Empresa
                        </label>
                        <input
                          type="text"
                          value={activeLead.companyName}
                          onChange={(e) => updateActiveLead({ companyName: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-[#202024] border border-white/10 text-white text-xs focus:border-[#E6FF2A] outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                          Correo
                        </label>
                        <input
                          type="email"
                          value={activeLead.email}
                          onChange={(e) => updateActiveLead({ email: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-[#202024] border border-white/10 text-white text-xs focus:border-[#E6FF2A] outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                        Asunto
                      </label>
                      <input
                        type="text"
                        value={activeLead.subject}
                        onChange={(e) => updateActiveLead({ subject: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#202024] border border-white/10 text-white text-xs focus:border-[#E6FF2A] outline-hidden font-semibold"
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
                        className="w-full px-3.5 py-2 rounded-xl bg-[#202024] border border-white/10 text-white text-xs focus:border-[#E6FF2A] outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                        Auditoría de Falla Detectada
                      </label>
                      <textarea
                        rows={3}
                        value={activeLead.intro_and_need}
                        onChange={(e) => updateActiveLead({ intro_and_need: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#202024] border border-white/10 text-white text-xs focus:border-[#E6FF2A] outline-hidden resize-none"
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
                        className="w-full px-3.5 py-2 rounded-xl bg-[#202024] border border-white/10 text-white text-xs focus:border-[#E6FF2A] outline-hidden resize-none"
                      />
                    </div>

                    {/* Maqueta actual */}
                    <div className="p-4 rounded-xl bg-[#202024] border border-white/10 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        {activeLead.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={activeLead.image_url}
                            alt="Mockup activo"
                            className="w-16 h-12 rounded-lg object-cover border border-white/10 shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-12 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0 text-neutral-500">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <span className="block text-xs font-semibold text-white">
                            Maqueta Actual
                          </span>
                          <span className="block text-[11px] text-neutral-400 truncate">
                            {activeLead.demo_url || "Sin enlace demo"}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setGalleryOrigin("lead");
                          setGalleryTab("gallery");
                          setIsGalleryOpen(true);
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-[#E6FF2A]/15 text-[#E6FF2A] border border-[#E6FF2A]/30 text-xs font-semibold hover:bg-[#E6FF2A]/25 transition-colors shrink-0 cursor-pointer"
                      >
                        Cambiar Maqueta
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                        Cierre Suave
                      </label>
                      <textarea
                        rows={2}
                        value={activeLead.closing}
                        onChange={(e) => updateActiveLead({ closing: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#202024] border border-white/10 text-white text-xs focus:border-[#E6FF2A] outline-hidden resize-none"
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-neutral-500">
                <FileSpreadsheet className="w-12 h-12 mb-3 text-neutral-600" />
                <p className="text-sm font-semibold text-white">No hay prospecto seleccionado</p>
                <p className="text-xs text-neutral-400 mt-1 max-w-sm">
                  Sube un archivo CSV con el botón superior para cargar tu siguiente lote.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: HISTORIAL PERMANENTE DE ENVIADOS */}
      {activeView === "history" && (
        <div className="bg-[#141416] border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Registro Histórico de Prospectos Contactados</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Aquí quedan guardados todos los correos enviados en la base de datos para que nunca contactes dos veces a la misma clínica o negocio.
              </p>
            </div>
            {sentHistory.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("¿Seguro que deseas vaciar el historial de enviados local?")) {
                    setSentHistory([]);
                  }
                }}
                className="text-xs text-neutral-500 hover:text-neutral-300 font-semibold cursor-pointer"
              >
                Limpiar Vista
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            {sentHistory.length === 0 ? (
              <div className="text-center py-16 text-neutral-500 text-xs">
                Aún no has enviado ningún correo en esta sesión. Los prospectos enviados aparecerán aquí.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-[#1c1c1f] text-neutral-400 font-semibold border-b border-white/10 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Fecha y Hora</th>
                    <th className="py-3 px-4">Empresa / Clínica</th>
                    <th className="py-3 px-4">Correo Destinatario</th>
                    <th className="py-3 px-4">Asunto Enviado</th>
                    <th className="py-3 px-4">Demo Asociada</th>
                    <th className="py-3 px-4 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-neutral-300">
                  {sentHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-mono text-neutral-400 whitespace-nowrap">
                        {item.sentAt}
                      </td>
                      <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                        {item.companyName}
                      </td>
                      <td className="py-3 px-4 font-mono text-neutral-300">{item.email}</td>
                      <td className="py-3 px-4 text-neutral-300 max-w-xs truncate">
                        {item.subject}
                      </td>
                      <td className="py-3 px-4">
                        {item.demoUrl ? (
                          <a
                            href={item.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#E6FF2A] hover:underline inline-flex items-center gap-1 font-mono text-[11px]"
                          >
                            <span>Link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-neutral-500">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={async () => {
                            if (window.confirm(`¿Eliminar registro de ${item.email}?`)) {
                              setSentHistory((prev) => prev.filter((r) => r.id !== item.id));
                              const numId = Number(item.id);
                              if (!isNaN(numId)) {
                                await deleteOutreachHistoryAction(numId);
                              }
                            }
                          }}
                          className="p-1 rounded text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                          title="Eliminar del historial"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: GALERÍA DE MAQUETAS (Paleta Stellaris + Pestañas Galería / Subir)   */}
      {/* ========================================================================= */}
      {isGalleryOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseGalleryModal();
          }}
        >
          <div className="bg-[#0e0e11] border border-white/15 rounded-3xl max-w-5xl w-full h-[88vh] max-h-[860px] flex flex-col overflow-hidden shadow-2xl">
            {/* Top Bar Modal con Pestañas idénticas a la 2da imagen de referencia */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#141416] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E6FF2A]/10 text-[#E6FF2A] border border-[#E6FF2A]/20 flex items-center justify-center shrink-0">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Galería de Maquetas Web</h3>
                  <p className="text-xs text-neutral-400">
                    Selecciona o sube maquetas optimizadas para tus correos de prospección.
                  </p>
                </div>
              </div>

              {/* Botones de Pestaña (Galería vs Subir) y botón Cerrar */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <div className="flex items-center p-1 rounded-xl bg-[#202024] border border-white/10 text-xs">
                  <button
                    type="button"
                    onClick={() => setGalleryTab("gallery")}
                    className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      galleryTab === "gallery"
                        ? "bg-[#E6FF2A] text-[#0C4651] font-bold shadow-sm"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span>≡ Galería Web</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGalleryTab("upload")}
                    className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      galleryTab === "upload"
                        ? "bg-[#E6FF2A] text-[#0C4651] font-bold shadow-sm"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Subir Maqueta</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCloseGalleryModal}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CONTENIDO 1: PESTAÑA "GALERÍA WEB" */}
            {galleryTab === "gallery" && (
              <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
                {/* Columna Izquierda: Grid de miniaturas (8 cols) */}
                <div className="md:col-span-8 p-4 sm:p-5 border-r border-white/10 flex flex-col h-full min-h-0 bg-[#0e0e11]">
                  {/* Barra de búsqueda y contador */}
                  <div className="shrink-0 flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Maquetas del Editor
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#E6FF2A]/10 text-[#E6FF2A] text-[10px] font-bold border border-[#E6FF2A]/20">
                        {assets.length} disponibles
                      </span>
                    </div>

                    <div className="relative w-48">
                      <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Buscar maqueta..."
                        value={gallerySearch}
                        onChange={(e) => setGallerySearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#18181b] border border-white/10 text-xs text-white placeholder-neutral-500 focus:border-[#E6FF2A] outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Grid de maquetas con scroll independiente y tarjetas compactas */}
                  <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pr-2 content-start items-start">
                    {filteredAssets.map((asset) => {
                      const isSelected = asset.id === selectedAsset?.id;
                      return (
                        <div
                          key={asset.id}
                          onClick={() => setSelectedAssetId(asset.id)}
                          className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all flex flex-col ${
                            isSelected
                              ? "border-[#E6FF2A] shadow-md shadow-[#E6FF2A]/20 ring-2 ring-[#E6FF2A]/40"
                              : "border-white/10 hover:border-white/30 bg-[#18181b]"
                          }`}
                        >
                          <div className="relative aspect-[16/10] bg-black/60 overflow-hidden shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={asset.url}
                              alt={asset.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {/* Checkmark badge naranja si está seleccionado */}
                            {isSelected && (
                              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#E6FF2A] text-[#0C4651] font-bold flex items-center justify-center font-bold shadow-md">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            )}
                          </div>

                          {/* Fila debajo solo con el nombre, sin espacios vacíos ni categoría */}
                          <div className="px-2.5 py-2 bg-[#141416] border-t border-white/5 flex items-center justify-center">
                            <span
                              className="font-semibold text-xs text-white truncate text-center w-full block m-0 leading-tight"
                              title={asset.name}
                            >
                              {asset.name}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Columna Derecha: DETALLES DE LA MAQUETA (4 cols - ancho reducido) */}
                <div className="md:col-span-4 flex flex-col h-full min-h-0 bg-[#141416]">
                  {selectedAsset ? (
                    <>
                      {/* Área scrollable de detalles */}
                      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-3.5 pr-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                            Detalles de la Maqueta
                          </span>

                          {/* Botón para alternar modo edición */}
                          {!isEditingAsset ? (
                            <button
                              type="button"
                              onClick={() => setIsEditingAsset(true)}
                              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Edit3 className="w-3 h-3 text-[#E6FF2A]" />
                              <span>Editar Datos</span>
                            </button>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsEditingAsset(false);
                                  setAssetDraft({
                                    name: selectedAsset.name,
                                    category: selectedAsset.category,
                                    demoUrl: selectedAsset.demoUrl,
                                  });
                                }}
                                className="px-2 py-0.5 rounded text-[11px] text-neutral-400 hover:text-white cursor-pointer"
                              >
                                Cancelar
                              </button>
                              <button
                                type="button"
                                onClick={handleSaveAssetEdit}
                                className="px-2.5 py-1 rounded-lg bg-[#E6FF2A] hover:bg-[#D8F219] text-[#0C4651] text-xs font-bold flex items-center gap-1 cursor-pointer shadow-sm"
                              >
                                <Save className="w-3 h-3" />
                                <span>Guardar</span>
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Previsualización moderada idéntica a la referencia (no gigante) */}
                        <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40 h-36 sm:h-40 w-full flex items-center justify-center shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={selectedAsset.url}
                            alt={selectedAsset.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Botón Copiar URL Directa */}
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(selectedAsset.url);
                            setCopiedUrl(true);
                            setTimeout(() => setCopiedUrl(false), 2000);
                          }}
                          className="w-full py-2 px-3 rounded-xl bg-[#202024] hover:bg-[#27272a] text-neutral-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                          {copiedUrl ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400 font-bold">¡URL copiada al portapapeles!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copiar URL Directa</span>
                            </>
                          )}
                        </button>

                        {/* Campos (Readonly por defecto, editables si isEditingAsset es true) */}
                        <div className="space-y-2.5 pt-1">
                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                              <span>Nombre de la Maqueta</span>
                              {!isEditingAsset && <Lock className="w-2.5 h-2.5 text-neutral-500" />}
                            </label>
                            {isEditingAsset ? (
                              <input
                                type="text"
                                value={assetDraft.name}
                                onChange={(e) => setAssetDraft((d) => ({ ...d, name: e.target.value }))}
                                className="w-full px-3 py-1.5 rounded-lg bg-[#202024] border border-[#E6FF2A]/50 text-xs text-white focus:border-[#E6FF2A] outline-hidden"
                              />
                            ) : (
                              <div className="px-3 py-2 rounded-lg bg-[#18181b] border border-white/5 text-xs text-neutral-200 font-semibold truncate">
                                {selectedAsset.name}
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                              <span>Categoría / Nicho</span>
                              {!isEditingAsset && <Lock className="w-2.5 h-2.5 text-neutral-500" />}
                            </label>
                            {isEditingAsset ? (
                              <input
                                type="text"
                                value={assetDraft.category}
                                onChange={(e) => setAssetDraft((d) => ({ ...d, category: e.target.value }))}
                                className="w-full px-3 py-1.5 rounded-lg bg-[#202024] border border-[#E6FF2A]/50 text-xs text-white focus:border-[#E6FF2A] outline-hidden"
                              />
                            ) : (
                              <div className="px-3 py-2 rounded-lg bg-[#18181b] border border-white/5 text-xs text-neutral-300 truncate">
                                {selectedAsset.category}
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                              <span>Enlace Demo en Vivo</span>
                              {!isEditingAsset && <Lock className="w-2.5 h-2.5 text-neutral-500" />}
                            </label>
                            {isEditingAsset ? (
                              <input
                                type="text"
                                value={assetDraft.demoUrl}
                                onChange={(e) => setAssetDraft((d) => ({ ...d, demoUrl: e.target.value }))}
                                className="w-full px-3 py-1.5 rounded-lg bg-[#202024] border border-[#E6FF2A]/50 text-xs text-white font-mono focus:border-[#E6FF2A] outline-hidden"
                              />
                            ) : (
                              <div className="px-3 py-2 rounded-lg bg-[#18181b] border border-white/5 text-xs text-[#E6FF2A] font-mono truncate">
                                {selectedAsset.demoUrl}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Ficha técnica */}
                        <div className="p-3 rounded-xl bg-[#202024] border border-white/10 space-y-1.5 text-xs">
                          <div className="flex justify-between text-neutral-400">
                            <span>Formato</span>
                            <span className="text-white font-mono font-bold">
                              {selectedAsset.format || "WEBP"}
                            </span>
                          </div>
                          <div className="flex justify-between text-neutral-400">
                            <span>Dimensiones</span>
                            <span className="text-white font-mono">
                              {selectedAsset.dimensions || "1200 × 750 px"}
                            </span>
                          </div>
                          <div className="flex justify-between text-neutral-400">
                            <span>Tamaño Optimizado</span>
                            <span className="text-emerald-400 font-mono font-bold">
                              {selectedAsset.sizeKb || "45 KB"}
                            </span>
                          </div>
                        </div>

                        {/* Eliminar con borrado físico */}
                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={() => setSwalDeleteAsset(selectedAsset)}
                            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 font-semibold transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Eliminar de la galería (borrado permanente)</span>
                          </button>
                        </div>
                      </div>

                      {/* PIE FIJO DE ACCIONES: Siempre visible, nunca se corta */}
                      <div className="shrink-0 p-4 border-t border-white/10 bg-[#141416] space-y-2">
                        {galleryOrigin === "lead" ? (
                          <>
                            {/* Abierto desde el editor de un lead específico */}
                            <button
                              type="button"
                              onClick={applyAssetToCurrentLead}
                              className="w-full py-2.5 px-4 rounded-xl bg-[#E6FF2A] hover:bg-[#D8F219] text-[#0C4651] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#E6FF2A]/25"
                            >
                              Usar solo en {activeLead?.companyName}
                            </button>

                            <button
                              type="button"
                              onClick={applyAssetToAllLeads}
                              className="w-full py-2 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-200 font-semibold text-xs transition-all cursor-pointer"
                            >
                              Aplicar a todo el lote
                            </button>
                          </>
                        ) : (
                          <>
                            {/* Abierto desde el botón superior de la barra */}
                            <button
                              type="button"
                              onClick={applyAssetToAllLeads}
                              className="w-full py-2.5 px-4 rounded-xl bg-[#E6FF2A] hover:bg-[#D8F219] text-[#0C4651] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#E6FF2A]/25"
                            >
                              Aplicar a todo el lote
                            </button>
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-xs text-neutral-500">
                      Selecciona una maqueta de la lista
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CONTENIDO 2: PESTAÑA "SUBIR NUEVA MAQUETA" (Workflow sin archivos fantasma) */}
            {galleryTab === "upload" && (
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 sm:p-8 flex flex-col items-center justify-center bg-[#0e0e11]">
                {!pendingUploadPreview ? (
                  /* Dropzone idéntico a la 2da imagen de referencia */
                  <div
                    onClick={() => dropzoneInputRef.current?.click()}
                    className="w-full max-w-xl p-10 rounded-3xl border-2 border-dashed border-white/15 hover:border-[#E6FF2A] bg-[#141416] transition-all cursor-pointer flex flex-col items-center justify-center text-center group"
                  >
                    <input
                      type="file"
                      ref={dropzoneInputRef}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleSelectMockupFile(f);
                      }}
                      accept="image/*"
                      className="hidden"
                    />

                    <div className="w-16 h-16 rounded-2xl bg-[#E6FF2A]/10 text-[#E6FF2A] border border-[#E6FF2A]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <CloudUpload className="w-8 h-8" />
                    </div>

                    <h4 className="text-base font-bold text-white mb-1">
                      Arrastra aquí tu imagen o maqueta
                    </h4>
                    <p className="text-xs text-neutral-400 mb-3">
                      o haz clic para explorar en tu computadora
                    </p>
                    <span className="text-[11px] text-neutral-500">
                      Admite PNG, JPG o WEBP. Se optimizará automáticamente a WebP de alta resolución (máx 1200px) reduciendo el peso en más del 80%.
                    </span>
                  </div>
                ) : (
                  /* Formulario de Registro con campos requeridos tras seleccionar imagen */
                  <div className="w-full max-w-xl bg-[#141416] border border-white/10 rounded-3xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <h4 className="font-bold text-sm text-white">Completar Datos de la Maqueta</h4>
                        <p className="text-xs text-neutral-400">
                          Revisa la optimización y completa los campos obligatorios para registrarla.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleCancelNewMockup}
                        className="text-xs text-neutral-400 hover:text-white"
                      >
                        Cambiar imagen
                      </button>
                    </div>

                    {/* Previsualización optimizada */}
                    <div className="flex items-center gap-4 p-3 bg-[#18181b] rounded-2xl border border-white/5">
                      <div className="w-24 h-16 rounded-xl overflow-hidden bg-black/60 shrink-0 border border-white/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={pendingUploadPreview}
                          alt="Previsualización"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 text-xs space-y-1">
                        <div className="font-bold text-white truncate">{pendingUploadFile?.name}</div>
                        <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
                          <span className="text-emerald-400 font-bold font-mono">WEBP</span>
                          <span>•</span>
                          <span className="font-mono">{pendingDimensions}</span>
                          <span>•</span>
                          <span className="text-emerald-400 font-bold font-mono">{pendingSizeKb}</span>
                        </div>
                      </div>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleConfirmRegisterMockup} className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">
                          Nombre de la Maqueta <span className="text-[#E6FF2A]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={newMockupName}
                          onChange={(e) => setNewMockupName(e.target.value)}
                          placeholder="Ej. BrightSmile Dental Clinic HD"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#202024] border border-white/10 text-xs text-white placeholder-neutral-500 focus:border-[#E6FF2A] outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">
                          Categoría / Nicho <span className="text-[#E6FF2A]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={newMockupCategory}
                          onChange={(e) => setNewMockupCategory(e.target.value)}
                          placeholder="Ej. Clínicas & Odontología / Restaurantes"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#202024] border border-white/10 text-xs text-white placeholder-neutral-500 focus:border-[#E6FF2A] outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">
                          Enlace a Demo en Vivo <span className="text-[#E6FF2A]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={newMockupDemoUrl}
                          onChange={(e) => setNewMockupDemoUrl(e.target.value)}
                          placeholder="https://dental.tiendastellaris.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#202024] border border-white/10 text-xs text-white placeholder-neutral-500 font-mono focus:border-[#E6FF2A] outline-hidden"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-3">
                        <button
                          type="button"
                          onClick={handleCancelNewMockup}
                          className="py-2.5 px-4 rounded-xl bg-[#202024] hover:bg-[#27272a] text-neutral-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Cancelar (no subir)
                        </button>

                        <button
                          type="submit"
                          disabled={isSubmittingNewMockup}
                          className="py-2.5 px-4 rounded-xl bg-[#E6FF2A] hover:bg-[#D8F219] text-[#0C4651] text-xs font-bold transition-all shadow-md shadow-[#E6FF2A]/25 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {isSubmittingNewMockup ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Subiendo a Blob...</span>
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4" />
                              <span>Registrar Maqueta</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: CONFIRMACIÓN TIPO SWEETALERT PARA BORRAR MAQUETA FÍSICAMENTE      */}
      {/* ========================================================================= */}
      {swalDeleteAsset && (
        <div
          className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSwalDeleteAsset(null);
          }}
        >
          <div className="bg-[#171717] border border-red-500/30 rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-1.5">
                ¿Eliminar &quot;{swalDeleteAsset.name}&quot;?
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed max-w-xs mx-auto">
                Esta acción eliminará la maqueta de tu galería y borrará el archivo físico de
                almacenamiento de forma permanente.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSwalDeleteAsset(null)}
                className="py-2.5 px-4 rounded-xl bg-[#202024] hover:bg-[#27272a] text-neutral-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteAsset}
                className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-colors cursor-pointer shadow-lg shadow-red-600/30"
              >
                Sí, eliminar definitivamente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: CONFIRMACIÓN TIPO SWEETALERT PARA ENVIAR LOTE COMPLETO            */}
      {/* ========================================================================= */}
      {swalBatchSend && (
        <div
          className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSwalBatchSend(false);
          }}
        >
          <div className="bg-[#171717] border border-[#E6FF2A]/30 rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-full bg-[#E6FF2A]/10 text-[#E6FF2A] border border-[#E6FF2A]/20 flex items-center justify-center mx-auto">
              <Send className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-1.5">
                ¿Confirmas el envío de este lote?
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed max-w-sm mx-auto">
                Estás a punto de enviar <strong>{leads.length} correos</strong> con Resend.
                Asegúrate de que los textos y maquetas estén correctos. Se enviarán uno a uno cada 3.5 segundos para garantizar la máxima entregabilidad.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSwalBatchSend(false)}
                className="py-2.5 px-4 rounded-xl bg-[#202024] hover:bg-[#27272a] text-neutral-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Revisar más
              </button>
              <button
                type="button"
                onClick={handleExecuteBatchSend}
                className="py-2.5 px-4 rounded-xl bg-[#E6FF2A] hover:bg-[#D8F219] text-[#0C4651] text-xs font-bold transition-colors cursor-pointer shadow-lg shadow-[#E6FF2A]/30 flex items-center justify-center gap-2"
              >
                Sí, iniciar envíos ahora
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: CONFIRMACIÓN TIPO SWEETALERT PARA ENVIAR INDIVIDUAL                */}
      {/* ========================================================================= */}
      {swalSingleSend && (
        <div
          className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSwalSingleSend(null);
          }}
        >
          <div className="bg-[#171717] border border-[#E6FF2A]/30 rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-full bg-[#E6FF2A]/10 text-[#E6FF2A] border border-[#E6FF2A]/20 flex items-center justify-center mx-auto">
              <Mail className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-1.5">
                Enviar a {swalSingleSend.companyName}
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed max-w-xs mx-auto">
                Se enviará a: <strong className="text-white">{swalSingleSend.email}</strong>.
                Una vez enviado, se moverá a tu historial permanente.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSwalSingleSend(null)}
                className="py-2.5 px-4 rounded-xl bg-[#202024] hover:bg-[#27272a] text-neutral-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleExecuteSingleSend}
                className="py-2.5 px-4 rounded-xl bg-[#E6FF2A] hover:bg-[#D8F219] text-[#0C4651] text-xs font-bold transition-colors cursor-pointer shadow-lg shadow-[#E6FF2A]/30 flex items-center justify-center gap-2"
              >
                Enviar ahora
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: CONFIRMACIÓN TIPO SWEETALERT PARA PROBAR EN MI GMAIL              */}
      {/* ========================================================================= */}
      {swalTestSend && (
        <div
          className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSwalTestSend(null);
          }}
        >
          <div className="bg-[#171717] border border-amber-500/30 rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto">
              <Mail className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-1.5">
                ¿Enviar prueba a tu Gmail?
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed max-w-sm mx-auto">
                Se enviará una copia exacta con la maqueta y propuesta de{" "}
                <strong className="text-white">{swalTestSend.companyName}</strong> a{" "}
                <strong className="text-[#E6FF2A]">stellarisdevsolutions@gmail.com</strong> para que revises el diseño real en tu bandeja de entrada antes de contactar al cliente.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSwalTestSend(null)}
                className="py-2.5 px-4 rounded-xl bg-[#202024] hover:bg-[#27272a] text-neutral-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={testSendLoading}
                onClick={() => {
                  const leadToSend = swalTestSend;
                  setSwalTestSend(null);
                  handleExecuteTestSend(leadToSend);
                }}
                className="py-2.5 px-4 rounded-xl bg-[#E6FF2A] hover:bg-[#D8F219] text-[#0C4651] text-xs font-bold transition-colors cursor-pointer shadow-lg shadow-[#E6FF2A]/30 flex items-center justify-center gap-2"
              >
                {testSendLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Enviando prueba...</span>
                  </>
                ) : (
                  <span>Sí, enviar prueba</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 6: CONFIRMACIÓN TIPO SWEETALERT PARA VACIAR LOTE COMPLETO            */}
      {/* ========================================================================= */}
      {swalClearBatch && (
        <div
          className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSwalClearBatch(false);
          }}
        >
          <div className="bg-[#171717] border border-red-500/30 rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center mx-auto">
              <Trash2 className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-1.5">
                ¿Vaciar la cola del lote?
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed max-w-sm mx-auto">
                Se retirarán los <strong className="text-white">{leads.length} prospectos</strong> pendientes de la cola de trabajo. Podrás subir un nuevo archivo CSV o iniciar otra campaña desde cero.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSwalClearBatch(false)}
                className="py-2.5 px-4 rounded-xl bg-[#202024] hover:bg-[#27272a] text-neutral-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmClearBatch}
                className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-colors cursor-pointer shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Sí, vaciar lote</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
