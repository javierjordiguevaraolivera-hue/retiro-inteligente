import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Chase Simulator",
    short_name: "Chase",
    description: "Simulador de interfaz bancaria para acceso directo.",
    start_url: "/chase",
    scope: "/chase",
    display: "standalone",
    orientation: "portrait",
    background_color: "#2550aa",
    theme_color: "#2550aa",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
