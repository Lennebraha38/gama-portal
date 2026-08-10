import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Logo } from "@/components/Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-3">
          <Logo className="h-9 w-9 drop-shadow-[0_0_12px_rgba(51,100,255,0.6)] transition-transform group-hover:scale-105" />
          <span className="text-xl font-bold tracking-tight">{siteConfig.name}</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-zinc-300 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/katil"
          className="rounded-full bg-gradient-to-r from-gama-600 via-violet-600 to-cyan-500 px-5 py-2 text-sm font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]"
        >
          Katıl
        </Link>
      </div>
    </header>
  );
}
