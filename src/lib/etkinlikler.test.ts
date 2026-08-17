import { describe, expect, it } from "vitest";
import { etkinlikDetayi, tumEtkinlikler, yaklasanEtkinlikler, type Etkinlik } from "./etkinlikler";
import { etkinlikICS } from "./ics";

const ornekEtkinlik: Etkinlik = {
  slug: "ornek-atolye",
  baslik: "Örnek Atölye",
  tarih: "2030-06-15",
  saat: "10:00",
  bitis: "17:00",
  yer: "Çevrimiçi",
  sehir: "Çevrimiçi",
  tur: "Atölye",
  kayit: "",
  ozet: "Test etkinliği.",
  icerik: "İçerik",
};

describe("tumEtkinlikler", () => {
  it("etkinlik yokken boş dizi döner", () => {
    expect(Array.isArray(tumEtkinlikler())).toBe(true);
  });
});

describe("etkinlikDetayi", () => {
  it("ISO tarihler üretir", () => {
    const detay = etkinlikDetayi(ornekEtkinlik);
    expect(detay.baslangicISO).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/);
    expect(detay.sonaErdi).toBeTypeOf("boolean");
    expect(detay.sonaErdi).toBe(false);
  });

  it("geçmiş tarihli etkinliği sona erdi işaretler", () => {
    const gecmis = etkinlikDetayi({ ...ornekEtkinlik, tarih: "2020-01-01" });
    expect(gecmis.sonaErdi).toBe(true);
  });
});

describe("yaklasanEtkinlikler", () => {
  it("dizi döner", () => {
    expect(Array.isArray(yaklasanEtkinlikler())).toBe(true);
  });
});

describe("etkinlikICS", () => {
  it("geçerli VCALENDAR üretir", () => {
    const e = etkinlikDetayi(ornekEtkinlik);
    const ics = etkinlikICS(e);
    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("END:VCALENDAR");
    expect(ics).toContain("BEGIN:VEVENT");
    expect(ics).toContain("END:VEVENT");
    expect(ics).toContain(`DTSTART:${e.baslangicISO.replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`);
    expect(ics).toContain(`SUMMARY:${e.baslik}`);
  });
});
