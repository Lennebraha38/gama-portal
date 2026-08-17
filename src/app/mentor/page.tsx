import type { Metadata } from "next";
import { SubmitForm } from "@/components/SubmitForm";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import { tumIller } from "@/lib/provinces";
import { mtkbTemalari } from "@/lib/ekosistem";

export const metadata: Metadata = {
  title: "Mentorluk",
  description:
    "Gama Mentorluk Programı: gençleri alanında uzman mentorlarla kohort bazlı ve adil eşleştirme ile buluşturur.",
};

const surec = [
  {
    ad: "Başvuru",
    aciklama:
      "Mentor veya mentee olarak ilgilendiğin alanları, hedeflerini ve müsaitliğini belirtirsin.",
  },
  {
    ad: "Kohort oluşturma",
    aciklama:
      "Başvurular dönem sonunda bir kohortta toplanır. Hiçbir başvuru sıraya göre avantaj ya da dezavantaj kazanmaz.",
  },
  {
    ad: "Adil eşleştirme",
    aciklama:
      "Tüm kohort aynı anda değerlendirilir; beceri, hedef, il ve müsaitlik uyumu en yüksek çiftler seçilir. Sıralı eşleştirme yapılmaz — ilk gelen daha iyi eşleşme almaz.",
  },
  {
    ad: "İlk buluşma",
    aciklama:
      "Eşleşme onaylandığında mentor ve mentee ilk görüşmeyi planlar. Program boyunca ilerleme Gama koordinatörlerince izlenir.",
  },
];

export default function MentorPage() {
  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <p className="sys-label">
            Sistem 03 <span className="text-zinc-400">/</span> Gama
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Mentorluk Programı
          </h1>
          <p className="mt-3 text-zinc-300">
            Gençlerin projelerini ilerletmek için ihtiyaç duyduğu en değerli
            kaynak, alanında deneyimli bir rehberdir. Gama; mentor ve mentee
            başvurularını dönem dönem toplar ve{" "}
            <span className="font-semibold text-white">kohort bazlı, adil eşleştirme</span>{" "}
            ile bir araya getirir.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 grid gap-4">
            {surec.map((s, i) => (
              <div
                key={s.ad}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gama-500/15 font-mono text-sm font-bold text-gama-300 ring-1 ring-gama-400/30">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-white">{s.ad}</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-300">{s.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-12 text-2xl font-bold tracking-tight text-white">
            Başvuru Formu
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            Mentor adayı olarak alanında en az 2 yıl deneyim bekleriz; mentee
            başvuruları için deneyim şartı yoktur. Başvurun bu dönemin kohortunda
            değerlendirilir.
          </p>
          <SubmitForm
            subject="Mentorluk programı başvurusu"
            tur="mentor"
            buttonText="Başvuruyu Gönder"
            successTitle="Başvurun alındı!"
            successText="Bu dönemin kohortu dolduğunda eşleştirme yapılacak; sonuç e-postana iletilecek."
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
                label: "Rolün",
                type: "select",
                required: true,
                options: ["Mentor Adayı", "Mentee (Rehberlik Almak İstiyorum)"],
              },
              {
                name: "alan",
                label: "İlgi alanın / uzmanlığın",
                type: "select",
                required: true,
                options: mtkbTemalari.map((t) => t.ad),
              },
              {
                name: "deneyim",
                label: "Deneyim ve hedeflerin",
                type: "textarea",
                required: true,
                placeholder:
                  "Deneyimlerin, bu programdan beklentilerin, projelerin...",
              },
              {
                name: "musaitlik",
                label: "Müsaitliğin",
                type: "select",
                required: true,
                options: ["Hafta içi akşam", "Hafta sonu", "Esnek"],
              },
            ]}
          />
        </Reveal>
      </div>
    </PageTransition>
  );
}