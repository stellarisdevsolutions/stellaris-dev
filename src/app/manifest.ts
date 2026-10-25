import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Stellaris Dev Solutions",
    short_name: "Stellaris Dev",
    description:
      "Desarrollo web a medida, tiendas online, marketplace de plantillas y aplicaciones de alto rendimiento.",
    start_url: "/",
    display: "standalone",
    background_color: "#0e0e11",
    theme_color: "#FF532A",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
