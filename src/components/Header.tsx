"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Logo } from "@/components/Logo";

export function Header() {
  const [acik, setAcik] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setAcik(false)}>
          <Logo className="h-9 w-9 drop-shadow-[0_0_12px_rgba(51,100,255,0.6)] transition-transform group-hover:scale-105" />
          <span className="text-xl font-bold tracking-tight">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-zinc-100 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/katil"
            className="hidden rounded-full bg-gradient-to-r from-gama-600 via-violet-600 to-cyan-500 px-5 py-2 text-sm font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] sm:block"
          >
            Katıl
          </Link>
          <button
            type="button"
            onClick={() => setAcik((v) => !v)}
            className="rounded-lg border border-white/15 bg-white/5 p-2 text-white transition-colors hover:bg-white/10 md:hidden"
            aria-label="Menüyü aç/kapat"
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

      {acik && (
        <nav className="border-t border-white/10 bg-[#050816]/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setAcik(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/katil"
              onClick={() => setAcik(false)}
              className="mt-2 rounded-full bg-gradient-to-r from-gama-600 via-violet-600 to-cyan-500 px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              Katıl
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
