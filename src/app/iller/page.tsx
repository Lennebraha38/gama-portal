import type { Metadata } from "next";
import { provilist } from "@/lib/site";

export const metadata: Metadata = {
  title: "İl Temsilcileri",
};

export default function IllerPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
        İl Temsilcileri
      </h1>
      <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Türkiye&apos;nin dört bir yanında Gama&apos;yı temsil eden
        koordinatörler. Sen de bulunduğun ilde temsilci olmak istersen{" "}
        <a
          href="/katil"
          className="font-medium text-gama-600 underline dark:text-gama-400"
        >
          katıl
        </a>
        .
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {provilist.map((item) => (
          <article
            key={item.il}
            className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">{item.il}</h2>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                {item.durum}
              </span>
            </div>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Temsilci: <span className="font-medium">{item.temsilci}</span>
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
