import { describe, expect, it } from "vitest";
import {
  ROZET_ANAHTARLARI,
  ROZETLER,
  kazanilanRozetler,
  rozetIsaretle,
  rozetKazanildi,
  type RozetDepo,
} from "./rozetler";

function depoOlustur(icerik: Record<string, string> = {}): RozetDepo & { veriler: Record<string, string> } {
  const veriler = { ...icerik };
  return {
    veriler,
    getItem: (k) => veriler[k] ?? null,
    setItem: (k, v) => {
      veriler[k] = v;
    },
  };
}

describe("ROZETLER", () => {
  it("rozet kimlikleri benzersiz", () => {
    const idler = ROZETLER.map((r) => r.id);
    expect(new Set(idler).size).toBe(idler.length);
  });

  it("her rozetin tanımı var", () => {
    for (const r of ROZETLER) {
      expect(r.ad.length).toBeGreaterThan(0);
      expect(r.kosul.length).toBeGreaterThan(0);
    }
  });
});

describe("rozetKazanildi / rozetIsaretle", () => {
  it("işaretlenmemiş rozet kazanılmamıştır", () => {
    expect(rozetKazanildi(depoOlustur(), ROZET_ANAHTARLARI.proje)).toBe(false);
  });

  it("işaretlenen rozet kazanılmış sayılır", () => {
    const depo = depoOlustur();
    rozetIsaretle(depo, ROZET_ANAHTARLARI.proje);
    expect(rozetKazanildi(depo, ROZET_ANAHTARLARI.proje)).toBe(true);
  });
});

describe("kazanilanRozetler", () => {
  it("üye değilken üyelik rozeti verilmez", () => {
    expect(kazanilanRozetler(depoOlustur(), false)).not.toContain("uye");
  });

  it("üyeyken üyelik rozeti verilir", () => {
    expect(kazanilanRozetler(depoOlustur(), true)).toContain("uye");
  });

  it("işaretli rozetleri listeler", () => {
    const depo = depoOlustur();
    rozetIsaretle(depo, ROZET_ANAHTARLARI.proje);
    const kazanilan = kazanilanRozetler(depo, true);
    expect(kazanilan).toContain("proje-ilk");
    expect(kazanilan).toContain("uye");
    expect(kazanilan).not.toContain("streak-7");
  });
});
