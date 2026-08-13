import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import { ilBul, tumIller } from "@/lib/provinces";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tumIller.map((il) => ({ slug: ilBul(il)!.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const il = ilBul(slug);
  if (!il) return {};
  return {
    title: `${il.ad} İl Temsilcisi`,
    description: `Gama Topluluğu ${il.ad} il temsilcisi${il.atandi ? `: ${il.temsilci}` : ""}. ${il.ad} (${
      il.bolge
    } bölgesi) koordinatörü ve temsilcilik başvurusu hakkında bilgi al.`,
    openGraph: {
      title: `${il.ad} İl Temsilcisi · ${siteConfig.name}`,
      description: `Gama Topluluğu ${il.ad} il temsilcisi${il.atandi ? `: ${il.temsilci}` : " başvuruları açık"}.`,
      type: "website",
      url: `${siteConfig.siteUrl}/iller/${slug}`,
      images: ["/og.png"],
    },
  };
}

export default async function IlDetayPage({ params }: Props) {
  const { slug } = await params;
  const il = ilBul(slug);
  if (!il) notFound();

  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <nav className="text-sm text-zinc-400">
            <Link href="/iller" className="hover:text-gama-300">
              ← İl Temsilcileri
            </Link>
          </nav>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight md:text-4xl">
            {il.ad} İl Temsilciliği
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-200">
            Gama Topluluğu&apos;nun {il.ad} koordinasyonu hakkında bilgi ve başvuru
            detayları.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="card-glass mt-10 rounded-3xl p-8 backdrop-blur">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Bölge
                </p>
                <p className="mt-1 text-lg font-bold text-white">{il.bolge}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Temsilci
                </p>
                {il.atandi ? (
                  <p className="mt-1 text-lg font-bold text-white">{il.temsilci}</p>
                ) : (
                  <p className="mt-1 text-lg font-bold text-gama-300">Atanmadı</p>
                )}
              </div>
            </div>

            {il.atandi ? (
              <p className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm leading-6 text-emerald-100">
                {il.ad} ilinin temsilcisi <strong>{il.temsilci}</strong>. Etkinlikler ve
                projeler hakkında görüşmek için topluluk ile iletişime geçebilirsin.
              </p>
            ) : (
              <p className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm leading-6 text-zinc-200">
                {il.ad} için henüz temsilci atanmadı. Senin şehrinde Gama&apos;yı kurmak
                istersen başvuru sürecini başlat.
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-4">
              {!il.atandi && (
                <Link
                  href={`/temsilci?il=${encodeURIComponent(il.ad)}`}
                  className="rounded-full bg-gradient-to-r from-gama-600 to-cyan-500 px-7 py-3 text-sm font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                >
                  Temsilci Adayı Ol
                </Link>
              )}
              <Link
                href="/katil"
                className="rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-white/40 hover:bg-white/10"
              >
                Topluluğa Katıl
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10">
            <h2 className="text-lg font-bold text-white">Diğer iller</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {tumIller.map((ad) => (
                <Link
                  key={ad}
                  href={`/iller/${ilBul(ad)!.slug}`}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                    ad === il.ad
                      ? "border-gama-400 bg-gama-500/20 font-semibold text-gama-200"
                      : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {ad}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </PageTransition>
  );
}