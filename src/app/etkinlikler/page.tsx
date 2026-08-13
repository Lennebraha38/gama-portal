import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import { etkinlikDetayi, tumEtkinlikler } from "@/lib/etkinlikler";
import { GunKaldi } from "@/components/GunKaldi";

export const metadata: Metadata = {
  title: "Etkinlikler",
  description:
    "Gama Topluluğu'nun atölye, hackathon, seminer ve topluluk etkinlikleri. Yaklaşan etkinlikleri kaçırma.",
};

function TarihRozeti({ tarih }: { tarih: string }) {
  const d = new Date(`${tarih}T12:00:00`);
  return (
    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-gama-500/15 ring-1 ring-gama-400/30">
      <span className="text-xl font-bold leading-none text-white">
        {d.getDate().toString().padStart(2, "0")}
      </span>
      <span className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-gama-300">
        {d.toLocaleDateString("tr-TR", { month: "short" })}
      </span>
    </div>
  );
}

export default function EtkinliklerPage() {
  const tumu = tumEtkinlikler().map(etkinlikDetayi);
  const yaklasan = tumu.filter((e) => !e.sonaErdi);
  const gecmis = tumu.filter((e) => e.sonaErdi);

  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <p className="sys-label">
            Sistem 01 <span className="text-zinc-400">/</span> Gama
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Etkinlikler</h1>
          <p className="mt-3 max-w-2xl text-zinc-300">
            Atölye, hackathon, seminer ve topluluk etkinliklerimiz. Takvimine ekle, kaçırma.
          </p>
        </Reveal>

        {yaklasan.length === 0 && gecmis.length === 0 ? (
          <Reveal delay={100} className="flex flex-1 flex-col">
            <div className="mt-12 flex flex-1 flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/[0.03] p-16 text-center backdrop-blur">
              <Logo className="h-14 w-14 animate-pulse" />
              <h2 className="mt-6 text-xl font-bold text-white">Yakında etkinlikler başlıyor</h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-zinc-200">
                Atölye ve hackathonlarımız planlanıyor. İlk duyuruyu kaçırmamak için
                bizi sosyal medyada takip et.
              </p>
              <Link
                href="/katil"
                transitionTypes={["nav-forward"]}
                className="mt-8 rounded-full bg-gradient-to-r from-gama-500 to-gama-400 px-7 py-3 font-semibold text-white transition-all hover:shadow-[0_0_24px_rgba(96,165,250,0.55)]"
              >
                Bize Katıl
              </Link>
            </div>
          </Reveal>
        ) : (
          <>
            {yaklasan.length > 0 && (
              <Reveal delay={100}>
                <div className="mt-10 grid gap-5">
                  {yaklasan.map((e) => (
                    <article
                      key={e.slug}
                      className="card-glass flex flex-col gap-4 rounded-2xl p-6 backdrop-blur sm:flex-row sm:items-start"
                    >
                      <TarihRozeti tarih={e.tarih} />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full bg-gama-500/20 px-3 py-1 text-xs font-semibold text-gama-300">
                            {e.tur}
                          </span>
                          <GunKaldi baslangicISO={e.baslangicISO} />
                          <span className="text-sm text-zinc-300">
                            {e.saat} · {e.sehir}
                          </span>
                          {e.yer && (
                            <span className="text-sm text-zinc-400">{e.yer}</span>
                          )}
                        </div>
                        <h2 className="mt-3 text-lg font-bold text-white">
                          <Link
                            href={`/etkinlikler/${e.slug}`}
                            className="hover:text-gama-300"
                          >
                            {e.baslik}
                          </Link>
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-zinc-200">{e.ozet}</p>
                        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-semibold">
                          <Link
                            href={`/etkinlikler/${e.slug}`}
                            className="text-gama-300 underline-offset-4 hover:underline"
                          >
                            Detaylar →
                          </Link>
                          {e.kayit && (
                            <a
                              href={e.kayit}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full bg-gradient-to-r from-gama-600 to-gama-500 px-5 py-2 text-xs text-white transition-all hover:shadow-[0_0_16px_rgba(96,165,250,0.5)]"
                            >
                              Kayıt Ol
                            </a>
                          )}
                          <a
                            href={`/etkinlikler/${e.slug}.ics`}
                            className="text-sm text-zinc-300 underline-offset-4 hover:text-white hover:underline"
                          >
                            Takvime ekle (ICS)
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </Reveal>
            )}

            {gecmis.length > 0 && (
              <Reveal delay={150}>
                <h2 className="mt-14 text-lg font-bold text-zinc-300">Geçmiş Etkinlikler</h2>
                <div className="mt-4 grid gap-3">
                  {gecmis.map((e) => (
                    <Link
                      key={e.slug}
                      href={`/etkinlikler/${e.slug}`}
                      className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4 transition-colors hover:border-white/20"
                    >
                      <span className="text-sm font-semibold text-gama-300">
                        {new Date(`${e.tarih}T12:00:00`).toLocaleDateString("tr-TR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex-1 text-sm font-medium text-zinc-200">{e.baslik}</span>
                      <span className="text-xs text-zinc-400">{e.tur}</span>
                    </Link>
                  ))}
                </div>
              </Reveal>
            )}
          </>
        )}
      </div>
    </PageTransition>
  );
}
