"use client";

import React, { useState } from "react";
import { ProjectItem } from "@/data/projects";
import {
  saveProjectAction,
  deleteProjectAction,
} from "@/app/admin/actions";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  X,
  Check,
  FolderGit2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { ImageUploader } from "./ImageUploader";

interface ProjectsManagerProps {
  initialProjects: ProjectItem[];
}

export function ProjectsManager({ initialProjects }: ProjectsManagerProps) {
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(initialProjects);
  const [search, setSearch] = useState("");
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<ProjectItem>>({});

  const filteredProjects = projectsList.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.client.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  const openCreateModal = () => {
    setFormData({
      id: "project-" + Date.now(),
      slug: "",
      title: "",
      client: "",
      year: "2026",
      category: "web",
      categoryLabel: { es: "Web App", en: "Web App" },
      tagline: { es: "", en: "" },
      overview: { es: "", en: "" },
      challenge: { es: "", en: "" },
      solution: { es: "", en: "" },
      metrics: [
        { value: "+100%", label: { es: "Rendimiento", en: "Performance" } },
        { value: "0.5s", label: { es: "Carga", en: "Load speed" } },
        { value: "100/100", label: { es: "Calificación", en: "Score" } },
      ],
      features: {
        es: ["Desarrollado con Next.js 16", "Diseño ultraligero y responsivo"],
        en: ["Built with Next.js 16", "Ultralight responsive design"],
      },
      stack: ["Next.js 16", "React 19", "Tailwind CSS"],
      liveUrl: "https://stellaris-dev.vercel.app",
      accent: "#FF532A",
      bgPreview: "bg-gradient-to-br from-neutral-900 to-[#171717]",
    });
    setIsCreating(true);
    setEditingProject(null);
  };

  const openEditModal = (project: ProjectItem) => {
    setFormData({ ...project });
    setEditingProject(project);
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) return;

    setLoading(true);
    setMessage(null);

    try {
      const saved = await saveProjectAction(formData as ProjectItem);
      if (editingProject) {
        setProjectsList((prev) =>
          prev.map((p) => (p.id === saved.id ? saved : p))
        );
      } else {
        setProjectsList((prev) => [saved, ...prev]);
      }
      setIsCreating(false);
      setEditingProject(null);
      setMessage({ text: "Proyecto guardado correctamente.", type: "success" });
    } catch (err: any) {
      setMessage({ text: err?.message || "Error al guardar el proyecto.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Eliminar definitivamente "${title}"?`)) return;

    setLoading(true);
    try {
      await deleteProjectAction(id);
      setProjectsList((prev) => prev.filter((p) => p.id !== id));
      setMessage({ text: "Proyecto eliminado.", type: "success" });
    } catch (err: any) {
      setMessage({ text: "Error al eliminar proyecto.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <FolderGit2 className="w-6 h-6 text-[#FF532A]" />
            Gestión de Proyectos
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Crea, edita o elimina los casos de éxito visibles en el sitio web y en <code className="text-[#FF532A]">/projects</code>.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#FF532A] hover:bg-[#e0451e] text-white transition-all shadow-lg shadow-[#FF532A]/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Añadir Proyecto
        </button>
      </div>

      {/* Feedback Alert */}
      {message && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between text-xs border ${
            message.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === "success" ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-neutral-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter and Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por título, cliente o slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#171719] border border-white/10 focus:border-[#FF532A] text-white text-xs rounded-xl pl-10 pr-4 py-2.5 outline-none placeholder:text-neutral-500"
          />
        </div>
        <span className="text-xs text-neutral-400 font-mono">
          {filteredProjects.length} proyectos
        </span>
      </div>

      {/* Projects Table */}
      <div className="bg-[#171719] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#202024] border-b border-white/10 text-neutral-400 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-3.5">Proyecto</th>
                <th className="px-6 py-3.5">Cliente</th>
                <th className="px-6 py-3.5">Categoría</th>
                <th className="px-6 py-3.5">Año</th>
                <th className="px-6 py-3.5">Stack</th>
                <th className="px-6 py-3.5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProjects.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">{p.title}</div>
                    <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                      /projects/{p.slug}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-300">{p.client}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/5 border border-white/10 text-neutral-300">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-400 font-mono">{p.year}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {p.stack?.slice(0, 3).map((s, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-neutral-300">
                          {s}
                        </span>
                      ))}
                      {p.stack?.length > 3 && (
                        <span className="text-[10px] text-neutral-500">+{p.stack.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`/projects/${p.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        title="Ver página pública"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => openEditModal(p)}
                        title="Editar"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.title)}
                        title="Eliminar"
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Editor */}
      {(isCreating || editingProject) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#171719] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF532A]" />
                {isCreating ? "Crear Nuevo Proyecto" : `Editar: ${editingProject?.title}`}
              </h2>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingProject(null);
                }}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Título del Proyecto *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-[#202024] border border-white/10 text-white text-xs rounded-xl px-3 py-2.5 outline-none focus:border-[#FF532A]"
                    placeholder="Ej. Nova Finanzas App"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Slug (URL limpia) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                      })
                    }
                    className="w-full bg-[#202024] border border-white/10 text-white text-xs rounded-xl px-3 py-2.5 outline-none focus:border-[#FF532A] font-mono"
                    placeholder="ej. nova-finanzas"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Cliente
                  </label>
                  <input
                    type="text"
                    value={formData.client || ""}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full bg-[#202024] border border-white/10 text-white text-xs rounded-xl px-3 py-2.5 outline-none focus:border-[#FF532A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Año
                  </label>
                  <input
                    type="text"
                    value={formData.year || "2026"}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full bg-[#202024] border border-white/10 text-white text-xs rounded-xl px-3 py-2.5 outline-none focus:border-[#FF532A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Categoría
                  </label>
                  <select
                    value={formData.category || "web"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as any,
                        categoryLabel: {
                          es: e.target.value === "landing" ? "Landing Page" : e.target.value === "ecommerce" ? "E-Commerce" : "Web App",
                          en: e.target.value === "landing" ? "Landing Page" : e.target.value === "ecommerce" ? "E-Commerce" : "Web App",
                        },
                      })
                    }
                    className="w-full bg-[#202024] border border-white/10 text-white text-xs rounded-xl px-3 py-2.5 outline-none focus:border-[#FF532A]"
                  >
                    <option value="web">Web App</option>
                    <option value="landing">Landing Page</option>
                    <option value="ecommerce">E-Commerce</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Tagline (Resumen breve de impacto)
                </label>
                <input
                  type="text"
                  value={formData.tagline?.es || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tagline: { es: e.target.value, en: e.target.value },
                    })
                  }
                  className="w-full bg-[#202024] border border-white/10 text-white text-xs rounded-xl px-3 py-2.5 outline-none focus:border-[#FF532A]"
                  placeholder="Plataforma de alta velocidad para..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Descripción General (Overview)
                </label>
                <textarea
                  rows={2}
                  value={formData.overview?.es || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      overview: { es: e.target.value, en: e.target.value },
                    })
                  }
                  className="w-full bg-[#202024] border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-[#FF532A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    El Desafío (Challenge)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.challenge?.es || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        challenge: { es: e.target.value, en: e.target.value },
                      })
                    }
                    className="w-full bg-[#202024] border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-[#FF532A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Nuestra Solución (Solution)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.solution?.es || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        solution: { es: e.target.value, en: e.target.value },
                      })
                    }
                    className="w-full bg-[#202024] border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-[#FF532A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Stack Tecnológico (separado por comas)
                </label>
                <input
                  type="text"
                  value={formData.stack?.join(", ") || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full bg-[#202024] border border-white/10 text-white text-xs rounded-xl px-3 py-2.5 outline-none focus:border-[#FF532A]"
                  placeholder="Next.js 16, React 19, Tailwind CSS, PostgreSQL"
                />
              </div>

              <div>
                <ImageUploader
                  label="Captura o Portada del Proyecto (Vercel Blob)"
                  value={formData.bgPreview?.startsWith("http") ? formData.bgPreview : ""}
                  onChange={(url) => setFormData({ ...formData, bgPreview: url })}
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingProject(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#FF532A] hover:bg-[#e0451e] text-white shadow-lg shadow-[#FF532A]/20 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {loading && <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  Guardar Proyecto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
