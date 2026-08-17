import type { Metadata } from "next";
import { IlSkorTablosu } from "@/components/IlSkorTablosu";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import { PUAN_AGIRLIKLARI } from "@/lib/liderlik";

export const metadata: Metadata = {
  title: "İl Liderlik Tablosu",
  description:
    "Gama'nın 81 ilindeki temsilciliklerin üye, etkinlik, proje ve mentorluk skorlarına göre hazırlanan liderlik tablosu.",
};

const gostergeler = [
  {
    ad: "Üye",
    puan: `${PUAN_AGIRLIKLARI.uye} puan / üye`,
    aciklama: "İl temsilciliğine yeni katılan her üye için.",
  },
  {
    ad: "Etkinlik",
    puan: `${PUAN_AGIRLIKLARI.etkinlik} puan / etkinlik`,
    aciklama: "İlde düzenlenen her atölye, buluşma veya sunum için.",
  },
  {
    ad: "Proje",
    puan: `${PUAN_AGIRLIKLARI.proje} puan / proje`,
    aciklama: "Vitrinde yayınlanan her üye projesi için.",
  },
  {
    ad: "Mentorluk",
    puan: `${PUAN_AGIRLIKLARI.mentor} puan / mentor`,
    aciklama: "İlde aktif olarak eşleşen her mentor-mentee çifti için.",
  },
];

export default function LiderlikPage() {
  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <p className="sys-label">
            Sistem 02 <span className="text-zinc-400">/</span> Gama
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            İl Liderlik Tablosu
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-300">
            81 il temsilciliğinin her dönem topladığı üye, etkinlik, proje ve
            mentorluk skorları burada sıralanır. Sıralama dönem sonunda yeniden
            hesaplanır; her ilin şampiyon olma şansı eşittir.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {gostergeler.map((g) => (
              <div
                key={g.ad}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-white">{g.ad}</p>
                  <p className="font-mono text-sm text-gama-300">{g.puan}</p>
                </div>
                <p className="mt-1.5 text-sm leading-6 text-zinc-300">{g.aciklama}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <IlSkorTablosu />
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-12 rounded-3xl border border-gama-500/20 bg-gama-500/[0.06] p-8 text-center backdrop-blur">
            <h2 className="text-xl font-bold text-white">İlinin zirveye çıkması seninle başlar</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-200">
              İl temsilciliğinde üye olarak katıl, bir etkinlik düzenle ya da
              projeni vitrine taşı — ilinin skoru anında yükselsin.
            </p>
            <a
              href="/temsilci"
              className="mt-6 inline-block rounded-full bg-gradient-to-r from-gama-500 to-gama-400 px-7 py-3 font-semibold text-white transition-all hover:shadow-[0_0_24px_rgba(96,165,250,0.55)]"
            >
              İl Temsilcisi Ol
            </a>
          </div>
        </Reveal>
      </div>
    </PageTransition>
  );
}