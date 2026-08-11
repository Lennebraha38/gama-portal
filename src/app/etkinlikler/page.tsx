import type { Metadata } from "next";
import Link from "next/link";
import { events } from "@/lib/events";
import { Logo } from "@/components/Logo";
import { PageTransition } from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Etkinlikler",
  description:
    "Gama Topluluğu'nun atölye, hackathon, seminer ve topluluk etkinlikleri. Yaklaşan etkinlikleri kaçırma.",
};

export default function EtkinliklerPage() {
  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
        Etkinlikler &amp; Duyurular
      </h1>
      <p className="mt-3 max-w-2xl text-zinc-200">
        Atölye, hackathon, seminer ve topluluk duyuruları burada.
      </p>

      {events.length === 0 ? (
        <div className="mt-12 flex flex-1 flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/[0.03] p-16 text-center backdrop-blur">
          <Logo className="h-14 w-14 animate-pulse" />
          <h2 className="mt-6 text-xl font-bold text-white">
            Yakında etkinlikler başlıyor
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-zinc-200">
            Atölye ve hackathonlarımız planlanıyor. İlk duyuruyu kaçırmamak için
            bizi sosyal medyada takip et.
          </p>
          <Link
            href="/katil"
            transitionTypes={["nav-forward"]}
            className="mt-8 rounded-full bg-gradient-to-r from-gama-600 via-violet-600 to-cyan-500 px-7 py-3 font-semibold text-white transition-all hover:shadow-[0_0_24px_rgba(139,92,246,0.6)]"
          >
            Bize Katıl
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-5">
          {events.map((e) => (
            <article
              key={e.baslik}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-gama-500/20 px-3 py-1 text-xs font-semibold text-gama-300">
                  {e.tur}
                </span>
                <span className="text-sm text-zinc-300">{e.tarih}</span>
              </div>
              <h2 className="mt-3 text-lg font-bold text-white">{e.baslik}</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-200">
                {e.aciklama}
              </p>
            </article>
          ))}
        </div>
      )}
      </div>
    </PageTransition>
  );
}
