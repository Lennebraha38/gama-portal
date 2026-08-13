import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import { tumYazilar } from "@/lib/gunluk";

export const metadata: Metadata = {
  title: "Bilim Günlüğü",
  description:
    "Gama'nın bilim ve teknoloji günlüğü: rehberler, topluluk yazıları ve gençlerin Ar-Ge yolculuğundan notlar.",
};

export default function GunlukPage() {
  const yazilar = tumYazilar();

  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <p className="sys-label">
            Sistem 01 <span className="text-zinc-400">/</span> Gama
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Bilim Günlüğü</h1>
          <p className="mt-3 max-w-2xl text-zinc-300">
            Gençlerin Ar-Ge yolculuğundan notlar: rehberler, deneyimler ve
            topluluk hikâyeleri.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5">
          {yazilar.map((y, i) => (
            <Reveal key={y.slug} delay={i * 60}>
              <article className="card-glass rounded-2xl p-6 backdrop-blur">
                <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                  <time dateTime={y.tarih}>
                    {new Date(`${y.tarih}T12:00:00`).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                  <span>·</span>
                  <span>{y.yazar}</span>
                </div>
                <h2 className="mt-3 text-lg font-bold text-white">
                  <Link href={`/gunluk/${y.slug}`} className="hover:text-gama-300">
                    {y.baslik}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-6 text-zinc-200">{y.ozet}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {y.etiketler.map((etiket) => (
                    <span
                      key={etiket}
                      className="rounded-full bg-gama-500/15 px-3 py-1 text-xs font-semibold text-gama-300"
                    >
                      #{etiket}
                    </span>
                  ))}
                  <Link
                    href={`/gunluk/${y.slug}`}
                    className="ml-auto text-sm font-semibold text-gama-300 underline-offset-4 hover:underline"
                  >
                    Oku →
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
