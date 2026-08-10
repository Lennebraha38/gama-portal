import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-zinc-600 dark:text-zinc-400 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gama-600 font-mono text-sm font-bold text-white">
            Γ
          </span>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            {siteConfig.name}
          </span>
          <span>· {siteConfig.tagline}</span>
        </div>
        <p>© {new Date().getFullYear()} Gama Topluluğu</p>
      </div>
    </footer>
  );
}
