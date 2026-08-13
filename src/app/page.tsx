import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { tumDuyurular } from "@/lib/duyurular";
import { Logo } from "@/components/Logo";
import { Stats } from "@/components/Stats";
import { SubmitForm } from "@/components/SubmitForm";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

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

  return (
    <PageTransition>
      <div className="flex flex-1 flex-col">
      <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-20 pt-24 text-center md:pt-32">
        <div className="animate-fade-up flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-zinc-200 backdrop-blur">
          <Logo className="h-5 w-5" />
          Türkiye&apos;nin gençlik araştırma-geliştirme birliği
        </div>
        <h1 className="animate-fade-up delay-100 mt-8 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
          Teknolojik ve bilimsel bağımsızlık için{" "}
          <span className="text-gradient">gençler</span>{" "}
          buluşuyor.
        </h1>
        <p className="animate-fade-up delay-200 mt-6 max-w-2xl text-lg leading-8 text-zinc-100">
          {siteConfig.mission}
        </p>
        <div className="animate-fade-up delay-300 mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/katil"
            transitionTypes={["nav-forward"]}
            className="rounded-full bg-gradient-to-r from-gama-600 via-violet-600 to-cyan-500 px-8 py-3.5 font-semibold text-white transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.7)]"
          >
            Bize Katıl
          </Link>
          <Link
            href="/iller"
            transitionTypes={["nav-forward"]}
            className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 font-semibold text-white backdrop-blur transition-colors hover:border-white/40 hover:bg-white/10"
          >
            İl Temsilcileri
          </Link>
        </div>
        <Stats />
      </section>

      <section className="relative overflow-hidden border-y border-white/10 bg-white/[0.03] py-6 backdrop-blur">
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

      <section className="mx-auto w-full max-w-6xl px-4 py-20">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-gama-400">
                Duyurular
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
                  className="block h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition-colors hover:border-gama-400/40 hover:bg-white/[0.06]"
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
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {siteConfig.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 120}>
              <TiltCard className="h-full">
                <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08]">
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${iconGradients[i]} text-white shadow-lg`}
                  >
                    {iconMap[i]}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-white">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-200">{pillar.description}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur md:p-14">
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
                    <TiltCard className="h-full">
                      <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-gama-400/40">
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
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur md:p-12">
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
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-gama-950 via-indigo-950 to-violet-950 p-10 text-center md:p-16">
          <div className="absolute inset-0 animate-gradient-x bg-gradient-to-r from-gama-600/30 via-violet-600/30 to-cyan-500/30" />
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
              className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 font-semibold text-gama-950 transition-colors hover:bg-gama-100"
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
