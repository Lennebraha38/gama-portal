import type { Metadata } from "next";
import { SubmitForm } from "@/components/SubmitForm";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import { tumIller } from "@/lib/provinces";

export const metadata: Metadata = {
  title: "Bize Katıl",
  description:
    "Gama'ya katıl ve ilk 7 günlük yolculuğuna başla: il temsilcinle tanış, ilk projene adım at, mentorluğa başvur.",
};

const roller = [
  "Üye",
  "Proje Geliştirici (Yazılım)",
  "Proje Geliştirici (Donanım)",
  "İl Temsilcisi Adayı",
  "Mentor",
];

const yolculuk = [
  {
    gun: "Gün 1",
    baslik: "Başvurunu tamamla",
    aciklama:
      "Formu doldur ve onay e-postasını bekle. Başvurunun alındığına dair teyit aynı gün gelir.",
  },
  {
    gun: "Gün 2",
    baslik: "İl temsilcinle tanış",
    aciklama:
      "İl temsilcin seninle iletişime geçer; ilindeki çalışmaları, toplantı günlerini ve projeleri öğrenirsin.",
  },
  {
    gun: "Gün 3",
    baslik: "Bir etkinliğe katıl",
    aciklama:
      "İlindeki ya da çevrimiçi ilk etkinliğe katıl. Tanımadığın bir üyeyle selamlaş — topluluk böyle büyür.",
  },
  {
    gun: "Gün 4",
    baslik: "İlk fikrini yaz",
    aciklama:
      "Yapmak istediğin projenin fikrini üç cümleyle yaz. Fikir ne kadar küçük görünürse görünsün, kayda değer.",
  },
  {
    gun: "Gün 5",
    baslik: "Projeni vitrine öner",
    aciklama:
      "Projeler sayfasındaki formla fikrini Gama vitrinine aday göster. Ekibimiz seni yönlendirir.",
  },
  {
    gun: "Gün 6",
    baslik: "Mentorluk için başvur",
    aciklama:
      "Mentorluk programına başvur; kohort döneminde alanında deneyimli bir mentorla eşleştirilirsin.",
  },
  {
    gun: "Gün 7",
    baslik: "Birine yol göster",
    aciklama:
      "Öğrendiğin bir şeyi yeni katılan bir üyeyle paylaş. Gama'da bilgi, paylaştıkça çoğalır.",
  },
];

export default function KatilPage() {
  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <p className="sys-label">
            Sistem 01 <span className="text-zinc-400">/</span> Gama
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Bize Katıl
          </h1>
          <p className="mt-3 text-zinc-300">
            Formu doldur; yazılım, donanım veya mentorluk yolculuğuna ilk adımı
            atalım.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <SubmitForm
            subject="Yeni üyelik başvurusu"
            tur="katil"
            buttonText="Başvuruyu Gönder"
            fields={[
              {
                name: "ad",
                label: "Ad Soyad",
                type: "text",
                required: true,
                placeholder: "Adın soyadın",
              },
              {
                name: "eposta",
                label: "E-posta",
                type: "email",
                required: true,
                placeholder: "ornek@eposta.com",
              },
              {
                name: "il",
                label: "İl",
                type: "select",
                required: true,
                options: tumIller,
              },
              {
                name: "rol",
                label: "İlgilendiğin rol",
                type: "select",
                required: true,
                options: roller,
              },
              {
                name: "tanitim",
                label: "Kendini kısaca tanıt",
                type: "textarea",
                placeholder: "Deneyimlerin, hedeflerin, ilgi alanların...",
              },
            ]}
          />
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-16">
            <p className="sys-label">
              İlk 7 Gün <span className="text-zinc-400">/</span> Yolculuğun
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Gama&apos;da ilk haftan
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              Başvurundan sonraki 7 gün boyunca atacağın küçük adımlar, toplulukta
              hızla kök salmanı sağlar. Her gün tek bir görev — hepsi isteğe bağlı,
              hepsi sana kalmış.
            </p>
            <div aria-hidden className="section-line mt-5" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {yolculuk.map((g) => (
                <div
                  key={g.gun}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur"
                >
                  <p className="font-mono text-xs font-semibold uppercase tracking-widest text-gama-300">
                    {g.gun}
                  </p>
                  <p className="mt-1.5 font-semibold text-white">{g.baslik}</p>
                  <p className="mt-1.5 text-sm leading-6 text-zinc-300">{g.aciklama}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </PageTransition>
  );
}