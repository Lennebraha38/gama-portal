"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { regions } from "@/lib/provinces";

export function IlListesi() {
  const [sorgu, setSorgu] = useState("");

  const filtrelenmis = useMemo(() => {
    const q = sorgu.trim().toLocaleLowerCase("tr-TR");
    if (!q) return regions;
    return regions
      .map((bolge) => ({
        ...bolge,
        iller: bolge.iller.filter((il) => il.il.toLocaleLowerCase("tr-TR").includes(q)),
      }))
      .filter((bolge) => bolge.iller.length > 0);
  }, [sorgu]);

  const toplamEslesme = filtrelenmis.reduce((t, b) => t + b.iller.length, 0);

  return (
    <div className="mt-12 grid gap-8">
      <div className="flex items-center justify-between gap-4">
        <label htmlFor="il-arama" className="sr-only">
          İl ara
        </label>
        <input
          id="il-arama"
          type="search"
          value={sorgu}
          onChange={(e) => setSorgu(e.target.value)}
          placeholder="İl ara... (örn. Ankara)"
          className="w-full max-w-sm rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder-zinc-400 backdrop-blur transition-colors focus:border-gama-400 focus:outline-none focus:ring-1 focus:ring-gama-400"
        />
        <span className="hidden shrink-0 text-xs text-zinc-300 sm:block">
          {toplamEslesme} il gösteriliyor
        </span>
      </div>

      {filtrelenmis.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-10 text-center text-sm text-zinc-300">
          &quot;{sorgu}&quot; ile eşleşen il bulunamadı.
        </p>
      ) : (
        filtrelenmis.map((bolge) => (
          <section
            key={bolge.bolge}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur md:p-8"
          >
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-white">{bolge.bolge}</h2>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-zinc-100">
                {bolge.iller.length} il
              </span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {bolge.iller.map((il) => {
                const atanmis = il.temsilci !== "Belirleniyor";
                const icerik = (
                  <>
                    <div className="min-w-0">
                      <p className="font-semibold text-white">{il.il}</p>
                      <p className="truncate text-xs text-zinc-300">
                        {atanmis
                          ? `Temsilci: ${il.temsilci}`
                          : "Koordinatör belirleniyor — aday ol"}
                      </p>
                    </div>
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${
                        atanmis
                          ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                          : "bg-zinc-600"
                      }`}
                    />
                  </>
                );
                return atanmis ? (
                  <div
                    key={il.il}
                    className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-colors border-white/10 bg-white/[0.03]`}
                  >
                    {icerik}
                  </div>
                ) : (
                  <Link
                    key={il.il}
                    href={`/temsilci?il=${encodeURIComponent(il.il)}`}
                    transitionTypes={["nav-forward"]}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition-colors hover:border-gama-400/40 hover:bg-white/[0.06]"
                  >
                    {icerik}
                  </Link>
                );
              })}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
