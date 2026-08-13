import fs from "node:fs";
import path from "node:path";
import { markdownHTML } from "./duyurular";

export type Etkinlik = {
  slug: string;
  baslik: string;
  tarih: string;
  saat: string;
  bitis: string;
  yer: string;
  sehir: string;
  tur: string;
  kayit: string;
  ozet: string;
  icerik: string;
};

export type EtkinlikDetay = Etkinlik & {
  sonaErdi: boolean;
  baslangicISO: string;
  bitisISO: string;
};

const etkinliklerDizini = path.join(process.cwd(), "src", "content", "etkinlikler");

function frontmatterAlan(frontmatter: string, anahtar: string): string {
  const eslesme = frontmatter.match(
    new RegExp(`^${anahtar}:\\s*(?:"([^"]*)"|(.+))$`, "m"),
  );
  if (!eslesme) return "";
  return (eslesme[1] ?? eslesme[2]).trim();
}

export function tumEtkinlikler(): Etkinlik[] {
  if (!fs.existsSync(etkinliklerDizini)) return [];
  const dosyalar = fs.readdirSync(etkinliklerDizini).filter((f) => f.endsWith(".md"));
  return dosyalar
    .map((dosya) => {
      const ham = fs.readFileSync(path.join(etkinliklerDizini, dosya), "utf-8");
      const bolumler = ham.split("---");
      if (bolumler.length < 3) return null;
      const frontmatter = bolumler[1];
      return {
        slug: dosya.replace(/\.md$/, ""),
        baslik: frontmatterAlan(frontmatter, "baslik"),
        tarih: frontmatterAlan(frontmatter, "tarih"),
        saat: frontmatterAlan(frontmatter, "saat") || "10:00",
        bitis: frontmatterAlan(frontmatter, "bitis") || "17:00",
        yer: frontmatterAlan(frontmatter, "yer"),
        sehir: frontmatterAlan(frontmatter, "sehir"),
        tur: frontmatterAlan(frontmatter, "tur"),
        kayit: frontmatterAlan(frontmatter, "kayit"),
        ozet: frontmatterAlan(frontmatter, "ozet"),
        icerik: bolumler.slice(2).join("---").trim(),
      };
    })
    .filter((e): e is Etkinlik => e !== null && e.baslik !== "")
    .sort((a, b) => b.tarih.localeCompare(a.tarih));
}

export function etkinlikBul(slug: string): Etkinlik | null {
  return tumEtkinlikler().find((e) => e.slug === slug) ?? null;
}

export function etkinlikDetayi(e: Etkinlik): EtkinlikDetay {
  const bitisTam = e.bitis.includes("T")
    ? e.bitis
    : `${e.tarih}T${e.bitis}:00`;
  const baslangicISO = new Date(`${e.tarih}T${e.saat}:00`).toISOString();
  const bitisISO = new Date(bitisTam).toISOString();
  return {
    ...e,
    sonaErdi: new Date(baslangicISO).getTime() < Date.now(),
    baslangicISO,
    bitisISO,
  };
}

export function yaklasanEtkinlikler(limit?: number): EtkinlikDetay[] {
  return tumEtkinlikler()
    .map(etkinlikDetayi)
    .filter((e) => !e.sonaErdi)
    .slice(0, limit ?? tumEtkinlikler().length);
}

export function etkinlikMarkdownHTML(icerik: string): string {
  return markdownHTML(icerik);
}
