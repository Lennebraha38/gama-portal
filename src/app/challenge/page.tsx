import type { Metadata } from "next";
import { aktifChallenge, challengeMarkdownHTML, tumChallenge } from "@/lib/challenges";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import { ChallengeFormu } from "@/components/ChallengeFormu";

export const metadata: Metadata = {
  title: "Haftalık Challenge",
  description:
    "Gama'nın haftalık teknoloji challenge'ları: kısa görevler, çözümünü gönder, rozetini kazan.",
};

export default function ChallengePage() {
  const aktif = aktifChallenge();
  const tumu = tumChallenge();

  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <p className="sys-label">
            Sistem 06 <span className="text-zinc-400">/</span> Gama
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Haftalık Challenge
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-300">
            Her hafta tek bir küçük görev: bir algoritma yaz, bir devre kur, bir
            tasarım üret. Çözümünü gönder, ilk gönderenler vitrinde anılır.
          </p>
        </Reveal>

        {aktif ? (
          <Reveal delay={80}>
            <article className="mt-10 rounded-2xl border border-gama-500/20 bg-gama-500/[0.06] p-6 backdrop-blur sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-gama-500/20 px-3 py-1 text-xs font-semibold text-gama-300">
                  Hafta {aktif.hafta}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-zinc-300">
                  {aktif.zorluk}
                </span>
                {aktif.alan && (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-zinc-300">
                    {aktif.alan}
                  </span>
                )}
                {aktif.sonTarih && (
                  <span className="text-xs text-zinc-400">Son gün: {aktif.sonTarih}</span>
                )}
              </div>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">
                {aktif.baslik}
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-300">{aktif.ozet}</p>
              <div
                className="prose-invert mt-6"
                dangerouslySetInnerHTML={{ __html: challengeMarkdownHTML(aktif.icerik) }}
              />
            </article>
          </Reveal>
        ) : (
          <Reveal delay={80}>
            <div className="mt-10 rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-10 text-center backdrop-blur">
              <p className="font-semibold text-white">Bu haftanın challenge&apos;ı hazırlanıyor</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-300">
                Haftalık görevler kısa süre içinde burada. Geçmiş challenge&apos;ları
                aşağıdan inceleyebilirsin.
              </p>
            </div>
          </Reveal>
        )}

        {aktif && (
          <Reveal delay={120}>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-widest text-gama-300">
                Çözümünü Gönder
              </p>
              <p className="mt-1.5 text-sm leading-6 text-zinc-300">
                Çözüm linkini (repo, demo, tasarım dosyası) paylaş. İlk gönderimin{" "}
                <span className="font-semibold text-white">Meydan Okuyan</span>{" "}
                rozetini kazandırır.
              </p>
              <ChallengeFormu slug={aktif.slug} />
            </div>
          </Reveal>
        )}

        {tumu.length > 0 && (
          <Reveal delay={150}>
            <h2 className="mt-14 text-lg font-bold text-zinc-300">Geçmiş Challenge&apos;lar</h2>
            <div className="mt-4 grid gap-3">
              {tumu
                .filter((c) => c.slug !== aktif?.slug)
                .map((c) => (
                  <div
                    key={c.slug}
                    className="flex flex-wrap items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4"
                  >
                    <span className="rounded-full bg-gama-500/20 px-3 py-1 text-xs font-semibold text-gama-300">
                      Hafta {c.hafta}
                    </span>
                    <span className="flex-1 text-sm font-medium text-zinc-200">{c.baslik}</span>
                    <span className="text-xs text-zinc-400">
                      {c.zorluk}
                      {c.sonTarih && ` · ${c.sonTarih}`}
                    </span>
                  </div>
                ))}
            </div>
          </Reveal>
        )}
      </div>
    </PageTransition>
  );
}