"use client";

import { useState } from "react";
import { tumIller } from "@/lib/provinces";

const roller = [
  "Üye",
  "Proje Geliştirici (Yazılım)",
  "Proje Geliştirici (Donanım)",
  "İl Temsilcisi Adayı",
  "Mentor",
];

const inputClass =
  "rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder-zinc-400 backdrop-blur transition-colors focus:border-gama-400 focus:outline-none focus:ring-1 focus:ring-gama-400";

export default function KatilPage() {
  const [gonderildi, setGonderildi] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
        Bize Katıl
      </h1>
      <p className="mt-3 text-zinc-200">
        Formu doldur; yazılım, donanım veya mentorluk yolculuğuna ilk adımı
        atalım.
      </p>

      {gonderildi ? (
        <div className="mt-10 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6 backdrop-blur">
          <p className="font-semibold text-emerald-300">Başvurun alındı!</p>
          <p className="mt-1 text-sm text-emerald-400">
            Ekibimiz seninle en kısa sürede iletişime geçecek.
          </p>
        </div>
      ) : (
        <form
          className="mt-10 grid gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            setGonderildi(true);
          }}
        >
          <label className="grid gap-2 text-sm font-medium text-zinc-200">
            Ad Soyad
            <input required className={inputClass} type="text" name="ad" placeholder="Adın soyadın" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-zinc-200">
            E-posta
            <input required className={inputClass} type="email" name="eposta" placeholder="ornek@eposta.com" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-zinc-200">
            İl
            <select required className={inputClass} name="il" defaultValue="">
              <option value="" disabled>
                İl seç
              </option>
              {tumIller.map((il) => (
                <option key={il} value={il} className="text-zinc-900">
                  {il}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-zinc-200">
            İlgilendiğin rol
            <select required className={inputClass} name="rol" defaultValue="">
              <option value="" disabled>
                Rol seç
              </option>
              {roller.map((rol) => (
                <option key={rol} value={rol} className="text-zinc-900">
                  {rol}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-zinc-200">
            Kendini kısaca tanıt
            <textarea
              className={inputClass}
              name="tanitim"
              rows={4}
              placeholder="Deneyimlerin, hedeflerin, ilgi alanların..."
            />
          </label>
          <button
            type="submit"
            className="rounded-full bg-gradient-to-r from-gama-600 via-violet-600 to-cyan-500 px-7 py-3 font-semibold text-white transition-all hover:shadow-[0_0_24px_rgba(139,92,246,0.6)]"
          >
            Başvuruyu Gönder
          </button>
        </form>
      )}
    </div>
  );
}
