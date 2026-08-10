import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-gama-50 to-white dark:border-zinc-800 dark:from-gama-950 dark:to-zinc-950">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 py-24 md:py-32">
          <p className="rounded-full border border-gama-200 bg-gama-50 px-4 py-1.5 text-sm font-medium text-gama-700 dark:border-gama-800 dark:bg-gama-950 dark:text-gama-300">
            Türkiye&apos;nin gençlik araştırma-geliştirme birliği
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Teknolojik ve bilimsel bağımsızlık için{" "}
            <span className="text-gama-600 dark:text-gama-400">gençler</span>{" "}
            buluşuyor.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {siteConfig.mission}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/katil"
              className="rounded-full bg-gama-600 px-7 py-3 font-semibold text-white transition-colors hover:bg-gama-700"
            >
              Bize Katıl
            </Link>
            <Link
              href="/projeler"
              className="rounded-full border border-zinc-300 px-7 py-3 font-semibold text-zinc-900 transition-colors hover:border-gama-600 hover:text-gama-600 dark:border-zinc-700 dark:text-zinc-100"
            >
              Projeleri Gör
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          Sana ne sunuyoruz?
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {siteConfig.pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h3 className="text-lg font-semibold text-gama-600 dark:text-gama-400">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-gama-950 dark:bg-gama-900">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Türkiye&apos;nin geleceğine imza at.
          </h2>
          <Link
            href="/katil"
            className="rounded-full bg-white px-7 py-3 font-semibold text-gama-950 transition-colors hover:bg-gama-100"
          >
            Bize Katıl
          </Link>
        </div>
      </section>
    </div>
  );
}
