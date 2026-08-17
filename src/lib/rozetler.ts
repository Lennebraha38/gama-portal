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
  {
    id: "quiz-usta",
    ad: "Teknoloji Zekâsı",
    aciklama: "Teknoloji quizinde en az %80 başarı gösterdin.",
    kosul: "Quizde %80 ve üzeri skor",
  },
  {
    id: "challenge-ilk",
    ad: "Meydan Okuyan",
    aciklama: "İlk haftalık challenge çözümünü gönderdin.",
    kosul: "Bir challenge çözümü gönder",
  },
  {
    id: "proje-ilk",
    ad: "Proje Sahibi",
    aciklama: "İlk projeni Gama vitrinine aday gösterdin.",
    kosul: "Vitrine proje başvurusu yap",
  },
  {
    id: "katilim",
    ad: "Etkinlik Tutkunu",
    aciklama: "Bir etkinliğe katılım bildirdin.",
    kosul: "Bir etkinliğe katılım bildir",
  },
];

export const ROZET_ANAHTARLARI = {
  uye: "gama:rozet:uye",
  streak3: "gama:rozet:streak-3",
  streak7: "gama:rozet:streak-7",
  quizUsta: "gama:rozet:quiz-usta",
  challenge: "gama:rozet:challenge-ilk",
  proje: "gama:rozet:proje-ilk",
  katilim: "gama:rozet:katilim",
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
  if (rozetKazanildi(depo, ROZET_ANAHTARLARI.quizUsta)) kazanilan.push("quiz-usta");
  if (rozetKazanildi(depo, ROZET_ANAHTARLARI.challenge)) kazanilan.push("challenge-ilk");
  if (rozetKazanildi(depo, ROZET_ANAHTARLARI.proje)) kazanilan.push("proje-ilk");
  if (rozetKazanildi(depo, ROZET_ANAHTARLARI.katilim)) kazanilan.push("katilim");
  return kazanilan;
}