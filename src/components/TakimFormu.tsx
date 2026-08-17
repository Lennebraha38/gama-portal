"use client";

import { SubmitForm } from "@/components/SubmitForm";
import { tumIller } from "@/lib/provinces";
import { mtkbTemalari } from "@/lib/ekosistem";

const ROLLER = [
  "Yazılım Geliştirici",
  "Donanım / Elektronik",
  "Tasarım",
  "Yapay Zekâ / Veri",
  "Sunum / İçerik",
  "Proje Yönetimi",
];

export function TakimFormu() {
  return (
    <SubmitForm
      subject="Takım ilanı / takım arayışı"
      tur="takim"
      buttonText="İlanı Gönder"
      successTitle="İlanın alındı!"
      successText="İlanın ekibimizce incelendikten sonra ilindeki üyelerle paylaşılacak."
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
          name: "durum",
          label: "Ne arıyorsun?",
          type: "select",
          required: true,
          options: [
            "Projeme takım arıyorum",
            "Bir takıma katılmak istiyorum",
          ],
        },
        {
          name: "proje_adi",
          label: "Proje adı / fikrin",
          type: "text",
          required: true,
          placeholder: "Projenin adı ya da fikrin",
        },
        {
          name: "tema",
          label: "Proje teması",
          type: "select",
          required: true,
          options: mtkbTemalari.map((t) => t.ad),
        },
        {
          name: "roller",
          label: "Aradığın roller (virgülle ayır)",
          type: "select",
          required: true,
          options: ROLLER,
        },
        {
          name: "aciklama",
          label: "Kısaca anlat",
          type: "textarea",
          required: true,
          placeholder: "Proje ne aşamada, takımdan beklentin ne?",
        },
      ]}
    />
  );
}