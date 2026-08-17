"use client";

import { SubmitForm } from "@/components/SubmitForm";
import { ROZET_ANAHTARLARI, rozetIsaretle } from "@/lib/rozetler";
import { tumIller } from "@/lib/provinces";
import { mtkbTemalari } from "@/lib/ekosistem";

export function ProjeVitrinFormu() {
  return (
    <SubmitForm
      subject="Üye proje başvurusu"
      tur="proje"
      buttonText="Projeyi Gönder"
      successTitle="Projen alındı!"
      successText="Ekibimiz projeni inceleyecek; onaylanırsa vitrinde yayınlanacak."
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
          name: "tema",
          label: "Proje teması",
          type: "select",
          required: true,
          options: mtkbTemalari.map((t) => t.ad),
        },
        {
          name: "proje_adi",
          label: "Proje adı",
          type: "text",
          required: true,
          placeholder: "Projenin adı",
        },
        {
          name: "ozet",
          label: "Projenin özeti",
          type: "textarea",
          required: true,
          placeholder: "Projen ne işe yarıyor, hangi sorunu çözüyor, ne aşamada?",
        },
      ]}
      onSuccess={() => {
        try {
          rozetIsaretle(window.localStorage, ROZET_ANAHTARLARI.proje);
        } catch {
          // depolama kapalıysa rozet kaydedilmez
        }
      }}
    />
  );
}