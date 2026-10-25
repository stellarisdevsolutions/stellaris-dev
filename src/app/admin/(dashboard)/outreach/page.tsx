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
    format: "JPG",
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
 * sin perder calidad visual, para envíos de correo ultrarrápidos.
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
  const [selectedAssetId, setSelectedAssetId] = useState<string>(DEFAULT_ASSETS[0].id);
  const [gallerySearch, setGallerySearch] = useState("");
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [uploadingMockup, setUploadingMockup] = useState(false);

  // Modales tipo SweetAlert
  const [swalDeleteAsset, setSwalDeleteAsset] = useState<MockupAsset | null>(null);
  const [swalBatchSend, setSwalBatchSend] = useState(false);
  const [swalSingleSend, setSwalSingleSend] = useState<LeadItem | null>(null);

  // Estados de envío
  const [isBatchSending, setIsBatchSending] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0 });
  const [testSendLoading, setTestSendLoading] = useState(false);
  const [testSendSuccess, setTestSendSuccess] = useState<string | null>(null);
  const [singleSendLoading, setSingleSendLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mockupUploadInputRef = useRef<HTMLInputElement>(null);

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
      // Cargar muestra por defecto
      loadSampleData();
    }

    // 2. Historial de enviados (Cargado desde la Base de Datos PostgreSQL con fallback local)
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

  // Guardar historial
  useEffect(() => {
    localStorage.setItem("stellaris_outreach_history", JSON.stringify(sentHistory));
  }, [sentHistory]);

  // Guardar galería
  useEffect(() => {
    localStorage.setItem("stellaris_outreach_assets", JSON.stringify(assets));
  }, [assets]);

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

  // Lead activo seleccionado
  const activeLead = leads.find((l) => l.id === selectedLeadId) || leads[0] || null;

  // Maqueta seleccionada en la galería
  const selectedAsset =
    assets.find((a) => a.id === selectedAssetId) || assets[0] || null;

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
                alert(`¡Listo! Se cargaron ${uniqueLeads.length} prospectos nuevos (se omitieron ${duplicates.length} repetidos).`);
                return;
              }
            }
            setLeads(newLeads);
            setSelectedLeadId(newLeads[0].id);
            setActiveView("queue");
            alert(`¡Listo! Se cargaron ${newLeads.length} prospectos en la cola.`);
          })
          .catch(() => {
            setLeads(newLeads);
            setSelectedLeadId(newLeads[0].id);
            setActiveView("queue");
            alert(`¡Listo! Se cargaron ${newLeads.length} prospectos en la cola.`);
          });
      },
      error: (error) => {
        console.error("Error CSV:", error);
        alert("Error al leer el CSV. Asegúrate de que use formato delimitado por comas.");
      },
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Subir y optimizar nueva maqueta a la galería (una a la vez)
  const handleUploadMockup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingMockup(true);
    try {
      // 1. Optimizar en el navegador a WebP de alta resolución
      const { blob, dimensions, sizeKb } = await optimizeImageToWebP(file);
      const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_");
      const filename = `${cleanName}-${Date.now()}.webp`;

      // 2. Subir a Vercel Blob
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(filename)}`, {
        method: "POST",
        body: blob,
      });

      if (!response.ok) {
        throw new Error("No se pudo conectar con el almacenamiento de Vercel Blob");
      }

      const data = await response.json();
      const finalUrl = data.url;

      // 3. Registrar en la galería
      const newMockup: MockupAsset = {
        id: `mockup-${Date.now()}`,
        name: cleanName.replace(/_/g, " "),
        category: "Personalizados",
        url: finalUrl,
        demoUrl: activeLead?.demo_url || "https://tiendastellaris.com",
        format: "WEBP",
        dimensions,
        sizeKb,
      };

      setAssets((prev) => [newMockup, ...prev]);
      setSelectedAssetId(newMockup.id);
    } catch (err: any) {
      console.warn("Fallo subida Blob, usando fallback WebP local:", err);
      // Fallback local WebP
      const { blob, dimensions, sizeKb } = await optimizeImageToWebP(file);
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        const newMockup: MockupAsset = {
          id: `mockup-${Date.now()}`,
          name: file.name.replace(/\.[^/.]+$/, ""),
          category: "Personalizados",
          url: base64,
          demoUrl: activeLead?.demo_url || "https://tiendastellaris.com",
          format: "WEBP",
          dimensions,
          sizeKb,
        };
        setAssets((prev) => [newMockup, ...prev]);
        setSelectedAssetId(newMockup.id);
      };
      reader.readAsDataURL(blob);
    } finally {
      setUploadingMockup(false);
      if (mockupUploadInputRef.current) mockupUploadInputRef.current.value = "";
    }
  };

  // Modificar datos de la maqueta activa en el panel derecho de la galería
  const updateSelectedAsset = (fields: Partial<MockupAsset>) => {
    if (!selectedAsset) return;
    setAssets((prev) =>
      prev.map((a) => (a.id === selectedAsset.id ? { ...a, ...fields } : a))
    );
  };

  // Eliminar maqueta con confirmación y borrado físico en Vercel Blob
  const handleConfirmDeleteAsset = async () => {
    if (!swalDeleteAsset) return;
    const assetToDelete = swalDeleteAsset;
    setSwalDeleteAsset(null);

    // 1. Borrar de la lista local
    setAssets((prev) => prev.filter((a) => a.id !== assetToDelete.id));

    // 2. Si es una URL de Vercel Blob, borrar físicamente en la nube
    if (assetToDelete.url.includes(".blob.vercel-storage.com")) {
      try {
        await deleteBlobsAction([assetToDelete.url]);
      } catch (err) {
        console.warn("Error borrando blob físico:", err);
      }
    }

    // Seleccionar la primera maqueta restante
    const remaining = assets.filter((a) => a.id !== assetToDelete.id);
    if (remaining.length > 0) {
      setSelectedAssetId(remaining[0].id);
    }
  };

  // Actualizar lead activo
  const updateActiveLead = (fields: Partial<LeadItem>) => {
    if (!activeLead) return;
    setLeads((prev) =>
      prev.map((lead) => (lead.id === activeLead.id ? { ...lead, ...fields } : lead))
    );
  };

  // Aplicar maqueta al prospecto activo
  const applyAssetToCurrentLead = () => {
    if (!selectedAsset || !activeLead) return;
    updateActiveLead({
      image_url: selectedAsset.url,
      demo_url: selectedAsset.demoUrl || activeLead.demo_url,
    });
    setIsGalleryOpen(false);
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
    alert(`Se asignó la maqueta "${selectedAsset.name}" y su demo a los ${leads.length} prospectos del lote.`);
  };

  // Enviar prueba a mi Gmail
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
    alert(`¡Lote completado! Se enviaron ${successfullySentIds.length} correos con éxito.`);
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
      {/* Top Header con EXACTAMENTE 3 botones principales */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#FF532A]/10 text-[#FF532A] text-xs font-bold uppercase tracking-wider mb-1">
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

        {/* Los 3 Botones Principales */}
        <div className="flex items-center gap-3">
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
            className="px-4 py-2.5 rounded-xl bg-[#202024] hover:bg-[#27272a] text-white border border-white/10 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:border-white/20"
          >
            <Upload className="w-4 h-4 text-[#FF532A]" />
            <span>Subir Archivo CSV</span>
          </button>

          {/* 2. Galería de Maquetas */}
          <button
            type="button"
            onClick={() => setIsGalleryOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#202024] hover:bg-[#27272a] text-white border border-white/10 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:border-white/20"
          >
            <ImageIcon className="w-4 h-4 text-cyan-400" />
            <span>Galería de Maquetas</span>
          </button>

          {/* 3. Enviar Lote */}
          <button
            type="button"
            disabled={isBatchSending || leads.length === 0}
            onClick={() => setSwalBatchSend(true)}
            className="px-5 py-2.5 rounded-xl bg-[#FF532A] hover:bg-[#E5451D] disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-md shadow-[#FF532A]/25 cursor-pointer"
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

      {/* Test feedback */}
      {testSendSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{testSendSuccess}</span>
        </div>
      )}

      {/* Toggle View: Cola de Pendientes vs Historial de Enviados */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#141416] border border-white/10 text-xs">
          <button
            type="button"
            onClick={() => setActiveView("queue")}
            className={`px-3.5 py-1.5 rounded-lg font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeView === "queue"
                ? "bg-[#FF532A] text-white shadow-sm"
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
                ? "bg-[#FF532A] text-white shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Historial de Enviados ({sentHistory.length})</span>
          </button>
        </div>

        {activeView === "queue" && leads.length === 0 && (
          <button
            type="button"
            onClick={loadSampleData}
            className="text-xs text-[#FF532A] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Cargar prospectos de prueba (dentistas)</span>
          </button>
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
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#202024] border border-white/10 text-xs text-white placeholder-neutral-500 focus:border-[#FF532A] outline-hidden"
                />
              </div>
            </div>

            {/* Lista scrollable */}
            <div className="flex-1 overflow-y-auto divide-y divide-white/5 p-2 space-y-1">
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
                      className={`p-3.5 rounded-xl cursor-pointer transition-all flex items-start justify-between gap-3 ${
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
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shrink-0 font-medium">
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
                          ? "bg-[#FF532A] text-white shadow-sm"
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
                          ? "bg-[#FF532A] text-white shadow-sm"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Editar Campos</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Botón de prueba a Gmail */}
                    <button
                      type="button"
                      disabled={testSendLoading}
                      onClick={handleSendTestToMe}
                      title="Envía una copia de prueba a stellarisdevsolutions@gmail.com"
                      className="px-3 py-1.5 rounded-xl bg-[#27272a] hover:bg-[#323238] text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all border border-white/10 cursor-pointer disabled:opacity-50"
                    >
                      {testSendLoading ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#FF532A]" />
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

                {/* Contenido Pestaña 1: Vista Previa */}
                {activeTab === "preview" && (
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0a0a0c]">
                    <div className="max-w-[580px] mx-auto bg-white rounded-2xl shadow-2xl border border-neutral-300 overflow-hidden text-neutral-900">
                      {/* Fake Header */}
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
                  <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                          Empresa
                        </label>
                        <input
                          type="text"
                          value={activeLead.companyName}
                          onChange={(e) => updateActiveLead({ companyName: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-[#202024] border border-white/10 text-white text-xs focus:border-[#FF532A] outline-hidden"
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
                          className="w-full px-3.5 py-2 rounded-xl bg-[#202024] border border-white/10 text-white text-xs focus:border-[#FF532A] outline-hidden"
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
                        className="w-full px-3.5 py-2 rounded-xl bg-[#202024] border border-white/10 text-white text-xs focus:border-[#FF532A] outline-hidden font-semibold"
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
                        Auditoría de Falla Detectada
                      </label>
                      <textarea
                        rows={3}
                        value={activeLead.intro_and_need}
                        onChange={(e) => updateActiveLead({ intro_and_need: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#202024] border border-white/10 text-white text-xs focus:border-[#FF532A] outline-hidden resize-none"
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
                        className="w-full px-3.5 py-2 rounded-xl bg-[#202024] border border-white/10 text-white text-xs focus:border-[#FF532A] outline-hidden resize-none"
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
                        onClick={() => setIsGalleryOpen(true)}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-semibold hover:bg-cyan-500/30 transition-colors shrink-0 cursor-pointer"
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
                        className="w-full px-3.5 py-2 rounded-xl bg-[#202024] border border-white/10 text-white text-xs focus:border-[#FF532A] outline-hidden resize-none"
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
                Aquí quedan guardados todos los correos enviados para que nunca contactes dos veces a la misma clínica o negocio.
              </p>
            </div>
            {sentHistory.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("¿Seguro que deseas vaciar el historial de enviados?")) {
                    setSentHistory([]);
                  }
                }}
                className="text-xs text-red-400 hover:text-red-300 font-semibold cursor-pointer"
              >
                Limpiar Historial
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
                            className="text-[#FF532A] hover:underline inline-flex items-center gap-1 font-mono text-[11px]"
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
      {/* MODAL 1: GALERÍA DE MAQUETAS (Diseño inspirado en la 2da imagen del usuario) */}
      {/* ========================================================================= */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e0e11] border border-white/15 rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Top Bar Modal */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#141416]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Galería de Maquetas Web</h3>
                  <p className="text-xs text-neutral-400">
                    Selecciona o sube maquetas optimizadas para tus correos de prospección.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Input oculto para subir una sola maqueta */}
                <input
                  type="file"
                  ref={mockupUploadInputRef}
                  onChange={handleUploadMockup}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={uploadingMockup}
                  onClick={() => mockupUploadInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
                >
                  {uploadingMockup ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Optimizando WebP...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Subir Nueva Maqueta</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsGalleryOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body: 2 Columnas (Grid de maquetas a la izq, Detalles y edición a la der) */}
            <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
              {/* Columna Izquierda: Grid de miniaturas (7 cols) */}
              <div className="md:col-span-7 p-5 border-r border-white/10 flex flex-col h-[580px] bg-[#0e0e11]">
                {/* Barra de búsqueda y contador */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Maquetas del Editor
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-bold">
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
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#18181b] border border-white/10 text-xs text-white placeholder-neutral-500 focus:border-cyan-400 outline-hidden"
                    />
                  </div>
                </div>

                {/* Grid con scroll */}
                <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-3.5 pr-1">
                  {filteredAssets.map((asset) => {
                    const isSelected = asset.id === selectedAsset?.id;
                    return (
                      <div
                        key={asset.id}
                        onClick={() => setSelectedAssetId(asset.id)}
                        className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all flex flex-col ${
                          isSelected
                            ? "border-cyan-400 shadow-lg shadow-cyan-500/15 ring-2 ring-cyan-400/30"
                            : "border-white/10 hover:border-white/30 bg-[#18181b]"
                        }`}
                      >
                        <div className="relative aspect-[16/11] bg-black/60 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={asset.url}
                            alt={asset.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {/* Checkmark badge si está seleccionado */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-cyan-400 text-black flex items-center justify-center font-bold shadow-md">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        <div className="p-2.5 bg-[#141416]">
                          <div className="font-semibold text-xs text-white truncate">
                            {asset.name}
                          </div>
                          <div className="text-[10px] text-neutral-400 truncate">
                            {asset.category}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Columna Derecha: Panel de DETALLES DE LA MAQUETA (5 cols) */}
              <div className="md:col-span-5 p-5 flex flex-col justify-between h-[580px] bg-[#141416] overflow-y-auto">
                {selectedAsset ? (
                  <div className="space-y-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Detalles de la Maqueta
                    </div>

                    {/* Previsualización grande */}
                    <div className="rounded-xl overflow-hidden border border-white/10 bg-black/50 aspect-[16/10]">
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
                          <span className="text-emerald-400">¡URL copiada al portapapeles!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar URL Directa</span>
                        </>
                      )}
                    </button>

                    {/* Edición rápida de datos */}
                    <div className="space-y-2.5 pt-1">
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                          Nombre de la Maqueta
                        </label>
                        <input
                          type="text"
                          value={selectedAsset.name}
                          onChange={(e) => updateSelectedAsset({ name: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#202024] border border-white/10 text-xs text-white focus:border-cyan-400 outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                          Categoría / Nicho
                        </label>
                        <input
                          type="text"
                          value={selectedAsset.category}
                          onChange={(e) => updateSelectedAsset({ category: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#202024] border border-white/10 text-xs text-white focus:border-cyan-400 outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                          Enlace a Demo en Vivo
                        </label>
                        <input
                          type="text"
                          value={selectedAsset.demoUrl}
                          onChange={(e) => updateSelectedAsset({ demoUrl: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#202024] border border-white/10 text-xs text-white font-mono focus:border-cyan-400 outline-hidden"
                        />
                      </div>
                    </div>

                    {/* Metadata técnica */}
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

                    {/* Botón de eliminar con confirmación física */}
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

                    {/* Botones de acción principales */}
                    <div className="pt-3 space-y-2">
                      <button
                        type="button"
                        onClick={applyAssetToCurrentLead}
                        className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
                      >
                        Usar en este Prospecto
                      </button>

                      <button
                        type="button"
                        onClick={applyAssetToAllLeads}
                        className="w-full py-2 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all cursor-pointer"
                      >
                        Aplicar Demo e Imagen a Todo el Lote
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-xs text-neutral-500">
                    Selecciona una maqueta de la lista
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: CONFIRMACIÓN TIPO SWEETALERT PARA BORRAR MAQUETA FÍSICAMENTE      */}
      {/* ========================================================================= */}
      {swalDeleteAsset && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
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
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#171717] border border-[#FF532A]/30 rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-full bg-[#FF532A]/10 text-[#FF532A] border border-[#FF532A]/20 flex items-center justify-center mx-auto">
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
                className="py-2.5 px-4 rounded-xl bg-[#FF532A] hover:bg-[#E5451D] text-white text-xs font-semibold transition-colors cursor-pointer shadow-lg shadow-[#FF532A]/30"
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
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#171717] border border-[#FF532A]/30 rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-full bg-[#FF532A]/10 text-[#FF532A] border border-[#FF532A]/20 flex items-center justify-center mx-auto">
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
                className="py-2.5 px-4 rounded-xl bg-[#FF532A] hover:bg-[#E5451D] text-white text-xs font-semibold transition-colors cursor-pointer shadow-lg shadow-[#FF532A]/30"
              >
                Enviar ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
