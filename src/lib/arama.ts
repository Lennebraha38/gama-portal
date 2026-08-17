import type { AramaVerisi } from "@/components/SiteArama";
import { tumDuyurular } from "./duyurular";
import { tumEtkinlikler } from "./etkinlikler";
import { tumProjeler } from "./projeler";
import { tumBultenler } from "./bultenler";
import { ilBul, regions } from "./provinces";

const sayfalar: AramaVerisi[] = [
  {
    baslik: "Mentorluk Programı",
    ozet: "Mentor ve mentee başvuruları; kohort bazlı adil eşleştirme.",
    url: "/mentor",
    tur: "Sayfa",
    etiket: "Mentorluk",
  },
  {
    baslik: "Teknoloji Ekosistemi",
    ozet: "TEKNOFEST Girişim Programı, DENEYAP atölyeleri ve MTKB temaları.",
    url: "/ekosistem",
    tur: "Sayfa",
    etiket: "Ekosistem",
  },
  {
    baslik: "Bültenler",
    ozet: "Topluluk gelişmelerinin e-posta bülteni arşivi.",
    url: "/bultenler",
    tur: "Sayfa",
    etiket: "Bülten",
  },
  {
    baslik: "Üye Girişi",
    ozet: "E-posta ile üye ol, profilini oluştur ve rozetlerini topla.",
    url: "/uye",
    tur: "Sayfa",
    etiket: "Üyelik",
  },
];

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

  const bultenler: AramaVerisi[] = tumBultenler().map((b) => ({
    baslik: b.baslik,
    ozet: b.ozet,
    url: `/bultenler/${b.slug}`,
    tur: "Bülten",
    etiket: b.tarih,
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

  return [
    ...sayfalar,
    ...duyurular,
    ...etkinlikler,
    ...projeler,
    ...bultenler,
    ...iller,
  ];
}
