import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bank of America",
    short_name: "Bank of America",
    description: "Acceso directo a Bank of America.",
    start_url: "/bank-of-america",
    scope: "/bank-of-america",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/chase/icons8-bank-of-america-96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
