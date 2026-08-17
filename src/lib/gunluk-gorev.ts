export type GorevDepo = Pick<Storage, "getItem" | "setItem">;

export type GorevDurum = {
  bugunKayitli: boolean;
  streak: number;
  haftalik: number;
};

const ANAHTAR = "gama:gorev";
const MAX_GUN = 90;

export function tarihAnahtari(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const g = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${g}`;
}

function gunleriOku(depo: GorevDepo): string[] {
  try {
    const ham = depo.getItem(ANAHTAR);
    if (!ham) return [];
    const liste = JSON.parse(ham);
    if (!Array.isArray(liste)) return [];
    return liste.filter((g): g is string => typeof g === "string");
  } catch {
    return [];
  }
}

export function haftaBaslangici(d: Date): Date {
  const kopya = new Date(d);
  const fark = (kopya.getDay() + 6) % 7;
  kopya.setDate(kopya.getDate() - fark);
  kopya.setHours(0, 0, 0, 0);
  return kopya;
}

export function gorevDurumu(depo: GorevDepo, bugun: Date): GorevDurum {
  const gunler = new Set(gunleriOku(depo));
  const bugunAnahtari = tarihAnahtari(bugun);

  let streak = 0;
  const baslangic = gunler.has(bugunAnahtari) ? bugun : new Date(bugun);
  if (!gunler.has(bugunAnahtari)) baslangic.setDate(baslangic.getDate() - 1);
  for (let i = 0; i < MAX_GUN; i++) {
    const g = new Date(baslangic);
    g.setDate(baslangic.getDate() - i);
    if (gunler.has(tarihAnahtari(g))) streak++;
    else break;
  }

  const haftaBas = haftaBaslangici(bugun);
  let haftalik = 0;
  for (let i = 0; i < 7; i++) {
    const g = new Date(haftaBas);
    g.setDate(haftaBas.getDate() + i);
    if (g.getTime() > bugun.getTime()) break;
    if (gunler.has(tarihAnahtari(g))) haftalik++;
  }

  return { bugunKayitli: gunler.has(bugunAnahtari), streak, haftalik };
}

export function gorevIsaretle(depo: GorevDepo, bugun: Date): GorevDurum {
  const gunler = gunleriOku(depo);
  const bugunAnahtari = tarihAnahtari(bugun);
  if (!gunler.includes(bugunAnahtari)) gunler.push(bugunAnahtari);
  gunler.sort();
  const kesilen = gunler.slice(-MAX_GUN);
  depo.setItem(ANAHTAR, JSON.stringify(kesilen));
  return gorevDurumu(depo, bugun);
}