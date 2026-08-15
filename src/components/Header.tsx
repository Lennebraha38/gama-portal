"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { SiteArama } from "@/components/SiteArama";

export function Header() {
  const [acik, setAcik] = useState(false);
  const pathname = usePathname();
  const aktif = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className="sticky top-0 z-50 border-b border-gama-500/20 bg-[#060b18]/85 backdrop-blur-xl"
      style={{ viewTransitionName: "site-header" }}
    >
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gama-400/60 to-transparent" />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6 lg:px-8">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3"
          onClick={() => setAcik(false)}
          transitionTypes={["nav-back"]}
        >
          <Logo className="h-9 w-9 drop-shadow-[0_0_12px_rgba(96,165,250,0.5)] transition-transform group-hover:scale-105" />
          <span className="text-xl font-bold tracking-tight text-white">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center justify-center gap-8 text-sm font-medium tracking-wide lg:flex" aria-label="Ana menü">
          {siteConfig.nav.map((item) => {
            const aktifMi =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={aktifMi ? "page" : undefined}
                transitionTypes={item.href === "/" ? ["nav-back"] : ["nav-forward"]}
                className={`nav-link ${
                  aktifMi
                    ? "text-gama-300 [text-shadow:0_0_16px_rgba(96,165,250,0.5)]"
                    : "text-zinc-200 transition-colors hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/katil"
            transitionTypes={["nav-forward"]}
            className="hidden rounded-full bg-gradient-to-r from-gama-500 to-gama-400 px-5 py-2 text-sm font-semibold text-white shadow-[0_0_18px_rgba(96,165,250,0.4)] transition-all hover:shadow-[0_0_28px_rgba(96,165,250,0.65)] sm:block"
          >
            Katıl
          </Link>
          <button
            type="button"
            onClick={() => setAcik((v) => !v)}
            className="rounded-lg border border-white/15 bg-white/5 p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label={acik ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={acik}
            aria-controls="mobil-menu"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-5 w-5"
            >
              {acik ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobil-menu"
        className={`grid transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          acik ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav className="border-t border-white/10 bg-[#060b18]/95 px-4 py-4 backdrop-blur-xl">
            <div className="mb-3 lg:hidden">
              <SiteArama />
            </div>
            <div className="flex flex-col gap-1">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setAcik(false)}
                  aria-current={aktif(item.href) ? "page" : undefined}
                  transitionTypes={item.href === "/" ? ["nav-back"] : ["nav-forward"]}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-white/10 ${
                    aktif(item.href) ? "bg-gama-500/10 text-gama-300" : "text-zinc-200"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/katil"
                onClick={() => setAcik(false)}
                transitionTypes={["nav-forward"]}
                className="mt-2 rounded-full bg-gradient-to-r from-gama-500 to-gama-400 px-5 py-2.5 text-center text-sm font-semibold text-white"
              >
                Katıl
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
