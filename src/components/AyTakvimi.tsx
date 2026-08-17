"use client";

import { useState } from "react";
import Link from "next/link";
import { ayFarki, ayHuculeri, ayAdi, HAFTA_GUNLERI, tarihAnahtari } from "@/lib/takvim";

export type TakvimEtkinligi = {
  tarih: string;
  baslik: string;
  slug: string;
};

export function AyTakvimi({
  etkinlikler,
}: {
  etkinlikler: TakvimEtkinligi[];
}) {
  const [gorusunen, setGorusunen] = useState(() => {
    const bugun = new Date();
    return { yil: bugun.getFullYear(), ay: bugun.getMonth() };
  });

  function ayOtele(fark: number) {
    return ayFarki(new Date(gorusunen.yil, gorusunen.ay, 1), fark);
  }

  const huculer = ayHuculeri(gorusunen.yil, gorusunen.ay);
  const bugunAnahtari = tarihAnahtari(new Date());
  const etkinlikHaritasi = new Map<string, TakvimEtkinligi[]>();
  for (const e of etkinlikler) {
    const liste = etkinlikHaritasi.get(e.tarih) ?? [];
    liste.push(e);
    etkinlikHaritasi.set(e.tarih, liste);
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-white">{ayAdi(gorusunen.yil, gorusunen.ay)}</p>
        <div className="flex gap-1">
          <button
            type="button"
            aria-label="Önceki ay"
            onClick={() => setGorusunen(ayOtele(-1))}
            className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5 text-white transition-colors hover:bg-white/10"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Sonraki ay"
            onClick={() => setGorusunen(ayOtele(1))}
            className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5 text-white transition-colors hover:bg-white/10"
          >
            ›
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center">
        {HAFTA_GUNLERI.map((g) => (
          <div key={g} className="py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            {g}
          </div>
        ))}
        {huculer.map((h) => {
          if (!h.tarih) {
            return <div key={h.anahtar} aria-hidden className="aspect-square" />;
          }
          const etkinliklerGun = etkinlikHaritasi.get(h.anahtar);
          const bugunMu = h.anahtar === bugunAnahtari;
          const hucre = (
            <div
              className={`relative flex aspect-square flex-col items-center justify-center rounded-lg text-sm transition-colors ${
                etkinliklerGun?.length
                  ? "bg-gama-500/20 font-semibold text-gama-200 hover:bg-gama-500/30"
                  : "text-zinc-300 hover:bg-white/5"
              } ${bugunMu ? "ring-1 ring-gama-400/60" : ""}`}
            >
              <span>{h.tarih.getDate()}</span>
              {etkinliklerGun?.length ? (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-gama-400" />
              ) : null}
            </div>
          );
          if (!etkinliklerGun?.length) return <div key={h.anahtar}>{hucre}</div>;
          return (
            <Link key={h.anahtar} href={`/etkinlikler/${etkinliklerGun[0].slug}`} title={etkinliklerGun.map((e) => e.baslik).join(", ")}>
              {hucre}
            </Link>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-zinc-400">
        Mavi işaretli günlerde etkinlik var. Tarihe tıklayarak detaya gidebilirsin.
      </p>
    </div>
  );
}