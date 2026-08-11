import { regions } from "@/lib/provinces";

const koordinatlar: Record<string, { x: number; y: number }> = {
  "Tekirdağ": { x: 9, y: 13 },
  "Ankara": { x: 31, y: 20 },
  "Konya": { x: 27, y: 26 },
  "Mersin": { x: 26, y: 32 },
  "Adana": { x: 33, y: 34 },
};

const yol =
  "M9,11 L15,14 L22,11 L30,10 L37,12 L44,12 L51,13 L57,11 L65,10 L72,15 L70,21 L66,28 L60,31 L54,29 L49,32 L42,38 L38,33 L32,31 L26,33 L20,32 L14,31 L9,29 L5,25 L4,20 L6,16 Z";

export function TurkeyMap() {
  const aktif = regions
    .flatMap((bolge) => bolge.iller)
    .filter((il) => il.temsilci !== "Belirleniyor" && koordinatlar[il.il]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur md:p-8">
      <div className="flex items-center gap-2 text-sm text-zinc-300">
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        Koordinatörü atanan iller ({aktif.length})
      </div>
      <svg viewBox="0 0 100 60" className="mt-4 w-full" aria-hidden>
        <defs>
          <linearGradient id="tr-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3364ff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.18" />
          </linearGradient>
        </defs>
        <path
          d={yol}
          fill="url(#tr-fill)"
          stroke="rgba(148,163,184,0.5)"
          strokeWidth="0.4"
          strokeLinejoin="round"
        />
        {aktif.map((il) => {
          const c = koordinatlar[il.il];
          return (
            <g key={il.il}>
              <circle cx={c.x} cy={c.y} r="2" fill="#34d399">
                <animate attributeName="r" values="1.5;3.2;1.5" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.4s" repeatCount="indefinite" />
              </circle>
              <text
                x={c.x}
                y={c.y - 3}
                fontSize="2.4"
                fill="#e2e8f0"
                textAnchor="middle"
                fontWeight="600"
              >
                {il.temsilci.split(" ")[0]}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-4 flex flex-wrap gap-2">
        {aktif.map((il) => (
          <span
            key={il.il}
            className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300"
          >
            {il.il} · {il.temsilci}
          </span>
        ))}
      </div>
    </div>
  );
}
