import fs from "node:fs";
import path from "node:path";
import { markdownHTML } from "./duyurular";

export type Proje = {
  slug: string;
  baslik: string;
  durum: string;
  kapsam: string;
  takim: string;
  sehir: string;
  site: string;
  ozet: string;
  icerik: string;
};

const projelerDizini = path.join(process.cwd(), "src", "content", "projeler");

function frontmatterAlan(frontmatter: string, anahtar: string): string {
  const eslesme = frontmatter.match(
    new RegExp(`^${anahtar}:\\s*(?:"([^"]*)"|(.+))$`, "m"),
  );
  if (!eslesme) return "";
  return (eslesme[1] ?? eslesme[2]).trim();
}

export function tumProjeler(): Proje[] {
  if (!fs.existsSync(projelerDizini)) return [];
  const dosyalar = fs.readdirSync(projelerDizini).filter((f) => f.endsWith(".md"));
  return dosyalar
    .map((dosya) => {
      const ham = fs.readFileSync(path.join(projelerDizini, dosya), "utf-8");
      const bolumler = ham.split("---");
      if (bolumler.length < 3) return null;
      const frontmatter = bolumler[1];
      return {
        slug: dosya.replace(/\.md$/, ""),
        baslik: frontmatterAlan(frontmatter, "baslik"),
        durum: frontmatterAlan(frontmatter, "durum"),
        kapsam: frontmatterAlan(frontmatter, "kapsam"),
        takim: frontmatterAlan(frontmatter, "takim"),
        sehir: frontmatterAlan(frontmatter, "sehir"),
        site: frontmatterAlan(frontmatter, "site"),
        ozet: frontmatterAlan(frontmatter, "ozet"),
        icerik: bolumler.slice(2).join("---").trim(),
      };
    })
    .filter((p): p is Proje => p !== null && p.baslik !== "");
}

export function projeBul(slug: string): Proje | null {
  return tumProjeler().find((p) => p.slug === slug) ?? null;
}

export function projeMarkdownHTML(icerik: string): string {
  return markdownHTML(icerik);
}
