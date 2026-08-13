"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

export type AramaVerisi = {
  baslik: string;
  ozet: string;
  url: string;
  tur: string;
  etiket: string;
};

const veriUrl = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/arama-verileri.json`;

let veriSozu: Promise<AramaVerisi[]> | null = null;

function aramaVerileriniYukle(): Promise<AramaVerisi[]> {
  veriSozu ??= fetch(veriUrl, { cache: "force-cache" }).then((res) => {
    if (!res.ok) throw new Error("Arama verisi alınamadı");
    return res.json() as Promise<AramaVerisi[]>;
  });
  return veriSozu;
}

export function SiteArama() {
  const [sorgu, setSorgu] = useState("");
  const [acik, setAcik] = useState(false);
  const [veriler, setVeriler] = useState<AramaVerisi[] | null>(null);
  const [hata, setHata] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (veriler !== null || hata || sorgu.trim().length < 2) return;
    aramaVerileriniYukle()
      .then(setVeriler)
      .catch(() => setHata(true));
  }, [sorgu, veriler, hata]);

  const sonuclar = useMemo(() => {
    const q = sorgu.trim().toLocaleLowerCase("tr-TR");
    if (q.length < 2 || veriler === null) return [];
    return veriler
      .filter((v) =>
        `${v.baslik} ${v.ozet} ${v.etiket}`
          .toLocaleLowerCase("tr-TR")
          .includes(q),
      )
      .slice(0, 8);
  }, [sorgu, veriler]);

  return (
    <div className="relative w-full">
      <div className="relative">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={sorgu}
          onChange={(e) => {
            setSorgu(e.target.value);
            setAcik(e.target.value.trim().length >= 2);
          }}
          onFocus={() => setAcik(sorgu.trim().length >= 2)}
          onBlur={() => setTimeout(() => setAcik(false), 150)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setSorgu("");
              setAcik(false);
              inputRef.current?.blur();
            }
          }}
          placeholder="Ara: duyuru, etkinlik, il, proje..."
          aria-label="Sitede ara"
          aria-controls="site-arama-sonuclari"
          role="combobox"
          aria-expanded={acik}
          className="w-full rounded-full border border-white/15 bg-white/[0.07] py-3 pl-12 pr-5 text-sm text-white placeholder-zinc-400 backdrop-blur transition-colors focus:border-gama-400 focus:outline-none focus:ring-1 focus:ring-gama-400"
        />
      </div>

      {acik && (
        <div
          id="site-arama-sonuclari"
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-2xl border border-white/15 bg-[#0a0f2a]/95 p-2 shadow-2xl backdrop-blur-xl"
        >
          {hata ? (
            <p className="px-4 py-6 text-center text-sm text-zinc-400">
              Arama yüklenemedi. Lütfen tekrar dene.
            </p>
          ) : veriler === null ? (
            <p className="px-4 py-6 text-center text-sm text-zinc-400">Aranıyor...</p>
          ) : sonuclar.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-zinc-400">
              &quot;{sorgu}&quot; için sonuç bulunamadı.
            </p>
          ) : (
            <ul className="space-y-1">
              {sonuclar.map((s, i) => (
                <li key={`${s.url}-${i}`}>
                  <Link
                    href={s.url}
                    transitionTypes={["nav-forward"]}
                    onClick={() => {
                      setSorgu("");
                      setAcik(false);
                    }}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/10"
                  >
                    <span className="shrink-0 rounded-full bg-gama-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gama-300">
                      {s.tur}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-white">
                        {s.baslik}
                      </span>
                      <span className="block truncate text-xs text-zinc-400">{s.ozet}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
