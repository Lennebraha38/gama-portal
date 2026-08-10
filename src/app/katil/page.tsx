"use client";

import { useState } from "react";

const iller = [
  "İstanbul",
  "Ankara",
  "İzmir",
  "Diğer (listede yok)",
];

const roller = [
  "Üye",
  "Proje Geliştirici (Yazılım)",
  "Proje Geliştirici (Donanım)",
  "İl Temsilcisi Adayı",
  "Mentor",
];

export default function KatilPage() {
  const [gonderildi, setGonderildi] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
        Bize Katıl
      </h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        Formu doldur; yazılım, donanım veya mentorluk yolculuğuna ilk adımı
        atalım. (Veritabanı bağlantısı kurulana dek başvurular buradan kaydedilir.)
      </p>

      {gonderildi ? (
        <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-800 dark:bg-emerald-950">
          <p className="font-semibold text-emerald-800 dark:text-emerald-300">
            Başvurun alındı!
          </p>
          <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">
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
          <label className="grid gap-2 text-sm font-medium">
            Ad Soyad
            <input
              required
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              type="text"
              name="ad"
              placeholder="Adın soyadın"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            E-posta
            <input
              required
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              type="email"
              name="eposta"
              placeholder="ornek@eposta.com"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            İl
            <select
              required
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              name="il"
            >
              {iller.map((il) => (
                <option key={il}>{il}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium">
            İlgilendiğin rol
            <select
              required
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              name="rol"
            >
              {roller.map((rol) => (
                <option key={rol}>{rol}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Kendini kısaca tanıt
            <textarea
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              name="tanitim"
              rows={4}
              placeholder="Deneyimlerin, hedeflerin, ilgi alanların..."
            />
          </label>
          <button
            type="submit"
            className="rounded-full bg-gama-600 px-7 py-3 font-semibold text-white transition-colors hover:bg-gama-700"
          >
            Başvuruyu Gönder
          </button>
        </form>
      )}
    </div>
  );
}
