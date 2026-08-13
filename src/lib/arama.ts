import type { AramaVerisi } from "@/components/SiteArama";
import { tumDuyurular } from "./duyurular";
import { tumEtkinlikler } from "./etkinlikler";
import { ilBul, regions } from "./provinces";

export function aramaVerileri(): AramaVerisi[] {
  const duyurular: AramaVerisi[] = tumDuyurular().map((d) => ({
    baslik: d.baslik,
    ozet: d.ozet,
    url: `/duyurular/${d.slug}`,
    tur: "Duyuru",
    etiket: d.tur,
  }));

  const etkinlikler: AramaVerisi[] = tumEtkinlikler().map((e) => ({
    baslik: e.baslik,
    ozet: e.ozet,
    url: `/etkinlikler/${e.slug}`,
    tur: "Etkinlik",
    etiket: `${e.tur} ${e.sehir}`,
  }));

  const iller: AramaVerisi[] = regions.flatMap((b) =>
    b.iller.map((il) => ({
      baslik: `${il.il} İl Temsilciliği`,
      ozet: il.temsilci !== "Belirleniyor" ? `Temsilci: ${il.temsilci}` : "Temsilci adayı aranıyor",
      url: `/iller/${ilBul(il.il)!.slug}`,
      tur: "İl",
      etiket: b.bolge,
    })),
  );

  return [...duyurular, ...etkinlikler, ...iller];
}
