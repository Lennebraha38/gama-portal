#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const kok = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const kaynak = path.join(kok, "src", "content", "etkinlikler");
const hedef = path.join(kok, "public", "etkinlikler");

function alan(frontmatter, anahtar) {
  const eslesme = frontmatter.match(new RegExp(`^${anahtar}:\\s*(?:"([^"]*)"|(.+))$`, "m"));
  return eslesme ? (eslesme[1] ?? eslesme[2]).trim() : "";
}

function icStandart(metin) {
  return metin.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function icsUret(e) {
  const baslangicISO = new Date(`${e.tarih}T${e.saat}:00`).toISOString();
  const bitisHam = e.bitis.includes("T") ? e.bitis : `${e.tarih}T${e.bitis}:00`;
  const bitisISO = new Date(bitisHam).toISOString();
  const fmt = (iso) => iso.replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const olusturma = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const satirlar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Gama Topluluğu//Etkinlikler//TR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${e.slug}@gama-portal`,
    `DTSTAMP:${olusturma}`,
    `DTSTART:${fmt(baslangicISO)}`,
    `DTEND:${fmt(bitisISO)}`,
    `SUMMARY:${icStandart(e.baslik)}`,
    `DESCRIPTION:${icStandart(e.ozet)}`,
    e.yer ? `LOCATION:${icStandart(`${e.yer}${e.sehir ? `, ${e.sehir}` : ""}`)}` : "",
    e.kayit ? `URL:${e.kayit}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
  return `${satirlar}\r\n`;
}

if (!fs.existsSync(kaynak)) {
  console.log("Etkinlik içeriği yok, ICS üretilmedi.");
  process.exit(0);
}

fs.mkdirSync(hedef, { recursive: true });

const dosyalar = fs.readdirSync(kaynak).filter((f) => f.endsWith(".md"));
let adet = 0;

for (const dosya of dosyalar) {
  const ham = fs.readFileSync(path.join(kaynak, dosya), "utf-8");
  const bolumler = ham.split("---");
  if (bolumler.length < 3) continue;
  const e = {
    slug: dosya.replace(/\.md$/, ""),
    baslik: alan(bolumler[1], "baslik"),
    tarih: alan(bolumler[1], "tarih"),
    saat: alan(bolumler[1], "saat") || "10:00",
    bitis: alan(bolumler[1], "bitis") || "17:00",
    yer: alan(bolumler[1], "yer"),
    sehir: alan(bolumler[1], "sehir"),
    ozet: alan(bolumler[1], "ozet"),
    kayit: alan(bolumler[1], "kayit"),
  };
  if (!e.baslik || !e.tarih) continue;
  fs.writeFileSync(path.join(hedef, `${e.slug}.ics`), icsUret(e), "utf-8");
  adet++;
}

console.log(`${adet} ICS dosyası üretildi: ${hedef}`);