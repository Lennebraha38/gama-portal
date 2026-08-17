import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { bultenBul, bultenMarkdownHTML, tumBultenler } from "@/lib/bultenler";
import { siteConfig } from "@/lib/site";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const bultenler = tumBultenler();
  if (bultenler.length === 0) return [{ slug: "bos" }];
  return bultenler.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = bultenBul(slug);
  if (!b) return {};
  return {
    title: b.baslik,
    description: b.ozet,
    openGraph: {
      title: b.baslik,
      description: b.ozet,
      type: "article",
      publishedTime: `${b.tarih}T00:00:00Z`,
      url: `${siteConfig.siteUrl}/bultenler/${b.slug}`,
    },
  };
}

export default async function BultenDetayPage({ params }: Props) {
  const { slug } = await params;
  const b = bultenBul(slug);
  if (!b) notFound();

  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <nav className="text-sm text-zinc-400">
            <Link href="/bultenler" className="hover:text-gama-300">
              ← Bültenler
            </Link>
          </nav>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-gama-500/20 px-3 py-1 text-xs font-semibold text-gama-300">
              Bülten
            </span>
            <span className="text-sm text-zinc-300">{b.tarih}</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{b.baslik}</h1>
          <p className="mt-3 text-lg leading-7 text-zinc-300">{b.ozet}</p>
        </Reveal>

        <Reveal delay={100}>
          <article
            className="prose-invert mt-8"
            dangerouslySetInnerHTML={{ __html: bultenMarkdownHTML(b.icerik) }}
          />
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-12 rounded-2xl border border-gama-500/20 bg-gama-500/[0.06] p-6 backdrop-blur">
            <p className="font-semibold text-white">Bu bülteni beğendin mi?</p>
            <p className="mt-1 text-sm leading-6 text-zinc-300">
              Bir sonrakini kaçırmamak için{" "}
              <Link href="/bultenler" className="text-gama-300 underline-offset-4 hover:underline">
                bültene abone ol
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </PageTransition>
  );
}