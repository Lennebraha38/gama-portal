import { describe, expect, it } from "vitest";
import { duyuruBul, markdownHTML, tumDuyurular } from "./duyurular";

describe("tumDuyurular", () => {
  it("duyuru dosyalarını okur ve sıralar", () => {
    const duyurular = tumDuyurular();
    expect(duyurular.length).toBeGreaterThan(0);
    for (let i = 1; i < duyurular.length; i++) {
      expect(duyurular[i - 1].tarih >= duyurular[i].tarih).toBe(true);
    }
  });

  it("her duyurunun zorunlu alanları var", () => {
    for (const d of tumDuyurular()) {
      expect(d.slug).toBeTruthy();
      expect(d.baslik).toBeTruthy();
      expect(d.tarih).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(d.tur).toBeTruthy();
      expect(d.ozet).toBeTruthy();
      expect(d.icerik.length).toBeGreaterThan(0);
    }
  });
});

describe("duyuruBul", () => {
  it("var olan slug'ı döndürür", () => {
    const ilk = tumDuyurular()[0];
    expect(duyuruBul(ilk.slug)).toEqual(ilk);
  });

  it("olmayan slug için null", () => {
    expect(duyuruBul("yok-boyle-bir-duyuru")).toBeNull();
  });
});

describe("markdownHTML", () => {
  it("başlık, liste, kalın ve link üretir", () => {
    const html = markdownHTML("## Başlık\n\n- madde **kalın**\n- [link](https://ornek.com)");
    expect(html).toContain("<h2");
    expect(html).toContain("Başlık");
    expect(html).toContain("<ul");
    expect(html).toContain("<strong>kalın</strong>");
    expect(html).toContain('href="https://ornek.com"');
  });

  it("boş içerik için boş çıktı", () => {
    expect(markdownHTML("")).toBe("");
  });
});
