// Gama Portal — Supabase içerik çekme (build öncesi)
// Tablolar kuruluysa içeriği md dosyalarına indirir; kurulu değilse mevcut
// yerel içerik korunur (build asla bu yüzden başarısız olmaz).
// Kullanım: SUPABASE_URL + SUPABASE_ANON_KEY env ya da .env.local

import fs from "node:fs";
import path from "node:path";

function envOku(anahtar) {
  if (process.env[anahtar]) return process.env[anahtar];
  const dosya = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(dosya)) return undefined;
  const satir = fs
    .readFileSync(dosya, "utf-8")
    .split("\n")
    .find((s) => s.trim().startsWith(anahtar + "="));
  if (!satir) return undefined;
  return satir.slice(anahtar.length + 1).trim();
}

const URL = envOku("NEXT_PUBLIC_SUPABASE_URL");
const ANAHTAR = envOku("NEXT_PUBLIC_SUPABASE_ANON_KEY");

const TABLOLAR = [
  {
    tablo: "icerik_duyurular",
    dizin: "duyurular",
    alanlar: ["baslik", "tarih", "tur", "ozet"],
    ekstralar: {},
  },
  {
    tablo: "icerik_gunluk",
    dizin: "gunluk",
    alanlar: ["baslik", "tarih", "yazar", "etiketler", "ozet"],
    ekstralar: { etiketler: (s) => (s.etiketler || "").split(",").map((e) => e.trim()).filter(Boolean).join(", ") },
  },
  {
    tablo: "icerik_projeler",
    dizin: "projeler",
    alanlar: ["baslik", "durum", "kapsam", "takim", "sehir", "site", "ozet"],
    ekstralar: {},
  },
  {
    tablo: "icerik_etkinlikler",
    dizin: "etkinlikler",
    alanlar: ["baslik", "tarih", "saat", "bitis", "yer", "sehir", "tur", "kayit", "ozet"],
    ekstralar: {},
  },
  {
    tablo: "icerik_bultenler",
    dizin: "bultenler",
    alanlar: ["baslik", "tarih", "ozet"],
    ekstralar: {},
  },
  {
    tablo: "icerik_challenges",
    dizin: "challenges",
    alanlar: ["baslik", "hafta", "zorluk", "alan", "son_tarih", "ozet"],
    ekstralar: {},
  },
  {
    tablo: "icerik_amalar",
    dizin: "amalar",
    alanlar: ["baslik", "konuk", "alan", "tarih", "ozet"],
    ekstralar: {},
  },
];

function onemli(s) {
  return String(s ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r/g, "")
    .trim();
}

function mdUret(satir, tabloAyari) {
  const alanlar = tabloAyari.alanlar
    .map((a) => {
      const deger = tabloAyari.ekstralar[a]
        ? tabloAyari.ekstralar[a](satir)
        : onemli(satir[a]);
      return `${a}: "${deger}"`;
    })
    .join("\n");
  const govde = (satir.icerik || "").replace(/\r/g, "").trim();
  return `---\n${alanlar}\n---\n\n${govde}\n`;
}

async function cek(tabloAyari) {
  const hedef = path.join(process.cwd(), "src", "content", tabloAyari.dizin);
  const yanit = await fetch(
    `${URL}/rest/v1/${tabloAyari.tablo}?select=*&yayinda=eq.true`,
    {
      headers: {
        apikey: ANAHTAR,
        Authorization: `Bearer ${ANAHTAR}`,
        Accept: "application/json",
      },
    }
  );
  if (!yanit.ok) {
    console.warn(
      `icerik-cek: "${tabloAyari.tablo}" okunamadi (HTTP ${yanit.status}) — yerel icerik korunuyor`
    );
    return;
  }
  const satirlar = await yanit.json();
  fs.mkdirSync(hedef, { recursive: true });
  for (const dosya of fs.readdirSync(hedef)) {
    if (dosya.endsWith(".md")) fs.rmSync(path.join(hedef, dosya));
  }
  let yazilan = 0;
  for (const satir of satirlar) {
    if (!satir.slug || !satir.baslik) continue;
    fs.writeFileSync(path.join(hedef, `${satir.slug}.md`), mdUret(satir, tabloAyari));
    yazilan++;
  }
  console.log(`icerik-cek: ${tabloAyari.tablo} -> ${yazilan} icerik`);
}

async function ana() {
  if (!URL || !ANAHTAR) {
    console.warn("icerik-cek: Supabase env yok — yerel icerik korunuyor");
    return;
  }
  for (const t of TABLOLAR) {
    try {
      await cek(t);
    } catch (hata) {
      console.warn(`icerik-cek: "${t.tablo}" atlandi (${hata.message})`);
    }
  }
}

ana();
