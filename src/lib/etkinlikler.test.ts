import { describe, expect, it } from "vitest";
import { etkinlikDetayi, tumEtkinlikler, yaklasanEtkinlikler } from "./etkinlikler";
import { etkinlikICS } from "./ics";

describe("tumEtkinlikler", () => {
  it("etkinlik dosyalarını okur", () => {
    const etkinlikler = tumEtkinlikler();
    expect(etkinlikler.length).toBeGreaterThan(0);
  });

  it("her etkinliğin zorunlu alanları var", () => {
    for (const e of tumEtkinlikler()) {
      expect(e.slug).toBeTruthy();
      expect(e.baslik).toBeTruthy();
      expect(e.tarih).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(e.saat).toMatch(/^\d{2}:\d{2}$/);
      expect(e.bitis).toMatch(/^(\d{2}:\d{2}|\d{4}-\d{2}-\d{2}T\d{2}:\d{2})$/);
      expect(e.ozet).toBeTruthy();
    }
  });
});

describe("etkinlikDetayi", () => {
  it("ISO tarihler üretir", () => {
    const e = tumEtkinlikler()[0];
    const detay = etkinlikDetayi(e);
    expect(detay.baslangicISO).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/);
    expect(detay.sonaErdi).toBeTypeOf("boolean");
  });
});

describe("yaklasanEtkinlikler", () => {
  it("sadece gelecekteki etkinlikleri döndürür", () => {
    for (const e of yaklasanEtkinlikler()) {
      expect(e.sonaErdi).toBe(false);
    }
  });
});

describe("etkinlikICS", () => {
  it("geçerli VCALENDAR üretir", () => {
    const e = etkinlikDetayi(tumEtkinlikler()[0]);
    const ics = etkinlikICS(e);
    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("END:VCALENDAR");
    expect(ics).toContain("BEGIN:VEVENT");
    expect(ics).toContain("END:VEVENT");
    expect(ics).toContain(`DTSTART:${e.baslangicISO.replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`);
    expect(ics).toContain(`SUMMARY:${e.baslik}`);
  });
});
