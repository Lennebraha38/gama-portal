import fs from "node:fs";
import path from "node:path";
import { markdownHTML } from "./duyurular";

export type Challenge = {
  slug: string;
  baslik: string;
  hafta: number;
  zorluk: string;
  alan: string;
  sonTarih: string;
  ozet: string;
  icerik: string;
};

const challengesDizini = path.join(process.cwd(), "src", "content", "challenges");

function frontmatterAlan(frontmatter: string, anahtar: string): string {
  const eslesme = frontmatter.match(
    new RegExp(`^${anahtar}:\\s*(?:"([^"]*)"|(.+))$`, "m"),
  );
  if (!eslesme) return "";
  return (eslesme[1] ?? eslesme[2]).trim();
}

export function tumChallenge(): Challenge[] {
  if (!fs.existsSync(challengesDizini)) return [];
  const dosyalar = fs.readdirSync(challengesDizini).filter((f) => f.endsWith(".md"));
  return dosyalar
    .map((dosya) => {
      const ham = fs.readFileSync(path.join(challengesDizini, dosya), "utf-8");
      const bolumler = ham.split("---");
      if (bolumler.length < 3) return null;
      const frontmatter = bolumler[1];
      const hafta = Number.parseInt(frontmatterAlan(frontmatter, "hafta"), 10);
      return {
        slug: dosya.replace(/\.md$/, ""),
        baslik: frontmatterAlan(frontmatter, "baslik"),
        hafta: Number.isFinite(hafta) ? hafta : 1,
        zorluk: frontmatterAlan(frontmatter, "zorluk") || "Orta",
        alan: frontmatterAlan(frontmatter, "alan"),
        sonTarih: frontmatterAlan(frontmatter, "son_tarih"),
        ozet: frontmatterAlan(frontmatter, "ozet"),
        icerik: bolumler.slice(2).join("---").trim(),
      };
    })
    .filter((c): c is Challenge => c !== null && c.baslik !== "")
    .sort((a, b) => b.hafta - a.hafta);
}

export function challengeBul(slug: string): Challenge | null {
  return tumChallenge().find((c) => c.slug === slug) ?? null;
}

export function aktifChallenge(): Challenge | null {
  const bugun = new Date().toISOString().slice(0, 10);
  return (
    tumChallenge().find((c) => !c.sonTarih || c.sonTarih >= bugun) ?? null
  );
}

export function challengeMarkdownHTML(icerik: string): string {
  return markdownHTML(icerik);
}