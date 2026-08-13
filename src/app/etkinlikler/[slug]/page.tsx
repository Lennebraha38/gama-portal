import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import { etkinlikBul, etkinlikDetayi, etkinlikMarkdownHTML, tumEtkinlikler } from "@/lib/etkinlikler";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tumEtkinlikler().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const e = etkinlikBul(slug);
  if (!e) return {};
  const detay = etkinlikDetayi(e);
  return {
    title: e.baslik,
    description: e.ozet,
    openGraph: {
      title: e.baslik,
      description: e.ozet,
      type: "article",
      publishedTime: detay.baslangicISO,
      url: `${siteConfig.siteUrl}/etkinlikler/${e.slug}`,
    },
  };
}

export default async function EtkinlikDetayPage({ params }: Props) {
  const { slug } = await params;
  const e = etkinlikBul(slug);
  if (!e) notFound();
  const detay = etkinlikDetayi(e);
  const tarihMetni = new Date(`${e.tarih}T12:00:00`).toLocaleDateString("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.baslik,
    description: e.ozet,
    startDate: detay.baslangicISO,
    endDate: detay.bitisISO,
    eventAttendanceMode: e.sehir === "Çevrimiçi" ? "https://schema.org/OnlineEventAttendanceMode" : "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: e.sehir === "Çevrimiçi"
      ? { "@type": "VirtualLocation", url: e.kayit || siteConfig.siteUrl }
      : { "@type": "Place", name: e.yer, address: { "@type": "PostalAddress", addressLocality: e.sehir, addressCountry: "TR" } },
    organizer: { "@type": "Organization", name: siteConfig.name, url: siteConfig.siteUrl },
    url: `${siteConfig.siteUrl}/etkinlikler/${e.slug}`,
  };

  return (
    <PageTransition>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <nav className="text-sm text-zinc-400">
            <Link href="/etkinlikler" className="hover:text-gama-300">
              ← Etkinlikler
            </Link>
          </nav>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-gama-500/20 px-3 py-1 text-xs font-semibold text-gama-300">
              {e.tur}
            </span>
            {detay.sonaErdi ? (
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-zinc-300">
                Sonlandı
              </span>
            ) : (
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300">
                Yaklaşıyor
              </span>
            )}
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{e.baslik}</h1>

          <div className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm backdrop-blur sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Tarih</p>
              <p className="mt-1 font-medium text-white">{tarihMetni}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Saat</p>
              <p className="mt-1 font-medium text-white">
                {e.saat} – {new Date(detay.bitisISO).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Yer</p>
              <p className="mt-1 font-medium text-white">
                {e.sehir}
                {e.yer && <span className="text-zinc-300"> · {e.yer}</span>}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Kayıt</p>
              {e.kayit ? (
                <a
                  href={e.kayit}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block rounded-full bg-gradient-to-r from-gama-600 to-gama-500 px-5 py-2 text-xs font-semibold text-white transition-all hover:shadow-[0_0_16px_rgba(96,165,250,0.5)]"
                >
                  Kayıt Ol
                </a>
              ) : (
                <p className="mt-1 font-medium text-zinc-300">Gerekmez / Açıklanacak</p>
              )}
            </div>
          </div>

          <div className="mt-4 flex gap-4">
            <a
              href={`/etkinlikler/${e.slug}.ics`}
              className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10"
            >
              Takvime Ekle (ICS)
            </a>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <article
            className="prose-invert mt-10"
            dangerouslySetInnerHTML={{ __html: etkinlikMarkdownHTML(e.icerik) }}
          />
        </Reveal>
      </div>
    </PageTransition>
  );
}
