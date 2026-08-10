import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Logo } from "@/components/Logo";

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
  return (
    <div className="flex flex-1 flex-col">
      <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-20 pt-24 text-center md:pt-32">
        <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-zinc-200 backdrop-blur">
          <Logo className="h-5 w-5" />
          Türkiye&apos;nin gençlik araştırma-geliştirme birliği
        </div>
        <h1 className="mt-8 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
          Teknolojik ve bilimsel bağımsızlık için{" "}
          <span className="text-gradient animate-gradient-x">gençler</span>{" "}
          buluşuyor.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
          {siteConfig.mission}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/katil"
            className="rounded-full bg-gradient-to-r from-gama-600 via-violet-600 to-cyan-500 px-8 py-3.5 font-semibold text-white transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.7)]"
          >
            Bize Katıl
          </Link>
          <Link
            href="/iller"
            className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 font-semibold text-white backdrop-blur transition-colors hover:border-white/40 hover:bg-white/10"
          >
            İl Temsilcileri
          </Link>
        </div>
        <div className="mt-16 grid w-full max-w-3xl grid-cols-3 gap-4">
          {[
            { deger: "81", etiket: "İl Temsilcisi" },
            { deger: "7", etiket: "Bölge" },
            { deger: "7/24", etiket: "Aktif" },
          ].map((s) => (
            <div
              key={s.etiket}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 backdrop-blur"
            >
              <p className="text-2xl font-extrabold text-white md:text-3xl">{s.deger}</p>
              <p className="mt-1 text-xs font-medium text-zinc-400 md:text-sm">{s.etiket}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/10 bg-white/[0.03] py-6 backdrop-blur">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
          {[...siteConfig.marquee, ...siteConfig.marquee].map((k, i) => (
            <span
              key={i}
              className="flex items-center gap-8 text-sm font-semibold uppercase tracking-widest text-zinc-400"
            >
              {k}
              <span className="text-gama-400">Γ</span>
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-20">
        <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl">
          Sana ne sunuyoruz?
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {siteConfig.pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.08]"
            >
              <span
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${iconGradients[i]} text-white shadow-lg`}
              >
                {iconMap[i]}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-gama-950 via-indigo-950 to-violet-950 p-10 text-center md:p-16">
          <div className="absolute inset-0 animate-gradient-x bg-gradient-to-r from-gama-600/30 via-violet-600/30 to-cyan-500/30" />
          <div className="relative">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-4xl">
              Türkiye&apos;nin geleceğine imza at.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-zinc-300">
              Kaynak, takım ve mentorluk imkanları seni bekliyor. Bugün katıl,
              yarın Türkiye&apos;nin teknoloji sahnesinde sen ol.
            </p>
            <Link
              href="/katil"
              className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 font-semibold text-gama-950 transition-colors hover:bg-gama-100"
            >
              Bize Katıl
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
