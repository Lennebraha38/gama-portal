import { describe, expect, it } from "vitest";
import { ayAdi, ayFarki, ayHuculeri, HAFTA_GUNLERI, tarihAnahtari } from "./takvim";

describe("ayHuculeri", () => {
  it("Ağustos 2026 pazartesi başlar ve 42 hücredir", () => {
    const huculer = ayHuculeri(2026, 7);
    expect(huculer).toHaveLength(42);
    const ilk = huculer.find((h) => h.tarih !== null)!;
    expect(ilk.tarih!.getDate()).toBe(1);
    expect(ilk.tarih!.getDay()).toBe(6); // 1 Ağustos 2026 cumartesi
  });

  it("boş hücrelerin tarihi yok", () => {
    const huculer = ayHuculeri(2026, 7);
    expect(huculer.some((h) => h.tarih === null)).toBe(true);
  });

  it("gün sayısı ay uzunluğuna uyar", () => {
    const temmuz = ayHuculeri(2026, 6).filter((h) => h.tarih !== null);
    expect(temmuz).toHaveLength(31);
    const subat = ayHuculeri(2026, 1).filter((h) => h.tarih !== null);
    expect(subat).toHaveLength(28);
  });

  it("tarih anahtarları benzersiz", () => {
    const huculer = ayHuculeri(2026, 7).filter((h) => h.tarih !== null);
    const anahtarlar = huculer.map((h) => h.anahtar);
    expect(new Set(anahtarlar).size).toBe(anahtarlar.length);
  });
});

describe("ayAdi / ayFarki / tarihAnahtari", () => {
  it("ay adı Türkçe", () => {
    expect(ayAdi(2026, 7)).toBe("Ağustos 2026");
  });

  it("ay farkı yıl taşır", () => {
    expect(ayFarki(new Date(2026, 0, 15), -1)).toEqual({ yil: 2025, ay: 11 });
    expect(ayFarki(new Date(2026, 11, 15), 1)).toEqual({ yil: 2027, ay: 0 });
  });

  it("tarih anahtarı sıfır dolgulu", () => {
    expect(tarihAnahtari(new Date(2026, 7, 5))).toBe("2026-08-05");
  });

  it("hafta günleri 7 tanedir", () => {
    expect(HAFTA_GUNLERI).toHaveLength(7);
  });
});