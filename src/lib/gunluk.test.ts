import { describe, expect, it } from "vitest";
import { tumYazilar, yaziBul } from "./gunluk";

describe("tumYazilar", () => {
  it("yazı dosyalarını okur", () => {
    expect(tumYazilar().length).toBeGreaterThan(0);
  });

  it("her yazının zorunlu alanları var", () => {
    for (const y of tumYazilar()) {
      expect(y.slug).toBeTruthy();
      expect(y.baslik).toBeTruthy();
      expect(y.tarih).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(y.yazar).toBeTruthy();
      expect(y.etiketler.length).toBeGreaterThan(0);
      expect(y.ozet).toBeTruthy();
      expect(y.icerik.trim().length).toBeGreaterThan(50);
    }
  });

  it("tarihe göre azalan sıralar", () => {
    const yazilar = tumYazilar();
    for (let i = 1; i < yazilar.length; i++) {
      expect(yazilar[i - 1].tarih >= yazilar[i].tarih).toBe(true);
    }
  });
});

describe("yaziBul", () => {
  it("bilinen yazıyı bulur", () => {
    const y = yaziBul("gama-nedir");
    expect(y).not.toBeNull();
    expect(y?.baslik).toContain("Gama Nedir");
  });

  it("olmayan yazıda null döner", () => {
    expect(yaziBul("yok-boyle-bir-yazi")).toBeNull();
  });
});
