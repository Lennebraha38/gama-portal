"use client";

import { useCallback, useEffect, useState } from "react";
import {
  gorevDurumu,
  gorevIsaretle,
  type GorevDurum,
} from "@/lib/gunluk-gorev";
import { ROZET_ANAHTARLARI, rozetIsaretle } from "@/lib/rozetler";

const HAFTALIK_HEDEF = 5;

export function GunlukGorev({ kompakt = false }: { kompakt?: boolean }) {
  const [durum, setDurum] = useState<GorevDurum>({
    bugunKayitli: false,
    streak: 0,
    haftalik: 0,
  });
  const [hazir, setHazir] = useState(false);

  const hesapla = useCallback(() => {
    try {
      setDurum(gorevDurumu(window.localStorage, new Date()));
      setHazir(true);
    } catch {
      setHazir(false);
    }
  }, []);

  useEffect(() => {
    const zamanlayici = setTimeout(hesapla, 0);
    return () => clearTimeout(zamanlayici);
  }, [hesapla]);

  function isaretle() {
    try {
      const yeni = gorevIsaretle(window.localStorage, new Date());
      setDurum(yeni);
      if (yeni.streak >= 3) rozetIsaretle(window.localStorage, ROZET_ANAHTARLARI.streak3);
      if (yeni.streak >= 7) rozetIsaretle(window.localStorage, ROZET_ANAHTARLARI.streak7);
    } catch {
      // depolama kapalıysa işaretleme yapılamaz; site yine de çalışır
    }
  }

  if (!hazir) return null;

  const ilerleme = Math.min(durum.haftalik / HAFTALIK_HEDEF, 1);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gama-300">
            Günlük Görev
          </p>
          <p className="mt-1.5 font-semibold text-white">
            {durum.bugunKayitli
              ? "Bugünkü görevini tamamladın"
              : "Bugünkü görevini işaretle"}
          </p>
          <p className="mt-1 text-sm text-zinc-300">
            Öğrendiğin ya da ürettiğin küçük bir şeyi toplulukla paylaş. Seriyi
            koparma — her gün yeni bir adım.
          </p>
        </div>
        <div className="shrink-0 rounded-2xl bg-gama-500/15 px-4 py-3 text-center ring-1 ring-gama-400/30">
          <p className="text-2xl font-bold leading-none text-white">{durum.streak}</p>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-gama-300">
            günlük seri
          </p>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Bu hafta {durum.haftalik}/{HAFTALIK_HEDEF} gün
          </span>
          <span>{Math.round(ilerleme * 100)}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gama-500 to-gama-400 transition-all duration-500"
            style={{ width: `${ilerleme * 100}%` }}
          />
        </div>
      </div>

      {!durum.bugunKayitli && (
        <button
          type="button"
          onClick={isaretle}
          className="mt-5 rounded-full bg-gradient-to-r from-gama-500 to-gama-400 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(96,165,250,0.5)]"
        >
          Bugünü İşaretle
        </button>
      )}

      {kompakt && (
        <p className="mt-4 text-xs text-zinc-400">
          Tüm rozetlerin için{" "}
          <a href="/kaynak" className="text-gama-300 underline-offset-4 hover:underline">
            Katkı Rozetleri
          </a>{" "}
          sayfasına göz at.
        </p>
      )}
    </div>
  );
}