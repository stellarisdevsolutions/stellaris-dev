import React from "react";
import type { Metadata } from "next";
import { getAllProjects } from "@/db/service";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ProjectsCatalog } from "@/components/sections/ProjectsCatalog";

export const metadata: Metadata = {
  title: "Proyectos & Casos de Éxito",
  description:
    "Explora nuestros casos de éxito y aplicaciones web desarrolladas con Next.js, React y arquitecturas en la nube por Stellaris Dev Solutions.",
  alternates: {
    canonical: "/projects",
  },
};

export default async function ProyectosListPage() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen bg-white text-[#171717] flex flex-col selection:bg-[#FF532A] selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-24">
        <ProjectsCatalog initialProjects={projects} />
      </main>

      <Footer />
    </div>
  );
}
