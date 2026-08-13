"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Sayfa hatası:", error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-7xl font-bold tracking-tight text-gradient md:text-8xl">!</p>
      <h1 className="mt-4 text-xl font-bold text-white md:text-2xl">
        Bir şeyler ters gitti
      </h1>
      <p className="mt-3 max-w-md text-zinc-300">
        Beklenmedik bir hata oluştu. Sayfayı yeniden yüklemeyi deneyebilir veya
        iletişime geçebilirsin.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-gradient-to-r from-gama-500 to-gama-400 px-7 py-3 font-semibold text-white transition-all hover:shadow-[0_0_24px_rgba(96,165,250,0.55)]"
        >
          Tekrar Dene
        </button>
        <Link
          href="/"
          transitionTypes={["nav-back"]}
          className="rounded-full border border-white/20 bg-white/5 px-7 py-3 font-semibold text-white backdrop-blur transition-colors hover:border-white/40 hover:bg-white/10"
        >
          Anasayfaya Dön
        </Link>
      </div>
    </div>
  );
}
