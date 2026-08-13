import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import { projeBul, projeMarkdownHTML, tumProjeler } from "@/lib/projeler";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tumProjeler().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projeBul(slug);
  if (!p) return {};
  return {
    title: p.baslik,
    description: p.ozet,
    openGraph: {
      title: p.baslik,
      description: p.ozet,
      type: "article",
      url: `${siteConfig.siteUrl}/projeler/${p.slug}`,
    },
  };
}

export default async function ProjeDetayPage({ params }: Props) {
  const { slug } = await params;
  const p = projeBul(slug);
  if (!p) notFound();

  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <nav className="text-sm text-zinc-400">
            <Link href="/projeler" className="hover:text-gama-300">
              ← Projeler
            </Link>
          </nav>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                p.durum === "Aktif"
                  ? "bg-gama-500/20 text-gama-300"
                  : p.durum === "Başvuruya Açık"
                    ? "bg-amber-500/20 text-amber-300"
                    : "bg-white/10 text-zinc-300"
              }`}
            >
              {p.durum}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-zinc-300">
              {p.kapsam}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{p.baslik}</h1>

          <div className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm backdrop-blur sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Takım</p>
              <p className="mt-1 font-medium text-white">{p.takim}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Lokasyon</p>
              <p className="mt-1 font-medium text-white">{p.sehir}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Proje Sitesi</p>
              {p.site ? (
                <a
                  href={p.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block font-medium text-gama-300 underline-offset-4 hover:underline"
                >
                  Aç ↗
                </a>
              ) : (
                <p className="mt-1 font-medium text-zinc-300">Açıklanacak</p>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <article
            className="prose-invert mt-10"
            dangerouslySetInnerHTML={{ __html: projeMarkdownHTML(p.icerik) }}
          />
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur">
            <p className="font-semibold text-white">Bu projede yer almak ister misin?</p>
            <Link
              href="/katil"
              transitionTypes={["nav-forward"]}
              className="mt-4 inline-block rounded-full bg-gradient-to-r from-gama-500 to-gama-400 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-[0_0_24px_rgba(96,165,250,0.55)]"
            >
              Başvur
            </Link>
          </div>
        </Reveal>
      </div>
    </PageTransition>
  );
}
