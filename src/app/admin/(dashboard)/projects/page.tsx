import React from "react";
import { getAllProjects } from "@/db/service";
import { ProjectsManager } from "@/components/admin/ProjectsManager";

export const metadata = {
  title: "Gestión de Proyectos | Admin Stellaris",
};

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  return <ProjectsManager initialProjects={projects} />;
}
