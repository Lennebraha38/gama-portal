import type { Metadata } from "next";
import Link from "next/link";
import { tumAmalar } from "@/lib/amalar";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "AMA Arşivi",
  description:
    "Gama'nın 'Bana Her Şeyi Sor' etkinlikleri: alanında uzman konukların soru-cevap kayıtları ve özetleri.",
};

export default function AmalarPage() {
  const amalar = tumAmalar();

  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <p className="sys-label">
            Sistem 09 <span className="text-zinc-400">/</span> Gama
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">AMA Arşivi</h1>
          <p className="mt-3 max-w-2xl text-zinc-300">
            &quot;Bana Her Şeyi Sor&quot; (Ask Me Anything) buluşmalarımızda
            alanında deneyimli konuklar, gençlerin sorularını yanıtladı.
            Özetler ve kayıtlar burada toplanır.
          </p>
        </Reveal>

        {amalar.length === 0 ? (
          <Reveal delay={100} className="flex flex-1 flex-col">
            <div className="mt-12 flex flex-1 flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/[0.03] p-16 text-center backdrop-blur">
              <p className="text-sm text-zinc-300">
                Henüz AMA etkinliği yapılmadı. İlk konuğumuzla buluşmayı{" "}
                <Link href="/duyurular" className="text-gama-300 underline-offset-4 hover:underline">
                  duyurular
                </Link>{" "}
                sayfasından kaçırma.
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="mt-10 grid gap-5">
            {amalar.map((a, i) => (
              <Reveal key={a.slug} delay={i * 60}>
                <Link
                  href={`/ama/${a.slug}`}
                  transitionTypes={["nav-forward"]}
                  className="card-glass block rounded-2xl p-6 backdrop-blur"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-gama-500/20 px-3 py-1 text-xs font-semibold text-gama-300">
                      AMA
                    </span>
                    {a.alan && (
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-zinc-300">
                        {a.alan}
                      </span>
                    )}
                    <span className="text-sm text-zinc-300">{a.tarih}</span>
                  </div>
                  <h2 className="mt-3 text-lg font-bold text-white">{a.konuk}</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-200">{a.ozet}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}