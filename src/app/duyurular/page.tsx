import type { Metadata } from "next";
import Link from "next/link";
import { tumDuyurular } from "@/lib/duyurular";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Duyurular",
  description: "Gama Topluluğu'nun etkinlik ve proje duyuruları.",
};

export default function DuyurularPage() {
  const duyurular = tumDuyurular();

  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Duyurular</h1>
          <p className="mt-3 max-w-2xl text-zinc-200">
            Gama Topluluğu&apos;nun etkinlik ve proje duyuruları.
          </p>
        </Reveal>

        {duyurular.length === 0 ? (
          <Reveal delay={100} className="flex flex-1 flex-col">
            <div className="mt-12 flex flex-1 flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/[0.03] p-16 text-center backdrop-blur">
              <p className="text-sm text-zinc-300">
                Henüz duyuru yok. İlk duyuru yayınlandığında burada görünecek.
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="mt-10 grid gap-5">
            {duyurular.map((d, i) => (
              <Reveal key={d.slug} delay={i * 60}>
                <Link
                  href={`/duyurular/${d.slug}`}
                  transitionTypes={["nav-forward"]}
                  className="block rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition-colors hover:border-gama-400/40 hover:bg-white/[0.06]"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-gama-500/20 px-3 py-1 text-xs font-semibold text-gama-300">
                      {d.tur}
                    </span>
                    <span className="text-sm text-zinc-300">{d.tarih}</span>
                  </div>
                  <h2 className="mt-3 text-lg font-bold text-white">{d.baslik}</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-200">{d.ozet}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
