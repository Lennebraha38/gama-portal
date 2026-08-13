import type { EtkinlikDetay } from "./etkinlikler";

function icStandart(metin: string): string {
  return metin.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export function etkinlikICS(e: EtkinlikDetay): string {
  const baslangic = e.baslangicISO.replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const bitis = e.bitisISO.replace(/[-:]/g, "").replace(/\.\d{3}/, "");
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
    `DTSTART:${baslangic}`,
    `DTEND:${bitis}`,
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
