import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { mentors } from "@/lib/mentors";
import { Logo } from "@/components/Logo";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Gama; Türkiye'nin teknolojik ve bilimsel bağımsızlığı için gençleri kaynak, takım ve mentorlukla buluşturan araştırma-geliştirme birliği.",
};

export default function HakkimizdaPage() {
  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <p className="sys-label">
            Sistem 01 <span className="text-zinc-400">/</span> Gama
          </p>
          <div className="mt-4 flex items-center gap-4">
            <Logo className="h-12 w-12 drop-shadow-[0_0_16px_rgba(96,165,250,0.6)]" />
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Hakkımızda
            </h1>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-8 text-lg leading-8 text-zinc-200">{siteConfig.mission}</p>
          <p className="mt-4 text-lg leading-8 text-zinc-200">
            Kaynak, takım ve mentorluk imkanlarıyla gençlerimizi buluşturuyor, onları
            en etkin gençlik araştırma-geliştirme birliği olma yolunda bir araya
            getiriyoruz. Coğrafi sınırları ortadan kaldırarak her gencimizin
            yenilikçi fikirlerini hayata geçirmesine destek olmayı hedefliyoruz.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-8 rounded-2xl border border-gama-500/20 bg-gama-500/[0.06] px-5 py-4 font-mono text-sm text-zinc-300 backdrop-blur">
            &gt; Detaylı vizyon, misyon ve kurumsal bilgiler yakında eklenecek.
          </p>
        </Reveal>

      <Reveal delay={120}>
        <div className="mt-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="sys-label">
              Sistem 02 <span className="text-zinc-400">/</span> Gama
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Mentor Kadromuz</h2>
          </div>
        </div>
        <p className="mt-2 text-sm leading-6 text-zinc-200">
          Alanında uzman mentorlarla gençlerimizi birebir buluşturuyoruz.
        </p>
        <div aria-hidden className="section-line mt-5" />

        {mentors.length === 0 ? (
          <div className="mt-8 flex flex-col items-center rounded-3xl border border-dashed border-white/20 bg-white/[0.03] p-12 text-center backdrop-blur">
            <Logo className="h-12 w-12 animate-pulse" />
            <h3 className="mt-5 text-lg font-bold text-white">
              Mentor kadrosu oluşturuluyor
            </h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-zinc-200">
              Yapay zekâ, siber güvenlik, uzay ve biyoteknoloji alanlarında
              mentorlarımız ekibe katılıyor. İlk vitrin yakında burada.
            </p>
            <Link
              href="/temsilci"
              transitionTypes={["nav-forward"]}
              className="mt-7 rounded-full bg-gradient-to-r from-gama-500 to-gama-400 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-[0_0_24px_rgba(96,165,250,0.55)]"
            >
              Mentor Olmak İstiyorum
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {mentors.map((m) => (
              <div
                key={m.ad}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur"
              >
                <h3 className="text-lg font-bold text-white">{m.ad}</h3>
                <p className="mt-1 text-sm font-semibold text-gama-400">{m.unvan}</p>
                <p className="mt-3 text-sm leading-6 text-zinc-200">{m.odak}</p>
                <span className="mt-4 inline-block rounded-full bg-gama-500/20 px-3 py-1 text-xs font-semibold text-gama-300">
                  {m.alan}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      </Reveal>
      </div>
    </PageTransition>
  );
}
