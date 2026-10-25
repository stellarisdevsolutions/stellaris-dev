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
  Layers,
  ArrowRight,
  Info,
} from "lucide-react";
import {
  sendOutreachEmailAction,
  sendTestOutreachEmailAction,
} from "@/app/admin/actions";
import { OutreachEmailData, buildOutreachHtml } from "@/lib/outreach-email";

// Lead enriquecido para el estado del cliente
interface LeadItem extends OutreachEmailData {
  id: string;
  companyName: string;
  status: "pending" | "sending" | "sent" | "error";
  sentAt?: string;
  errorMessage?: string;
}

// Preset de galería de imágenes
interface MockupAsset {
  id: string;
  name: string;
  category: string;
  url: string;
  demoUrl: string;
}

const DEFAULT_ASSETS: MockupAsset[] = [
  {
    id: "dental-hd",
    name: "BrightSmile Dental Clinic HD",
    category: "Clínicas & Odontología",
    url: "https://dental.tiendastellaris.com/BrightSmile_Dental_Demo_HD.jpg",
    demoUrl: "https://dental.tiendastellaris.com",
  },
  {
    id: "restaurant-pro",
    name: "Gourmet Bistro & Reservas Móviles",
    category: "Restaurantes & Bares",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://restaurante.tiendastellaris.com",
  },
  {
    id: "legal-firm",
    name: "Apex Corporate Law & Consultoría",
    category: "Abogados & Legal",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://legal.tiendastellaris.com",
  },
  {
    id: "ecommerce-boutique",
    name: "OmniStore E-Commerce & Catálogo",
    category: "Tiendas & Retail",
    url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://tienda.tiendastellaris.com",
  },
  {
    id: "saas-dashboard",
    name: "CloudAnalytics B2B SaaS Platform",
    category: "SaaS & Software",
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://saas.tiendastellaris.com",
  },
];

// Prospectos de clínicas dentales iniciales basados en el CSV del usuario
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
  {
    companyName: "Little Sparkle Dental",
    email: "littlesparkledental@gmail.com",
    subject: "Sitio web moderno y citas en línea para Little Sparkle Dental",
    greeting: "Hola equipo de Little Sparkle Dental,",
    intro_and_need:
      "Vi su clínica en Hialeah y mientras buscaba información de su consultorio noté que actualmente no cuentan con un sitio web propio conectado y que las consultas llegan a un correo de Gmail. Tener una página moderna y adaptada a celulares ayuda muchísimo a captar más pacientes locales que buscan agendar en línea.",
    pitch:
      "En Stellaris Dev Solutions desarrollamos sitios web modernos, rápidos y con agendamiento en línea diseñados especialmente para clínicas dentales.",
    demo_url: "https://dental.tiendastellaris.com",
    image_url:
      "https://dental.tiendastellaris.com/BrightSmile_Dental_Demo_HD.jpg",
    closing:
      "Sé que usted y su equipo están ocupados con pacientes todo el día, así que no hace falta hacer llamadas. Si les gusta este estilo, solo respondan a este correo y con gusto les envío una vista previa adaptada para Little Sparkle Dental, junto con opciones simples de precios.",
    signature:
      "Saludos cordiales,\n\nStellaris Dev Solutions\nstellarisdevsolutions@gmail.com",
  },
  {
    companyName: "Ruiz Family Dentistry",
    email: "ruizfamilydentistry@gmail.com",
    subject: "Página web moderna y reservas para Ruiz Family Dentistry",
    greeting: "Hola equipo de Ruiz Family Dentistry,",
    intro_and_need:
      "Encontré su consultorio en Hialeah Gardens y al buscarlos en línea noté que reciben sus consultas por Gmail sin contar todavía con un portal web moderno donde las familias puedan conocer sus servicios y pedir cita fácilmente desde el teléfono.",
    pitch:
      "En Stellaris Dev Solutions desarrollamos sitios web modernos, rápidos y con agendamiento en línea diseñados especialmente para clínicas dentales.",
    demo_url: "https://dental.tiendastellaris.com",
    image_url:
      "https://dental.tiendastellaris.com/BrightSmile_Dental_Demo_HD.jpg",
    closing:
      "Sé que usted y su equipo están ocupados con pacientes todo el día, así que no hace falta hacer llamadas. Si les gusta este estilo, solo respondan a este correo y con gusto les envío una vista previa personalizada para Ruiz Family Dentistry, junto con opciones simples de precios.",
    signature:
      "Saludos cordiales,\n\nStellaris Dev Solutions\nstellarisdevsolutions@gmail.com",
  },
];

export default function OutreachPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("preview");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "sent" | "error">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Galería de maquetas
  const [assets, setAssets] = useState<MockupAsset[]>(DEFAULT_ASSETS);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isBatchSending, setIsBatchSending] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0 });
  const [testSendLoading, setTestSendLoading] = useState(false);
  const [testSendSuccess, setTestSendSuccess] = useState<string | null>(null);
  const [singleSendLoading, setSingleSendLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageUploadRef = useRef<HTMLInputElement>(null);

  // Cargar datos persistentes de localStorage
  useEffect(() => {
    const savedLeads = localStorage.getItem("stellaris_outreach_leads");
    if (savedLeads) {
      try {
        const parsed = JSON.parse(savedLeads);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLeads(parsed);
          setSelectedLeadId(parsed[0].id);
          return;
        }
      } catch (err) {
        console.warn("Error loading leads from storage:", err);
      }
    }

    // Inicializar con la muestra de dentistas
    loadSampleData();
  }, []);

  // Guardar en localStorage cuando cambian los leads
  useEffect(() => {
    if (leads.length > 0) {
      localStorage.setItem("stellaris_outreach_leads", JSON.stringify(leads));
    }
  }, [leads]);

  // Lead activo seleccionado
  const activeLead = leads.find((l) => l.id === selectedLeadId) || leads[0] || null;

  const loadSampleData = () => {
    const formatted: LeadItem[] = SAMPLE_DENTAL_LEADS.map((item, idx) => ({
      ...item,
      id: `sample-${idx + 1}-${Date.now()}`,
      status: "pending",
    }));
    setLeads(formatted);
    setSelectedLeadId(formatted[0].id);
  };

  // Procesar archivo CSV subido
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
            // Extraer nombre de la empresa a partir del saludo o asunto
            let company = "";
            if (row.greeting) {
              company = row.greeting.replace(/Hola (equipo de |Dr\. |Dra\. )?/i, "").replace(/,/g, "").trim();
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
                "Si les interesa ver más detalles, solo respondan a este correo con gusto les envío una propuesta sin compromiso.",
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
        alert(`¡Éxito! Se han cargado ${newLeads.length} prospectos listos para revisar y enviar.`);
      },
      error: (error) => {
        console.error("Error al leer el CSV:", error);
        alert("Error al procesar el archivo CSV. Asegúrate de que esté delimitado por comas.");
      },
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Subir imagen para la maqueta
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeLead) return;

    setUploadingImage(true);
    try {
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        body: file,
      });

      if (!response.ok) {
        throw new Error("Error en la subida a almacenamiento.");
      }

      const data = await response.json();
      if (data.url) {
        // Actualizar el lead activo con la nueva imagen
        updateActiveLead({ image_url: data.url });

        // Añadir también a la galería para reutilizarla
        const newAsset: MockupAsset = {
          id: `custom-${Date.now()}`,
          name: file.name.replace(/\.[^/.]+$/, ""),
          category: "Personalizados",
          url: data.url,
          demoUrl: activeLead.demo_url || "",
        };
        setAssets((prev) => [newAsset, ...prev]);
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      // Fallback a Base64 local para pruebas rápidas
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const base64Url = uploadEvent.target?.result as string;
        if (base64Url) {
          updateActiveLead({ image_url: base64Url });
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingImage(false);
      if (imageUploadRef.current) imageUploadRef.current.value = "";
    }
  };

  // Modificar campo del lead activo
  const updateActiveLead = (fields: Partial<LeadItem>) => {
    if (!activeLead) return;
    setLeads((prev) =>
      prev.map((lead) => (lead.id === activeLead.id ? { ...lead, ...fields } : lead))
    );
  };

  // Aplicar maqueta de la galería a todos los leads
  const applyAssetToAll = (asset: MockupAsset) => {
    setLeads((prev) =>
      prev.map((lead) => ({
        ...lead,
        image_url: asset.url,
        demo_url: asset.demoUrl || lead.demo_url,
      }))
    );
    setIsGalleryOpen(false);
    alert(`Se aplicó la maqueta "${asset.name}" a todos los ${leads.length} prospectos del lote.`);
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
        setTestSendSuccess("¡Correo de prueba enviado con éxito a stellarisdevsolutions@gmail.com! Revisa tu bandeja de entrada.");
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

  // Enviar correo individual al cliente real
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
          errorMessage: result.error || "Fallo en el servicio de Resend",
        });
        alert(`Error al enviar: ${result.error}`);
      }
    } catch (err: any) {
      updateActiveLead({
        status: "error",
        errorMessage: err?.message || "Error al conectar",
      });
      alert(`Error al enviar: ${err?.message}`);
    } finally {
      setSingleSendLoading(false);
    }
  };

  // Enviar todos los pendientes en lote (con 3.5 segundos de pausa entre cada uno para proteger la IP)
  const handleSendBatch = async () => {
    const pendingLeads = leads.filter((l) => l.status === "pending" || l.status === "error");
    if (pendingLeads.length === 0) {
      alert("No hay prospectos pendientes en este lote.");
      return;
    }

    const confirm = window.confirm(
      `¿Deseas enviar ${pendingLeads.length} correos pendientes ahora?\n\nSe enviarán de forma secuencial con una pausa de 3.5 segundos entre cada uno para garantizar la máxima entregabilidad.`
    );
    if (!confirm) return;

    setIsBatchSending(true);
    setBatchProgress({ current: 0, total: pendingLeads.length });

    for (let i = 0; i < pendingLeads.length; i++) {
      const lead = pendingLeads[i];
      setBatchProgress({ current: i + 1, total: pendingLeads.length });

      // Actualizar estado a "sending"
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

      // Esperar 3.5 segundos antes del siguiente envío (si no es el último)
      if (i < pendingLeads.length - 1) {
        await new Promise((res) => setTimeout(res, 3500));
      }
    }

    setIsBatchSending(false);
    alert("¡Lote de prospección completado!");
  };

  // Filtrado de prospectos
  const filteredLeads = leads.filter((lead) => {
    const matchesFilter =
      filterStatus === "all" ? true : lead.status === filterStatus;
    const matchesSearch =
      searchQuery === ""
        ? true
        : lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalCount = leads.length;
  const sentCount = leads.filter((l) => l.status === "sent").length;
  const pendingCount = leads.filter((l) => l.status === "pending").length;

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
            Sube lotes de 10 a 15 prospectos de Gemini / Argon, edita con maquetas visuales y envía con Resend.
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

          {/* Cargar Muestra Dentistas */}
          <button
            type="button"
            onClick={loadSampleData}
            className="px-3.5 py-2 rounded-xl bg-[#202024] hover:bg-[#27272a] text-neutral-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cargar Demo Dentistas</span>
          </button>

          {/* Abrir Galería */}
          <button
            type="button"
            onClick={() => setIsGalleryOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#202024] hover:bg-[#27272a] text-white border border-white/10 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
            <span>Galería de Maquetas</span>
          </button>

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

      {/* Progress & Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#141416] border border-white/10 rounded-2xl p-4">
          <div className="text-xs text-neutral-400 uppercase font-semibold">Total en Lote</div>
          <div className="text-2xl font-bold text-white mt-1">{totalCount}</div>
        </div>

        <div className="bg-[#141416] border border-white/10 rounded-2xl p-4">
          <div className="text-xs text-neutral-400 uppercase font-semibold">Pendientes</div>
          <div className="text-2xl font-bold text-amber-400 mt-1">{pendingCount}</div>
        </div>

        <div className="bg-[#141416] border border-white/10 rounded-2xl p-4">
          <div className="text-xs text-neutral-400 uppercase font-semibold">Enviados con Éxito</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{sentCount}</div>
        </div>

        <div className="bg-[#141416] border border-white/10 rounded-2xl p-4">
          <div className="text-xs text-neutral-400 uppercase font-semibold">Entregabilidad</div>
          <div className="text-2xl font-bold text-white mt-1">
            {totalCount > 0 ? `${Math.round((sentCount / totalCount) * 100)}%` : "0%"}
          </div>
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
        <div className="lg:col-span-5 bg-[#141416] border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[760px]">
          {/* Search & Filter Header */}
          <div className="p-4 border-b border-white/10 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por negocio o correo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#202024] border border-white/10 text-xs text-white placeholder-neutral-500 focus:border-[#FF532A] outline-hidden"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setFilterStatus("all")}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  filterStatus === "all"
                    ? "bg-[#FF532A] text-white"
                    : "bg-[#202024] text-neutral-400 hover:text-white"
                }`}
              >
                Todos ({leads.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus("pending")}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  filterStatus === "pending"
                    ? "bg-amber-500 text-white"
                    : "bg-[#202024] text-neutral-400 hover:text-white"
                }`}
              >
                Pendientes ({pendingCount})
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus("sent")}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  filterStatus === "sent"
                    ? "bg-emerald-500 text-white"
                    : "bg-[#202024] text-neutral-400 hover:text-white"
                }`}
              >
                Enviados ({sentCount})
              </button>
            </div>
          </div>

          {/* Scrollable Leads List */}
          <div className="flex-1 overflow-y-auto divide-y divide-white/5 p-2 space-y-1">
            {filteredLeads.length === 0 ? (
              <div className="text-center py-12 text-neutral-500 text-xs">
                No hay prospectos que coincidan con la búsqueda.
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
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30 shrink-0">
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

                    {/* Status Badge */}
                    <div className="shrink-0 text-right">
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
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Editor & Live Preview (7 cols) */}
        <div className="lg:col-span-7 bg-[#141416] border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[760px]">
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
                    title="Envía una prueba idéntica a stellarisdevsolutions@gmail.com para que veas cómo llega a tu teléfono"
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

                      <div className="flex items-center gap-2">
                        {/* Selector desde la galería */}
                        <button
                          type="button"
                          onClick={() => setIsGalleryOpen(true)}
                          className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold hover:bg-blue-500/30 transition-colors cursor-pointer"
                        >
                          Elegir de Galería
                        </button>

                        {/* Subir imagen local */}
                        <input
                          type="file"
                          ref={imageUploadRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          disabled={uploadingImage}
                          onClick={() => imageUploadRef.current?.click()}
                          className="px-2.5 py-1 rounded-lg bg-white/10 text-white hover:bg-white/20 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {uploadingImage ? "Subiendo..." : "Subir Captura"}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="block text-[11px] text-neutral-400 mb-1">
                          URL de la imagen (Mockup HD):
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
                  {/* Fake Email Client Chrome */}
                  <div className="max-w-[580px] mx-auto bg-white rounded-2xl shadow-2xl border border-neutral-300 overflow-hidden text-neutral-900">
                    {/* Fake Email Header */}
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

                    {/* Email Rendered Body */}
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
              <FileSpreadsheet className="w-12 h-12 mb-3 text-neutral-600" />
              <p className="text-sm font-semibold text-white">No hay ningún prospecto seleccionado</p>
              <p className="text-xs text-neutral-400 mt-1 max-w-sm">
                Selecciona un prospecto de la lista de la izquierda o sube un archivo CSV para empezar.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Galería de Maquetas Reutilizables */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#171717] border border-white/15 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#FF532A]" />
                  <span>Biblioteca de Maquetas & Mockups para Correos</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Elige una maqueta para el prospecto actual o aplícala a todo el lote.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsGalleryOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Grid of Mockups */}
            <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {assets.map((asset) => (
                <div
                  key={asset.id}
                  className="bg-[#202024] border border-white/10 rounded-2xl overflow-hidden hover:border-[#FF532A] transition-all flex flex-col group"
                >
                  <div className="relative aspect-[16/10] bg-black/40 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset.url}
                      alt={asset.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-white font-semibold">
                      {asset.category}
                    </span>
                  </div>

                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="font-bold text-xs text-white line-clamp-1">
                        {asset.name}
                      </div>
                      <div className="text-[11px] text-neutral-400 font-mono mt-0.5 truncate">
                        {asset.demoUrl}
                      </div>
                    </div>

                    <div className="pt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          updateActiveLead({
                            image_url: asset.url,
                            demo_url: asset.demoUrl || activeLead?.demo_url,
                          });
                          setIsGalleryOpen(false);
                        }}
                        className="flex-1 py-1.5 px-2 rounded-xl bg-[#FF532A] hover:bg-[#E5451D] text-white text-xs font-semibold text-center transition-colors cursor-pointer"
                      >
                        Usar en este
                      </button>

                      <button
                        type="button"
                        onClick={() => applyAssetToAll(asset)}
                        title="Asigna esta maqueta a todos los correos del lote actual"
                        className="py-1.5 px-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-300 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        A todo el lote
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#141416] border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-400" />
                <span>Las imágenes se entregan en alta resolución sin comprimir.</span>
              </div>
              <button
                type="button"
                onClick={() => setIsGalleryOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
