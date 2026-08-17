export type TakvimHucresi = {
  tarih: Date | null;
  anahtar: string;
};

export const HAFTA_GUNLERI = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

const AY_ADLARI = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

export function ayAdi(yil: number, ay: number): string {
  return `${AY_ADLARI[ay]} ${yil}`;
}

export function ayHuculeri(yil: number, ay: number): TakvimHucresi[] {
  const ilkGun = new Date(yil, ay, 1);
  const baslangicBoslugu = (ilkGun.getDay() + 6) % 7;
  const huculer: TakvimHucresi[] = [];

  for (let i = 0; i < baslangicBoslugu; i++) {
    huculer.push({ tarih: null, anahtar: `bos-${i}` });
  }

  const gunSayisi = new Date(yil, ay + 1, 0).getDate();
  for (let gun = 1; gun <= gunSayisi; gun++) {
    const tarih = new Date(yil, ay, gun);
    huculer.push({ tarih, anahtar: tarihAnahtari(tarih) });
  }

  while (huculer.length % 7 !== 0) {
    huculer.push({ tarih: null, anahtar: `bos-son-${huculer.length}` });
  }
  return huculer;
}

export function tarihAnahtari(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const g = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${g}`;
}

export function ayFarki(bugun: Date, fark: number): { yil: number; ay: number } {
  const yil = bugun.getFullYear();
  const ay = bugun.getMonth() + fark;
  const yeniAy = ((ay % 12) + 12) % 12;
  const yeniYil = yil + Math.floor((ay - yeniAy) / 12);
  return { yil: yeniYil, ay: yeniAy };
}