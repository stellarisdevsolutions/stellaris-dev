"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProjectItem } from "@/data/projects";
import { deleteProjectAction } from "@/app/admin/actions";
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
} from "lucide-react";

interface ProjectsManagerProps {
  initialProjects: ProjectItem[];
}

export function ProjectsManager({ initialProjects }: ProjectsManagerProps) {
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(initialProjects);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const filteredProjects = projectsList.filter((p) => {
    const q = search.toLowerCase();
    const titleEn = typeof p.title === "object" ? p.title.en : p.title || "";
    const titleEs = typeof p.title === "object" ? p.title.es : p.title || "";
    return (
      titleEn.toLowerCase().includes(q) ||
      titleEs.toLowerCase().includes(q) ||
      p.client.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Eliminar definitivamente "${title}"?`)) return;

    setLoading(true);
    try {
      await deleteProjectAction(id);
      setProjectsList((prev) => prev.filter((p) => p.id !== id));
      setMessage({ text: `Proyecto "${title}" eliminado.`, type: "success" });
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
            Crea, edita o elimina los casos de éxito visibles en el sitio web y en{" "}
            <code className="text-[#FF532A]">/projects</code>.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#FF532A] hover:bg-[#e0451e] text-white transition-all shadow-lg shadow-[#FF532A]/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Añadir Proyecto
        </Link>
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
                    <div className="font-semibold text-white">
                      {typeof p.title === "object"
                        ? p.title.es || p.title.en
                        : p.title}
                    </div>
                    {typeof p.title === "object" && p.title.en && p.title.en !== p.title.es && (
                      <div className="text-[10px] text-neutral-400">
                        {p.title.en}
                      </div>
                    )}
                    <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
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
                      <Link
                        href={`/admin/projects/${p.id}/edit`}
                        title="Editar en página completa"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() =>
                          handleDelete(
                            p.id,
                            typeof p.title === "object"
                              ? p.title.es || p.title.en
                              : p.title
                          )
                        }
                        disabled={loading}
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
    </div>
  );
}
