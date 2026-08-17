"use client";

import { SubmitForm } from "@/components/SubmitForm";
import { ROZET_ANAHTARLARI, rozetIsaretle } from "@/lib/rozetler";

export function ChallengeFormu({ slug }: { slug: string }) {
  return (
    <SubmitForm
      subject="Challenge çözümü"
      tablo="challenge_katilimlari"
      sabit={{ challenge_slug: slug }}
      buttonText="Çözümü Gönder"
      successTitle="Çözümün alındı!"
      successText="Ekibimiz çözümleri hafta sonunda inceler; öne çıkanlar vitrinde paylaşılır."
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
          name: "cozum_url",
          label: "Çözüm linki (repo / demo / dosya)",
          type: "text",
          required: true,
          placeholder: "https://github.com/...",
        },
        {
          name: "aciklama",
          label: "Nasıl çözdüğünü kısaca anlat",
          type: "textarea",
          required: true,
          placeholder: "Yaklaşımın, kullandığın araçlar, sonuç...",
        },
      ]}
      onSuccess={() => {
        try {
          rozetIsaretle(window.localStorage, ROZET_ANAHTARLARI.challenge);
        } catch {
          // depolama kapalıysa rozet kaydedilmez
        }
      }}
    />
  );
}