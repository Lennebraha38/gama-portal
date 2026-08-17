export type IlSkoru = {
  il: string;
  uye_sayisi: number;
  etkinlik_sayisi: number;
  proje_sayisi: number;
  mentor_sayisi: number;
  puan: number;
  ay: string;
};

export const PUAN_AGIRLIKLARI = {
  uye: 1,
  etkinlik: 5,
  proje: 10,
  mentor: 3,
} as const;

export function ilPuaniHesapla(satir: {
  uye_sayisi?: number;
  etkinlik_sayisi?: number;
  proje_sayisi?: number;
  mentor_sayisi?: number;
}): number {
  return (
    (satir.uye_sayisi ?? 0) * PUAN_AGIRLIKLARI.uye +
    (satir.etkinlik_sayisi ?? 0) * PUAN_AGIRLIKLARI.etkinlik +
    (satir.proje_sayisi ?? 0) * PUAN_AGIRLIKLARI.proje +
    (satir.mentor_sayisi ?? 0) * PUAN_AGIRLIKLARI.mentor
  );
}

export function skorlariSirala(skorlar: IlSkoru[]): IlSkoru[] {
  return [...skorlar].sort((a, b) => {
    if (b.puan !== a.puan) return b.puan - a.puan;
    return a.il.localeCompare(b.il, "tr");
  });
}