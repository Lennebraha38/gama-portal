import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import { tumProjeler } from "@/lib/projeler";

export const metadata: Metadata = {
  title: "Projeler",
  description:
    "Gama çatısı altında yürütülen projeler: il temsilcilik ağı, hackathon serisi ve açık kaynak platform. Fikrini hayata geçirmek için başvur.",
};

function DurumRozeti({ durum }: { durum: string }) {
  const renk =
    durum === "Aktif"
      ? "bg-gama-500/20 text-gama-300"
      : durum === "Başvuruya Açık"
        ? "bg-amber-500/20 text-amber-300"
        : "bg-white/10 text-zinc-300";
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${renk}`}>
      {durum}
    </span>
  );
}

export default function ProjelerPage() {
  const projeler = tumProjeler();

  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <p className="sys-label">
            Sistem 01 <span className="text-zinc-400">/</span> Gama
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Projeler</h1>
          <p className="mt-3 max-w-2xl text-zinc-300">
            Gama çatısı altında yürütülen projeler. Her biri, Türkiye&apos;nin
            geleceğine imza atacak gençlerin sahibi olduğu girişimlerdir.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 grid gap-5">
            {projeler.map((p) => (
              <article
                key={p.slug}
                className="card-glass flex flex-col gap-4 rounded-2xl p-6 backdrop-blur sm:flex-row sm:items-start"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gama-500/15 font-mono text-xl font-bold text-gama-300 ring-1 ring-gama-400/30">
                  Γ
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <DurumRozeti durum={p.durum} />
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-zinc-300">
                      {p.kapsam}
                    </span>
                    <span className="text-sm text-zinc-400">{p.sehir}</span>
                  </div>
                  <h2 className="mt-3 text-lg font-bold text-white">
                    <Link href={`/projeler/${p.slug}`} className="hover:text-gama-300">
                      {p.baslik}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-200">{p.ozet}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-semibold">
                    <Link
                      href={`/projeler/${p.slug}`}
                      className="text-gama-300 underline-offset-4 hover:underline"
                    >
                      Detaylar →
                    </Link>
                    {p.site && (
                      <a
                        href={p.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-zinc-300 underline-offset-4 hover:text-white hover:underline"
                      >
                        Platforma Git ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur">
            <h2 className="text-xl font-bold text-white">Bir sonraki proje senin fikrin</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-200">
              Gama; fon, takım ve mentorluk desteğiyle fikrini hayata
              geçirmene yardımcı olur. Fikrini bizimle paylaş.
            </p>
            <Link
              href="/katil"
              transitionTypes={["nav-forward"]}
              className="mt-6 inline-block rounded-full bg-gradient-to-r from-gama-500 to-gama-400 px-7 py-3 font-semibold text-white transition-all hover:shadow-[0_0_24px_rgba(96,165,250,0.55)]"
            >
              Fikrini Paylaş
            </Link>
          </div>
        </Reveal>
      </div>
    </PageTransition>
  );
}
