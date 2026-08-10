import type { Metadata } from "next";
import Link from "next/link";
import { regions, toplamIl } from "@/lib/provinces";

export const metadata: Metadata = {
  title: "İl Temsilcileri",
};

export default function IllerPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            İl Temsilcileri
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-200">
            Türkiye&apos;nin <span className="font-semibold text-white">{toplamIl} ili</span>{" "}
            ve 7 bölgesinde Gama&apos;yı temsil eden koordinatörlerimiz seni
            bekliyor.
          </p>
        </div>
        <Link
          href="/katil"
          className="rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-white/40 hover:bg-white/10 md:self-end"
        >
          Temsilci Adayı Ol
        </Link>
      </div>

      <div className="mt-12 grid gap-8">
        {regions.map((bolge) => (
          <section key={bolge.bolge} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur md:p-8">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-white">{bolge.bolge}</h2>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-zinc-100">
                {bolge.iller.length} il
              </span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {bolge.iller.map((il) => (
                <div
                  key={il.il}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-emerald-400/40 hover:bg-white/[0.06]"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-white">{il.il}</p>
                    <p className="truncate text-xs text-zinc-200">
                      Temsilci: {il.temsilci}
                    </p>
                  </div>
                  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
