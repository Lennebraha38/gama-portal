import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { SocialIcon } from "@/components/SocialIcon";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Gama Topluluğu ile iletişime geç. Soru, fikir ve iş birliği tekliflerin için bize ulaş.",
};

export default function IletisimPage() {
  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <p className="sys-label">
            Sistem 01 <span className="text-zinc-400">/</span> Gama
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            İletişim
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-300">
            Soruların, fikirlerin veya iş birliği tekliflerin için bize ulaş.
          </p>
        </Reveal>

      <Reveal delay={100}>
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur md:p-12">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gama-500 to-cyan-400 text-white shadow-lg">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </span>
        <h2 className="mt-5 text-lg font-semibold text-white">E-posta</h2>
        <a
          href="mailto:gamaturkiye@gmail.com"
          className="mt-2 inline-block text-xl font-bold text-gama-400 transition-colors hover:text-gama-300 md:text-2xl"
        >
          gamaturkiye@gmail.com
        </a>
        <p className="mt-4 text-sm text-zinc-300">
          En geç 48 saat içinde sana dönüş yapıyoruz.
        </p>
      </div>
      </Reveal>

      <Reveal delay={150}>
        <div className="card-glass mt-6 rounded-3xl p-8 text-center backdrop-blur">
        <h2 className="text-lg font-semibold text-white">Sosyal Medya</h2>
        <p className="mt-1 text-sm text-zinc-300">
          Gelişmeleri ve duyuruları takip etmek için bizi takip et.
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          {siteConfig.socials.map((s) => (
            <a
              key={s.id}
              href={s.href}
              aria-label={s.label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-200 transition-colors hover:border-gama-400/50 hover:text-white"
            >
              <SocialIcon id={s.id} className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
      </Reveal>
      </div>
    </PageTransition>
  );
}
