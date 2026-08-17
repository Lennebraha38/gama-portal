import type { AramaVerisi } from "@/components/SiteArama";
import { tumDuyurular } from "./duyurular";
import { tumEtkinlikler } from "./etkinlikler";
import { tumProjeler } from "./projeler";
import { tumYazilar } from "./gunluk";
import { tumBultenler } from "./bultenler";
import { tumAmalar } from "./amalar";
import { tumChallenge } from "./challenges";
import { ilBul, regions } from "./provinces";

const sayfalar: AramaVerisi[] = [
  {
    baslik: "İl Liderlik Tablosu",
    ozet: "81 il temsilciliğinin üye, etkinlik, proje ve mentorluk skorları.",
    url: "/liderlik",
    tur: "Sayfa",
    etiket: "Liderlik",
  },
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
    baslik: "Haftalık Challenge",
    ozet: "Haftalık teknoloji görevleri; çözümünü gönder, rozet kazan.",
    url: "/challenge",
    tur: "Sayfa",
    etiket: "Challenge",
  },
  {
    baslik: "Teknoloji Quiz",
    ozet: "Uzay, yapay zekâ, yazılım ve robotikten bilgi yarışması.",
    url: "/quiz",
    tur: "Sayfa",
    etiket: "Quiz",
  },
  {
    baslik: "Açık Kaynak Katkı Rehberi",
    ozet: "Git temelleri, fork, pull request ve katkı rozetleri.",
    url: "/kaynak",
    tur: "Sayfa",
    etiket: "Açık Kaynak",
  },
  {
    baslik: "AMA Arşivi",
    ozet: "Konukların soru-cevap buluşmalarının kayıtları ve özetleri.",
    url: "/ama",
    tur: "Sayfa",
    etiket: "AMA",
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

  const yazilar: AramaVerisi[] = tumYazilar().map((y) => ({
    baslik: y.baslik,
    ozet: y.ozet,
    url: `/gunluk/${y.slug}`,
    tur: "Günlük",
    etiket: y.etiketler.join(", "),
  }));

  const bultenler: AramaVerisi[] = tumBultenler().map((b) => ({
    baslik: b.baslik,
    ozet: b.ozet,
    url: `/bultenler/${b.slug}`,
    tur: "Bülten",
    etiket: b.tarih,
  }));

  const amalar: AramaVerisi[] = tumAmalar().map((a) => ({
    baslik: a.konuk,
    ozet: a.ozet,
    url: `/ama/${a.slug}`,
    tur: "AMA",
    etiket: a.alan,
  }));

  const challenges: AramaVerisi[] = tumChallenge().map((c) => ({
    baslik: `Challenge ${c.hafta}: ${c.baslik}`,
    ozet: c.ozet,
    url: `/challenge`,
    tur: "Challenge",
    etiket: `${c.zorluk} ${c.alan}`,
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
    ...yazilar,
    ...bultenler,
    ...amalar,
    ...challenges,
    ...iller,
  ];
}