import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { tumDuyurular } from "@/lib/duyurular";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/projeler",
    "/etkinlikler",
    "/duyurular",
    "/iller",
    "/hakkimizda",
    "/sss",
    "/katil",
    "/iletisim",
    "/temsilci",
  ];

  const duyurular = tumDuyurular().map((d) => ({
    url: `${siteConfig.siteUrl}/duyurular/${d.slug}`,
    lastModified: new Date(d.tarih),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...routes.map((route) => ({
      url: `${siteConfig.siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "/" ? 1 : 0.7,
    })),
    ...duyurular,
  ];
}
