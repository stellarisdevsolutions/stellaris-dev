import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import { getProjectBySlug, getAllProjects } from "@/db/service";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ProjectDetailView } from "@/components/sections/ProjectDetailView";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Proyecto no encontrado",
    };
  }

  const rawTitle =
    typeof project.title === "string"
      ? project.title
      : project.title?.es || project.title?.en || "Proyecto";
  const title = `${rawTitle} | Caso de Éxito & Proyecto`;
  const rawDesc =
    typeof project.tagline === "object"
      ? project.tagline?.es || project.tagline?.en
      : "";
  const description =
    rawDesc ||
    `Conoce el desarrollo y arquitectura web de ${rawTitle} realizado por Kano Dev Solutions con Next.js y React.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${title} | Kano Dev`,
      description,
      url: `https://tiendastellaris.com/projects/${project.slug}`,
      images: project.bgPreview ? [{ url: project.bgPreview, alt: rawTitle }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Kano Dev`,
      description,
      images: project.bgPreview ? [project.bgPreview] : undefined,
    },
  };
}

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

  const rawTitle =
    typeof project.title === "string"
      ? project.title
      : project.title?.es || project.title?.en || "Proyecto";
  const rawDesc =
    typeof project.tagline === "object"
      ? project.tagline?.es || project.tagline?.en
      : "";

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: rawTitle,
    description: rawDesc,
    url: `https://tiendastellaris.com/projects/${project.slug}`,
    image: project.bgPreview ? [project.bgPreview] : [`https://tiendastellaris.com/opengraph-image`],
    creator: {
      "@type": "Organization",
      name: "Kano Dev Solutions",
      url: "https://tiendastellaris.com",
    },
    dateCreated: project.year || "2026",
    genre: "Desarrollo Web & Software",
  };

  return (
    <div className="min-h-screen bg-white text-[#171717] flex flex-col selection:bg-[#E6FF2A] selection:text-[#0C4651]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        <ProjectDetailView project={project} otherProjects={otherProjects} />
      </main>

      <Footer />
    </div>
  );
}
