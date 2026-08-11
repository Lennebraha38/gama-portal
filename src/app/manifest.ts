import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Gama",
    description: siteConfig.mission,
    start_url: `${siteConfig.siteUrl}/`,
    display: "standalone",
    background_color: "#050816",
    theme_color: "#050816",
    icons: [
      {
        src: `${siteConfig.siteUrl}/icon.png`,
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${siteConfig.siteUrl}/gama-logo-128.webp`,
        sizes: "128x128",
        type: "image/webp",
        purpose: "any",
      },
    ],
  };
}
