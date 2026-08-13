import type { AramaVerisi } from "@/components/SiteArama";
import { tumDuyurular } from "./duyurular";
import { tumEtkinlikler } from "./etkinlikler";
import { tumProjeler } from "./projeler";
import { tumYazilar } from "./gunluk";
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

  const projeler: AramaVerisi[] = tumProjeler().map((p) => ({
    baslik: p.baslik,
    ozet: p.ozet,
    url: `/projeler/${p.slug}`,
    tur: "Proje",
    etiket: p.kapsam,
  }));

  const yazilar: AramaVerisi[] = tumYazilar().map((y) => ({
    baslik: y.baslik,
    ozet: y.ozet,
    url: `/gunluk/${y.slug}`,
    tur: "Günlük",
    etiket: y.etiketler.join(", "),
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

  return [...duyurular, ...etkinlikler, ...projeler, ...yazilar, ...iller];
}
