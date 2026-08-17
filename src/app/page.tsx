import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { tumDuyurular } from "@/lib/duyurular";
import { yaklasanEtkinlikler } from "@/lib/etkinlikler";
import { Logo } from "@/components/Logo";
import { Stats } from "@/components/Stats";
import { GeriSayim } from "@/components/GeriSayim";
import { SubmitForm } from "@/components/SubmitForm";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import { GunlukGorev } from "@/components/GunlukGorev";

const icons = {
  kaynak: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  takim: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  mentorluk: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
};

const iconMap = [icons.kaynak, icons.takim, icons.mentorluk];
const iconGradients = [
  "from-gama-500 to-gama-400",
  "from-gama-600 to-gama-400",
  "from-gama-500 to-gama-500",
];

function BolumBaslik({
  numara,
  baslik,
  baglantiHref,
  baglantiMetin,
}: {
  numara: string;
  baslik: string;
  baglantiHref?: string;
  baglantiMetin?: string;
}) {
  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="sys-label">
            Sistem {numara} <span className="text-zinc-400">/</span> Gama
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{baslik}</h2>
        </div>
        {baglantiHref && (
          <Link
            href={baglantiHref}
            transitionTypes={["nav-forward"]}
            className="sys-label transition-colors hover:text-gama-300"
          >
            {baglantiMetin} →
          </Link>
        )}
      </div>
      <div aria-hidden className="section-line mt-5" />
    </div>
  );
}

export default function Home() {
  const sonDuyurular = tumDuyurular().slice(0, 3);
  const sonEtkinlikler = yaklasanEtkinlikler(3);
  const ilkEtkinlik = sonEtkinlikler[0];

  return (
    <PageTransition>
      <div className="flex flex-1 flex-col">
        <section className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-14 px-4 pb-24 pt-20 md:pt-28 lg:grid-cols-12 lg:gap-10">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[-180px] top-[-160px] -z-10 h-[520px] w-[520px] animate-float-slow rounded-full conic-glow opacity-20 blur-[40px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-[-120px] right-[-120px] -z-10 h-[380px] w-[380px] rounded-full bg-amber-500/10 blur-[120px]"
          />
          <div className="lg:col-span-7">
            <div className="animate-fade-up flex flex-wrap items-center gap-x-3 gap-y-2 rounded-full border border-gama-400/25 bg-gama-500/[0.07] px-5 py-2 backdrop-blur">
              <Logo className="h-5 w-5" />
              <span className="live-dot h-2 w-2 rounded-full bg-amber-400" />
              <span className="sys-label !tracking-normal text-zinc-300">
                Türkiye&apos;nin gençlik araştırma-geliştirme birliği
              </span>
            </div>
            <h1 className="animate-fade-up delay-100 mt-8 max-w-3xl text-4xl font-bold leading-[1.12] tracking-tight md:text-7xl lg:text-8xl">
              Teknolojik ve bilimsel bağımsızlık için{" "}
              <span className="glow-text text-gradient">gençler</span>{" "}
              buluşuyor.
            </h1>
            <p className="animate-fade-up delay-200 mt-6 max-w-xl text-lg leading-8 text-zinc-300">
              {siteConfig.mission}
            </p>
            <div className="animate-fade-up delay-300 mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/katil"
                transitionTypes={["nav-forward"]}
                className="rounded-full bg-gradient-to-r from-gama-500 to-gama-400 px-8 py-3.5 w-full text-center font-semibold text-white shadow-[0_0_26px_rgba(96,165,250,0.45)] transition-all hover:shadow-[0_0_40px_rgba(96,165,250,0.7)] sm:w-auto"
              >
                Bize Katıl
              </Link>
              <Link
                href="/iller"
                transitionTypes={["nav-forward"]}
                className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 w-full text-center font-semibold text-white backdrop-blur transition-colors hover:border-gama-400/50 hover:bg-gama-500/10 sm:w-auto"
              >
                İl Temsilcileri
              </Link>
            </div>
            <div className="animate-fade-up delay-400 mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
              {["81 İl", "Ücretsiz", "Herkese Açık"].map((v, i) => (
                <span key={v} className="flex items-center gap-8">
                  <span className="sys-label text-zinc-400">{v}</span>
                  {i < 2 && <span aria-hidden className="h-3 w-px bg-white/20" />}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
              <div className="animate-fade-up delay-300">
              <div className="card-glass rounded-2xl p-5 backdrop-blur md:p-6">
                <div className="flex items-center justify-between">
                  <p className="sys-label">Canlı Gösterge</p>
                  <span className="live-dot h-2 w-2 rounded-full bg-amber-400" />
                </div>
                <div className="mt-5">
                  <Stats />
                </div>
                {ilkEtkinlik && (
                  <Link
                    href={`/etkinlikler/${ilkEtkinlik.slug}`}
                    transitionTypes={["nav-forward"]}
                    className="group mt-5 block rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-gama-400/40"
                  >
                    <p className="sys-label text-amber-400/90">Sonraki Etkinlik</p>
                    <h3 className="mt-1 truncate font-semibold text-white transition-colors group-hover:text-gama-300">
                      {ilkEtkinlik.baslik}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-zinc-400">
                      {new Date(`${ilkEtkinlik.tarih}T12:00:00`).toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      · {ilkEtkinlik.sehir}
                    </p>
                  </Link>
                )}
                {ilkEtkinlik && <GeriSayim hedefISO={ilkEtkinlik.baslangicISO} />}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-white/10 bg-white/[0.03] py-6 backdrop-blur">
          <div aria-hidden className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#060b18] to-transparent z-10" />
          <div aria-hidden className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#060b18] to-transparent z-10" />
          <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
            {[...siteConfig.marquee, ...siteConfig.marquee].map((k, i) => (
              <span
                key={i}
                className="flex items-center gap-8 text-sm font-semibold uppercase tracking-widest text-zinc-300"
              >
                {k}
                <span className="text-amber-400">Γ</span>
              </span>
            ))}
          </div>
        </section>

        {sonEtkinlikler.length > 0 && (
          <section className="mx-auto w-full max-w-6xl px-4 py-20">
            <Reveal>
              <BolumBaslik
                numara="01"
                baslik="Yaklaşan etkinlikler"
                baglantiHref="/etkinlikler"
                baglantiMetin="Tümü"
              />
            </Reveal>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {sonEtkinlikler.map((e, i) => (
                <Reveal key={e.slug} delay={i * 100}>
                  <Link
                    href={`/etkinlikler/${e.slug}`}
                    transitionTypes={["nav-forward"]}
                    className="card-glass block h-full rounded-2xl p-6 backdrop-blur"
                  >
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-gama-500/20 px-3 py-1 text-xs font-semibold text-gama-300">
                        {e.tur}
                      </span>
                      <span className="font-mono text-xs text-zinc-400">
                        {new Date(`${e.tarih}T12:00:00`).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "long",
                        })}
                      </span>
                    </div>
                    <h3 className="mt-3 font-semibold text-white">{e.baslik}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-300">{e.ozet}</p>
                    <p className="mt-3 font-mono text-xs text-zinc-400">
                      {e.saat} · {e.sehir}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto w-full max-w-6xl px-4 py-20">
          <Reveal>
            <BolumBaslik
              numara="02"
              baslik="Son gelişmeler"
              baglantiHref="/duyurular"
              baglantiMetin="Tümü"
            />
          </Reveal>
          {sonDuyurular.length > 0 && (
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {sonDuyurular.map((d, i) => (
                <Reveal key={d.slug} delay={i * 100}>
                  <Link
                    href={`/duyurular/${d.slug}`}
                    transitionTypes={["nav-forward"]}
                    className="card-glass block h-full rounded-2xl p-6 backdrop-blur"
                  >
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-gama-500/20 px-3 py-1 text-xs font-semibold text-gama-300">
                        {d.tur}
                      </span>
                      <span className="font-mono text-xs text-zinc-400">{d.tarih}</span>
                    </div>
                    <h3 className="mt-3 font-semibold text-white">{d.baslik}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-300">{d.ozet}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-20">
          <Reveal>
            <BolumBaslik numara="03" baslik="Bugün ne yapabilirsin?" baglantiHref="/kaynak" baglantiMetin="Rozetler" />
          </Reveal>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <GunlukGorev kompakt />
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-widest text-gama-300">
                Topluluk Rotaları
              </p>
              <p className="mt-1.5 text-sm leading-6 text-zinc-300">
                Fikrini projeye, projeyi ekibe, ekibi mentorlukla büyütmeye
                taşıyan dört yol:
              </p>
              <div className="mt-4 grid gap-2">
                {[
                  { href: "/projeler", metin: "Projeni vitrine taşı" },
                  { href: "/mentor", metin: "Mentorluk programına başvur" },
                  { href: "/challenge", metin: "Haftalık challenge'a katıl" },
                  { href: "/quiz", metin: "Teknoloji quizinde kendini dene" },
                ].map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    transitionTypes={["nav-forward"]}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-gama-400/40 hover:bg-gama-500/10 hover:text-white"
                  >
                    {r.metin} →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-20">
          <Reveal>
            <BolumBaslik numara="03" baslik="Sana ne sunuyoruz?" />
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-4 md:grid-rows-[repeat(2,minmax(0,1fr))]">
            {siteConfig.pillars.map((pillar, i) => (
              <Reveal
                key={pillar.title}
                delay={i * 120}
                className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}
              >
                <div
                  className={`card-glass bento-cell h-full rounded-2xl p-6 backdrop-blur ${
                    i === 0 ? "flex flex-col justify-between gap-8 p-8" : ""
                  }`}
                >
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${iconGradients[i]} text-white shadow-lg`}
                  >
                    {iconMap[i]}
                  </span>
                  <div>
                    <h3 className="mt-4 text-lg font-semibold text-white">{pillar.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">
                      {i === 0
                        ? `${pillar.description} Kaynak havuzu, proje dosyaları ve öğrenme materyalleri her üyeye açık.`
                        : pillar.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={360}>
              <Link
                href="/iller"
                transitionTypes={["nav-forward"]}
                className="card-glass bento-cell group relative flex h-full items-center justify-between gap-4 overflow-hidden rounded-2xl p-6 backdrop-blur md:col-span-2"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white">81 ilde temsilcilik ağı</h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-300">
                    Şehrindeki temsilciyi bul, yerel etkinliklere katıl.
                  </p>
                </div>
                <span className="text-gama-400 transition-transform group-hover:translate-x-1">
                  Keşfet →
                </span>
              </Link>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-20">
          <Reveal>
            <div className="panel-grad relative overflow-hidden rounded-3xl p-10 md:p-14">
              <div aria-hidden className="absolute inset-y-0 -left-full w-[300%] animate-gradient-x bg-gradient-to-r from-gama-600/15 via-gama-500/10 to-amber-500/5" />
              <div className="relative">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <p className="sys-label">
                      Sistem 04 <span className="text-zinc-400">/</span> Gama
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                      Gama Manifestosu
                    </h2>
                  </div>
                  <p className="sys-label text-zinc-400">Neden varız?</p>
                </div>
                <div aria-hidden className="section-line mt-5" />
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {siteConfig.manifesto.map((m, i) => (
                    <Reveal key={m.baslik} delay={i * 100}>
                      <div className="card-glass h-full rounded-2xl p-6 backdrop-blur">
                        <span className="text-gradient-amber font-mono text-3xl font-bold">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="mt-3 text-base font-semibold text-white">{m.baslik}</h3>
                        <p className="mt-2 text-sm leading-6 text-zinc-300">{m.metin}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto w-full max-w-4xl px-4 pb-20">
          <Reveal>
            <div className="card-glass relative overflow-hidden rounded-3xl p-8 text-center backdrop-blur md:p-12">
              <div
                aria-hidden
                className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gama-500/20 blur-[90px]"
              />
              <div
                aria-hidden
                className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-amber-500/10 blur-[90px]"
              />
              <div className="relative">
                <p className="sys-label">
                  Sistem 05 <span className="text-zinc-400">/</span> Gama
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                  Vizyonu takip et
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-zinc-300">
                  Atölyeler, duyurular ve projelerden ilk senin haberin olsun. Ayda
                  bir özet — spam yok.
                </p>
                <SubmitForm
                  subject="Bülten aboneliği"
                  tur="bulten"
                  buttonText="Abone Ol"
                  successTitle="Aboneliğin alındı!"
                  successText="Bültenimize aramıza hoş geldin. İlk duyuru geldiğinde haberin olacak."
                  fields={[
                    {
                      name: "email",
                      label: "E-posta adresin",
                      type: "email",
                      required: true,
                      placeholder: "sen@ornek.com",
                    },
                  ]}
                />
              </div>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-gama-500/20 bg-gradient-to-br from-[#0c1a33] via-[#102348] to-[#0a1526] p-10 text-center shadow-[0_0_80px_-20px_rgba(96,165,250,0.4)] md:p-16">
              <div className="absolute inset-y-0 -left-full w-[300%] animate-gradient-x bg-gradient-to-r from-gama-500/20 via-gama-400/20 to-amber-500/10" />
              <div className="absolute inset-0 bg-grid opacity-60" />
              <div className="relative">
                <p className="sys-label">
                  Sistem 06 <span className="text-zinc-400">/</span> Gama
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Türkiye&apos;nin geleceğine imza at.
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-zinc-300">
                  Kaynak, takım ve mentorluk imkanları seni bekliyor. Bugün katıl,
                  yarın Türkiye&apos;nin teknoloji sahnesinde sen ol.
                </p>
                <Link
                  href="/katil"
                  transitionTypes={["nav-forward"]}
                  className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 font-semibold text-[#0c1a33] transition-colors hover:bg-gama-200"
                >
                  Bize Katıl
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </PageTransition>
  );
}
