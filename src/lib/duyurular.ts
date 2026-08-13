import fs from "node:fs";
import path from "node:path";

export type Duyuru = {
  slug: string;
  baslik: string;
  tarih: string;
  tur: string;
  ozet: string;
  icerik: string;
};

const duyurularDizini = path.join(process.cwd(), "src", "content", "duyurular");

function frontmatterAlan(frontmatter: string, anahtar: string): string {
  const eslesme = frontmatter.match(new RegExp(`^${anahtar}:"?(.*?)"?$`, "m"));
  return eslesme ? eslesme[1].trim() : "";
}

export function tumDuyurular(): Duyuru[] {
  if (!fs.existsSync(duyurularDizini)) return [];
  const dosyalar = fs.readdirSync(duyurularDizini).filter((f) => f.endsWith(".md"));
  const duyurular = dosyalar
    .map((dosya) => {
      const ham = fs.readFileSync(path.join(duyurularDizini, dosya), "utf-8");
      const bolumler = ham.split("---");
      if (bolumler.length < 3) return null;
      const frontmatter = bolumler[1];
      return {
        slug: dosya.replace(/\.md$/, ""),
        baslik: frontmatterAlan(frontmatter, "baslik"),
        tarih: frontmatterAlan(frontmatter, "tarih"),
        tur: frontmatterAlan(frontmatter, "tur"),
        ozet: frontmatterAlan(frontmatter, "ozet"),
        icerik: bolumler.slice(2).join("---").trim(),
      };
    })
    .filter((d): d is Duyuru => d !== null && d.baslik !== "")
    .sort((a, b) => b.tarih.localeCompare(a.tarih));
  return duyurular;
}

export function duyuruBul(slug: string): Duyuru | null {
  return tumDuyurular().find((d) => d.slug === slug) ?? null;
}

const kalin = (s: string) => s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

function satirIci(paragraf: string): string {
  return kalin(paragraf.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-gama-400 hover:text-gama-300 underline">$1</a>'));
}

export function markdownHTML(icerik: string): string {
  const satirlar = icerik.split("\n");
  const bloklar: string[] = [];
  let liste: string[] = [];

  const listeKapat = () => {
    if (liste.length > 0) {
      bloklar.push(`<ul class="list-disc pl-5 space-y-1.5">${liste.join("")}</ul>`);
      liste = [];
    }
  };

  for (const satir of satirlar) {
    if (satir.startsWith("## ")) {
      listeKapat();
      bloklar.push(`<h2 class="mt-8 text-xl font-bold text-white">${satirIci(satir.slice(3))}</h2>`);
    } else if (satir.startsWith("- ")) {
      liste.push(`<li>${satirIci(satir.slice(2))}</li>`);
    } else if (satir.trim() === "") {
      listeKapat();
    } else {
      listeKapat();
      bloklar.push(`<p class="leading-7 text-zinc-200">${satirIci(satir.trim())}</p>`);
    }
  }
  listeKapat();
  return bloklar.join("");
}
