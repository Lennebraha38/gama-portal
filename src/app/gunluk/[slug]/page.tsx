import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import { gunlukMarkdownHTML, tumYazilar, yaziBul } from "@/lib/gunluk";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tumYazilar().map((y) => ({ slug: y.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const y = yaziBul(slug);
  if (!y) return {};
  return {
    title: y.baslik,
    description: y.ozet,
    openGraph: {
      title: y.baslik,
      description: y.ozet,
      type: "article",
      publishedTime: new Date(`${y.tarih}T00:00:00Z`).toISOString(),
      url: `${siteConfig.siteUrl}/gunluk/${y.slug}`,
    },
  };
}

export default async function YaziDetayPage({ params }: Props) {
  const { slug } = await params;
  const y = yaziBul(slug);
  if (!y) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: y.baslik,
    description: y.ozet,
    datePublished: new Date(`${y.tarih}T00:00:00Z`).toISOString(),
    author: { "@type": "Organization", name: y.yazar, url: siteConfig.siteUrl },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.siteUrl },
    url: `${siteConfig.siteUrl}/gunluk/${y.slug}`,
    inLanguage: "tr-TR",
  };

  return (
    <PageTransition>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <nav className="text-sm text-zinc-400">
            <Link href="/gunluk" className="hover:text-gama-300">
              ← Bilim Günlüğü
            </Link>
          </nav>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
            <time dateTime={y.tarih}>
              {new Date(`${y.tarih}T12:00:00`).toLocaleDateString("tr-TR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{y.yazar}</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{y.baslik}</h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {y.etiketler.map((etiket) => (
              <span
                key={etiket}
                className="rounded-full bg-gama-500/15 px-3 py-1 text-xs font-semibold text-gama-300"
              >
                #{etiket}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <article
            className="prose-invert mt-10"
            dangerouslySetInnerHTML={{ __html: gunlukMarkdownHTML(y.icerik) }}
          />
        </Reveal>
      </div>
    </PageTransition>
  );
}
