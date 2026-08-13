"use client";

import { useEffect, useState } from "react";

export function GunKaldi({ baslangicISO }: { baslangicISO: string }) {
  const [gunFarki, setGunFarki] = useState<number | null>(null);

  useEffect(() => {
    const baslangic = new Date(baslangicISO).getTime();
    const raf = requestAnimationFrame(() => {
      setGunFarki(Math.max(0, Math.round((baslangic - Date.now()) / 86400000)));
    });
    return () => cancelAnimationFrame(raf);
  }, [baslangicISO]);

  if (gunFarki === null || gunFarki === 0) return null;
  return (
    <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300">
      {gunFarki === 1 ? "Yarın" : `${gunFarki} gün kaldı`}
    </span>
  );
}
