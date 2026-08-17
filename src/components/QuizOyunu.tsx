"use client";

import { useState } from "react";
import { QUIZ_USTA_ESIK, quizSonuc, type QuizSorusu } from "@/lib/quiz";
import { ROZET_ANAHTARLARI, rozetIsaretle } from "@/lib/rozetler";

export function QuizOyunu({ sorular }: { sorular: QuizSorusu[] }) {
  const [adim, setAdim] = useState(0);
  const [cevaplar, setCevaplar] = useState<number[]>([]);
  const [secilen, setSecilen] = useState<number | null>(null);
  const [bitti, setBitti] = useState(false);
  const [rozetVerildi, setRozetVerildi] = useState(false);

  const soru = sorular[adim];
  const toplam = sorular.length;

  function sec(secenek: number) {
    if (secilen !== null) return;
    setSecilen(secenek);
    setCevaplar((c) => [...c, secenek]);
  }

  function sonraki() {
    if (adim + 1 >= toplam) {
      setBitti(true);
    } else {
      setAdim((a) => a + 1);
      setSecilen(null);
    }
  }

  function tekrarOyna() {
    setAdim(0);
    setCevaplar([]);
    setSecilen(null);
    setBitti(false);
    setRozetVerildi(false);
  }

  if (bitti) {
    const sonuc = quizSonuc(cevaplar);
    const ustaMi = sonuc.yuzde >= QUIZ_USTA_ESIK;
    if (ustaMi && !rozetVerildi) {
      try {
        rozetIsaretle(window.localStorage, ROZET_ANAHTARLARI.quizUsta);
      } catch {
        // depolama kapalıysa rozet kaydedilmez
      }
      setRozetVerildi(true);
    }
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur">
        <p className="text-5xl font-bold text-white">
          {sonuc.dogru}/{sonuc.toplam}
        </p>
        <p className="mt-3 text-lg font-semibold text-gama-300">%{sonuc.yuzde} başarı</p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-300">
          {ustaMi
            ? "Harika! Teknoloji Zekâsı rozetini kazandın. Rozetin " +
              "Kaynak sayfasındaki vitrinde görünecek."
            : `%${QUIZ_USTA_ESIK} ve üzeri skor "Teknoloji Zekâsı" rozetini kazandırır. Tekrar dene, öğrenme devam eder.`}
        </p>
        <button
          type="button"
          onClick={tekrarOyna}
          className="mt-6 rounded-full bg-gradient-to-r from-gama-500 to-gama-400 px-7 py-3 font-semibold text-white transition-all hover:shadow-[0_0_24px_rgba(96,165,250,0.55)]"
        >
          Tekrar Oyna
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:p-8">
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span className="rounded-full bg-white/10 px-3 py-1 font-semibold text-zinc-200">
          {soru.alan}
        </span>
        <span className="font-mono">
          {adim + 1} / {toplam}
        </span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gama-500 to-gama-400 transition-all duration-300"
          style={{ width: `${(adim / toplam) * 100}%` }}
        />
      </div>

      <h2 className="mt-6 text-lg font-bold leading-7 text-white sm:text-xl">
        {soru.soru}
      </h2>

      <div className="mt-6 grid gap-3">
        {soru.secenekler.map((secenek, i) => {
          let sinif =
            "border-white/15 bg-white/[0.04] hover:border-gama-400/50 hover:bg-gama-500/10";
          if (secilen !== null) {
            if (i === soru.dogru) {
              sinif = "border-emerald-400/50 bg-emerald-500/15 text-emerald-200";
            } else if (i === secilen) {
              sinif = "border-red-400/50 bg-red-500/15 text-red-200";
            } else {
              sinif = "border-white/5 bg-white/[0.02] text-zinc-400";
            }
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => sec(i)}
              disabled={secilen !== null}
              className={`rounded-xl border px-5 py-3 text-left text-sm font-medium transition-all disabled:cursor-default ${sinif}`}
            >
              <span className="mr-2 font-mono text-xs text-zinc-400">
                {String.fromCharCode(65 + i)}
              </span>
              {secenek}
            </button>
          );
        })}
      </div>

      {secilen !== null && (
        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-sm text-zinc-300">
            {secilen === soru.dogru ? (
              <span className="font-semibold text-emerald-300">Doğru!</span>
            ) : (
              <span className="font-semibold text-red-300">
                Yanlış — doğru cevap{" "}
                <span className="text-emerald-300">
                  {String.fromCharCode(65 + soru.dogru)}
                </span>
              </span>
            )}
          </p>
          <button
            type="button"
            onClick={sonraki}
            className="rounded-full bg-gradient-to-r from-gama-500 to-gama-400 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(96,165,250,0.5)]"
          >
            {adim + 1 >= toplam ? "Sonucu Gör" : "Sonraki Soru"}
          </button>
        </div>
      )}
    </div>
  );
}