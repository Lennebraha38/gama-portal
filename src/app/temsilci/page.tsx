import type { Metadata } from "next";
import { SubmitForm } from "@/components/SubmitForm";
import { regions } from "@/lib/provinces";

export const metadata: Metadata = {
  title: "İl Temsilcisi Başvurusu",
  description:
    "Bulunduğun ilde Gama'yı temsil et. İl koordinatörü başvuru formu ile adaylığını ilet.",
};

const atanmisIller = new Set(
  regions.flatMap((b) => b.iller).filter((i) => i.temsilci !== "Belirleniyor").map((i) => i.il)
);

const acikIller = regions
  .flatMap((b) => b.iller)
  .map((i) => i.il)
  .filter((il) => !atanmisIller.has(il));

export default function TemsilciPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
        İl Temsilcisi Adayı Ol
      </h1>
      <p className="mt-3 text-zinc-200">
        Bulunduğun ilde Gama&apos;yı temsil etmek ister misin? Koordinatörlük
        başvurunu ilet, ekibimiz seninle iletişime geçsin.
      </p>

      <SubmitForm
        subject="İl temsilcisi başvurusu"
        buttonText="Adaylığını Gönder"
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
            label: "Temsil etmek istediğin il",
            type: "select",
            required: true,
            options: acikIller,
          },
          {
            name: "meslek",
            label: "Mesleğin / öğrenim durumun",
            type: "text",
            required: true,
            placeholder: "Örn. Bilgisayar Mühendisliği öğrencisi",
          },
          {
            name: "motivasyon",
            label: "Neden il temsilcisi olmak istiyorsun?",
            type: "textarea",
            required: true,
            placeholder: "Topluluk deneyimlerin, hedeflerin...",
          },
        ]}
      />
    </div>
  );
}
