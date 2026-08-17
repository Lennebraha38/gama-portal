import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { amaBul, amaMarkdownHTML, tumAmalar } from "@/lib/amalar";
import { siteConfig } from "@/lib/site";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const amalar = tumAmalar();
  if (amalar.length === 0) return [{ slug: "bos" }];
  return amalar.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = amaBul(slug);
  if (!a) return {};
  return {
    title: a.konuk,
    description: a.ozet,
    openGraph: {
      title: a.konuk,
      description: a.ozet,
      type: "article",
      publishedTime: `${a.tarih}T00:00:00Z`,
      url: `${siteConfig.siteUrl}/ama/${a.slug}`,
    },
  };
}

export default async function AmaDetayPage({ params }: Props) {
  const { slug } = await params;
  const a = amaBul(slug);
  if (!a) notFound();

  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <nav className="text-sm text-zinc-400">
            <Link href="/ama" className="hover:text-gama-300">
              ← AMA Arşivi
            </Link>
          </nav>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-gama-500/20 px-3 py-1 text-xs font-semibold text-gama-300">
              AMA
            </span>
            {a.alan && (
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-zinc-300">
                {a.alan}
              </span>
            )}
            <span className="text-sm text-zinc-300">{a.tarih}</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{a.konuk}</h1>
          <p className="mt-3 text-lg leading-7 text-zinc-300">{a.ozet}</p>
        </Reveal>

        <Reveal delay={100}>
          <article
            className="prose-invert mt-8"
            dangerouslySetInnerHTML={{ __html: amaMarkdownHTML(a.icerik) }}
          />
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-12 rounded-2xl border border-gama-500/20 bg-gama-500/[0.06] p-6 backdrop-blur">
            <p className="font-semibold text-white">Bir sonraki AMA&apos;ya katıl</p>
            <p className="mt-1 text-sm leading-6 text-zinc-300">
              Konuk önerilerin ve soruların için{" "}
              <Link href="/iletisim" className="text-gama-300 underline-offset-4 hover:underline">
                bize yaz
              </Link>
              . Yeni buluşmalar{" "}
              <Link href="/duyurular" className="text-gama-300 underline-offset-4 hover:underline">
                duyurulardan
              </Link>{" "}
              paylaşılır.
            </p>
          </div>
        </Reveal>
      </div>
    </PageTransition>
  );
}