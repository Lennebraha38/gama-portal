import { tumDuyurular } from "@/lib/duyurular";
import { tumBultenler } from "@/lib/bultenler";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function xmlEsc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const duyurular = tumDuyurular();
  const bultenler = tumBultenler();

  const items = [...duyurular, ...bultenler]
    .sort((a, b) => b.tarih.localeCompare(a.tarih))
    .map((kayit) => {
      const url = "tur" in kayit
        ? `${siteConfig.siteUrl}/duyurular/${kayit.slug}`
        : `${siteConfig.siteUrl}/bultenler/${kayit.slug}`;
      return `    <item>
      <title>${xmlEsc(kayit.baslik)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(kayit.tarih + "T00:00:00Z").toUTCString()}</pubDate>
      <category>${xmlEsc(
        "tur" in kayit
          ? (kayit as { tur: string }).tur
          : "Bülten",
      )}</category>
      <description>${xmlEsc(kayit.ozet)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEsc(siteConfig.name)} — Duyurular ve Bültenler</title>
    <link>${siteConfig.siteUrl}/duyurular</link>
    <description>${xmlEsc(siteConfig.mission)}</description>
    <language>tr-TR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
