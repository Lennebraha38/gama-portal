import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { tumDuyurular, duyuruBul, markdownHTML } from "@/lib/duyurular";
import { siteConfig } from "@/lib/site";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return tumDuyurular().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const duyuru = duyuruBul(slug);
  if (!duyuru) return { title: "Duyuru bulunamadı" };
  return {
    title: duyuru.baslik,
    description: duyuru.ozet,
    openGraph: {
      title: duyuru.baslik,
      description: duyuru.ozet,
      type: "article",
      publishedTime: duyuru.tarih,
      url: `${siteConfig.siteUrl}/duyurular/${duyuru.slug}`,
    },
  };
}

export default async function DuyuruSayfasi({ params }: Props) {
  const { slug } = await params;
  const duyuru = duyuruBul(slug);
  if (!duyuru) notFound();

  return (
    <PageTransition>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: duyuru.baslik,
            description: duyuru.ozet,
            datePublished: duyuru.tarih,
            dateModified: duyuru.tarih,
            inLanguage: "tr-TR",
            url: `${siteConfig.siteUrl}/duyurular/${duyuru.slug}`,
            publisher: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.siteUrl,
              logo: `${siteConfig.siteUrl}/icon.png`,
            },
          }),
        }}
      />
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <Link
            href="/duyurular"
            transitionTypes={["nav-back"]}
            className="text-sm text-gama-400 transition-colors hover:text-gama-300"
          >
            ← Tüm duyurular
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-gama-500/20 px-3 py-1 text-xs font-semibold text-gama-300">
              {duyuru.tur}
            </span>
            <span className="text-sm text-zinc-300">{duyuru.tarih}</span>
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            {duyuru.baslik}
          </h1>
        </Reveal>

        <Reveal delay={100}>
          <article
            className="prose-sm mt-8 max-w-none [&_a]:underline [&_strong]:text-white"
            dangerouslySetInnerHTML={{ __html: markdownHTML(duyuru.icerik) }}
          />
        </Reveal>
      </div>
    </PageTransition>
  );
}
