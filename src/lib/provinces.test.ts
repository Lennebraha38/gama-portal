import { describe, expect, it } from "vitest";
import { ilBul, ilDetayi, ilSlug, toplamIl, tumIller } from "./provinces";

describe("ilSlug", () => {
  it("Türkçe karakterleri ASCII'ye çevirir", () => {
    expect(ilSlug("İstanbul")).toBe("istanbul");
    expect(ilSlug("Şanlıurfa")).toBe("sanliurfa");
    expect(ilSlug("Afyonkarahisar")).toBe("afyonkarahisar");
    expect(ilSlug("Adıyaman")).toBe("adiyaman");
    expect(ilSlug("Diyarbakır")).toBe("diyarbakir");
  });

  it("tekilleştirilemez: 81 il için 81 farklı slug", () => {
    const sluglar = tumIller.map(ilSlug);
    expect(new Set(sluglar).size).toBe(81);
  });
});

describe("tumIller / toplamIl", () => {
  it("81 il içerir", () => {
    expect(tumIller).toHaveLength(81);
    expect(toplamIl).toBe(81);
  });
});

describe("ilBul / ilDetayi", () => {
  it("slug ile ili bulur ve bölge bilgisini döndürür", () => {
    const il = ilBul("ankara");
    expect(il).not.toBeNull();
    expect(il!.ad).toBe("Ankara");
    expect(il!.bolge).toBe("İç Anadolu");
    expect(il!.atandi).toBe(true);
  });

  it("olmayan slug için null", () => {
    expect(ilBul("atlas-okyanusu")).toBeNull();
  });

  it("ham il adıyla da çalışır", () => {
    expect(ilBul("Ankara")!.slug).toBe("ankara");
    expect(ilBul("İstanbul")!.slug).toBe("istanbul");
  });

  it("bölge bütünlüğü: her il bir bölgede", () => {
    const adet = tumIller.map((il) => ilDetayi(il));
    expect(adet.every((a) => a.bolge !== "Bilinmiyor")).toBe(true);
  });
});
