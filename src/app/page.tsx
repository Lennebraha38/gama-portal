import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { tumDuyurular } from "@/lib/duyurular";
import { yaklasanEtkinlikler } from "@/lib/etkinlikler";
import { Logo } from "@/components/Logo";
import { Stats } from "@/components/Stats";
import { SubmitForm } from "@/components/SubmitForm";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { Magnet } from "@/components/Magnet";

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
  "from-gama-500 to-cyan-400",
  "from-violet-500 to-fuchsia-400",
  "from-cyan-400 to-emerald-400",
];

export default function Home() {
  const sonDuyurular = tumDuyurular().slice(0, 3);
  const sonEtkinlikler = yaklasanEtkinlikler(3);

  return (
    <PageTransition>
      <div className="flex flex-1 flex-col">
      <section className="hero-parallax relative mx-auto flex w-full max-w-6xl flex-col items-center overflow-visible px-4 pb-24 pt-28 text-center md:pt-36">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-[-160px] -z-10 h-[560px] w-[560px] -translate-x-1/2 animate-float-slow rounded-full conic-glow opacity-25 blur-[110px]" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-260px] -z-10 h-[700px] w-[900px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(51,100,255,0.25),transparent_65%)]"
        />
        <div aria-hidden className="preserve-3d pointer-events-none absolute left-1/2 top-[70%] -z-10 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 opacity-60">
          <div className="hero-ring hero-ring-a h-full w-full border border-gama-500/40 shadow-[inset_0_0_60px_rgba(139,92,246,0.18)]" />
          <div className="hero-ring hero-ring-b h-[80%] w-[80%] border border-cyan-400/30 shadow-[inset_0_0_50px_rgba(34,211,238,0.12)]" />
          <div className="hero-ring hero-ring-a h-[55%] w-[55%] border border-violet-400/25" />
        </div>
        <div className="animate-fade-up flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-zinc-200 backdrop-blur">
          <Logo className="h-5 w-5" />
          <span className="live-dot h-2 w-2 rounded-full bg-emerald-400" />
          Türkiye&apos;nin gençlik araştırma-geliştirme birliği
        </div>
        <h1 className="mt-8 max-w-5xl text-5xl font-extrabold leading-[1.12] tracking-tight md:text-7xl lg:text-8xl">
          {"Teknolojik ve bilimsel bağımsızlık için".split(" ").map((w, i) => (
            <span key={`a${i}`} className="hero-word" style={{ animationDelay: `${i * 70}ms` }}>
              {w}{" "}
            </span>
          ))}
          <span
            className="hero-word glow-text text-gradient"
            style={{ animationDelay: `${6 * 70}ms` }}
          >
            gençler{" "}
          </span>
          {"buluşuyor.".split(" ").map((w, i) => (
            <span
              key={`b${i}`}
              className="hero-word"
              style={{ animationDelay: `${(7 + i) * 70}ms` }}
            >
              {w}{" "}
            </span>
          ))}
        </h1>
        <p className="animate-fade-up delay-200 mt-6 max-w-2xl text-lg leading-8 text-zinc-100">
          {siteConfig.mission}
        </p>
        <div className="animate-fade-up delay-300 mt-10 flex flex-col gap-3 sm:flex-row">
          <Magnet>
            <Link
              href="/katil"
              transitionTypes={["nav-forward"]}
              className="btn-shine inline-block rounded-full bg-gradient-to-r from-gama-600 via-violet-600 to-cyan-500 px-8 py-3.5 font-semibold text-white shadow-[0_0_28px_rgba(139,92,246,0.5)] transition-all hover:shadow-[0_0_44px_rgba(139,92,246,0.8)]"
            >
              Bize Katıl
            </Link>
          </Magnet>
          <Magnet>
            <Link
              href="/iller"
              transitionTypes={["nav-forward"]}
              className="inline-block rounded-full border border-white/20 bg-white/5 px-8 py-3.5 font-semibold text-white backdrop-blur transition-colors hover:border-white/40 hover:bg-white/10"
            >
              İl Temsilcileri
            </Link>
          </Magnet>
        </div>
        <Stats />
      </section>

      <section className="relative overflow-hidden border-y border-white/10 bg-white/[0.03] py-6 backdrop-blur">
        <div aria-hidden className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050816] to-transparent z-10" />
        <div aria-hidden className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050816] to-transparent z-10" />
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
          {[...siteConfig.marquee, ...siteConfig.marquee].map((k, i) => (
            <span
              key={i}
              className="flex items-center gap-8 text-sm font-semibold uppercase tracking-widest text-zinc-200"
            >
              {k}
              <span className="text-gama-400">Γ</span>
            </span>
          ))}
        </div>
      </section>

      {sonEtkinlikler.length > 0 && (
        <section className="border-t border-white/10 bg-white/[0.02]">
          <div className="mx-auto w-full max-w-6xl px-4 py-20">
            <Reveal>
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gama-400">
                    Etkinlikler
                    <span className="h-px w-8 bg-gradient-to-r from-gama-400 to-transparent" />
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
                    Yaklaşan etkinlikler
                  </h2>
                </div>
                <Link
                  href="/etkinlikler"
                  transitionTypes={["nav-forward"]}
                  className="text-sm font-semibold text-gama-400 transition-colors hover:text-gama-300"
                >
                  Tüm etkinlikler →
                </Link>
              </div>
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
                      <span className="text-xs text-zinc-300">
                        {new Date(`${e.tarih}T12:00:00`).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "long",
                        })}
                      </span>
                    </div>
                    <h3 className="mt-3 font-semibold text-white">{e.baslik}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-200">{e.ozet}</p>
                    <p className="mt-3 text-xs font-medium text-zinc-400">
                      {e.saat} · {e.sehir}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto w-full max-w-6xl px-4 py-20">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gama-400">
                Duyurular
                <span className="h-px w-8 bg-gradient-to-r from-gama-400 to-transparent" />
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
                Son gelişmeler
              </h2>
            </div>
            <Link
              href="/duyurular"
              transitionTypes={["nav-forward"]}
              className="text-sm font-semibold text-gama-400 transition-colors hover:text-gama-300"
            >
              Tüm duyurular →
            </Link>
          </div>
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
                    <span className="text-xs text-zinc-300">{d.tarih}</span>
                  </div>
                  <h3 className="mt-3 font-semibold text-white">{d.baslik}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-200">{d.ozet}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-20">
        <Reveal>
          <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl">
            Sana ne sunuyoruz?
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-4 md:grid-rows-[repeat(2,minmax(0,1fr))]">
          {siteConfig.pillars.map((pillar, i) => (
            <Reveal
              key={pillar.title}
              delay={i * 120}
              className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}
            >
              <TiltCard className="h-full" spotlight={i === 0}>
                <div
                  className={`card-glass bento-cell group h-full rounded-2xl p-6 backdrop-blur ${
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
                    <p className="mt-2 text-sm leading-6 text-zinc-200">
                      {i === 0
                        ? `${pillar.description} Kaynak havuzu, proje dosyaları ve öğrenme materyalleri her üyeye açık.`
                        : pillar.description}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
          <Reveal delay={360}>
            <Link
              href="/iller"
              transitionTypes={["nav-forward"]}
              className="card-glass bento-cell group relative flex h-full items-center justify-between gap-4 overflow-hidden rounded-2xl p-6 backdrop-blur md:col-span-2"
            >
              <div
                aria-hidden
                className="light-sweep absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
              <div>
                <h3 className="text-lg font-semibold text-white">81 ilde temsilcilik ağı</h3>
                <p className="mt-1 text-sm leading-6 text-zinc-200">
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
          <div className="card-glass relative overflow-hidden rounded-3xl p-10 backdrop-blur md:p-14">
            <div className="absolute inset-0 animate-gradient-x bg-gradient-to-r from-gama-600/10 via-violet-600/10 to-cyan-500/10" />
            <div className="relative">
              <p className="text-center text-sm font-semibold uppercase tracking-widest text-gama-400">
                Gama Manifestosu
              </p>
              <h2 className="mt-3 text-center text-2xl font-bold tracking-tight md:text-3xl">
                Neden varız?
              </h2>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {siteConfig.manifesto.map((m, i) => (
                  <Reveal key={m.baslik} delay={i * 100}>
                    <TiltCard className="h-full" spotlight>
                      <div className="card-glass h-full rounded-2xl p-6 backdrop-blur">
                        <span className="text-gradient text-3xl font-extrabold">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="mt-3 text-base font-semibold text-white">{m.baslik}</h3>
                        <p className="mt-2 text-sm leading-6 text-zinc-200">{m.metin}</p>
                      </div>
                    </TiltCard>
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
              className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gama-600/20 blur-[90px]"
            />
            <div
              aria-hidden
              className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/15 blur-[90px]"
            />
            <div className="relative">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Vizyonu takip et
              </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-zinc-200">
              Atölyeler, duyurular ve projelerden ilk senin haberin olsun. Ayda
              bir özet — spam yok.
            </p>
            <SubmitForm
              subject="Bülten aboneliği"
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
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-gama-950 via-indigo-950 to-violet-950 p-10 text-center shadow-[0_0_80px_-20px_rgba(139,92,246,0.5)] md:p-16">
          <div className="absolute inset-0 animate-gradient-x bg-gradient-to-r from-gama-600/30 via-violet-600/30 to-cyan-500/30" />
          <div className="absolute inset-0 bg-grid opacity-60" />
          <div className="relative">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-4xl">
              Türkiye&apos;nin geleceğine imza at.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-zinc-100">
              Kaynak, takım ve mentorluk imkanları seni bekliyor. Bugün katıl,
              yarın Türkiye&apos;nin teknoloji sahnesinde sen ol.
            </p>
            <Link
              href="/katil"
              transitionTypes={["nav-forward"]}
              className="btn-shine mt-8 inline-block rounded-full bg-white px-8 py-3.5 font-semibold text-gama-950 transition-colors hover:bg-gama-100"
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
