export type Rozet = {
  id: string;
  ad: string;
  aciklama: string;
  kosul: string;
};

export const ROZETLER: Rozet[] = [
  {
    id: "uye",
    ad: "Gama Üyesi",
    aciklama: "Hesabını oluşturdun, topluluğun parçasısın.",
    kosul: "E-posta ile üye girişi yap",
  },
  {
    id: "streak-3",
    ad: "Seri Başladı",
    aciklama: "3 gün üst üste günlük görevini işaretledin.",
    kosul: "3 gün üst üste görev",
  },
  {
    id: "streak-7",
    ad: "Bir Hafta Ateşi",
    aciklama: "7 gün üst üste günlük görevini işaretledin.",
    kosul: "7 gün üst üste görev",
  },
];

export const ROZET_ANAHTARLARI = {
  uye: "gama:rozet:uye",
  streak3: "gama:rozet:streak-3",
  streak7: "gama:rozet:streak-7",
} as const;

export type RozetDepo = Pick<Storage, "getItem" | "setItem">;

export function rozetKazanildi(depo: RozetDepo, anahtar: string): boolean {
  try {
    return depo.getItem(anahtar) === "1";
  } catch {
    return false;
  }
}

export function rozetIsaretle(depo: RozetDepo, anahtar: string): void {
  try {
    depo.setItem(anahtar, "1");
  } catch {
    // depolama kapalıysa rozet bu oturumda kaydedilmez; site yine de çalışır
  }
}

export function kazanilanRozetler(depo: RozetDepo, uyeMi: boolean): string[] {
  const kazanilan: string[] = [];
  if (uyeMi) kazanilan.push("uye");
  if (rozetKazanildi(depo, ROZET_ANAHTARLARI.streak3)) kazanilan.push("streak-3");
  if (rozetKazanildi(depo, ROZET_ANAHTARLARI.streak7)) kazanilan.push("streak-7");
  return kazanilan;
}