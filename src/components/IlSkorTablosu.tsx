"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ilPuaniHesapla, skorlariSirala, type IlSkoru } from "@/lib/liderlik";

type Durum = "yukleniyor" | "hata" | "bos" | "veri";

export function IlSkorTablosu() {
  const [durum, setDurum] = useState<Durum>("yukleniyor");
  const [skorlar, setSkorlar] = useState<IlSkoru[]>([]);
  const [ay, setAy] = useState("");

  useEffect(() => {
    let iptal = false;
    async function yukle() {
      if (!supabase) {
        setDurum("hata");
        return;
      }
      const { data, error } = await supabase
        .from("il_skorlari")
        .select("il, uye_sayisi, etkinlik_sayisi, proje_sayisi, mentor_sayisi, ay")
        .eq("yayinda", true);
      if (error || iptal) {
        if (!iptal) setDurum("hata");
        return;
      }
      if (!data || data.length === 0) {
        setDurum("bos");
        return;
      }
      const dolu = data.map((s) => ({
        il: s.il,
        uye_sayisi: s.uye_sayisi ?? 0,
        etkinlik_sayisi: s.etkinlik_sayisi ?? 0,
        proje_sayisi: s.proje_sayisi ?? 0,
        mentor_sayisi: s.mentor_sayisi ?? 0,
        puan: ilPuaniHesapla(s),
        ay: s.ay ?? "",
      }));
      setAy(dolu[0]?.ay ?? "");
      setSkorlar(skorlariSirala(dolu));
      setDurum("veri");
    }
    yukle();
    return () => {
      iptal = true;
    };
  }, []);

  if (durum === "yukleniyor") {
    return (
      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur">
        <p className="text-sm text-zinc-300">Skorlar yükleniyor...</p>
      </div>
    );
  }

  if (durum === "hata") {
    return (
      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur">
        <p className="text-sm text-zinc-300">
          Skor tablosu şu an yüklenemiyor. Lütfen kısa süre sonra tekrar dene.
        </p>
      </div>
    );
  }

  if (durum === "bos") {
    return (
      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur">
        <p className="font-semibold text-white">Bu dönem için skorlar derleniyor</p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-300">
          İl temsilcilerimiz üye, etkinlik, proje ve mentorluk verilerini topluyor.
          İlk skorlar açıklandığında liderlik tablosu burada görünecek.
        </p>
      </div>
    );
  }

  const birinci = skorlar[0];

  return (
    <div className="mt-10 grid gap-6">
      {birinci && (
        <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-6 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">
            Bu dönemin lideri
          </p>
          <p className="mt-2 text-2xl font-bold text-white">
            {birinci.il}
            <span className="ml-3 align-middle font-mono text-sm text-amber-300">
              {birinci.puan} puan
            </span>
          </p>
          <p className="mt-1 text-sm text-zinc-300">
            {ay && <>Dönem: {ay} · </>}
            {birinci.uye_sayisi} üye · {birinci.etkinlik_sayisi} etkinlik ·{" "}
            {birinci.proje_sayisi} proje · {birinci.mentor_sayisi} mentor
          </p>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-zinc-400">
              <th className="px-5 py-3 font-semibold">Sıra</th>
              <th className="px-5 py-3 font-semibold">İl</th>
              <th className="hidden px-5 py-3 text-right font-semibold sm:table-cell">Üye</th>
              <th className="hidden px-5 py-3 text-right font-semibold sm:table-cell">Etkinlik</th>
              <th className="hidden px-5 py-3 text-right font-semibold md:table-cell">Proje</th>
              <th className="px-5 py-3 text-right font-semibold">Puan</th>
            </tr>
          </thead>
          <tbody>
            {skorlar.map((s, i) => (
              <tr
                key={s.il}
                className={`border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.04] ${
                  i === 0 ? "bg-amber-500/[0.06]" : ""
                }`}
              >
                <td className="px-5 py-3 font-mono text-zinc-400">
                  {i === 0 ? "🏆" : String(i + 1).padStart(2, "0")}
                </td>
                <td className={`px-5 py-3 font-semibold ${i === 0 ? "text-amber-200" : "text-white"}`}>
                  {s.il}
                </td>
                <td className="hidden px-5 py-3 text-right text-zinc-300 sm:table-cell">
                  {s.uye_sayisi}
                </td>
                <td className="hidden px-5 py-3 text-right text-zinc-300 sm:table-cell">
                  {s.etkinlik_sayisi}
                </td>
                <td className="hidden px-5 py-3 text-right text-zinc-300 md:table-cell">
                  {s.proje_sayisi}
                </td>
                <td className="px-5 py-3 text-right font-mono font-semibold text-gama-300">
                  {s.puan}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}