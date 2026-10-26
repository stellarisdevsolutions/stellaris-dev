import React from "react";
import { notFound } from "next/navigation";
import { getAllProjects } from "@/db/service";
import { ProjectForm } from "@/components/admin/ProjectForm";

export const metadata = {
  title: "Editar Proyecto | Admin Kano Dev",
};

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projects = await getAllProjects();
  const project = projects.find((p) => p.id === id || p.slug === id);

  if (!project) {
    notFound();
  }

  return <ProjectForm initialData={project} isNew={false} />;
}
