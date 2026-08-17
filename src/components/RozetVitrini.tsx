"use client";

import { useEffect, useState } from "react";
import { kazanilanRozetler, ROZETLER } from "@/lib/rozetler";
import { supabase } from "@/lib/supabase";

export function RozetVitrini() {
  const [kazanilan, setKazanilan] = useState<string[]>([]);
  const [hazir, setHazir] = useState(false);

  useEffect(() => {
    let iptal = false;
    async function yukle() {
      let uyeMi = false;
      if (supabase) {
        const { data } = await supabase.auth.getSession();
        uyeMi = Boolean(data.session);
      }
      if (iptal) return;
      try {
        setKazanilan(kazanilanRozetler(window.localStorage, uyeMi));
      } catch {
        setKazanilan(uyeMi ? ["uye"] : []);
      }
      setHazir(true);
    }
    yukle();
    return () => {
      iptal = true;
    };
  }, []);

  if (!hazir) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ROZETLER.map((r) => {
        const sahip = kazanilan.includes(r.id);
        return (
          <div
            key={r.id}
            className={`rounded-2xl border p-5 backdrop-blur transition-all ${
              sahip
                ? "border-amber-400/40 bg-amber-500/10"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${
                  sahip
                    ? "bg-gradient-to-br from-amber-400 to-amber-600 text-[#060b18] shadow-[0_0_18px_rgba(251,191,36,0.4)]"
                    : "bg-white/10 text-zinc-500"
                }`}
              >
                {sahip ? "✓" : "?"}
              </div>
              <div>
                <p className={`font-semibold ${sahip ? "text-amber-200" : "text-white"}`}>
                  {r.ad}
                </p>
                <p className="text-xs text-zinc-400">{r.kosul}</p>
              </div>
            </div>
            <p className={`mt-3 text-sm leading-6 ${sahip ? "text-amber-100/80" : "text-zinc-300"}`}>
              {r.aciklama}
            </p>
            {!sahip && (
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                Henüz kazanılmadı
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}