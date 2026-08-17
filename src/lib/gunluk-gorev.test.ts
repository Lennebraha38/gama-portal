import { describe, expect, it } from "vitest";
import {
  gorevDurumu,
  gorevIsaretle,
  haftaBaslangici,
  tarihAnahtari,
  type GorevDepo,
} from "./gunluk-gorev";

function depoOlustur(icerik: Record<string, string> = {}): GorevDepo & { veriler: Record<string, string> } {
  const veriler = { ...icerik };
  return {
    veriler,
    getItem: (k) => veriler[k] ?? null,
    setItem: (k, v) => {
      veriler[k] = v;
    },
  };
}

const tarih = (yil: number, ay: number, gun: number) => new Date(yil, ay, gun);

describe("gorevDurumu", () => {
  it("boş depoda streak sıfır", () => {
    const depo = depoOlustur();
    const durum = gorevDurumu(depo, tarih(2026, 7, 16));
    expect(durum).toEqual({ bugunKayitli: false, streak: 0, haftalik: 0 });
  });

  it("bugün işaretliyse streak'i sayar", () => {
    const bugun = tarih(2026, 7, 16);
    const oncekiGun = tarih(2026, 7, 15);
    const oncekiGun2 = tarih(2026, 7, 14);
    const depo = depoOlustur({
      "gama:gorev": JSON.stringify([
        tarihAnahtari(oncekiGun2),
        tarihAnahtari(oncekiGun),
        tarihAnahtari(bugun),
      ]),
    });
    const durum = gorevDurumu(depo, bugun);
    expect(durum.bugunKayitli).toBe(true);
    expect(durum.streak).toBe(3);
  });

  it("bugün işaretlenmemişse dünden devam eden seriyi korur", () => {
    const bugun = tarih(2026, 7, 16);
    const dun = tarih(2026, 7, 15);
    const depo = depoOlustur({
      "gama:gorev": JSON.stringify([tarihAnahtari(dun)]),
    });
    expect(gorevDurumu(depo, bugun).streak).toBe(1);
    expect(gorevDurumu(depo, bugun).bugunKayitli).toBe(false);
  });

  it("kırık seride yeniden sayar", () => {
    const bugun = tarih(2026, 7, 16);
    const oncekiGun = tarih(2026, 7, 15);
    const ikiGunOnce = tarih(2026, 7, 13);
    const depo = depoOlustur({
      "gama:gorev": JSON.stringify([tarihAnahtari(ikiGunOnce), tarihAnahtari(oncekiGun), tarihAnahtari(bugun)]),
    });
    expect(gorevDurumu(depo, bugun).streak).toBe(2);
  });

  it("haftalık sayımı pazartesi başlatır", () => {
    const cumartesi = tarih(2026, 7, 15);
    const pazartesi = tarih(2026, 7, 10);
    const sali = tarih(2026, 7, 11);
    const depo = depoOlustur({
      "gama:gorev": JSON.stringify([tarihAnahtari(pazartesi), tarihAnahtari(sali)]),
    });
    expect(gorevDurumu(depo, cumartesi).haftalik).toBe(2);
  });

  it("geçen hafta bu haftaya sayılmaz", () => {
    const pazartesi = tarih(2026, 7, 10);
    const gecenHafta = tarih(2026, 7, 8);
    const depo = depoOlustur({
      "gama:gorev": JSON.stringify([tarihAnahtari(gecenHafta)]),
    });
    expect(gorevDurumu(depo, pazartesi).haftalik).toBe(0);
  });
});

describe("gorevIsaretle", () => {
  it("bugünü ekler ve durumu döner", () => {
    const depo = depoOlustur();
    const bugun = tarih(2026, 7, 16);
    const durum = gorevIsaretle(depo, bugun);
    expect(durum.bugunKayitli).toBe(true);
    expect(durum.streak).toBe(1);
    expect(JSON.parse(depo.veriler["gama:gorev"])).toContain(tarihAnahtari(bugun));
  });

  it("aynı gün tekrar işaretlemek çift saymaz", () => {
    const depo = depoOlustur();
    const bugun = tarih(2026, 7, 16);
    gorevIsaretle(depo, bugun);
    const durum = gorevIsaretle(depo, bugun);
    expect(durum.streak).toBe(1);
    expect(JSON.parse(depo.veriler["gama:gorev"]).length).toBe(1);
  });
});

describe("haftaBaslangici", () => {
  it("çarşamba için pazartesiyi döner", () => {
    const carsamba = tarih(2026, 7, 12);
    expect(haftaBaslangici(carsamba)).toEqual(tarih(2026, 7, 10));
  });

  it("pazar için pazartesiyi döner", () => {
    const pazar = tarih(2026, 7, 16);
    expect(haftaBaslangici(pazar)).toEqual(tarih(2026, 7, 10));
  });
});