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

  it("javascript: linklerini XSS'e karşı düz metne çevirir", () => {
    const html = markdownHTML("[tıkla](javascript:alert(1))");
    expect(html).not.toContain("javascript:");
    expect(html).not.toContain("<a");
    expect(html).toContain("tıkla");
  });

  it("href attribute enjeksiyonunu engeller", () => {
    const html = markdownHTML('[x](https://ornek.com" onmouseover="alert(1))');
    expect(html).not.toContain("<a");
    expect(html).not.toContain('onmouseover="');
    expect(html).toContain("&quot;");
  });

  it("HTML etiketlerini içerikte escape eder", () => {
    const html = markdownHTML("saldırı <script>alert(1)</script>");
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("data: linklerini engeller", () => {
    const html = markdownHTML("[x](data:text/html,<script>alert(1)</script>)");
    expect(html).not.toContain("<a");
    expect(html).not.toContain("data:");
  });

  it("harici linklere noopener ekler", () => {
    const html = markdownHTML("[x](https://dışarı.com)");
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain('target="_blank"');
  });
});
