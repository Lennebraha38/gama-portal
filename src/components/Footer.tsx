import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { SocialIcon } from "@/components/SocialIcon";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-gama-500/20 bg-[#060b18]/85 backdrop-blur-xl">
      <div aria-hidden className="section-divider absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-8 w-8 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
            <div>
              <span className="font-semibold text-white">{siteConfig.name}</span>
              <span className="text-zinc-400"> · {siteConfig.tagline}</span>
            </div>
          </div>
          <p className="sys-label text-zinc-400">Araştırma &amp; Geliştirme Birliği</p>
        </div>
        <div aria-hidden className="section-divider mt-8" />
        <div className="mt-8 flex flex-col gap-8 text-sm text-zinc-300 md:flex-row md:items-start md:justify-between">
          <nav className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3" aria-label="Hızlı bağlantılar">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-zinc-300 transition-colors hover:text-gama-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3 md:items-end">
            <div className="flex items-center gap-2">
              {siteConfig.socials.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 transition-colors hover:border-gama-400/60 hover:text-gama-300"
                >
                  <SocialIcon id={s.id} className="h-4 w-4" />
                </a>
              ))}
            </div>
            <a
              href="mailto:gamaturkiye@gmail.com"
              className="text-gama-400 transition-colors hover:text-gama-300"
            >
              gamaturkiye@gmail.com
            </a>
            <p>© {new Date().getFullYear()} Gama Topluluğu</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
