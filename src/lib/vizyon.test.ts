import { describe, expect, it } from "vitest";
import { mtkbTemalari, temaVarMi, temaBul } from "./ekosistem";

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
