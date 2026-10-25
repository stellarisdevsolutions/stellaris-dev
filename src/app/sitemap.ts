import type { MetadataRoute } from "next";
import { getAllProjects, getAllMarketplaceProducts } from "@/db/service";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://tiendastellaris.com";
  const now = new Date();

  // 1. Rutas Estáticas Principales
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/marketplace`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  try {
    const [projects, products] = await Promise.all([
      getAllProjects(),
      getAllMarketplaceProducts(),
    ]);

    // 2. Rutas dinámicas de Casos de Estudio / Proyectos
    const projectRoutes: MetadataRoute.Sitemap = (projects || []).map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // 3. Rutas dinámicas de Productos / Plantillas de Marketplace
    const productRoutes: MetadataRoute.Sitemap = (products || []).map((prod) => ({
      url: `${baseUrl}/marketplace/${prod.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...staticRoutes, ...projectRoutes, ...productRoutes];
  } catch (error) {
    console.warn("Error generando sitemap dinámico:", error);
    return staticRoutes;
  }
}
