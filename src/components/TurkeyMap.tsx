"use client";

import { regions } from "@/lib/provinces";
import harita from "@/data/turkiye-paths.json";

type IlPath = { il: string; d: string; fx: number; fy: number; fs: number };

const koordinatorler: Record<string, string> = {};
for (const bolge of regions) {
  for (const il of bolge.iller) {
    if (il.temsilci !== "Belirleniyor") {
      koordinatorler[il.il] = il.temsilci;
    }
  }
}

const iller = harita.iller as IlPath[];

export function TurkeyMap() {
  const aktifSayisi = iller.filter((p) => koordinatorler[p.il]).length;

  return (
    <div className="rounded-3xl border border-white/10 bg-[#070b14]/60 p-4 backdrop-blur md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-white">Koordinatör Haritası</h2>
        <div className="flex items-center gap-4 text-xs text-zinc-300">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-zinc-700" />
            Koordinatör yok
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-gradient-to-br from-amber-400 to-amber-500 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
            Koordinatör atandı ({aktifSayisi})
          </span>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${harita.w} ${harita.h}`}
        className="mt-4 w-full"
        role="img"
        aria-label="Türkiye il sınırları haritası"
      >
        <defs>
          <linearGradient id="koor-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <filter id="koor-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {iller.map((p) => {
          const temsilci = koordinatorler[p.il];
          const atanmis = Boolean(temsilci);
          return (
            <path
              key={p.il}
              d={p.d}
              fill={atanmis ? "url(#koor-grad)" : "#1c2130"}
              stroke={atanmis ? "#a7f3d0" : "#3f4759"}
              strokeWidth={atanmis ? 1.4 : 0.6}
              strokeLinejoin="round"
              filter={atanmis ? "url(#koor-glow)" : undefined}
              className="cursor-pointer transition-[opacity,fill] hover:opacity-80"
            >
              <title>
                {p.il}
                {temsilci ? ` · Koordinatör: ${temsilci}` : ""}
              </title>
            </path>
          );
        })}
      </svg>

      <div className="mt-4 flex flex-wrap gap-2">
        {iller
          .filter((p) => koordinatorler[p.il])
          .sort((a, b) => a.il.localeCompare(b.il, "tr"))
          .map((p) => (
            <span
              key={p.il}
              className="rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300"
            >
              {p.il} · {koordinatorler[p.il]}
            </span>
          ))}
      </div>
    </div>
  );
}
