import fs from "node:fs";
import path from "node:path";
import { markdownHTML } from "./duyurular";

export type GunlukYazisi = {
  slug: string;
  baslik: string;
  tarih: string;
  yazar: string;
  etiketler: string[];
  ozet: string;
  icerik: string;
};

const gunlukDizini = path.join(process.cwd(), "src", "content", "gunluk");

function frontmatterAlan(frontmatter: string, anahtar: string): string {
  const eslesme = frontmatter.match(
    new RegExp(`^${anahtar}:\\s*(?:"([^"]*)"|(.+))$`, "m"),
  );
  if (!eslesme) return "";
  return (eslesme[1] ?? eslesme[2]).trim();
}

export function tumYazilar(): GunlukYazisi[] {
  if (!fs.existsSync(gunlukDizini)) return [];
  const dosyalar = fs.readdirSync(gunlukDizini).filter((f) => f.endsWith(".md"));
  return dosyalar
    .map((dosya) => {
      const ham = fs.readFileSync(path.join(gunlukDizini, dosya), "utf-8");
      const bolumler = ham.split("---");
      if (bolumler.length < 3) return null;
      const frontmatter = bolumler[1];
      const etiketler = frontmatterAlan(frontmatter, "etiketler");
      return {
        slug: dosya.replace(/\.md$/, ""),
        baslik: frontmatterAlan(frontmatter, "baslik"),
        tarih: frontmatterAlan(frontmatter, "tarih"),
        yazar: frontmatterAlan(frontmatter, "yazar"),
        etiketler: etiketler ? etiketler.split(",").map((e) => e.trim()).filter(Boolean) : [],
        ozet: frontmatterAlan(frontmatter, "ozet"),
        icerik: bolumler.slice(2).join("---").trim(),
      };
    })
    .filter((y): y is GunlukYazisi => y !== null && y.baslik !== "")
    .sort((a, b) => b.tarih.localeCompare(a.tarih));
}

export function yaziBul(slug: string): GunlukYazisi | null {
  return tumYazilar().find((y) => y.slug === slug) ?? null;
}

export function gunlukMarkdownHTML(icerik: string): string {
  return markdownHTML(icerik);
}
