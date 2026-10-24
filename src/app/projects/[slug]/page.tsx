import React from "react";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import { getProjectBySlug, getAllProjects } from "@/db/service";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ProjectDetailView } from "@/components/sections/ProjectDetailView";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const allProjects = await getAllProjects();
  const list = allProjects.length > 0 ? allProjects : PROJECTS;
  return list.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Filtrar los otros proyectos para el carrusel de proyectos
  const allProjects = await getAllProjects();
  const list = allProjects.length > 0 ? allProjects : PROJECTS;
  const otherProjects = list.filter((p) => p.slug !== slug);

  return (
    <div className="min-h-screen bg-white text-[#171717] flex flex-col selection:bg-[#FF532A] selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        <ProjectDetailView project={project} otherProjects={otherProjects} />
      </main>

      <Footer />
    </div>
  );
}
