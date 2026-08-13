"use client";

import { useEffect, useState } from "react";

type Dilimler = { gun: number; saat: number; dakika: number; saniye: number };

function kalanDilimler(hedef: Date): Dilimler | null {
  const fark = hedef.getTime() - Date.now();
  if (fark <= 0) return null;
  const toplamSaniye = Math.floor(fark / 1000);
  return {
    gun: Math.floor(toplamSaniye / 86400),
    saat: Math.floor((toplamSaniye % 86400) / 3600),
    dakika: Math.floor((toplamSaniye % 3600) / 60),
    saniye: toplamSaniye % 60,
  };
}

export function GeriSayim({ hedefISO }: { hedefISO: string }) {
  const [dilimler, setDilimler] = useState<Dilimler | null>(() =>
    kalanDilimler(new Date(hedefISO)),
  );

  useEffect(() => {
    const hedef = new Date(hedefISO);
    const tik = () => setDilimler(kalanDilimler(hedef));
    tik();
    const aralik = window.setInterval(tik, 1000);
    return () => window.clearInterval(aralik);
  }, [hedefISO]);

  if (!dilimler) {
    return (
      <p className="mt-3 font-mono text-sm font-semibold text-amber-300">
        Etkinlik başladı — katılmak için hâlâ fırsat var!
      </p>
    );
  }

  const bloklar = [
    { deger: dilimler.gun, etiket: "Gün" },
    { deger: dilimler.saat, etiket: "Saat" },
    { deger: dilimler.dakika, etiket: "Dakika" },
    { deger: dilimler.saniye, etiket: "Saniye" },
  ];

  return (
    <div className="mt-3 grid grid-cols-4 gap-2">
      {bloklar.map((b) => (
        <div
          key={b.etiket}
          className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-2 text-center"
        >
          <p className="font-mono text-lg font-bold leading-none text-gama-300">
            {String(b.deger).padStart(2, "0")}
          </p>
          <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-zinc-400">
            {b.etiket}
          </p>
        </div>
      ))}
    </div>
  );
}
