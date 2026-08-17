import { describe, expect, it } from "vitest";
import { ilPuaniHesapla, skorlariSirala, PUAN_AGIRLIKLARI, type IlSkoru } from "./liderlik";
import { mtkbTemalari, temaVarMi, temaBul } from "./ekosistem";

describe("ilPuaniHesapla", () => {
  it("göstergeleri ağırlıklarıyla toplar", () => {
    const puan = ilPuaniHesapla({
      uye_sayisi: 10,
      etkinlik_sayisi: 2,
      proje_sayisi: 1,
      mentor_sayisi: 1,
    });
    expect(puan).toBe(
      10 * PUAN_AGIRLIKLARI.uye +
        2 * PUAN_AGIRLIKLARI.etkinlik +
        1 * PUAN_AGIRLIKLARI.proje +
        1 * PUAN_AGIRLIKLARI.mentor
    );
  });

  it("eksik alanları sıfır sayar", () => {
    expect(ilPuaniHesapla({})).toBe(0);
    expect(ilPuaniHesapla({ uye_sayisi: 3 })).toBe(3 * PUAN_AGIRLIKLARI.uye);
  });
});

describe("skorlariSirala", () => {
  const ornek: IlSkoru[] = [
    { il: "Ankara", uye_sayisi: 0, etkinlik_sayisi: 0, proje_sayisi: 0, mentor_sayisi: 0, puan: 10, ay: "2026-08" },
    { il: "İstanbul", uye_sayisi: 0, etkinlik_sayisi: 0, proje_sayisi: 0, mentor_sayisi: 0, puan: 25, ay: "2026-08" },
    { il: "İzmir", uye_sayisi: 0, etkinlik_sayisi: 0, proje_sayisi: 0, mentor_sayisi: 0, puan: 10, ay: "2026-08" },
  ];

  it("puana göre azalan sıralar", () => {
    const sirali = skorlariSirala(ornek);
    expect(sirali[0].il).toBe("İstanbul");
    expect(sirali[1].puan).toBe(10);
    expect(sirali[2].puan).toBe(10);
  });

  it("eşit puanda Türkçe alfabetik sıralar", () => {
    const sirali = skorlariSirala(ornek);
    expect(sirali[1].il).toBe("Ankara");
    expect(sirali[2].il).toBe("İzmir");
  });

  it("girdi dizisini değiştirmez", () => {
    const kopya = [...ornek];
    skorlariSirala(ornek);
    expect(ornek).toEqual(kopya);
  });
});

describe("ekosistem temaları", () => {
  it("MTKB temaları boş değil", () => {
    expect(mtkbTemalari.length).toBeGreaterThan(0);
  });

  it("tema adları benzersiz", () => {
    const adlar = mtkbTemalari.map((t) => t.ad.toLowerCase());
    expect(new Set(adlar).size).toBe(adlar.length);
  });

  it("temaBul ve temaVarMi tutarlı", () => {
    const ilk = mtkbTemalari[0];
    expect(temaVarMi(ilk.ad)).toBe(true);
    expect(temaBul(ilk.ad)).toEqual(ilk);
    expect(temaVarMi("Var Olmayan Tema")).toBe(false);
    expect(temaBul("Var Olmayan Tema")).toBeUndefined();
  });

  it("her temanın özeti var", () => {
    for (const t of mtkbTemalari) {
      expect(t.ozet.length).toBeGreaterThan(0);
    }
  });
});