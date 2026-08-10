import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gama-600 font-mono text-lg font-bold text-white">
            Γ
          </span>
          <span className="text-xl font-bold tracking-tight">{siteConfig.name}</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-zinc-600 transition-colors hover:text-gama-600 dark:text-zinc-300 dark:hover:text-gama-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/katil"
          className="rounded-full bg-gama-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-gama-700"
        >
          Katıl
        </Link>
      </div>
    </header>
  );
}
