import { siteConfig } from "@/lib/site";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#050816]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-zinc-300 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Logo className="h-7 w-7" />
          <span className="font-semibold text-zinc-100">{siteConfig.name}</span>
          <span>· {siteConfig.tagline}</span>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <a
            href="mailto:gamaturkiye@gmail.com"
            className="text-gama-400 transition-colors hover:text-gama-300"
          >
            gamaturkiye@gmail.com
          </a>
          <p>© {new Date().getFullYear()} Gama Topluluğu</p>
        </div>
      </div>
    </footer>
  );
}
