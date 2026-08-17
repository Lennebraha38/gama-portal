import type { Metadata } from "next";
import Link from "next/link";
import { tumBultenler } from "@/lib/bultenler";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import { SubmitForm } from "@/components/SubmitForm";

export const metadata: Metadata = {
  title: "Bültenler",
  description:
    "Gama Topluluğu'nun e-posta bülteni arşivi: etkinlikler, projeler ve topluluk gelişmeleri tek akışta.",
};

export default function BultenlerPage() {
  const bultenler = tumBultenler();

  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <p className="sys-label">
            Sistem 01 <span className="text-zinc-400">/</span> Gama
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Bültenler</h1>
          <p className="mt-3 max-w-2xl text-zinc-300">
            Topluluk gelişmelerinin e-posta arşivi. Her ayın özeti: yeni
            etkinlikler, vitrine eklenen projeler ve il temsilcilerinden notlar.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 rounded-2xl border border-gama-500/20 bg-gama-500/[0.06] p-6 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-widest text-gama-300">
              Bültene Abone Ol
            </p>
            <p className="mt-1.5 text-sm leading-6 text-zinc-300">
              Yeni bülten çıktığında gelen kutuna düşsün. İstediğin an tek
              tıkla ayrılabilirsin.
            </p>
            <SubmitForm
              subject="Bülten aboneliği"
              tur="bulten"
              buttonText="Abone Ol"
              successTitle="Abone oldun!"
              successText="Bülten çıktığında gelen kutunda olacak."
              fields={[
                {
                  name: "eposta",
                  label: "E-posta",
                  type: "email",
                  required: true,
                  placeholder: "ornek@eposta.com",
                },
                {
                  name: "ad",
                  label: "Ad (isteğe bağlı)",
                  type: "text",
                  placeholder: "Adın",
                },
              ]}
            />
          </div>
        </Reveal>

        {bultenler.length === 0 ? (
          <Reveal delay={100} className="flex flex-1 flex-col">
            <div className="mt-12 flex flex-1 flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/[0.03] p-16 text-center backdrop-blur">
              <p className="text-sm text-zinc-300">
                Henüz yayınlanmış bülten yok. İlk bülten çıktığında burada görünecek.
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="mt-10 grid gap-5">
            {bultenler.map((b, i) => (
              <Reveal key={b.slug} delay={i * 60}>
                <Link
                  href={`/bultenler/${b.slug}`}
                  transitionTypes={["nav-forward"]}
                  className="card-glass block rounded-2xl p-6 backdrop-blur"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-gama-500/20 px-3 py-1 text-xs font-semibold text-gama-300">
                      Bülten
                    </span>
                    <span className="text-sm text-zinc-300">{b.tarih}</span>
                  </div>
                  <h2 className="mt-3 text-lg font-bold text-white">{b.baslik}</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-200">{b.ozet}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}