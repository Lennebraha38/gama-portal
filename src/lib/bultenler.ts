import fs from "node:fs";
import path from "node:path";
import { markdownHTML } from "./duyurular";

export type Bulten = {
  slug: string;
  baslik: string;
  tarih: string;
  ozet: string;
  icerik: string;
};

const bultenlerDizini = path.join(process.cwd(), "src", "content", "bultenler");

function frontmatterAlan(frontmatter: string, anahtar: string): string {
  const eslesme = frontmatter.match(
    new RegExp(`^${anahtar}:\\s*(?:"([^"]*)"|(.+))$`, "m"),
  );
  if (!eslesme) return "";
  return (eslesme[1] ?? eslesme[2]).trim();
}

export function tumBultenler(): Bulten[] {
  if (!fs.existsSync(bultenlerDizini)) return [];
  const dosyalar = fs.readdirSync(bultenlerDizini).filter((f) => f.endsWith(".md"));
  return dosyalar
    .map((dosya) => {
      const ham = fs.readFileSync(path.join(bultenlerDizini, dosya), "utf-8");
      const bolumler = ham.split("---");
      if (bolumler.length < 3) return null;
      const frontmatter = bolumler[1];
      return {
        slug: dosya.replace(/\.md$/, ""),
        baslik: frontmatterAlan(frontmatter, "baslik"),
        tarih: frontmatterAlan(frontmatter, "tarih"),
        ozet: frontmatterAlan(frontmatter, "ozet"),
        icerik: bolumler.slice(2).join("---").trim(),
      };
    })
    .filter((b): b is Bulten => b !== null && b.baslik !== "")
    .sort((a, b) => b.tarih.localeCompare(a.tarih));
}

export function bultenBul(slug: string): Bulten | null {
  return tumBultenler().find((b) => b.slug === slug) ?? null;
}

export function bultenMarkdownHTML(icerik: string): string {
  return markdownHTML(icerik);
}