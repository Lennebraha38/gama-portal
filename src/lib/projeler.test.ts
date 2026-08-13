import { describe, expect, it } from "vitest";
import { projeBul, tumProjeler } from "./projeler";

describe("tumProjeler", () => {
  it("proje dosyalarını okur", () => {
    expect(tumProjeler().length).toBeGreaterThan(0);
  });

  it("her projenin zorunlu alanları var", () => {
    for (const p of tumProjeler()) {
      expect(p.slug).toBeTruthy();
      expect(p.baslik).toBeTruthy();
      expect(p.durum).toBeTruthy();
      expect(p.kapsam).toBeTruthy();
      expect(p.takim).toBeTruthy();
      expect(p.sehir).toBeTruthy();
      expect(p.ozet).toBeTruthy();
      expect(p.icerik.trim().length).toBeGreaterThan(50);
    }
  });

  it("slug'lar benzersiz", () => {
    const slugs = tumProjeler().map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("projeBul", () => {
  it("bilinen projeyi bulur", () => {
    const p = projeBul("gama-portal");
    expect(p).not.toBeNull();
    expect(p?.baslik).toContain("Gama Portal");
  });

  it("olmayan projede null döner", () => {
    expect(projeBul("yok-boyle-bir-proje")).toBeNull();
  });
});
