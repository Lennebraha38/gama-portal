import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { tumDuyurular } from "@/lib/duyurular";
import { tumEtkinlikler } from "@/lib/etkinlikler";
import { ilBul, tumIller } from "@/lib/provinces";

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

  const etkinlikler = tumEtkinlikler().map((e) => ({
    url: `${siteConfig.siteUrl}/etkinlikler/${e.slug}`,
    lastModified: new Date(e.tarih),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const iller = tumIller.map((ad) => {
    const il = ilBul(ad)!;
    return {
      url: `${siteConfig.siteUrl}/iller/${il.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    };
  });

  return [
    ...routes.map((route) => ({
      url: `${siteConfig.siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "/" ? 1 : 0.7,
    })),
    ...duyurular,
    ...etkinlikler,
    ...iller,
  ];
}
