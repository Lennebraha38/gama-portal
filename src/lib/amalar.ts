import fs from "node:fs";
import path from "node:path";
import { markdownHTML } from "./duyurular";

export type Ama = {
  slug: string;
  konuk: string;
  alan: string;
  tarih: string;
  ozet: string;
  icerik: string;
};

const amalarDizini = path.join(process.cwd(), "src", "content", "amalar");

function frontmatterAlan(frontmatter: string, anahtar: string): string {
  const eslesme = frontmatter.match(
    new RegExp(`^${anahtar}:\\s*(?:"([^"]*)"|(.+))$`, "m"),
  );
  if (!eslesme) return "";
  return (eslesme[1] ?? eslesme[2]).trim();
}

export function tumAmalar(): Ama[] {
  if (!fs.existsSync(amalarDizini)) return [];
  const dosyalar = fs.readdirSync(amalarDizini).filter((f) => f.endsWith(".md"));
  return dosyalar
    .map((dosya) => {
      const ham = fs.readFileSync(path.join(amalarDizini, dosya), "utf-8");
      const bolumler = ham.split("---");
      if (bolumler.length < 3) return null;
      const frontmatter = bolumler[1];
      return {
        slug: dosya.replace(/\.md$/, ""),
        konuk: frontmatterAlan(frontmatter, "konuk"),
        alan: frontmatterAlan(frontmatter, "alan"),
        tarih: frontmatterAlan(frontmatter, "tarih"),
        ozet: frontmatterAlan(frontmatter, "ozet"),
        icerik: bolumler.slice(2).join("---").trim(),
      };
    })
    .filter((a): a is Ama => a !== null && a.konuk !== "")
    .sort((a, b) => b.tarih.localeCompare(a.tarih));
}

export function amaBul(slug: string): Ama | null {
  return tumAmalar().find((a) => a.slug === slug) ?? null;
}

export function amaMarkdownHTML(icerik: string): string {
  return markdownHTML(icerik);
}