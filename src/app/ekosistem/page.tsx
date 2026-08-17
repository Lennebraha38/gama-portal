import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import { ekosistemProgramlar, mtkbTemalari } from "@/lib/ekosistem";

export const metadata: Metadata = {
  title: "Ekosistem",
  description:
    "Gama'nın bağ kurduğu teknoloji ekosistemi: TEKNOFEST Girişim Programı, DENEYAP atölyeleri ve Milli Teknoloji Kulüpler Birliği.",
};

export default function EkosistemPage() {
  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <p className="sys-label">
            Sistem 04 <span className="text-zinc-400">/</span> Gama
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Teknoloji Ekosistemi
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-300">
            Gama tek başına bir ada değil; Türkiye&apos;nin teknoloji
            ekosisteminin bir parçasıdır. Üyelerimizin projelerini yarışmalara,
            girişim programlarına ve atölyelere taşıyacak yolları burada
            topluyoruz.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 grid gap-5">
            {ekosistemProgramlar.map((p) => (
              <article
                key={p.ad}
                className="card-glass rounded-2xl p-6 backdrop-blur"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-lg font-bold text-white">{p.ad}</p>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-zinc-300">
                    {p.kurum}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-200">{p.aciklama}</p>
                <a
                  href={p.baglanti}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-semibold text-gama-300 underline-offset-4 hover:underline"
                >
                  Resmi sayfaya git ↗
                </a>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-12">
            <p className="sys-label">
              Proje Etiketleri <span className="text-zinc-400">/</span> MTKB Uyumlu
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
              Projeni hangi alanda sergiliyorsun?
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              Gama&apos;daki projeler, Milli Teknoloji Kulüpler Birliği&apos;nin
              tematik alanlarıyla birebir eşleşen etiketlerle sınıflandırılır.
              Böylece üyelerimizin projeleri, TÜBİTAK destekleri ve TEKNOFEST
              yarışmalarında doğrudan karşılık bulur.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {mtkbTemalari.map((t) => (
                <div
                  key={t.ad}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur"
                >
                  <p className="font-semibold text-white">{t.ad}</p>
                  <p className="mt-1 text-sm leading-5 text-zinc-400">{t.ozet}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </PageTransition>
  );
}